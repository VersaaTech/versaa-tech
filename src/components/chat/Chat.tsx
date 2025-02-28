import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'error';
  content: string;
  timestamp: Date;
}

export function Chat({ isOpen, onOpenChange }: ChatProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: '👋 Hi, I am Max! How can I assist you today?',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSentTime, setLastSentTime] = useState<number>(0);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const webhookUrl = process.env.NEXT_PUBLIC_CHATBOT_WEBHOOK_URL;

  // Load messages from localStorage on initial render
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        // Convert string timestamps back to Date objects
        const messagesWithDateObjects = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(messagesWithDateObjects);
      } catch (error) {
        console.error('Error parsing saved messages:', error);
      }
    }
  }, []);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 1) { // Don't save just the initial message
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Clear chat history when sheet is closed
  useEffect(() => {
    if (!isOpen) {
      // Keep the initial greeting message
      setMessages([
        {
          id: '1',
          type: 'assistant',
          content: '👋 Hi, I am Max! How can I assist you today?',
          timestamp: new Date(),
        }
      ]);
      localStorage.removeItem('chatMessages');
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    // Rate limiting
    const now = Date.now();
    if (now - lastSentTime < 1500) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'error',
        content: 'Please wait a moment before sending another message',
        timestamp: new Date(),
      }]);
      return;
    }
    setLastSentTime(now);

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Ensure webhook URL is valid
    if (!webhookUrl) {
      console.error("Webhook URL is not defined");
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'error',
        content: "Configuration error: Webhook URL is not defined. Please check your environment variables.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
      return;
    }
    
    try {
      // Improved payload structure based on reference implementation
      const payload = {
        sessionId: crypto.randomUUID(),
        chatInput: userMessage.content,
        timestamp: new Date().toISOString(),
        source: 'website_chat'
      };
      
      // Send message to webhook with improved CORS handling
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
        mode: 'cors',
        credentials: 'omit'
      });
      
      if (!response.ok) {
        console.error(`Webhook response error: Status ${response.status}`);
        try {
          const errorData = await response.text();
          console.error("Error response:", errorData);
        } catch (e) {
          console.error("Could not read error response body");
        }
        throw new Error(`Error: ${response.status}`);
      }
      
      // Parse the response
      const data = await response.json();
      
      // Extract the response content based on the structure
      let responseContent = "Sorry, I couldn't process your request.";
      if (data) {
        if (data.output) {
          responseContent = data.output;
        } else if (data.response) {
          responseContent = data.response;
        } else if (data.answer) {
          responseContent = data.answer;
        } else if (data.message) {
          responseContent = data.message;
        } else if (data.content) {
          responseContent = data.content;
        } else if (data.text) {
          responseContent = data.text;
        } else if (typeof data === 'string') {
          responseContent = data;
        } else if (typeof data === 'object') {
          // If it's an object without any of the expected fields, stringify it
          responseContent = JSON.stringify(data);
        }
      }
      
      // Add assistant response to chat
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
    } catch (error) {
      console.error('Error sending message to webhook:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'error',
        content: "Sorry, there was an error processing your request. Please try again later.",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      // Ensure isLoading is set to false
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleClearChat = () => {
    // Keep only the initial greeting message
    setMessages([
      {
        id: '1',
        type: 'assistant',
        content: '👋 Hi, I am Max! How can I assist you today?',
        timestamp: new Date(),
      },
    ]);
    // Clear localStorage
    localStorage.removeItem('chatMessages');
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col h-full p-0 gap-0 w-full sm:max-w-md">
        <SheetHeader className="px-4 py-3 border-b">
          <SheetTitle className="text-gradient bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent font-bold">
            Versaa Chat
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 relative">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div className="flex flex-col max-w-[80%] gap-1">
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-tr-none'
                        : message.type === 'error'
                        ? 'bg-red-100 text-red-800 rounded-tl-none'
                        : 'bg-gray-100 text-gray-800 rounded-tl-none'
                    } relative`}
                  >
                    {message.type === 'assistant' ? (
                      <div className="text-sm markdown-content">
                        <ReactMarkdown 
                          remarkPlugins={[remarkGfm]}
                          components={{
                            // Style links to be visible
                            a: ({node, ...props}) => <a {...props} className="text-blue-600 underline hover:text-blue-800" />,
                            // Style code blocks
                            code: ({node, className, children, ...props}) => {
                              const isInline = !className
                              
                              return isInline ? 
                                <code {...props} className="bg-gray-200 px-1 py-0.5 rounded text-xs">{children}</code> : 
                                <code {...props} className="block bg-gray-200 p-2 rounded-md text-xs overflow-x-auto my-2">{children}</code>
                            },
                            // Style lists
                            ul: ({node, ...props}) => <ul {...props} className="list-disc pl-5 my-2" />,
                            ol: ({node, ...props}) => <ol {...props} className="list-decimal pl-5 my-2" />,
                            // Style headings
                            h1: ({node, ...props}) => <h1 {...props} className="text-lg font-bold my-2" />,
                            h2: ({node, ...props}) => <h2 {...props} className="text-base font-bold my-2" />,
                            h3: ({node, ...props}) => <h3 {...props} className="text-sm font-bold my-2" />,
                            // Style paragraphs
                            p: ({node, ...props}) => <p {...props} className="my-2" />,
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <div className="text-sm">{message.content}</div>
                    )}
                    
                    {message.type === 'assistant' && (
                      <div className="absolute -left-2 bottom-0 w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-3 h-3 text-gray-600" />
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 px-2">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                key="typing-indicator"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex justify-start"
              >
                <div className="flex flex-col max-w-[80%] gap-1">
                  <div className="rounded-2xl px-4 py-2 bg-gray-100 text-gray-800 rounded-tl-none">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Max is typing</span>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </AnimatePresence>
          
          {/* Clear Chat Button - Only show when there are more than 1 message */}
          <AnimatePresence>
            {messages.length > 1 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={handleClearChat}
                className="absolute left-0 right-0 bottom-2 mx-auto w-fit px-4 py-2 rounded-full bg-gray-100 bg-opacity-80 text-gray-600 hover:bg-gray-200 shadow-md transition-all z-10 text-sm font-medium"
                aria-label="Clear chat"
                title="Clear chat history"
              >
                Clear Chat
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 min-h-10 p-3 border rounded-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={1}
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md transition-all hover:shadow-lg disabled:opacity-50"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

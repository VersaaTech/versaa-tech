import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useRef, useEffect } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useChat } from '@ai-sdk/react';

interface ChatProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Chat({ isOpen, onOpenChange }: ChatProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages
  } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: 'initial-greeting',
        role: 'assistant',
        content: '👋 Hi, I am Max! How can I assist you with Versaatech\'s services today?',
      }
    ],
    onError: (error) => {
      console.error('Chat error:', error);
    }
  });

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Clear chat history when sheet is closed
  useEffect(() => {
    if (!isOpen) {
      setMessages([
        {
          id: 'initial-greeting',
          role: 'assistant',
          content: '👋 Hi, I am Max! How can I assist you with Versaatech\'s services today?',
        }
      ]);
    }
  }, [isOpen, setMessages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'initial-greeting',
        role: 'assistant',
        content: '👋 Hi, I am Max! How can I assist you with Versaatech\'s services today?',
      }
    ]);
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
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div className="flex flex-col max-w-[80%] gap-1">
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-tr-none'
                        : 'bg-gray-100 text-gray-800 rounded-tl-none'
                    } relative`}
                  >
                    {message.role === 'assistant' ? (
                      <div className="text-sm markdown-content">
                        <ReactMarkdown 
                          remarkPlugins={[remarkGfm]}
                          components={{
                            // Style links to be visible
                            a: ({...props}) => <a {...props} className="text-blue-600 underline hover:text-blue-800" />,
                            // Style code blocks
                            code: ({className, children, ...props}) => {
                              const isInline = !className
                              
                              return isInline ? 
                                <code {...props} className="bg-gray-200 px-1 py-0.5 rounded text-xs">{children}</code> : 
                                <code {...props} className="block bg-gray-200 p-2 rounded-md text-xs overflow-x-auto my-2">{children}</code>
                            },
                            // Style lists
                            ul: ({...props}) => <ul {...props} className="list-disc pl-5 my-2" />,
                            ol: ({...props}) => <ol {...props} className="list-decimal pl-5 my-2" />,
                            // Style headings
                            h1: ({...props}) => <h1 {...props} className="text-lg font-bold my-2" />,
                            h2: ({...props}) => <h2 {...props} className="text-base font-bold my-2" />,
                            h3: ({...props}) => <h3 {...props} className="text-sm font-bold my-2" />,
                            // Style paragraphs
                            p: ({...props}) => <p {...props} className="my-2" />,
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <div className="text-sm">{message.content}</div>
                    )}
                    
                    {message.role === 'assistant' && (
                      <div className="absolute -left-2 bottom-0 w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-3 h-3 text-gray-600" />
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 px-2">
                    {message.createdAt ? formatTime(new Date(message.createdAt)) : formatTime(new Date())}
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
          {messages.length > 1 && (
            <AnimatePresence>
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
            </AnimatePresence>
          )}
        </div>

        <div className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <textarea
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Versaatech's services..."
              className="flex-1 min-h-10 p-3 border rounded-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={1}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md transition-all hover:shadow-lg disabled:opacity-50"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}

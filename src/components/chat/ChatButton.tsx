"use client"

import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Chat } from "./Chat"

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="fixed bottom-16 right-4 z-50">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1
            }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              delay: 0.5
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            exit={{ scale: 0, opacity: 0 }}
            className="cursor-pointer rounded-full bg-gradient-to-r from-blue-500 to-blue-700 p-3 text-white shadow-lg"
            onClick={() => setIsOpen(true)}
            aria-label="Open chat"
          >
            <MessageCircle size={20} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <Chat isOpen={isOpen} onOpenChange={setIsOpen} />
    </div>
  )
} 
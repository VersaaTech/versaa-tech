"use client"

import { useState, useEffect } from "react"
import { MessageCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Chat } from "./Chat"

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPulsing, setIsPulsing] = useState(true)

  // Stop pulsing animation after a few pulses
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPulsing(false)
    }, 20000)
    return () => clearTimeout(timer)
  }, [])

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
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            exit={{ scale: 0, opacity: 0 }}
            className="relative cursor-pointer rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)] flex items-center justify-center"
            onClick={() => setIsOpen(true)}
            aria-label="Open chat"
          >
            <MessageCircle size={24} />
            {/* Pulsing ring effect */}
            {isPulsing && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-indigo-400"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <Chat isOpen={isOpen} onOpenChange={setIsOpen} />
    </div>
  )
} 
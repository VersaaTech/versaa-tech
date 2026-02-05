"use client"

import { useState, useEffect } from "react"
import { MessageCircle } from "lucide-react"
import { LazyMotion, domAnimation, AnimatePresence, m } from "framer-motion"
import dynamic from 'next/dynamic'

const Chat = dynamic(() => import('./Chat').then(mod => mod.Chat), {
  ssr: false,
  loading: () => null,
})

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
    <LazyMotion features={domAnimation}>
      <div className="fixed bottom-16 right-4 z-50">
        <AnimatePresence>
          {!isOpen && (
            <m.button
              type="button"
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
              className="relative rounded-full bg-blue-600 hover:bg-blue-700 p-4 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)] flex items-center justify-center"
              onClick={() => setIsOpen(true)}
              aria-label="Open chat"
            >
              <MessageCircle size={24} />
              {/* Pulsing ring effect */}
              {isPulsing && (
                <m.div
                  className="absolute inset-0 rounded-full border-2 border-blue-400"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 0, 0.7]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                  aria-hidden="true"
                />
              )}
            </m.button>
          )}
        </AnimatePresence>

        <Chat isOpen={isOpen} onOpenChange={setIsOpen} />
      </div>
    </LazyMotion>
  )
} 
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Brain, Zap, BarChart3 } from "lucide-react"

// Sample flashcard data
const previewCards = [
  {
    id: 1,
    question: "What is quantum computing?",
    answer:
      "A type of computing that uses quantum-mechanical phenomena, such as superposition and entanglement, to perform operations on data.",
  },
  {
    id: 2,
    question: "What is neural interface technology?",
    answer:
      "Technology that establishes a direct communication pathway between a wired brain and an external device, like a computer or robotic limb.",
  },
  {
    id: 3,
    question: "What is nanotechnology?",
    answer: "The manipulation of matter on an atomic, molecular, and supramolecular scale for industrial purposes.",
  },
]

export function FlashcardPreview({ darkMode = true }: { darkMode?: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [autoPlay, setAutoPlay] = useState(true)

  // Auto-flip and cycle through cards for demo purposes
  useEffect(() => {
    if (!autoPlay) return

    const flipTimer = setTimeout(() => {
      setFlipped(true)
    }, 3000)

    const nextTimer = setTimeout(() => {
      setFlipped(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % previewCards.length)
      }, 300)
    }, 6000)

    return () => {
      clearTimeout(flipTimer)
      clearTimeout(nextTimer)
    }
  }, [currentIndex, autoPlay])

  const handleCardClick = () => {
    setAutoPlay(false) // Stop auto-play when user interacts
    setFlipped(!flipped)
  }

  const cardBg = darkMode 
    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black" 
    : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200"
    
  const cardBorder = darkMode ? "border-gray-800" : "border-gray-300"
  const textColor = darkMode ? "text-gray-300" : "text-gray-700"
  const hintText = darkMode ? "text-gray-500" : "text-gray-400"
  const frontShadow = darkMode 
    ? "shadow-[0_0_15px_rgba(0,200,255,0.15)]" 
    : "shadow-[0_0_15px_rgba(0,100,255,0.1)]"
  const backShadow = darkMode 
    ? "shadow-[0_0_15px_rgba(128,0,255,0.15)]" 
    : "shadow-[0_0_15px_rgba(128,0,255,0.1)]"

  return (
    <div className="relative h-full w-full perspective-1000">
      {/* Card shadow */}
      <div className={`absolute bottom-0 left-1/2 h-4 w-[90%] -translate-x-1/2 rounded-full ${
        darkMode ? "bg-black/30" : "bg-gray-400/30"
      } blur-md`}></div>

      {/* Floating effect */}
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="relative h-full w-full perspective-1000 cursor-pointer"
        onClick={handleCardClick}
      >
        <motion.div
          className="absolute h-full w-full transform-style-3d transition-all duration-500"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Front side */}
          <div className={`absolute h-full w-full backface-hidden rounded-2xl border ${cardBorder} ${cardBg} p-8 ${frontShadow} transition-all`}>
            <div className="flex h-full flex-col items-center justify-center">
              <div className={`absolute left-4 top-4 h-3 w-3 rounded-full ${
                darkMode 
                  ? "bg-cyan-500 shadow-[0_0_10px_rgba(0,200,255,0.7)]" 
                  : "bg-cyan-400 shadow-[0_0_10px_rgba(0,150,255,0.5)]"
              }`}></div>
              <div className={`absolute right-4 top-4 h-3 w-3 rounded-full ${
                darkMode 
                  ? "bg-purple-500 shadow-[0_0_10px_rgba(128,0,255,0.7)]" 
                  : "bg-purple-400 shadow-[0_0_10px_rgba(128,0,255,0.5)]"
              }`}></div>

              <h2 className={`mb-4 text-center text-xl font-medium ${textColor} md:text-2xl`}>
                {previewCards[currentIndex].question}
              </h2>

              <div className="mt-auto flex items-center justify-center">
                <span className={`text-sm ${hintText}`}>Tap to reveal answer</span>
              </div>
            </div>
          </div>

          {/* Back side */}
          <div className={`absolute h-full w-full backface-hidden rounded-2xl border ${cardBorder} ${cardBg} p-8 ${backShadow} transition-all [transform:rotateY(180deg)]`}>
            <div className="flex h-full flex-col items-center justify-center">
              <div className={`absolute left-4 top-4 h-3 w-3 rounded-full ${
                darkMode 
                  ? "bg-purple-500 shadow-[0_0_10px_rgba(128,0,255,0.7)]" 
                  : "bg-purple-400 shadow-[0_0_10px_rgba(128,0,255,0.5)]"
              }`}></div>
              <div className={`absolute right-4 top-4 h-3 w-3 rounded-full ${
                darkMode 
                  ? "bg-cyan-500 shadow-[0_0_10px_rgba(0,200,255,0.7)]" 
                  : "bg-cyan-400 shadow-[0_0_10px_rgba(0,150,255,0.5)]"
              }`}></div>

              <p className={`text-center text-lg ${textColor}`}>{previewCards[currentIndex].answer}</p>

              <div className="mt-auto flex items-center justify-center">
                <span className={`text-sm ${hintText}`}>Tap to see question</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Card indicator dots */}
      <div className="absolute -bottom-10 left-1/2 flex -translate-x-1/2 space-x-2">
        {previewCards.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex 
                ? "bg-gradient-to-r from-cyan-500 to-purple-500" 
                : darkMode 
                  ? "bg-gray-700" 
                  : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
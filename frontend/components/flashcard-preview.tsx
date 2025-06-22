"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

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

export function FlashcardPreview() {
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

  return (
    <div className="relative h-full w-full perspective-1000">
      {/* Card shadow */}
      <div className="absolute bottom-0 left-1/2 h-4 w-[90%] -translate-x-1/2 rounded-full bg-black/30 blur-md"></div>

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
          <div className="absolute h-full w-full backface-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 shadow-[0_0_15px_rgba(0,200,255,0.15)] transition-all">
            <div className="flex h-full flex-col items-center justify-center">
              <div className="absolute left-4 top-4 h-3 w-3 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(0,200,255,0.7)]"></div>
              <div className="absolute right-4 top-4 h-3 w-3 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(128,0,255,0.7)]"></div>

              <h2 className="mb-4 text-center text-xl font-medium text-gray-300 md:text-2xl">
                {previewCards[currentIndex].question}
              </h2>

              <div className="mt-auto flex items-center justify-center">
                <span className="text-sm text-gray-500">Tap to reveal answer</span>
              </div>
            </div>
          </div>

          {/* Back side */}
          <div className="absolute h-full w-full backface-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 shadow-[0_0_15px_rgba(128,0,255,0.15)] transition-all [transform:rotateY(180deg)]">
            <div className="flex h-full flex-col items-center justify-center">
              <div className="absolute left-4 top-4 h-3 w-3 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(128,0,255,0.7)]"></div>
              <div className="absolute right-4 top-4 h-3 w-3 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(0,200,255,0.7)]"></div>

              <p className="text-center text-lg text-gray-300">{previewCards[currentIndex].answer}</p>

              <div className="mt-auto flex items-center justify-center">
                <span className="text-sm text-gray-500">Tap to see question</span>
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
              index === currentIndex ? "bg-gradient-to-r from-cyan-500 to-purple-500" : "bg-gray-700"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

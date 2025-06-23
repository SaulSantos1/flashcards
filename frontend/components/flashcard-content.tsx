"use client"

import { useState, useEffect } from "react"
import { PlusCircle, ChevronLeft, ChevronRight, Edit, Trash2, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { motion, AnimatePresence } from "framer-motion"
import type { FlashcardFolder, Flashcard } from "./flashcard-system"

interface FlashcardContentProps {
  darkMode?: boolean
  folder: FlashcardFolder
  currentIndex: number
  onCreateCards: (folderId: string, newCard: Omit<Flashcard, 'id'>) => void
  onIndexChange: (newIndex: number) => void
  onEditFlashcard: (flashcardId: string, updatedData: { question: string, answer: string }) => void // Adicionar
  onDeleteFlashcard: (flashcardId: string) => void // Adicionar
}

export function FlashcardContent({ 
  darkMode = true,
  folder, 
  currentIndex, 
  onCreateCards, 
  onIndexChange,
  onEditFlashcard,
  onDeleteFlashcard,
}: FlashcardContentProps) {
  const [flipped, setFlipped] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [editedQuestion, setEditedQuestion] = useState("")
  const [editedAnswer, setEditedAnswer] = useState("")
  const cardBg = darkMode ? "border-gray-800 bg-gradient-to-br from-gray-900 via-gray-800 to-black" : "bg-white/80 border-slate-200"
  const textColor = darkMode ? "text-gray-100" : "text-slate-700"
  const textSecondary = darkMode ? "text-gray-400" : "text-slate-500"
  const buttonBg = darkMode ? "border-gray-800 bg-gray-900/50 hover:bg-gray-800" : "bg-white/80 border-slate-200 hover:bg-gray-50"
  const borderColor = darkMode ? "border-gray-600" : "border-slate-200"
  const buttonHover = darkMode ? "hover:text-slate-200" : "hover:text-gray-900"

  // Reset flipped state when folder or card changes
  useEffect(() => {
    setFlipped(false)
  }, [folder.id, currentIndex])

  const nextCard = () => {
    if (folder.flashcards.length === 0) return
    setFlipped(false)
    setTimeout(() => {
      onIndexChange((currentIndex + 1) % folder.flashcards.length)
    }, 200)
  }

  const prevCard = () => {
    if (folder.flashcards.length === 0) return
    setFlipped(false)
    setTimeout(() => {
      onIndexChange((currentIndex - 1 + folder.flashcards.length) % folder.flashcards.length)
    }, 200)
  }

  const toggleFlip = () => {
    if (folder.flashcards.length === 0) return
    setFlipped(!flipped)
  }

  const startEditing = () => {
    if (folder.flashcards.length === 0) return
    setEditedQuestion(folder.flashcards[currentIndex].question)
    setEditedAnswer(folder.flashcards[currentIndex].answer)
    setIsEditing(true)
  }

  const startAdding = () => {
    setEditedQuestion("")
    setEditedAnswer("")
    setIsAdding(true)
  }

  const cancelEdit = () => {
    setIsEditing(false)
    setIsAdding(false)
  }

  const saveCard = () => {
  if (isEditing && folder.flashcards[currentIndex]) {
    onEditFlashcard(folder.flashcards[currentIndex].id, {
      question: editedQuestion,
      answer: editedAnswer
    })
    setIsEditing(false)
  } else if (isAdding) {
    const newCard = {
      question: editedQuestion,
      answer: editedAnswer,
    }
    onCreateCards(folder.id, newCard)
    setIsAdding(false)
  }
}

const deleteCard = () => {
  if (folder.flashcards.length <= 0 || !folder.flashcards[currentIndex]) return
  onDeleteFlashcard(folder.flashcards[currentIndex].id)
}

  if (isEditing || isAdding) {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <Card className="p-6 backdrop-blur-sm bg-white/80 border border-slate-200 shadow-lg rounded-xl">
          <h2 className="text-xl font-semibold mb-4 text-slate-700">
            {isEditing ? "Edit Flashcard" : "Add New Flashcard"} in {folder.name}
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="question" className="block text-sm font-medium text-slate-600 mb-1">
                Question
              </label>
              <Textarea
                id="question"
                value={editedQuestion}
                onChange={(e) => setEditedQuestion(e.target.value)}
                placeholder="Enter question"
                className="w-full"
                rows={3}
              />
            </div>
            <div>
              <label htmlFor="answer" className="block text-sm font-medium text-slate-600 mb-1">
                Answer
              </label>
              <Textarea
                id="answer"
                value={editedAnswer}
                onChange={(e) => setEditedAnswer(e.target.value)}
                placeholder="Enter answer"
                className="w-full"
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={cancelEdit} className="flex items-center gap-1">
                <X size={16} />
                Cancel
              </Button>
              <Button
                onClick={saveCard}
                disabled={!editedQuestion.trim() || !editedAnswer.trim()}
                className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500"
              >
                <Save size={16} />
                Save
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <div className="mb-4">
        <h2 className={`text-2xl font-semibold ${textColor}`}>{folder.name}</h2>
        <p className={`${textSecondary} text-sm`}>
          {folder.flashcards.length} {folder.flashcards.length === 1 ? "card" : "cards"}
        </p>
      </div>

      {/* Flashcard Display */}
      <div className="relative mb-6">
        {folder.flashcards.length === 0 ? (
          <Card className={`min-h-[300px] p-8 flex flex-col items-center justify-center text-center backdrop-blur-sm ${cardBg} border p-6 transition-all hover:border-gray-700 hover:shadow-[0_0_15px_rgba(0,200,255,0.15)] shadow-lg rounded-xl`}>
            <p className={`${textSecondary} mb-4`}>No flashcards in this folder yet.</p>
            <Button
              onClick={startAdding}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500"
            >
              <PlusCircle size={16} />
              Create Flashcard
            </Button>
          </Card>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex + (flipped ? "-flipped" : "")}
              initial={{ rotateY: flipped ? -90 : 0, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: flipped ? 0 : -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="perspective-1000"
            >
              <Card
                className={`min-h-[300px] p-8 flex flex-col items-center justify-center text-center cursor-pointer backdrop-blur-sm ${cardBg} shadow-lg rounded-2xl 
                hover:shadow-[0_0_15px_rgba(0,200,255,0.15)]`}
                onClick={toggleFlip}
              >
                <div className="absolute left-4 top-4 h-3 w-3 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(0,200,255,0.7)]"></div>
                <div className="absolute right-4 top-4 h-3 w-3 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(128,0,255,0.7)]"></div>
                <div className="absolute bottom-2 right-2 text-xs text-slate-400">
                  {currentIndex + 1} / {folder.flashcards.length}
                </div>
                <div className="w-full max-w-lg">
                  {flipped ? (
                    <div className="animate-fade-in">
                      <h3 className={`text-lg font-medium ${textSecondary} mb-2`}>Answer:</h3>
                      <p className={`text-xl ${textColor}`}>{folder.flashcards[currentIndex].answer}</p>
                    </div>
                  ) : (
                    <div className="animate-fade-in">
                      <h3 className={`text-lg font-medium ${textSecondary} mb-2`}>Question:</h3>
                      <p className={`text-xl ${textColor}`}>{folder.flashcards[currentIndex].question}</p>
                    </div>
                  )}
                </div>
                <div className={`absolute bottom-3 left-3 text-xs ${textSecondary}`}>Click to flip</div>
              </Card>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Card Navigation and Actions */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={prevCard}
            className={`flex items-center justify-center h-10 w-10 p-0 rounded-full ${textColor} ${borderColor} ${buttonBg}`}
            aria-label="Previous card"
            disabled={folder.flashcards.length <= 1}
          >
            <ChevronLeft size={18} />
          </Button>
          <Button
            variant="outline"
            onClick={nextCard}
            className={`flex items-center justify-center h-10 w-10 p-0 rounded-full ${textColor} ${borderColor} ${buttonBg}`}
            aria-label="Next card"
            disabled={folder.flashcards.length <= 1}
          >
            <ChevronRight size={18} />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={startEditing}
            className={`flex items-center gap-1 border-none ${textColor} ${buttonBg} ${buttonHover}`}
            disabled={folder.flashcards.length === 0}
          >
            <Edit size={16} />
            Edit
          </Button>
          <Button
            variant="outline"
            onClick={deleteCard}
            className="flex items-center gap-1 border-none text-white bg-red-600 hover:bg-red-700 hover:text-white"
            disabled={folder.flashcards.length === 0}
          >
            <Trash2 size={16} />
            Delete
          </Button>
          <Button
            onClick={startAdding}
            className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500"
          >
            <PlusCircle size={16} />
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}

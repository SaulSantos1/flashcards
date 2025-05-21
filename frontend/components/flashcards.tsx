"use client"

import { useState, useEffect } from "react"
import { PlusCircle, ChevronLeft, ChevronRight, Edit, Trash2, Save, X, Folder, FolderPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

type Flashcard = {
  id: string
  question: string
  answer: string
}

type FlashcardFolder = {
  id: string
  name: string
  cards: Flashcard[]
}

const defaultFolders: FlashcardFolder[] = [
  {
    id: "react",
    name: "React Basics",
    cards: [
      {
        id: "1",
        question: "What is React?",
        answer: "A JavaScript library for building user interfaces",
      },
      {
        id: "2",
        question: "What is JSX?",
        answer: "A syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files",
      },
      {
        id: "3",
        question: "What is a component in React?",
        answer: "A reusable piece of code that returns a React element to be rendered to the page",
      },
    ],
  },
  {
    id: "js",
    name: "JavaScript",
    cards: [
      {
        id: "1",
        question: "What is a closure in JavaScript?",
        answer:
          "A function that has access to variables from its outer (enclosing) scope, even after the outer function has returned",
      },
      {
        id: "2",
        question: "What is the difference between let and var?",
        answer:
          "let is block-scoped while var is function-scoped. let was introduced in ES6 and helps prevent hoisting-related issues.",
      },
    ],
  },
]

export function Flashcards() {
  const [folders, setFolders] = useState<FlashcardFolder[]>([])
  const [currentFolderId, setCurrentFolderId] = useState<string>("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [editedQuestion, setEditedQuestion] = useState("")
  const [editedAnswer, setEditedAnswer] = useState("")

  // Folder management
  const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false)
  const [folderName, setFolderName] = useState("")
  const [isEditingFolder, setIsEditingFolder] = useState(false)

  useEffect(() => {
    // Load folders from localStorage or use default folders
    const savedFolders = localStorage.getItem("flashcard-folders")
    if (savedFolders) {
      const parsedFolders = JSON.parse(savedFolders)
      setFolders(parsedFolders)
      // Set current folder to the first one if it exists
      if (parsedFolders.length > 0) {
        setCurrentFolderId(parsedFolders[0].id)
      }
    } else {
      setFolders(defaultFolders)
      if (defaultFolders.length > 0) {
        setCurrentFolderId(defaultFolders[0].id)
      }
    }
  }, [])

  useEffect(() => {
    // Save folders to localStorage whenever they change
    if (folders.length > 0) {
      localStorage.setItem("flashcard-folders", JSON.stringify(folders))
    }
  }, [folders])

  // Get current folder
  const currentFolder = folders.find((folder) => folder.id === currentFolderId) || { id: "", name: "", cards: [] }

  const nextCard = () => {
    if (currentFolder.cards.length === 0) return

    setFlipped(false)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % currentFolder.cards.length)
    }, 200)
  }

  const prevCard = () => {
    if (currentFolder.cards.length === 0) return

    setFlipped(false)
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + currentFolder.cards.length) % currentFolder.cards.length)
    }, 200)
  }

  const toggleFlip = () => {
    if (currentFolder.cards.length === 0) return
    setFlipped(!flipped)
  }

  const startEditing = () => {
    if (currentFolder.cards.length === 0) return

    setEditedQuestion(currentFolder.cards[currentIndex].question)
    setEditedAnswer(currentFolder.cards[currentIndex].answer)
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
    if (isEditing) {
      const updatedFolders = [...folders]
      const folderIndex = updatedFolders.findIndex((f) => f.id === currentFolderId)

      if (folderIndex !== -1) {
        updatedFolders[folderIndex].cards[currentIndex] = {
          ...updatedFolders[folderIndex].cards[currentIndex],
          question: editedQuestion,
          answer: editedAnswer,
        }
        setFolders(updatedFolders)
      }
      setIsEditing(false)
    } else if (isAdding) {
      const newCard: Flashcard = {
        id: Date.now().toString(),
        question: editedQuestion,
        answer: editedAnswer,
      }

      const updatedFolders = [...folders]
      const folderIndex = updatedFolders.findIndex((f) => f.id === currentFolderId)

      if (folderIndex !== -1) {
        updatedFolders[folderIndex].cards.push(newCard)
        setFolders(updatedFolders)
        setCurrentIndex(updatedFolders[folderIndex].cards.length - 1)
      }
      setIsAdding(false)
    }
  }

  const deleteCard = () => {
    if (currentFolder.cards.length <= 0) return

    const updatedFolders = [...folders]
    const folderIndex = updatedFolders.findIndex((f) => f.id === currentFolderId)

    if (folderIndex !== -1) {
      updatedFolders[folderIndex].cards = updatedFolders[folderIndex].cards.filter((_, index) => index !== currentIndex)
      setFolders(updatedFolders)
      setCurrentIndex(Math.min(currentIndex, updatedFolders[folderIndex].cards.length - 1))
    }
  }

  // Folder management functions
  const openAddFolderDialog = () => {
    setFolderName("")
    setIsEditingFolder(false)
    setIsFolderDialogOpen(true)
  }

  const openEditFolderDialog = () => {
    setFolderName(currentFolder.name)
    setIsEditingFolder(true)
    setIsFolderDialogOpen(true)
  }

  const saveFolder = () => {
    if (folderName.trim() === "") return

    if (isEditingFolder) {
      // Edit existing folder
      const updatedFolders = folders.map((folder) =>
        folder.id === currentFolderId ? { ...folder, name: folderName } : folder,
      )
      setFolders(updatedFolders)
    } else {
      // Add new folder
      const newFolder: FlashcardFolder = {
        id: Date.now().toString(),
        name: folderName,
        cards: [],
      }
      setFolders([...folders, newFolder])
      setCurrentFolderId(newFolder.id)
      setCurrentIndex(0)
    }

    setIsFolderDialogOpen(false)
  }

  const deleteFolder = () => {
    if (folders.length <= 1) return

    const updatedFolders = folders.filter((folder) => folder.id !== currentFolderId)
    setFolders(updatedFolders)

    if (updatedFolders.length > 0) {
      setCurrentFolderId(updatedFolders[0].id)
      setCurrentIndex(0)
    } else {
      setCurrentFolderId("")
    }
  }

  const switchFolder = (folderId: string) => {
    setCurrentFolderId(folderId)
    setCurrentIndex(0)
    setFlipped(false)
  }

  if (folders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-slate-500 mb-4">No folders yet. Create your first folder!</p>
        <Button
          onClick={openAddFolderDialog}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500"
        >
          <FolderPlus size={16} />
          Create Folder
        </Button>
      </div>
    )
  }

  if (isEditing || isAdding) {
    return (
      <div className="w-full">
        <Card className="p-6 backdrop-blur-sm bg-white/80 border border-slate-200 shadow-lg rounded-xl">
          <h2 className="text-xl font-semibold mb-4 text-slate-700">
            {isEditing ? "Edit Flashcard" : "Add New Flashcard"} in {currentFolder.name}
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
    <div className="w-full">
      {/* Folder Navigation */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 border border-slate-200">
              <Folder size={16} />
              {currentFolder.name}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {folders.map((folder) => (
              <DropdownMenuItem
                key={folder.id}
                onClick={() => switchFolder(folder.id)}
                className={folder.id === currentFolderId ? "bg-slate-100" : ""}
              >
                <Folder size={16} className="mr-2" />
                {folder.name} ({folder.cards.length})
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          onClick={openAddFolderDialog}
          className="flex items-center gap-1 border border-slate-200"
        >
          <FolderPlus size={16} />
          New Folder
        </Button>

        <Button
          variant="outline"
          onClick={openEditFolderDialog}
          className="flex items-center gap-1 border border-slate-200"
          disabled={!currentFolderId}
        >
          <Edit size={16} />
          Rename
        </Button>

        <Button
          variant="outline"
          onClick={deleteFolder}
          className="flex items-center gap-1 text-red-500 border border-slate-200 hover:bg-red-50 hover:text-red-600"
          disabled={folders.length <= 1}
        >
          <Trash2 size={16} />
          Delete Folder
        </Button>
      </div>

      {/* Flashcard Display */}
      <div className="relative mb-6">
        {currentFolder.cards.length === 0 ? (
          <Card className="min-h-[300px] p-8 flex flex-col items-center justify-center text-center backdrop-blur-sm bg-white/80 border border-slate-200 shadow-lg rounded-xl">
            <p className="text-slate-500 mb-4">No flashcards in this folder yet.</p>
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
                className="min-h-[300px] p-8 flex flex-col items-center justify-center text-center cursor-pointer backdrop-blur-sm bg-white/80 border border-slate-200 shadow-lg rounded-xl"
                onClick={toggleFlip}
              >
                <div className="absolute top-2 right-2 text-xs text-slate-400">
                  {currentIndex + 1} / {currentFolder.cards.length}
                </div>
                <div className="w-full max-w-lg">
                  {flipped ? (
                    <div className="animate-fade-in">
                      <h3 className="text-lg font-medium text-slate-400 mb-2">Answer:</h3>
                      <p className="text-xl text-slate-700">{currentFolder.cards[currentIndex].answer}</p>
                    </div>
                  ) : (
                    <div className="animate-fade-in">
                      <h3 className="text-lg font-medium text-slate-400 mb-2">Question:</h3>
                      <p className="text-xl text-slate-700">{currentFolder.cards[currentIndex].question}</p>
                    </div>
                  )}
                </div>
                <div className="absolute bottom-3 left-3 text-xs text-slate-400">Click to flip</div>
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
            className="flex items-center justify-center h-10 w-10 p-0 rounded-full border border-slate-200"
            aria-label="Previous card"
            disabled={currentFolder.cards.length <= 1}
          >
            <ChevronLeft size={18} />
          </Button>
          <Button
            variant="outline"
            onClick={nextCard}
            className="flex items-center justify-center h-10 w-10 p-0 rounded-full border border-slate-200"
            aria-label="Next card"
            disabled={currentFolder.cards.length <= 1}
          >
            <ChevronRight size={18} />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={startEditing}
            className="flex items-center gap-1 border border-slate-200"
            disabled={currentFolder.cards.length === 0}
          >
            <Edit size={16} />
            Edit
          </Button>
          <Button
            variant="outline"
            onClick={deleteCard}
            className="flex items-center gap-1 text-red-500 border border-slate-200 hover:bg-red-50 hover:text-red-600"
            disabled={currentFolder.cards.length === 0}
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

      {/* Folder Dialog */}
      <Dialog open={isFolderDialogOpen} onOpenChange={setIsFolderDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditingFolder ? "Rename Folder" : "Create New Folder"}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Folder name"
              className="w-full"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFolderDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={saveFolder}
              disabled={!folderName.trim()}
              className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500"
            >
              {isEditingFolder ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

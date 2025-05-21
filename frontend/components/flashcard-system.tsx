"use client"

import { useState, useEffect } from "react"
import { FolderSidebar } from "@/components/folder-sidebar"
import { FlashcardContent } from "@/components/flashcard-content"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

type Flashcard = {
  id: string
  question: string
  answer: string
}

export type FlashcardFolder = {
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
  {
    id: "css",
    name: "CSS & Styling",
    cards: [
      {
        id: "1",
        question: "What is the box model in CSS?",
        answer:
          "A box that wraps around every HTML element, consisting of margins, borders, padding, and the actual content.",
      },
      {
        id: "2",
        question: "What is the difference between Flexbox and Grid?",
        answer:
          "Flexbox is one-dimensional and designed for layout in a single direction. Grid is two-dimensional and designed for more complex layouts.",
      },
    ],
  },
]

export function FlashcardSystem() {
  const [folders, setFolders] = useState<FlashcardFolder[]>([])
  const [currentFolderId, setCurrentFolderId] = useState<string>("")
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [sidebarOpen, setSidebarOpen] = useState(false)

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

  const handleFolderSelect = (folderId: string) => {
    if (currentFolderId !== folderId) {
      setCurrentFolderId(folderId)
      setCurrentCardIndex(0) // Reset to first card when changing folders
    }

    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  const handleCardSelect = (folderId: string, cardIndex: number) => {
    setCurrentFolderId(folderId)
    setCurrentCardIndex(cardIndex)

    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  const handleAddFolder = (folderName: string) => {
    const newFolder: FlashcardFolder = {
      id: Date.now().toString(),
      name: folderName,
      cards: [],
    }
    const updatedFolders = [...folders, newFolder]
    setFolders(updatedFolders)
    setCurrentFolderId(newFolder.id)
    setCurrentCardIndex(0)
  }

  const handleRenameFolder = (folderId: string, newName: string) => {
    const updatedFolders = folders.map((folder) => (folder.id === folderId ? { ...folder, name: newName } : folder))
    setFolders(updatedFolders)
  }

  const handleDeleteFolder = (folderId: string) => {
    const updatedFolders = folders.filter((folder) => folder.id !== folderId)
    setFolders(updatedFolders)

    if (currentFolderId === folderId && updatedFolders.length > 0) {
      setCurrentFolderId(updatedFolders[0].id)
      setCurrentCardIndex(0)
    }
  }

  const handleUpdateCards = (folderId: string, updatedCards: Flashcard[]) => {
    const updatedFolders = folders.map((folder) =>
      folder.id === folderId ? { ...folder, cards: updatedCards } : folder,
    )
    setFolders(updatedFolders)
  }

  const handleCardIndexChange = (newIndex: number) => {
    setCurrentCardIndex(newIndex)
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          {isMobile && (
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[280px]">
                <FolderSidebar
                  folders={folders}
                  currentFolderId={currentFolderId}
                  currentCardIndex={currentCardIndex}
                  onSelectFolder={handleFolderSelect}
                  onSelectCard={handleCardSelect}
                  onAddFolder={handleAddFolder}
                  onRenameFolder={handleRenameFolder}
                  onDeleteFolder={handleDeleteFolder}
                />
              </SheetContent>
            </Sheet>
          )}
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
            Flashcard System
          </h1>
        </div>
        <div>
          <Button variant="outline" size="sm" asChild>
            <a href="/login">Login</a>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Hidden on mobile */}
        {!isMobile && (
          <div className="w-64 border-r border-slate-200 bg-white/80 backdrop-blur-sm overflow-y-auto">
            <FolderSidebar
              folders={folders}
              currentFolderId={currentFolderId}
              currentCardIndex={currentCardIndex}
              onSelectFolder={handleFolderSelect}
              onSelectCard={handleCardSelect}
              onAddFolder={handleAddFolder}
              onRenameFolder={handleRenameFolder}
              onDeleteFolder={handleDeleteFolder}
            />
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <FlashcardContent
            folder={currentFolder}
            currentIndex={currentCardIndex}
            onUpdateCards={(updatedCards) => handleUpdateCards(currentFolderId, updatedCards)}
            onIndexChange={handleCardIndexChange}
          />
        </div>
      </div>
    </div>
  )
}

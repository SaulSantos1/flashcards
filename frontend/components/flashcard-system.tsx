"use client"

import { useState, useEffect } from "react"
import { FolderSidebar } from "@/components/folder-sidebar"
import { FlashcardContent } from "@/components/flashcard-content"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import { Header } from "./header"

export type Flashcard = {
  id: string
  question: string
  answer: string
}

export type FlashcardFolder = {
  id: string
  name: string
  flashcards: Flashcard[]
}

export function FlashcardSystem() {
  const [folders, setFolders] = useState<FlashcardFolder[]>([])
  const [currentFolderId, setCurrentFolderId] = useState<string>("")
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        setIsLoading(true)
        const token = localStorage.getItem("token")
        
        const response = await fetch("http://127.0.0.1:8000/folders", {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if(response.status === 401){
          localStorage.removeItem("token");
          window.location.href = "/login";
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log(data)
        setFolders(data)
        
        if (data.length > 0) {
          setCurrentFolderId(data[0].id)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch flashcards")
        console.error("Error fetching flashcards:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFlashcards()
  }, [])

  // Get current folder
  const currentFolder = folders.find((folder) => folder.id === currentFolderId) || { id: "", name: "", flashcards: [] }

  const handleFolderSelect = (folderId: string) => {
    if (currentFolderId !== folderId) {
      setCurrentFolderId(folderId)
      setCurrentCardIndex(0)
    }
  }

  const handleCardSelect = (folderId: string, cardIndex: number) => {
    setCurrentFolderId(folderId)
    setCurrentCardIndex(cardIndex)
  }

  const handleAddFolder = async (folderName: string) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://127.0.0.1:8000/folders", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: folderName })
      })

      if (!response.ok) {
        throw new Error("Failed to create folder")
      }

      const newFolder = await response.json()
      setFolders(prev => [...prev, newFolder])
      setCurrentFolderId(newFolder.id)
      setCurrentCardIndex(0)
    } catch (err) {
      console.error("Error adding folder:", err)
      setError("Failed to add folder")
    }
  }

  const handleRenameFolder = async (folderId: string, newName: string) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://127.0.0.1:8000/flashcards/${folderId}`, {
        method: "PATCH",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newName })
      })

      if (!response.ok) {
        throw new Error("Failed to rename folder")
      }

      setFolders(prev => 
        prev.map(folder => 
          folder.id === folderId ? { ...folder, name: newName } : folder
        )
      )
    } catch (err) {
      console.error("Error renaming folder:", err)
      setError("Failed to rename folder")
    }
  }

  const handleDeleteFolder = async (folderId: string) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://127.0.0.1:8000/flashcards/${folderId}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error("Failed to delete folder")
      }

      setFolders(prev => prev.filter(folder => folder.id !== folderId))

      if (currentFolderId === folderId && folders.length > 1) {
        const remainingFolders = folders.filter(folder => folder.id !== folderId)
        setCurrentFolderId(remainingFolders[0].id)
        setCurrentCardIndex(0)
      }
    } catch (err) {
      console.error("Error deleting folder:", err)
      setError("Failed to delete folder")
    }
  }

  const handleUpdateCards = async (folderId: string, updatedCards: Flashcard[]) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://127.0.0.1:8000/flashcards/${folderId}/cards`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cards: updatedCards })
      })

      if (!response.ok) {
        throw new Error("Failed to update cards")
      }

      setFolders(prev => 
        prev.map(folder => 
          folder.id === folderId ? { ...folder, cards: updatedCards } : folder
        )
      )
    } catch (err) {
      console.error("Error updating cards:", err)
      setError("Failed to update cards")
    }
  }

  const handleCreateCards = async (folderId: string, newCard: Omit<Flashcard, 'id'>) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://127.0.0.1:8000/flashcards/`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: newCard.question,
          answer: newCard.answer,
          folder_id: parseInt(folderId) // Convertendo string para número
        })
      })

      if (!response.ok) {
        throw new Error("Failed to create cards")
      }

      const updatedFolder = await response.json()
      
      setFolders(prev => 
        prev.map(folder => 
          folder.id === folderId 
          ? {
              ...updatedFolder,
              name: folder.name,
              flashcards: [
                ...(folder.flashcards || []), // Usa o array existente ou cria um novo se não existir
                updatedFolder
              ]
            } 
          : folder
        )
      )
      
    } catch (err) {
      console.error("Error creating cards:", err)
      setError("Failed to create cards")
    }
  }

  const handleCardIndexChange = (newIndex: number) => {
    setCurrentCardIndex(newIndex)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-center p-4">
          <p>Error: {error}</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header
        folders={folders}
        currentFolderId={currentFolderId}
        currentCardIndex={currentCardIndex}
        onSelectFolder={handleFolderSelect}
        onSelectCard={(index) => {
          if (currentFolderId) {
            handleCardSelect(currentFolderId, index)
          }
        }}
        onAddFolder={handleAddFolder}
        onRenameFolder={handleRenameFolder}
        onDeleteFolder={handleDeleteFolder}
      />

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
            onCreateCards={(folderId, newCards) => handleCreateCards(folderId, newCards)}
            onIndexChange={handleCardIndexChange}
          />
        </div>
      </div>
    </div>
  )
}
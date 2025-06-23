"use client"

import { useState, useEffect } from "react"
import { FolderSidebar } from "@/components/folder-sidebar"
import { FlashcardContent } from "@/components/flashcard-content"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import { Header } from "./header"
import { PanelLeft } from 'lucide-react';

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
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile) // Sidebar aberto por padrão em desktop
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        setIsLoading(true)
        const token = localStorage.getItem("token")
        
        const response = await fetch("http://127.0.0.1:8000/folders/", {
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
      const response = await fetch("http://127.0.0.1:8000/folders/", {
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
      const response = await fetch(`http://127.0.0.1:8000/folders/${folderId}/`, {
        method: "PUT",
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
      const response = await fetch(`http://127.0.0.1:8000/folders/${folderId}/`, {
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

  const handleEditFlashcard = async (flashcardId: string, updatedData: { question: string, answer: string }) => {
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`http://127.0.0.1:8000/flashcards/${flashcardId}/`, {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    })

    if (!response.ok) {
      throw new Error("Failed to update flashcard")
    }

    const updatedFlashcard = await response.json()
    
    setFolders(prev => 
      prev.map(folder => ({
        ...folder,
        flashcards: folder.flashcards.map(card => 
          card.id === flashcardId ? updatedFlashcard : card
        )
      }))
    )
  } catch (err) {
    console.error("Error updating flashcard:", err)
    setError("Failed to update flashcard")
  }
}

const handleDeleteFlashcard = async (flashcardId: string) => {
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`http://127.0.0.1:8000/flashcards/${flashcardId}/`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error("Failed to delete flashcard")
    }

    setFolders(prev => 
      prev.map(folder => ({
        ...folder,
        flashcards: folder.flashcards.filter(card => card.id !== flashcardId)
      }))
    )

    // Ajustar o índice atual se necessário
    const currentFolder = folders.find(folder => folder.id === currentFolderId)
    if (currentFolder && currentCardIndex >= currentFolder.flashcards.length - 1) {
      setCurrentCardIndex(Math.max(0, currentFolder.flashcards.length - 2))
    }
  } catch (err) {
    console.error("Error deleting flashcard:", err)
    setError("Failed to delete flashcard")
  }
}

  const handleCreateCards = async (folderId: string, newCard: Omit<Flashcard, 'id'>) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:8000/flashcards/`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: newCard.question,
          answer: newCard.answer,
          folder_id: parseInt(folderId)
        })
      });

      if (!response.ok) {
        throw new Error("Failed to create cards");
      }

      const createdFlashcard = await response.json(); // Assumindo que retorna o novo flashcard criado
      
      setFolders(prev => 
        prev.map(folder => 
          folder.id === folderId 
            ? {
                ...folder,
                flashcards: [
                  ...(folder.flashcards || []),
                  {
                    id: createdFlashcard.id, // Certifique-se que a API retorna um ID
                    question: createdFlashcard.question,
                    answer: createdFlashcard.answer
                  }
                ]
              } 
            : folder
        )
      );
      
    } catch (err) {
      console.error("Error creating cards:", err);
      setError("Failed to create cards");
    }
  };

  const handleCardIndexChange = (newIndex: number) => {
    setCurrentCardIndex(newIndex)
  }

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(prefersDark)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  // Defina as classes de cor baseadas no dark mode
  const bgColor = darkMode ? "bg-gray-900" : "bg-gray-50"
  const textColor = darkMode ? "text-white" : "text-gray-900"
  const borderColor = darkMode ? "border-gray-700" : "border-gray-200"

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
    <div className={`flex flex-col h-screen ${darkMode ? "bg-gradient-to-br from-black via-gray-900 to-black" : "bg-gray-50"} `}>
      {/* Header */}
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        folders={folders}
        currentFolderId={currentFolderId}
        currentCardIndex={currentCardIndex}
        onSelectFolder={handleFolderSelect}
        onSelectCard={(folderId, cardIndex) => {
          if (currentFolderId) {
            handleCardSelect(currentFolderId, cardIndex)
          }
        }}
        onAddFolder={handleAddFolder}
        onRenameFolder={handleRenameFolder}
        onDeleteFolder={handleDeleteFolder}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden relative"> {/* Adicionado relative para posicionar o botão */}
        {/* Botão de toggle do sidebar */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`absolute top-4 z-10 p-2 ${darkMode ? "text-gray-100" : "text-slate-700"} transition-all duration-200`}
          style={{
            left: sidebarOpen ? 'calc(17rem - 12px)' : '0.5rem',
            transform: sidebarOpen ? 'translateX(0)' : 'translateX(0)',
          }}
        >

          <PanelLeft className={`w-5 h-5 ${darkMode ? "text-white" : "text-gray-800"}`} />

        </button>

        {/* Sidebar */}
        {(!isMobile || sidebarOpen) && (
          <div 
            className={`border-r ${borderColor} ${darkMode ? "bg-gray-800/80" : "bg-white/80"} backdrop-blur-sm overflow-y-auto transition-all duration-200`}
            style={{
              width: sidebarOpen ? '16rem' : '0',
              transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
              position: isMobile ? 'fixed' : 'relative',
              zIndex: 20,
              height: '100%',
            }}
          >
            <FolderSidebar
              darkMode={darkMode}
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

        {/* Overlay para mobile quando sidebar está aberto */}
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-10"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <div className={`flex-1 overflow-y-auto p-4 sm:p-6`}>
          <FlashcardContent
            darkMode={darkMode}
            folder={currentFolder}
            currentIndex={currentCardIndex}
            onCreateCards={(folderId, newCard) => handleCreateCards(folderId, newCard)}
            onEditFlashcard={handleEditFlashcard}
            onDeleteFlashcard={handleDeleteFlashcard}
            onIndexChange={handleCardIndexChange}
          />
        </div>
      </div>
    </div>
  )
}
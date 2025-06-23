"use client"

import { Menu, User } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react"
import type { FlashcardFolder } from "./flashcard-system"

interface HeaderProps {
  darkMode?: boolean
  toggleDarkMode?: () => void
  showSidebar?: boolean
  folders?: FlashcardFolder[]
  currentFolderId?: string
  currentCardIndex?: number
  onSelectFolder?: (folderId: string) => void
  onSelectCard?: (folderId: string, cardIndex: number)  => void
  onAddFolder?: (folderName: string) => void
  onRenameFolder?: (folderId: string, newName: string) => void
  onDeleteFolder?: (folderId: string) => void
}

export function Header({
  darkMode = true,
  toggleDarkMode,
  showSidebar = false,
  folders = [],
  currentFolderId,
  currentCardIndex,
  onSelectFolder,
  onSelectCard,
  onAddFolder,
  onRenameFolder,
  onDeleteFolder,
}: HeaderProps) {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const headerBg = darkMode ? "bg-gray-900" : "bg-white"
  const headerBorder = darkMode ? "border-gray-700" : "border-slate-200"
  const buttonVariant = darkMode ? "outline" : "default"

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    window.location.href = "/login"
  }

  const handleCardSelectWrapper = (folderId: string, cardIndex: number) => {
    onSelectCard?.(folderId, cardIndex); // Now matches the expected signature
    if (isMobile) setSidebarOpen(false);
  }

  const handleFolderSelectWrapper = (folderId: string) => {
    onSelectFolder?.(folderId)
    if (isMobile) setSidebarOpen(false)
  }

  return (
      <header className={`${headerBg} border-b ${headerBorder} px-4 py-3 flex items-center justify-between`}>
      <div className="flex items-center">
        {showSidebar && isMobile && (
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[280px]">
              <Header
                folders={folders}
                currentFolderId={currentFolderId}
                currentCardIndex={currentCardIndex}
                onSelectFolder={handleFolderSelectWrapper}
                onSelectCard={handleCardSelectWrapper}
                onAddFolder={onAddFolder}
                onRenameFolder={onRenameFolder}
                onDeleteFolder={onDeleteFolder}
              />
            </SheetContent>
          </Sheet>
        )}
        <a href="/"> 
          <h5 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
            Flashcard System
          </h5>
        </a>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant={buttonVariant} 
          size="icon" 
          onClick={toggleDarkMode}
          className={`h-8 w-8 ${
            darkMode ? "bg-gray-900 text-amber-300 border-none hover:bg-gray-700 hover:text-amber-300" 
            : "bg-gray-200 text-amber-600 hover:bg-gray-300 hover:text-amber-600  "
          }`}
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </Button>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/user-default.png" alt="User" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem onClick={() => (window.location.href = "/profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
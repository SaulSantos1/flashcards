"use client"

import type React from "react"

import { useState } from "react"
import { FolderPlus, Folder, MoreHorizontal, Edit, Trash2, Plus, ChevronRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type { FlashcardFolder } from "./flashcard-system"

interface FolderSidebarProps {
  folders: FlashcardFolder[]
  currentFolderId: string
  currentCardIndex: number
  onSelectFolder: (folderId: string) => void
  onSelectCard: (folderId: string, cardIndex: number) => void
  onAddFolder: (folderName: string) => void
  onRenameFolder: (folderId: string, newName: string) => void
  onDeleteFolder: (folderId: string) => void
}

export function FolderSidebar({
  folders,
  currentFolderId,
  currentCardIndex,
  onSelectFolder,
  onSelectCard,
  onAddFolder,
  onRenameFolder,
  onDeleteFolder,
}: FolderSidebarProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [folderName, setFolderName] = useState("")
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null)
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({})

  const handleOpenAddDialog = () => {
    setFolderName("")
    setEditingFolderId(null)
    setIsDialogOpen(true)
  }

  const handleOpenEditDialog = (folderId: string, currentName: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setFolderName(currentName)
    setEditingFolderId(folderId)
    setIsDialogOpen(true)
  }

  const handleSaveFolder = () => {
    if (!folderName.trim()) return

    if (editingFolderId) {
      onRenameFolder(editingFolderId, folderName)
    } else {
      onAddFolder(folderName)
      // Auto-expand newly created folders
      setExpandedFolders((prev) => ({
        ...prev,
        [folderName]: true,
      }))
      console.log("FolderName value:", folderName);
    }

    setIsDialogOpen(false)
  }

  const toggleFolderExpanded = (folderId: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }))
    onSelectFolder(folderId)
  }

  const handleCardClick = (folderId: string, cardIndex: number) => {
    onSelectCard(folderId, cardIndex)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 flex items-center justify-between border-b border-slate-200">
        <h2 className="font-medium text-sm text-slate-500">FOLDERS</h2>
        <Button variant="ghost" size="icon" onClick={handleOpenAddDialog} className="h-7 w-7">
          <Plus size={16} />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {folders.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-sm text-slate-500 mb-2">No folders yet</p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenAddDialog}
              className="flex items-center gap-1 text-xs"
            >
              <FolderPlus size={14} />
              Create Folder
            </Button>
          </div>
        ) : (
          <ul className="py-2">
            {folders.map((folder) => {
              const isExpanded = expandedFolders[folder.id] || false
              const isActive = folder.id === currentFolderId

              return (
                <li key={folder.id} className="px-2">
                  <div
                    className={cn(
                      "flex items-center justify-between rounded-md px-2 py-1.5 text-sm cursor-pointer group",
                      isActive ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-100",
                    )}
                    onClick={() => toggleFolderExpanded(folder.id)}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      {isExpanded ? (
                        <ChevronDown size={14} className="text-slate-400" />
                      ) : (
                        <ChevronRight size={14} className="text-slate-400" />
                      )}
                      <Folder size={16} className={isActive ? "text-blue-500" : "text-slate-400"} />
                      <span className="truncate">{folder.name}</span>
                      <span className="text-xs text-slate-400 ml-1">({folder.flashcards.length})</span>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal size={14} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem
                          onClick={(e) => handleOpenEditDialog(folder.id, folder.name, e)}
                          className="cursor-pointer"
                        >
                          <Edit size={14} className="mr-2" />
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            if (folders.length > 1) {
                              onDeleteFolder(folder.id)
                            }
                          }}
                          className="cursor-pointer text-red-500 focus:text-red-500"
                          disabled={folders.length <= 1}
                        >
                          <Trash2 size={14} className="mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Flashcard questions list */}
                  {isExpanded && folder.flashcards.length > 0 && (
                    <ul className="ml-7 mt-1 mb-2 border-l border-slate-200 pl-2">
                      {folder.flashcards.map((card, index) => (
                        <li key={card.id}>
                          <div
                            className={cn(
                              "px-2 py-1 text-xs rounded-md cursor-pointer truncate",
                              isActive && currentCardIndex === index
                                ? "bg-blue-100 text-blue-700"
                                : "text-slate-600 hover:bg-slate-50",
                            )}
                            onClick={() => handleCardClick(folder.id, index)}
                            title={card.question}
                          >
                            {card.question}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Empty folder message */}
                  {isExpanded && folder.flashcards.length === 0 && (
                    <div className="ml-7 mt-1 mb-2 pl-2 text-xs text-slate-400 italic">No flashcards yet</div>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>

      <div className="p-3 border-t border-slate-200">
        <Button
          variant="outline"
          size="sm"
          onClick={handleOpenAddDialog}
          className="w-full flex items-center gap-1 text-xs"
        >
          <FolderPlus size={14} />
          New Folder
        </Button>
      </div>

      {/* Folder Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingFolderId ? "Rename Folder" : "Create New Folder"}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Folder name"
              className="w-full"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveFolder}
              disabled={!folderName.trim()}
              className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500"
            >
              {editingFolderId ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

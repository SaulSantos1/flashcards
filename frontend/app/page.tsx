// app/page.tsx
'use client' // Adicione esta linha no topo

import { useEffect, useState } from 'react'
import { WelcomeScreen } from "@/components/welcome-screen"
import { FlashcardSystem } from "@/components/flashcard-system"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    // Isso só executa no lado do cliente
    const token = localStorage.getItem("token")
    setIsAuthenticated(!!token)
  }, [])

  if (isAuthenticated === null) {
    return <Skeleton className="w-full h-screen" />
  }

  if (isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <FlashcardSystem />
      </main>
    )
  }

  return <WelcomeScreen />
}
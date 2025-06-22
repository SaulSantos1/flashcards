// app/login/page.tsx
'use client'

import { LoginForm } from "@/components/login-form"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    
    if (token) {
      router.push("/")
    } else {
      setIsCheckingAuth(false)
    }
  }, [router])

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="flex flex-col items-center">
          {/* Spinner animado */}
          <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/"> 
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
              Flashcard System
            </h1>
          </a>
          <p className="text-slate-500 mt-2">Sign in to access your flashcards</p>
        </div>

        <LoginForm />

        <div className="mt-6 text-center text-sm text-slate-500">
          <p>
            Don&apos;t have an account?{" "}
            <a href="/signup" className="font-medium text-blue-500 hover:text-blue-600 transition-colors">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
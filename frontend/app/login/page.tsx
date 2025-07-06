'use client'

import { LoginForm } from "@/components/login-form"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    
    if (token) {
      router.push("/")
    } else {
      setIsCheckingAuth(false)
    }

    // Check user's preferred color scheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(prefersDark)
  }, [router])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const bgGradient = darkMode 
    ? "bg-gradient-to-br from-black via-gray-900 to-black" 
    : "bg-gradient-to-br from-slate-50 to-blue-50"
  
  const textColor = darkMode ? "text-white" : "text-gray-900"
  const textSecondary = darkMode ? "text-gray-400" : "text-gray-600"
  const linkColor = darkMode ? "text-cyan-400 hover:text-cyan-300" : "text-blue-500 hover:text-blue-600"

  if (isCheckingAuth) {
    return (
      <div className={`min-h-screen w-full flex items-center justify-center ${bgGradient}`}>
        <div className="flex flex-col items-center">
          <div className={`h-12 w-12 border-4 ${darkMode ? "border-cyan-400" : "border-blue-500"} border-t-transparent rounded-full animate-spin mb-4`}></div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center ${bgGradient} p-4 sm:p-8 transition-colors duration-300`}>
      {/* Botão de Toggle Dark Mode no canto superior direito */}
      <button
        onClick={toggleDarkMode}
        className={`fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full ${
          darkMode ? "bg-gray-800 text-amber-300" : "bg-gray-200 text-amber-600"
        } transition-all`}
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      {darkMode ? (
        <>
          <div className="fixed -left-40 -top-40 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl"></div>
          <div className="fixed -right-40 -top-60 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"></div>
          <div className="fixed -bottom-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-purple-500/5 blur-3xl"></div>
        </>
      ) : (
        <>
          <div className="fixed -left-40 -top-40 h-80 w-80 rounded-full bg-purple-500/5 blur-3xl"></div>
          <div className="fixed -right-40 -top-60 h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl"></div>
          <div className="fixed -bottom-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-purple-500/3 blur-3xl"></div>
        </>
      )}

      {/* Grid Pattern Overlay */}
      <div className={`fixed inset-0 bg-[url('/grid-pattern.svg')] bg-center ${
        darkMode ? "opacity-10" : "opacity-5"
      }`}></div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <a href="/"> 
            <h1 className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400 ${darkMode ? "via-purple-500" : ""}`}>
              Flashcard System
            </h1>
          </a>
          <p className={`${textSecondary} mt-2`}>Sign in to access your flashcards</p>
        </div>

        <LoginForm darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <div className="mt-6 text-center text-sm">
          <p className={textSecondary}>
            Don&apos;t have an account?{" "}
            <a href="/signup" className={`font-medium ${linkColor} transition-colors`}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
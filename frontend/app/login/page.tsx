import { LoginForm } from "@/components/login-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login | Flashcard System",
  description: "Login to access your flashcards",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
            Flashcard System
          </h1>
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

import { SignUpForm } from "@/components/signup-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign up | Flashcard System",
  description: "Sign up to access your flashcards",
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
            Flashcard System
          </h1>
          <p className="text-slate-500 mt-2">Sign in to access your flashcards</p>
        </div>

        <SignUpForm />

        <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
            Login
            </a>
        </div>
      </div>
    </div>
  )
}

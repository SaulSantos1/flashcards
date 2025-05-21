"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Brain, Folders, Lightbulb, LayoutGrid, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react"
import { FlashcardSystem } from "@/components/flashcard-system"

export function WelcomeScreen() {
  const [getStarted, setGetStarted] = useState(false)

  if (getStarted) {
    return <FlashcardSystem />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 p-2 bg-blue-50 rounded-full">
            <Brain className="h-10 w-10 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
            Futuristic Flashcard System
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A modern approach to learning with organized, interactive flashcards that help you master any subject.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              onClick={() => setGetStarted(true)}
              className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>

        {/* Feature Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 backdrop-blur-sm bg-white/80 border border-slate-200 shadow-md rounded-xl hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
              <Folders className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-800">Organized Folders</h3>
            <p className="text-slate-600">
              Keep your flashcards neatly organized in folders by subject, topic, or any system that works for you.
            </p>
          </Card>

          <Card className="p-6 backdrop-blur-sm bg-white/80 border border-slate-200 shadow-md rounded-xl hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
              <LayoutGrid className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-800">IDE-Style Interface</h3>
            <p className="text-slate-600">
              Navigate your study materials with an intuitive interface inspired by modern code editors.
            </p>
          </Card>

          <Card className="p-6 backdrop-blur-sm bg-white/80 border border-slate-200 shadow-md rounded-xl hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
              <Lightbulb className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-800">Interactive Learning</h3>
            <p className="text-slate-600">
              Flip cards, track progress, and engage with your study materials in a dynamic way.
            </p>
          </Card>
        </div>

        {/* Preview Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-slate-800">
            Designed for Effective Learning
          </h2>
          <div className="bg-white rounded-xl overflow-hidden shadow-xl border border-slate-200">
            <div className="aspect-[16/9] max-h-[600px] overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent z-10 pointer-events-none" />
              <img
                src="/placeholder.svg?height=600&width=1200"
                alt="Flashcard System Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                <Button
                  size="lg"
                  onClick={() => setGetStarted(true)}
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500"
                >
                  Try It Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-slate-800">
            Why Use Our Flashcard System?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-slate-800 mb-1">Boost Memory Retention</h3>
                <p className="text-slate-600">
                  Flashcards utilize active recall, one of the most effective learning techniques for long-term memory.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-slate-800 mb-1">Study Anywhere</h3>
                <p className="text-slate-600">
                  Access your flashcards from any device with a responsive design that works on desktop and mobile.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-slate-800 mb-1">Stay Organized</h3>
                <p className="text-slate-600">
                  Keep all your study materials in one place with our intuitive folder organization system.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-slate-800 mb-1">Save Time</h3>
                <p className="text-slate-600">
                  Create, edit, and study flashcards quickly with our streamlined interface and keyboard shortcuts.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-12 px-6 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100">
          <div className="inline-block mb-4">
            <Sparkles className="h-8 w-8 text-blue-500" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-800">
            Ready to Transform Your Learning Experience?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Join thousands of students who are already using our flashcard system to master new subjects and ace their
            exams.
          </p>
          <Button
            size="lg"
            onClick={() => setGetStarted(true)}
            className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500"
          >
            Get Started for Free
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-8 border-t border-slate-200">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2025 Flashcard System. All rights reserved.</p>
          <div className="mt-2 flex justify-center gap-4">
            <Link href="#" className="hover:text-blue-500 transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-blue-500 transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-blue-500 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

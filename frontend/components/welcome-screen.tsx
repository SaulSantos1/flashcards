"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Brain, Zap, BarChart3, Layers, Sparkles } from "lucide-react"
import { FlashcardSystem } from "@/components/flashcard-system"
import { FlashcardPreview } from "@/components/flashcard-preview"

export function WelcomeScreen() {
  const [getStarted, setGetStarted] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    setIsAuthenticated(!!token)
  }, [])

  if (getStarted) {
    if (isAuthenticated) {
      return <FlashcardSystem />
    } else {
      router.push("/login")
      return null
    }
  }

    return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl"></div>
          <div className="absolute -right-40 -top-60 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"></div>
          <div className="absolute -bottom-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-purple-500/5 blur-3xl"></div>

          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10"></div>

          <div className="container mx-auto px-4 py-20 md:py-32">
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 inline-block rounded-full bg-gray-800/50 px-4 py-1.5 text-sm text-cyan-400 backdrop-blur-sm"
              >
                The Future of Learning
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-6 text-4xl font-bold tracking-tight text-white md:text-7xl"
              >
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Neuro<span className="font-extralight">Flash</span>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-10 max-w-2xl text-lg text-gray-400"
              >
                Accelerate your learning with our advanced flashcard system powered by cognitive science. Designed for
                the future, built for your brain.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600"
                >
                  <Link href="/login?tab=register">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-gray-700 bg-black/30 text-gray-300 backdrop-blur-sm transition-all hover:border-cyan-500 hover:text-cyan-400"
                >
                  <Link href="/login">Login</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Flashcard Preview Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-between">
              <div className="mb-10 max-w-xl lg:mb-0 lg:pr-10">
                <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    Intelligent Flashcards
                  </span>
                </h2>
                <p className="mb-8 text-gray-400">
                  Our flashcards are designed with advanced cognitive principles to optimize your learning experience.
                  The interactive 3D interface engages your spatial memory, while our spaced repetition algorithm
                  ensures you review cards at the perfect moment for maximum retention.
                </p>

                <ul className="space-y-4">
                  {[
                    { icon: Brain, title: "Cognitive Science", description: "Built on proven memory research" },
                    {
                      icon: Zap,
                      title: "Accelerated Learning",
                      description: "Learn up to 3x faster than traditional methods",
                    },
                    {
                      icon: BarChart3,
                      title: "Progress Tracking",
                      description: "Visualize your improvement over time",
                    },
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 p-2">
                        <feature.icon className="h-5 w-5 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{feature.title}</h3>
                        <p className="text-sm text-gray-400">{feature.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative h-[400px] w-full max-w-md lg:w-1/2">
                <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-purple-500/5 blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-cyan-500/5 blur-3xl"></div>

                <FlashcardPreview />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Why NeuroFlash?
                </span>
              </h2>
              <p className="mx-auto max-w-2xl text-gray-400">
                Our platform combines cutting-edge technology with proven learning methods to create the most effective
                flashcard system available.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Layers,
                  title: "Organized Topics",
                  description: "Categorize your flashcards into topics for structured learning paths",
                },
                {
                  icon: Sparkles,
                  title: "AI-Enhanced Content",
                  description: "Smart suggestions help you create more effective flashcards",
                },
                {
                  icon: Brain,
                  title: "Memory Optimization",
                  description: "Algorithms adapt to your learning patterns for maximum retention",
                },
                {
                  icon: Zap,
                  title: "Quick Creation",
                  description: "Create beautiful, effective flashcards in seconds",
                },
                {
                  icon: BarChart3,
                  title: "Detailed Analytics",
                  description: "Track your progress with comprehensive learning metrics",
                },
                {
                  icon: ArrowRight,
                  title: "Cross-Platform",
                  description: "Access your flashcards anywhere, anytime, on any device",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition-all hover:border-gray-700 hover:shadow-[0_0_15px_rgba(0,200,255,0.1)]"
                >
                  <div className="mb-4 inline-flex rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 p-3">
                    <feature.icon className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 md:p-12">
              <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl"></div>
              <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl"></div>

              <div className="relative z-10 flex flex-col items-center text-center md:flex-row md:text-left">
                <div className="md:flex-1">
                  <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Ready to transform your learning?</h2>
                  <p className="mb-6 text-gray-400 md:mb-0">
                    Join thousands of students and professionals who have accelerated their learning with NeuroFlash.
                  </p>
                </div>

                <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600"
                  >
                    <Link href="/login?tab=register">
                      Create Free Account <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-between md:flex-row">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-bold text-white">
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Neuro<span className="font-extralight">Flash</span>
                  </span>
                </h2>
                <p className="text-sm text-gray-500">© 2025 NeuroFlash. All rights reserved.</p>
              </div>

              <div className="flex space-x-6">
                <Link href="/terms" className="text-sm text-gray-400 hover:text-cyan-400">
                  Terms
                </Link>
                <Link href="/privacy" className="text-sm text-gray-400 hover:text-cyan-400">
                  Privacy
                </Link>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-cyan-400">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}

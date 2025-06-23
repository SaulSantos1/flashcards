"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Brain, Zap, BarChart3, Layers, Sparkles, Sun, Moon } from "lucide-react"
import { FlashcardSystem } from "@/components/flashcard-system"
import { FlashcardPreview } from "@/components/flashcard-preview"

export function WelcomeScreen() {
  const [getStarted, setGetStarted] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [darkMode, setDarkMode] = useState(true) // Default to dark mode
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    setIsAuthenticated(!!token)
    
    // Check user's preferred color scheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(prefersDark)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  if (getStarted) {
    if (isAuthenticated) {
      return <FlashcardSystem />
    } else {
      router.push("/login")
      return null
    }
  }

  const bgGradient = darkMode 
    ? "bg-gradient-to-br from-black via-gray-900 to-black" 
    : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200"

  const textColor = darkMode ? "text-white" : "text-gray-900"
  const textSecondary = darkMode ? "text-gray-400" : "text-gray-600"
  const cardBg = darkMode ? "bg-gray-900/50" : "bg-white"
  const cardBorder = darkMode ? "border-gray-800" : "border-gray-200"
  const buttonVariant = darkMode ? "outline" : "default"
  const featureCardHover = darkMode 
    ? "hover:border-gray-700 hover:shadow-[0_0_15px_rgba(0,200,255,0.1)]" 
    : "hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,100,255,0.1)]"

  return (
    <>
      <main className={`min-h-screen ${bgGradient} transition-colors duration-300`}>
        {/* Theme Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className={`fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full ${
            darkMode ? "bg-gray-800 text-amber-300" : "bg-gray-200 text-amber-600"
          } transition-all`}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Hero Section */}
        <div className="relative overflow-hidden">
          {/* Background Elements */}
          {darkMode ? (
            <>
              <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl"></div>
              <div className="absolute -right-40 -top-60 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"></div>
              <div className="absolute -bottom-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-purple-500/5 blur-3xl"></div>
            </>
          ) : (
            <>
              <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-purple-500/5 blur-3xl"></div>
              <div className="absolute -right-40 -top-60 h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl"></div>
              <div className="absolute -bottom-20 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-purple-500/3 blur-3xl"></div>
            </>
          )}

          {/* Grid Pattern Overlay */}
          <div className={`absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center ${
            darkMode ? "opacity-10" : "opacity-5"
          }`}></div>

          <div className="container mx-auto px-4 py-20 md:py-32">
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`mb-6 inline-block rounded-full ${
                  darkMode ? "bg-gray-800/50 text-cyan-400" : "bg-gray-200/80 text-cyan-600"
                } px-4 py-1.5 text-sm backdrop-blur-sm`}
              >
                The Future of Learning
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`mb-6 text-4xl font-bold tracking-tight ${textColor} md:text-7xl`}
              >
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Neuro<span className="font-extralight">Flash</span>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`mb-10 max-w-2xl text-lg ${textSecondary}`}
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
                  <Link href="/signup">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant={buttonVariant}
                  size="lg"
                  className={`${
                    darkMode 
                      ? "border-gray-700 bg-black/30 text-gray-300 hover:border-cyan-500 hover:text-cyan-400" 
                      : "border-gray-300 bg-white/80 text-gray-700 hover:border-cyan-500 hover:text-cyan-600"
                  } backdrop-blur-sm transition-all`}
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
                <h2 className={`mb-6 text-3xl font-bold ${textColor} md:text-4xl`}>
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    Intelligent Flashcards
                  </span>
                </h2>
                <p className={`mb-8 ${textSecondary}`}>
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
                      <div className={`mr-4 rounded-full p-2 ${
                        darkMode 
                          ? "bg-gradient-to-br from-cyan-500/20 to-purple-500/20" 
                          : "bg-gradient-to-br from-cyan-500/10 to-purple-500/10"
                      }`}>
                        <feature.icon className={`h-5 w-5 ${
                          darkMode ? "text-cyan-400" : "text-cyan-600"
                        }`} />
                      </div>
                      <div>
                        <h3 className={`font-medium ${textColor}`}>{feature.title}</h3>
                        <p className={`text-sm ${textSecondary}`}>{feature.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative h-[400px] w-full max-w-md lg:w-1/2">
                {darkMode && (
                  <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-purple-500/5 blur-3xl"></div>
                )}
                
                <FlashcardPreview darkMode={darkMode} />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className={`mb-4 text-3xl font-bold ${textColor} md:text-4xl`}>
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Why NeuroFlash?
                </span>
              </h2>
              <p className={`mx-auto max-w-2xl ${textSecondary}`}>
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
                  className={`rounded-xl border ${cardBorder} ${cardBg} p-6 transition-all ${featureCardHover}`}
                >
                  <div className={`mb-4 inline-flex rounded-full p-3 ${
                    darkMode 
                      ? "bg-gradient-to-br from-cyan-500/20 to-purple-500/20" 
                      : "bg-gradient-to-br from-cyan-500/10 to-purple-500/10"
                  }`}>
                    <feature.icon className={`h-6 w-6 ${
                      darkMode ? "text-cyan-400" : "text-cyan-600"
                    }`} />
                  </div>
                  <h3 className={`mb-2 text-xl font-semibold ${textColor}`}>{feature.title}</h3>
                  <p className={textSecondary}>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className={`relative overflow-hidden rounded-2xl border ${
              darkMode ? "border-gray-800" : "border-gray-200"
            } ${
              darkMode 
                ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black" 
                : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200"
            } p-8 md:p-12`}>
              {darkMode ? (
                <>
                  <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl"></div>
                  <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl"></div>
                </>
              ) : (
                <>
                  <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-purple-500/5 blur-3xl"></div>
                  <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-cyan-500/5 blur-3xl"></div>
                </>
              )}

              <div className="relative z-10 flex flex-col items-center text-center md:flex-row md:text-left">
                <div className="md:flex-1">
                  <h2 className={`mb-4 text-3xl font-bold ${textColor} md:text-4xl`}>Ready to transform your learning?</h2>
                  <p className={`mb-6 ${textSecondary} md:mb-0`}>
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
        <footer className={`border-t ${
          darkMode ? "border-gray-800" : "border-gray-200"
        } py-12`}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-between md:flex-row">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-bold text-white">
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Neuro<span className="font-extralight">Flash</span>
                  </span>
                </h2>
                <p className={`text-sm ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                }`}>© 2025 NeuroFlash. All rights reserved.</p>
              </div>

              <div className="flex space-x-6">
                <Link href="/terms" className={`text-sm ${
                  darkMode ? "text-gray-400 hover:text-cyan-400" : "text-gray-500 hover:text-cyan-600"
                }`}>
                  Terms
                </Link>
                <Link href="/privacy" className={`text-sm ${
                  darkMode ? "text-gray-400 hover:text-cyan-400" : "text-gray-500 hover:text-cyan-600"
                }`}>
                  Privacy
                </Link>
                <Link href="/contact" className={`text-sm ${
                  darkMode ? "text-gray-400 hover:text-cyan-400" : "text-gray-500 hover:text-cyan-600"
                }`}>
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
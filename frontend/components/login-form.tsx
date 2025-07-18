"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon, Loader2, Github, Sun, Moon } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface LoginFormProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

export function LoginForm({ darkMode, toggleDarkMode }: LoginFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  })

  const bgGradient = darkMode 
    ? "bg-gradient-to-br from-black via-gray-900 to-black" 
    : "bg-gradient-to-br from-slate-50 to-blue-50"
  
  const textColor = darkMode ? "text-white" : "text-gray-900"
  const textSecondary = darkMode ? "text-gray-400" : "text-gray-600"
  const cardBg = darkMode ? "bg-gray-900/80" : "bg-white/80"
  const cardBorder = darkMode ? "border-gray-800" : "border-gray-200"
  const buttonVariant = darkMode ? "outline" : "default"
  const inputBg = darkMode ? "bg-gray-800/50" : "bg-white"
  const inputBorder = darkMode ? "border-gray-700" : "border-gray-200"
  const errorBg = darkMode ? "bg-red-900/30" : "bg-red-50"
  const errorBorder = darkMode ? "border-red-800" : "border-red-200"
  const errorText = darkMode ? "text-red-400" : "text-red-600"
  const dividerText = darkMode ? "bg-gray-900 text-gray-500" : "bg-white text-gray-400"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear errors when typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      rememberMe: checked,
    })
  }

  const validateForm = () => {
    let valid = true
    const newErrors = { ...errors }

    if (!formData.email) {
      newErrors.email = "Email is required"
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
      valid = false
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
      valid = false
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return
    setIsLoading(true)
    setErrors({ ...errors, general: "" })

    try {
      const response = await fetch("http://localhost:8000/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || "Login failed")
      }

      localStorage.setItem("token", data.access_token)
      router.push("/")
    } catch (error) {
        let message = "Something went wrong"

        if (error instanceof Error) {
          message = error.message
        }
      setErrors({
        ...errors,
        general: message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    setIsLoading(true)
    // Simulate Google login
    setTimeout(() => {
      router.push("/")
    }, 1500)
  }

  const handleGithubLogin = () => {
    setIsLoading(true)
    // Simulate GitHub login
    setTimeout(() => {
      router.push("/")
    }, 1500)
  }

  return (
    <Card className={`backdrop-blur-sm ${cardBg} ${cardBorder} shadow-lg rounded-xl p-6`}>
      {errors.general && (
        <div className={`mb-4 p-3 ${errorBg} border ${errorBorder} ${errorText} text-sm rounded-lg`}>
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className={textColor}>Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className={`${inputBg} ${inputBorder} ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            disabled={isLoading}
          />
          {errors.email && <p className={`${errorText} text-xs mt-1`}>{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className={textColor}>Password</Label>
            <a 
              href="/forgot-password" 
              className={`text-xs ${darkMode ? "text-cyan-400 hover:text-cyan-300" : "text-blue-500 hover:text-blue-600"} transition-colors`}
            >
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className={`${inputBg} ${inputBorder} ${errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${darkMode ? "text-gray-400 hover:text-gray-300" : "text-slate-400 hover:text-slate-600"}`}
              tabIndex={-1}
            >
              {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          </div>
          {errors.password && <p className={`${errorText} text-xs mt-1`}>{errors.password}</p>}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={formData.rememberMe}
            onCheckedChange={handleCheckboxChange}
            disabled={isLoading}
          />
          <Label htmlFor="remember" className={`text-sm font-normal cursor-pointer ${textColor}`}>
            Remember me
          </Label>
        </div>

        <Button
          type="submit"
          className={`w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 ${darkMode ? "text-white" : ""}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <Separator className={`w-full ${darkMode ? "bg-gray-700" : ""}`} />
        </div>
        <div className="relative flex justify-center">
          <span className={`${dividerText} px-2 text-xs`}>OR CONTINUE WITH</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant={buttonVariant}
          className={`w-full ${darkMode ? "border-gray-700 bg-gray-800/50 hover:bg-gray-700/50" : "border-gray-200"}`}
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </Button>
        <Button
          type="button"
          variant={buttonVariant}
          className={`w-full ${darkMode ? "border-gray-700 bg-gray-800/50 hover:bg-gray-700/50" : "border-gray-200"}`}
          onClick={handleGithubLogin}
          disabled={isLoading}
        >
          <Github className="mr-2 h-4 w-4" />
          GitHub
        </Button>
      </div>
    </Card>
  )
}
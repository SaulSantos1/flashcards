"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, User, Settings, BarChart3, Trophy, Calendar, Clock, BookOpen, Target, Edit, Save, X, Camera, Mail, Phone, MapPin, Globe } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Header } from "./header"
import Link from "next/link"

interface UserData {
  name: string
  email: string
  phone: string
  location: string
  website: string
  bio: string
  avatar: string
  joinDate: string
  studyStreak: number
  totalCards: number
  totalFolders: number
  studyTime: number
  accuracy: number
}

interface StudyStats {
  cardsStudied: number
  timeSpent: number
  accuracy: number
  streak: number
  weeklyGoal: number
  weeklyProgress: number
}

export function UserProfile() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState<UserData>({
    name: "Saul Santos",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "https://alexjohnson.dev",
    bio: "Computer Science student passionate about learning and technology. Love using flashcards to master new concepts!",
    avatar: "/placeholder.svg?height=120&width=120",
    joinDate: "January 2024",
    studyStreak: 15,
    totalCards: 247,
    totalFolders: 8,
    studyTime: 45,
    accuracy: 87
  })

  const [editedData, setEditedData] = useState(userData)
  const [studyStats, setStudyStats] = useState<StudyStats>({
    cardsStudied: 32,
    timeSpent: 45,
    accuracy: 87,
    streak: 15,
    weeklyGoal: 100,
    weeklyProgress: 68
  })

  const achievements = [
    { id: 1, title: "First Steps", description: "Created your first flashcard", icon: "🎯", earned: true },
    { id: 2, title: "Organized Learner", description: "Created 5 folders", icon: "📁", earned: true },
    { id: 3, title: "Study Streak", description: "Studied for 7 days in a row", icon: "🔥", earned: true },
    { id: 4, title: "Quick Learner", description: "Achieved 90% accuracy", icon: "⚡", earned: false },
    { id: 5, title: "Dedicated Student", description: "Studied for 30 days", icon: "📚", earned: false },
    { id: 6, title: "Master", description: "Created 100 flashcards", icon: "🏆", earned: false }
  ]

  const recentActivity = [
    { id: 1, action: "Studied React Basics", time: "2 hours ago", type: "study" },
    { id: 2, action: "Created new folder: TypeScript", time: "1 day ago", type: "create" },
    { id: 3, action: "Completed JavaScript quiz", time: "2 days ago", type: "complete" },
    { id: 4, action: "Added 5 new cards to CSS folder", time: "3 days ago", type: "add" },
    { id: 5, action: "Achieved 7-day study streak", time: "1 week ago", type: "achievement" }
  ]

  const handleEdit = () => {
    setEditedData(userData)
    setIsEditing(true)
  }

  const handleSave = () => {
    setUserData(editedData)
    setIsEditing(false)
    // Here you would typically save to a backend
  }

  const handleCancel = () => {
    setEditedData(userData)
    setIsEditing(false)
  }

  const handleInputChange = (field: keyof UserData, value: string) => {
    setEditedData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex items-center gap-4 mb-2">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400 my-3 mx-5">
          Profile
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card className="backdrop-blur-sm bg-white/80 border border-slate-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                    <AvatarFallback className="text-lg">
                      {userData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="icon"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                    >
                      <Camera size={14} />
                    </Button>
                  )}
                </div>

                {isEditing ? (
                  <div className="w-full space-y-3">
                    <Input
                      value={editedData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="text-center font-semibold"
                    />
                    <Textarea
                      value={editedData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Tell us about yourself..."
                      className="text-center text-sm resize-none"
                      rows={3}
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold text-slate-800 mb-2">{userData.name}</h2>
                    <p className="text-slate-600 text-sm mb-4">{userData.bio}</p>
                  </>
                )}

                <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                  <Calendar size={14} />
                  <span>Joined {userData.joinDate}</span>
                </div>

                {isEditing ? (
                  <div className="flex gap-2 w-full">
                    <Button onClick={handleSave} size="sm" className="flex-1">
                      <Save size={14} className="mr-1" />
                      Save
                    </Button>
                    <Button onClick={handleCancel} variant="outline" size="sm" className="flex-1">
                      <X size={14} className="mr-1" />
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button onClick={handleEdit} variant="outline" size="sm" className="w-full">
                    <Edit size={14} className="mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>

              <Separator className="my-6" />

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">{userData.totalCards}</div>
                  <div className="text-xs text-slate-500">Total Cards</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">{userData.totalFolders}</div>
                  <div className="text-xs text-slate-500">Folders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">{userData.studyStreak}</div>
                  <div className="text-xs text-slate-500">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-500">{userData.accuracy}%</div>
                  <div className="text-xs text-slate-500">Accuracy</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Study Progress */}
              <Card className="backdrop-blur-sm bg-white/80 border border-slate-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    Weekly Study Goal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Progress this week</span>
                      <span className="font-medium">{studyStats.weeklyProgress}/{studyStats.weeklyGoal} cards</span>
                    </div>
                    <Progress value={(studyStats.weeklyProgress / studyStats.weeklyGoal) * 100} className="h-2" />
                    <p className="text-xs text-slate-500">
                      {studyStats.weeklyGoal - studyStats.weeklyProgress} cards remaining to reach your goal
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="backdrop-blur-sm bg-white/80 border border-slate-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-green-500" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'study' ? 'bg-blue-500' :
                          activity.type === 'create' ? 'bg-green-500' :
                          activity.type === 'complete' ? 'bg-purple-500' :
                          activity.type === 'add' ? 'bg-orange-500' :
                          'bg-yellow-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-800">{activity.action}</p>
                          <p className="text-xs text-slate-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Statistics Tab */}
            <TabsContent value="stats" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="backdrop-blur-sm bg-white/80 border border-slate-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-blue-500" />
                      Study Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Cards Studied Today</span>
                      <span className="font-semibold">{studyStats.cardsStudied}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Time Spent Today</span>
                      <span className="font-semibold">{studyStats.timeSpent} min</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Current Accuracy</span>
                      <span className="font-semibold">{studyStats.accuracy}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Study Streak</span>
                      <span className="font-semibold">{studyStats.streak} days</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-sm bg-white/80 border border-slate-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-green-500" />
                      Learning Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>React Basics</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>JavaScript</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>CSS & Styling</span>
                        <span>78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6">
              <Card className="backdrop-blur-sm bg-white/80 border border-slate-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          achievement.earned
                            ? 'border-green-200 bg-green-50'
                            : 'border-slate-200 bg-slate-50 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-800">{achievement.title}</h3>
                            <p className="text-sm text-slate-600">{achievement.description}</p>
                          </div>
                          {achievement.earned && (
                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                              Earned
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card className="backdrop-blur-sm bg-white/80 border border-slate-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-slate-500" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Mail size={16} className="text-slate-400" />
                            <Input
                              id="email"
                              value={editedData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Phone size={16} className="text-slate-400" />
                            <Input
                              id="phone"
                              value={editedData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <MapPin size={16} className="text-slate-400" />
                            <Input
                              id="location"
                              value={editedData.location}
                              onChange={(e) => handleInputChange('location', e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="website">Website</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Globe size={16} className="text-slate-400" />
                            <Input
                              id="website"
                              value={editedData.website}
                              onChange={(e) => handleInputChange('website', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                        <Mail size={16} className="text-slate-400" />
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <p className="text-sm text-slate-600">{userData.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                        <Phone size={16} className="text-slate-400" />
                        <div>
                          <p className="text-sm font-medium">Phone</p>
                          <p className="text-sm text-slate-600">{userData.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                        <MapPin size={16} className="text-slate-400" />
                        <div>
                          <p className="text-sm font-medium">Location</p>
                          <p className="text-sm text-slate-600">{userData.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                        <Globe size={16} className="text-slate-400" />
                        <div>
                          <p className="text-sm font-medium">Website</p>
                          <p className="text-sm text-slate-600">{userData.website}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="backdrop-blur-sm bg-white/80 border border-red-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-red-600">Danger Zone</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-slate-800">Delete Account</h3>
                      <p className="text-sm text-slate-600">Permanently delete your account and all data</p>
                    </div>
                    <Button variant="destructive" size="sm">
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
import { UserProfile } from "@/components/user-profile"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Profile | Flashcard System",
  description: "Manage your profile and account settings",
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <UserProfile />
    </div>
  )
}
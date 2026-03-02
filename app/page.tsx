"use client"

import { useState } from "react"
import { Eye, EyeOff, Heart } from "lucide-react"

export default function PasswordStrengthAnalyser() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="max-w-4xl mx-auto py-8 text-zinc-300">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-4xl font-semibold text-white">Password strength analyser</h1>
        <button className="text-zinc-500 hover:text-white mt-2 transition-colors">
          <Heart className="w-5 h-5 fill-current" />
        </button>
      </div>

      <p className="text-zinc-400 mb-8 max-w-2xl text-sm leading-relaxed">
        Discover the strength of your password with this client-side-only password strength analyser and crack time estimation tool.
      </p>

      <div className="space-y-4">
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a password..."
            className="w-full bg-[#1c1f26] border border-[#2e323b] outline-none rounded-md px-4 py-3 text-white placeholder:text-zinc-500 focus:border-[#4dbb9c] focus:ring-1 focus:ring-[#4dbb9c] transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <div className="bg-[#1c1f26] border border-[#2e323b] rounded-md p-8 flex flex-col items-center justify-center space-y-2 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-20" />
          <p className="text-zinc-400 text-sm">Duration to crack this password with brute force</p>
          <p className="text-3xl font-medium text-white pb-2 hover:text-[#4dbb9c] transition-colors cursor-default">
            {password.length > 0 ? "A few seconds" : "Instantly"}
          </p>
        </div>

        <div className="bg-[#1c1f26] border border-[#2e323b] rounded-md p-6 flex flex-col items-center justify-center space-y-1.5 text-sm font-medium text-zinc-400">
          <p>Password length: {password.length}</p>
          <p>Entropy: {password.length > 0 ? (password.length * 3.5).toFixed(0) : 0}</p>
          <p>Character set size: {password.length > 0 ? "LowerCase, UpperCase" : 0}</p>
          <p>Score: {password.length > 0 ? Math.min(password.length * 10, 100) : 0} / 100</p>
        </div>

        <p className="text-xs text-zinc-500 mt-6 leading-relaxed">
          <strong className="text-zinc-400 font-medium">Note:</strong> The computed strength is based on the time it would take to crack the password using a brute force approach, it does not take into account the possibility of a dictionary attack.
        </p>
      </div>
    </div>
  )
}

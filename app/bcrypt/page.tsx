"use client"

import { useState, useCallback } from "react"
import { Heart, Copy, Check } from "lucide-react"
import bcrypt from "bcryptjs"

export default function Bcrypt() {
    const [text, setText] = useState("")
    const [rounds, setRounds] = useState(10)
    const [hash, setHash] = useState("")
    const [isCopying, setIsCopying] = useState(false)

    const generateHash = useCallback(() => {
        if (!text) {
            setHash("")
            return
        }
        try {
            const salt = bcrypt.genSaltSync(rounds)
            const result = bcrypt.hashSync(text, salt)
            setHash(result)
        } catch (error) {
            console.error(error)
        }
    }, [text, rounds])

    const copyToClipboard = () => {
        if (!hash) return
        if (navigator.clipboard) {
            navigator.clipboard.writeText(hash)
                .then(() => {
                    setIsCopying(true)
                    setTimeout(() => setIsCopying(false), 2000)
                })
                .catch(() => fallbackCopy())
        } else {
            fallbackCopy()
        }
    }

    const fallbackCopy = () => {
        const textArea = document.createElement("textarea")
        textArea.value = hash
        document.body.appendChild(textArea)
        textArea.select()
        try {
            document.execCommand('copy')
            setIsCopying(true)
            setTimeout(() => setIsCopying(false), 2000)
        } catch { }
        textArea.remove()
    }

    return (
        <div className="max-w-4xl mx-auto py-8 text-zinc-300">
            <div className="flex justify-between items-start mb-6">
                <div className="relative w-full border-b border-[#2e323b] pb-3">
                    <h1 className="text-4xl font-semibold text-white inline-block relative">
                        Bcrypt
                        <div className="absolute -bottom-[13px] left-0 w-full h-[2px] bg-[#4dbb9c]"></div>
                    </h1>
                    <button className="absolute right-0 top-2 text-zinc-500 hover:text-white transition-colors">
                        <Heart className="w-5 h-5 fill-current" />
                    </button>
                </div>
            </div>

            <p className="text-zinc-400 mb-8 max-w-3xl text-[15px] leading-relaxed">
                Hash and compare text string using bcrypt. Bcrypt is a password-hashing function designed by Niels Provos and David Mazières.
            </p>

            <div className="bg-[#1c1f26] border border-[#2e323b] rounded-md p-6 sm:p-8 shadow-sm">
                <div className="grid grid-cols-1 gap-6 mb-6">
                    <div>
                        <label className="block text-[15px] text-zinc-300 mb-2">String to hash</label>
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="String to hash..."
                            className="w-full bg-[#2a2e38] border border-transparent outline-none rounded-md px-4 py-3 text-white placeholder:text-zinc-500 focus:border-[#4dbb9c] transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-[15px] text-zinc-300 mb-2">Rounds ({rounds})</label>
                        <input
                            type="range"
                            min="4"
                            max="15"
                            value={rounds}
                            onChange={(e) => setRounds(Number(e.target.value))}
                            className="w-full h-1 appearance-none rounded-lg cursor-pointer bg-[#3e424b]"
                        />
                        <p className="text-xs text-zinc-500 mt-2">More rounds = more secure, but slower to generate.</p>
                    </div>

                    <div className="pt-2">
                        <button
                            onClick={generateHash}
                            className="px-6 py-2.5 bg-[#4dbb9c] hover:bg-[#3ea084] text-white rounded-md transition-colors text-sm font-medium shadow-sm w-full font-semibold"
                        >
                            Hash string
                        </button>
                    </div>

                    {hash && (
                        <div className="mt-4">
                            <label className="block text-[15px] text-zinc-300 mb-2">Bcrypt hash result:</label>
                            <div className="flex border border-[#2e323b] rounded-md overflow-hidden">
                                <input
                                    type="text"
                                    value={hash}
                                    readOnly
                                    className="flex-1 bg-[#2a2e38] px-4 py-3 text-zinc-300 outline-none font-mono text-[14px]"
                                />
                                <button
                                    onClick={copyToClipboard}
                                    className={`w-12 flex items-center justify-center border-l border-[#2e323b] transition-colors ${isCopying ? 'text-[#4dbb9c] bg-[#4dbb9c]/10' : 'bg-[#333842] text-zinc-400 hover:text-white hover:bg-[#3e424b]'}`}
                                >
                                    {isCopying ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

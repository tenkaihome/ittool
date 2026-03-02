"use client"

import { useState, useCallback, useEffect } from "react"
import { Heart, Copy, Check, RefreshCcw } from "lucide-react"
import * as bip39 from "bip39"

export default function BIP39Generator() {
    const [wordCount, setWordCount] = useState<12 | 15 | 18 | 21 | 24>(12)
    const [phrase, setPhrase] = useState("")
    const [isCopying, setIsCopying] = useState(false)

    const generatePhrase = useCallback(() => {
        // Using bit strength mappings standard to bip39:
        const strength = wordCount === 12 ? 128 : wordCount === 15 ? 160 : wordCount === 18 ? 192 : wordCount === 21 ? 224 : 256
        const mnemonic = bip39.generateMnemonic(strength)
        setPhrase(mnemonic)
    }, [wordCount])

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        generatePhrase()
    }, [generatePhrase])

    const copyToClipboard = () => {
        if (!phrase) return
        if (navigator.clipboard) {
            navigator.clipboard.writeText(phrase)
                .then(() => {
                    setIsCopying(true)
                    setTimeout(() => setIsCopying(false), 2000)
                })
                .catch(() => fallbackCopy(phrase))
        } else {
            fallbackCopy(phrase)
        }
    }

    const fallbackCopy = (text: string) => {
        const textArea = document.createElement("textarea")
        textArea.value = text
        document.body.appendChild(textArea)
        textArea.select()
        try {
            document.execCommand('copy')
            setIsCopying(true)
            setTimeout(() => setIsCopying(false), 2000)
        } catch { }
        textArea.remove()
    }

    const words = phrase.split(' ')

    return (
        <div className="max-w-4xl mx-auto py-8 text-zinc-300">
            <div className="flex justify-between items-start mb-6">
                <div className="relative w-full border-b border-[#2e323b] pb-3">
                    <h1 className="text-4xl font-semibold text-white inline-block relative">
                        BIP39 passphrase generator
                        <div className="absolute -bottom-[13px] left-0 w-full h-[2px] bg-[#4dbb9c]"></div>
                    </h1>
                    <button className="absolute right-0 top-2 text-zinc-500 hover:text-white transition-colors">
                        <Heart className="w-5 h-5 fill-current" />
                    </button>
                </div>
            </div>

            <p className="text-zinc-400 mb-8 max-w-3xl text-[15px] leading-relaxed">
                Generate a BIP39 mnemonic phrase to secure cryptocurrency wallets or use as a secure, memorable password.
            </p>

            <div className="bg-[#1c1f26] border border-[#2e323b] rounded-md p-6 sm:p-8 shadow-sm">
                <div className="flex flex-wrap gap-6 mb-8 items-end">
                    <div className="flex-1 max-w-sm">
                        <label className="block text-[15px] text-zinc-300 mb-2">Word count</label>
                        <select
                            value={wordCount}
                            onChange={(e) => setWordCount(Number(e.target.value) as 12 | 15 | 18 | 21 | 24)}
                            className="w-full bg-[#2a2e38] border border-transparent rounded-md px-4 py-3 text-zinc-300 focus:outline-none focus:border-[#4dbb9c] transition-colors"
                        >
                            <option value={12}>12 words</option>
                            <option value={15}>15 words</option>
                            <option value={18}>18 words</option>
                            <option value={21}>21 words</option>
                            <option value={24}>24 words</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
                    {words.map((word, index) => (
                        <div key={index} className="flex bg-[#2a2e38] border border-[#3e424b] rounded-md overflow-hidden">
                            <div className="w-10 bg-[#333842] flex items-center justify-center text-zinc-500 font-medium border-r border-[#3e424b] select-none text-sm shrink-0">
                                {index + 1}
                            </div>
                            <div className="px-4 py-3 font-mono text-[15px] text-white font-medium flex-1">
                                {word}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex space-x-4">
                    <button
                        onClick={copyToClipboard}
                        className={`flex items-center px-6 py-2 rounded-md transition-colors text-sm font-medium ${isCopying ? 'bg-[#4dbb9c] text-white' : 'bg-[#333842] hover:bg-[#404652] text-zinc-300 hover:text-white'}`}
                    >
                        {isCopying ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                        {isCopying ? "Copied!" : "Copy passphrase"}
                    </button>
                    <button
                        onClick={generatePhrase}
                        className="flex items-center px-6 py-2 bg-[#4dbb9c] hover:bg-[#3ea084] text-white rounded-md transition-colors text-sm font-medium shadow-sm"
                    >
                        <RefreshCcw className="w-4 h-4 mr-2" />
                        Generate new
                    </button>
                </div>
            </div>
        </div>
    )
}

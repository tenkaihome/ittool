"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Heart } from "lucide-react"

export default function TokenGenerator() {
    const [uppercase, setUppercase] = useState(true)
    const [lowercase, setLowercase] = useState(true)
    const [numbers, setNumbers] = useState(true)
    const [symbols, setSymbols] = useState(false)
    const [length, setLength] = useState(64)
    const [token, setToken] = useState("")
    const [copied, setCopied] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const generateToken = useCallback(() => {
        let charset = ""
        if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        if (lowercase) charset += "abcdefghijklmnopqrstuvwxyz"
        if (numbers) charset += "0123456789"
        if (symbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?"

        if (charset === "") {
            setToken("")
            return
        }

        let result = ""
        // Use crypto.getRandomValues if available for better randomness
        if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
            const randomValues = new Uint32Array(length)
            window.crypto.getRandomValues(randomValues)
            for (let i = 0; i < length; i++) {
                result += charset[randomValues[i] % charset.length]
            }
        } else {
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length)
                result += charset[randomIndex]
            }
        }
        setToken(result)
    }, [uppercase, lowercase, numbers, symbols, length])

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        generateToken()
    }, [generateToken])

    const copyToClipboard = () => {
        if (token) {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(token).then(() => {
                    setCopied(true)
                    setTimeout(() => setCopied(false), 2000)
                }).catch(() => {
                    fallbackCopy()
                })
            } else {
                fallbackCopy()
            }

            if (textareaRef.current) {
                textareaRef.current.select()
            }
        }
    }

    const fallbackCopy = () => {
        if (textareaRef.current) {
            textareaRef.current.select()
            try {
                document.execCommand('copy')
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            } catch (err) {
                console.error("Failed to copy", err)
            }
        }
    }

    return (
        <div className="max-w-4xl mx-auto py-8 text-zinc-300">
            <div className="flex justify-between items-start mb-6">
                <div className="relative w-full border-b border-[#2e323b] pb-3">
                    <h1 className="text-4xl font-semibold text-white inline-block relative">
                        Token generator
                        <div className="absolute -bottom-[13px] left-0 w-full h-[2px] bg-[#4dbb9c]"></div>
                    </h1>
                    <button className="absolute right-0 top-2 text-zinc-500 hover:text-white transition-colors">
                        <Heart className="w-5 h-5 fill-current" />
                    </button>
                </div>
            </div>

            <p className="text-zinc-400 mb-8 max-w-3xl text-sm leading-relaxed">
                Generate random string with the chars you want, uppercase or lowercase letters, numbers and/or symbols.
            </p>

            <div className="bg-[#1c1f26] border border-[#2e323b] rounded-md p-8 shadow-sm">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 max-w-[560px] mx-auto mb-10 mt-6 md:pl-8">
                    <div className="flex items-center justify-between space-x-4">
                        <span className="text-[15px] text-zinc-300">Uppercase (ABC...)</span>
                        <Toggle checked={uppercase} onChange={setUppercase} />
                    </div>
                    <div className="flex items-center justify-between space-x-4">
                        <span className="text-[15px] text-zinc-300">Numbers (123...)</span>
                        <Toggle checked={numbers} onChange={setNumbers} />
                    </div>
                    <div className="flex items-center justify-between space-x-4">
                        <span className="text-[15px] text-zinc-300">Lowercase (abc...)</span>
                        <Toggle checked={lowercase} onChange={setLowercase} />
                    </div>
                    <div className="flex items-center justify-between space-x-4">
                        <span className="text-[15px] text-zinc-300">Symbols (!-;,...)</span>
                        <Toggle checked={symbols} onChange={setSymbols} />
                    </div>
                </div>

                <div className="mb-8 flex items-center max-w-[800px] mx-auto">
                    <label className="text-[15px] text-zinc-300 min-w-[110px] flex-shrink-0">Length ({length})</label>
                    <div className="w-full relative flex items-center">
                        <input
                            type="range"
                            min="1"
                            max="2048"
                            value={length}
                            onChange={(e) => setLength(Number(e.target.value))}
                            className="w-full h-1 appearance-none rounded-lg cursor-pointer bg-[#3e424b] z-10 custom-slider"
                            style={{ WebkitAppearance: 'none', background: `linear-gradient(to right, #4dbb9c ${(length - 1) / (2048 - 1) * 100}%, #3e424b ${(length - 1) / (2048 - 1) * 100}%)` }}
                        />
                    </div>
                </div>
                <style dangerouslySetInnerHTML={{
                    __html: `
            .custom-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                height: 20px;
                width: 20px;
                border-radius: 50%;
                background: #ffffff;
                cursor: pointer;
                box-shadow: 0 0 5px rgba(0,0,0,0.3);
            }
            .custom-slider::-moz-range-thumb {
                height: 20px;
                width: 20px;
                border-radius: 50%;
                background: #ffffff;
                cursor: pointer;
                border: none;
                box-shadow: 0 0 5px rgba(0,0,0,0.3);
            }
        `}} />

                <div className="relative mb-6 max-w-3xl mx-auto">
                    <textarea
                        ref={textareaRef}
                        value={token}
                        readOnly
                        className="w-full bg-[#2a2e38] border-none rounded-md px-6 py-8 text-center text-zinc-300 resize-y focus:outline-none min-h-[140px] shadow-inner text-[15px] leading-relaxed break-all font-sans"
                    />
                </div>

                <div className="flex justify-center space-x-4">
                    <button
                        onClick={copyToClipboard}
                        className={`px-6 py-2 rounded-md transition-all duration-200 text-sm font-medium ${copied ? "bg-[#4dbb9c] text-white !scale-105" : "bg-[#333842] hover:bg-[#404652] text-zinc-300 hover:text-white"}`}
                    >
                        {copied ? "Copied!" : "Copy"}
                    </button>
                    <button
                        onClick={generateToken}
                        className="px-6 py-2 bg-[#333842] hover:bg-[#404652] text-zinc-300 hover:text-white rounded-md transition-colors text-sm font-medium"
                    >
                        Refresh
                    </button>
                </div>
            </div>
        </div>
    )
}

function Toggle({ checked, onChange }: { checked: boolean, onChange: (v: boolean) => void }) {
    return (
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors flex-shrink-0 ${checked ? 'bg-[#4dbb9c]' : 'bg-[#515761]'}`}
        >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-[26px]' : 'translate-x-1'}`} />
        </button>
    )
}

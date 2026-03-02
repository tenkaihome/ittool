"use client"

import { useState } from "react"
import { Heart, Copy, Check, RefreshCcw } from "lucide-react"
import forge from "node-forge"

export default function RSAGenerator() {
    const [keySize, setKeySize] = useState<1024 | 2048 | 4096>(2048)
    const [privateKey, setPrivateKey] = useState("")
    const [publicKey, setPublicKey] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)
    const [copiedKey, setCopiedKey] = useState<"public" | "private" | null>(null)

    const generateKeys = () => {
        setIsGenerating(true)
        // Web worker would be better here, but timeout lets UI update
        setTimeout(() => {
            try {
                // Uses a synchronous method which blocks, but it's simpler for this tool
                const keypair = forge.pki.rsa.generateKeyPair({ bits: keySize, e: 0x10001 })
                setPrivateKey(forge.pki.privateKeyToPem(keypair.privateKey))
                setPublicKey(forge.pki.publicKeyToPem(keypair.publicKey))
            } catch {
                console.error("RSA generation failed")
            } finally {
                setIsGenerating(false)
            }
        }, 100)
    }

    const handleCopy = (text: string, type: "public" | "private") => {
        if (!text) return
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    setCopiedKey(type)
                    setTimeout(() => setCopiedKey(null), 2000)
                })
                .catch(() => fallbackCopy(text, type))
        } else {
            fallbackCopy(text, type)
        }
    }

    const fallbackCopy = (text: string, type: "public" | "private") => {
        const textArea = document.createElement("textarea")
        textArea.value = text
        document.body.appendChild(textArea)
        textArea.select()
        try {
            document.execCommand('copy')
            setCopiedKey(type)
            setTimeout(() => setCopiedKey(null), 2000)
        } catch { }
        textArea.remove()
    }

    return (
        <div className="max-w-4xl mx-auto py-8 text-zinc-300">
            <div className="flex justify-between items-start mb-6">
                <div className="relative w-full border-b border-[#2e323b] pb-3">
                    <h1 className="text-4xl font-semibold text-white inline-block relative">
                        RSA key pair generator
                        <div className="absolute -bottom-[13px] left-0 w-full h-[2px] bg-[#4dbb9c]"></div>
                    </h1>
                    <button className="absolute right-0 top-2 text-zinc-500 hover:text-white transition-colors">
                        <Heart className="w-5 h-5 fill-current" />
                    </button>
                </div>
            </div>

            <p className="text-zinc-400 mb-8 max-w-3xl text-[15px] leading-relaxed">
                Generate random RSA keypairs (public/private keys) right in your browser.
            </p>

            <div className="bg-[#1c1f26] border border-[#2e323b] rounded-md p-6 sm:p-8 shadow-sm">

                <div className="flex flex-col sm:flex-row items-end gap-6 mb-8">
                    <div className="flex-1 w-full max-w-xs">
                        <label className="block text-[15px] text-zinc-300 mb-2">Key Size</label>
                        <select
                            value={keySize}
                            onChange={(e) => setKeySize(Number(e.target.value) as 1024 | 2048 | 4096)}
                            disabled={isGenerating}
                            className="w-full bg-[#2a2e38] border border-transparent rounded-md px-4 py-3 text-zinc-300 focus:outline-none focus:border-[#4dbb9c] transition-colors disabled:opacity-50"
                        >
                            <option value={1024}>1024 bits (Fast, less secure)</option>
                            <option value={2048}>2048 bits (Standard)</option>
                            <option value={4096}>4096 bits (Slow, highly secure)</option>
                        </select>
                    </div>

                    <button
                        onClick={generateKeys}
                        disabled={isGenerating}
                        className="flex items-center justify-center px-6 py-3 bg-[#4dbb9c] hover:bg-[#3ea084] text-white rounded-md transition-colors text-sm font-medium shadow-sm w-full sm:w-auto h-[48px] disabled:bg-[#4dbb9c]/50 disabled:cursor-not-allowed"
                    >
                        {isGenerating ? (
                            <div className="flex items-center">
                                <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                                Generating... (May take a while)
                            </div>
                        ) : (
                            "Generate Key Pair"
                        )}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-[15px] text-zinc-300">Public Key</label>
                            {publicKey && (
                                <button
                                    onClick={() => handleCopy(publicKey, "public")}
                                    className={`flex items-center text-xs font-medium px-3 py-1 rounded transition-colors ${copiedKey === "public" ? 'text-[#4dbb9c] bg-[#4dbb9c]/10' : 'text-zinc-400 hover:text-white hover:bg-[#3e424b]'}`}
                                >
                                    {copiedKey === "public" ? <Check className="w-3 h-3 mr-1.5" /> : <Copy className="w-3 h-3 mr-1.5" />}
                                    {copiedKey === "public" ? "Copied" : "Copy"}
                                </button>
                            )}
                        </div>
                        <textarea
                            value={publicKey}
                            readOnly
                            placeholder="..."
                            className="w-full bg-[#2a2e38] border border-transparent outline-none rounded-md px-4 py-4 text-zinc-400 font-mono text-[12px] min-h-[300px] resize-y"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-[15px] text-zinc-300">Private Key</label>
                            {privateKey && (
                                <button
                                    onClick={() => handleCopy(privateKey, "private")}
                                    className={`flex items-center text-xs font-medium px-3 py-1 rounded transition-colors ${copiedKey === "private" ? 'text-[#4dbb9c] bg-[#4dbb9c]/10' : 'text-zinc-400 hover:text-white hover:bg-[#3e424b]'}`}
                                >
                                    {copiedKey === "private" ? <Check className="w-3 h-3 mr-1.5" /> : <Copy className="w-3 h-3 mr-1.5" />}
                                    {copiedKey === "private" ? "Copied" : "Copy"}
                                </button>
                            )}
                        </div>
                        <textarea
                            value={privateKey}
                            readOnly
                            placeholder="..."
                            className="w-full bg-[#2a2e38] border border-transparent outline-none rounded-md px-4 py-4 text-zinc-400 font-mono text-[12px] min-h-[300px] resize-y"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

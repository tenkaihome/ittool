"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Heart, ExternalLink } from "lucide-react"
import QRCode from "react-qr-code"

const DONATE_URL = "https://buymeacoffee.com/0xejebduoo"

export function DonateModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-[#1c1f26] border border-[#2e323b] shadow-2xl p-6 flex flex-col items-center text-center text-white"
                    >
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="w-12 h-12 bg-[#4dbb9c]/20 rounded-full flex items-center justify-center mb-4">
                            <Heart className="w-6 h-6 text-[#4dbb9c] fill-[#4dbb9c]" />
                        </div>

                        <h2 className="text-xl font-bold mb-2">Buy me a coffee</h2>
                        <p className="text-zinc-400 text-sm mb-6 max-w-[280px]">
                            If you find this tool helpful, consider supporting the development!
                        </p>

                        <div className="p-4 bg-white rounded-xl mb-6 shadow-md">
                            <QRCode
                                value={DONATE_URL}
                                size={160}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                viewBox={`0 0 160 160`}
                            />
                        </div>

                        <a
                            href={DONATE_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center w-full py-3 px-4 bg-[#4dbb9c] hover:bg-[#3ea084] text-white rounded-xl font-medium transition-colors shadow-[0_0_20px_rgba(77,187,156,0.2)] hover:shadow-[0_0_25px_rgba(77,187,156,0.4)]"
                        >
                            <span className="mr-2">Go to donation page</span>
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

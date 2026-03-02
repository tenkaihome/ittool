"use client"

import { useState } from "react"
import { Search, Github, Info, Sun, Menu, Home, SquareStack } from "lucide-react"
import { DonateModal } from "./donate-modal"
export function Header() {
    const [isDonateOpen, setIsDonateOpen] = useState(false)

    return (
        <>
            <header className="h-[60px] flex items-center justify-between px-4 bg-[#16181d] border-b border-[#2e323b] text-zinc-300">
                <div className="flex items-center space-x-2 flex-1">
                    <button className="p-2 text-zinc-400 hover:text-white transition-colors rounded-md hover:bg-[#2e323b]/50">
                        <Menu className="w-5 h-5" />
                    </button>

                    <button className="p-2 text-zinc-400 hover:text-white transition-colors rounded-md hover:bg-[#2e323b]/50">
                        <Home className="w-5 h-5" />
                    </button>

                    <button className="p-2 text-zinc-400 hover:text-white transition-colors rounded-md hover:bg-[#2e323b]/50">
                        <SquareStack className="w-5 h-5" />
                    </button>

                    <div className="hidden md:flex items-center space-x-2 w-full max-w-[240px] ml-2">
                        <div className="relative w-full group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-white transition-colors" />
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full bg-[#1c1f26] border border-[#2e323b] outline-none rounded-md pl-9 pr-16 py-1.5 text-sm focus:border-zinc-500 transition-colors placeholder:text-zinc-500 text-white"
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-1">
                                <span className="text-[10px] text-zinc-400 bg-transparent px-1 py-0.5 rounded border border-[#3e424b] shadow-sm">Ctrl</span>
                                <span className="text-[10px] text-zinc-400 bg-transparent px-1 py-0.5 rounded border border-[#3e424b] shadow-sm">K</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="relative group cursor-pointer hidden md:block mr-2">
                        <div className="flex items-center space-x-1 text-sm text-zinc-300 hover:bg-[#2e323b]/50 transition-colors bg-transparent border border-transparent hover:border-[#2e323b] rounded-md px-3 py-1.5">
                            <span>English</span>
                            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>

                    <div className="flex items-center space-x-1">
                        <a href="#" className="p-2 text-zinc-400 hover:text-white transition-colors rounded-md hover:bg-[#2e323b]/50"><Github className="w-5 h-5" /></a>
                        <a href="#" className="p-2 text-zinc-400 hover:text-white transition-colors rounded-md hover:bg-[#2e323b]/50">
                            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/0m">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 4.076H5.078z" />
                            </svg>
                        </a>
                        <button className="p-2 text-zinc-400 hover:text-white transition-colors rounded-md hover:bg-[#2e323b]/50"><Info className="w-5 h-5" /></button>
                        <button className="p-2 text-zinc-400 hover:text-white transition-colors rounded-md hover:bg-[#2e323b]/50"><Sun className="w-5 h-5" /></button>
                    </div>

                    <button
                        onClick={() => setIsDonateOpen(true)}
                        className="hidden md:flex items-center bg-[#4dbb9c] text-white hover:bg-[#3ea084] text-sm font-medium px-4 py-1.5 rounded-full transition-colors ml-2 shadow-sm"
                    >
                        Buy me a coffee
                        <svg viewBox="0 0 24 24" className="w-4 h-4 ml-2 fill-none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </button>
                </div>
            </header>

            <DonateModal isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)} />
        </>
    )
}

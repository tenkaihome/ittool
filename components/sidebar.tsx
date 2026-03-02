"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    RefreshCcw,
    Hash,
    Lock,
    Database,
    ArrowDownUp,
    Unlock,
    KeySquare,
    Menu,
    Key,
    ShieldCheck,
    FileBadge,
    ChevronDown
} from "lucide-react"

const cryptoTools = [
    { name: "Token generator", href: "/token-generator", icon: RefreshCcw },
    { name: "Hash text", href: "/hash-text", icon: Hash },
    { name: "Bcrypt", href: "/bcrypt", icon: Lock },
    { name: "UUIDs generator", href: "/uuid-generator", icon: Database },
    { name: "ULID generator", href: "/ulid-generator", icon: ArrowDownUp },
    { name: "Encrypt / decrypt text", href: "/encrypt-decrypt", icon: Unlock },
    { name: "BIP39 passphrase gener...", href: "/bip39-generator", icon: KeySquare },
    { name: "Hmac generator", href: "/hmac-generator", icon: Menu },
    { name: "RSA key pair generator", href: "/rsa-generator", icon: Key },
    { name: "Password strength analy...", href: "/", icon: ShieldCheck },
    { name: "PDF signature checker", href: "/pdf-signature", icon: FileBadge },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-[280px] h-screen bg-[#1c1f26] text-[#b4b4b4] flex flex-col flex-shrink-0">
            <div className="relative overflow-hidden h-32 flex flex-col justify-center px-6">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2f9e82] to-[#4dbb9c] rounded-bl-[40px] z-0 pointer-events-none" />
                <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-black/10 z-0 pointer-events-none" />
                <div className="absolute -top-12 -left-4 w-24 h-24 rounded-full bg-white/10 z-0 pointer-events-none" />

                <div className="relative z-10 text-white">
                    <h1 className="text-2xl font-bold tracking-wider mb-1">IT - TOOLS</h1>
                    <p className="text-sm opacity-90">Handy tools for developers</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
                <div className="px-4 mb-2">
                    <button className="flex items-center text-sm font-medium w-full text-left py-2 hover:text-white transition-colors">
                        <ChevronDown className="w-4 h-4 mr-2" />
                        Crypto
                    </button>
                </div>

                <nav className="flex flex-col space-y-0.5">
                    {cryptoTools.map((tool) => {
                        const isActive = pathname === tool.href
                        const Icon = tool.icon

                        return (
                            <Link
                                key={tool.name}
                                href={tool.href}
                                className={cn(
                                    "flex items-center px-6 py-2.5 text-sm transition-colors border-l-2",
                                    isActive
                                        ? "border-[#4dbb9c] bg-[#222731] text-[#4dbb9c]"
                                        : "border-transparent hover:bg-[#222731] hover:text-white"
                                )}
                            >
                                <Icon className="w-4 h-4 mr-3" />
                                <span className="truncate">{tool.name}</span>
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </aside>
    )
}

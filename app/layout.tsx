import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IT - TOOLS | Password strength analyser",
  description: "Handy tools for developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-[#4dbb9c]/30`}
      >
        <div className="flex h-screen w-full bg-[#16181d] overflow-hidden text-[#c1c2c5]">
          <Sidebar />
          <div className="flex-1 flex flex-col h-screen overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-[#16181d]">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

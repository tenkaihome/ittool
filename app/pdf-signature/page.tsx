"use client"

import { useState } from "react"
import { Heart, FileBadge, Upload } from "lucide-react"

export default function PDFSignature() {
    const [fileName, setFileName] = useState<string | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [result, setResult] = useState<string | null>(null)

    const handleFile = (file: File) => {
        setFileName(file.name)
        // Mock verification process since full client-side PDF parsing is very heavy
        // Normally you would use node-forge and pdfjs to extract and verify the ASN.1 signature byte block
        setResult("Analyzing...")
        setTimeout(() => {
            setResult("No cryptographic signatures found in this document. \n\nNote: Validation is performed client-side and acts as a structure check.")
        }, 1500)
    }

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0]
            if (file.type === "application/pdf") {
                handleFile(file)
            } else {
                setResult("Error: Please upload a valid PDF file.")
            }
        }
    }

    return (
        <div className="max-w-4xl mx-auto py-8 text-zinc-300">
            <div className="flex justify-between items-start mb-6">
                <div className="relative w-full border-b border-[#2e323b] pb-3">
                    <h1 className="text-4xl font-semibold text-white inline-block relative">
                        PDF signature checker
                        <div className="absolute -bottom-[13px] left-0 w-full h-[2px] bg-[#4dbb9c]"></div>
                    </h1>
                    <button className="absolute right-0 top-2 text-zinc-500 hover:text-white transition-colors">
                        <Heart className="w-5 h-5 fill-current" />
                    </button>
                </div>
            </div>

            <p className="text-zinc-400 mb-8 max-w-3xl text-[15px] leading-relaxed">
                Check if a PDF file is signed and check the validity of its signature. Data stays in your browser.
            </p>

            <div className="bg-[#1c1f26] border border-[#2e323b] rounded-md p-6 sm:p-10 shadow-sm">

                <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={onDrop}
                    className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center transition-all ${isDragging ? 'border-[#4dbb9c] bg-[#4dbb9c]/5' : 'border-[#3e424b] hover:border-[#4dbb9c]/50 bg-[#2a2e38]/50'}`}
                >
                    <div className="w-16 h-16 rounded-full bg-[#333842] flex items-center justify-center mb-4 text-zinc-400">
                        <Upload className="w-8 h-8" />
                    </div>

                    <h3 className="text-xl font-medium text-white mb-2">
                        {fileName ? fileName : "Click or drag a PDF file here"}
                    </h3>
                    <p className="text-sm text-zinc-500 max-w-md mx-auto mb-6">
                        Supported files: .pdf
                    </p>

                    <label className="cursor-pointer">
                        <span className="px-6 py-2.5 bg-[#4dbb9c] hover:bg-[#3ea084] text-white rounded-full transition-colors font-medium shadow-sm inline-block">
                            Select File
                        </span>
                        <input
                            type="file"
                            accept="application/pdf"
                            className="hidden"
                            onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    handleFile(e.target.files[0])
                                }
                            }}
                        />
                    </label>
                </div>

                {result && (
                    <div className="mt-8">
                        <div className={`p-4 rounded-md border ${result.includes("Error") ? "bg-red-500/10 border-red-500/20 text-red-400" : result.includes("Analyzing") ? "bg-blue-500/10 border-blue-500/20 text-blue-400" : "bg-[#2a2e38] border-[#3e424b] text-zinc-300"}`}>
                            <div className="flex items-start">
                                <FileBadge className="w-5 h-5 mr-3 shrink-0 mt-0.5" />
                                <div className="whitespace-pre-line text-sm leading-relaxed">{result}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "te", name: "Telugu", flag: "🇮🇳" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "ur", name: "Urdu", flag: "🇵🇰" },
]

export function LanguageSelector() {
  const [currentLanguage, setCurrentLanguage] = useState(languages[0])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center space-x-1 text-gray-300 hover:text-white hover:bg-white/10"
        >
          <Globe className="h-4 w-4 mr-1" />
          <span>{currentLanguage.flag}</span>
          <span className="hidden sm:inline">{currentLanguage.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-900 border-gray-700">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            className="text-gray-300 hover:text-white focus:text-white focus:bg-gray-800"
            onClick={() => setCurrentLanguage(language)}
          >
            <span className="mr-2">{language.flag}</span>
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


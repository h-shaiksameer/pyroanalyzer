"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, X } from "lucide-react"

type Message = {
  id: number
  text: string
  sender: "user" | "bot"
}

// Predefined Q&A for pyrolysis
const predefinedQA: Record<string, string> = {
  "what is pyrolysis":
    "Pyrolysis is the thermal decomposition of materials at elevated temperatures in an inert atmosphere. It involves a change of chemical composition and is irreversible.",
  "how does pyrolysis work":
    "Pyrolysis works by heating materials to high temperatures (400-600°C) in the absence of oxygen. This breaks down the molecular bonds of the material, converting it into gas, liquid, and solid products.",
  "what materials can be processed":
    "Pyrolysis can process various materials including plastics (PE, PP, PS), biomass, rubber, and organic waste. Not all materials are equally suitable - PVC for example is less desirable due to chlorine content.",
  "what are the benefits":
    "Benefits include waste reduction, energy recovery, lower emissions compared to incineration, ability to process mixed/contaminated plastics, and production of valuable products like fuels and chemicals.",
  "what products are created":
    "Pyrolysis produces three main outputs: pyrolysis oil (a liquid similar to crude oil), syngas (a mixture of combustible gases), and char (a solid carbon residue).",
  "how is it different from incineration":
    "Unlike incineration which burns waste with oxygen, pyrolysis decomposes materials without oxygen. This results in fewer emissions, no toxic ash, and produces valuable products rather than just heat.",
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I can answer your questions about pyrolysis. What would you like to know?", sender: "bot" },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = { id: Date.now(), text: input, sender: "user" }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate bot typing
    setIsTyping(true)

    // Find answer in predefined Q&A or provide default response
    setTimeout(() => {
      setIsTyping(false)

      const userQuestion = input.toLowerCase()
      let botResponse =
        "I don't have information on that specific topic. Try asking about what pyrolysis is, how it works, materials that can be processed, benefits, products created, or how it differs from incineration."

      // Check if the question contains any of the predefined keywords
      for (const [keyword, answer] of Object.entries(predefinedQA)) {
        if (userQuestion.includes(keyword)) {
          botResponse = answer
          break
        }
      }

      const botMessage: Message = { id: Date.now() + 1, text: botResponse, sender: "bot" }
      setMessages((prev) => [...prev, botMessage])
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  return (
    <>
      {isOpen ? (
        <Card className="w-80 sm:w-96 shadow-lg border-gray-800 bg-black/80 backdrop-blur-md">
          <CardHeader className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-t-lg">
            <div className="flex justify-between items-center">
              <CardTitle className="text-white text-lg">Pyrolysis Assistant</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 h-80 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "bg-gray-800 text-gray-100"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 text-gray-100 rounded-lg px-4 py-2">
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "200ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "400ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="p-4 border-t border-gray-800">
            <div className="flex w-full space-x-2">
              <Input
                placeholder="Type your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-gray-900 border-gray-700 text-white"
              />
              <Button
                onClick={handleSend}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg animate-pulse"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </>
  )
}


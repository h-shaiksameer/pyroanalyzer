"use client"

import Link from "next/link"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { Chatbot } from "@/components/chatbot"
import { AnimatedText } from "@/components/animated-text"
import { useState } from "react"

// Ensure the filename matches exactly (globe.tsx or Globe.tsx)
const Globe = dynamic(() => import("@/components/globe").then((mod) => mod.Globe), { ssr: false });


export default function Home() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* 3D Globe Background */}
      <div className="fixed inset-0 z-0">
        <Globe />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6">
          <div className="space-y-6 max-w-4xl mx-auto" data-aos="fade-up">
            <AnimatedText
              text="Transforming Waste into Energy"
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white"
            />
            <p className="text-xl text-gray-300 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              The future of sustainable waste management through advanced pyrolysis technology
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <Button
                asChild
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-glow"
              >
                <Link href="/request">Request Service</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-full text-lg font-medium transition-all duration-300"
              >
                <Link href="/learn">Learn Pyrolysis</Link>
              </Button>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-8 w-8 text-white/70" />
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-black/90 to-purple-900/20 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto" data-aos="fade-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-16">What We Do</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6" data-aos="fade-right">
                <h3 className="text-2xl font-bold text-white">Pyrolysis Suitability Analysis</h3>
                <p className="text-gray-300">
                  Our cutting-edge technology analyzes waste materials to determine their suitability for pyrolysis
                  processing, helping you convert non-recyclable plastics into valuable energy resources.
                </p>
                <ul className="space-y-3">
                  {[
                    "Material composition analysis",
                    "Energy output prediction 🔜",
                    "Environmental impact assessment 🔜",
                    "Cost-benefit analysis 🔜",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center mr-3 mt-1">
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 mt-4"
                >
                  <Link href="http://127.0.0.1:5000/">Explore Services</Link>
                </Button>
              </div>

              {/* Video Section */}
              <div className="relative h-80 sm:h-96 flex justify-center items-center" data-aos="fade-left">
                <div className="w-full max-w-lg relative">
                  <iframe
                    id="pyrolysis-video"
                    className="w-full h-72 sm:h-96 rounded-xl shadow-lg"
                    src={`https://www.youtube.com/embed/rDMhS_TJAg4?autoplay=${isPlaying ? 1 : 0}&loop=1&playlist=rDMhS_TJAg4&mute=${isMuted ? 1 : 0}`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>

                  {/* Custom Controls */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 bg-black/70 p-2 rounded-lg">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="text-white px-3 py-2 bg-gray-800 rounded-md hover:bg-gray-700 transition"
                    >
                      {isPlaying ? "Pause" : "Play"}
                    </button>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-white px-3 py-2 bg-gray-800 rounded-md hover:bg-gray-700 transition"
                    >
                      {isMuted ? "Unmute" : "Mute"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chatbot */}
        <div className="fixed bottom-6 right-6 z-50">
          <Chatbot />
        </div>
      </div>
    </div>
  )
}

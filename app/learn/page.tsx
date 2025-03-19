"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Volume2, VolumeX, ChevronRight, ChevronLeft } from "lucide-react"
import { AnimatedText } from "@/components/animated-text"
import { LanguageSelector } from "@/components/language-selector"

export default function LearnPage() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [currentModule, setCurrentModule] = useState(1)
  const [progress, setProgress] = useState(0)

  const toggleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    } else {
      const text = document.querySelector(".module-content")?.textContent || ""
      const utterance = new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(utterance)
      setIsSpeaking(true)

      utterance.onend = () => setIsSpeaking(false)
    }
  }

  const nextModule = () => {
    if (currentModule < 7) {
      setCurrentModule(currentModule + 1)
      setProgress(Math.min(100, progress + 16.67))
    }
  }

  const prevModule = () => {
    if (currentModule > 1) {
      setCurrentModule(currentModule - 1)
      setProgress(Math.max(0, progress - 16.67))
    }
  }

  const modules = [
    {
      id: 1,
      title: "Introduction to Pyrolysis",
      content:
        'Pyrolysis is the thermal decomposition of materials at elevated temperatures in an inert atmosphere. It involves a change of chemical composition and is irreversible. The word is coined from the Greek-derived elements pyro "fire" and lysis "separating".',
    },
    {
      id: 2,
      title: "Types of Plastic Suitable for Pyrolysis",
      content:
        "Not all plastics are created equal when it comes to pyrolysis. Polyethylene (PE), polypropylene (PP), and polystyrene (PS) are highly suitable for pyrolysis due to their chemical structure and high hydrocarbon content. These plastics yield valuable oil products when processed correctly.",
    },
    {
      id: 3,
      title: "The Pyrolysis Process",
      content:
        "The pyrolysis process begins with the collection and preparation of suitable plastic waste. The material is then heated in an oxygen-free environment to temperatures between 400-600°C. This causes the long polymer chains to break down into shorter hydrocarbon chains, producing gas, oil, and char.",
    },
    {
      id: 4,
      title: "Pyrolysis Products & Applications",
      content:
        "Pyrolysis produces three main outputs: pyrolysis oil (a liquid similar to crude oil), syngas (a mixture of combustible gases), and char (a solid carbon residue). The oil can be refined into fuels, the gas can generate electricity, and the char can be used in manufacturing or as a soil amendment.",
    },
    {
      id: 5,
      title: "Benefits vs Other Waste Management",
      content:
        "Unlike incineration, pyrolysis produces minimal emissions and no toxic ash. Compared to traditional recycling, it can process contaminated and mixed plastics that would otherwise go to landfill. Pyrolysis also produces valuable energy products, creating economic incentives for proper waste management.",
    },
    {
      id: 6,
      title: "Challenges & Future of Pyrolysis",
      content:
        "Current challenges include scaling up technology, ensuring consistent feedstock quality, and optimizing energy efficiency. The future of pyrolysis looks promising with advancements in catalysts, reactor designs, and integration with renewable energy sources to create truly sustainable waste-to-energy systems.",
    },
    {
      id: 7,
      title: "Test Your Knowledge",
      content:
        "Now that you've learned about pyrolysis, test your knowledge with our interactive quiz. Answer questions about the process, suitable materials, and applications to see how much you've learned.",
    },
  ]

  const currentModuleData = modules.find((m) => m.id === currentModule) || modules[0]

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <AnimatedText text="Learn Pyrolysis" className="text-3xl sm:text-4xl font-bold text-white" />
          <LanguageSelector />
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-8">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Module Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-black/50 backdrop-blur-sm rounded-xl border border-gray-800 p-4">
              <h3 className="text-xl font-semibold text-white mb-4">Learning Modules</h3>
              <ul className="space-y-2">
                {modules.map((module) => (
                  <li key={module.id}>
                    <button
                      onClick={() => {
                        setCurrentModule(module.id)
                        setProgress((module.id - 1) * 16.67)
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center ${
                        currentModule === module.id
                          ? "bg-gradient-to-r from-blue-600/50 to-purple-600/50 text-white"
                          : "hover:bg-white/5 text-gray-300"
                      }`}
                    >
                      <span
                        className={`flex items-center justify-center w-6 h-6 rounded-full mr-3 ${
                          currentModule === module.id ? "bg-white text-purple-600" : "bg-gray-700 text-gray-300"
                        }`}
                      >
                        {module.id}
                      </span>
                      {module.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Module Content */}
          <div className="lg:col-span-2">
            <Card className="bg-black/50 backdrop-blur-sm border-gray-800">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">{currentModuleData.title}</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSpeech}
                    className="text-gray-300 hover:text-white hover:bg-white/10"
                  >
                    {isSpeaking ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </Button>
                </div>

                <div className="module-content space-y-6">
                  {currentModule === 3 && (
                    <div className="mb-8 relative h-64 sm:h-80 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="pyrolysis-process-animation w-full h-full">
                          <svg viewBox="0 0 800 400" className="w-full h-full">
                            {/* Reactor */}
                            <rect
                              x="300"
                              y="100"
                              width="200"
                              height="200"
                              rx="20"
                              fill="#333"
                              stroke="#555"
                              strokeWidth="4"
                            />

                            {/* Input */}
                            <path d="M100,150 C150,150 150,150 200,150 L300,150" stroke="#666" strokeWidth="8" />
                            <circle cx="100" cy="150" r="30" fill="#1e88e5" className="animate-pulse" />
                            <text x="100" y="200" textAnchor="middle" fill="white" fontSize="14">
                              Plastic Waste
                            </text>

                            {/* Heat */}
                            <circle cx="400" cy="350" r="30" fill="url(#fireGradient)" className="animate-pulse" />
                            <text x="400" y="400" textAnchor="middle" fill="white" fontSize="14">
                              Heat (400-600°C)
                            </text>

                            {/* Outputs */}
                            <path d="M500,130 L600,130" stroke="#666" strokeWidth="8" />
                            <circle cx="650" cy="130" r="30" fill="#ff9800" className="animate-pulse" />
                            <text x="650" y="100" textAnchor="middle" fill="white" fontSize="14">
                              Pyrolysis Oil
                            </text>

                            <path d="M500,200 L600,200" stroke="#666" strokeWidth="8" />
                            <circle cx="650" cy="200" r="30" fill="#4caf50" className="animate-pulse" />
                            <text x="650" y="170" textAnchor="middle" fill="white" fontSize="14">
                              Syngas
                            </text>

                            <path d="M500,270 L600,270" stroke="#666" strokeWidth="8" />
                            <circle cx="650" cy="270" r="30" fill="#9c27b0" className="animate-pulse" />
                            <text x="650" y="240" textAnchor="middle" fill="white" fontSize="14">
                              Char
                            </text>

                            {/* Animation elements */}
                            <circle cx="250" cy="150" r="5" fill="white" className="animate-ping">
                              <animateMotion path="M0,0 L100,0" dur="2s" repeatCount="indefinite" />
                            </circle>

                            <defs>
                              <radialGradient id="fireGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                                <stop offset="0%" stopColor="#ff9500" />
                                <stop offset="100%" stopColor="#ff3000" />
                              </radialGradient>
                            </defs>
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentModule === 7 ? (
                    <div className="space-y-6">
                      <p className="text-gray-300 mb-4">Test your knowledge with these questions:</p>

                      <div className="space-y-6">
                        {[
                          {
                            question: "What temperature range is typically used in plastic pyrolysis?",
                            options: ["200-300°C", "400-600°C", "800-1000°C", "1200-1500°C"],
                            correct: 1,
                          },
                          {
                            question: "Which of these plastics is MOST suitable for pyrolysis?",
                            options: ["PVC", "Polyethylene (PE)", "PET", "Nylon"],
                            correct: 1,
                          },
                          {
                            question: "What are the three main products of pyrolysis?",
                            options: [
                              "Water, Carbon Dioxide, Methane",
                              "Plastic, Metal, Glass",
                              "Oil, Gas, Char",
                              "Hydrogen, Oxygen, Carbon",
                            ],
                            correct: 2,
                          },
                        ].map((q, i) => (
                          <div key={i} className="bg-gray-800/50 rounded-lg p-4">
                            <p className="text-white font-medium mb-3">{q.question}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {q.options.map((option, j) => (
                                <button
                                  key={j}
                                  className="px-4 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-purple-600/20 hover:border-purple-500 transition-all duration-200"
                                  onClick={() => {
                                    if (j === q.correct) {
                                      alert("Correct! 🎉")
                                    } else {
                                      alert("Try again!")
                                    }
                                  }}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-300 leading-relaxed">{currentModuleData.content}</p>
                  )}

                  {currentModule === 4 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                      {[
                        {
                          title: "Pyrolysis Oil",
                          color: "from-yellow-600 to-orange-600",
                          description: "Can be refined into diesel fuel",
                        },
                        {
                          title: "Syngas",
                          color: "from-green-600 to-teal-600",
                          description: "Used for electricity generation",
                        },
                        {
                          title: "Char",
                          color: "from-purple-600 to-indigo-600",
                          description: "Carbon black for manufacturing",
                        },
                      ].map((product, i) => (
                        <div
                          key={i}
                          className="bg-gradient-to-br bg-opacity-20 rounded-lg p-4 border border-gray-700 hover:border-gray-500 transition-all duration-300 cursor-pointer group"
                          style={{ background: `linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.4))` }}
                        >
                          <div
                            className={`w-12 h-12 rounded-full mb-3 bg-gradient-to-r ${product.color} flex items-center justify-center`}
                          >
                            <span className="text-white text-xl font-bold">{i + 1}</span>
                          </div>
                          <h4 className="text-white font-medium mb-1">{product.title}</h4>
                          <p className="text-gray-400 text-sm">{product.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={prevModule}
                    disabled={currentModule === 1}
                    className="border-gray-700 text-gray-300 hover:bg-white/10"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>

                  <Button
                    onClick={nextModule}
                    disabled={currentModule === 7}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}


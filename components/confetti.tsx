"use client"

import { useEffect, useRef } from "react"
import confetti from "canvas-confetti"

export function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const myConfetti = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true,
    })

    const duration = 3 * 1000
    const end = Date.now() + duration

    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]

    // Launch initial burst
    myConfetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6 },
      colors,
    })

    // Continuous confetti
    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval)
        return
      }

      myConfetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      })

      myConfetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      })
    }, 150)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />
}


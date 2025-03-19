"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface AnimatedTextProps {
  text: string
  className?: string
}

export function AnimatedText({ text, className }: AnimatedTextProps) {
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const splitText = text.split("")
    textRef.current.innerHTML = ""

    splitText.forEach((char, i) => {
      const span = document.createElement("span")
      span.textContent = char === " " ? "\u00A0" : char
      span.style.opacity = "0"
      span.style.display = "inline-block"
      textRef.current?.appendChild(span)
    })

    gsap.to(textRef.current.children, {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.5,
      ease: "power3.out",
      delay: 0.2,
    })

    return () => {
      gsap.killTweensOf(textRef.current?.children)
    }
  }, [text])

  return (
    <h1 ref={textRef} className={className}>
      {text}
    </h1>
  )
}


"use client"

import { useEffect, useRef } from "react"

interface NoiseGradientBackgroundProps {
  className?: string
  gradientDirection?: "top-to-bottom" | "left-to-right" | "diagonal" | "radial"
}

export default function NoiseGradientBackground({
  className = "",
  gradientDirection = "radial",
}: NoiseGradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  // Create a grain canvas only once
  const grainCanvasRef = useRef<HTMLCanvasElement>()
  useEffect(() => {
    const grainCanvas = document.createElement("canvas")
    grainCanvas.width = 100
    grainCanvas.height = 100
    const grainCtx = grainCanvas.getContext("2d")
    if (grainCtx) {
      // Increase the number of dots for a denser grain effect
      for (let i = 0; i < 8000; i++) {
        const x = Math.floor(Math.random() * grainCanvas.width)
        const y = Math.floor(Math.random() * grainCanvas.height)
        // A small white dot with low opacity
        grainCtx.fillStyle = "rgba(255,255,255,0.05)"
        grainCtx.fillRect(x, y, 1, 1)
      }
    }
    grainCanvasRef.current = grainCanvas
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawGradient = () => {
      if (!ctx || !canvas) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      let gradient

      if (gradientDirection === "radial") {
        const cx = canvas.width / 2
        const cy = canvas.height / 2
        const r = Math.sqrt(cx * cx + cy * cy)
        gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
        // Darker color stops for a more muted look
        gradient.addColorStop(0, "#2a2a2a")
        gradient.addColorStop(0.5, "#111111")
        gradient.addColorStop(1, "#000000")
      } else {
        switch (gradientDirection) {
          case "left-to-right":
            gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
            break
          case "diagonal":
            gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
            break
          case "top-to-bottom":
          default:
            gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
            break
        }
        // Darker color stops for a more muted look
        gradient.addColorStop(0, "#2a2a2a")
        gradient.addColorStop(0.5, "#111111")
        gradient.addColorStop(1, "#000000")
      }

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add a grain overlay
      if (grainCanvasRef.current) {
        const grainPattern = ctx.createPattern(grainCanvasRef.current, "repeat")
        if (grainPattern) {
          ctx.save()
          ctx.globalAlpha = 0.3 // Adjust this value to further tweak the overlay intensity
          ctx.fillStyle = grainPattern
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          ctx.restore()
        }
      }
    }

    // Initial setup
    resizeCanvas()
    drawGradient()

    // Handle window resize
    window.addEventListener("resize", () => {
      resizeCanvas()
      drawGradient()
    })
    
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [gradientDirection])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 h-full w-full object-cover ${className}`}
    />
  )
}

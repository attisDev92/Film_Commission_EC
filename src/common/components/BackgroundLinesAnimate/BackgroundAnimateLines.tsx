import { useEffect, useRef } from 'react'

interface Street {
  x1: number
  y1: number
  x2: number
  y2: number
  width: number
  color: string
  targetColor: string
  transitionProgress: number
}

export default function MapBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streetsRef = useRef<Street[]>([])
  const mousePosRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>(0)
  const dimensionsRef = useRef({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== 'undefined') {
        dimensionsRef.current = {
          width: window.innerWidth,
          height: window.innerHeight,
        }

        if (canvasRef.current) {
          canvasRef.current.width = dimensionsRef.current.width
          canvasRef.current.height = dimensionsRef.current.height
        }

        generateStreets()
      }
    }

    const generateStreets = () => {
      const { width, height } = dimensionsRef.current
      const newStreets = []
      const gridSize = 40

      for (let y = 0; y < height; y += gridSize) {
        if (Math.random() > 0.3) {
          newStreets.push({
            x1: 0,
            y1: y + Math.random() * 20 - 10,
            x2: width,
            y2: y + Math.random() * 20 - 10,
            width: 1 + Math.random() * 3,
            color: '#d1d7dc',
            targetColor: '#d1d7dc',
            transitionProgress: 0,
          })
        }
      }

      for (let x = 0; x < width; x += gridSize) {
        if (Math.random() > 0.3) {
          newStreets.push({
            x1: x + Math.random() * 20 - 10,
            y1: 0,
            x2: x + Math.random() * 20 - 10,
            y2: height,
            width: 1 + Math.random() * 3,
            color: '#d1d7dc',
            targetColor: '#d1d7dc',
            transitionProgress: 0,
          })
        }
      }

      for (let i = 0; i < 20; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        const length = 100 + Math.random() * 300
        const angle = Math.random() * Math.PI * 2

        newStreets.push({
          x1: x,
          y1: y,
          x2: x + Math.cos(angle) * length,
          y2: y + Math.sin(angle) * length,
          width: 1 + Math.random() * 3,
          color: '#d1d7dc',
          targetColor: '#d1d7dc',
          transitionProgress: 0,
        })
      }

      streetsRef.current = newStreets
    }

    updateDimensions()

    window.addEventListener('resize', updateDimensions)

    return () => {
      window.removeEventListener('resize', updateDimensions)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = () => {
      const { width, height } = dimensionsRef.current
      ctx.clearRect(0, 0, width, height)

      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, width, height)

      streetsRef.current.forEach((street) => {
        const mousePos = mousePosRef.current
        const distToStreet = distanceToLine(
          mousePos.x,
          mousePos.y,
          street.x1,
          street.y1,
          street.x2,
          street.y2,
        )

        const isNear = distToStreet < 30
        street.targetColor = isNear ? '#b921ff40' : '#d1d7dc31'

        // Update transition progress
        if (street.targetColor !== street.color) {
          if (street.targetColor === '#b921ff40') {
            street.transitionProgress = Math.min(
              1,
              street.transitionProgress + 0.05,
            )
          } else {
            street.transitionProgress = Math.max(
              0,
              street.transitionProgress - 0.05,
            )
          }
        }

        street.color = interpolateColor(
          '#d1d7dc31',
          '#b921ff40',
          street.transitionProgress,
        )

        ctx.beginPath()
        ctx.moveTo(street.x1, street.y1)
        ctx.lineTo(street.x2, street.y2)
        ctx.strokeStyle = street.color
        ctx.lineWidth = street.width
        ctx.stroke()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  const distanceToLine = (
    x: number,
    y: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ) => {
    const A = x - x1
    const B = y - y1
    const C = x2 - x1
    const D = y2 - y1

    const dot = A * C + B * D
    const lenSq = C * C + D * D
    let param = -1

    if (lenSq !== 0) param = dot / lenSq

    let xx, yy

    if (param < 0) {
      xx = x1
      yy = y1
    } else if (param > 1) {
      xx = x2
      yy = y2
    } else {
      xx = x1 + param * C
      yy = y1 + param * D
    }

    const dx = x - xx
    const dy = y - yy
    return Math.sqrt(dx * dx + dy * dy)
  }

  const interpolateColor = (color1: string, color2: string, factor: number) => {
    if (factor === 0) return color1
    if (factor === 1) return color2

    const r1 = Number.parseInt(color1.slice(1, 3), 16)
    const g1 = Number.parseInt(color1.slice(3, 5), 16)
    const b1 = Number.parseInt(color1.slice(5, 7), 16)

    const r2 = Number.parseInt(color2.slice(1, 3), 16)
    const g2 = Number.parseInt(color2.slice(3, 5), 16)
    const b2 = Number.parseInt(color2.slice(5, 7), 16)

    const r = Math.round(r1 + factor * (r2 - r1))
    const g = Math.round(g1 + factor * (g2 - g1))
    const b = Math.round(b1 + factor * (b2 - b1))

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      style={{ display: 'block' }}
    />
  )
}

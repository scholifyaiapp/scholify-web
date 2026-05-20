import { useEffect, useRef } from "react"

interface EntropyProps {
  className?: string
  size?: number
}

const NEIGHBOR_RADIUS = 100

export function Entropy({ className = "", size = 400 }: EntropyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Cap DPR at 2 — beyond that the extra pixels cost more than they show.
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)

    const particleColor = "#ffffff"

    class Particle {
      x: number
      y: number
      size: number
      order: boolean
      velocity: { x: number; y: number }
      originalX: number
      originalY: number
      influence: number
      neighbors: Particle[]

      constructor(x: number, y: number, order: boolean) {
        this.x = x
        this.y = y
        this.originalX = x
        this.originalY = y
        this.size = 2
        this.order = order
        this.velocity = {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
        }
        this.influence = 0
        this.neighbors = []
      }

      update() {
        if (this.order) {
          const dx = this.originalX - this.x
          const dy = this.originalY - this.y
          const chaosInfluence = { x: 0, y: 0 }
          this.neighbors.forEach((neighbor) => {
            if (!neighbor.order) {
              const distance = Math.hypot(this.x - neighbor.x, this.y - neighbor.y)
              const strength = Math.max(0, 1 - distance / 100)
              chaosInfluence.x += neighbor.velocity.x * strength
              chaosInfluence.y += neighbor.velocity.y * strength
              this.influence = Math.max(this.influence, strength)
            }
          })
          this.x += dx * 0.05 * (1 - this.influence) + chaosInfluence.x * this.influence
          this.y += dy * 0.05 * (1 - this.influence) + chaosInfluence.y * this.influence
          this.influence *= 0.99
        } else {
          this.velocity.x += (Math.random() - 0.5) * 0.5
          this.velocity.y += (Math.random() - 0.5) * 0.5
          this.velocity.x *= 0.95
          this.velocity.y *= 0.95
          this.x += this.velocity.x
          this.y += this.velocity.y
          if (this.x < size / 2 || this.x > size) this.velocity.x *= -1
          if (this.y < 0 || this.y > size) this.velocity.y *= -1
          this.x = Math.max(size / 2, Math.min(size, this.x))
          this.y = Math.max(0, Math.min(size, this.y))
        }
      }

      draw(c: CanvasRenderingContext2D) {
        const alpha = this.order ? 0.8 - this.influence * 0.5 : 0.8
        c.fillStyle = `${particleColor}${Math.round(alpha * 255).toString(16).padStart(2, "0")}`
        c.beginPath()
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        c.fill()
      }
    }

    const particles: Particle[] = []
    const gridSize = 25
    const spacing = size / gridSize
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = spacing * i + spacing / 2
        const y = spacing * j + spacing / 2
        const order = x < size / 2
        particles.push(new Particle(x, y, order))
      }
    }

    /*
     * Neighbor search via a spatial hash grid — O(n) average.
     * The original rebuilt this with an O(n²) filter (every particle
     * tested against every other) every 30 frames, which produced a
     * periodic main-thread stall. Buckets are sized to the search
     * radius, so only the 3×3 cells around a particle need checking.
     */
    function updateNeighbors() {
      const cell = NEIGHBOR_RADIUS
      const cols = Math.floor(size / cell) + 2
      const buckets = new Map<number, Particle[]>()
      const keyFor = (x: number, y: number) =>
        (Math.floor(y / cell) + 1) * cols + (Math.floor(x / cell) + 1)

      for (const p of particles) {
        const k = keyFor(p.x, p.y)
        const bucket = buckets.get(k)
        if (bucket) bucket.push(p)
        else buckets.set(k, [p])
      }

      for (const p of particles) {
        p.neighbors = []
        const cx = Math.floor(p.x / cell) + 1
        const cy = Math.floor(p.y / cell) + 1
        for (let gx = cx - 1; gx <= cx + 1; gx++) {
          for (let gy = cy - 1; gy <= cy + 1; gy++) {
            const bucket = buckets.get(gy * cols + gx)
            if (!bucket) continue
            for (const other of bucket) {
              if (other === p) continue
              if (Math.hypot(p.x - other.x, p.y - other.y) < NEIGHBOR_RADIUS)
                p.neighbors.push(other)
            }
          }
        }
      }
    }

    let time = 0
    let animationId = 0
    let running = false
    let onScreen = false

    function frame() {
      if (!ctx) return
      ctx.clearRect(0, 0, size, size)
      if (time % 30 === 0) updateNeighbors()

      particles.forEach((particle) => {
        particle.update()
        particle.draw(ctx)
        particle.neighbors.forEach((neighbor) => {
          const distance = Math.hypot(particle.x - neighbor.x, particle.y - neighbor.y)
          if (distance < 50) {
            const alpha = 0.2 * (1 - distance / 50)
            ctx.strokeStyle = `${particleColor}${Math.round(alpha * 255).toString(16).padStart(2, "0")}`
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(neighbor.x, neighbor.y)
            ctx.stroke()
          }
        })
      })

      ctx.strokeStyle = `${particleColor}4D`
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(size / 2, 0)
      ctx.lineTo(size / 2, size)
      ctx.stroke()

      time++
    }

    function loop() {
      frame()
      animationId = requestAnimationFrame(loop)
    }

    function start() {
      if (running) return
      running = true
      animationId = requestAnimationFrame(loop)
    }

    function stop() {
      running = false
      if (animationId) cancelAnimationFrame(animationId)
      animationId = 0
    }

    // Reduced-motion: draw a single static frame, never loop.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      updateNeighbors()
      frame()
      return
    }

    // Only burn frames while the canvas is actually on screen and the
    // tab is visible — this is what stops it dragging on the rest of
    // the page once the user scrolls past it.
    const evaluate = () => {
      if (onScreen && !document.hidden) start()
      else stop()
    }

    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries.some((e) => e.isIntersecting)
        evaluate()
      },
      { threshold: 0 },
    )
    io.observe(container)
    document.addEventListener("visibilitychange", evaluate)

    return () => {
      stop()
      io.disconnect()
      document.removeEventListener("visibilitychange", evaluate)
    }
  }, [size])

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ width: size, height: size, background: "#000" }}
    >
      <canvas ref={canvasRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
  )
}

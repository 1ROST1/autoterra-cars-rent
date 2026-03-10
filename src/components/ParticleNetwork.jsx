import { useEffect, useRef } from 'react'

const PARTICLE_CONFIG = {
    count: 60,
    mobileCount: 25,
    connectionDistance: 150,
    speed: 0.4, // Коэффициент скорости
    colors: {
        particle: 'rgba(255, 255, 255, 0.7)',
        mouseConnection: 'rgba(59, 130, 246, 0.9)'
    }
}

export default function ParticleNetwork() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let animationId
        let mouse = { x: null, y: null }
        const particles = []

        // Cache touch detection once instead of every frame
        const isTouch = window.innerWidth <= 1024 || window.matchMedia('(pointer: coarse)').matches

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        const handleMouseMove = (e) => {
            mouse.x = e.clientX
            mouse.y = e.clientY
        }
        const handleMouseLeave = () => {
            mouse.x = null
            mouse.y = null
        }
        window.addEventListener('mousemove', handleMouseMove)
        document.body.addEventListener('mouseleave', handleMouseLeave)

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width
                this.y = Math.random() * canvas.height
                this.vx = (Math.random() - 0.5) * PARTICLE_CONFIG.speed
                this.vy = (Math.random() - 0.5) * PARTICLE_CONFIG.speed
                this.radius = Math.random() * 2 + 1
            }

            update() {
                this.x += this.vx
                this.y += this.vy
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1
            }
        }

        const particleCount = isTouch ? PARTICLE_CONFIG.mobileCount : PARTICLE_CONFIG.count

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle())
        }

        const connDistSq = (PARTICLE_CONFIG.connectionDistance * 0.7) ** 2
        const mouseDistSq = PARTICLE_CONFIG.connectionDistance ** 2

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Update & draw all particles in one batch
            ctx.fillStyle = PARTICLE_CONFIG.colors.particle
            ctx.beginPath()
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i]
                p.update()
                ctx.moveTo(p.x + p.radius, p.y)
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
            }
            ctx.fill()

            // Draw mouse connections (desktop only) — batched by opacity groups
            if (!isTouch && mouse.x !== null && mouse.y !== null) {
                for (let i = 0; i < particles.length; i++) {
                    const dx = particles[i].x - mouse.x
                    const dy = particles[i].y - mouse.y
                    const distSq = dx * dx + dy * dy

                    if (distSq < mouseDistSq) {
                        const distance = Math.sqrt(distSq)
                        const opacity = 1 - distance / PARTICLE_CONFIG.connectionDistance
                        ctx.beginPath()
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(mouse.x, mouse.y)
                        ctx.strokeStyle = `rgba(59, 130, 246, ${(opacity * 0.9).toFixed(2)})`
                        ctx.lineWidth = opacity * 2.5
                        ctx.stroke()
                    }
                }
            }

            // Draw inter-particle connections — batch all in one path
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'
            ctx.lineWidth = 1
            ctx.beginPath()
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const distSq = dx * dx + dy * dy

                    if (distSq < connDistSq) {
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                    }
                }
            }
            ctx.stroke()

            animationId = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', handleMouseMove)
            document.body.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}

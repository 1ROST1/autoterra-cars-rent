import { useEffect, useRef } from 'react'

const PARTICLE_CONFIG = {
    count: 100,
    connectionDistance: 200,
    speed: 0.4, // Коэффициент скорости
    colors: {
        particle: 'rgba(255, 255, 255, 0.7)',
        connection: 'rgba(255, 255, 255, 0.3)',
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

            draw() {
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
                ctx.fillStyle = PARTICLE_CONFIG.colors.particle
                ctx.fill()
            }
        }

        const isTouch = window.innerWidth <= 1024 || window.matchMedia('(pointer: coarse)').matches
        const particleCount = isTouch ? 40 : PARTICLE_CONFIG.count

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle())
        }

        const drawConnections = () => {
            const isTouch = window.innerWidth <= 1024 || window.matchMedia('(pointer: coarse)').matches
            for (let i = 0; i < particles.length; i++) {
                // Отрисовываем линии к курсору только на десктопе
                if (!isTouch && mouse.x !== null && mouse.y !== null) {
                    const dx = particles[i].x - mouse.x
                    const dy = particles[i].y - mouse.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < PARTICLE_CONFIG.connectionDistance) {
                        const opacity = 1 - distance / PARTICLE_CONFIG.connectionDistance
                        ctx.beginPath()
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(mouse.x, mouse.y)
                        ctx.strokeStyle = PARTICLE_CONFIG.colors.mouseConnection.replace('0.9', (opacity * 0.9).toFixed(2))
                        ctx.lineWidth = opacity * 2.5
                        ctx.stroke()
                    }
                }

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)
                    const connDistance = PARTICLE_CONFIG.connectionDistance * 0.7

                    if (distance < connDistance) {
                        const opacity = 1 - distance / connDistance
                        ctx.beginPath()
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.strokeStyle = PARTICLE_CONFIG.colors.connection.replace('0.3', (opacity * 0.3).toFixed(2))
                        ctx.lineWidth = 1
                        ctx.stroke()
                    }
                }
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            particles.forEach(p => { p.update(); p.draw() })
            drawConnections()
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

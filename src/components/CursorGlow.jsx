import { useEffect, useState } from 'react'

export default function CursorGlow() {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY })
            setVisible(true)
        }

        const handleMouseLeave = () => setVisible(false)

        window.addEventListener('mousemove', handleMouseMove)
        document.body.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            document.body.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    if (!visible) return null

    return (
        <div
            className="pointer-events-none fixed z-50 w-64 h-64 rounded-full opacity-20 blur-3xl transition-opacity duration-300"
            style={{
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, transparent 70%)',
                left: position.x - 128,
                top: position.y - 128,
            }}
        />
    )
}

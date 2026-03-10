import { useRef } from 'react'

export function useTilt(intensity = 10) {
    const ref = useRef(null)
    const rafId = useRef(null)

    const handleMouseMove = (e) => {
        if (!ref.current) return

        // Throttle to one update per animation frame
        if (rafId.current) return
        rafId.current = requestAnimationFrame(() => {
            rafId.current = null
            if (!ref.current) return

            const rect = ref.current.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            const centerX = rect.width / 2
            const centerY = rect.height / 2

            const rotateX = ((y - centerY) / centerY) * -intensity
            const rotateY = ((x - centerX) / centerX) * intensity

            ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
        })
    }

    const handleMouseLeave = () => {
        if (rafId.current) {
            cancelAnimationFrame(rafId.current)
            rafId.current = null
        }
        if (!ref.current) return
        ref.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    }

    return { ref, handleMouseMove, handleMouseLeave }
}

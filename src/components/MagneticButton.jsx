import { Link } from 'react-router-dom'
import { useMagnetic } from '../hooks/useMagnetic'

export default function MagneticButton({ to, children, className = '' }) {
    const { ref, style, handleMouseMove, handleMouseLeave } = useMagnetic(0.2)

    const baseClasses = `
        inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-medium
        hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/30
        hover:scale-105 active:scale-95
        transition-all duration-200
    `

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="inline-block"
        >
            <Link
                to={to}
                style={style}
                className={`${baseClasses} ${className}`}
            >
                {children}
            </Link>
        </div>
    )
}

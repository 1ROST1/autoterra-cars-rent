export default function AmbientBackground() {
    return (
        <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
            {/* Light gradient base - like the reference */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200" />

            {/* Tech Grid Pattern */}
            <div className="absolute inset-0"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(59, 130, 246, 0.08) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(59, 130, 246, 0.08) 1px, transparent 1px)
                    `,
                    backgroundSize: '3rem 3rem',
                }}
            />

            {/* Soft blue glows */}
            <div className="absolute top-[10%] right-[20%] w-[40vw] h-[40vw] bg-blue-400/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[20%] left-[10%] w-[35vw] h-[35vw] bg-cyan-300/15 rounded-full blur-[100px]" />
            <div className="absolute top-[50%] left-[40%] w-[30vw] h-[30vw] bg-indigo-300/10 rounded-full blur-[80px]" />

            {/* Dot pattern overlay */}
            <div className="absolute inset-0 opacity-[0.3]"
                style={{ backgroundImage: `radial-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px)`, backgroundSize: '24px 24px' }}
            />
        </div>
    )
}

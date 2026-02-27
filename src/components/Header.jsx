import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import MagneticButton from './MagneticButton'
import Logo from './Logo'

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false)
    const { t } = useTranslation()
    const { lang, switchLanguage, isRo, isRu, isEn } = useLanguage()

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass-panel !rounded-none !border-t-0 !border-l-0 !border-r-0">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link to={`/${lang}`} className="block hover:opacity-90 transition-opacity">
                    <Logo className="h-10 w-auto" />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link to={`/${lang}`} className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
                        {t('nav.home')}
                    </Link>
                    <Link to={`/${lang}/about`} className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
                        {t('nav.about')}
                    </Link>
                    <Link to={`/${lang}/contact`} className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
                        {t('nav.contact')}
                    </Link>
                </nav>

                {/* Right side */}
                <div className="hidden md:flex items-center gap-6">
                    {/* Language */}
                    <div className="flex bg-white/50 backdrop-blur-xl border border-white/80 rounded-lg p-0.5 shadow-sm">
                        <button
                            onClick={() => switchLanguage('ro')}
                            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${isRo ? 'bg-blue-500 text-white' : 'text-slate-600'}`}
                        >
                            RO
                        </button>
                        <button
                            onClick={() => switchLanguage('ru')}
                            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${isRu ? 'bg-blue-500 text-white' : 'text-slate-600'}`}
                        >
                            RU
                        </button>
                        <button
                            onClick={() => switchLanguage('en')}
                            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${isEn ? 'bg-blue-500 text-white' : 'text-slate-600'}`}
                        >
                            EN
                        </button>
                    </div>

                    <MagneticButton to={`/${lang}`}>
                        {t('nav.book_now')}
                    </MagneticButton>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden text-slate-900"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-menu"
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile menu */}
            <div
                id="mobile-menu"
                className={`md:hidden grid transition-[grid-template-rows,opacity,transform] duration-300 ease-out ${menuOpen
                    ? 'grid-rows-[1fr] opacity-100 translate-y-0'
                    : 'grid-rows-[0fr] opacity-0 -translate-y-1 pointer-events-none'
                    }`}
            >
                <div className="min-h-0 overflow-hidden">
                    <div className="glass-panel !rounded-none !border-t border-slate-200/50 px-4 py-4">
                        <nav className="flex flex-col gap-3 mb-4">
                            <Link to={`/${lang}`} onClick={() => setMenuOpen(false)} className="text-slate-700 py-2">
                                {t('nav.home')}
                            </Link>
                            <Link to={`/${lang}/about`} onClick={() => setMenuOpen(false)} className="text-slate-700 py-2">
                                {t('nav.about')}
                            </Link>
                            <Link to={`/${lang}/contact`} onClick={() => setMenuOpen(false)} className="text-slate-700 py-2">
                                {t('nav.contact')}
                            </Link>
                        </nav>
                        <div className="flex gap-2 mb-4">
                            <button
                                onClick={() => switchLanguage('ro')}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium ${isRo ? 'bg-blue-500 text-white' : 'bg-white/50 text-slate-600'}`}
                            >
                                RO
                            </button>
                            <button
                                onClick={() => switchLanguage('ru')}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium ${isRu ? 'bg-blue-500 text-white' : 'bg-white/50 text-slate-600'}`}
                            >
                                RU
                            </button>
                            <button
                                onClick={() => switchLanguage('en')}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium ${isEn ? 'bg-blue-500 text-white' : 'bg-white/50 text-slate-600'}`}
                            >
                                EN
                            </button>
                        </div>
                        <Link
                            to={`/${lang}`}
                            onClick={() => setMenuOpen(false)}
                            className="block bg-blue-600 text-white text-center py-3 rounded-lg font-medium shadow-lg"
                        >
                            {t('nav.book_now')}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

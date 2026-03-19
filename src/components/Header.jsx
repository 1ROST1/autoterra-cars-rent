import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import MagneticButton from './MagneticButton'
import Logo from './Logo'
import { BUSINESS_PHONE_RAW } from '../constants/contact'

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false)
    const { t } = useTranslation()
    const { lang, switchLanguage, isRo, isRu, isEn } = useLanguage()
    const location = useLocation()

    useEffect(() => {
        setMenuOpen(false)
    }, [location.pathname])

    const getActiveIndex = () => {
        const path = location.pathname
        if (path === `/${lang}` || path === `/${lang}/`) return 0
        if (path.includes('/about')) return 1
        if (path.includes('/contact')) return 2
        return -1
    }

    const activeIdx = getActiveIndex()
    const navItems = [
        { key: 'home', to: `/${lang}/` },
        { key: 'about', to: `/${lang}/about/` },
        { key: 'contact', to: `/${lang}/contact/` }
    ]

    const handleMenuToggle = () => {
        setMenuOpen(prev => !prev)
    }

    const handleLanguageChange = (nextLang) => {
        setMenuOpen(false)
        switchLanguage(nextLang)
    }

        return (
            <header className="fixed top-0 left-0 right-0 z-50">
            <div
                className="glass-panel !rounded-none !border-t-0 !border-l-0 !border-r-0 overflow-visible"
                style={{ paddingTop: 'var(--safe-area-top)' }}
            >
                <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between w-full overflow-visible">
                    <Link to={`/${lang}/`} onClick={() => setMenuOpen(false)} className="block hover:opacity-90 transition-opacity">
                        <Logo />
                    </Link>

                    <nav className="hidden md:flex items-center bg-slate-100/80 backdrop-blur-md border border-slate-200/50 rounded-xl p-1 shadow-inner w-72">
                        <div className="relative flex w-full h-full">
                            {activeIdx !== -1 && (
                                <div
                                    className="absolute top-0 bottom-0 transition-all duration-300 ease-out z-0 pointer-events-none"
                                    style={{
                                        width: '33.333%',
                                        transform: `translateX(${activeIdx * 100}%)`,
                                        padding: '1px'
                                    }}
                                >
                                    <div className="w-full h-full bg-white rounded-lg shadow-md border border-slate-100 active:scale-95 transition-transform" />
                                </div>
                            )}

                            {navItems.map(({ key, to }, index) => (
                                <Link
                                    key={key}
                                    to={to}
                                    className={`relative z-10 flex-1 text-center py-2 text-[11px] uppercase tracking-wider font-bold transition-colors duration-300 rounded-lg ${activeIdx === index ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
                                >
                                    {t(`nav.${key}`)}
                                </Link>
                            ))}
                        </div>
                    </nav>

                    <div className="hidden md:flex items-center gap-6">
                        <div className="bg-slate-100/80 backdrop-blur-md border border-slate-200/50 rounded-xl p-1 shadow-inner group w-40">
                            <div className="relative flex w-full h-full">
                                <div
                                    className="absolute top-0 bottom-0 transition-all duration-300 ease-out z-0 pointer-events-none"
                                    style={{
                                        width: '33.333%',
                                        transform: `translateX(${isRo ? 0 : isRu ? 100 : 200}%)`,
                                        padding: '1px'
                                    }}
                                >
                                    <div className="w-full h-full bg-blue-600 rounded-lg shadow-sm active:scale-95 transition-transform" />
                                </div>

                                <button
                                    onClick={() => switchLanguage('ro')}
                                    className={`relative flex-1 py-1.5 text-[11px] uppercase tracking-wider font-bold rounded-lg transition-colors duration-300 z-10 ${isRo ? 'text-white' : 'text-slate-500 hover:text-slate-800'}`}
                                >
                                    RO
                                </button>
                                <button
                                    onClick={() => switchLanguage('ru')}
                                    className={`relative flex-1 py-1.5 text-[11px] uppercase tracking-wider font-bold rounded-lg transition-colors duration-300 z-10 ${isRu ? 'text-white' : 'text-slate-500 hover:text-slate-800'}`}
                                >
                                    RU
                                </button>
                                <button
                                    onClick={() => switchLanguage('en')}
                                    className={`relative flex-1 py-1.5 text-[11px] uppercase tracking-wider font-bold rounded-lg transition-colors duration-300 z-10 ${isEn ? 'text-white' : 'text-slate-500 hover:text-slate-800'}`}
                                >
                                    EN
                                </button>
                            </div>
                        </div>

                        <MagneticButton href={`tel:${BUSINESS_PHONE_RAW}`}>
                            {t('nav.book_now')}
                        </MagneticButton>
                    </div>

                    <button
                        type="button"
                        className="md:hidden text-slate-900"
                        onClick={handleMenuToggle}
                        aria-label={menuOpen ? t('nav.close_menu') : t('nav.open_menu')}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            <div
                id="mobile-menu"
                aria-hidden={!menuOpen}
                className={`absolute inset-x-0 top-full md:hidden grid transition-[grid-template-rows] duration-200 ease-out ${menuOpen
                    ? 'grid-rows-[1fr] pointer-events-auto'
                    : 'grid-rows-[0fr] pointer-events-none'
                    }`}
            >
                <div className="min-h-0 overflow-hidden">
                    <div className="overflow-hidden border border-white/85 border-t-0 border-l-0 border-r-0 bg-white shadow-[0_24px_48px_rgba(15,23,42,0.14)]">
                        <div className="max-w-7xl mx-auto px-4 py-4">
                            <nav className="bg-slate-100/90 backdrop-blur-md rounded-xl p-1 shadow-inner mb-4">
                                <div className="relative flex w-full">
                                    {activeIdx !== -1 && (
                                        <div
                                            className="absolute top-0 bottom-0 transition-all duration-300 ease-out z-0 pointer-events-none"
                                        style={{
                                            width: '33.333%',
                                            transform: `translateX(${activeIdx * 100}%)`,
                                            padding: '1px'
                                        }}
                                    >
                                        <div className="w-full h-full bg-white rounded-lg shadow-md border border-slate-100 active:scale-95 transition-transform" />
                                    </div>
                                )}

                                {navItems.map(({ key, to }, index) => (
                                    <Link
                                        key={key}
                                        to={to}
                                        onClick={() => setMenuOpen(false)}
                                        className={`relative z-10 flex-1 text-center py-2 text-[11px] uppercase tracking-wider font-bold transition-colors ${activeIdx === index ? 'text-blue-600' : 'text-slate-500'}`}
                                    >
                                        {t(`nav.${key}`)}
                                    </Link>
                                ))}
                            </div>
                        </nav>

                            <div className="bg-slate-100/90 backdrop-blur-md rounded-xl p-1 mb-4 shadow-inner">
                                <div className="relative flex w-full">
                                    <div
                                        className="absolute top-0 bottom-0 transition-all duration-300 ease-out z-0 pointer-events-none"
                                        style={{
                                            width: '33.333%',
                                            transform: `translateX(${isRo ? 0 : isRu ? 100 : 200}%)`,
                                            padding: '1px'
                                        }}
                                    >
                                        <div className="w-full h-full bg-blue-600 rounded-lg shadow-sm active:scale-95 transition-transform" />
                                    </div>
                                    <button
                                        onClick={() => handleLanguageChange('ro')}
                                        className={`relative flex-1 py-1.5 rounded-lg text-[11px] uppercase tracking-wider font-bold transition-colors duration-300 z-10 ${isRo ? 'text-white' : 'text-slate-500'}`}
                                    >
                                        RO
                                    </button>
                                    <button
                                        onClick={() => handleLanguageChange('ru')}
                                        className={`relative flex-1 py-1.5 rounded-lg text-[11px] uppercase tracking-wider font-bold transition-colors duration-300 z-10 ${isRu ? 'text-white' : 'text-slate-500'}`}
                                    >
                                        RU
                                    </button>
                                    <button
                                        onClick={() => handleLanguageChange('en')}
                                        className={`relative flex-1 py-1.5 rounded-lg text-[11px] uppercase tracking-wider font-bold transition-colors duration-300 z-10 ${isEn ? 'text-white' : 'text-slate-500'}`}
                                    >
                                        EN
                                    </button>
                                </div>
                            </div>
                            <a
                                href={`tel:${BUSINESS_PHONE_RAW}`}
                                onClick={() => setMenuOpen(false)}
                                className="block bg-blue-600 text-white text-center py-3 rounded-lg font-medium shadow-lg"
                            >
                                {t('nav.book_now')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

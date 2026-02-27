import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import Logo from './Logo'

export default function Footer() {
    const { t } = useTranslation()
    const { lang, isRu } = useLanguage()

    return (
        <footer className="glass-panel !rounded-none !border-l-0 !border-r-0 !border-b-0 mt-20">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    {/* Logo & Description */}
                    <div className="md:col-span-2">
                        <Link to={`/${lang}`} className="block w-fit mb-6 hover:opacity-90 transition-opacity">
                            <Logo className="h-12 w-auto" />
                        </Link>
                        <p className="text-slate-600 text-sm max-w-xs">
                            {t('footer.description')}
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="font-semibold text-slate-900 mb-4">{t('footer.nav_title')}</h4>
                        <nav className="flex flex-col gap-2">
                            <Link to={`/${lang}`} className="text-slate-600 hover:text-blue-600 text-sm transition-colors">
                                {t('nav.home')}
                            </Link>
                            <Link to={`/${lang}/about`} className="text-slate-600 hover:text-blue-600 text-sm transition-colors">
                                {t('nav.about')}
                            </Link>
                            <Link to={`/${lang}/contact`} className="text-slate-600 hover:text-blue-600 text-sm transition-colors">
                                {t('nav.contact')}
                            </Link>
                        </nav>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-slate-900 mb-4">{t('footer.contacts_title')}</h4>
                        <div className="flex flex-col gap-3">
                            <a href="tel:+37360123456" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 text-sm transition-colors">
                                <Phone size={16} />
                                +373 60 123 456
                            </a>
                            <a href="mailto:info@autorent.md" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 text-sm transition-colors">
                                <Mail size={16} />
                                info@autorent.md
                            </a>
                            <span className="flex items-center gap-2 text-slate-600 text-sm">
                                <MapPin size={16} />
                                {t('footer.address')}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-200/50 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        &copy; 2024 AutoRent. {t('footer.rights')}
                    </p>
                    <div>
                        <Link to={`/${lang}/privacy`} className="text-slate-500 hover:text-blue-600 text-sm transition-colors">
                            {t('footer.privacy')}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import Logo from './Logo'
import { BUSINESS_PHONE_RAW, BUSINESS_PHONE_DISPLAY, BUSINESS_EMAIL, SOCIAL_LINKS } from '../constants/contact'

export default function Footer() {
    const { t } = useTranslation()
    const { lang } = useLanguage()

    return (
        <footer className="glass-card !rounded-none !border-l-0 !border-r-0 !border-b-0 mt-20">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    {/* Logo & Description */}
                    <div className="md:col-span-2">
                        <Link to={`/${lang}/`} className="block w-fit mb-6 hover:opacity-90 transition-opacity">
                            <Logo className="h-20 md:h-24 w-auto" />
                        </Link>
                        <p className="text-slate-600 text-sm max-w-xs mb-6">
                            {t('footer.description')}
                        </p>

                        <div className="flex items-center gap-3">
                            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white transition-all shadow-sm hover:shadow">
                                <Facebook size={18} />
                            </a>
                            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-pink-600 hover:text-white transition-all shadow-sm hover:shadow">
                                <Instagram size={18} />
                            </a>
                            <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-green-500 hover:text-white transition-all shadow-sm hover:shadow">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                </svg>
                            </a>
                            <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram"
                                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-blue-500 hover:text-white transition-all shadow-sm hover:shadow">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="font-semibold text-slate-900 mb-4">{t('footer.nav_title')}</h4>
                        <nav className="flex flex-col gap-2">
                            <Link to={`/${lang}/`} className="text-slate-600 hover:text-blue-600 text-sm transition-colors">
                                {t('nav.home')}
                            </Link>
                            <Link to={`/${lang}/about/`} className="text-slate-600 hover:text-blue-600 text-sm transition-colors">
                                {t('nav.about')}
                            </Link>
                            <Link to={`/${lang}/contact/`} className="text-slate-600 hover:text-blue-600 text-sm transition-colors">
                                {t('nav.contact')}
                            </Link>
                        </nav>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-slate-900 mb-4">{t('footer.contacts_title')}</h4>
                        <div className="flex flex-col gap-3">
                            <a href={`tel:${BUSINESS_PHONE_RAW}`} className="flex items-center gap-2 text-slate-600 hover:text-blue-600 text-sm transition-colors">
                                <Phone size={16} />
                                {BUSINESS_PHONE_DISPLAY}
                            </a>
                            <a href={`mailto:${BUSINESS_EMAIL}`} className="flex items-center gap-2 text-slate-600 hover:text-blue-600 text-sm transition-colors">
                                <Mail size={16} />
                                {BUSINESS_EMAIL}
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
                        &copy; {new Date().getFullYear()} AutoTerra. {t('footer.rights')}
                    </p>
                    <div>
                        <Link to={`/${lang}/privacy/`} className="text-slate-500 hover:text-blue-600 text-sm transition-colors">
                            {t('footer.privacy')}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { useLanguage } from '../hooks/useLanguage'

export default function NotFound() {
    const { t } = useTranslation()
    const { lang } = useLanguage()

    return (
        <div className="min-h-screen text-slate-900 relative z-10 flex flex-col">
            <SEO
                title={t('not_found_page.title')}
                description={t('not_found_page.description')}
                noindex
                canonicalPath={`/${lang}/404/`}
            />
            <Header />

            <main className="page-offset-28 pb-16 px-4 flex-1 flex items-center">
                <div className="max-w-3xl mx-auto w-full glass-card rounded-3xl p-8 md:p-12 text-center">
                    <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-600 mb-4">
                        {t('not_found_page.eyebrow')}
                    </p>
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                        {t('not_found_page.title')}
                    </h1>
                    <p className="text-slate-600 max-w-xl mx-auto mb-8">
                        {t('not_found_page.body')}
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            to={`/${lang}/`}
                            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20"
                        >
                            {t('not_found_page.home_cta')}
                        </Link>
                        <Link
                            to={`/${lang}/contact/`}
                            className="inline-flex items-center justify-center border border-slate-200 bg-white/80 hover:bg-slate-50 text-slate-900 px-6 py-3 rounded-xl font-medium transition-colors"
                        >
                            {t('not_found_page.contact_cta')}
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

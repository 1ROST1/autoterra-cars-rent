import Header from '../components/Header'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { useTranslation } from 'react-i18next'

export default function Privacy() {
    const { t } = useTranslation()

    const sections = [
        { title: t('privacy_page.section1_title'), text: t('privacy_page.section1_text') },
        {
            title: t('privacy_page.section2_title'),
            text: t('privacy_page.section2_text'),
            list: t('privacy_page.section2_list', { returnObjects: true })
        },
        { title: t('privacy_page.section3_title'), text: t('privacy_page.section3_text') },
        { title: t('privacy_page.section4_title'), text: t('privacy_page.section4_text') },
        { title: t('privacy_page.section5_title'), text: t('privacy_page.section5_text') },
        { title: t('privacy_page.section6_title'), text: t('privacy_page.section6_text') }
    ]

    return (
        <div className="min-h-screen text-slate-900 relative z-10 flex flex-col">
            <SEO title={t('privacy_page.title')} description={t('privacy_page.description')} />
            <Header />

            <div className="page-offset-28 pb-16 px-4 flex-1">
                <div className="max-w-3xl mx-auto glass-card p-8 rounded-3xl">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-8">{t('privacy_page.title')}</h1>

                    <div className="space-y-8 text-slate-600">
                        {sections.map((section, idx) => (
                            <section key={idx}>
                                <h2 className="text-xl font-semibold text-slate-900 mb-3">{section.title}</h2>
                                <p className={section.list ? 'mb-3' : ''}>{section.text}</p>
                                {section.list && Array.isArray(section.list) && (
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        {section.list.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                )}
                                {idx === sections.length - 1 && (
                                    <a href="mailto:info@autoterra.md" className="text-blue-600 hover:underline ml-1">
                                        info@autoterra.md
                                    </a>
                                )}
                            </section>
                        ))}

                        <p className="text-slate-400 text-sm pt-4 border-t border-slate-200">
                            {t('privacy_page.last_update')}
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

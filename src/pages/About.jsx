import { Shield, Award, Users, Car } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { PAGE_KEYWORDS } from '../constants/seo'
import { useLanguage } from '../hooks/useLanguage'
import { useTranslation } from 'react-i18next'
import { cars } from '../data/cars'

export default function About() {
    const { t } = useTranslation()
    const { lang } = useLanguage()

    const features = [
        {
            icon: Shield,
            title: t('about_page.feature1_title'),
            text: t('about_page.feature1_text')
        },
        {
            icon: Award,
            title: t('about_page.feature2_title'),
            text: t('about_page.feature2_text')
        },
        {
            icon: Users,
            title: t('about_page.feature3_title'),
            text: t('about_page.feature3_text')
        },
        {
            icon: Car,
            title: t('about_page.feature4_title'),
            text: t('about_page.feature4_text', { count: cars.length })
        }
    ]

    return (
        <div className="min-h-screen text-slate-900 relative z-10 flex flex-col">
            <SEO title={t('about_page.title')} description={t('about_page.subtitle')} keywords={PAGE_KEYWORDS.about[lang]} />
            <Header />

            <div className="pt-28 pb-16 px-4 flex-1">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">{t('about_page.title')}</h1>
                    <p className="text-slate-600 text-center mb-12 max-w-xl mx-auto">
                        {t('about_page.subtitle')}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        {features.map((feature, idx) => (
                            <div key={idx} className="glass-card rounded-2xl p-6">
                                <feature.icon className="text-blue-600 mb-4" size={28} />
                                <h3 className="font-semibold mb-2">{feature.title}</h3>
                                <p className="text-slate-600 text-sm">{feature.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

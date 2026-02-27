import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { SITE_URL } from '../constants/seo'

export default function Contact() {
    const { t } = useTranslation()
    const tempAddress = 'Motif Restaurant, Chișinău, Moldova'
    const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(tempAddress)}&output=embed`
    const mapOpenUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(tempAddress)}`
    const contactStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'AutomotiveBusiness',
        name: 'AutoRent',
        ...(SITE_URL ? { url: SITE_URL } : {}),
        telephone: '+37360123456',
        email: 'info@autorent.md',
        address: {
            '@type': 'PostalAddress',
            streetAddress: t('contact_page.address_value'),
            addressLocality: 'Chișinău',
            addressCountry: 'MD'
        },
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday'
                ],
                opens: '08:00',
                closes: '20:00'
            }
        ]
    }

    const cards = [
        {
            icon: Phone,
            title: t('contact_page.phone'),
            value: '+373 60 123 456',
            href: 'tel:+37360123456'
        },
        {
            icon: Mail,
            title: 'Email',
            value: 'info@autorent.md',
            href: 'mailto:info@autorent.md'
        },
        {
            icon: MapPin,
            title: t('contact_page.address'),
            value: t('contact_page.address_value')
        },
        {
            icon: Clock,
            title: t('contact_page.working_hours'),
            value: t('contact_page.working_hours_value')
        }
    ]

    return (
        <div className="min-h-screen text-slate-900 relative z-10 flex flex-col">
            <SEO
                title={t('contact_page.title')}
                description={t('contact_page.subtitle')}
                structuredData={contactStructuredData}
            />
            <Header />

            <div className="pt-28 pb-16 px-4 flex-1">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">{t('contact_page.title')}</h1>
                    <p className="text-slate-600 text-center mb-12 max-w-xl mx-auto">
                        {t('contact_page.subtitle')}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        {cards.map((card, idx) => (
                            <div key={idx} className="glass-panel rounded-2xl p-6">
                                <card.icon className="text-blue-600 mb-4" size={28} />
                                <h3 className="font-semibold mb-2">{card.title}</h3>
                                {card.href ? (
                                    <a href={card.href} className="text-slate-600 hover:text-blue-600 transition-colors">
                                        {card.value}
                                    </a>
                                ) : (
                                    <p className="text-slate-600">{card.value}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="glass-panel rounded-2xl p-4 md:p-6 mt-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                            <h2 className="text-xl font-semibold text-slate-900">
                                Google Maps
                            </h2>
                            <a
                                href={mapOpenUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                {tempAddress}
                            </a>
                        </div>
                        <iframe
                            title="AutoRent temporary address map"
                            src={mapEmbedUrl}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-[360px] md:h-[420px] rounded-xl border border-slate-200/60"
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

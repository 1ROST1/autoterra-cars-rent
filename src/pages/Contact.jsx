import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { SITE_URL, PAGE_KEYWORDS } from '../constants/seo'
import { useLanguage } from '../hooks/useLanguage'
import { BUSINESS_PHONE_RAW, BUSINESS_PHONE_DISPLAY, BUSINESS_EMAIL, BUSINESS_OPENING_HOURS } from '../constants/contact'

export default function Contact() {
    const { t } = useTranslation()
    const { lang } = useLanguage()
    const address = t('contact_page.address_value')
    const mapQuery = 'Restaurant Motif, Chișinău, Moldova'
    const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`
    const mapOpenUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`
    const contactStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'AutomotiveBusiness',
        name: 'AutoTerra',
        ...(SITE_URL ? { url: `${SITE_URL}/${lang}/contact/` } : {}),
        telephone: BUSINESS_PHONE_RAW,
        email: BUSINESS_EMAIL,
        address: {
            '@type': 'PostalAddress',
            streetAddress: address,
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
                opens: BUSINESS_OPENING_HOURS.opens,
                closes: BUSINESS_OPENING_HOURS.closes
            }
        ]
    }

    const cards = [
        {
            icon: Phone,
            title: t('contact_page.phone'),
            value: BUSINESS_PHONE_DISPLAY,
            href: `tel:${BUSINESS_PHONE_RAW}`
        },
        {
            icon: Mail,
            title: t('contact_page.email'),
            value: BUSINESS_EMAIL,
            href: `mailto:${BUSINESS_EMAIL}`
        },
        {
            icon: MapPin,
            title: t('contact_page.address'),
            value: address
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
                title={t('contact_page.meta_title')}
                description={t('contact_page.meta_description')}
                keywords={PAGE_KEYWORDS.contact[lang]}
                structuredData={contactStructuredData}
                absoluteTitle
            />
            <Header />

            <div className="page-offset-28 pb-16 px-4 flex-1">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">{t('contact_page.title')}</h1>
                    <p className="text-slate-600 text-center mb-12 max-w-xl mx-auto">
                        {t('contact_page.subtitle')}
                    </p>

                    <section aria-labelledby="contact-details-heading" className="mb-8">
                        <div className="text-center mb-8">
                            <h2 id="contact-details-heading" className="text-2xl font-semibold text-slate-900 mb-2">
                                {t('contact_page.details_title')}
                            </h2>
                            <p className="text-slate-600">
                                {t('contact_page.details_description')}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {cards.map((card, idx) => (
                                <div key={idx} className="glass-card rounded-2xl p-6">
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
                    </section>

                    <div className="glass-card rounded-2xl p-4 md:p-6 mt-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                            <h2 className="text-xl font-semibold text-slate-900">
                                {t('contact_page.google_maps')}
                            </h2>
                            <a
                                href={mapOpenUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                {address}
                            </a>
                        </div>
                        <iframe
                            title={t('contact_page.map_title')}
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

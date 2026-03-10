import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CarCard from '../components/CarCard'
import FilterControl from '../components/FilterControl'
import FAQ from '../components/FAQ'
import { cars, getCarStartingPrice } from '../data/cars'
import SEO from '../components/SEO'
import { useLanguage } from '../hooks/useLanguage'
import { SITE_URL, PAGE_KEYWORDS, DEFAULT_OG_IMAGE } from '../constants/seo'
import { BUSINESS_PHONE_RAW, BUSINESS_EMAIL, SOCIAL_LINKS, BUSINESS_OPENING_HOURS } from '../constants/contact'

export default function Home() {
    const { t } = useTranslation()
    const [typeFilter, setTypeFilter] = useState('none')
    const [classFilter, setClassFilter] = useState('none')
    const [sortBy, setSortBy] = useState('none') // 'none', 'asc', 'desc'

    const filteredCars = useMemo(() => {
        let result = cars.filter(car => {
            const matchesType = typeFilter === 'none' || car.type === typeFilter
            const matchesClass = classFilter === 'none' || car.class === classFilter
            return matchesType && matchesClass
        })

        if (sortBy === 'asc') {
            result.sort((a, b) => getCarStartingPrice(a) - getCarStartingPrice(b))
        } else if (sortBy === 'desc') {
            result.sort((a, b) => getCarStartingPrice(b) - getCarStartingPrice(a))
        } else {
            result.sort((a, b) => `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`))
        }

        return result
    }, [typeFilter, classFilter, sortBy])

    const typeFilters = [
        { key: 'petrol', label: t('filters.petrol'), colors: { bg: '#f59e0b', mid: '#fbbf24', shadow: 'rgba(245, 158, 11, 0.4)' } },
        { key: 'diesel', label: t('filters.diesel'), colors: { bg: '#64748b', mid: '#94a3b8', shadow: 'rgba(100, 116, 139, 0.4)' } },
        { key: 'hybrid', label: t('filters.hybrid'), colors: { bg: '#22c55e', mid: '#4ade80', shadow: 'rgba(34, 197, 94, 0.4)' } }
    ]
    const classFilters = [
        { key: 'economy', label: t('class_filters.economy'), color: '#0ea5e9' },
        { key: 'standard', label: t('class_filters.standard'), color: '#64748b' },
        { key: 'premium', label: t('class_filters.premium'), color: '#a855f7' }
    ]
    const sortFilters = [
        { key: 'asc', label: t('sort.price_asc'), color: '#22c55e' },
        { key: 'desc', label: t('sort.price_desc'), color: '#ef4444' }
    ]
    const activeTypeIndex = typeFilters.findIndex(({ key }) => key === typeFilter)
    const activeTypeColor = activeTypeIndex >= 0 ? typeFilters[activeTypeIndex].colors.bg : '#ffffff'
    const activeClassIndex = classFilters.findIndex(({ key }) => key === classFilter)
    const activeClassColor = activeClassIndex >= 0 ? classFilters[activeClassIndex].color : '#ffffff'
    const activeSortIndex = sortFilters.findIndex(({ key }) => key === sortBy)
    const activeSortColor = activeSortIndex >= 0 ? sortFilters[activeSortIndex].color : '#ffffff'
    const { lang } = useLanguage()
    const homeStructuredData = [
        {
            '@context': 'https://schema.org',
            '@type': 'AutomotiveBusiness',
            name: 'AutoTerra',
            ...(SITE_URL ? { url: SITE_URL } : {}),
            description: t('hero.description'),
            areaServed: {
                '@type': 'Country',
                name: 'Moldova'
            },
            telephone: BUSINESS_PHONE_RAW,
            email: BUSINESS_EMAIL,
            address: {
                '@type': 'PostalAddress',
                streetAddress: t('contact_page.address_value'),
                addressLocality: 'Chișinău',
                addressRegion: 'Chișinău',
                addressCountry: 'MD'
            },
            geo: {
                '@type': 'GeoCoordinates',
                latitude: '47.0105',
                longitude: '28.8638'
            },
            priceRange: '€25 - €150',
            openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                opens: BUSINESS_OPENING_HOURS.opens,
                closes: BUSINESS_OPENING_HOURS.closes
            },
            sameAs: [
                SOCIAL_LINKS.facebook,
                SOCIAL_LINKS.instagram
            ].filter(Boolean),
            numberOfEmployees: { '@type': 'QuantitativeValue', value: 5 },
            foundingDate: '2016',
            currenciesAccepted: 'EUR, MDL',
            paymentAccepted: 'Cash, Credit Card'
        },
        {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
                {
                    '@type': 'Question',
                    name: t('faq.q1', { defaultValue: 'Какие документы нужны для аренды?' }),
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: t('faq.a1', { defaultValue: 'Паспорт и водительское удостоверение. Минимальный возраст — 21 год, стаж вождения — от 2 лет.' })
                    }
                },
                {
                    '@type': 'Question',
                    name: t('faq.q2', { defaultValue: 'Можно ли арендовать авто без залога?' }),
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: t('faq.a2', { defaultValue: 'Залог зависит от класса автомобиля. Для эконом класса залог минимален. Подробности уточняйте по телефону.' })
                    }
                },
                {
                    '@type': 'Question',
                    name: t('faq.q3', { defaultValue: 'Доступна ли доставка авто в аэропорт?' }),
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: t('faq.a3', { defaultValue: 'Да, мы доставляем автомобиль в аэропорт Кишинёва и в любую точку города бесплатно.' })
                    }
                },
                {
                    '@type': 'Question',
                    name: t('faq.q4', { defaultValue: 'Какие цены на аренду авто?' }),
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: t('faq.a4', { defaultValue: 'Цены начинаются от 25€/день для эконом класса. Чем дольше срок аренды — тем ниже цена за день. Премиум авто от 45€/день.' })
                    }
                }
            ]
        }
    ]

    return (
        <div className="min-h-screen text-slate-900 relative z-10">
            <SEO
                title={t('hero.title')}
                description={t('hero.description')}
                keywords={PAGE_KEYWORDS.home[lang]}
                structuredData={homeStructuredData}
            />
            <Header />

            {/* Hero */}
            <section className="pt-28 pb-4 px-4">
                <div className="max-w-7xl mx-auto text-center px-4">
                    <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-10 minimalist-text accent-underline leading-tight">
                        {t('hero.title')}
                    </h1>
                    <p className="text-lg text-slate-600 max-w-xl mx-auto">
                        {t('hero.description')}
                    </p>
                </div>
            </section>

            {/* Catalog */}
            <section id="catalog" className="pt-4 pb-12 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Filters & Sorting */}
                    <div className="flex flex-col items-center gap-6 mb-10">
                        <FilterControl
                            label={t('filters.engine_type')}
                            options={typeFilters}
                            value={typeFilter}
                            onChange={setTypeFilter}
                            onReset={() => setTypeFilter('none')}
                            activeIndex={activeTypeIndex}
                            activeColor={activeTypeColor}
                            resetTitle={t('filters.reset')}
                        />

                        <FilterControl
                            label={t('class_filters.label')}
                            options={classFilters}
                            value={classFilter}
                            onChange={setClassFilter}
                            onReset={() => setClassFilter('none')}
                            activeIndex={activeClassIndex}
                            activeColor={activeClassColor}
                            resetTitle={t('filters.reset')}
                        />

                        <FilterControl
                            label={t('sort.label')}
                            options={sortFilters}
                            value={sortBy}
                            onChange={setSortBy}
                            onReset={() => setSortBy('none')}
                            activeIndex={activeSortIndex}
                            activeColor={activeSortColor}
                            resetTitle={t('filters.reset')}
                        />
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCars.map((car, index) => (
                            <CarCard key={car.id} car={car} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            <FAQ />
            <Footer />
        </div>
    )
}

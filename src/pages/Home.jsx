import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CarCard from '../components/CarCard'
import { cars } from '../data/cars'
import SEO from '../components/SEO'
import { SITE_URL } from '../constants/seo'

export default function Home() {
    const { t } = useTranslation()
    const [typeFilter, setTypeFilter] = useState('none')
    const [classFilter, setClassFilter] = useState('none')
    const [sortBy, setSortBy] = useState('none') // 'none', 'asc', 'desc'

    let filteredCars = cars.filter(car => {
        const matchesType = typeFilter === 'none' || car.type === typeFilter
        const matchesClass = classFilter === 'none' || car.class === classFilter
        return matchesType && matchesClass
    })

    if (sortBy === 'asc') {
        filteredCars.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'desc') {
        filteredCars.sort((a, b) => b.price - a.price)
    }

    const typeFilters = [
        { key: 'petrol', label: t('filters.petrol'), colors: { bg: '#f59e0b', mid: '#fbbf24', shadow: 'rgba(245, 158, 11, 0.4)' } },
        { key: 'diesel', label: t('filters.diesel'), colors: { bg: '#64748b', mid: '#94a3b8', shadow: 'rgba(100, 116, 139, 0.4)' } },
        { key: 'hybrid', label: t('filters.hybrid'), colors: { bg: '#22c55e', mid: '#4ade80', shadow: 'rgba(34, 197, 94, 0.4)' } },
        { key: 'electric', label: t('filters.electric'), colors: { bg: '#2563eb', mid: '#3b82f6', shadow: 'rgba(37, 99, 235, 0.4)' } }
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
    const homeStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'AutomotiveBusiness',
        name: 'AutoRent',
        ...(SITE_URL ? { url: SITE_URL } : {}),
        description: t('hero.description'),
        areaServed: 'Moldova',
        telephone: '+37360123456',
        email: 'info@autorent.md',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Chișinău',
            addressCountry: 'MD'
        }
    }

    return (
        <div className="min-h-screen text-slate-900 relative z-10">
            <SEO
                title={t('hero.title')}
                description={t('hero.description')}
                structuredData={homeStructuredData}
            />
            <Header />

            {/* Hero */}
            <section className="pt-28 pb-16 px-4">
                <div className="max-w-7xl mx-auto text-center px-4">
                    <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-10 minimalist-text accent-underline leading-tight">
                        {t('hero.title')}
                    </h1>
                    <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
                        {t('hero.description')}
                    </p>
                </div>
            </section>

            {/* Catalog */}
            <section id="catalog" className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Filters & Sorting */}
                    <div className="flex flex-col items-center gap-6 mb-10">
                        {/* Type Filters */}
                        <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-0">
                            <div className="text-center md:text-right md:pr-4">
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    {t('filters.engine_type')}:
                                </span>
                            </div>
                            <div className="flex justify-center">
                                <div className="relative inline-flex items-center">
                                    <div className="relative grid grid-cols-4 glass-filter-group">
                                        <span
                                            className="absolute left-1 top-1 bottom-1 rounded-lg shadow-sm transition-all duration-300"
                                            style={{
                                                width: 'calc((100% - 0.5rem) / 4)',
                                                transform: `translateX(${Math.max(activeTypeIndex, 0) * 100}%)`,
                                                backgroundColor: activeTypeColor,
                                                opacity: typeFilter === 'none' ? 0 : 1
                                            }}
                                        />
                                        {typeFilters.map(({ key, label }) => (
                                            <button
                                                key={key}
                                                onClick={() => setTypeFilter(key)}
                                                className={`relative z-10 px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${typeFilter === key
                                                    ? 'text-white'
                                                    : 'text-slate-500 hover:text-slate-900'
                                                    }`}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setTypeFilter('none')}
                                        className={`glass-clear-button absolute left-full ml-2 transition-all duration-300 ${typeFilter === 'none'
                                            ? 'opacity-0 -translate-x-2 pointer-events-none'
                                            : 'opacity-100 translate-x-0'
                                            }`}
                                        title="Сбросить"
                                    >
                                        &times;
                                    </button>
                                </div>
                            </div>
                            <div className="hidden md:block"></div>
                        </div>

                        {/* Class Filters */}
                        <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-0">
                            <div className="text-center md:text-right md:pr-4">
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    {t('class_filters.label')}:
                                </span>
                            </div>
                            <div className="flex justify-center">
                                <div className="relative inline-flex items-center">
                                    <div className="relative grid grid-cols-3 glass-filter-group">
                                        <span
                                            className="absolute left-1 top-1 bottom-1 rounded-lg shadow-sm transition-all duration-300"
                                            style={{
                                                width: 'calc((100% - 0.5rem) / 3)',
                                                transform: `translateX(${Math.max(activeClassIndex, 0) * 100}%)`,
                                                backgroundColor: activeClassColor,
                                                opacity: classFilter === 'none' ? 0 : 1
                                            }}
                                        />
                                        {classFilters.map(({ key, label }) => (
                                            <button
                                                key={key}
                                                onClick={() => setClassFilter(key)}
                                                className={`relative z-10 px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${classFilter === key
                                                    ? 'text-white'
                                                    : 'text-slate-500 hover:text-slate-900'
                                                    }`}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setClassFilter('none')}
                                        className={`glass-clear-button absolute left-full ml-2 transition-all duration-300 ${classFilter === 'none'
                                            ? 'opacity-0 -translate-x-2 pointer-events-none'
                                            : 'opacity-100 translate-x-0'
                                            }`}
                                        title="Сбросить"
                                    >
                                        &times;
                                    </button>
                                </div>
                            </div>
                            <div className="hidden md:block"></div>
                        </div>

                        {/* Sort Options */}
                        <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-0">
                            <div className="text-center md:text-right md:pr-4">
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t('sort.label')}:</span>
                            </div>
                            <div className="flex justify-center">
                                <div className="relative inline-flex items-center">
                                    <div className="relative grid grid-cols-2 glass-filter-group">
                                        <span
                                            className="absolute left-1 top-1 bottom-1 rounded-lg shadow-sm transition-all duration-300"
                                            style={{
                                                width: 'calc((100% - 0.5rem) / 2)',
                                                transform: `translateX(${Math.max(activeSortIndex, 0) * 100}%)`,
                                                backgroundColor: activeSortColor,
                                                opacity: sortBy === 'none' ? 0 : 1
                                            }}
                                        />
                                        {sortFilters.map(({ key, label }) => (
                                            <button
                                                key={key}
                                                onClick={() => setSortBy(key)}
                                                className={`relative z-10 px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${sortBy === key
                                                    ? 'text-white'
                                                    : 'text-slate-500 hover:text-slate-900'
                                                    }`}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setSortBy('none')}
                                        className={`glass-clear-button absolute left-full ml-2 transition-all duration-300 ${sortBy === 'none'
                                            ? 'opacity-0 -translate-x-2 pointer-events-none'
                                            : 'opacity-100 translate-x-0'
                                            }`}
                                        title="Сбросить"
                                    >
                                        &times;
                                    </button>
                                </div>
                            </div>
                            <div className="hidden md:block"></div>
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCars.map(car => (
                            <CarCard key={car.id} car={car} />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

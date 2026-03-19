import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Calendar, Gauge, Settings, Users } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { getCarStartingPrice } from '../data/cars'

const TYPE_COLORS = { petrol: '#f59e0b', diesel: '#64748b', hybrid: '#22c55e' }
const CLASS_COLORS = { economy: '#0ea5e9', standard: '#64748b', premium: '#a855f7' }

export default function CarCard({ car, index = 0 }) {
    const { t } = useTranslation()
    const { lang } = useLanguage()
    const startingPrice = getCarStartingPrice(car)

    const type = { label: t(`filters.${car.type}`), color: TYPE_COLORS[car.type] }
    const carClass = car.class ? { label: t(`class_filters.${car.class}`), color: CLASS_COLORS[car.class] } : null

    return (
        <div
            className="glass-card !rounded-2xl overflow-hidden hover:border-blue-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
        >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={car.cardImage || car.image}
                    alt={t('car.alt_card', { make: car.make, model: car.model })}
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? 'high' : undefined}
                    decoding="async"
                    width="756"
                    height="567"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span
                    className="absolute top-3 left-3 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md border border-white/30 shadow-lg"
                    style={{ backgroundColor: `${type.color}cc` }}
                >
                    {type.label}
                </span>
                {carClass && (
                    <span
                        className="absolute top-3 right-3 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md border border-white/30 shadow-lg"
                        style={{ backgroundColor: `${carClass.color}cc` }}
                    >
                        {carClass.label}
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    {car.make} {car.model}
                </h3>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-slate-600 mb-4 bg-slate-100/80 backdrop-blur-md border border-slate-200/50 rounded-xl p-4 shadow-inner">
                    <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-blue-600" />
                        <span className="font-medium">{car.year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Gauge size={16} className="text-blue-600" />
                        <span className="font-medium">{typeof car.specs.engine === 'object' ? (car.specs.engine[lang] || car.specs.engine.en) : car.specs.engine}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Settings size={16} className="text-blue-600" />
                        <span className="font-medium">{typeof car.specs.transmission === 'object' ? (car.specs.transmission[lang] || car.specs.transmission.en) : car.specs.transmission}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users size={16} className="text-blue-600" />
                        <span className="font-medium">{car.specs.seats} {t('car.seats_count')}</span>
                    </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-200/50">
                    <div className="flex items-baseline gap-1">
                        <span className="text-sm font-medium text-slate-500">{t('car.from')}</span>
                        <span className="text-xl font-bold text-slate-900">{startingPrice}€</span>
                        <span className="text-slate-500 text-sm">/{t('car.day')}</span>
                    </div>
                    <Link
                        to={`/${lang}/car/${car.slug}/`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20"
                    >
                        {t('car.details')}
                    </Link>
                </div>
            </div>
        </div>
    )
}

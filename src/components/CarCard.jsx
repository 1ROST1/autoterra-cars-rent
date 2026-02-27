import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Calendar, Gauge, Settings, Users } from 'lucide-react'
import { useTilt } from '../hooks/useTilt'
import { useLanguage } from '../hooks/useLanguage'

export default function CarCard({ car }) {
    const { t } = useTranslation()
    const { ref, handleMouseMove, handleMouseLeave } = useTilt(8)
    const { lang } = useLanguage()

    const typeLabels = {
        petrol: { label: t('filters.petrol'), color: '#f59e0b' },
        diesel: { label: t('filters.diesel'), color: '#64748b' },
        hybrid: { label: t('filters.hybrid'), color: '#22c55e' },
        electric: { label: t('filters.electric'), color: '#3b82f6' }
    }

    const type = typeLabels[car.type]
    const classLabels = {
        economy: { label: t('class_filters.economy'), color: '#0ea5e9' },
        standard: { label: t('class_filters.standard'), color: '#64748b' },
        premium: { label: t('class_filters.premium'), color: '#a855f7' }
    }
    const carClass = classLabels[car.class]

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="glass-panel !rounded-2xl overflow-hidden hover:border-blue-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
            style={{ transformStyle: 'preserve-3d', transition: 'transform 0.1s ease-out' }}
        >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={car.image}
                    alt={`${car.make} ${car.model}`}
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
                <div className="grid grid-cols-2 gap-y-2 gap-x-2 text-xs text-slate-500 mb-4 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-blue-500" />
                        <span>{car.year}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Gauge size={14} className="text-blue-500" />
                        <span>{car.specs.engine}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Settings size={14} className="text-blue-500" />
                        <span>{typeof car.specs.transmission === 'object' ? (car.specs.transmission[lang] || car.specs.transmission.en) : car.specs.transmission}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Users size={14} className="text-blue-500" />
                        <span>{car.specs.seats} {t('car.seats_count')}</span>
                    </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-200/50">
                    <div>
                        <span className="text-xl font-bold text-slate-900">${car.price}</span>
                        <span className="text-slate-500 text-sm">/{t('car.day')}</span>
                    </div>
                    <Link
                        to={`/${lang}/car/${car.slug}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20 sheen-effect"
                    >
                        {t('car.details')}
                    </Link>
                </div>
            </div>
        </div>
    )
}

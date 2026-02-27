import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Activity, Users, Gauge, Settings, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getCarBySlug } from '../data/cars'
import { useLanguage } from '../hooks/useLanguage'
import SEO from '../components/SEO'
import { SITE_URL } from '../constants/seo'

export default function CarDetails() {
    const { slug } = useParams()
    const { t } = useTranslation()
    const { lang } = useLanguage()

    const car = getCarBySlug(slug)
    const [activeImageIndex, setActiveImageIndex] = useState(0)

    // Lightbox State
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)

    useEffect(() => {
        if (car) {
            setActiveImageIndex(0)
            setIsLightboxOpen(false)
        }
    }, [car])

    // Prevent body scroll when lightbox is open
    useEffect(() => {
        if (isLightboxOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isLightboxOpen])

    // Swipe Handling
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)
    const [swipeOffset, setSwipeOffset] = useState(0)

    const minSwipeDistance = 50

    const onTouchStart = (e) => {
        setTouchEnd(null)
        setTouchStart(e.targetTouches[0].clientX)
        setSwipeOffset(0)
    }

    const onTouchMove = (e) => {
        const currentX = e.targetTouches[0].clientX
        setTouchEnd(currentX)
        if (touchStart) {
            setSwipeOffset(currentX - touchStart)
        }
    }

    const onTouchEndEvent = () => {
        if (!touchStart || !touchEnd) {
            setSwipeOffset(0)
            return
        }
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance

        if (isLeftSwipe || isRightSwipe) {
            if (car.images && car.images.length > 1) {
                if (isLeftSwipe) {
                    setActiveImageIndex(prev => (prev === car.images.length - 1 ? 0 : prev + 1))
                }
                if (isRightSwipe) {
                    setActiveImageIndex(prev => (prev === 0 ? car.images.length - 1 : prev - 1))
                }
            }
        }
        setTouchStart(null)
        setTouchEnd(null)
        setSwipeOffset(0)
    }

    // Lightbox Navigation Controls
    const nextLightboxImage = (e) => {
        e.stopPropagation()
        setActiveImageIndex(prev => (prev === car.images.length - 1 ? 0 : prev + 1))
    }

    const prevLightboxImage = (e) => {
        e.stopPropagation()
        setActiveImageIndex(prev => (prev === 0 ? car.images.length - 1 : prev - 1))
    }

    // Keyboard navigation for lightbox
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isLightboxOpen) return
            if (e.key === 'Escape') setIsLightboxOpen(false)
            if (e.key === 'ArrowRight') setActiveImageIndex(prev => (prev === car.images.length - 1 ? 0 : prev + 1))
            if (e.key === 'ArrowLeft') setActiveImageIndex(prev => (prev === 0 ? car.images.length - 1 : prev - 1))
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isLightboxOpen, car])

    if (!car) {
        return (
            <div className="min-h-screen text-slate-900 flex flex-col items-center justify-center relative z-10">
                <SEO title={t('car_details.not_found')} noindex />
                <h1 className="text-3xl font-bold mb-4">{t('car_details.not_found')}</h1>
                <Link to={`/${lang}`} className="bg-blue-600 text-white px-6 py-2 rounded-lg">
                    {t('car_details.back_home')}
                </Link>
            </div>
        )
    }

    const typeLabels = {
        ice: { label: t('filters.ice'), color: 'bg-amber-500' },
        hybrid: { label: t('filters.hybrid'), color: 'bg-green-500' },
        electric: { label: t('filters.electric'), color: 'bg-blue-500' }
    }

    const type = typeLabels[car.type] || typeLabels.ice // Fallback to avoid crash
    const localizedDescription = car.description[lang] || car.description.ru
    const localizedCarUrl = `${SITE_URL}/${lang}/car/${car.slug}`

    // Safety check
    const activeImage = car.images ? car.images[activeImageIndex] : car.image

    const carStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: `${car.make} ${car.model} ${car.year}`,
        description: localizedDescription,
        image: car.images ? car.images.map(imagePath => imagePath.startsWith('http') ? imagePath : `${SITE_URL}${imagePath}`) : [],
        brand: {
            '@type': 'Brand',
            name: car.make
        },
        offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            price: String(car.price),
            availability: 'https://schema.org/InStock',
            url: localizedCarUrl
        }
    }

    return (
        <div className="min-h-screen text-slate-900 relative z-10 flex flex-col">
            <SEO
                title={`${car.make} ${car.model}`}
                description={`${t('car.price_per_day')}: $${car.price}. ${car.specs.power}, ${typeof car.specs.transmission === 'object' ? (car.specs.transmission[lang] || car.specs.transmission.en) : car.specs.transmission}, ${car.specs.seats} ${t('car.seats_count')}.`}
                image={activeImage}
                ogType="product"
                structuredData={carStructuredData}
            />
            <Header />

            {/* LIGHTBOX MODAL */}
            {isLightboxOpen && (
                <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm">
                    {/* Top Controls */}
                    <div className="absolute top-0 right-0 p-4 md:p-6 flex justify-end w-full z-10 pointer-events-none">
                        <button
                            onClick={() => setIsLightboxOpen(false)}
                            className="p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-md transition-all pointer-events-auto"
                        >
                            <X size={32} />
                        </button>
                    </div>

                    {/* Main Lightbox Image View */}
                    <div
                        className="relative w-full flex-1 flex items-center justify-center overflow-hidden px-4 select-none"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEndEvent}
                    >
                        {car.images && car.images.length > 1 && (
                            <div
                                className="flex w-full h-[80vh] items-center"
                                style={{
                                    transform: `translateX(calc(-${activeImageIndex * 100}% + ${swipeOffset}px))`,
                                    transition: touchStart ? 'none' : 'transform 0.3s ease-out'
                                }}
                            >
                                {car.images.map((img, i) => (
                                    <div key={i} className="min-w-full h-full flex items-center justify-center flex-shrink-0 px-2 lg:px-16">
                                        <img
                                            src={img}
                                            alt={`${car.make} ${car.model}`}
                                            className="max-w-full max-h-full object-contain pointer-events-none drop-shadow-2xl"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                        {!car.images || car.images.length <= 1 && (
                            <img
                                src={activeImage}
                                alt={`${car.make} ${car.model}`}
                                className="max-w-full max-h-[80vh] object-contain drop-shadow-2xl"
                            />
                        )}

                        {/* Desktop Side Navigation Arrows */}
                        {car.images && car.images.length > 1 && (
                            <>
                                <button
                                    onClick={prevLightboxImage}
                                    className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white bg-black/20 hover:bg-black/50 rounded-full backdrop-blur-md transition-all z-10 hover:scale-110 active:scale-95"
                                >
                                    <ChevronLeft size={36} />
                                </button>
                                <button
                                    onClick={nextLightboxImage}
                                    className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white bg-black/20 hover:bg-black/50 rounded-full backdrop-blur-md transition-all z-10 hover:scale-110 active:scale-95"
                                >
                                    <ChevronRight size={36} />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Bottom Thumbnail Strip */}
                    {car.images && car.images.length > 1 && (
                        <div className="w-full pb-6 pt-4 px-4 flex justify-center gap-2 overflow-x-auto">
                            {car.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => { e.stopPropagation(); setActiveImageIndex(idx); }}
                                    className={`relative flex-shrink-0 h-16 w-24 rounded-lg overflow-hidden border-2 transition-all duration-300 ${activeImageIndex === idx ? 'border-white scale-110 z-10 shadow-lg shadow-white/20' : 'border-transparent opacity-40 hover:opacity-100'} bg-black`}
                                >
                                    <img src={img} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <div className="pt-24 pb-12 px-4 flex-1">
                <div className="max-w-5xl mx-auto">
                    {/* Back */}
                    <Link to={`/${lang}`} className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 mb-6 transition-colors">
                        <ArrowLeft size={18} />
                        {t('car_details.back')}
                    </Link>

                    {/* Card */}
                    <div className="glass-panel rounded-2xl overflow-hidden">
                        <div className="grid md:grid-cols-2">
                            {/* Image */}
                            <div className="flex flex-col">
                                <div
                                    className="aspect-[4/3] overflow-hidden relative cursor-pointer group"
                                    onClick={() => setIsLightboxOpen(true)}
                                    onTouchStart={(e) => {
                                        onTouchStart(e)
                                    }}
                                    onTouchMove={(e) => {
                                        onTouchMove(e)
                                    }}
                                    onTouchEnd={(e) => {
                                        if (Math.abs(swipeOffset) >= 10 && e.cancelable) {
                                            e.preventDefault()
                                        }
                                        onTouchEndEvent()
                                    }}
                                >
                                    {car.images && car.images.length > 1 ? (
                                        <div
                                            className="flex w-full h-full"
                                            style={{
                                                transform: `translateX(calc(-${activeImageIndex * 100}% + ${swipeOffset}px))`,
                                                transition: touchStart ? 'none' : 'transform 0.3s ease-out'
                                            }}
                                        >
                                            {car.images.map((img, i) => (
                                                <div key={i} className="min-w-full h-full flex-shrink-0">
                                                    <img
                                                        src={img}
                                                        alt={`${car.make} ${car.model}`}
                                                        className="w-full h-full object-cover pointer-events-none group-hover:scale-105 transition-transform duration-700"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <img
                                            src={activeImage}
                                            alt={`${car.make} ${car.model}`}
                                            className="w-full h-full object-cover pointer-events-none group-hover:scale-105 transition-transform duration-700"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                                        <span className="opacity-0 group-hover:opacity-100 bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-md transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 text-sm font-medium">
                                            Click to enlarge
                                        </span>
                                    </div>
                                </div>
                                {car.images && car.images.length > 1 && (
                                    <div className="flex gap-2 p-4 bg-slate-50/50 justify-center">
                                        {car.images.map((img, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setActiveImageIndex(idx)}
                                                className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${activeImageIndex === idx ? 'border-blue-600 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                            >
                                                <img src={img} className="w-full h-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="p-6 md:p-8">
                                <span className={`inline-block ${type.color} text-white text-xs font-medium px-3 py-1 rounded-full mb-4`}>
                                    {type.label}
                                </span>

                                <h1 className="text-3xl font-bold mb-1">{car.make} {car.model}</h1>
                                <p className="text-slate-500 mb-4">{car.year}</p>

                                <p className="text-slate-600 mb-6">{localizedDescription}</p>

                                {/* Specs */}
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                                        <Activity className="text-blue-600 mb-1" size={18} />
                                        <p className="text-slate-500 text-xs">{t('car.engine')}</p>
                                        <p className="font-medium text-slate-900">{car.specs.engine}</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                                        <Gauge className="text-blue-600 mb-1" size={18} />
                                        <p className="text-slate-500 text-xs">{t('car.power')}</p>
                                        <p className="font-medium text-slate-900">{car.specs.power}</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                                        <Settings className="text-blue-600 mb-1" size={18} />
                                        <p className="text-slate-500 text-xs">{t('car.transmission')}</p>
                                        <p className="font-medium text-slate-900">{typeof car.specs.transmission === 'object' ? (car.specs.transmission[lang] || car.specs.transmission.en) : car.specs.transmission}</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                                        <Users className="text-blue-600 mb-1" size={18} />
                                        <p className="text-slate-500 text-xs">{t('car.seats')}</p>
                                        <p className="font-medium text-slate-900">{car.specs.seats}</p>
                                    </div>
                                </div>

                                {/* Price & CTA */}
                                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                    <div>
                                        <span className="text-2xl font-bold text-slate-900">${car.price}</span>
                                        <span className="text-slate-500 text-sm">/{t('car.day')}</span>
                                    </div>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-blue-200">
                                        {t('car.reserve')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

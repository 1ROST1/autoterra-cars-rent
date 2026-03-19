import { useParams, Link, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ArrowRight, Activity, Users, Gauge, Settings, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getCarBySlug, getCarStartingRate } from '../data/cars'
import { useLanguage } from '../hooks/useLanguage'
import SEO from '../components/SEO'
import { SITE_URL, PAGE_KEYWORDS } from '../constants/seo'
import { BUSINESS_PHONE_RAW } from '../constants/contact'

export default function CarDetails() {
    const { slug } = useParams()
    const { t } = useTranslation()
    const { lang } = useLanguage()

    const car = getCarBySlug(slug)
    const [activeImageIndex, setActiveImageIndex] = useState(0)

    // Lightbox State
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)

    // Swipe Handling
    const [touchStart, setTouchStart] = useState({ x: null, y: null })
    const [touchEnd, setTouchEnd] = useState({ x: null, y: null })
    const [swipeOffset, setSwipeOffset] = useState({ x: 0, y: 0 })
    const minSwipeDistance = 50

    useEffect(() => {
        if (car) {
            setActiveImageIndex(0)
            setIsLightboxOpen(false)
            setTouchStart({ x: null, y: null })
            setTouchEnd({ x: null, y: null })
            setSwipeOffset({ x: 0, y: 0 })
        }
    }, [car])

    useEffect(() => {
        setSwipeOffset({ x: 0, y: 0 })
    }, [activeImageIndex])

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

    const onTouchStart = (e) => {
        setTouchEnd({ x: null, y: null })
        setTouchStart({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY })
        setSwipeOffset({ x: 0, y: 0 })
    }

    const onTouchMove = (e) => {
        if (touchStart.x === null || touchStart.y === null) return

        const currentX = e.targetTouches[0].clientX
        const currentY = e.targetTouches[0].clientY
        setTouchEnd({ x: currentX, y: currentY })

        const diffX = currentX - touchStart.x
        const diffY = currentY - touchStart.y

        // Calculate absolute distances
        const absDiffX = Math.abs(diffX)
        const absDiffY = Math.abs(diffY)

        // Lock onto an axis once we have moved at least 5 pixels
        // If we haven't locked yet, just wait until we reach the threshold
        if (absDiffX > 5 || absDiffY > 5) {
            // If already set to scroll X or Y, keep to that axis
            if (swipeOffset.y === 0 && absDiffX > absDiffY) {
                setSwipeOffset(prev => ({ ...prev, x: diffX, y: 0 }))
            } else if (swipeOffset.x === 0 && absDiffY > absDiffX) {
                setSwipeOffset(prev => ({ ...prev, x: 0, y: diffY }))
            } else {
                // If neither is locked yet, do nothing until the next tick to lock it safely
                if (absDiffX > absDiffY) {
                    setSwipeOffset(prev => ({ ...prev, x: diffX, y: 0 }))
                } else {
                    setSwipeOffset(prev => ({ ...prev, x: 0, y: diffY }))
                }
            }
        }
    }

    const onTouchEndEvent = () => {
        if (touchStart.x === null || touchEnd.x === null) {
            setTouchStart({ x: null, y: null })
            setTouchEnd({ x: null, y: null })
            setSwipeOffset({ x: 0, y: 0 })
            return
        }

        const distanceX = touchStart.x - touchEnd.x
        const distanceY = touchStart.y - touchEnd.y

        const isLeftSwipe = distanceX > minSwipeDistance
        const isRightSwipe = distanceX < -minSwipeDistance
        const isVerticalSwipe = Math.abs(distanceY) > minSwipeDistance * 1.5

        // Strictly check which axis was locked during swipe
        if (swipeOffset.y !== 0 && isVerticalSwipe) {
            setIsLightboxOpen(false)
        } else if (swipeOffset.x !== 0 && (isLeftSwipe || isRightSwipe)) {
            if (car.images && car.images.length > 1) {
                if (isLeftSwipe) {
                    setActiveImageIndex(prev => (prev === car.images.length - 1 ? 0 : prev + 1))
                }
                if (isRightSwipe) {
                    setActiveImageIndex(prev => (prev === 0 ? car.images.length - 1 : prev - 1))
                }
            }
        }

        setTouchStart({ x: null, y: null })
        setTouchEnd({ x: null, y: null })
        setSwipeOffset({ x: 0, y: 0 })
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
        return <Navigate to={`/${lang}/404/`} replace />
    }

    const typeLabels = {
        petrol: { label: t('filters.petrol'), color: 'bg-amber-500' },
        diesel: { label: t('filters.diesel'), color: 'bg-slate-500' },
        hybrid: { label: t('filters.hybrid'), color: 'bg-green-500' }
    }

    const type = typeLabels[car.type] || typeLabels.petrol // Fallback to avoid crash
    const localizedDescription = car.description[lang] || car.description.ro
    const localizedCarUrl = `${SITE_URL}/${lang}/car/${car.slug}/`
    const carPageTitle = t('car.seo_title', { make: car.make, model: car.model })
    const { key: startingRateKey, price: startingPrice } = getCarStartingRate(car)
    const startingRateNote = startingRateKey ? t(`car.starting_rate_note.${startingRateKey}`) : t('car.price_per_day')
    const imageCount = car.images?.length || 1
    const slideWidth = 100 / imageCount
    const slideOffset = activeImageIndex * slideWidth

    // Safety check
    const activeImage = car.images ? car.images[activeImageIndex] : car.image
    const carImageUrls = (car.images?.length ? car.images : [car.image])
        .filter(Boolean)
        .map(imagePath => imagePath.startsWith('http') ? imagePath : `${SITE_URL}${imagePath}`)

    const carStructuredData = [
        {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: carPageTitle,
            description: localizedDescription,
            url: localizedCarUrl,
            inLanguage: lang,
            image: carImageUrls
        },
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: t('nav.home'),
                    item: `${SITE_URL}/${lang}/`
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: `${car.make} ${car.model}`,
                    item: localizedCarUrl
                }
            ]
        }
    ]

    const carKeywords = `${car.make} ${car.model}, ${PAGE_KEYWORDS.carDetails[lang] || PAGE_KEYWORDS.carDetails.ru}, ${car.make} ${car.year}`

    return (
        <div className="min-h-screen text-slate-900 relative z-10 flex flex-col">
            <SEO
                title={carPageTitle}
                description={t('car.seo_description', {
                    make: car.make,
                    model: car.model,
                    price: startingPrice,
                    power: car.specs.power,
                    transmission: typeof car.specs.transmission === 'object' ? (car.specs.transmission[lang] || car.specs.transmission.en) : car.specs.transmission,
                    seats: car.specs.seats
                })}
                keywords={carKeywords}
                image={activeImage}
                preloadImage
                structuredData={carStructuredData}
                absoluteTitle
            />
            <Header />

            {/* LIGHTBOX MODAL */}
            {isLightboxOpen && (
                <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm select-none touch-none">
                    {/* Top Controls */}
                    <div className="absolute top-0 right-0 p-4 md:p-6 flex justify-end w-full z-20 pointer-events-none">
                        <button
                            onClick={() => setIsLightboxOpen(false)}
                            className="p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-md transition-all pointer-events-auto active:scale-90"
                        >
                            <X size={28} />
                        </button>
                    </div>

                    {/* Main Lightbox Image View */}
                    <div
                        className="relative w-full max-w-7xl mx-auto flex-1 flex items-center overflow-hidden"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEndEvent}
                        onClick={(e) => {
                            // Only close if clicking exactly on this container (the background), not on arrows or images
                            if (e.target === e.currentTarget) {
                                setIsLightboxOpen(false);
                            }
                        }}
                    >
                        {car.images && car.images.length > 1 ? (
                            <div
                                className="flex h-full items-center cursor-ew-resize flex-shrink-0"
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    width: `${imageCount * 100}%`,
                                    transform: `translate(calc(-${slideOffset}% + ${swipeOffset.x}px), ${swipeOffset.y}px)`,
                                    transition: touchStart.x ? 'none' : 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
                                }}
                            >
                                {car.images.map((img, i) => (
                                    <div
                                        key={i}
                                        className="h-full flex items-center justify-center flex-shrink-0 p-2 sm:p-4 lg:p-8"
                                        style={{ width: `${slideWidth}%` }}
                                    >
                                        <img
                                            src={img}
                                            alt={t('car.alt_detail', { make: car.make, model: car.model })}
                                            className={`max-w-full max-h-full object-contain pointer-events-none ${activeImageIndex === i ? '' : 'opacity-80 scale-95'} transition-all duration-300 md:drop-shadow-2xl`}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center p-2 sm:p-4 lg:p-8 cursor-default"
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    transform: `translate(${swipeOffset.x}px, ${swipeOffset.y}px)`,
                                    transition: touchStart.x ? 'none' : 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
                                }}
                            >
                                <img
                                    src={activeImage}
                                    alt={t('car.alt_detail', { make: car.make, model: car.model })}
                                    className="max-w-full max-h-full object-contain pointer-events-none md:drop-shadow-2xl"
                                />
                            </div>
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
                        <div className="w-full pb-8 pt-4 px-4 flex justify-center gap-3 overflow-x-auto z-20">
                            {car.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => { e.stopPropagation(); setActiveImageIndex(idx); }}
                                    className={`relative flex-shrink-0 h-16 w-24 sm:h-20 sm:w-28 rounded-xl overflow-hidden border-2 transition-all duration-300 ${activeImageIndex === idx ? 'border-white scale-105 z-10 shadow-lg shadow-white/20' : 'border-transparent opacity-50 hover:opacity-100'} bg-black`}
                                >
                                    <img src={img} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <div className="page-offset-24 pb-12 px-4 flex-1">
                <div className="max-w-5xl mx-auto">
                    {/* Back */}
                    <Link to={`/${lang}/`} className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 mb-6 transition-colors">
                        <ArrowLeft size={18} />
                        {t('car_details.back')}
                    </Link>

                    {/* Card */}
                    <div className="glass-card rounded-2xl overflow-hidden">
                        <div className="grid md:grid-cols-2">
                            {/* Image */}
                            <div className="flex flex-col min-w-0">
                                <div
                                    className="aspect-[4/3] overflow-hidden relative cursor-pointer group bg-slate-100/60"
                                    onClick={() => setIsLightboxOpen(true)}
                                    onTouchStart={onTouchStart}
                                    onTouchMove={onTouchMove}
                                    onTouchEnd={onTouchEndEvent}
                                    onTouchCancel={onTouchEndEvent}
                                >
                                    {car.images && car.images.length > 1 ? (
                                        <div
                                            className="flex h-full overflow-hidden"
                                            style={{
                                                width: `${imageCount * 100}%`,
                                                transform: `translate3d(calc(-${slideOffset}% + ${swipeOffset.x}px), 0, 0)`,
                                                transition: touchStart.x === null ? 'transform 0.3s ease-out' : 'none'
                                            }}
                                        >
                                            {car.images.map((img, i) => (
                                                <div
                                                    key={i}
                                                    className="h-full flex-shrink-0 flex items-center justify-center"
                                                    style={{ width: `${slideWidth}%` }}
                                                >
                                                    <img
                                                        src={img}
                                                        alt={t('car.alt_detail', { make: car.make, model: car.model })}
                                                        className="w-full h-full object-contain pointer-events-none group-hover:scale-105 transition-transform duration-700"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <img
                                            src={activeImage}
                                            alt={t('car.alt_detail', { make: car.make, model: car.model })}
                                            className="w-full h-full object-contain pointer-events-none group-hover:scale-105 transition-transform duration-700"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                                        <span className="opacity-0 group-hover:opacity-100 bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-md transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 text-sm font-medium">
                                            {t('car_details.click_to_enlarge')}
                                        </span>
                                    </div>
                                </div>
                                {car.images && car.images.length > 1 && (
                                    <div className="flex gap-2 p-4 bg-slate-50/50 justify-start sm:justify-center overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                        {car.images.map((img, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setActiveImageIndex(idx)}
                                                className={`w-16 h-12 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${activeImageIndex === idx ? 'border-blue-600 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                            >
                                                <img src={img} className="w-full h-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="p-6 md:p-8 min-w-0">
                                <span className={`inline-block ${type.color} text-white text-xs font-medium px-3 py-1 rounded-full mb-4`}>
                                    {type.label}
                                </span>

                                <h1 className="text-3xl font-bold mb-1">{car.make} {car.model}</h1>
                                <p className="text-slate-500 mb-4">{car.year}</p>

                                <p className="text-slate-600 mb-6">{localizedDescription}</p>

                                {/* Specs */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 w-full max-w-full overflow-hidden isolate bg-slate-100 border border-slate-200/60 rounded-2xl p-4 shadow-sm">
                                    <div className="flex flex-col">
                                        <Activity className="text-blue-600 mb-1.5" size={20} />
                                        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-0.5">{t('car.engine')}</p>
                                        <p className="font-semibold text-slate-900 text-sm">{typeof car.specs.engine === 'object' ? (car.specs.engine[lang] || car.specs.engine.en) : car.specs.engine}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <Gauge className="text-blue-600 mb-1.5" size={20} />
                                        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-0.5">{t('car.power')}</p>
                                        <p className="font-semibold text-slate-900 text-sm">{car.specs.power}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <Settings className="text-blue-600 mb-1.5" size={20} />
                                        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-0.5">{t('car.transmission')}</p>
                                        <p className="font-semibold text-slate-900 text-sm">{typeof car.specs.transmission === 'object' ? (car.specs.transmission[lang] || car.specs.transmission.en) : car.specs.transmission}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <Users className="text-blue-600 mb-1.5" size={20} />
                                        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-0.5">{t('car.seats')}</p>
                                        <p className="font-semibold text-slate-900 text-sm">{car.specs.seats}</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Unified Clean Pricing Segmented Table */}
                        <div className="border-t border-slate-100 bg-white/90 backdrop-blur-2xl rounded-b-2xl overflow-hidden">
                            {/* CTA Header Line */}
                            <div className="px-5 py-6 sm:px-8 sm:py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-100 bg-slate-50/50">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-blue-700 rounded-full"></span>
                                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{t('car.pricing.title')}</h2>
                                    </div>
                                    <p className="text-slate-500 text-sm sm:text-[15px]">{startingRateNote}</p>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full md:w-auto">
                                    <div className="flex flex-col w-full sm:w-auto text-left sm:text-right">
                                        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-0.5 sm:mb-1">{t('car.price_per_day')}</span>
                                        <div className="flex items-end gap-2 justify-start sm:justify-end">
                                            <span className="text-[13px] sm:text-sm font-semibold text-slate-500 pb-1 sm:pb-1.5">{t('car.from')}</span>
                                            <span className="text-4xl sm:text-5xl font-black text-slate-900 leading-none tracking-tight">{startingPrice}€</span>
                                        </div>
                                    </div>
                                    <a href={`tel:${BUSINESS_PHONE_RAW}`} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-xl hover:shadow-blue-600/20 active:scale-95">
                                        {t('car.reserve')}
                                        <ArrowRight size={18} />
                                    </a>
                                </div>
                            </div>

                            {/* Mobile Swipe Hint */}
                            <div className="flex md:hidden items-center justify-end px-5 pt-3 pb-1 bg-white border-b border-slate-50">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-1">
                                    Листайте тарифы
                                    <ArrowRight size={12} className="animate-pulse" />
                                </span>
                            </div>

                            {/* Rates Segmented Timeline */}
                            <div className="relative">
                                {/* Gradient fade on the right side for mobile to indicate scrollable content */}
                                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 md:hidden"></div>

                                <div className="flex flex-nowrap overflow-x-auto touch-pan-x snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] divide-x divide-slate-100">
                                    {Object.entries(car.rates || {}).map(([key, value], idx) => {
                                        const isBase = idx === 0;
                                        const discount = !isBase && value ? Math.round((1 - value / car.rates.days_1) * 100) : 0;

                                        return (
                                            <div
                                                key={key}
                                                // min-w-[42vw] ensures exactly ~2.3 items are visible on standard phones, creating a natural vertical cut-off
                                                className={`snap-start min-w-[42vw] sm:min-w-0 sm:flex-1 p-5 sm:p-6 md:p-8 flex flex-col justify-between transition-colors hover:bg-slate-50/50 cursor-default ${isBase ? 'bg-blue-50/40' : 'bg-white'}`}
                                            >
                                                <div className="mb-6 sm:mb-8">
                                                    <span className={`text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest ${isBase ? 'text-blue-600' : 'text-slate-400'}`}>
                                                        {t(`car.pricing.${key}`)}
                                                    </span>
                                                </div>

                                                <div className="flex flex-col">
                                                    <div className="flex items-baseline gap-1 mb-2 sm:mb-3">
                                                        <span className={`text-2xl sm:text-3xl font-black tracking-tight ${isBase ? 'text-blue-900' : 'text-slate-900'}`}>
                                                            {value ? `${value}€` : t('car.pricing.negotiable')}
                                                        </span>
                                                        {value && <span className="text-[11px] sm:text-xs font-medium text-slate-400">/{t('car.day')}</span>}
                                                    </div>

                                                    <div className="h-6 flex items-center">
                                                        {!isBase && discount > 0 ? (
                                                            <span className="inline-flex items-center px-2 py-1 rounded bg-emerald-50 text-emerald-600 text-[10px] sm:text-[11px] font-bold border border-emerald-100/50">
                                                                -{discount}%
                                                            </span>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
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

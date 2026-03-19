export const SITE_NAME = 'AutoTerra'
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://autoterra.md').replace(/\/+$/, '')
export const DEFAULT_OG_IMAGE = '/logo2.png'

// SEO keywords по страницам и языкам
export const PAGE_KEYWORDS = {
    home: {
        ru: 'аренда авто Молдова, прокат авто Кишинёв, аренда машин, rent a car Moldova, аренда BMW, аренда Mercedes, аренда VW, авто в аренду Кишинёв',
        ro: 'chirie auto Moldova, chirie mașini Chișinău, rent a car Moldova, închiriere auto, mașini de închiriat Chișinău',
        en: 'car rental Moldova, rent a car Chisinau, car hire Moldova, cheap car rental Chisinau, premium car rental Moldova'
    },
    about: {
        ru: 'об AutoTerra, аренда авто Молдова, прокат авто компания, автопрокат Кишинёв',
        ro: 'despre AutoTerra, chirie auto Moldova, companie închiriere auto Chișinău',
        en: 'about AutoTerra, car rental company Moldova, Chisinau car hire service'
    },
    contact: {
        ru: 'контакты AutoTerra, телефон аренда авто, адрес прокат Кишинёв',
        ro: 'contacte AutoTerra, telefon chirie auto, adresa Chișinău',
        en: 'contact AutoTerra, phone car rental, address Chisinau car hire'
    },
    carDetails: {
        ru: 'аренда, прокат, Кишинёв, Молдова, цена, бронировать',
        ro: 'chirie, închiriere, Chișinău, Moldova, preț, rezervare',
        en: 'rental, hire, Chisinau, Moldova, price, book'
    }
}

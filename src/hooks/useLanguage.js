import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants/languages'

export function useLanguage() {
    const { lang } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const { i18n } = useTranslation()

    const currentLang = SUPPORTED_LANGUAGES.includes(lang) ? lang : DEFAULT_LANGUAGE

    const switchLanguage = (newLang) => {
        if (!SUPPORTED_LANGUAGES.includes(newLang)) return

        // Replace current language in path with new language
        const pathWithoutLang = location.pathname.replace(`/${currentLang}`, '') || ''
        const newPath = `/${newLang}${pathWithoutLang}`

        i18n.changeLanguage(newLang)
        navigate(newPath)
    }

    // Create link with current language
    const createLink = (path) => {
        const cleanPath = path.startsWith('/') ? path.slice(1) : path
        return `/${currentLang}/${cleanPath}`.replace(/\/+$/, '') || `/${currentLang}`
    }

    return {
        lang: currentLang,
        switchLanguage,
        createLink,
        isRo: currentLang === 'ro',
        isRu: currentLang === 'ru',
        isEn: currentLang === 'en'
    }
}

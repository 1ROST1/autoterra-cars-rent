import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants/languages'

const normalizePathSuffix = (value = '') => {
    if (!value) return ''

    const normalized = `/${String(value).replace(/^\/+|\/+$/g, '')}`.replace(/\/{2,}/g, '/')
    return normalized === '/' ? '' : normalized
}

export function useLanguage() {
    const { lang } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const { i18n } = useTranslation()

    const currentLang = SUPPORTED_LANGUAGES.includes(lang) ? lang : DEFAULT_LANGUAGE

    const switchLanguage = (newLang) => {
        if (!SUPPORTED_LANGUAGES.includes(newLang)) return

        const pathWithoutLang = location.pathname.replace(new RegExp(`^/${currentLang}(?=/|$)`), '')
        const normalizedSuffix = normalizePathSuffix(pathWithoutLang)
        const newPath = normalizedSuffix ? `/${newLang}${normalizedSuffix}/` : `/${newLang}/`

        i18n.changeLanguage(newLang)
        navigate(`${newPath}${location.search}${location.hash}`)
    }

    const createLink = (path = '') => {
        const normalizedSuffix = normalizePathSuffix(path)
        return normalizedSuffix ? `/${currentLang}${normalizedSuffix}/` : `/${currentLang}/`
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

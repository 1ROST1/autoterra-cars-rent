import { useEffect, useLayoutEffect } from 'react'
import { useParams, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants/languages'

export default function LanguageRouter() {
    const { lang } = useParams()
    const { i18n } = useTranslation()
    const location = useLocation()

    if (!lang || !SUPPORTED_LANGUAGES.includes(lang)) {
        return <Navigate to={`/${DEFAULT_LANGUAGE}/404/`} replace />
    }

    // Sync i18n with URL language
    useEffect(() => {
        if (i18n.language !== lang) {
            i18n.changeLanguage(lang)
        }
    }, [lang, i18n])

    useLayoutEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }, [location.pathname])

    return <Outlet />
}

export { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE }

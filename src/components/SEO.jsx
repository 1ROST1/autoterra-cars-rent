import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import { DEFAULT_LANGUAGE, OG_LOCALES, SUPPORTED_LANGUAGES } from '../constants/languages'
import { SITE_NAME, SITE_URL } from '../constants/seo'

const toAbsoluteUrl = (value = '') => {
    if (!value) return SITE_URL
    if (/^https?:\/\//i.test(value)) return value
    return `${SITE_URL}${value.startsWith('/') ? value : `/${value}`}`
}

const buildLocalizedPath = (lang, routeSuffix) => routeSuffix ? `/${lang}${routeSuffix}` : `/${lang}`

const LANG_PATH_REGEX = new RegExp(`^/(${SUPPORTED_LANGUAGES.join('|')})(?=/|$)`)

export default function SEO({ title, description, keywords, image, noindex = false, structuredData, canonicalPath, ogType = 'website' }) {
    const { t } = useTranslation()
    const { lang } = useLanguage()
    const location = useLocation()

    const siteTitle = t('hero.title') || SITE_NAME
    const pageDescription = description || t('hero.description')
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | ${siteTitle}`
    const routeSuffix = location.pathname.replace(LANG_PATH_REGEX, '') || ''
    const localizedPath = canonicalPath || buildLocalizedPath(lang, routeSuffix)
    const canonicalUrl = toAbsoluteUrl(localizedPath)
    const imageUrl = image ? toAbsoluteUrl(image) : null
    const robotsContent = noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'
    const currentLocale = OG_LOCALES[lang] || OG_LOCALES[DEFAULT_LANGUAGE]
    const alternateLocales = SUPPORTED_LANGUAGES
        .filter(languageCode => languageCode !== lang)
        .map(languageCode => OG_LOCALES[languageCode])
        .filter(Boolean)
    const languageAlternates = SUPPORTED_LANGUAGES.map(languageCode => ({
        languageCode,
        href: toAbsoluteUrl(buildLocalizedPath(languageCode, routeSuffix))
    }))
    const xDefaultHref = toAbsoluteUrl(buildLocalizedPath(DEFAULT_LANGUAGE, routeSuffix))

    const resolvedStructuredData = structuredData || {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        ...(SITE_URL ? { url: SITE_URL } : {}),
        inLanguage: SUPPORTED_LANGUAGES
    }

    return (
        <Helmet htmlAttributes={{ lang }}>
            {/* Standard metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={pageDescription} />
            <meta name="robots" content={robotsContent} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={canonicalUrl} />
            {languageAlternates.map(({ languageCode, href }) => (
                <link key={`alt-${languageCode}`} rel="alternate" hrefLang={languageCode} href={href} />
            ))}
            <link rel="alternate" hrefLang="x-default" href={xDefaultHref} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={pageDescription} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content={currentLocale} />
            {alternateLocales.map(locale => (
                <meta key={`og-locale-${locale}`} property="og:locale:alternate" content={locale} />
            ))}
            {imageUrl && <meta property="og:image" content={imageUrl} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={pageDescription} />
            {imageUrl && <meta name="twitter:image" content={imageUrl} />}

            {/* Structured Data */}
            {resolvedStructuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(resolvedStructuredData)}
                </script>
            )}
        </Helmet>
    )
}

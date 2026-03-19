import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import { DEFAULT_LANGUAGE, OG_LOCALES, SUPPORTED_LANGUAGES } from '../constants/languages'
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from '../constants/seo'

const PAGE_FILE_REGEX = /\/[^/?#]+\.[^/?#]+$/

const ensureTrailingSlash = (pathname = '/') => {
    if (!pathname || pathname === '/' || PAGE_FILE_REGEX.test(pathname)) return pathname || '/'
    return pathname.endsWith('/') ? pathname : `${pathname}/`
}

const toAbsolutePageUrl = (value = '') => {
    const url = new URL(value || '/', `${SITE_URL}/`)
    url.pathname = ensureTrailingSlash(url.pathname)
    return url.toString()
}

const toAbsoluteAssetUrl = (value = '') => {
    if (!value) return SITE_URL
    if (/^https?:\/\//i.test(value)) return value
    return `${SITE_URL}${value.startsWith('/') ? value : `/${value}`}`
}

const normalizePathSuffix = (value = '') => {
    if (!value) return ''

    const normalized = `/${String(value).replace(/^\/+|\/+$/g, '')}`.replace(/\/{2,}/g, '/')
    return normalized === '/' ? '' : normalized
}

const normalizeRelativePath = (value = '') => {
    const normalized = normalizePathSuffix(value)
    return normalized ? `${normalized}/` : '/'
}

const buildLocalizedPath = (lang, routeSuffix = '') => {
    const normalizedRouteSuffix = normalizePathSuffix(routeSuffix)
    return normalizedRouteSuffix ? `/${lang}${normalizedRouteSuffix}/` : `/${lang}/`
}

const LANG_PATH_REGEX = new RegExp(`^/(${SUPPORTED_LANGUAGES.join('|')})(?=/|$)`)

export default function SEO({ title, description, keywords, image, noindex = false, structuredData, canonicalPath, ogType = 'website', preloadImage = false, absoluteTitle = false }) {
    const { t } = useTranslation()
    const { lang } = useLanguage()
    const location = useLocation()

    const siteTitle = t('hero.title') || SITE_NAME
    const pageDescription = description || t('hero.description')
    const fullTitle = title ? (absoluteTitle ? title : `${title} | ${SITE_NAME}`) : `${SITE_NAME} | ${siteTitle}`
    const routeSuffix = normalizePathSuffix(location.pathname.replace(LANG_PATH_REGEX, ''))
    const localizedPath = canonicalPath ? normalizeRelativePath(canonicalPath) : buildLocalizedPath(lang, routeSuffix)
    const canonicalUrl = toAbsolutePageUrl(localizedPath)
    const imageUrl = image ? toAbsoluteAssetUrl(image) : toAbsoluteAssetUrl(DEFAULT_OG_IMAGE)
    const preloadImageUrl = preloadImage ? imageUrl : null
    const robotsContent = noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'
    const currentLocale = OG_LOCALES[lang] || OG_LOCALES[DEFAULT_LANGUAGE]
    const alternateLocales = SUPPORTED_LANGUAGES
        .filter(languageCode => languageCode !== lang)
        .map(languageCode => OG_LOCALES[languageCode])
        .filter(Boolean)
    const languageAlternates = SUPPORTED_LANGUAGES.map(languageCode => ({
        languageCode,
        href: toAbsolutePageUrl(buildLocalizedPath(languageCode, routeSuffix))
    }))
    const xDefaultHref = toAbsolutePageUrl(buildLocalizedPath(DEFAULT_LANGUAGE, routeSuffix))

    const resolvedStructuredData = structuredData || {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        ...(canonicalUrl ? { url: canonicalUrl } : {}),
        inLanguage: SUPPORTED_LANGUAGES
    }

    const structuredDataItems = Array.isArray(resolvedStructuredData) ? resolvedStructuredData : [resolvedStructuredData]

    return (
        <Helmet htmlAttributes={{ lang }}>
            {/* Standard metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={pageDescription} />
            <meta name="robots" content={robotsContent} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={canonicalUrl} />
            {preloadImageUrl && <link rel="preload" as="image" href={preloadImageUrl} />}
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
            {structuredDataItems.map((data, idx) => (
                <script key={`sd-${idx}`} type="application/ld+json">
                    {JSON.stringify(data)}
                </script>
            ))}
        </Helmet>
    )
}

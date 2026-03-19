import fs from 'node:fs'
import path from 'node:path'
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, buildLocalizedPath, getAllRouteSuffixes } from './route-manifest.mjs'

const SITE_URL = (process.env.SITE_URL || 'https://autoterra.md').replace(/\/+$/, '')
const HAS_SITE_URL = Boolean(SITE_URL)
const ROOT_DIR = process.cwd()
const PUBLIC_DIR = path.join(ROOT_DIR, 'public')
const allRouteSuffixes = getAllRouteSuffixes(ROOT_DIR)
const escapeXml = (value) =>
    value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')

const now = new Date().toISOString().split('T')[0]

const withOptionalDomain = (pathValue) => HAS_SITE_URL ? `${SITE_URL}${pathValue}` : pathValue

const createUrlEntry = (lang, routeSuffix) => {
    const routePath = buildLocalizedPath(lang, routeSuffix)
    const loc = withOptionalDomain(routePath)
    const changefreq = routeSuffix.startsWith('/car/') ? 'weekly' : 'daily'
    const priority = routeSuffix === '' ? '1.0' : routeSuffix.startsWith('/car/') ? '0.7' : '0.8'
    const alternates = SUPPORTED_LANGUAGES.map(languageCode => {
        const href = withOptionalDomain(buildLocalizedPath(languageCode, routeSuffix))
        return `    <xhtml:link rel="alternate" hreflang="${languageCode}" href="${escapeXml(href)}" />`
    }).join('\n')
    const xDefault = withOptionalDomain(buildLocalizedPath(DEFAULT_LANGUAGE, routeSuffix))

    return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(xDefault)}" />
  </url>`
}

const sitemapEntries = allRouteSuffixes.flatMap(routeSuffix =>
    SUPPORTED_LANGUAGES.map(lang => createUrlEntry(lang, routeSuffix))
)

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapEntries.join('\n')}
</urlset>
`

const robotsTxt = `User-agent: *
Allow: /
${HAS_SITE_URL ? `\nSitemap: ${SITE_URL}/sitemap.xml` : '\n# Add SITE_URL to generate absolute sitemap URLs'}
`

fs.mkdirSync(PUBLIC_DIR, { recursive: true })
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapXml, 'utf8')
fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robotsTxt, 'utf8')

console.log('Generated SEO files:')
console.log(`- ${path.join(PUBLIC_DIR, 'sitemap.xml')}`)
console.log(`- ${path.join(PUBLIC_DIR, 'robots.txt')}`)

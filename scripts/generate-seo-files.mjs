import fs from 'node:fs'
import path from 'node:path'

const SITE_URL = (process.env.SITE_URL || '').replace(/\/+$/, '')
const HAS_SITE_URL = Boolean(SITE_URL)
const DEFAULT_LANGUAGE = 'ru'
const SUPPORTED_LANGUAGES = ['ro', 'ru', 'en']
const ROOT_DIR = process.cwd()
const PUBLIC_DIR = path.join(ROOT_DIR, 'public')

const staticRoutes = ['', '/about', '/contact', '/privacy']

const modelGroups = [
    ['BMW X5', 'Mercedes C-Class', 'Toyota Camry', 'Range Rover Sport', 'Audi Q8'],
    ['Toyota Prius', 'Lexus RX', 'Honda CR-V', 'Volvo XC90 Recharge', 'BMW 330e'],
    ['Tesla Model 3', 'Porsche Taycan', 'Audi e-tron', 'Hyundai Ioniq 5', 'Mercedes EQS']
]

const generateSlug = (name, year) => `${name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-${year}`

const carRoutes = Array.from({ length: 15 }, (_, index) => {
    const modelName = modelGroups[index % 3][index % 5]
    const year = 2023 + (index % 2)
    const slug = generateSlug(modelName, year)
    return `/car/${slug}`
})

const allRouteSuffixes = [...new Set([...staticRoutes, ...carRoutes])]

const buildPath = (lang, routeSuffix) => (routeSuffix ? `/${lang}${routeSuffix}` : `/${lang}`)
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
    const routePath = buildPath(lang, routeSuffix)
    const loc = withOptionalDomain(routePath)
    const changefreq = routeSuffix.startsWith('/car/') ? 'weekly' : 'daily'
    const priority = routeSuffix === '' ? '1.0' : routeSuffix.startsWith('/car/') ? '0.7' : '0.8'
    const alternates = SUPPORTED_LANGUAGES.map(languageCode => {
        const href = withOptionalDomain(buildPath(languageCode, routeSuffix))
        return `    <xhtml:link rel="alternate" hreflang="${languageCode}" href="${escapeXml(href)}" />`
    }).join('\n')
    const xDefault = withOptionalDomain(buildPath(DEFAULT_LANGUAGE, routeSuffix))

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

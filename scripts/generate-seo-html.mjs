import fs from 'node:fs'
import path from 'node:path'

const ROOT_DIR = process.cwd()
const DIST_DIR = path.join(ROOT_DIR, 'dist')
const SRC_CARS = path.join(ROOT_DIR, 'src', 'data', 'cars.js')

const LOCALE_RU = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'src', 'locales', 'ru.json'), 'utf8'))
const LOCALE_RO = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'src', 'locales', 'ro.json'), 'utf8'))
const LOCALE_EN = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'src', 'locales', 'en.json'), 'utf8'))

const locales = { ru: LOCALE_RU, ro: LOCALE_RO, en: LOCALE_EN }
const SUPPORTED_LANGUAGES = ['ro', 'ru', 'en']
const SITE_URL = (process.env.SITE_URL || 'https://arendavto.md').replace(/\/+$/, '')
const SITE_NAME = 'AutoRent'

const indexHtmlTemplate = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8')

const generateHtml = (urlPath, title, desc, img, structData, lang) => {
    let html = indexHtmlTemplate
    html = html.replace(/<html lang="[a-z]+">/i, `<html lang="${lang}">`)
    html = html.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`)
    html = html.replace(/<meta name="description" content=".*?">/i, `<meta name="description" content="${desc}">`)
    
    const ogTags = `
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${desc}">
    <meta property="og:image" content="${img}">
    <meta property="og:url" content="${SITE_URL}${urlPath}">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
    <script type="application/ld+json">${JSON.stringify(structData)}</script>
    `
    html = html.replace('</head>', `${ogTags}</head>`)
    
    // Default index.html handles routing via React.
    // For nested directories /ru/car/bmw-x5/ we write index.html inside
    const outPath = path.join(DIST_DIR, urlPath.substring(1))
    fs.mkdirSync(outPath, { recursive: true })
    fs.writeFileSync(path.join(outPath, 'index.html'), html)
}

// Manually parse car.js using Regex (since we cannot easily import it as node module here without babel/typescript)
const carsContent = fs.readFileSync(SRC_CARS, 'utf8')

// Try to extract cars data
const carRegex = /make:\s*['"](.*?)['"],\s*model:\s*['"](.*?)['"],\s*year:\s*(\d+),\s*.*?slug:\s*generateSlug\(['"](.*?)['"],\s*(\d+)\)/gs
let cars = []
// Simplified - we just need slugs to build basic pages, but to build good SEO descriptions we will just use generic ones or parse json
const slugRegex = /slug:\s*generateSlug\(['"]([^'"]+)['"],\s*(\d+)\).*?make:\s*['"]([^'"]+)['"],\s*model:\s*['"]([^'"]+)['"]/gs
let match
while ((match = slugRegex.exec(carsContent)) !== null) {
     const slugName = match[1].toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
     const year = parseInt(match[2])
     const slug = `${slugName}-${year}`
     cars.push({
         slug,
         make: match[3],
         model: match[4],
         year: year
     })
}

// Create static routes
SUPPORTED_LANGUAGES.forEach(lang => {
   const t = (key) => key.split('.').reduce((o, i) => o[i], locales[lang]) || key
   
   // Home 
   generateHtml(
       `/${lang}`,
       `${t('hero.title')} | ${SITE_NAME}`,
       t('hero.description'),
       `${SITE_URL}/vite.svg`, // default image
       {
        '@context': 'https://schema.org',
        '@type': 'AutoRental',
        name: SITE_NAME,
        url: SITE_URL,
        description: t('hero.description')
       },
       lang
   )
   
   // Cars
   cars.forEach(car => {
       const carTitle = `${car.make} ${car.model} | AutoRent`
       const carDesc = `${t('hero.title')} ${car.make} ${car.model} ${car.year}. ${t('hero.description')}`
       generateHtml(
           `/${lang}/car/${car.slug}`,
           carTitle,
           carDesc,
           `${SITE_URL}/vite.svg`, 
           {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: `${car.make} ${car.model} ${car.year}`,
            description: carDesc,
            url: `${SITE_URL}/${lang}/car/${car.slug}/`,
            inLanguage: lang
           },
           lang
       )
   })
})

console.log('Successfully generated SEO static HTML files!')

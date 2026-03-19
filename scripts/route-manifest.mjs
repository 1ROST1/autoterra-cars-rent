import fs from 'node:fs'
import path from 'node:path'

export const DEFAULT_LANGUAGE = 'ro'
export const SUPPORTED_LANGUAGES = ['ro', 'ru', 'en']

const STATIC_ROUTE_SUFFIXES = ['', '/about', '/contact', '/privacy']

const generateSlug = (name, year) => `${name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-${year}`

const normalizeRouteSuffix = (routeSuffix = '') => {
    if (!routeSuffix) return ''

    const normalized = `/${String(routeSuffix).replace(/^\/+|\/+$/g, '')}`.replace(/\/{2,}/g, '/')
    return normalized === '/' ? '' : normalized
}

export const buildLocalizedPath = (lang, routeSuffix = '') => {
    const normalizedRouteSuffix = normalizeRouteSuffix(routeSuffix)
    return normalizedRouteSuffix ? `/${lang}${normalizedRouteSuffix}/` : `/${lang}/`
}

export const getStaticRouteSuffixes = () => [...STATIC_ROUTE_SUFFIXES]

export const getCarRouteSuffixes = (rootDir = process.cwd()) => {
    const carsFilePath = path.join(rootDir, 'src', 'data', 'cars.js')
    const carsContent = fs.readFileSync(carsFilePath, 'utf8')
    const slugRegex = /slug:\s*generateSlug\(['"]([^'"]+)['"],\s*(\d+)\)/g
    const carRoutes = []

    let match
    while ((match = slugRegex.exec(carsContent)) !== null) {
        const slug = generateSlug(match[1], parseInt(match[2], 10))
        carRoutes.push(`/car/${slug}`)
    }

    return carRoutes
}

export const getAllRouteSuffixes = (rootDir = process.cwd()) => (
    [...new Set([...getStaticRouteSuffixes(), ...getCarRouteSuffixes(rootDir)])]
)

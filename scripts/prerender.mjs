import fs from 'node:fs'
import path from 'node:path'
import reactSnap from 'react-snap'
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, buildLocalizedPath, getAllRouteSuffixes } from './route-manifest.mjs'

const { run } = reactSnap
const systemChromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const puppeteerExecutablePath = process.env.PUPPETEER_EXECUTABLE_PATH || (
    fs.existsSync(systemChromePath) ? systemChromePath : undefined
)
const SITE_URL = (process.env.SITE_URL || 'https://autoterra.md').replace(/\/+$/, '')

const routeSuffixes = getAllRouteSuffixes()
const include = [
    ...SUPPORTED_LANGUAGES.flatMap(lang => routeSuffixes.map(routeSuffix => buildLocalizedPath(lang, routeSuffix))),
    ...SUPPORTED_LANGUAGES.map(lang => buildLocalizedPath(lang, '/404'))
]

const distDir = path.join(process.cwd(), 'dist')
const publicDir = path.join(process.cwd(), 'public')
const rootHtaccessSourcePath = path.join(publicDir, '.htaccess')
const staleEntries = ['200.html', ...SUPPORTED_LANGUAGES]

const buildRootRedirectHtml = (redirectPath) => `<!DOCTYPE html>
<html lang="${DEFAULT_LANGUAGE}">
  <head>
    <meta charset="UTF-8" />
    <meta name="robots" content="noindex, nofollow" />
    <meta http-equiv="refresh" content="0; url=${redirectPath}" />
    <link rel="canonical" href="${SITE_URL}${redirectPath}" />
    <title>Redirecting...</title>
    <script>
      (function () {
        var target = ${JSON.stringify(buildLocalizedPath(DEFAULT_LANGUAGE))};
        var destination = target + window.location.search + window.location.hash;
        window.location.replace(destination);
      })();
    </script>
  </head>
  <body>
    <p>Redirecting to <a href="${redirectPath}">${redirectPath}</a>.</p>
  </body>
</html>
`

const buildLocalized404Htaccess = (lang) => `ErrorDocument 404 /${lang}/404/index.html

<IfModule mod_rewrite.c>
RewriteEngine On
RewriteCond %{ENV:REDIRECT_STATUS} ^$
RewriteRule ^$ - [R=404,L]
</IfModule>
`

for (const entry of staleEntries) {
    const entryPath = path.join(distDir, entry)
    if (fs.existsSync(entryPath)) {
        fs.rmSync(entryPath, { recursive: true, force: true })
    }
}

await run({
    source: 'dist',
    include: [...new Set(include)],
    concurrency: 1,
    crawl: false,
    skipThirdPartyRequests: true,
    puppeteerArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
    puppeteerExecutablePath
})

const generatedFallbackPath = path.join(distDir, '200.html')
if (fs.existsSync(generatedFallbackPath)) {
    fs.rmSync(generatedFallbackPath, { recursive: true, force: true })
}

fs.writeFileSync(path.join(distDir, 'index.html'), buildRootRedirectHtml(buildLocalizedPath(DEFAULT_LANGUAGE)), 'utf8')

if (fs.existsSync(rootHtaccessSourcePath)) {
    fs.copyFileSync(rootHtaccessSourcePath, path.join(distDir, '.htaccess'))
}

for (const lang of SUPPORTED_LANGUAGES) {
    const localized404Dir = path.join(distDir, lang, '404')

    if (fs.existsSync(localized404Dir)) {
        fs.writeFileSync(path.join(localized404Dir, '.htaccess'), buildLocalized404Htaccess(lang), 'utf8')
    }
}

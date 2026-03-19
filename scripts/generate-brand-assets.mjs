import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const ROOT_DIR = process.cwd()
const SOURCE_LOGO = path.join(ROOT_DIR, 'src', 'assets', 'brand', 'logo.svg')
const PUBLIC_DIR = path.join(ROOT_DIR, 'public')

const ensureDir = (targetPath) => {
    fs.mkdirSync(path.dirname(targetPath), { recursive: true })
}

const commandExists = (command, args) => {
    try {
        execFileSync(command, args, { stdio: 'ignore' })
        return true
    } catch (error) {
        return error?.code !== 'ENOENT'
    }
}

const hasQlmanage = process.platform === 'darwin' && commandExists('qlmanage', ['-h'])
const hasSips = process.platform === 'darwin' && commandExists('sips', ['-h'])
const hasMagick = commandExists('magick', ['-version'])

const renderWithQuickLook = (size, outPath) => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'autoterra-logo-'))

    try {
        execFileSync('qlmanage', ['-t', '-s', String(size), '-o', tempDir, SOURCE_LOGO], { stdio: 'ignore' })
        fs.copyFileSync(path.join(tempDir, 'logo.svg.png'), outPath)
    } finally {
        fs.rmSync(tempDir, { recursive: true, force: true })
    }
}

const renderWithSips = (size, outPath) => {
    if (!hasSips || !hasMagick) {
        throw new Error('Raster logo generation requires either qlmanage or a sips + ImageMagick toolchain.')
    }

    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'autoterra-logo-'))
    const tempRaster = path.join(tempDir, 'logo.png')

    try {
        execFileSync('sips', ['-s', 'format', 'png', SOURCE_LOGO, '--out', tempRaster], { stdio: 'ignore' })
        execFileSync(
            'magick',
            [
                tempRaster,
                '-background', 'none',
                '-gravity', 'center',
                '-resize', `${size}x${size}`,
                '-extent', `${size}x${size}`,
                outPath,
            ],
            { stdio: 'ignore' }
        )
    } finally {
        fs.rmSync(tempDir, { recursive: true, force: true })
    }
}

const renderWithMagick = (size, outPath) => {
    if (!hasMagick) {
        throw new Error('ImageMagick is required to generate favicon.ico.')
    }

    execFileSync(
        'magick',
        [
            '-background', 'none',
            SOURCE_LOGO,
            '-gravity', 'center',
            '-resize', `${size}x${size}`,
            '-extent', `${size}x${size}`,
            outPath,
        ],
        { stdio: 'ignore' }
    )
}

const renderPng = (size, targetName) => {
    const targetPath = path.join(PUBLIC_DIR, targetName)
    ensureDir(targetPath)

    if (hasQlmanage) {
        renderWithQuickLook(size, targetPath)
        return targetPath
    }

    if (hasSips) {
        renderWithSips(size, targetPath)
        return targetPath
    }

    renderWithMagick(size, targetPath)
    return targetPath
}

if (!fs.existsSync(SOURCE_LOGO)) {
    throw new Error(`Brand source logo not found: ${SOURCE_LOGO}`)
}

fs.mkdirSync(PUBLIC_DIR, { recursive: true })

const sourceSvg = fs.readFileSync(SOURCE_LOGO)
for (const targetName of ['logo2.svg', 'favicon.svg']) {
    const targetPath = path.join(PUBLIC_DIR, targetName)
    ensureDir(targetPath)
    fs.writeFileSync(targetPath, sourceSvg)
}

const logoPngPath = renderPng(1200, 'logo2.png')
const appleTouchIconPath = renderPng(180, 'apple-touch-icon.png')
const favicon32Path = renderPng(32, 'favicon-32.png')
const favicon16Path = renderPng(16, 'favicon-16.png')
const faviconIcoPath = path.join(PUBLIC_DIR, 'favicon.ico')

execFileSync('magick', [favicon16Path, favicon32Path, faviconIcoPath], { stdio: 'ignore' })
fs.rmSync(favicon16Path, { force: true })
fs.rmSync(favicon32Path, { force: true })

console.log('Generated brand assets:')
for (const generatedPath of [
    path.join(PUBLIC_DIR, 'logo2.svg'),
    path.join(PUBLIC_DIR, 'favicon.svg'),
    logoPngPath,
    appleTouchIconPath,
    faviconIcoPath,
]) {
    console.log(`- ${generatedPath}`)
}

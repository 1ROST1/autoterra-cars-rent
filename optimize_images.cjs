const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

try {
    require.resolve('sharp');
} catch (e) {
    console.log('Installing sharp...');
    execSync('npm install --no-save sharp', { stdio: 'inherit' });
}

const sharp = require('sharp');

const dir = path.join(__dirname, 'src/assets/cars');
// Filter all jpg and png files
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png'));

async function processImages() {
    if (files.length === 0) {
        console.log('No JPG/PNG files found to optimize.');
        return;
    }

    for (const file of files) {
        const inputPath = path.join(dir, file);
        // Replace extension properly
        const ext = path.extname(file);
        const outputPath = path.join(dir, file.replace(ext, '.webp'));

        // If WebP already exists, skip
        if (fs.existsSync(outputPath)) {
            console.log(`Skipping ${file}, already optimized.`);
            continue;
        }

        console.log(`Processing ${file}...`);

        try {
            await sharp(inputPath)
                .resize(1920, 1440, { fit: 'inside', withoutEnlargement: true })
                .webp({ quality: 85, effort: 6 })
                .toFile(outputPath);

            console.log(`✅ Created ${path.basename(outputPath)}`);
        } catch (err) {
            console.error(`❌ Error processing ${file}:`, err);
        }
    }

    console.log('\n=======================================');
    console.log('Done! Now you can manually delete original JPG/PNG files.');
    console.log('=======================================');
}

processImages().catch(console.error);

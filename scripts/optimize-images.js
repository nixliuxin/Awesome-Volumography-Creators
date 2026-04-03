/**
 * Image Optimization Script
 * Converts images to WebP format and resizes for web
 * 
 * Usage: npm run optimize-images
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
    inputDir: 'website/assets/creators',
    outputDir: 'website/dist/assets/creators',  // Output directly to dist
    maxWidth: 1600,
    maxHeight: 1200,
    quality: 80,
    formats: ['jpg', 'jpeg', 'png', 'webp']
};

/**
 * Get all image files recursively
 */
function getImageFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            getImageFiles(filePath, fileList);
        } else {
            const ext = path.extname(file).toLowerCase().slice(1);
            if (CONFIG.formats.includes(ext)) {
                fileList.push(filePath);
            }
        }
    }
    
    return fileList;
}

/**
 * Optimize a single image
 */
async function optimizeImage(inputPath) {
    const relativePath = path.relative(CONFIG.inputDir, inputPath);
    const dirName = path.dirname(relativePath);
    const baseName = path.basename(relativePath, path.extname(relativePath));
    
    // Output as WebP
    const outputPath = path.join(CONFIG.outputDir, dirName, `${baseName}.webp`);
    const outputDir = path.dirname(outputPath);
    
    // Create output directory if needed
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    try {
        const image = sharp(inputPath);
        const metadata = await image.metadata();
        
        // Calculate new dimensions (maintain aspect ratio)
        let width = metadata.width;
        let height = metadata.height;
        
        if (width > CONFIG.maxWidth) {
            height = Math.round(height * (CONFIG.maxWidth / width));
            width = CONFIG.maxWidth;
        }
        
        if (height > CONFIG.maxHeight) {
            width = Math.round(width * (CONFIG.maxHeight / height));
            height = CONFIG.maxHeight;
        }
        
        // Process and save
        await image
            .resize(width, height, { fit: 'inside', withoutEnlargement: true })
            .webp({ quality: CONFIG.quality })
            .toFile(outputPath);
        
        // Get file sizes for comparison
        const inputSize = fs.statSync(inputPath).size;
        const outputSize = fs.statSync(outputPath).size;
        const savings = ((1 - outputSize / inputSize) * 100).toFixed(1);
        
        console.log(`  ✓ ${relativePath} → ${baseName}.webp (${savings}% smaller)`);
        
        return { success: true, savings: inputSize - outputSize };
    } catch (error) {
        console.error(`  ✗ ${relativePath}: ${error.message}`);
        return { success: false, savings: 0 };
    }
}

/**
 * Main function
 */
async function main() {
    console.log('🖼️  Optimizing images...\n');
    
    // Check input directory exists
    if (!fs.existsSync(CONFIG.inputDir)) {
        console.error(`Error: Input directory not found: ${CONFIG.inputDir}`);
        process.exit(1);
    }
    
    // Get all images
    const images = getImageFiles(CONFIG.inputDir);
    console.log(`Found ${images.length} images to optimize\n`);
    
    if (images.length === 0) {
        console.log('No images found.');
        return;
    }
    
    // Clear output directory
    if (fs.existsSync(CONFIG.outputDir)) {
        fs.rmSync(CONFIG.outputDir, { recursive: true });
    }
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    
    // Process all images
    let totalSavings = 0;
    let successCount = 0;
    
    for (const imagePath of images) {
        const result = await optimizeImage(imagePath);
        if (result.success) {
            successCount++;
            totalSavings += result.savings;
        }
    }
    
    // Summary
    console.log('\n' + '='.repeat(50));
    console.log(`✅ Optimized ${successCount}/${images.length} images`);
    console.log(`💾 Total savings: ${(totalSavings / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📁 Output: ${CONFIG.outputDir}`);
}

main().catch(console.error);

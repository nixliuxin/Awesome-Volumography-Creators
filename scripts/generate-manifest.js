/**
 * Generate Assets Manifest
 * 
 * Scans website/assets/creators/ and generates a manifest.json
 * that lists all images for each creator.
 * 
 * Run: npm run manifest
 */

const fs = require('fs');
const path = require('path');

const CREATORS_DIR = path.join(__dirname, '../website/assets/creators');
const MANIFEST_PATH = path.join(__dirname, '../website/data/assets-manifest.json');
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

/**
 * Check if file is a supported image
 */
const isImage = (filename) => {
    const ext = path.extname(filename).toLowerCase();
    return SUPPORTED_EXTENSIONS.includes(ext);
};

/**
 * Scan a creator's folder
 */
const scanCreatorFolder = (creatorId) => {
    const creatorPath = path.join(CREATORS_DIR, creatorId);
    
    if (!fs.statSync(creatorPath).isDirectory()) {
        return null;
    }

    const result = {
        profile: null,
        cover: null,
        gallery: []
    };

    // Scan root folder for profile and cover
    // Cover rule: any image in root that is NOT profile.* becomes the cover.
    // If multiple non-profile images exist, first one alphabetically wins.
    const rootFiles = fs.readdirSync(creatorPath).sort();
    const coverCandidates = [];
    
    for (const file of rootFiles) {
        const filePath = path.join(creatorPath, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isFile() && isImage(file)) {
            const basename = path.basename(file, path.extname(file)).toLowerCase();
            
            if (basename === 'profile') {
                result.profile = file;
            } else {
                coverCandidates.push(file);
            }
        }
    }
    
    if (coverCandidates.length > 0) {
        result.cover = coverCandidates[0];
    }

    // Scan gallery folder
    const galleryPath = path.join(creatorPath, 'gallery');
    
    if (fs.existsSync(galleryPath) && fs.statSync(galleryPath).isDirectory()) {
        const galleryFiles = fs.readdirSync(galleryPath);
        
        for (const file of galleryFiles) {
            const filePath = path.join(galleryPath, file);
            const stat = fs.statSync(filePath);
            
            if (stat.isFile() && isImage(file)) {
                result.gallery.push(file);
            }
        }
        
        // Sort gallery files alphabetically
        result.gallery.sort();
    }

    return result;
};

/**
 * Main function
 */
const generateManifest = () => {
    console.log('🔍 Scanning creator assets...\n');

    const manifest = {};

    // Check if creators directory exists
    if (!fs.existsSync(CREATORS_DIR)) {
        console.log('📁 Creating creators directory...');
        fs.mkdirSync(CREATORS_DIR, { recursive: true });
    }

    // Get all creator folders
    const entries = fs.readdirSync(CREATORS_DIR);
    
    for (const entry of entries) {
        // Skip hidden files and .gitkeep
        if (entry.startsWith('.')) continue;
        
        const entryPath = path.join(CREATORS_DIR, entry);
        
        if (fs.statSync(entryPath).isDirectory()) {
            const assets = scanCreatorFolder(entry);
            
            if (assets) {
                manifest[entry] = assets;
                
                const galleryCount = assets.gallery.length;
                const status = [
                    assets.profile ? '✓ profile' : '✗ profile',
                    assets.cover ? '✓ cover' : '✗ cover',
                    `${galleryCount} gallery`
                ].join(', ');
                
                console.log(`  ${entry}: ${status}`);
            }
        }
    }

    // Write manifest
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
    
    console.log(`\n✅ Generated ${MANIFEST_PATH}`);
    console.log(`   ${Object.keys(manifest).length} creators indexed`);
};

generateManifest();

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../public/images/optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Image optimization settings
const optimizationSettings = {
  quality: 80,
  format: 'webp',
  width: 1920, // Max width
  height: 1080, // Max height
};

async function optimizeImage(inputPath, outputPath, filename) {
  try {
    console.log(`Optimizing ${filename}...`);
    
    await sharp(inputPath)
      .resize(optimizationSettings.width, optimizationSettings.height, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: optimizationSettings.quality })
      .toFile(outputPath);
    
    const originalSize = fs.statSync(inputPath).size;
    const optimizedSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${filename}: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(optimizedSize / 1024 / 1024).toFixed(2)}MB (${savings}% smaller)`);
    
  } catch (error) {
    console.error(`❌ Error optimizing ${filename}:`, error.message);
  }
}

async function optimizeAllImages() {
  const files = fs.readdirSync(inputDir).filter(file => 
    file.match(/\.(jpg|jpeg|png)$/i) && !file.includes('Zone.Identifier')
  );
  
  console.log(`Found ${files.length} images to optimize...\n`);
  
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
    
    await optimizeImage(inputPath, outputPath, file);
  }
  
  console.log('\n🎉 Image optimization complete!');
  console.log(`Optimized images saved to: ${outputDir}`);
  console.log('\nNext steps:');
  console.log('1. Replace image references in your components to use .webp files');
  console.log('2. Update src paths to point to optimized images');
  console.log('3. Consider removing original large images after testing');
}

// Run optimization
optimizeAllImages().catch(console.error);

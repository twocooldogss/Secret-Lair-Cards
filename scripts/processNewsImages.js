import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const NEWS_IMAGES_DIR = './public/images/news';
const OUTPUT_DIR = './public/images/news/processed';

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 图片处理配置
const IMAGE_CONFIGS = {
  og: {
    width: 1200,
    height: 630,
    suffix: '-og',
    description: 'OG/SEO图片 (1200×630)'
  },
  thumb: {
    width: 1200,
    height: 800,
    suffix: '-thumb',
    description: '首页缩略图 (1200×800)'
  },
  detail: {
    width: 1200,
    height: 630,
    suffix: '-detail',
    description: '详情页图片 (1200×630)'
  }
};

async function processImage(inputPath, config) {
  const fileName = path.basename(inputPath, path.extname(inputPath));
  const outputPath = path.join(OUTPUT_DIR, `${fileName}${config.suffix}.jpg`);
  
  try {
    await sharp(inputPath)
      .resize(config.width, config.height, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 90 })
      .toFile(outputPath);
    
    console.log(`✅ 已生成: ${config.description} -> ${outputPath}`);
    return outputPath.replace(/\\/g, '/').replace('./public', '');
  } catch (error) {
    console.error(`❌ 处理失败 ${inputPath}:`, error.message);
    return null;
  }
}

async function processAllNewsImages() {
  console.log('🖼️  开始处理新闻图片...\n');
  
  // 查找所有新闻图片
  const imageFiles = fs.readdirSync(NEWS_IMAGES_DIR)
    .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
    .filter(file => !file.includes('-og') && !file.includes('-thumb') && !file.includes('-detail'));
  
  if (imageFiles.length === 0) {
    console.log('⚠️  未找到需要处理的图片文件');
    return;
  }
  
  console.log(`📁 找到 ${imageFiles.length} 个图片文件:`);
  imageFiles.forEach(file => console.log(`   - ${file}`));
  console.log('');
  
  const results = {
    processed: 0,
    failed: 0,
    files: []
  };
  
  for (const imageFile of imageFiles) {
    const inputPath = path.join(NEWS_IMAGES_DIR, imageFile);
    console.log(`🔄 处理: ${imageFile}`);
    
    const processedFiles = [];
    
    // 为每个配置生成图片
    for (const [configName, config] of Object.entries(IMAGE_CONFIGS)) {
      const outputPath = await processImage(inputPath, config);
      if (outputPath) {
        processedFiles.push({
          type: configName,
          path: outputPath.replace('./public', ''),
          config: config
        });
      } else {
        results.failed++;
      }
    }
    
    if (processedFiles.length > 0) {
      results.processed++;
      results.files.push({
        original: imageFile,
        processed: processedFiles
      });
    }
    
    console.log('');
  }
  
  // 生成图片映射文件
  const imageMap = {};
  results.files.forEach(file => {
    const baseName = path.basename(file.original, path.extname(file.original));
    imageMap[baseName] = {
      original: `/images/news/${file.original}`,
      og: file.processed.find(p => p.type === 'og')?.path || `/images/news/${file.original}`,
      thumb: file.processed.find(p => p.type === 'thumb')?.path || `/images/news/${file.original}`,
      detail: file.processed.find(p => p.type === 'detail')?.path || `/images/news/${file.original}`
    };
  });
  
  // 保存图片映射
  const mapPath = path.join(OUTPUT_DIR, 'image-map.json');
  fs.writeFileSync(mapPath, JSON.stringify(imageMap, null, 2));
  
  console.log('📊 处理结果:');
  console.log(`   ✅ 成功处理: ${results.processed} 个文件`);
  console.log(`   ❌ 处理失败: ${results.failed} 个文件`);
  console.log(`   📄 图片映射: ${mapPath}`);
  console.log('\n🎉 图片处理完成！');
}

// 运行处理
processAllNewsImages().catch(console.error);

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = './content/drops';

// English content templates for different themes
const getEnglishContent = (drop) => {
  const { name, release_date, theme, artist, cards } = drop;
  
  // Theme-specific descriptions
  const themeDescriptions = {
    'artist': `This Artist Series showcases the distinctive artistic vision of ${artist || 'the featured artist'}. Each card in this collection represents a unique interpretation of classic Magic: The Gathering cards, blending traditional fantasy elements with contemporary artistic styles.`,
    'holiday': `This holiday-themed Secret Lair brings festive magic to your collection. Featuring seasonal artwork and thematic card selections, this drop captures the spirit of celebration while maintaining the strategic depth that makes Magic: The Gathering beloved by players worldwide.`,
    'pop-culture': `This pop culture collaboration brings beloved characters and themes into the Magic: The Gathering universe. Featuring iconic artwork and thematic card selections, this drop bridges the gap between mainstream entertainment and strategic card gaming.`,
    'gaming': `This gaming-themed Secret Lair celebrates the intersection of digital and tabletop gaming. With artwork inspired by classic and modern video games, this collection offers a unique perspective on Magic's most iconic cards.`,
    'miscellaneous': `This unique Secret Lair collection showcases the creative diversity of Magic: The Gathering. Each card features distinctive artwork that reimagines classic cards through a fresh artistic lens, offering collectors and players a truly unique experience.`
  };

  const themeDescription = themeDescriptions[theme] || themeDescriptions['miscellaneous'];
  
  // Artist-specific content
  const artistContent = artist && artist !== 'Various Artists' 
    ? `The collection is curated by ${artist}, whose distinctive artistic style brings a fresh perspective to these classic Magic cards.`
    : `This collection features artwork from multiple talented artists, each bringing their unique vision to these iconic Magic: The Gathering cards.`;

  return {
    intro: `**${name}** is a unique Secret Lair collection released on ${release_date || 'an unspecified date'}. ${themeDescription}

${artistContent}

This limited-time drop offers collectors and players the opportunity to own these beautifully reimagined cards, each featuring stunning artwork that transforms familiar Magic cards into true works of art.`,

    cards: `This Secret Lair includes the following cards:

| Card Name | Rarity | Description |
|-----------|---------|-------------|
${(cards || []).map(card => `| ${card} |  |  |`).join('\n')}

👉 [View all card details](/cards?drop=${drop.slug})`,

    investment: `Based on our [Investment Analysis](/investment/${drop.slug}), as of ${new Date().toISOString().split('T')[0]}:
- Average market price: To be updated
- 90-day price trend: To be analyzed
- Collectible return potential: To be assessed

> 💡 This drop represents a unique opportunity for collectors seeking distinctive artwork and limited-edition Magic cards.`,

    artist: `Artist: ${artist || 'Various Artists'}
This section provides background on the artistic style, collaborative partnerships (if applicable), and design philosophy behind this collection.`,

    related: `- 📰 [Complete Secret Lair 2025 Guide](/news/secret-lair-2025-complete-guide)
- 💼 [Investment Analysis: Long-term Secret Lair Returns](/investment)
- 🎃 [Latest Halloween Special](/drops/secret-scare-superdrop-2025)`
  };
};

// Generate English content for a single drop
function generateEnglishContent(drop) {
  const content = getEnglishContent(drop);
  
  return `---
title: "${drop.name}"
slug: "${drop.slug}"
release_date: "${drop.release_date || ""}"
theme: "${drop.theme || "miscellaneous"}"
artist: "${drop.artist || "Various Artists"}"
image: "${drop.image || ""}"
cards: ${JSON.stringify(drop.cards || [])}
investment_score: ${drop.investment_score || "null"}
status: "${drop.status || "active"}"
---

## 💠 Drop Overview
${content.intro}

## 🃏 Card List
${content.cards}

## 📈 Market & Investment
${content.investment}

## 🎨 Artist & Theme Background
${content.artist}

## 🔗 Related Content
${content.related}`;
}

// Batch fill all drops with English content
function batchFillEnglishContent() {
  console.log('🚀 Starting English content batch fill...\n');
  
  // Read drops data
  const dropsData = JSON.parse(fs.readFileSync('./data/drops.json', 'utf8'));
  
  let processed = 0;
  let skipped = 0;
  let errors = 0;
  
  for (const drop of dropsData) {
    try {
      const filePath = path.join(CONTENT_DIR, `${drop.slug}.md`);
      
      if (!fs.existsSync(filePath)) {
        console.log(`⏭️  Skipping missing file: ${drop.slug}`);
        skipped++;
        continue;
      }
      
      // Read existing file
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      
      // Check if already has English content (look for "Drop Overview" instead of "Drop 简介")
      if (content.includes('## 💠 Drop Overview')) {
        console.log(`⏭️  Already has English content: ${drop.slug}`);
        skipped++;
        continue;
      }
      
      // Generate new English content
      const englishContent = generateEnglishContent(drop);
      
      // Write the new content
      fs.writeFileSync(filePath, englishContent, 'utf8');
      console.log(`✅ Filled English content: ${drop.slug}`);
      processed++;
      
    } catch (error) {
      console.error(`❌ Error processing ${drop.slug}:`, error.message);
      errors++;
    }
  }
  
  console.log(`\n📊 Batch fill complete:`);
  console.log(`- Processed: ${processed}`);
  console.log(`- Skipped: ${skipped}`);
  console.log(`- Errors: ${errors}`);
  console.log(`- Total: ${dropsData.length}`);
}

// Run the batch fill
batchFillEnglishContent();

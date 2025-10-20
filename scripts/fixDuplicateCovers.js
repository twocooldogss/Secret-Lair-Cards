import fs from "fs";
import fetch from "node-fetch";

const DROPS_FILE = "./data/drops.json";

// 需要修复的重复封面条目
const DUPLICATE_SLUGS = [
  "eldraine-wonderland",
  "kaleidoscope-killers"
];

async function fetchCardImage(cardName) {
  try {
    const url = `https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(cardName)}`;
    const res = await fetch(url);
    const data = await res.json();
    
    if (data?.image_uris?.art_crop) return data.image_uris.art_crop;
    if (data?.image_uris?.normal) return data.image_uris.normal;
    if (data?.image_uris?.large) return data.image_uris.large;
  } catch (e) {
    console.warn(`Failed to fetch image for ${cardName}:`, e.message);
  }
  return "";
}

async function main() {
  const raw = fs.readFileSync(DROPS_FILE, "utf8");
  const drops = JSON.parse(raw);

  let changed = 0;
  for (const drop of drops) {
    if (!DUPLICATE_SLUGS.includes(drop.slug)) continue;
    
    const cards = Array.isArray(drop.cards) ? drop.cards : [];
    if (cards.length === 0) continue;

    // 使用第一张卡作为封面
    const firstCard = cards[0];
    const newImage = await fetchCardImage(firstCard);
    
    if (newImage && newImage !== drop.image) {
      console.log(`Updating ${drop.slug}: ${firstCard} -> ${newImage}`);
      drop.image = newImage;
      changed++;
    }
    
    // 避免API限制
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  if (changed > 0) {
    fs.writeFileSync(DROPS_FILE, JSON.stringify(drops, null, 2), "utf8");
    console.log(`Updated ${changed} duplicate covers`);
  } else {
    console.log("No duplicate covers found to update");
  }
}

main().catch(e => {
  console.error("Error:", e.message);
  process.exit(1);
});


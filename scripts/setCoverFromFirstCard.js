import fs from "fs";
import fetch from "node-fetch";

const DROPS_FILE = "./data/drops.json";

// 需要处理的 slug 列表（也可扩展为主题筛选）
const TARGET_SLUGS = new Set([
  "secret-scare-superdrop-2025",
  "trick-or-treat",
  "dreaming-darkly",
  "omg-kitties",
  "secretversary-2019",
]);

async function fetchArtCropByCardName(name) {
  try {
    const url = `https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(name)}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data?.image_uris?.art_crop) return data.image_uris.art_crop;
    if (data?.image_uris?.normal) return data.image_uris.normal;
    if (data?.image_uris?.large) return data.image_uris.large;
  } catch (e) {
    // ignore
  }
  return "";
}

async function main() {
  const raw = fs.readFileSync(DROPS_FILE, "utf8");
  const drops = JSON.parse(raw);

  // 已使用的封面，避免重复
  const used = new Set(drops.map(d => d.image).filter(Boolean));

  let changed = 0;
  for (const d of drops) {
    if (!TARGET_SLUGS.has(d.slug)) continue;

    const cards = Array.isArray(d.cards) ? d.cards : [];
    if (cards.length === 0) continue;

    const current = d.image || "";
    // 如果当前封面为空或与他人重复（在本列表内可能重复），则重新设定
    const needsUpdate = !current || (used.has(current) && [...TARGET_SLUGS].filter(s => s !== d.slug).length > 0);

    if (!needsUpdate) continue;

    // 依次尝试各卡名，直到拿到未被占用的图片
    for (const name of cards) {
      const art = await fetchArtCropByCardName(name);
      if (art && !used.has(art)) {
        d.image = art;
        used.add(art);
        changed++;
        break;
      }
    }
  }

  if (changed > 0) {
    fs.writeFileSync(DROPS_FILE, JSON.stringify(drops, null, 2), "utf8");
  }
  console.log(`Updated ${changed} covers using first-available card art.`);
}

main().catch(e => {
  console.error(e?.message || e);
  process.exit(1);
});



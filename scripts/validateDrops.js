/**
 * 简单校验：确保白名单中的 20 个漏项都存在于 drops.json，且具备 image 与 cards
 */
import fs from "fs";

const DROPS_FILE = "./data/drops.json";
const CANONICALS_FILE = "./data/drop_canonicals.json";

function main() {
  const drops = JSON.parse(fs.readFileSync(DROPS_FILE, "utf8"));
  const canon = JSON.parse(fs.readFileSync(CANONICALS_FILE, "utf8"));

  const slugToDrop = new Map(drops.map(d => [d.slug, d]));
  let missing = 0;
  let incomplete = 0;

  for (const slug of canon) {
    const d = slugToDrop.get(slug);
    if (!d) {
      console.log(`❌ 缺失 drop: ${slug}`);
      missing++;
      continue;
    }
    const hasImage = Boolean(d.image);
    const hasCards = Array.isArray(d.cards) && d.cards.length > 0;
    if (!hasImage || !hasCards) {
      console.log(`⚠️ 不完整: ${slug} image=${hasImage} cards=${hasCards ? d.cards.length : 0}`);
      incomplete++;
    } else {
      console.log(`✅ 完整: ${slug} (${d.cards.length} cards)`);
    }
  }

  console.log("\n---\n总结:");
  console.log(`缺失: ${missing}`);
  console.log(`不完整: ${incomplete}`);
  console.log(`白名单总数: ${canon.length}`);
}

main();




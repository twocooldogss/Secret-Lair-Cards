/**
 * 🔮 SecretLairCards.com – 智能漏项搜索脚本
 * ----------------------------------------------
 * 功能：
 *  1. 专门处理漏项drops的搜索
 *  2. 使用多种搜索策略和关键词
 *  3. 手动映射已知的drops到Scryfall数据
 *  4. 为找不到的drops提供占位符数据
 *
 * 运行方式：
 *    node scripts/fetchMissingDrops.js
 */

import fs from "fs";
import fetch from "node-fetch";

const DROPS_FILE = "./data/drops.json";
const SCRYFALL_SEARCH = "https://api.scryfall.com/cards/search?q=";
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

// 手动映射的drops数据
const manualMappings = {
  "angels-theyre-just-like-us-but-cooler": {
    searchQueries: ["angels set:sld", "angel set:sld", "serra angel set:sld"],
    fallbackCards: ["Serra Angel", "Angel of Grace", "Lyra Dawnbringer", "Shalai, Voice of Plenty"]
  },
  "bitterblossom-dreams": {
    searchQueries: ["bitterblossom set:sld", "bitterblossom"],
    fallbackCards: ["Bitterblossom"]
  },
  "eldraine-wonderland": {
    searchQueries: ["eldraine set:sld", "wonderland set:sld", "fairy tale set:sld"],
    fallbackCards: ["Brazen Borrower", "Embercleave", "The Great Henge", "Questing Beast"]
  },
  "kaleidoscope-killers": {
    searchQueries: ["kaleidoscope set:sld", "killers set:sld", "colorful set:sld"],
    fallbackCards: ["Murder", "Doom Blade", "Go for the Throat", "Terminate"]
  },
  "restless-in-peace": {
    searchQueries: ["restless set:sld", "peace set:sld", "zombie set:sld"],
    fallbackCards: ["Rest in Peace", "Zombie Apocalypse", "Gravecrawler", "Diregraf Colossus"]
  },
  "seeing-visions": {
    searchQueries: ["visions set:sld", "seeing set:sld", "mystical set:sld"],
    fallbackCards: ["Ancestral Vision", "Visions of Beyond", "Future Sight", "Preordain"]
  },
  "omg-kitties": {
    searchQueries: ["kitties set:sld", "cats set:sld", "feline set:sld"],
    fallbackCards: ["Ajani's Pridemate", "Leonin Warleader", "Regal Caracal", "Ajani, Adversary of Tyrants"]
  },
  "the-gods-theros-stargazing": {
    searchQueries: ["gods set:sld", "theros set:sld", "stargazing set:sld"],
    fallbackCards: ["Heliod, Sun-Crowned", "Thassa, Deep-Dwelling", "Erebos, Bleak-Hearted", "Purphoros, Bronze-Blooded"]
  },
  "secret-scare-superdrop-2025": {
    searchQueries: ["scare set:sld", "halloween set:sld", "spooky set:sld"],
    fallbackCards: ["Nightmare Shepherd", "Grim Harvest", "Haunted Dead", "Spirit of the Night"]
  },
  "trick-or-treat": {
    searchQueries: ["trick set:sld", "treat set:sld", "halloween set:sld"],
    fallbackCards: ["Trick or Treat", "Halloween Jack", "Pumpkin Head", "Ghostly Prison"]
  },
  "dreaming-darkly": {
    searchQueries: ["dreaming set:sld", "darkly set:sld", "nightmare set:sld"],
    fallbackCards: ["Dream Trawler", "Dark Ritual", "Nightmare", "Dream Eater"]
  },
  "jaws-terror-of-amity-island": {
    searchQueries: ["jaws set:sld", "shark set:sld", "amity set:sld"],
    fallbackCards: ["Shark Typhoon", "Voracious Greatshark", "Sharktocrab", "Jaws of Stone"]
  },
  "the-office-dwights-destiny": {
    searchQueries: ["office set:sld", "dwight set:sld", "destiny set:sld"],
    fallbackCards: ["Destiny Spinner", "Destiny Bond", "Destiny", "Fated Return"]
  },
  "phyrexian-faves": {
    searchQueries: ["phyrexian set:sld", "compleat set:sld", "praetor set:sld"],
    fallbackCards: ["Elesh Norn, Grand Cenobite", "Jin-Gitaxias, Core Augur", "Sheoldred, Whispering One", "Urabrask the Hidden"]
  },
  "jurassic-world": {
    searchQueries: ["jurassic set:sld", "dinosaur set:sld", "world set:sld"],
    fallbackCards: ["Ghalta, Primal Hunger", "Carnage Tyrant", "Ripjaw Raptor", "Regisaur Alpha"]
  },
  "the-big-score": {
    searchQueries: ["score set:sld", "heist set:sld", "treasure set:sld"],
    fallbackCards: ["Treasure Map", "Treasure Vault", "Smothering Tithe", "Dockside Extortionist"]
  },
  "doctor-who-encore": {
    searchQueries: ["doctor set:sld", "who set:sld", "encore set:sld"],
    fallbackCards: ["The Doctor", "TARDIS", "Dalek", "Cybermen"]
  },
  "secretversary-2019": {
    searchQueries: ["secretversary set:sld", "anniversary set:sld", "2019 set:sld"],
    fallbackCards: ["Lightning Bolt", "Counterspell", "Dark Ritual", "Giant Growth"]
  },
  "secretversary-2020": {
    searchQueries: ["secretversary set:sld", "anniversary set:sld", "2020 set:sld"],
    fallbackCards: ["Lightning Bolt", "Counterspell", "Dark Ritual", "Giant Growth"]
  },
  "secretversary-2023": {
    searchQueries: ["secretversary set:sld", "anniversary set:sld", "2023 set:sld"],
    fallbackCards: ["Lightning Bolt", "Counterspell", "Dark Ritual", "Giant Growth"]
  }
};

async function searchForDrop(drop) {
  const mapping = manualMappings[drop.slug];
  if (!mapping) {
    console.warn(`⚠️ 没有映射数据: ${drop.slug}`);
    return drop;
  }

  let foundCards = [];
  let foundImage = "";

  // 尝试各种搜索查询
  for (const query of mapping.searchQueries) {
    try {
      const encodedQuery = encodeURIComponent(query);
      const res = await fetch(`${SCRYFALL_SEARCH}${encodedQuery}`);
      const data = await res.json();

      if (data.data && data.data.length > 0) {
        foundCards = data.data.filter((c) => c.image_uris?.art_crop);
        if (foundCards.length > 0) {
          foundImage = foundCards[0].image_uris.art_crop;
          console.log(`✅ ${drop.slug}: 找到 ${foundCards.length} 张卡牌`);
          break;
        }
      }
    } catch (err) {
      continue;
    }
    await delay(200);
  }

  // 如果没找到，使用备用卡牌列表
  if (foundCards.length === 0) {
    console.log(`📝 ${drop.slug}: 使用备用卡牌列表`);
    foundCards = mapping.fallbackCards.map((cardName, index) => ({
      name: cardName,
      image_uris: { art_crop: `/cards/placeholder-${index + 1}.jpg` }
    }));
    foundImage = "/drops/placeholder.jpg";
  }

  return {
    ...drop,
    cards: foundCards.map(c => c.name),
    image: foundImage || drop.image || "/drops/placeholder.jpg",
    card_count: foundCards.length
  };
}

async function main() {
  console.log("🚀 开始智能搜索漏项drops...");
  
  try {
    const raw = fs.readFileSync(DROPS_FILE, "utf8");
    const drops = JSON.parse(raw);
    
    // 找到需要处理的漏项drops
    const missingDrops = drops.filter(drop => 
      drop.slug.includes('angels-theyre-just-like-us-but-cooler') ||
      drop.slug.includes('bitterblossom-dreams') ||
      drop.slug.includes('eldraine-wonderland') ||
      drop.slug.includes('kaleidoscope-killers') ||
      drop.slug.includes('restless-in-peace') ||
      drop.slug.includes('seeing-visions') ||
      drop.slug.includes('omg-kitties') ||
      drop.slug.includes('the-gods-theros-stargazing') ||
      drop.slug.includes('secret-scare-superdrop-2025') ||
      drop.slug.includes('trick-or-treat') ||
      drop.slug.includes('dreaming-darkly') ||
      drop.slug.includes('jaws-terror-of-amity-island') ||
      drop.slug.includes('the-office-dwights-destiny') ||
      drop.slug.includes('phyrexian-faves') ||
      drop.slug.includes('jurassic-world') ||
      drop.slug.includes('the-big-score') ||
      drop.slug.includes('doctor-who-encore') ||
      drop.slug.includes('secretversary-2019') ||
      drop.slug.includes('secretversary-2020') ||
      drop.slug.includes('secretversary-2023')
    );
    
    console.log(`📊 找到 ${missingDrops.length} 个漏项drops需要处理`);
    
    const updatedDrops = [];
    const processedSlugs = new Set();
    
    for (const drop of drops) {
      if (missingDrops.some(md => md.slug === drop.slug)) {
        if (!processedSlugs.has(drop.slug)) {
          const updatedDrop = await searchForDrop(drop);
          updatedDrops.push(updatedDrop);
          processedSlugs.add(drop.slug);
        }
      } else {
        updatedDrops.push(drop);
      }
    }
    
    // 写回文件
    fs.writeFileSync(DROPS_FILE, JSON.stringify(updatedDrops, null, 2), "utf8");
    
    console.log("\n✨ 漏项drops处理完成！");
    console.log(`📊 处理了 ${processedSlugs.size} 个漏项drops`);
    console.log(`📁 已写入: ${DROPS_FILE}`);
    
  } catch (error) {
    console.error("❌ 处理失败:", error.message);
    process.exit(1);
  }
}

main().catch((err) => console.error("脚本错误:", err));




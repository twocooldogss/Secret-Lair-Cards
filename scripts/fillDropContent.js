/**
 * 🪄 SecretLairCards.com – fillDropContent.js
 * -------------------------------------------
 * 批量填充 Drop 内容，支持 ChatGPT 生成的内容导入
 *
 * 功能：
 *  - 读取 ChatGPT 生成的内容
 *  - 自动匹配到对应的 Markdown 文件
 *  - 替换占位符内容
 *  - 保持文件结构完整
 *
 * 运行：
 *   node scripts/fillDropContent.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 内容目录
const CONTENT_DIR = path.join(__dirname, '../content/drops');

/**
 * 从 ChatGPT 内容中提取 Drop 信息
 * 格式：### Secret Lair: Drop Name\n内容...
 */
function parseChatGPTContent(content) {
  const drops = {};
  const lines = content.split('\n');
  let currentDrop = null;
  let currentContent = [];

  for (const line of lines) {
    if (line.startsWith('### Secret Lair:')) {
      // 保存上一个drop
      if (currentDrop && currentContent.length > 0) {
        drops[currentDrop] = currentContent.join('\n').trim();
      }
      
      // 开始新的drop
      currentDrop = line.replace('### Secret Lair:', '').trim();
      currentContent = [];
    } else if (currentDrop && line.trim()) {
      currentContent.push(line);
    }
  }

  // 保存最后一个drop
  if (currentDrop && currentContent.length > 0) {
    drops[currentDrop] = currentContent.join('\n').trim();
  }

  return drops;
}

/**
 * 填充单个 Drop 文件
 */
function fillDropFile(slug, content) {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ 文件不存在: ${slug}.md`);
    return false;
  }

  let fileContent = fs.readFileSync(filePath, 'utf8');
  
  // 替换简介部分
  const introPattern = /## 💠 Drop Overview\n[\s\S]*?(?=## 🃏 Card List)/;
  const newIntro = `## 💠 Drop Overview\n${content}\n\n`;
  
  if (introPattern.test(fileContent)) {
    fileContent = fileContent.replace(introPattern, newIntro);
    fs.writeFileSync(filePath, fileContent, 'utf8');
    console.log(`✅ 已填充: ${slug}.md`);
    return true;
  } else {
    console.log(`⚠️  未找到简介占位符: ${slug}.md`);
    return false;
  }
}

/**
 * 主函数
 */
function main() {
  console.log('🚀 开始填充 Drop 内容...');
  
  // ChatGPT 生成的内容 - 完整版本
  const chatGPTContent = `
### Secret Lair: Adam Paquette
This Artist Series highlights Adam Paquette's sweeping use of light and atmosphere. His cards depict ethereal landscapes that feel alive, capturing the tension between nature and arcane power. The collection celebrates Paquette's mastery of composition and color, offering players a serene yet dramatic reinterpretation of classic Magic settings.

### Secret Lair: The Big Score
This drop celebrates the thrill of high-stakes gambling and the allure of quick riches. Each card features opulent gold and gemstone motifs, with intricate details that evoke the excitement of a casino heist. The art style combines Art Deco elegance with modern digital techniques, creating a luxurious aesthetic that reflects the high-risk, high-reward nature of the cards.

### Secret Lair: Doctor Who Encore
This collection brings the iconic Doctor Who universe to Magic: The Gathering with stunning artwork that captures the essence of time travel and adventure. Each card features beloved characters and locations from the series, rendered in a style that honors both the show's legacy and Magic's fantasy aesthetic. The art seamlessly blends science fiction elements with magical themes.

### Secret Lair: Eldraine Wonderland
Inspired by Lewis Carroll's Alice in Wonderland, this drop transforms classic Magic cards into whimsical fairy tale adventures. The artwork features vibrant colors, exaggerated proportions, and dreamlike landscapes that capture the nonsensical charm of Wonderland. Each card tells a story of curiosity, adventure, and the magic of childhood imagination.

### Secret Lair: Kaleidoscope Killers
This drop explores the beauty found in destruction, featuring cards that showcase the intricate patterns and colors of a kaleidoscope. The artwork combines geometric precision with organic forms, creating a mesmerizing visual experience that reflects the chaotic yet beautiful nature of combat and conflict in Magic.

### Secret Lair: OMG KITTIES!
This adorable collection features cats in various magical scenarios, from casting spells to wielding legendary artifacts. The artwork is rendered in a cute, cartoonish style that emphasizes the playful nature of cats while maintaining the epic fantasy feel of Magic. Each card captures the personality and charm of our feline friends.

### Secret Lair: Secretversary 2019
This anniversary collection celebrates the rich history of Magic: The Gathering with a retrospective approach to card design. The artwork features classic Magic elements reimagined with modern techniques, creating a bridge between the game's past and present. Each card honors the legacy of Magic while looking forward to its future.

### Secret Lair: The Walking Dead
This crossover collection brings the post-apocalyptic world of The Walking Dead to Magic: The Gathering. The artwork captures the gritty, survival-focused atmosphere of the series while maintaining Magic's fantasy elements. Each card features iconic characters and moments from the show, rendered in a style that emphasizes the harsh realities of a zombie apocalypse.

### Secret Lair: Thraximundar
This drop focuses on the legendary dragon Thraximundar, showcasing his power and majesty through stunning artwork. The collection features cards that highlight the dragon's destructive capabilities and regal presence, with art that emphasizes scale, power, and the awe-inspiring nature of legendary creatures.

### Secret Lair: Theros Beyond Death
This collection explores the Greek mythology-inspired world of Theros, featuring gods, heroes, and monsters from ancient legends. The artwork combines classical Greek art styles with modern fantasy illustration, creating a timeless aesthetic that honors both the source material and Magic's unique fantasy world.

### Secret Lair: Kaldheim
This Norse mythology-inspired collection brings the frozen realms of Kaldheim to life with artwork that captures the harsh beauty of Viking culture. Each card features intricate details that reflect the craftsmanship and storytelling traditions of Norse mythology, while maintaining the epic fantasy feel of Magic.

### Secret Lair: Strixhaven
This collection celebrates the magical academy of Strixhaven, featuring cards that showcase the five colleges and their unique approaches to magic. The artwork combines academic aesthetics with magical elements, creating a scholarly yet fantastical atmosphere that reflects the intellectual pursuit of magical knowledge.

### Secret Lair: Adventures in the Forgotten Realms
This crossover collection brings the iconic characters and locations of Dungeons & Dragons to Magic: The Gathering. The artwork features beloved D&D elements rendered in Magic's fantasy style, creating a seamless blend of two beloved fantasy universes.

### Secret Lair: Innistrad: Midnight Hunt
This collection explores the gothic horror world of Innistrad, featuring cards that capture the eerie atmosphere of a world where monsters lurk in the shadows. The artwork emphasizes mood, atmosphere, and the psychological horror that makes Innistrad such a compelling setting.

### Secret Lair: Innistrad: Crimson Vow
This collection continues the Innistrad saga, focusing on the vampire aristocracy and their dark ceremonies. The artwork features opulent gothic architecture, elegant vampire lords, and the macabre beauty of a world ruled by the undead.

### Secret Lair: Kamigawa: Neon Dynasty
This collection blends traditional Japanese aesthetics with cyberpunk elements, creating a unique vision of a futuristic Kamigawa. The artwork combines ancient Japanese art styles with neon-soaked cyberpunk visuals, creating a striking contrast between tradition and technology.

### Secret Lair: Streets of New Capenna
This collection explores the art deco world of New Capenna, featuring cards that capture the glamour and danger of a 1920s-style city ruled by crime families. The artwork emphasizes the opulence and corruption of a world where power and wealth are everything.

### Secret Lair: Dominaria United
This collection celebrates the return to Dominaria, featuring cards that showcase the rich history and diverse cultures of Magic's original plane. The artwork combines classic Magic elements with modern illustration techniques, creating a nostalgic yet fresh take on familiar themes.

### Secret Lair: The Brothers' War
This collection explores the legendary conflict between Urza and Mishra, featuring cards that showcase the technological marvels and devastating weapons of the brothers' war. The artwork emphasizes the scale and impact of this legendary conflict.

### Secret Lair: Phyrexia: All Will Be One
This collection explores the nightmarish world of Phyrexia, featuring cards that showcase the mechanical horrors and twisted beauty of a plane consumed by corruption. The artwork emphasizes the contrast between organic and mechanical elements.

### Secret Lair: March of the Machine
This collection features the epic battle between the Phyrexians and the multiverse, showcasing the scale and impact of this world-changing conflict. The artwork emphasizes the cosmic scope and devastating consequences of the war.

### Secret Lair: March of the Machine: The Aftermath
This collection explores the aftermath of the Phyrexian invasion, featuring cards that showcase the rebuilding and recovery of the multiverse. The artwork emphasizes hope, resilience, and the determination to rebuild after destruction.

### Secret Lair: Wilds of Eldraine
This collection returns to the fairy tale world of Eldraine, featuring cards that showcase the whimsical and magical nature of this beloved plane. The artwork emphasizes the charm and wonder of fairy tales while maintaining the epic fantasy feel of Magic.

### Secret Lair: The Lost Caverns of Ixalan
This collection explores the mysterious underground world of Ixalan, featuring cards that showcase the ancient civilizations and hidden treasures of this lost realm. The artwork emphasizes the sense of discovery and adventure.

### Secret Lair: Murders at Karlov Manor
This collection features a murder mystery set in the opulent world of Ravnica, showcasing the intrigue and danger of a world where nothing is as it seems. The artwork emphasizes the elegance and deception of a world ruled by guilds.

### Secret Lair: Outlaws of Thunder Junction
This collection explores the wild west world of Thunder Junction, featuring cards that showcase the lawless frontier and the outlaws who call it home. The artwork emphasizes the rugged individualism and dangerous beauty of the frontier.

### Secret Lair: Bloomburrow
This collection features a world where animals are the heroes, showcasing the charm and adventure of a world where size doesn't matter. The artwork emphasizes the cuteness and bravery of small creatures in a big world.

### Secret Lair: Duskmourn: House of Horror
This collection explores the haunted world of Duskmourn, featuring cards that showcase the psychological horror and supernatural elements of this terrifying plane. The artwork emphasizes the fear and mystery of a world where nightmares come to life.

### Secret Lair: Modern Horizons 3
This collection features powerful cards from Modern Horizons 3, showcasing the innovative design and powerful effects that make this set so exciting. The artwork emphasizes the unique and powerful nature of these special cards.

### Secret Lair: Assassin's Creed
This crossover collection brings the iconic world of Assassin's Creed to Magic: The Gathering, featuring cards that showcase the stealth, parkour, and historical elements of the beloved video game series. The artwork seamlessly blends the game's aesthetic with Magic's fantasy world.

### Secret Lair: Jurassic World Collection
This crossover collection brings the prehistoric world of Jurassic World to Magic: The Gathering, featuring cards that showcase the awe-inspiring power and majesty of dinosaurs. The artwork captures the scale and danger of these ancient creatures while maintaining Magic's fantasy elements.

### Secret Lair: My Little Pony: Friendship is Magic
This crossover collection brings the colorful world of My Little Pony to Magic: The Gathering, featuring cards that showcase the magic of friendship and the power of teamwork. The artwork emphasizes the bright, cheerful aesthetic of the show while maintaining the strategic depth of Magic.

### Secret Lair: Street Fighter
This crossover collection brings the iconic fighting game Street Fighter to Magic: The Gathering, featuring cards that showcase the martial arts mastery and competitive spirit of the world's greatest fighters. The artwork emphasizes the dynamic action and intense battles that define the series.

### Secret Lair: Stranger Things
This crossover collection brings the supernatural world of Stranger Things to Magic: The Gathering, featuring cards that showcase the eerie atmosphere and mysterious creatures of the Upside Down. The artwork emphasizes the 80s nostalgia and supernatural horror that defines the series.

### Secret Lair: The Godzilla Lands
This crossover collection brings the iconic kaiju Godzilla to Magic: The Gathering, featuring cards that showcase the destructive power and awe-inspiring scale of the King of Monsters. The artwork emphasizes the epic battles and city-destroying rampages that define the Godzilla franchise.

### Secret Lair: The Walking Dead: Extended
This extended collection brings even more characters and moments from The Walking Dead to Magic: The Gathering, featuring cards that showcase the survival horror and human drama of the post-apocalyptic world. The artwork emphasizes the gritty realism and emotional depth of the series.

### Secret Lair: Theros Beyond Death: Extended
This extended collection explores even more of the Greek mythology-inspired world of Theros, featuring cards that showcase the gods, heroes, and monsters of ancient legends. The artwork combines classical Greek art styles with modern fantasy illustration, creating a timeless aesthetic.

### Secret Lair: Kaldheim: Extended
This extended collection brings even more of the frozen realms of Kaldheim to life, featuring cards that showcase the harsh beauty and rich culture of Viking mythology. The artwork emphasizes the craftsmanship and storytelling traditions of Norse culture.

### Secret Lair: Strixhaven: Extended
This extended collection celebrates even more of the magical academy of Strixhaven, featuring cards that showcase the five colleges and their unique approaches to magic. The artwork combines academic aesthetics with magical elements, creating a scholarly yet fantastical atmosphere.

### Secret Lair: Adventures in the Forgotten Realms: Extended
This extended collection brings even more of the iconic characters and locations of Dungeons & Dragons to Magic: The Gathering, featuring cards that showcase the rich lore and diverse cultures of the Forgotten Realms. The artwork emphasizes the depth and complexity of the D&D universe.

### Secret Lair: Innistrad: Midnight Hunt: Extended
This extended collection explores even more of the gothic horror world of Innistrad, featuring cards that showcase the eerie atmosphere and supernatural threats of this haunted plane. The artwork emphasizes the mood, atmosphere, and psychological horror that makes Innistrad compelling.

### Secret Lair: Innistrad: Crimson Vow: Extended
This extended collection continues the Innistrad saga with even more focus on the vampire aristocracy and their dark ceremonies. The artwork features opulent gothic architecture, elegant vampire lords, and the macabre beauty of a world ruled by the undead.

### Secret Lair: Kamigawa: Neon Dynasty: Extended
This extended collection blends even more traditional Japanese aesthetics with cyberpunk elements, creating a unique vision of a futuristic Kamigawa. The artwork combines ancient Japanese art styles with neon-soaked cyberpunk visuals, creating a striking contrast between tradition and technology.

### Secret Lair: Streets of New Capenna: Extended
This extended collection explores even more of the art deco world of New Capenna, featuring cards that showcase the glamour and danger of a 1920s-style city ruled by crime families. The artwork emphasizes the opulence and corruption of a world where power and wealth are everything.

### Secret Lair: Dominaria United: Extended
This extended collection celebrates even more of the return to Dominaria, featuring cards that showcase the rich history and diverse cultures of Magic's original plane. The artwork combines classic Magic elements with modern illustration techniques, creating a nostalgic yet fresh take on familiar themes.

### Secret Lair: The Brothers' War: Extended
This extended collection explores even more of the legendary conflict between Urza and Mishra, featuring cards that showcase the technological marvels and devastating weapons of the brothers' war. The artwork emphasizes the scale and impact of this legendary conflict.

### Secret Lair: Phyrexia: All Will Be One: Extended
This extended collection explores even more of the nightmarish world of Phyrexia, featuring cards that showcase the mechanical horrors and twisted beauty of a plane consumed by corruption. The artwork emphasizes the contrast between organic and mechanical elements.

### Secret Lair: March of the Machine: Extended
This extended collection features even more of the epic battle between the Phyrexians and the multiverse, showcasing the scale and impact of this world-changing conflict. The artwork emphasizes the cosmic scope and devastating consequences of the war.

### Secret Lair: March of the Machine: The Aftermath: Extended
This extended collection explores even more of the aftermath of the Phyrexian invasion, featuring cards that showcase the rebuilding and recovery of the multiverse. The artwork emphasizes hope, resilience, and the determination to rebuild after destruction.

### Secret Lair: Wilds of Eldraine: Extended
This extended collection returns to even more of the fairy tale world of Eldraine, featuring cards that showcase the whimsical and magical nature of this beloved plane. The artwork emphasizes the charm and wonder of fairy tales while maintaining the epic fantasy feel of Magic.

### Secret Lair: The Lost Caverns of Ixalan: Extended
This extended collection explores even more of the mysterious underground world of Ixalan, featuring cards that showcase the ancient civilizations and hidden treasures of this lost realm. The artwork emphasizes the sense of discovery and adventure.

### Secret Lair: Murders at Karlov Manor: Extended
This extended collection features even more of the murder mystery set in the opulent world of Ravnica, showcasing the intrigue and danger of a world where nothing is as it seems. The artwork emphasizes the elegance and deception of a world ruled by guilds.

### Secret Lair: Outlaws of Thunder Junction: Extended
This extended collection explores even more of the wild west world of Thunder Junction, featuring cards that showcase the lawless frontier and the outlaws who call it home. The artwork emphasizes the rugged individualism and dangerous beauty of the frontier.

### Secret Lair: Bloomburrow: Extended
This extended collection features even more of the world where animals are the heroes, showcasing the charm and adventure of a world where size doesn't matter. The artwork emphasizes the cuteness and bravery of small creatures in a big world.

### Secret Lair: Duskmourn: House of Horror: Extended
This extended collection explores even more of the haunted world of Duskmourn, featuring cards that showcase the psychological horror and supernatural elements of this terrifying plane. The artwork emphasizes the fear and mystery of a world where nightmares come to life.

### Secret Lair: Modern Horizons 3: Extended
This extended collection features even more powerful cards from Modern Horizons 3, showcasing the innovative design and powerful effects that make this set so exciting. The artwork emphasizes the unique and powerful nature of these special cards.

### Secret Lair: Assassin's Creed: Extended
This extended crossover collection brings even more of the iconic world of Assassin's Creed to Magic: The Gathering, featuring cards that showcase the stealth, parkour, and historical elements of the beloved video game series. The artwork seamlessly blends the game's aesthetic with Magic's fantasy world.
`;

  // 解析 ChatGPT 内容
  const dropsContent = parseChatGPTContent(chatGPTContent);
  console.log(`📝 解析到 ${Object.keys(dropsContent).length} 个 Drop 内容`);
  console.log('前5个解析到的内容:', Object.keys(dropsContent).slice(0, 5));

  // 获取所有现有的 Markdown 文件
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
  
  let successCount = 0;
  let totalCount = 0;

  for (const file of files) {
    const slug = file.replace('.md', '');
    totalCount++;
    
    // 尝试匹配 ChatGPT 内容
    const dropName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    if (dropsContent[dropName]) {
      if (fillDropFile(slug, dropsContent[dropName])) {
        successCount++;
      }
    } else {
      // 尝试其他匹配方式
      const alternativeName = slug.replace(/-/g, ' ');
      if (dropsContent[alternativeName]) {
        if (fillDropFile(slug, dropsContent[alternativeName])) {
          successCount++;
        }
      } else {
        console.log(`⚠️  未找到匹配内容: ${dropName}`);
      }
    }
  }

  console.log(`\n✨ 填充完成！成功: ${successCount}/${totalCount}`);
}

// 运行主函数
main();


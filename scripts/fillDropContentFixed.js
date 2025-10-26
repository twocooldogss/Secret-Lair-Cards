import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = './content/drops';

// ChatGPT生成的内容
const chatGPTContent = `
### Secret Lair: Adam Paquette
This Artist Series highlights Adam Paquette's sweeping use of light and atmosphere. His cards depict ethereal landscapes that feel alive, capturing the tension between nature and arcane power. The collection celebrates Paquette's mastery of composition and color, offering players a serene yet dramatic reinterpretation of classic Magic settings.

### Secret Lair: Alayna Danner
Alayna Danner brings a fresh perspective to Magic's visual language with her bold, contemporary style. Her work emphasizes strong geometric compositions and vibrant color palettes, creating cards that feel both modern and timeless. This collection showcases her ability to balance complexity with clarity, making each piece instantly recognizable while maintaining the game's strategic depth.

### Secret Lair: Secret Scare Superdrop 2025
The ultimate Halloween collection featuring spine-chilling artwork from multiple artists. This superdrop combines classic horror themes with Magic's fantasy elements, creating a unique blend of terror and strategy. Each card tells a story of supernatural power, perfect for players who want to add a spooky twist to their decks.

### Secret Lair: Jurassic World Collection
A thrilling crossover that brings the prehistoric world to Magic: The Gathering. This collection features stunning artwork depicting dinosaurs and prehistoric creatures in Magic's fantasy setting. The cards capture the awe-inspiring scale and power of these ancient beasts, offering players a unique way to experience both franchises.

### Secret Lair: OMG KITTIES!
An adorable collection featuring the cutest cats in Magic's multiverse. This drop celebrates the lighter side of the game with charming artwork that will make any cat lover smile. Each card showcases different feline personalities, from playful kittens to majestic cats, bringing joy and whimsy to your collection.

### Secret Lair: Kaleidoscope Killers
A psychedelic journey through Magic's most colorful and chaotic creatures. This collection features vibrant, kaleidoscopic artwork that transforms familiar creatures into mesmerizing visual experiences. The cards use bold patterns and shifting colors to create a truly unique aesthetic that stands out in any collection.

### Secret Lair: Eldraine Wonderland
A whimsical journey through a fairy tale realm where magic and wonder collide. This collection captures the essence of classic fairy tales with a Magic twist, featuring enchanting artwork that brings beloved stories to life. Each card tells a tale of adventure, magic, and the power of imagination.

### Secret Lair: Secretversary 2019
The inaugural anniversary collection that started it all. This drop celebrates Magic's rich history with special artwork that honors the game's legacy. Featuring iconic cards reimagined with anniversary-themed art, this collection represents a milestone in Magic's evolution and the beginning of the Secret Lair phenomenon.

### Secret Lair: The Walking Dead
A groundbreaking crossover that brought the zombie apocalypse to Magic. This collection features iconic characters from the hit TV show, reimagined as Magic cards with unique abilities. The artwork captures the gritty, survival-focused atmosphere of the show while maintaining Magic's strategic gameplay elements.

### Secret Lair: Stranger Things
A nostalgic journey to the Upside Down with this Netflix crossover. This collection features beloved characters from the hit series, each with unique abilities that reflect their personalities and powers. The artwork captures the 80s aesthetic and supernatural elements that made the show a cultural phenomenon.

### Secret Lair: Godzilla Series
A massive crossover that brings the King of Monsters to Magic. This collection features Godzilla and other kaiju in stunning artwork that captures their immense scale and power. Each card represents a different aspect of the Godzilla universe, from the iconic monster himself to the human characters who face these titanic threats.

### Secret Lair: Street Fighter
A fighting game crossover that brings the world's greatest warriors to Magic. This collection features iconic characters from the legendary fighting game, each with abilities that reflect their fighting styles and special moves. The artwork captures the energy and intensity of Street Fighter's combat while maintaining Magic's strategic depth.

### Secret Lair: My Little Pony
A magical crossover that brings friendship and magic to Magic: The Gathering. This collection features beloved characters from the hit animated series, each with unique abilities that reflect their personalities and magical powers. The artwork captures the colorful, optimistic world of Equestria while maintaining the strategic elements that make Magic engaging.

### Secret Lair: Transformers
A robotic crossover that brings the Autobots and Decepticons to Magic. This collection features iconic Transformers characters, each with abilities that reflect their transformation abilities and combat prowess. The artwork captures the mechanical complexity and heroic spirit of the Transformers universe.

### Secret Lair: Dungeons & Dragons
A fantasy crossover that brings the world's greatest roleplaying game to Magic. This collection features iconic D&D elements, from legendary dragons to powerful spells, each reimagined as Magic cards. The artwork captures the epic scope and adventure of D&D while maintaining Magic's strategic gameplay.

### Secret Lair: Warhammer 40,000
A grimdark crossover that brings the far future to Magic. This collection features iconic elements from the Warhammer 40K universe, from Space Marines to Chaos Daemons, each with abilities that reflect their grimdark nature. The artwork captures the brutal, gothic aesthetic of the 41st millennium.

### Secret Lair: Arcane
A Netflix crossover that brings the world of League of Legends to Magic. This collection features characters from the hit animated series, each with abilities that reflect their unique powers and personalities. The artwork captures the steampunk aesthetic and emotional depth of the Arcane universe.

### Secret Lair: Fortnite
A battle royale crossover that brings the world's most popular game to Magic. This collection features iconic elements from Fortnite, from weapons to locations, each reimagined as Magic cards. The artwork captures the vibrant, action-packed world of Fortnite while maintaining Magic's strategic elements.

### Secret Lair: Assassin's Creed
A historical crossover that brings the Brotherhood of Assassins to Magic. This collection features iconic elements from the Assassin's Creed series, from historical figures to legendary weapons, each with abilities that reflect their stealth and combat prowess. The artwork captures the historical accuracy and cinematic quality of the games.

### Secret Lair: Final Fantasy
A JRPG crossover that brings the world's most beloved RPG series to Magic. This collection features iconic elements from Final Fantasy, from legendary summons to powerful spells, each reimagined as Magic cards. The artwork captures the epic scope and emotional depth of the Final Fantasy universe.
`;

// 解析ChatGPT内容
const contentMap = new Map();
const sections = chatGPTContent.split('### ').filter(s => s.trim() !== '');

sections.forEach(section => {
  const lines = section.split('\n');
  const title = lines[0].trim();
  const content = lines.slice(1).join('\n').trim();
  contentMap.set(title, content);
});

console.log('📚 开始填充Markdown内容...\n');

// 处理每个Markdown文件
fs.readdirSync(CONTENT_DIR).forEach(file => {
  if (file.endsWith('.md')) {
    const filePath = path.join(CONTENT_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    const dropName = data.title;
    if (contentMap.has(dropName)) {
      const newIntro = contentMap.get(dropName);
      
      // 使用更简单的替换方式，匹配英文模板内容
      const updatedContent = content.replace(
        /## 💠 Drop Overview\n[\s\S]*?This unique Secret Lair collection showcases the creative diversity of Magic: The Gathering\. Each card features distinctive artwork that reimagines classic cards through a fresh artistic lens, offering collectors and players a truly unique experience\./,
        `## 💠 Drop Overview\n${newIntro}`
      );
      
      fs.writeFileSync(filePath, matter.stringify(updatedContent, data), 'utf8');
      console.log(`✅ 已填充: ${dropName}`);
    } else {
      console.log(`⏭️ 未找到匹配内容: ${dropName}`);
    }
  }
});

console.log('\n✨ 所有Markdown内容填充完毕！');

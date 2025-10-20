import fs from "fs";

const DROPS_FILE = "./data/drops.json";

function main() {
  const raw = fs.readFileSync(DROPS_FILE, "utf8");
  const drops = JSON.parse(raw);

  let changed = 0;
  for (const d of drops) {
    const img = d.image || "";
    if (typeof img === "string" && img.startsWith("/drops/placeholder")) {
      d.image = "/images/placeholder.svg";
      changed++;
    }
  }

  if (changed > 0) {
    fs.writeFileSync(DROPS_FILE, JSON.stringify(drops, null, 2), "utf8");
  }
  console.log(`Replaced ${changed} placeholder images with /images/placeholder.svg`);
}

main();




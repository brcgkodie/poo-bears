#!/bin/bash
cd ~/projects/poo-bears/img || exit 1
STYLE="overhead flat-lay, soft natural light, clean rustic surface, shallow depth of field, photorealistic, appetizing, editorial food photography, no text, no watermark, no logo"
make () {
  local name="$1" desc="$2"; echo "=== $name ==="
  url=$(higgsfield generate create gpt_image_2 --prompt "$desc, $STYLE" --aspect_ratio "4:3" --quality high --resolution 2k --wait --wait-timeout 6m --json 2>/dev/null | grep -oE 'https://d8j0ntlcm91z4[^"]*\.png' | head -1)
  if [ -n "$url" ]; then curl -s -o "${name}_raw.png" "$url"; sips -s format jpeg -s formatOptions 82 -Z 1400 "${name}_raw.png" --out "${name}.jpg" >/dev/null 2>&1; rm -f "${name}_raw.png"; echo "got $name"; else echo "FAILED $name"; fi
}
make mississippi-pot-roast "Mississippi pot roast, fork-tender shredded beef chuck with whole pepperoncini peppers in a rich glossy gravy, served over creamy mashed potatoes in a bowl"
make baked-feta-pasta "Baked feta pasta, a block of golden baked feta melted into burst roasted cherry tomatoes and garlic, tossed with pasta and fresh basil in a white baking dish"
make grinder-sandwich "Italian grinder sandwich on a crusty hoagie roll loaded with salami, capicola, provolone and crisp shredded lettuce in a tangy mayo dressing, cut in half on a board"
make cottage-cheese-alfredo "Creamy high-protein cottage cheese alfredo pasta with sliced grilled chicken, cracked black pepper and parmesan, in a bowl"
make hot-honey-chicken "Crispy hot honey chicken, golden crunchy fried chicken pieces glazed and drizzled with glossy hot honey and red chili flakes, on a plate"
echo "ALL VIRAL2 DONE"; ls *.jpg | wc -l | xargs echo "total jpgs:"

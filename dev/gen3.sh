#!/bin/bash
cd ~/projects/poo-bears/img || exit 1
STYLE="overhead flat-lay, soft natural light, clean rustic surface, shallow depth of field, photorealistic, appetizing, editorial food photography, no text, no watermark, no logo"

make () {
  local name="$1" desc="$2"
  echo "=== $name ==="
  url=$(higgsfield generate create gpt_image_2 --prompt "$desc, $STYLE" --aspect_ratio "4:3" --quality high --resolution 2k --wait --wait-timeout 6m --json 2>/dev/null \
        | grep -oE 'https://d8j0ntlcm91z4[^"]*\.png' | head -1)
  if [ -n "$url" ]; then
    curl -s -o "${name}_raw.png" "$url"
    sips -s format jpeg -s formatOptions 82 -Z 1400 "${name}_raw.png" --out "${name}.jpg" >/dev/null 2>&1
    rm -f "${name}_raw.png"
    echo "got $name"
  else
    echo "FAILED $name"
  fi
}

make beef-tacos "Ground beef soft tacos in warm tortillas with shredded lettuce, cheddar, diced tomato and lime, on a plate"
make chicken-fajitas "Sheet pan chicken fajitas with charred colorful bell peppers and onions, warm flour tortillas and lime wedges"
make honey-garlic-shrimp "Honey garlic shrimp, glossy and caramelized with sesame seeds and scallions, over white rice in a bowl"
make smash-burger-tacos "Smash burger tacos, crispy smashed ground beef cooked into flour tortillas with melted American cheese, shredded lettuce, diced onion and creamy special sauce, stacked on a plate"
make sweet-potato-cottage-bowl "Sweet potato and cottage cheese bowl with seasoned ground beef, sliced avocado and a hot honey drizzle in a ceramic bowl"
make crispy-rice-salmon "Crispy rice with spicy salmon, golden pan-fried crispy rice squares topped with diced spicy salmon, avocado, a thin jalapeno slice, sesame and scallion, on a plate"
make marry-me-chicken "Marry me chicken, golden seared chicken thighs in a creamy sun-dried tomato parmesan sauce with fresh basil, in a cast iron skillet"

echo "ALL DONE"
ls *.jpg | wc -l | xargs echo "total jpgs:"

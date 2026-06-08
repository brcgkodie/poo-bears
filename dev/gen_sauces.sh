#!/bin/bash
cd ~/projects/poo-bears/img || exit 1
STYLE="in a small ceramic bowl with a spoon, a few key ingredients scattered nearby, overhead flat-lay, soft natural light, clean bright food photography, photorealistic, appetizing, no text, no watermark, no logo"

make () {
  local name="$1" desc="$2"
  echo "=== $name ==="
  url=$(higgsfield generate create gpt_image_2 --prompt "$desc, $STYLE" --aspect_ratio "4:3" --quality high --resolution 2k --wait --wait-timeout 6m --json 2>/dev/null \
        | grep -oE 'https://d8j0ntlcm91z4[^"]*\.png' | head -1)
  if [ -n "$url" ]; then
    curl -s -o "${name}_raw.png" "$url"
    sips -s format jpeg -s formatOptions 82 -Z 1100 "${name}_raw.png" --out "${name}.jpg" >/dev/null 2>&1
    rm -f "${name}_raw.png"; echo "got $name"
  else echo "FAILED $name"; fi
}

make yum-yum "Creamy pale peach Japanese hibachi yum yum white sauce in a small bowl, smooth and thick"
make bang-bang "Creamy pink-orange bang bang sauce with sweet chili and sriracha swirl in a small bowl"
make teriyaki-sauce "Glossy dark amber teriyaki sauce in a small bowl with sesame seeds and fresh ginger"
make gochujang-sauce "Deep red glossy Korean gochujang sauce in a small bowl with sesame seeds and scallion"
make peanut-sauce "Creamy Thai peanut sauce in a small bowl with crushed peanuts and a lime wedge"
make spicy-mayo "Smooth creamy orange spicy mayo in a small bowl with a drizzle of sriracha"
make chimichurri "Fresh bright green chimichurri sauce with chopped parsley, garlic and red chili flakes in a small bowl"
make garlic-tahini "Creamy beige garlic tahini sauce in a small bowl with a lemon wedge"
make cilantro-crema "Pale green cilantro lime crema in a small bowl with fresh cilantro and lime"
make nuoc-cham "Clear light Vietnamese nuoc cham dipping sauce with thin red chili rings and lime in a small bowl"

echo "ALL SAUCES DONE"; ls *.jpg | wc -l | xargs echo "total jpgs:"

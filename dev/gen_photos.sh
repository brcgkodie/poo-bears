#!/bin/bash
# Generate + download + optimize food photos for the new recipes.
cd ~/projects/poo-bears/img || exit 1
STYLE="overhead flat-lay, soft natural light, clean rustic surface, shallow depth of field, photorealistic, appetizing, editorial food photography, no text, no watermark, no logo"

declare -a JOBS=(
"korean-beef|Korean ground beef rice bowl with a glossy gochujang glaze, sesame seeds, sliced scallions, quick cucumber, a soft fried egg on top, in a ceramic bowl"
"beef-broccoli|Beef and broccoli stir fry, tender sliced steak and bright broccoli florets in a glossy dark brown sauce with sesame seeds, served over white rice in a bowl"
"thai-basil|Thai basil chicken pad krapow, sliced chicken with holy basil and red chili over jasmine rice, topped with a crispy fried egg"
"teriyaki-salmon|Teriyaki glazed salmon fillet, caramelized and shiny with sesame and scallions, over rice with steamed broccoli"
"mongolian-beef|Mongolian beef, crispy sliced flank steak in a dark glossy sauce with lots of scallions, over steamed rice in a bowl"
"pot-roast|Sunday pot roast, fork-tender beef chuck with carrots, baby potatoes and rich brown gravy in an orange dutch oven"
"beef-chili|Hearty beef and bean chili topped with shredded cheddar, a dollop of sour cream and scallions, in a rustic bowl"
"smash-burgers|Double smash cheeseburgers with crispy lacy edges, melted American cheese, lettuce and tomato on toasted brioche buns, with a side of fries"
"beef-tacos|Ground beef soft tacos in warm tortillas with lettuce, shredded cheese, diced tomato and lime, on a plate"
"chicken-fajitas|Sheet pan chicken fajitas with charred colorful bell peppers and onions, warm tortillas and lime wedges"
"honey-garlic-shrimp|Honey garlic shrimp, glossy and caramelized with sesame seeds and scallions, over white rice in a bowl"
)

for entry in "${JOBS[@]}"; do
  name="${entry%%|*}"
  desc="${entry#*|}"
  echo "creating $name ..."
  id=$(higgsfield generate create gpt_image_2 --prompt "$desc, $STYLE" --aspect_ratio "4:3" --quality high --resolution 2k --json 2>/dev/null \
       | grep -oE '"id"[: ]*"[a-f0-9-]{36}"' | head -1 | grep -oE '[a-f0-9-]{36}')
  echo "$name $id" >> /tmp/poo_jobs.txt
done

echo "all created, polling..."
while read -r name id; do
  [ -z "$id" ] && continue
  for i in $(seq 1 60); do
    out=$(higgsfield generate get "$id" --json 2>/dev/null)
    if echo "$out" | grep -q '"status"[: ]*"completed"'; then
      url=$(echo "$out" | grep -oE 'https://d8j0ntlcm91z4[^"]*\.png' | head -1)
      curl -s -o "${name}_raw.png" "$url"
      sips -s format jpeg -s formatOptions 82 -Z 1400 "${name}_raw.png" --out "${name}.jpg" >/dev/null 2>&1
      rm -f "${name}_raw.png"
      echo "done $name"
      break
    fi
    sleep 6
  done
done < /tmp/poo_jobs.txt
rm -f /tmp/poo_jobs.txt
echo "ALL PHOTOS DONE"
ls -la ~/projects/poo-bears/img/*.jpg | awk '{print $9, $5}'

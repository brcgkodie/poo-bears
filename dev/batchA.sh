#!/bin/bash
cd ~/projects/poo-bears/img || exit 1
S="overhead flat-lay, soft natural light, clean rustic surface, shallow depth of field, photorealistic, appetizing, editorial food photography, no text, no watermark, no logo"
mk(){ url=$(higgsfield generate create gpt_image_2 --prompt "$2, $S" --aspect_ratio "4:3" --quality high --resolution 2k --wait --wait-timeout 6m --json 2>/dev/null | grep -oE 'https://d8j0ntlcm91z4[^"]*\.png' | head -1); if [ -n "$url" ]; then curl -s -o "$1_raw.png" "$url"; sips -s format jpeg -s formatOptions 82 -Z 1400 "$1_raw.png" --out "$1.jpg" >/dev/null 2>&1; rm -f "$1_raw.png"; echo "got $1"; else echo "FAIL $1"; fi; }
mk gigi-pasta "Spicy vodka penne pasta (Gigi Hadid pasta) in a creamy blush-pink sauce with parmesan and fresh basil, in a bowl"
mk birria-tacos "Birria quesabirria tacos, crispy cheesy red-stained tacos with shredded beef, with a cup of red consomme for dipping, on a plate"
mk french-onion-chicken "French onion chicken, seared chicken smothered in deeply caramelized onions and bubbling melted gruyere in a skillet"
mk steak-bites "Garlic butter steak bites, seared cubes of sirloin glistening in garlic herb butter, in a black cast iron skillet"
mk bang-bang-chicken "Bang bang chicken, crispy fried chicken bites tossed in creamy pink-orange bang bang sauce with scallions, on a plate"
mk chicken-parm "Chicken parmesan, crispy breaded chicken cutlet topped with marinara and melted mozzarella over a nest of spaghetti"
mk street-corn-chicken-bowl "Mexican street corn chicken bowl, grilled chicken with charred elote corn, cotija cheese, lime and cilantro over rice in a bowl"
mk cajun-chicken-pasta "Creamy cajun chicken pasta with blackened sliced chicken, bell peppers and penne in a spicy cream sauce, in a bowl"
mk comeback-sauce "Creamy pale orange Southern comeback dipping sauce in a small bowl with a spoon"
mk garlic-herb-butter "Melted golden garlic herb compound butter with flecks of fresh herbs in a small bowl"
echo "BATCH A DONE"

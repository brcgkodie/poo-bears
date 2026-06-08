#!/bin/bash
cd ~/projects/poo-bears/img || exit 1
S="overhead flat-lay, soft natural light, clean rustic surface, shallow depth of field, photorealistic, appetizing, editorial food photography, no text, no watermark, no logo"
mk(){ url=$(higgsfield generate create gpt_image_2 --prompt "$2, $S" --aspect_ratio "4:3" --quality high --resolution 2k --wait --wait-timeout 6m --json 2>/dev/null | grep -oE 'https://d8j0ntlcm91z4[^"]*\.png' | head -1); if [ -n "$url" ]; then curl -s -o "$1_raw.png" "$url"; sips -s format jpeg -s formatOptions 82 -Z 1400 "$1_raw.png" --out "$1.jpg" >/dev/null 2>&1; rm -f "$1_raw.png"; echo "got $1"; else echo "FAIL $1"; fi; }
mk chili-garlic-noodles "Crispy chili garlic noodles, glossy noodles tossed in red chili crisp and garlic with scallions and sesame, in a bowl"
mk honey-garlic-salmon-bites "Honey garlic salmon bites, crispy glazed cubes of salmon with sesame and scallions over white rice in a bowl"
mk philly-cheesesteak "Philly cheesesteak, thinly sliced beef with melted cheese, peppers and onions piled in a toasted hoagie roll"
mk sticky-asian-meatballs "Sticky asian glazed beef meatballs shiny with sauce, sesame and scallions, over rice in a bowl"
mk sheet-pan-gnocchi "Crispy roasted sheet pan gnocchi with burst cherry tomatoes, zucchini and bell peppers, herbs scattered"
mk coconut-curry-chicken "Thai red coconut curry chicken with vegetables over jasmine rice in a bowl, cilantro and lime"
mk carne-asada "Grilled carne asada, sliced charred flank steak with lime and cilantro on a wooden board with charred lime halves"
mk marinara "Rustic homemade marinara tomato sauce with fresh basil in a small bowl"
mk chipotle-crema "Smoky orange chipotle crema sauce in a small bowl with a lime wedge"
mk honey-mustard "Creamy golden honey mustard sauce in a small bowl"
echo "BATCH B DONE"

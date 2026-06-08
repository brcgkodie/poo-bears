const fs = require('fs');
const path = '/Users/kodiecritzer/projects/poo-bears/index.html';
let f = fs.readFileSync(path, 'utf8');

// helpers identical to the app
const G=(n,dept,wf,q,a,u)=>({a,u:u||"",n,src:"wf",dept,wf,q});
const F=(n,a,u)=>({a,u:u||"",n,src:"farm",dept:"Freezer · Tiffin Farm"});
const P=(n,a,u)=>({a,u:u||"",n,src:"pantry",dept:"Pantry"});

// extract + eval current R
const m = f.match(/const R=\[[\s\S]*?\n\];/);
let R; eval(m[0].replace('const ',''));

// side + tips for existing recipes
const ADD = {
 "korean-beef":{side:"Steamed dumplings or a quick cucumber-sesame salad",tips:["Use 90/10 beef so the sauce doesn't turn greasy.","Gochujang heat varies — start with 1 tbsp and build.","Double the sauce if you like it saucier over rice."]},
 "beef-broccoli":{side:"Steamed jasmine rice and a few pot stickers",tips:["Slice the beef while it's partly frozen for paper-thin pieces.","Don't crowd the wok — sear in batches or it steams.","A splash of water under a lid steams the broccoli fast."]},
 "thai-basil":{side:"Jasmine rice and a crispy fried egg (do both)",tips:["Holy or Thai basil is best, but regular basil works.","Fold the basil in off the heat so it stays vibrant.","Fish sauce is essential — don't skip it."]},
 "teriyaki-salmon":{side:"Steamed rice and roasted broccoli or edamame",tips:["Sockeye is lean — pull it at 125°F so it stays moist.","Reduce the extra teriyaki to a glaze for max shine.","Cook skin-side down first to keep the fillet intact."]},
 "mongolian-beef":{side:"Steamed rice and sauteed snap peas",tips:["The cornstarch crust is what makes it taste takeout-style.","Cut against the grain for tenderness.","Add the scallions at the very end so they stay bright."]},
 "smash-burgers":{side:"Crispy fries or a simple side salad",tips:["Loose 2-3 oz balls smash thinner and crisp better.","Don't move the patty for 2 minutes — that's the crust forming.","Make the Shack sauce ahead so the flavors meld."]},
 "grilled-ny-strip":{side:"Roasted potatoes and grilled asparagus, or a wedge salad",tips:["Salt 40 minutes ahead and bring to room temperature.","Rest 5-10 minutes before slicing or you lose the juices.","Always slice against the grain."]},
 "beef-tacos":{side:"Cilantro-lime rice and black beans, or chips and guac",tips:["A splash of water with the spices makes a glaze, not dry crumbles.","Char the tortillas over a flame for big flavor.","Leftover chili or pot-roast beef works here too."]},
 "chicken-fajitas":{side:"Cilantro-lime rice, black beans and the cilantro-lime crema (Sauces)",tips:["Spread in one layer so it roasts instead of steams.","Thighs stay juicier than breast on a sheet pan.","Warm the tortillas in the last 2 minutes."]},
 "honey-garlic-shrimp":{side:"Steamed rice and a quick cucumber salad or broccoli",tips:["Pat the shrimp bone-dry so they sear, not steam.","Have everything ready — shrimp cook in 3-4 minutes total.","Pull them the moment they turn opaque."]},
 "smash-burger-tacos":{side:"Tater tots or a crunchy slaw",tips:["Press the beef hard into the tortilla so they fuse.","Flip to crisp the tortilla in the rendered beef fat.","Street-taco size tortillas are perfect."]},
 "sweet-potato-cottage-bowl":{side:"It's a full bowl — a handful of greens rounds it out",tips:["Air-fry the sweet potato for the fastest crispy edges.","Cold cottage cheese against warm potato is the magic.","Don't skip the hot honey — it ties it together."]},
 "crispy-rice-salmon":{side:"Edamame or a simple cucumber salad",tips:["Chill the pressed rice fully or it won't hold when frying.","Use sushi-grade salmon since it stays raw.","Fry hard in a thin layer of oil for max crunch."]},
 "marry-me-chicken":{side:"Buttered pasta or crusty bread, plus a green salad or roasted broccoli",tips:["Thighs stay juicier than breasts in the cream sauce.","Keep it at a gentle simmer — boiling can break the cream.","Sear in the sun-dried tomato oil for even more flavor."]},
 "pot-roast":{side:"The potatoes and carrots cook right in — add crusty bread or a green salad",tips:["Searing the roast first is where the flavor comes from.","Low and slow beats high — 8 hours on low is ideal.","Save leftovers for incredible tacos or sandwiches."]},
 "beef-chili":{side:"Cornbread, rice, or over a baked potato — cheese and sour cream on top",tips:["Scrape the pot bottom clean before sealing to avoid a burn warning.","Bloom the spices in the fat for deeper flavor.","Even better the next day; it freezes great."]},
 "orzo":{side:"A simple green salad or crusty bread",tips:["Don't stir the orzo into the bottom or it scorches.","Blend the cottage cheese fully so the sauce is smooth.","It thickens as it sits — loosen leftovers with broth."]},
 "salmon":{side:"It's a full bowl — add miso soup or seaweed salad if you want",tips:["Rest the rice covered so it stays fluffy.","Don't overcrowd the air fryer or the salmon steams.","Reserve half the sauce for drizzling at the end."]},
 "teriyaki":{side:"Steamed edamame or a cucumber salad",tips:["Sear the thighs hard for color before saucing.","Don't boil after the cornstarch or the sauce thins.","Reserve unsauced chicken for the kids."]},
 "medi":{side:"Warm pita and a simple Greek salad",tips:["Marinate the thighs at least 20 minutes (longer is better).","Thin the tahini with cold water for a pourable drizzle.","Everything but the chicken is no-cook assembly."]},
};
R.forEach(r => { if (ADD[r.id]) { r.side = ADD[r.id].side; r.tips = ADD[r.id].tips; } });

// new viral recipes
const NEW = [
 {id:"mississippi-pot-roast",img:"img/mississippi-pot-roast.jpg",grad:"linear-gradient(150deg,#a06a3c,#4f2e16)",title:"Mississippi Pot Roast",cuisine:"Viral · American",app:"Crockpot",equip:"Crockpot",prep:"10 min",cook:"8 hr",base:6,kcal:540,pro:44,carb:28,fat:30,filt:["Beef"],tags:[{t:"Viral",c:"w"},{t:"Chuck roast",c:""},{t:"Crockpot",c:""}],
  side:"Mashed potatoes or buttered egg noodles, plus a green veg",
  ing:[F("chuck roast",3,"lb"),G("ranch seasoning packet","Condiments","Hidden Valley Ranch Seasoning","ranch seasoning packet",1,""),G("au jus / brown gravy packet","Condiments","McCormick Au Jus Gravy Mix","au jus gravy packet",1,""),P("butter (1 stick)",0.5,"cup"),G("pepperoncini peppers","Deli · Olives","Mezzetta Pepperoncini","pepperoncini",8,""),G("baby potatoes (optional)","Produce","Organic Baby Potatoes","organic baby potatoes",1.5,"lb")],
  steps:["Pat the chuck roast dry and set it in the crockpot. For deeper flavor, sear it hard on all sides in a hot pan first — worth the extra few minutes.","Sprinkle the ranch seasoning packet and the au jus (or brown gravy) packet evenly all over the roast.","Lay the whole stick of butter on top and scatter 6-8 pepperoncini peppers around it. Pour in about 1/4 cup of the pepperoncini brine — but no other liquid. The roast makes its own juices.","If using potatoes, tuck them around the roast now.","Cover and cook on LOW for 8 hours (or HIGH for about 5), until the beef shreds easily with a fork.","Shred the beef right in the buttery, tangy gravy and skim off any excess fat from the top.","Serve over mashed potatoes or egg noodles, spooning the gravy and a few peppers over the top."],
  kids:"Shredded buttery beef and mashed potatoes — naturally mild. Leave the peppers off theirs.",
  tips:["Don't add extra liquid — the magic is the roast's own juices plus butter and pepperoncini brine.","The pepperoncini add tang, not much heat — leave them whole.","Leftovers make unreal French dip sandwiches."],
  note:"The viral crockpot roast — ranch + au jus + butter + pepperoncini. A perfect use for a Tiffin chuck roast with almost zero effort."},

 {id:"baked-feta-pasta",img:"img/baked-feta-pasta.jpg",grad:"linear-gradient(150deg,#d98a6a,#9c3f4a)",title:"Baked Feta Pasta",cuisine:"Viral · Mediterranean",app:"Oven",equip:"Baking dish",prep:"5 min",cook:"35 min",base:6,kcal:480,pro:18,carb:62,fat:18,filt:["Quick"],tags:[{t:"Viral",c:"w"},{t:"Vegetarian",c:"g"},{t:"5-min prep",c:""}],
  side:"A green salad and garlic bread; add grilled chicken or shrimp for protein",
  ing:[G("cherry tomatoes","Produce","Organic Cherry Tomatoes","organic cherry tomatoes",2,"pints"),G("block of feta","Dairy","365 Organic Block Feta","block feta cheese",8,"oz"),P("olive oil",0.33,"cup"),G("garlic","Produce","Organic Garlic","organic garlic",4,"cloves"),G("fresh basil","Produce","Organic Basil","organic basil",0.5,"cup"),P("pasta (penne or rigatoni)",1,"lb"),P("red pepper flakes + salt",1,"")],
  steps:["Heat the oven to 400°F. Put the cherry tomatoes in a baking dish, nestle the block of feta in the center, and scatter the garlic cloves around. Pour the olive oil over everything, season with salt and red pepper flakes, and toss the tomatoes to coat (leave the feta sitting in the oil).","Bake 30-35 minutes, until the tomatoes burst and wrinkle and the feta is soft and golden at the edges.","Meanwhile, cook the pasta in well-salted water until al dente. Reserve a cup of pasta water, then drain.","Smash the roasted feta and tomatoes together right in the dish into a creamy sauce, mashing the soft garlic in too.","Add the drained pasta and toss, loosening with a splash of pasta water until the sauce is silky and coats every piece.","Tear in fresh basil, taste for salt, and serve."],
  kids:"Creamy tomato pasta — usually an easy yes. Skip the pepper flakes for them.",
  tips:["Toss the tomatoes in the oil so they roast instead of drying out.","Reserve pasta water — it makes the sauce cling.","Stir in grilled chicken, shrimp or chickpeas to make it a fuller meal."],
  note:"The original viral TikTok pasta. Five minutes of prep, then the oven does all the work."},

 {id:"grinder-sandwich",img:"img/grinder-sandwich.jpg",grad:"linear-gradient(150deg,#c98f44,#6b4a1c)",title:"Italian Grinder Sandwich",cuisine:"Viral · Italian-American",app:"No-cook",equip:"Just a knife and bowl",prep:"15 min",cook:"0 min",base:4,kcal:620,pro:30,carb:48,fat:36,filt:["Quick"],tags:[{t:"Viral",c:"w"},{t:"No-cook",c:""},{t:"Lunch / dinner",c:""}],
  side:"Kettle chips and a pickle, or a cup of tomato soup",
  ing:[G("hoagie / sub rolls","Bakery","Hoagie Rolls","hoagie sub rolls",4,""),G("Genoa salami","Deli","Genoa Salami","genoa salami",0.5,"lb"),G("capicola or deli ham","Deli","Capicola","capicola deli",0.5,"lb"),G("provolone","Deli","Provolone Cheese","provolone cheese",8,"slices"),G("shredded iceberg or romaine","Produce","Iceberg Lettuce","iceberg lettuce",0.5,""),G("red onion","Produce","Organic Red Onion","organic red onion",0.5,""),G("banana peppers","Deli · Olives","Banana Peppers","banana peppers jar",0.25,"cup"),P("mayo",0.33,"cup"),P("red wine vinegar, oregano, garlic powder",1,"")],
  steps:["Make the grinder salad: thinly shred the lettuce and red onion into a bowl. Add the banana peppers, mayo, a splash of red wine vinegar, oregano, garlic powder, salt and pepper. Toss until creamy and tangy.","Split the rolls open and layer in the salami, capicola and provolone.","Optional but great: slide the open-faced sandwiches under the broiler for 1-2 minutes to melt the cheese and toast the bread.","Pile the dressed grinder salad generously on top of the meat and cheese.","Close the sandwiches, press gently, slice in half on the diagonal, and serve."],
  kids:"Build theirs plain — ham and cheese on a roll, with the salad on the side to try.",
  tips:["The dressed salad on top is what makes it a grinder, not just a sub.","Broil for melty cheese and a crunchy roll.","Make the salad ahead, but assemble just before eating so the bread stays crisp."],
  note:"The viral chopped Italian grinder. No cooking, huge payoff — a great fast dinner or packed lunch."},

 {id:"cottage-cheese-alfredo",img:"img/cottage-cheese-alfredo.jpg",grad:"linear-gradient(150deg,#e0cf9a,#a89a5a)",title:"Cottage Cheese Alfredo",cuisine:"Viral · High-protein",app:"Blender",equip:"Ninja blender",prep:"10 min",cook:"15 min",base:5,kcal:520,pro:42,carb:52,fat:14,filt:["Chicken","Quick"],tags:[{t:"Viral",c:"w"},{t:"Cottage cheese",c:""},{t:"High protein",c:"g"}],
  side:"Roasted broccoli or a Caesar salad",
  ing:[G("cottage cheese","Dairy","Good Culture Organic Cottage Cheese","good culture cottage cheese",2,"cups"),G("parmesan, grated","Dairy","365 Parmigiano Reggiano","parmigiano reggiano",0.5,"cup"),G("garlic","Produce","Organic Garlic","organic garlic",2,"cloves"),P("pasta (fettuccine or penne)",1,"lb"),G("chicken thighs","Meat","365 Organic Boneless Skinless Chicken Thighs","365 organic boneless skinless chicken thighs",1.5,"lb"),P("olive oil + black pepper",1,"")],
  steps:["Bring a big pot of well-salted water to a boil for the pasta.","Season the chicken with salt and pepper and sear in a little olive oil until golden and cooked through, about 5 minutes per side. Rest, then slice.","Blend the cottage cheese, parmesan, garlic, a pinch of salt and lots of black pepper until completely smooth and creamy — give it a full minute so there are no curds.","Cook the pasta to al dente. Reserve a cup of pasta water, then drain.","Off the heat, toss the hot pasta with the blended sauce, loosening with pasta water a splash at a time until silky. Don't boil it or it can get grainy.","Fold in the sliced chicken, finish with more parmesan and black pepper, and serve."],
  kids:"Creamy noodles with chicken — high protein and mild. Usually a hit.",
  tips:["Blend the cottage cheese totally smooth — that's the whole trick.","Sauce off the heat so it stays creamy, not grainy.","Roughly 40g protein per serving with no heavy cream."],
  note:"The viral high-protein alfredo — blended cottage cheese stands in for cream. Right in your wheelhouse."},

 {id:"hot-honey-chicken",img:"img/hot-honey-chicken.jpg",grad:"linear-gradient(150deg,#e0a03a,#9c5a1a)",title:"Hot Honey Chicken",cuisine:"Viral · American",app:"Air Fryer",equip:"Air fryer",prep:"15 min",cook:"18 min",base:5,kcal:540,pro:40,carb:38,fat:22,filt:["Chicken","Quick"],tags:[{t:"Viral",c:"w"},{t:"Spicy-sweet",c:""},{t:"Air fryer",c:""}],
  side:"Buttery biscuits and a crunchy slaw, or serve it over rice",
  ing:[G("chicken thighs or tenders","Meat","365 Organic Boneless Skinless Chicken Thighs","365 organic boneless skinless chicken thighs",2,"lb"),P("flour + cornstarch",1,""),G("eggs","Dairy","Organic Eggs","organic eggs",2,""),P("paprika, garlic powder, cayenne, salt",1,""),G("hot honey","Condiments","Mike's Hot Honey","mikes hot honey",0.33,"cup"),P("butter",2,"tbsp")],
  steps:["Cut the chicken into large bite-size pieces. Set up a dredge: beaten eggs in one bowl, and flour mixed with cornstarch, paprika, garlic powder, cayenne and salt in another.","Dip each piece in egg, then press firmly into the seasoned flour to coat. For extra crunch, dip it back into the egg and flour a second time.","Spray or brush the pieces all over with oil (this is what makes them crisp) and air fry at 400°F for 16-18 minutes, flipping halfway, until deep golden and 165°F inside.","While the chicken cooks, warm the hot honey with the butter and a pinch of salt until glossy and pourable.","Toss the crispy chicken in the hot honey butter, or drizzle it over the top to keep them crispier.","Serve right away while crunchy."],
  kids:"Pull a few plain crispy pieces before the hot honey — basically chicken tenders. A little regular honey for them.",
  tips:["Cornstarch in the dredge is the secret to extra crunch.","Double-dredge for a thicker, craggier crust.","Drizzle instead of tossing if you want them to stay crispy longer."],
  note:"Sweet-heat crispy chicken, air-fried instead of deep-fried. Uses your Mike's Hot Honey."},
];
R.push(...NEW);

// serialize
const out = 'const R=[\n ' + R.map(o => JSON.stringify(o)).join(',\n ') + '\n];';
f = f.replace(m[0], out);
fs.writeFileSync(path, f);
console.log('patched. recipes now:', R.length);
console.log('all have side+tips:', R.every(r=>r.side&&r.tips));

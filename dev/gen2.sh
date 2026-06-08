#!/bin/bash
cd ~/projects/poo-bears/img || exit 1
STYLE="overhead flat-lay, soft natural light, clean rustic surface, shallow depth of field, photorealistic, appetizing, editorial food photography, no text, no watermark, no logo"

# create 4 new viral-recipe jobs
higgsfield generate create gpt_image_2 --prompt "Smash burger tacos: crispy smashed ground beef patties cooked right into flour tortillas with melted American cheese, shredded lettuce, diced white onion and a drizzle of creamy special sauce, stacked on a plate, $STYLE" --aspect_ratio "4:3" --quality high --resolution 2k >/dev/null 2>&1 &
higgsfield generate create gpt_image_2 --prompt "Viral sweet potato and cottage cheese bowl: roasted cubed sweet potato with seasoned ground beef, a scoop of cottage cheese, sliced avocado and a hot honey drizzle in a ceramic bowl, $STYLE" --aspect_ratio "4:3" --quality high --resolution 2k >/dev/null 2>&1 &
higgsfield generate create gpt_image_2 --prompt "Crispy rice with spicy salmon: golden pan-fried crispy rice squares topped with diced spicy salmon, avocado, a thin jalapeno slice, sesame and scallion, on a plate, $STYLE" --aspect_ratio "4:3" --quality high --resolution 2k >/dev/null 2>&1 &
higgsfield generate create gpt_image_2 --prompt "Marry me chicken: golden seared chicken thighs in a creamy sun-dried tomato parmesan sauce with fresh basil, in a cast iron skillet, $STYLE" --aspect_ratio "4:3" --quality high --resolution 2k >/dev/null 2>&1 &
wait
echo "4 new jobs created, polling for all 7..."

python3 - <<'PY'
import json,subprocess,time,os
kw={"beef-tacos":"soft tacos","chicken-fajitas":"fajitas","honey-garlic-shrimp":"garlic shrimp",
    "smash-burger-tacos":"smash burger tacos","sweet-potato-cottage-bowl":"cottage cheese bowl",
    "crispy-rice-salmon":"crispy rice","marry-me-chicken":"marry me"}
for _ in range(50):
    if not kw: break
    out=subprocess.run(["higgsfield","generate","list","--image","--size","14","--json"],capture_output=True,text=True).stdout
    try: data=json.loads(out)
    except: time.sleep(8); continue
    for j in data:
        if j.get("status")!="completed": continue
        p=j.get("params",{}).get("prompt","").lower()
        for name,k in list(kw.items()):
            if k in p:
                url=j.get("result_url")
                os.system(f'curl -s -o {name}_raw.png "{url}" && sips -s format jpeg -s formatOptions 82 -Z 1400 {name}_raw.png --out {name}.jpg >/dev/null 2>&1 && rm -f {name}_raw.png && echo got {name}')
                del kw[name]
                break
    if kw: time.sleep(8)
print("REMAINING:", list(kw.keys()) if kw else "none")
PY
echo "DONE"
ls *.jpg | wc -l | xargs echo "total jpgs:"

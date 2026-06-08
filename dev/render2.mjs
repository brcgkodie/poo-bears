import { chromium } from '/Users/kodiecritzer/.local/npm-global/lib/node_modules/playwright/index.mjs';
const b = await chromium.launch();
const base='file:///Users/kodiecritzer/projects/poo-bears';
async function shot(htmlUrl, size, out, transparent){
  const p = await b.newPage({ viewport:{width:size,height:size}, deviceScaleFactor:1 });
  await p.goto(htmlUrl);
  await p.evaluate(s=>{const i=document.getElementById('i');i.setAttribute('width',s);i.setAttribute('height',s);}, size);
  await p.waitForTimeout(120);
  await p.screenshot({ path: out, clip:{x:0,y:0,width:size,height:size}, omitBackground: !!transparent });
  await p.close();
}
await shot(base+'/dev/icon.html', 192, 'icons/icon-192.png', true);
await shot(base+'/dev/icon.html', 512, 'icons/icon-512.png', true);
await shot(base+'/dev/icon.html', 180, 'icons/apple-touch-icon.png', false);
await shot(base+'/dev/icon-maskable.html', 512, 'icons/icon-maskable-512.png', false);
await b.close();
console.log('icons rendered');

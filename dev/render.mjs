import { chromium } from '/Users/kodiecritzer/.local/npm-global/lib/node_modules/playwright/index.mjs';
const b = await chromium.launch();
const base='file:///Users/kodiecritzer/projects/poo-bears';

// ---- rasterize an SVG file to a PNG at given size ----
async function svgToPng(svgUrl, size, out){
  const p = await b.newPage({ viewport:{width:size,height:size}, deviceScaleFactor:1 });
  await p.goto(`data:text/html,<body style="margin:0"><img src="${svgUrl}" style="width:${size}px;height:${size}px;display:block">`);
  await p.waitForTimeout(150);
  await p.screenshot({ path: out, omitBackground:true });
  await p.close();
}
await svgToPng(base+'/favicon.svg', 512, '/tmp/icon-512.png');
await svgToPng(base+'/favicon.svg', 192, 'icons/icon-192.png');
await svgToPng(base+'/favicon.svg', 180, 'icons/apple-touch-icon.png');
await svgToPng(base+'/dev/maskable-src.svg', 512, 'icons/icon-maskable-512.png');
// 512 non-maskable
await svgToPng(base+'/favicon.svg', 512, 'icons/icon-512.png');

// ---- OG image ----
const p = await b.newPage({ viewport:{width:1200,height:630}, deviceScaleFactor:2 });
await p.goto(base+'/dev/og.html');
await p.waitForTimeout(1200); // fonts + images
await p.screenshot({ path: '/tmp/og-raw.png', clip:{x:0,y:0,width:1200,height:630} });
await p.close();
await b.close();
console.log('rendered');

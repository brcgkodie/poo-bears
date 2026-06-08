import { chromium } from '/Users/kodiecritzer/.local/npm-global/lib/node_modules/playwright/index.mjs';
const b = await chromium.launch();
const url='file:///Users/kodiecritzer/projects/poo-bears/index.html';
// MOBILE
let p = await b.newPage({ viewport:{width:414,height:896}, deviceScaleFactor:2 });
await p.goto(url); await p.evaluate(()=>localStorage.clear()); await p.reload(); await p.waitForTimeout(700);
await p.click('.tab[data-tab="recipes"]'); await p.waitForTimeout(500);
await p.screenshot({path:'/tmp/s_m_recipes.png'});
await p.click('#recipeGrid .rc'); await p.waitForTimeout(600);
await p.evaluate(()=>document.querySelector('#sheet').scrollTo(0,560));
await p.waitForTimeout(300); await p.screenshot({path:'/tmp/s_m_detail.png'});
await p.click('#closeX'); await p.waitForTimeout(300);
await p.click('.tab[data-tab="kitchen"]'); await p.waitForTimeout(300);
await p.click('#pantryWrap .pchip'); await p.waitForTimeout(300);
await p.evaluate(()=>window.scrollTo(0,0)); await p.screenshot({path:'/tmp/s_m_pantry.png'});
await p.close();
// DESKTOP
p = await b.newPage({ viewport:{width:1340,height:900}, deviceScaleFactor:1.5 });
await p.goto(url); await p.evaluate(()=>localStorage.clear()); await p.reload(); await p.waitForTimeout(700);
await p.screenshot({path:'/tmp/s_d_week.png'});
await p.click('.snav[data-tab="recipes"]'); await p.waitForTimeout(500);
await p.screenshot({path:'/tmp/s_d_recipes.png'});
await p.click('#recipeGrid .rc'); await p.waitForTimeout(600);
await p.screenshot({path:'/tmp/s_d_detail.png'});
await p.close();
await b.close();
console.log('done');

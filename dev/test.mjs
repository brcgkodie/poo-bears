import { chromium } from '/Users/kodiecritzer/.local/npm-global/lib/node_modules/playwright/index.mjs';

const browser = await chromium.launch();
const log = [];

async function run(label, viewport) {
  const errs = [];
  const page = await browser.newPage({ viewport });
  await page.addInitScript(() => { window.print = () => { window.__printed = (window.__printed||0)+1; }; });
  page.on('pageerror', e => errs.push('PAGEERROR: ' + e.message));
  page.on('console', m => { if (m.type() === 'error' && !m.text().includes('ERR_FILE_NOT_FOUND')) errs.push('CONSOLE: ' + m.text()); });
  await page.goto('file:///Users/kodiecritzer/projects/poo-bears/index.html');
  await page.evaluate(() => { localStorage.clear(); localStorage.setItem('pb_ok','1'); });
  await page.reload();
  await page.waitForTimeout(400);

  const navSel = viewport.width >= 880 ? '.snav' : '.tab';
  const res = [];
  const check = async (l, fn) => { try { const r = await fn(); res.push(`  OK  ${l}${r?': '+r:''}`); } catch (e) { res.push(`  FAIL ${l}: ${e.message.split('\n')[0]}`); } };

  for (const t of ['recipes','sauces','kitchen','week']) {
    await check('nav '+t, async () => { await page.click(`${navSel}[data-tab="${t}"]`); await page.waitForTimeout(120); if(!await page.isVisible(`#view-${t}.on`)) throw new Error('not active'); });
  }
  await page.click(`${navSel}[data-tab="recipes"]`); await page.waitForTimeout(120);
  await check('filter Beef', async()=>{ await page.click('#filters .chip:has-text("Beef")'); await page.waitForTimeout(100); return (await page.$$('#recipeGrid .rc, #recipeGrid .feature')).length+' cards'; });
  await page.click('#filters .chip:has-text("All")'); await page.waitForTimeout(100);
  await check('open recipe', async()=>{ await page.click('#recipeGrid .rc'); await page.waitForTimeout(300); if(!await page.isVisible('#sheet.on')) throw new Error('sheet closed'); return await page.textContent('#sheetInner h2'); });
  await check('scaler +', async()=>{ const b=await page.textContent('.scaler .v'); await page.click('.scaler button[data-d="1"]'); await page.waitForTimeout(120); const a=await page.textContent('.scaler .v'); if(a===b) throw new Error('no change'); return b+'->'+a; });
  await check('scaler -', async()=>{ await page.click('.scaler button[data-d="-1"]'); await page.waitForTimeout(120); });
  await check('Save PDF', async()=>{ await page.click('#printR'); await page.waitForTimeout(100); if(!await page.evaluate(()=>window.__printed)) throw new Error('print not called'); });
  await check('add to week', async()=>{ await page.click('#addWeek'); await page.waitForTimeout(200); if(await page.isVisible('#sheet.on')) throw new Error('did not close'); });
  await check('week badge=1', async()=>{ if(await page.textContent('#weekBadge')!=='1') throw new Error('badge wrong'); });
  await page.click(`${navSel}[data-tab="sauces"]`); await page.waitForTimeout(120);
  await check('open sauce', async()=>{ await page.click('#sauceGrid .rc'); await page.waitForTimeout(300); if(!await page.isVisible('#sheet.on')) throw new Error('sheet closed'); return await page.textContent('#sheetInner h2'); });
  await check('sauce Save PDF', async()=>{ await page.click('#printS'); await page.waitForTimeout(100); });
  await check('close X', async()=>{ await page.click('#closeX'); await page.waitForTimeout(200); if(await page.isVisible('#sheet.on')) throw new Error('did not close'); });
  await page.click(`${navSel}[data-tab="week"]`); await page.waitForTimeout(120);
  await check('week thumb opens', async()=>{ await page.click('#weekList .wthumb'); await page.waitForTimeout(250); if(!await page.isVisible('#sheet.on')) throw new Error('no open'); await page.click('#closeX'); await page.waitForTimeout(150); });
  await check('build grocery', async()=>{ await page.click('#genBtn'); await page.waitForTimeout(250); if(!await page.isVisible('#sheet.on')) throw new Error('no sheet'); return (await page.$$('#sheetInner .gitem')).length+' items'; });
  await check('check item', async()=>{ await page.click('#sheetInner .gitem .gck'); await page.waitForTimeout(80); if(!await page.evaluate(()=>document.querySelector('#sheetInner .gitem').classList.contains('done'))) throw new Error('no toggle'); });
  await check('grocery done', async()=>{ await page.click('#closeG'); await page.waitForTimeout(150); if(await page.isVisible('#sheet.on')) throw new Error('no close'); });
  await page.click(`${navSel}[data-tab="week"]`); await page.waitForTimeout(120);
  await check('freezer +', async()=>{ const b=await page.textContent('#q-ground'); await page.click('#beefCard .step button[data-d="1"]'); await page.waitForTimeout(100); const a=await page.textContent('#q-ground'); if(a===b) throw new Error('no change'); return b+'->'+a; });
  await check('freezer -', async()=>{ await page.click('#beefCard .step button[data-d="-1"]'); await page.waitForTimeout(100); });
  await page.click(`${navSel}[data-tab="kitchen"]`); await page.waitForTimeout(120);
  await check('flag pantry', async()=>{ await page.click('#pantryWrap .pchip'); await page.waitForTimeout(150); if(!await page.isVisible('#pantryWrap .restock')) throw new Error('no restock card'); });
  await check('unflag pantry', async()=>{ await page.click('#pantryWrap .pchip.out'); await page.waitForTimeout(150); });
  await check('persist reload', async()=>{ await page.reload(); await page.waitForTimeout(400); if(await page.textContent('#weekBadge')!=='1') throw new Error('not persisted'); });

  log.push(`\n=== ${label} (${viewport.width}x${viewport.height}) ===`);
  log.push(res.join('\n'));
  log.push(`  ERRORS: ${errs.length ? '\n   '+errs.join('\n   ') : 'none'}`);
  await page.close();
}

await run('MOBILE', { width: 414, height: 896 });
await run('DESKTOP', { width: 1280, height: 900 });
console.log(log.join('\n'));
await browser.close();

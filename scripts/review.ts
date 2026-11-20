import {mkdir,writeFile} from 'node:fs/promises';
import {launchBrowser} from './browser';
const origin=process.env.REVIEW_URL||'http://127.0.0.1:5198';
await mkdir('tmp/qa',{recursive:true});await mkdir('static/downloads',{recursive:true});
const browser=await launchBrowser(),page=await browser.newPage({viewport:{width:1440,height:1100}});
const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
async function ready(){await page.evaluate(()=>document.querySelectorAll('img').forEach(i=>i.loading='eager'));await page.evaluate(()=>document.fonts.ready);await page.waitForFunction(()=>Array.from(document.images).every(i=>i.complete));const broken=await page.evaluate(()=>Array.from(document.images).filter(i=>!i.naturalWidth).map(i=>i.src));if(broken.length)throw new Error(`Broken artwork: ${broken}`);}
async function overflow(){return page.locator('[data-fit]').evaluateAll(nodes=>nodes.filter(n=>n.scrollHeight>n.clientHeight+2||n.scrollWidth>n.clientWidth+2).map(n=>({id:n.closest('[data-card-id]')?.getAttribute('data-card-id'),region:n.getAttribute('data-fit'),height:n.clientHeight,scroll:n.scrollHeight})));}
async function pdf(name:string){await ready();await page.emulateMedia({media:'print'});await page.pdf({path:`static/downloads/${name}.pdf`,preferCSSPageSize:true,printBackground:true,displayHeaderFooter:false});await page.emulateMedia({media:'screen'});}
await page.goto(origin);await ready();await page.screenshot({path:'tmp/qa/home-desktop.png'});
await page.goto(`${origin}/gallery`);await ready();
const allCount=await page.locator('.gallery-item').count();
const cardOverflow=await overflow();
await page.screenshot({path:'tmp/qa/gallery-desktop.png',fullPage:true});
await page.getByRole('button',{name:'Inspect Raphael',exact:true}).click();await page.getByRole('dialog').waitFor({state:'visible'});await page.screenshot({path:'tmp/qa/inspector.png'});await page.keyboard.press('Escape');
await page.getByRole('button',{name:'Decrees · 10',exact:true}).click();const decreeCount=await page.locator('.gallery-item').count();
await page.getByLabel('Search',{exact:true}).fill('Mirror');const searchCount=await page.locator('.gallery-item').count();
await page.getByLabel('Search',{exact:true}).fill('');await page.getByLabel('Show card backs',{exact:true}).check();const backCount=await page.locator('.game-card.back').count();
await page.getByRole('button',{name:'All cards · 27',exact:true}).click();await page.getByLabel('Show card backs',{exact:true}).uncheck();
await page.setViewportSize({width:390,height:844});await page.screenshot({path:'tmp/qa/gallery-mobile.png'});const mobileGalleryOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
await page.goto(`${origin}/rules.html`);await ready();await page.screenshot({path:'tmp/qa/rules-mobile.png'});const mobileRulesOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
await page.setViewportSize({width:1440,height:1100});await page.screenshot({path:'tmp/qa/rules-desktop.png'});const lessons=await page.locator('.learn-page').count();const referenceHeadings=await page.locator('.reference-book h2').count();
await pdf('heavens-gate-rulebook');await page.evaluate(()=>document.body.dataset.rulePaper='letter');await pdf('heavens-gate-rulebook-letter');await page.evaluate(()=>delete document.body.dataset.rulePaper);
await page.goto(`${origin}/gallery/print`);await ready();await page.screenshot({path:'tmp/qa/print-desktop.png'});
const printOverflows=[];
for(const paper of ['a4','letter']){
 await page.getByRole('combobox',{name:'Paper',exact:true}).selectOption(paper);
 for(const [value,label] of [['false','color'],['true','low-ink']]){
  await page.getByRole('combobox',{name:'Artwork',exact:true}).selectOption(value);await ready();
  await page.emulateMedia({media:'print'});const failures=await overflow();printOverflows.push({paper,style:label,failures});await page.emulateMedia({media:'screen'});
  await pdf(`heavens-gate-cards-${paper}-${label}`);
 }
 if(paper==='a4'){await page.getByRole('combobox',{name:'Artwork',exact:true}).selectOption('false');await page.getByRole('combobox',{name:'Print sides',exact:true}).selectOption('front');await pdf('heavens-gate-cards-a4-fronts');await page.getByRole('combobox',{name:'Print sides',exact:true}).selectOption('both');}
 await page.getByRole('combobox',{name:'Components',exact:true}).selectOption('accessories');
 await pdf(`heavens-gate-accessories-${paper}`);
 await page.getByRole('combobox',{name:'Components',exact:true}).selectOption('cards');
}
await page.setViewportSize({width:390,height:844});await page.screenshot({path:'tmp/qa/print-mobile.png'});const mobilePrintOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
const report={errors,allCount,decreeCount,searchCount,backCount,cardOverflow,printOverflows,mobileGalleryOverflow,mobileRulesOverflow,mobilePrintOverflow,lessons,referenceHeadings};
await writeFile('tmp/qa/report.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));await browser.close();
if(errors.length||allCount!==27||decreeCount!==10||searchCount!==1||backCount!==10||cardOverflow.length||printOverflows.some(s=>s.failures.length)||mobileGalleryOverflow||mobileRulesOverflow||mobilePrintOverflow||lessons!==5||referenceHeadings!==10)process.exit(1);

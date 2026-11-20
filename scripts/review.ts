import {mkdir,writeFile} from 'node:fs/promises';
import {launchBrowser} from './browser';
import {allCards} from '../src/lib/data/game';
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
const faceText=await page.locator('.gallery-item .effect').allTextContents();
const briefOnly=faceText.length===allCards.length&&faceText.every((text,i)=>text===allCards[i].brief);
const footers=await page.locator('.gallery-item footer').allTextContents();
const numberedSet=footers.length===allCards.length&&footers.every((text,i)=>text.includes("Higher Powers")&&text.includes(`${allCards[i].code} · ${i+1} of ${allCards.length}`));
const cardOverflow=await overflow();
await page.screenshot({path:'tmp/qa/gallery-desktop.png',fullPage:true});
await page.getByRole('button',{name:'Inspect Raphael',exact:true}).click();await page.getByRole('dialog').waitFor({state:'visible'});await page.screenshot({path:'tmp/qa/inspector.png'});await page.keyboard.press('Escape');
await page.getByRole('button',{name:'Decrees · 10',exact:true}).click();const decreeCount=await page.locator('.gallery-item').count();
await page.getByLabel('Search',{exact:true}).fill('Mirror');const searchCount=await page.locator('.gallery-item').count();
await page.getByLabel('Search',{exact:true}).fill('');await page.getByLabel('Show card backs',{exact:true}).check();const backCount=await page.locator('.game-card.back').count();
await page.getByRole('button',{name:'All cards · 27',exact:true}).click();await ready();
const paintedBacks=await page.locator('.game-card.back').evaluateAll(cards=>({images:new Set(cards.map(c=>c.querySelector('img')?.getAttribute('src'))).size,text:cards.some(c=>c.textContent?.trim()),overlays:cards.some(c=>Array.from(c.children).some(n=>n.tagName!=='IMG'))}));
await page.screenshot({path:'tmp/qa/painted-backs-desktop.png',fullPage:true});
await page.getByLabel('Show card backs',{exact:true}).uncheck();
await page.setViewportSize({width:390,height:844});await page.screenshot({path:'tmp/qa/gallery-mobile.png'});const mobileGalleryOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
await page.goto(`${origin}/rules.html`);await ready();await page.screenshot({path:'tmp/qa/rules-mobile.png'});const mobileRulesOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
await page.setViewportSize({width:1440,height:1100});await page.screenshot({path:'tmp/qa/rules-desktop.png'});const lessons=await page.locator('.learn-page').count();const referenceHeadings=await page.locator('.reference-book h2').count();
await pdf('higher-powers-rulebook');await page.evaluate(()=>document.body.dataset.rulePaper='letter');await pdf('higher-powers-rulebook-letter');await page.evaluate(()=>delete document.body.dataset.rulePaper);
await page.goto(`${origin}/gallery/print`);await page.locator('.print-main[data-ready=true]').waitFor();await ready();await page.screenshot({path:'tmp/qa/print-desktop.png'});
const printOverflows=[];
const accessoryLayoutFailures=[];
for(const paper of ['a4','letter']){
 await page.getByRole('combobox',{name:'Paper',exact:true}).selectOption(paper);
 for(const [value,label] of [['false','color'],['true','low-ink']]){
  await page.getByRole('combobox',{name:'Artwork',exact:true}).selectOption(value);await ready();
  await page.emulateMedia({media:'print'});const failures=await overflow();printOverflows.push({paper,style:label,failures});await page.emulateMedia({media:'screen'});
  await pdf(`higher-powers-cards-${paper}-${label}`);
 }
 if(paper==='a4'){await page.getByRole('combobox',{name:'Artwork',exact:true}).selectOption('false');await page.getByRole('combobox',{name:'Print sides',exact:true}).selectOption('front');await pdf('higher-powers-cards-a4-fronts');await page.getByRole('combobox',{name:'Print sides',exact:true}).selectOption('both');}
 await page.getByRole('combobox',{name:'Components',exact:true}).selectOption('accessories');
 await page.locator('.sheets[data-kit=accessories]').waitFor();
 await page.getByRole('combobox',{name:'Artwork',exact:true}).selectOption('true');
 if(await page.locator('.sheets .game-card').count())throw new Error('Accessories must not contain cards');
 if(await page.locator('.accessory-sheet .zone-mat').count()!==2)throw new Error('Both Sanctuary Angels require region mats');
 await page.emulateMedia({media:'print'});
 const badTracks=await page.locator('.accessory-sheet').evaluateAll(sheets=>sheets.map((sheet,i)=>{const tracks=Array.from(sheet.querySelectorAll('.favor-track')).map(t=>t.getBoundingClientRect());return tracks.length>1&&(Math.abs(tracks[0].left-tracks[1].left)>1||tracks[1].top<tracks[0].bottom)?i:null;}).filter(i=>i!==null));
 accessoryLayoutFailures.push(...badTracks.map(sheet=>({paper,sheet})));
 await page.emulateMedia({media:'screen'});
 await pdf(`higher-powers-accessories-${paper}`);
 await page.getByRole('combobox',{name:'Components',exact:true}).selectOption('cards');
}
await page.setViewportSize({width:390,height:844});await page.screenshot({path:'tmp/qa/print-mobile.png'});const mobilePrintOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
const report={errors,briefOnly,numberedSet,paintedBacks,allCount,decreeCount,searchCount,backCount,cardOverflow,printOverflows,accessoryLayoutFailures,mobileGalleryOverflow,mobileRulesOverflow,mobilePrintOverflow,lessons,referenceHeadings};
await writeFile('tmp/qa/report.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));await browser.close();
if(errors.length||!briefOnly||!numberedSet||paintedBacks.images!==3||paintedBacks.text||paintedBacks.overlays||allCount!==27||decreeCount!==10||searchCount!==1||backCount!==10||cardOverflow.length||printOverflows.some(s=>s.failures.length)||accessoryLayoutFailures.length||mobileGalleryOverflow||mobileRulesOverflow||mobilePrintOverflow||lessons!==5||referenceHeadings!==10)process.exit(1);

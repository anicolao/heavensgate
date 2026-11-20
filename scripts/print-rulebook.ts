import {mkdir} from 'node:fs/promises';
import {launchBrowser} from './browser';

const origin=process.env.REVIEW_URL||'http://127.0.0.1:5198';
await mkdir('static/downloads',{recursive:true});
const browser=await launchBrowser();
try{
 const page=await browser.newPage({viewport:{width:1440,height:1100}});
 await page.goto(`${origin}/rules.html`);
 await page.evaluate(()=>document.querySelectorAll('img').forEach(i=>i.loading='eager'));
 await page.evaluate(()=>document.fonts.ready);
 await page.waitForFunction(()=>Array.from(document.images).every(i=>i.complete));
 const broken=await page.evaluate(()=>Array.from(document.images).filter(i=>!i.naturalWidth).map(i=>i.src));
 if(broken.length)throw new Error(`Broken rulebook illustrations: ${broken}`);
 const reference=await page.locator('.reference-book').innerText();
 if(!reference.includes('opening meld')||!reference.includes('two to each player'))throw new Error('Rulebook is missing the current setup or opening clarification');
 await page.emulateMedia({media:'print'});
 for(const paper of ['a4','letter']){
  await page.evaluate(paper=>{if(paper==='letter')document.body.dataset.rulePaper='letter';else delete document.body.dataset.rulePaper;},paper);
  const overflow=await page.locator('.learn-page:not(.cover-page)').evaluateAll(pages=>pages.filter(p=>p.scrollHeight>p.clientHeight+2).map(p=>p.getAttribute('data-page')));
  if(overflow.length)throw new Error(`${paper} teaching pages overflow: ${overflow}`);
  const path=`static/downloads/heavens-gate-rulebook${paper==='letter'?'-letter':''}.pdf`;
  await page.pdf({path,preferCSSPageSize:true,printBackground:true,displayHeaderFooter:false});
  console.log(`Exported ${path}`);
 }
}finally{await browser.close();}

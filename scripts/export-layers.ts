import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {allCards,cardTotal,type Card} from '../src/lib/data/game';
import {launchBrowser} from './browser';
const base=process.env.REVIEW_URL||'http://127.0.0.1:5198';
const browser=await launchBrowser(),page=await browser.newPage();
await page.goto(`${base}/gallery`);await page.evaluate(()=>document.fonts.ready);
const xml=(s:string)=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const image=async(id:string)=>`data:image/webp;base64,${(await readFile(`static/art/cards/${id}.webp`)).toString('base64')}`;
const background=await image('heaven-background'),frame=await image('frame');
const bodyFont=(await readFile('node_modules/@fontsource/atkinson-hyperlegible/files/atkinson-hyperlegible-latin-400-normal.woff2')).toString('base64');
const effectFont=(await readFile('node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff2')).toString('base64');
const titleFont=(await readFile('node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-700-normal.woff2')).toString('base64');
const fonts=`<defs><style>@font-face{font-family:'Atkinson Hyperlegible';src:url(data:font/woff2;base64,${bodyFont}) format('woff2');font-weight:400}@font-face{font-family:'Cormorant Garamond';src:url(data:font/woff2;base64,${titleFont}) format('woff2');font-weight:700}@font-face{font-family:'Cormorant Garamond';src:url(data:font/woff2;base64,${effectFont}) format('woff2');font-weight:600}</style></defs>`;
const layer=(id:string,name:string,content:string)=>`<g id="${id}" inkscape:groupmode="layer" inkscape:label="${name}">${content}</g>`;
async function lines(text:string,font:string,width:number){return page.evaluate(({text,font,width})=>{const ctx=document.createElement('canvas').getContext('2d')!;ctx.font=font;const result:string[]=[];let current='';for(const word of text.split(/\s+/)){const trial=current?current+' '+word:word;if(current&&ctx.measureText(trial).width>width){result.push(current);current=word;}else current=trial;}if(current)result.push(current);return result;},{text,font,width});}
const text=(content:string,x:number,y:number,size:number,extra='')=>`<text x="${x}" y="${y}" font-size="${size}" ${extra}>${xml(content)}</text>`;
await mkdir('static/art/layers',{recursive:true});
for(const c of allCards){
 const subject=await image(c.id),dense=c.brief.length>310;
 const top=dense?343:405,bodySize=dense?43.47:45.36;
 const titleSize=c.kind==='angel'?40.95:37.17;
 let title=await lines(c.name,`700 ${titleSize}px "Cormorant Garamond"`,504);
 let letter=text(c.kind==='angel'?'ANGEL':c.kind==='decree'?'HEAVENLY DECREE':'FINAL JUDGMENT',315,91,14,'text-anchor="middle" letter-spacing="2" font-weight="bold" fill="#785c2b"');
 title.forEach((line,i)=>letter+=text(line,315,130+i*titleSize*.95,titleSize,'text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-weight="bold"'));
 letter+=`<rect x="50" y="${top}" width="530" height="${784-top}" rx="7.5" ry="7.5" fill="#fff9ec" fill-opacity=".97"/><path d="M 57.5 ${top} H 572.5" stroke="#ad9255"/>`;
 let y=top+25.2;
 if(c.kind==='angel'){
  letter+=text(c.title,315,y+24,31.5,'text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-weight="700"');
  y+=31.5+8.82;
 }
 letter+=text(c.timing.toUpperCase(),315,y+14,15.12,'text-anchor="middle" font-weight="bold" fill="#735829"');
 y+=17.388+12.6;
 const body=await lines(c.brief,`600 ${bodySize}px "Cormorant Garamond"`,473);
 body.forEach((line,i)=>letter+=text(line,315,y+33+i*bodySize*1.08,bodySize,'text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-weight="600"'));
 if(y+33+(body.length-1)*bodySize*1.08+12>784-25.2)throw new Error(`SVG copy exceeds panel margins: ${c.id}`);
 letter+=`<path d="M 101 820 H 529" stroke="#c7b68e"/>`+text("Heaven's Gate",101,845,13.2,'font-weight="bold"')+text(`${c.code} · ${c.number} of ${cardTotal}`,529,845,13.2,'text-anchor="end" font-weight="bold"');
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" width="63mm" height="88mm" viewBox="0 0 630 880">${fonts}<title>${xml(c.name)} — Heaven’s Gate layered source</title><desc>GPL-3.0-only. Independent paper, painted background, transparent illustration, editable live typography, and transparent ornamental frame. Generated with built-in image_gen; exact prompts in art/prompts.json.</desc>${layer('paper','01 · Paper','<rect width="630" height="880" fill="#fff9ec"/>')}${layer('background','02 · Painted Heaven',`<image href="${background}" width="630" height="880" preserveAspectRatio="xMidYMid slice" opacity=".52"/>`)}${layer('illustration','03 · Painted illustration',`<image href="${subject}" x="31" y="158" width="568" height="${dense?176:238}" preserveAspectRatio="xMidYMax meet"/>`)}${layer('typography','04 · Editable typography',`<g fill="#342818" font-family="Atkinson Hyperlegible, sans-serif">${letter}</g>`)}${layer('frame','05 · Gold frame',`<image href="${frame}" width="630" height="880" preserveAspectRatio="none"/>`)}</svg>`;
 await writeFile(`static/art/layers/${c.id}.svg`,svg);
}
for(const [kind,label] of [['angel','Angels'],['decree','Heavenly Decrees'],['judgment','Final Judgment']]){
 const art=await image(`back-${kind}`);
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" width="63mm" height="88mm" viewBox="0 0 630 880"><title>${label} — painted card back</title><desc>GPL-3.0-only. Complete painted artwork, with no typography or markup overlays. Original PNG in art/source/back-${kind}.png; exact prompt in art/back-prompts.json.</desc>${layer('artwork','01 · Complete painted back',`<image href="${art}" width="630" height="880" preserveAspectRatio="xMidYMid slice"/>`)}</svg>`;
 await writeFile(`static/art/layers/back-${kind}.svg`,svg);
}
await browser.close();
console.log('Exported 27 numbered layered fronts and three image-only painted backs.');

import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {allCards,type Card} from '../src/lib/data/game';
import {launchBrowser} from './browser';
const base=process.env.REVIEW_URL||'http://127.0.0.1:5198';
const browser=await launchBrowser(),page=await browser.newPage();
await page.goto(`${base}/gallery`);await page.evaluate(()=>document.fonts.ready);
const xml=(s:string)=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const image=async(id:string)=>`data:image/webp;base64,${(await readFile(`static/art/cards/${id}.webp`)).toString('base64')}`;
const background=await image('heaven-background'),frame=await image('frame');
const bodyFont=(await readFile('node_modules/@fontsource/atkinson-hyperlegible/files/atkinson-hyperlegible-latin-400-normal.woff2')).toString('base64');
const titleFont=(await readFile('node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-700-normal.woff2')).toString('base64');
const fonts=`<defs><style>@font-face{font-family:'Atkinson Hyperlegible';src:url(data:font/woff2;base64,${bodyFont}) format('woff2');font-weight:400}@font-face{font-family:'Cormorant Garamond';src:url(data:font/woff2;base64,${titleFont}) format('woff2');font-weight:700}</style></defs>`;
const layer=(id:string,name:string,content:string)=>`<g id="${id}" inkscape:groupmode="layer" inkscape:label="${name}">${content}</g>`;
async function lines(text:string,font:string,width:number){return page.evaluate(({text,font,width})=>{const ctx=document.createElement('canvas').getContext('2d')!;ctx.font=font;const result:string[]=[];let current='';for(const word of text.split(/\s+/)){const trial=current?current+' '+word:word;if(current&&ctx.measureText(trial).width>width){result.push(current);current=word;}else current=trial;}if(current)result.push(current);return result;},{text,font,width});}
const text=(content:string,x:number,y:number,size:number,extra='')=>`<text x="${x}" y="${y}" font-size="${size}" ${extra}>${xml(content)}</text>`;
await mkdir('static/art/layers',{recursive:true});
for(const c of allCards){
 const subject=await image(c.id),dense=c.copy.length>310;
 const top=dense?343:422,bodySize=dense?29:30.2;
 let title=await lines(c.name,'700 39px "Cormorant Garamond"',510);
 let letter=text(c.kind==='angel'?'ANGEL':c.kind==='decree'?'HEAVENLY DECREE':'FINAL JUDGMENT',315,51,14,'text-anchor="middle" letter-spacing="2" font-weight="bold" fill="#785c2b"');
 title.forEach((line,i)=>letter+=text(line,315,83+i*36,39,'text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-weight="bold"'));
 letter+=`<rect x="50" y="${top}" width="530" height="${790-top}" fill="#fff9ec" fill-opacity=".97"/><path d="M 50 ${top} H 580" stroke="#ad9255"/>`;
 let y=top+32;
 if(c.kind==='angel'){letter+=text(c.title,315,y,31,'text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-weight="bold"');y+=27;}
 letter+=text(c.timing.toUpperCase(),315,y,15,'text-anchor="middle" font-weight="bold" fill="#735829"');y+=30;
 const body=await lines(c.copy,`${bodySize}px "Atkinson Hyperlegible"`,510);
 body.forEach((line,i)=>letter+=text(line,315,y+i*bodySize*1.2,bodySize,'text-anchor="middle"'));
 if(y+(body.length-1)*bodySize*1.2>802)throw new Error(`SVG copy overflow: ${c.id}`);
 letter+=`<path d="M 50 812 H 580" stroke="#c7b68e"/>`+text(c.kind==='angel'?'ONCE PER ROUND':c.kind==='decree'?'REPLACES AFFECTED RULES':'ROUND THREE ONLY',50,833,10,'font-weight="bold"')+text(`HG · ${c.id.toUpperCase()}`,580,833,10,'text-anchor="end" font-weight="bold"');
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" width="63mm" height="88mm" viewBox="0 0 630 880">${fonts}<title>${xml(c.name)} — Heaven’s Gate layered source</title><desc>GPL-3.0-only. Independent paper, painted background, transparent illustration, editable live typography, and transparent ornamental frame. Generated with built-in image_gen; exact prompts in art/prompts.json.</desc>${layer('paper','01 · Paper','<rect width="630" height="880" fill="#fff9ec"/>')}${layer('background','02 · Painted Heaven',`<image href="${background}" width="630" height="880" preserveAspectRatio="xMidYMid slice" opacity=".52"/>`)}${layer('illustration','03 · Painted illustration',`<image href="${subject}" x="31" y="106" width="568" height="${dense?229:308}" preserveAspectRatio="xMidYMax meet"/>`)}${layer('typography','04 · Editable typography',`<g fill="#342818" font-family="Atkinson Hyperlegible, sans-serif">${letter}</g>`)}${layer('frame','05 · Gold frame',`<image href="${frame}" width="630" height="880" preserveAspectRatio="none"/>`)}</svg>`;
 await writeFile(`static/art/layers/${c.id}.svg`,svg);
}
for(const [kind,label,tag] of [['angel','The twelve Angels','ONE MIRACLE EACH ROUND'],['decree','Heavenly Decrees','A NEW ORDER FOR HEAVEN'],['judgment','Final Judgment','THE LAST SHALL HAVE THEIR CHANCE']]){
 const lettering=`<rect x="63" y="123" width="504" height="634" fill="#fff9ec" fill-opacity=".78" stroke="#c4a665"/>${text('HEAVEN’S',315,330,57,'text-anchor="middle" font-family="Cormorant Garamond" font-weight="700"')}${text('Gate',315,470,150,'text-anchor="middle" font-family="Cormorant Garamond" font-style="italic" font-weight="700"')}<path d="M 236 530 H 394" stroke="#997232"/>${text(label,315,600,39,'text-anchor="middle" font-family="Cormorant Garamond" font-weight="700"')}${text(tag,315,650,12,'text-anchor="middle" letter-spacing="1"')}`;
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" width="63mm" height="88mm" viewBox="0 0 630 880">${fonts}<title>${label} — layered card back</title>${layer('paper','01 · Paper','<rect width="630" height="880" fill="#fff9ec"/>')}${layer('background','02 · Painted Heaven',`<image href="${background}" width="630" height="880" preserveAspectRatio="xMidYMid slice" opacity=".75"/>`)}${layer('typography','03 · Editable typography',`<g fill="#342818" font-family="Atkinson Hyperlegible">${lettering}</g>`)}${layer('frame','04 · Gold frame',`<image href="${frame}" width="630" height="880" preserveAspectRatio="none"/>`)}</svg>`;
 await writeFile(`static/art/layers/back-${kind}.svg`,svg);
}
await browser.close();
console.log('Exported 27 layered fronts and three category backs with embedded fonts and editable typography.');

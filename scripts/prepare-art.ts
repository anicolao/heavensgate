import sharp from 'sharp';
import {mkdir,readdir,writeFile} from 'node:fs/promises';
await mkdir('static/art/cards',{recursive:true});
const manifest=[];
for(const file of (await readdir('static/art/source')).filter(f=>f.endsWith('.png'))){
 const id=file.slice(0,-4),source=`static/art/source/${file}`;
 const meta=await sharp(source).metadata();
 if(id!=='heaven-background'&&!id.startsWith('back-')&&!meta.hasAlpha)throw new Error(`${id} must have real alpha`);
 await sharp(source).resize({width:id==='heaven-background'?1400:1100,withoutEnlargement:true}).webp({quality:92,alphaQuality:100}).toFile(`static/art/cards/${id}.webp`);
 manifest.push({id,source,width:meta.width,height:meta.height,hasAlpha:meta.hasAlpha,output:`/art/cards/${id}.webp`});
}
await writeFile('static/art/manifest.json',JSON.stringify(manifest,null,2)+'\n');
console.log(`Prepared ${manifest.length} illustrations and frame assets, preserving aspect ratios and alpha.`);

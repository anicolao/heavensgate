import {readFileSync, writeFileSync} from 'node:fs';
const source = readFileSync('HEAVENS_GATE_RULES.md', 'utf8');
const angelSection = source.split('## 7. The twelve Angels')[1].split('## 8.')[0];
const angels = [...angelSection.matchAll(/### ([^\n]+) — ([^\n]+)\n\n([\s\S]+?)(?=\n### |$)/g)].map(m => ({id: m[1].toLowerCase(), name: m[1], title: m[2], detailed: m[3].trim(), kind: 'angel'}));
const decrees = [...source.split('## 8. Ordinary Heavenly Decrees')[1].split('## 9.')[0].matchAll(/^\| \*\*(\d+)\. ([^*]+)\*\* \| (.+) \|$/gm)].map(m => ({id: `decree-${m[1]}`, name:m[2], title: 'Heavenly Decree', detailed:m[3], kind:'decree'}));
const judgments = [...source.split('## 9. Final Judgment')[1].split('## 10.')[0].matchAll(/### (\d+)\. ([^\n]+)\n\n([\s\S]+?)(?=\n### |$)/g)].map(m => ({id:`judgment-${m[1]}`,name:m[2],title:'Final Judgment',detailed:m[3].trim(),kind:'judgment'}));
if(angels.length !== 12 || decrees.length !== 10 || judgments.length !== 5) throw new Error('Authoritative catalog must contain 12 Angels, 10 Decrees, 5 Judgments');
writeFileSync('src/lib/data/catalog.json', JSON.stringify({angels,decrees,judgments},null,2)+'\n');
console.log('Catalog: 12 Angels · 10 Decrees · 5 Final Judgments');

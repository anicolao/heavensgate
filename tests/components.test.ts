import {describe,test,expect} from 'bun:test';
import {readFileSync} from 'node:fs';
import sharp from 'sharp';
import {allCards,angels,decrees,judgments} from '../src/lib/data/game';
import {printSheets,paperSizes,cropMarks} from '../src/lib/print/layout';
describe('Complete tabletop set',()=>{
 test('contains 27 unique cards and complete rules extracted from the authority',()=>{
  expect([angels.length,decrees.length,judgments.length]).toEqual([12,10,5]);
  expect(new Set(allCards.map(c=>c.id)).size).toBe(27);
  for(const c of allCards){expect(c.brief.trim().length).toBeGreaterThan(0);expect(c.detailed.length).toBeGreaterThan(30);}
 });
 for(const paper of ['a4','letter'] as const){
  test(`${paper}: every front has the correct long-edge mirrored back`,()=>{
   const sheets=printSheets(allCards,paper);expect(sheets.length).toBe(6);
   for(let i=0;i<sheets.length;i+=2){
    const a=sheets[i],b=sheets[i+1];expect(a.cards.length).toBe(9);
    a.cards.forEach((c,j)=>{expect(b.cards[j].card.id).toBe(c.card.id);expect(c.x+b.cards[j].x+63).toBeCloseTo(paperSizes[paper].width);expect(b.cards[j].y).toBe(c.y);});
    for(const mark of cropMarks(a)){expect(mark.x1).toBeGreaterThan(0);expect(mark.y1).toBeGreaterThan(0);expect(mark.x2).toBeLessThan(paperSizes[paper].width);expect(mark.y2).toBeLessThan(paperSizes[paper].height);}
   }
  });
 }
 test('filtered partial sheets mirror the full grid, not the occupied count',()=>{
  const sheets=printSheets(angels,'a4',{x:1,y:-1});
  expect(sheets.length).toBe(4);expect(sheets[2].cards.length).toBe(3);
  const a=sheets[2].cards[0],b=sheets[3].cards[0];expect(a.x+b.x+63).toBeCloseTo(211);expect(b.y).toBe(a.y-1);
 });
 test('confirmed rules remain present',()=>{
  const text=readFileSync('HEAVENS_GATE_RULES.md','utf8');
  expect(text).toContain('Favor never decreases');expect(text).toContain('Purgatory may remain occupied');
  expect(text).toContain('Record that\ncredit on the scoresheet immediately: it is final.');
 });
 test('all original foregrounds and the frame have genuine transparency',async()=>{
  const ids=[...allCards.map(c=>c.id),'frame'];
  for(const id of ids){const stats=await sharp(`static/art/source/${id}.png`).stats();const alpha=stats.channels[3];expect(alpha).toBeDefined();expect(alpha.min).toBe(0);expect(alpha.max).toBeGreaterThanOrEqual(250);}
 },30000);
 test('layered fronts retain editable text and painted backs contain no text overlays',()=>{
  for(const id of allCards.map(c=>c.id)){
   const svg=readFileSync(`static/art/layers/${id}.svg`,'utf8');
   expect(svg).toContain('inkscape:groupmode="layer"');expect(svg).toContain('id="typography"');expect(svg).toContain('<text ');expect(svg).toContain('data:image/webp;base64,');expect(svg).toContain('data:font/woff2;base64,');
  }
  for(const kind of ['angel','decree','judgment']){
   const svg=readFileSync(`static/art/layers/back-${kind}.svg`,'utf8');
   expect(svg).toContain('data:image/webp;base64,');expect(svg).not.toContain('<text ');expect(svg).not.toContain('id="typography"');
  }
 });
});

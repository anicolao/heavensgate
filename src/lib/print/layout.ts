import type {Card} from '../data/game';
export type Paper='a4'|'letter';
export const paperSizes={a4:{width:210,height:297,label:'A4'},letter:{width:215.9,height:279.4,label:'US Letter'}};
export const format={width:63,height:88,columns:3,rows:3};
export interface Placement {card:Card;x:number;y:number}
export interface Sheet {number:number;side:'front'|'back';cards:Placement[];x:number;y:number}
export function printSheets(cards:Card[],paper:Paper,offset={x:0,y:0}):Sheet[]{
 const size=paperSizes[paper], x=(size.width-189)/2, y=(size.height-264)/2;
 const result:Sheet[]=[];
 for(let i=0;i<cards.length;i+=9){
  const front=cards.slice(i,i+9).map((card,index)=>({card,x:x+index%3*63,y:y+Math.floor(index/3)*88}));
  const number=i/9+1;
  result.push({number,side:'front',cards:front,x,y});
  result.push({number,side:'back',cards:front.map(c=>({...c,x:size.width-c.x-63+offset.x,y:c.y+offset.y})),x:x+offset.x,y:y+offset.y});
 }
 return result;
}
export function cropMarks(sheet:Sheet){
 const marks:{x1:number;y1:number;x2:number;y2:number}[]=[];
 for(let c=0;c<=3;c++){const x=sheet.x+c*63;for(const y of [sheet.y-3,sheet.y+264+1])marks.push({x1:x,y1:y,x2:x,y2:y+2});}
 for(let r=0;r<=3;r++){const y=sheet.y+r*88;for(const x of [sheet.x-3,sheet.x+189+1])marks.push({x1:x,y1:y,x2:x+2,y2:y});}
 return marks;
}

import catalog from './catalog.json';
export type Kind = 'angel' | 'decree' | 'judgment';
export interface Card {id:string; name:string; title:string; detailed:string; kind:Kind; brief:string; timing:string; code:string; number:number}
const presentation:Record<string,[string,string]> = {
 zadkiel:['During Organize','Take one soul from Heaven into your hand.'],
 raphael:['During Organize','Set one soul from Heaven in Purgatory. On your next turn, rescue it into a procession. If you cannot, you must draw instead.'],
 selaphiel:['During Organize','Shelter a Choir in your Sanctuary. Only you may rearrange it.'],
 barachiel:['During Organize','Shelter a Procession in your Sanctuary. Only you may rearrange it.'],
 chamuel:['During Organize','Reveal a random soul from an opponent’s hand. Play it into Heaven along with at least one of your own, or return it.'],
 jophiel:['During Organize','Swap two souls in Heaven for at least two from your hand.'],
 uriel:['When drawing','Look at eight souls from the bag. Keep one and return the rest.'],
 jegudiel:['After your turn','Take another turn.'],
 raguel:['Before your action','Return any number of souls to the bag, mix, and then draw double that number.'],
 haniel:['Before your action','Choose how many souls to pass, up to the smallest hand. Everyone passes that many souls to the right.'],
 gabriel:['Before your action','Name a rank. Every opponent gives you all their souls of that rank.'],
 michael:['Before your action','Give all your souls of one rank to an opponent.'],
 'decree-1':['Rounds one & two','Processions climb by twos: 1–3–5 or 2–4–6.'],
 'decree-2':['Rounds one & two','Choirs may repeat colors.'],
 'decree-3':['Rounds one & two','Processions may mix colors.'],
 'decree-4':['Rounds one & two','Processions alternate between two colors.'],
 'decree-5':['Rounds one & two','Processions may wrap from 13 back to 1.'],
 'decree-6':['Rounds one & two','Also allow two pairs (2+2) and full houses (3+2).'],
 'decree-7':['Rounds one & two','Processions need at least four souls.'],
 'decree-8':['Rounds one & two','Processions may climb one or two ranks at each step.'],
 'decree-9':['Rounds one & two','Two same-rank souls of different colors make a Choir.'],
 'decree-10':['Rounds one & two','Make a Choir from two souls of one color with different ranks adding up to 14.'],
 'judgment-1':['Round three','If someone other than God’s Favorite wins the round, double the Favorite’s penalty.'],
 'judgment-2':['Round three','Secretly choose another player. At round end, gain a credit equal to their penalty.'],
 'judgment-3':['Round three','Set aside up to five souls. Each earns its rank in permanent points when delivered; any left cost triple.'],
 'judgment-4':['Round three','Start with one Favor for each player ahead of you in the standings.'],
 'judgment-5':['Round three','Win this round to erase your worst score from an earlier round.']
};
function cards(items:typeof catalog.angels,prefix:string,offset:number):Card[] {return items.map((c,i)=>{if(!presentation[c.id]) throw new Error(`Missing brief text: ${c.id}`);return {...c,kind:c.kind as Kind,timing:presentation[c.id][0],brief:presentation[c.id][1],code:`HP-${prefix}${String(i+1).padStart(2,'0')}`,number:offset+i+1};});}
export const angels=cards(catalog.angels,'A',0), decrees=cards(catalog.decrees,'D',catalog.angels.length), judgments=cards(catalog.judgments,'J',catalog.angels.length+catalog.decrees.length);
export const allCards=[...angels,...decrees,...judgments];
export const cardTotal=allCards.length;
export const kindNames:Record<Kind,string>={angel:'Angels',decree:'Heavenly Decrees',judgment:'Final Judgments'};

import catalog from './catalog.json';
export type Kind = 'angel' | 'decree' | 'judgment';
export interface Card {id:string; name:string; title:string; rule:string; kind:Kind; copy:string; timing:string}
const copy:Record<string,[string,string]> = {
 zadkiel:['During Organize','Take one unprotected soul from Heaven into your hand. Finish Heaven legally. Retrieval costs no Favor; playing that soul in the same action or later earns Favor normally.'],
 raphael:['During Organize','Move one unprotected soul from Heaven to your Purgatory while arranging and playing hand souls. Later, while occupied, rescue it into a Procession or draw. Rescue permits hand play immediately. Purgatory never prevents going out. No Favor is lost on removal or earned on rescue.'],
 selaphiel:['During Organize','Move one complete Choir into your Sanctuary. Only you may rearrange it. Additions are protected; removed tiles become public. Keep legal Choirs inside. If empty at action end, the Sanctuary closes for the round.'],
 barachiel:['During Organize','Move one complete Procession into your Sanctuary. Only you may rearrange it. Additions are protected; removed tiles become public. Keep legal Processions inside. If empty at action end, the Sanctuary closes for the round.'],
 chamuel:['During Organize','Randomly reveal one opponent’s hand soul. Deliver it directly into Heaven while delivering at least one of your own. Otherwise return it, then play normally or draw. The reveal spends this power. You earn Favor for both deliveries.'],
 jophiel:['During Organize','Take exactly two unprotected souls from Heaven into your hand. Deliver at least two souls held before this action; keep the retrieved pair in hand until action end. Finish Heaven legally. Earn Favor only for contributions beyond the exchanged pair.'],
 uriel:['When drawing','Inspect up to eight random bag souls instead of your Favor allowance. Keep one, return the rest, and end your turn. Cannot be used with an empty bag.'],
 jegudiel:['After your turn','Immediately take one additional full turn, unless the round has ended. Then play passes clockwise as usual. May follow a draw.'],
 raguel:['Before your action','Return any positive number K of hand souls to the bag. Mix, then draw 2K blindly. There must be enough bag souls after returning K. Then take your ordinary action.'],
 haniel:['Before your action','Choose a positive X up to the smallest hand size. Everyone secretly selects X hand souls, then simultaneously passes them right, counterclockwise. Then take your ordinary action.'],
 gabriel:['Before your action','Name a rank, 1–13. Every opponent gives you all hand souls of that rank, including rack commitments. Jokers have no rank. Resolve all transfers, check for players going out, then take your ordinary action if the round continues.'],
 michael:['Before your action','Choose a rank in your hand and one opponent. Give them all your hand souls of that rank. Jokers cannot be included. An empty hand ends the round; otherwise take your ordinary action.'],
 'decree-1':['Rounds one & two','Processions advance by exactly two ranks per step, in one color. Minimum three souls. No wrapping. Example: 2–4–6–8. Choirs are unchanged.'],
 'decree-2':['Rounds one & two','Choirs contain three or four souls of the same rank. Colors may repeat. Processions are unchanged.'],
 'decree-3':['Rounds one & two','Processions use consecutive ascending ranks in any combination of colors. Minimum three souls. No wrapping. Choirs are unchanged.'],
 'decree-4':['Rounds one & two','Processions use consecutive ascending ranks, alternating exactly two different colors. Minimum three souls. No wrapping. Single-color Processions are illegal. Choirs are unchanged.'],
 'decree-5':['Rounds one & two','Same-color Processions may wrap 13 → 1. Minimum three, maximum thirteen souls; no repeated rank within one Procession. Choirs are unchanged.'],
 'decree-6':['Rounds one & two','Also allow Two Pair: two souls of each of two distinct ranks; and Full House: three of one rank plus two of another. Duplicate colors are allowed. These are neither Choirs nor Processions. Ordinary formations remain legal.'],
 'decree-7':['Rounds one & two','Processions need at least four souls of one color in consecutive ascending ranks. No wrapping. Choirs are unchanged.'],
 'decree-8':['Rounds one & two','Same-color Processions advance by one or two ranks at each step. Minimum three souls. Ranks strictly increase; no wrapping. Example: 3–5–6–8. Choirs are unchanged.'],
 'decree-9':['Rounds one & two','Choirs may contain two, three, or four same-rank souls, all different colors. Processions are unchanged.'],
 'decree-10':['Rounds one & two','A Choir is exactly two souls of the same color, with different ranks totaling fourteen: 1+13, 2+12, 3+11, 4+10, 5+9, or 6+8. No 7+7 or ordinary Choirs. Processions are unchanged.'],
 'judgment-1':['Round three','All tied score leaders after round two are God’s Favorites. If a non-Favorite wins, double every Favorite’s penalty, increasing the winner’s award. If a Favorite wins, score normally. In stalemate, choose the winner before doubling.'],
 'judgment-2':['Round three','After the deal, secretly choose another player. At round end, reveal and gain a credit equal to their penalty loss before credits. Selecting the winner earns zero. In stalemate, copy their penalty-difference loss. Your credit changes only your score.'],
 'judgment-3':['Round three','Set aside up to five numbered hand souls on your rack. Delivery earns an immediate, permanent printed-rank credit; the tile then becomes ordinary. Undelivered commitments cost triple. Transfers outside Heaven cancel commitment; Communion delivery credits the owner. No jokers.'],
 'judgment-4':['Round three','Start with Favor equal to the number of players with a strictly higher cumulative score after round two. Tied players get the same head start. Continue earning Favor normally.'],
 'judgment-5':['Round three','The round winner replaces their worst negative score from rounds one or two with zero. If equal, erase round one. If neither is negative, gain no benefit. Other players’ scores are unchanged.']
};
function cards(items:typeof catalog.angels):Card[] {return items.map(c=>{if(!copy[c.id]) throw new Error(`Missing copy: ${c.id}`);return {...c,kind:c.kind as Kind,timing:copy[c.id][0],copy:copy[c.id][1]};});}
export const angels=cards(catalog.angels), decrees=cards(catalog.decrees), judgments=cards(catalog.judgments);
export const allCards=[...angels,...decrees,...judgments];
export const kindNames:Record<Kind,string>={angel:'Angels',decree:'Heavenly Decrees',judgment:'Final Judgments'};

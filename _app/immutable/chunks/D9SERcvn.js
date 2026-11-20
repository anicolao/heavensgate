import{V as re,b as oe,a2 as te,av as ie,h as T,Y as se,al as I,i as Y,e as J,j as le,W as de,p as ue,y as d,q as ce,n as o,w as g,x as p,B as s,l as he}from"./Dy2L8yzP.js";import{a as u,f as c}from"./DN5_uiZ6.js";import{s as l}from"./CAVmNOTi.js";import{p as M,i as C}from"./Cefar9es.js";import{c as me,s as v}from"./wEhtdy3P.js";import{b as S}from"./XWVsJmbb.js";function Oe(f,e){let h=null,m=T;var a;if(T){h=le;for(var t=de(document.head);t!==null&&(t.nodeType!==se||t.data!==f);)t=I(t);if(t===null)Y(!1);else{var H=I(t);t.remove(),J(H)}}T||(a=document.head.appendChild(re()));try{oe(()=>{var y=te(()=>e(a));y.f|=ie,T||(y.nodes===null?y.nodes={start:a,end:a,a:null,t:null}:y.nodes.end=a)})}finally{m&&(Y(!0),J(h))}}var ye=c('<img class="background-layer" data-layer="background" alt="" draggable="false"/>'),ge=c('<div class="back-lettering" data-layer="typography"><span>HEAVEN’S</span><strong>Gate</strong><i></i><b> </b><small> </small></div>'),pe=c('<img class="subject-layer" data-layer="illustration" alt="" draggable="false"/>'),ve=c("<h4> </h4>"),fe=c('<!> <div class="card-lettering" data-layer="typography"><header data-fit="title"><span> </span><h3> </h3></header> <div class="copy-panel" data-fit="copy"><!><p class="timing"> </p><p class="effect"> </p></div> <footer><span> </span><span> </span></footer></div>',1),we=c('<img class="frame-layer" data-layer="frame" alt="" draggable="false"/>'),ke=c('<article><div class="paper-layer" data-layer="paper"></div> <!> <!> <!></article>');function _e(f,e){ue(e,!0);let h=M(e,"back",3,!1),m=M(e,"mono",3,!1);var a=ke();let t;var H=o(g(a),2);{var y=n=>{var r=ye();d(()=>v(r,"src",`${S}/art/cards/heaven-background.webp`)),u(n,r)};C(H,n=>{m()||n(y)})}var A=o(H,2);{var q=n=>{var r=ge(),w=o(g(r),3),F=s(w,!0),P=o(w),k=s(P,!0);p(r),d(()=>{l(F,e.card.kind==="angel"?"The twelve Angels":e.card.kind==="decree"?"Heavenly Decrees":"Final Judgment"),l(k,e.card.kind==="angel"?"ONE MIRACLE EACH ROUND":e.card.kind==="decree"?"A NEW ORDER FOR HEAVEN":"THE LAST SHALL HAVE THEIR CHANCE")}),u(n,r)},B=n=>{var r=fe(),w=he(r);{var F=i=>{var b=pe();d(()=>v(b,"src",`${S}/art/cards/${e.card.id}.webp`)),u(i,b)};C(w,i=>{m()||i(F)})}var P=o(w,2),k=g(P),O=g(k),K=s(O,!0),U=o(O),W=s(U,!0);p(k);var E=o(k,2),_=g(E);{var V=i=>{var b=ve(),ae=s(b,!0);d(()=>l(ae,e.card.title)),u(i,b)};C(_,i=>{e.card.kind==="angel"&&i(V)})}var N=o(_),X=s(N,!0),Z=o(N),Q=s(Z,!0);p(E);var j=o(E,2),z=g(j),$=s(z,!0),ee=o(z),ne=s(ee);p(j),p(P),d(i=>{l(K,e.card.kind==="angel"?"ANGEL":e.card.kind==="decree"?"HEAVENLY DECREE":"FINAL JUDGMENT"),l(W,e.card.name),l(X,e.card.timing),l(Q,e.card.copy),l($,e.card.kind==="angel"?"ONCE PER ROUND":e.card.kind==="decree"?"REPLACES AFFECTED RULES":"ROUND THREE ONLY"),l(ne,`HG · ${i??""}`)},[()=>e.card.id.toUpperCase()]),u(n,r)};C(A,n=>{h()?n(q):n(B,-1)})}var G=o(A,2);{var L=n=>{var r=we();d(()=>v(r,"src",`${S}/art/cards/frame.webp`)),u(n,r)};C(G,n=>{m()||n(L)})}p(a),d(()=>{t=me(a,1,"game-card",null,t,{back:h(),mono:m(),dense:e.card.copy.length>310}),v(a,"data-card-id",e.card.id),v(a,"data-kind",e.card.kind),v(a,"aria-label",h()?`${e.card.kind} card back`:e.card.name)}),u(f,a),ce()}const be=[{id:"zadkiel",name:"Zadkiel",title:"Forgiveness",rule:`During your Organize action, take one unprotected soul from Heaven into your
hand. You may contribute other souls and rearrange Heaven during that action.
You may also replay the retrieved soul in the same action; that delivery earns
Favor normally, with no retrieval cost.
The final formations must be legal. Taking the soul is permitted even if you
contribute no souls. Retrieval costs no Favor, including when you also deliver
other souls during the action. The retrieved soul earns Favor normally if played
on the same or a later turn.`,kind:"angel"},{id:"raphael",name:"Raphael",title:"Penance",rule:`During your Organize action, remove one unprotected soul from Heaven into your
Purgatory. You may play hand souls and rearrange Heaven as part of this same
action, including before and after moving the soul into Purgatory. Finish Heaven
legally. Activating Penance consumes the power for the round.

For example, play your remaining hand into Heaven, move one excess table soul
into Purgatory to make the remaining formations legal, and finish the action.
Your hand is empty, so you go out even though Purgatory is occupied.

If the round continues, then on later turns while Purgatory is occupied your
ordinary action is either to rescue that soul into a legal **Procession** or to
draw. You may rearrange unprotected Heaven to rescue it. Once rescued, the
restriction ends immediately: you may also play hand souls in that same Organize
action. A failed rescue is restored and followed by a draw. The soul stays in
Purgatory until rescued; it may not move to your hand or another player. An
unrecovered soul counts in your penalty if another player goes out, but never
prevents your own empty-hand finish. Its Favor treatment is in section 5.`,kind:"angel"},{id:"selaphiel",name:"Selaphiel",title:"Sanctuary of Choirs",rule:`During your Organize action, move one complete legal Choir from shared Heaven
into your visible Sanctuary. This may be a Choir completed during that action.
Only you may move, add to, split, or rearrange protected tiles; any formations
remaining in your Sanctuary must be legal Choirs. You may rearrange them together
with unprotected Heaven on your turns. Moving them into your hand still requires
a power that explicitly permits retrieval.

Your Sanctuary is a special physical region on the table. All tiles currently
inside it are protected, including tiles you add from your hand or shared Heaven.
Only you may rearrange or extend it, and all formations remaining inside must be
legal Choirs at the end of the action.

You may move tiles out into shared Heaven during your Organize action. They are
then available to everyone; protection is determined solely by current location,
with no permanent released status or original-tile records. For example, from a
four-tile Choir you may leave three safely inside Sanctuary and use the fourth
in shared Heaven. If the Sanctuary is empty when your Organize action finishes,
its once-per-round protection ends: remove its region marker, and do not establish another Sanctuary
that round. While it remains occupied, you may add tiles and rearrange its
contents freely. You may temporarily empty it while rearranging within one
action, provided it contains legal formations when that action ends. Once closed,
you cannot establish another Sanctuary that round.`,kind:"angel"},{id:"barachiel",name:"Barachiel",title:"Sanctuary of Processions",rule:"Use Selaphiel's rules, replacing **Choir** with **Procession** throughout.",kind:"angel"},{id:"chamuel",name:"Chamuel",title:"Communion",rule:`During your Organize action, choose an opponent. They randomize their hand face
down, keeping any Scales commitments in a separate group. Randomly select and
reveal one soul with equal probability across all souls in both groups. You may deliver it directly into Heaven
provided you also deliver at least one soul from your own hand in that action.
You cannot keep the revealed soul in your hand. If you decline or cannot use it,
return it to its owner and finish a normal Organize action or draw instead.
The power is spent once a soul is revealed, even if it is returned. If the
Organize attempt is rolled back, return the revealed soul but keep the power spent.`,kind:"angel"},{id:"jophiel",name:"Jophiel",title:"Transfiguration",rule:`During your Organize action, take exactly two unprotected souls from Heaven into
your hand and deliver at least two souls that were in your hand before the
action. The two retrieved souls must remain in your hand until this action ends;
they cannot satisfy the delivery requirement. Other rearrangement and additional
contributions are allowed. Finish Heaven legally and apply net Favor.`,kind:"angel"},{id:"uriel",name:"Uriel",title:"Foretelling",rule:`When taking an ordinary Draw action, inspect up to eight random bag souls,
choose one, and return the rest. This replaces Favor selection for that draw.
The draw ends your turn. You cannot activate this with an empty bag.`,kind:"angel"},{id:"jegudiel",name:"Jegudiel",title:"Zeal",rule:`After completing your turn, immediately take one additional full turn, provided
the round has not ended. Spend the power before starting that extra turn. Then
play passes to the next player clockwise. Zeal can follow a Draw action.`,kind:"angel"},{id:"raguel",name:"Raguel",title:"Judgment",rule:`Before your ordinary action, return any positive number K of hand souls to the
bag, mix, then blindly draw **2K** souls. Returned souls can be redrawn. Choose K
only if the bag will contain at least 2K souls after the return. Finish the whole
exchange before checking for an empty hand. Then take your ordinary action.`,kind:"angel"},{id:"haniel",name:"Haniel",title:"The Heavenly Dance",rule:`Before your ordinary action, choose a positive integer X no greater than the
smallest current hand size. Each player privately selects X hand souls, then all
pass them simultaneously to the player on their right (counterclockwise).
Selections must be fixed before anyone sees incoming souls. Finish all transfers
before checking for an empty hand. Then take your ordinary action. Purgatory and
Sanctuary souls cannot be passed. You cannot activate the power if X would be zero.`,kind:"angel"},{id:"gabriel",name:"Gabriel",title:"Calling",rule:`Before your ordinary action, name one rank from 1 through 13. All opponents give
you every hand soul of that rank. They must comply honestly; their other souls
remain private. You need not hold the rank and may call one nobody holds, spending
the power. Jokers and souls in Sanctuary or Purgatory are not affected. Scales
commitments on a rack are hand souls and must be given if their rank is called.
Check for anyone going out after all transfers; if the round continues, take your
ordinary action.`,kind:"angel"},{id:"michael",name:"Michael",title:"Banishment",rule:`Before your ordinary action, choose a rank from 1 through 13 represented in your
hand and one opponent. Give them **all** your hand souls of that rank. Jokers
cannot be included. This may empty your hand and end the round immediately;
otherwise take your ordinary action.`,kind:"angel"}],Ce=[{id:"decree-1",name:"Even and Odd",title:"Heavenly Decree",rule:"Processions advance by exactly 2 each step, in one color, with at least 3 souls. No wrapping. Example: red 2–4–6–8. Ordinary step-1 Processions are not legal.",kind:"decree"},{id:"decree-2",name:"All Are Welcome",title:"Heavenly Decree",rule:"Choirs still contain exactly 3 or 4 same-rank souls, but colors may repeat.",kind:"decree"},{id:"decree-3",name:"Colorful Processions",title:"Heavenly Decree",rule:"Processions use consecutive ascending ranks in any colors, with at least 3 souls. No wrapping.",kind:"decree"},{id:"decree-4",name:"Candy Cane",title:"Heavenly Decree",rule:"Processions use consecutive ascending ranks and alternate exactly two different colors, with at least 3 souls. No wrapping. Example: red 4, blue 5, red 6. Single-color Processions are not legal.",kind:"decree"},{id:"decree-5",name:"The Eternal Circle",title:"Heavenly Decree",rule:"Same-color Processions may cross 13→1, with at least 3 and at most 13 souls. No rank may repeat within one Procession. Example: blue 12–13–1–2. Nonwrapping Processions remain legal.",kind:"decree"},{id:"decree-6",name:"God's Poker Night",title:"Heavenly Decree",rule:"Ordinary Choirs and Processions remain legal. Also permit **Two Pair** (exactly 2 souls of each of two distinct ranks) and **Full House** (exactly 3 of one rank and 2 of a different rank). Colors may repeat in these added formations. They are neither Choirs nor Processions for powers.",kind:"decree"},{id:"decree-7",name:"The Grand Procession",title:"Heavenly Decree",rule:"Processions require at least 4 souls, with ordinary color and consecutive-rank rules.",kind:"decree"},{id:"decree-8",name:"Stairway to Heaven",title:"Heavenly Decree",rule:"Same-color Processions advance by 1 or 2 at each step, independently, with at least 3 souls. Ranks strictly increase; no wrapping. Example: red 3–5–6–8.",kind:"decree"},{id:"decree-9",name:"Heavenly Pairs",title:"Heavenly Decree",rule:"Choirs may contain 2, 3, or 4 same-rank souls, all different colors.",kind:"decree"},{id:"decree-10",name:"Mirror Choir",title:"Heavenly Decree",rule:"A Choir is exactly **2 souls of the same color**, with **different ranks totaling 14**: 1+13, 2+12, 3+11, 4+10, 5+9, or 6+8. Ordinary same-rank Choirs and 7+7 are not legal Choirs. Processions are unchanged.",kind:"decree"}],He=[{id:"judgment-1",name:"Divine Retribution",title:"Final Judgment",rule:`If a player who is not a Favorite wins the round, double every Favorite's
undelivered penalty before calculating scores. If any Favorite wins, penalties
are normal. The winner receives the increased penalties as part of their award.
In a stalemate, first choose the stalemate winner
using undoubled penalties, then apply doubling if that winner is not a Favorite;
do not choose the winner again.`,kind:"judgment"},{id:"judgment-2",name:"Shared Sins",title:"Final Judgment",rule:`After seeing their starting hand but before the first turn, each player secretly
writes down one other player. Reveal all selections at round end. Each receives
an independent credit equal to their selected player's penalty loss for the
round, before Shared Sins credits. Selecting the round winner earns zero. Several
players may select the same person. Credits do not reduce anyone else's loss or
increase the round winner's ordinary award.`,kind:"judgment"},{id:"judgment-3",name:"The Scales of Justice",title:"Final Judgment",rule:`After the deal and before the first turn, each player may set aside **0–5
numbered souls** in a separate area of their own rack. These are their committed
souls and remain part of their hand. Their separate position identifies them;
no tile markers or records of individual tile identities are needed. Jokers
cannot be committed.

As soon as a committed soul is introduced into Heaven in a successfully completed
legal action, its owner earns a credit equal to its printed rank. Record that
credit on the scoresheet immediately: it is final. The delivered soul then
becomes an ordinary table soul. Later rearrangement, retrieval, or transfer never
erases the credit and never makes that soul committed again. Ordinary Heaven and
Sanctuary both qualify as delivery.

Committed souls still set aside on the owner's rack at round end incur **triple**
their normal penalty, replacing the ordinary single penalty. Personal delivery
credits do not increase the winner's ordinary award; tripled penalties do.

**Transfers:** If a power moves a still-committed soul out of its
owner's hand without delivering it into Heaven, its commitment ends. It earns no
credit and becomes an ordinary soul in its destination. Thus Calling, Banishment,
Heavenly Dance, or Judgment require no continuing ownership or identity tracking.
If Communion delivers a committed soul directly from its owner's rack into Heaven,
the owner receives the permanent credit, while Chamuel receives ordinary Favor
for the delivery. Afterward the soul is ordinary, as with any committed delivery.`,kind:"judgment"},{id:"judgment-4",name:"Divine Favor Head Start",title:"Final Judgment",rule:`Set each player's initial Favor to the number of players with a **strictly higher
cumulative score**: first place gets 0, an untied second gets 1, and so on. Tied
players receive the same head start. Continue earning and spending Favor normally.`,kind:"judgment"},{id:"judgment-5",name:"Redemption",title:"Final Judgment",rule:`After normal round-three scoring, the round winner replaces their single most
negative round-one or round-two score with zero. If the two negative scores are
equal, erase round one's. If neither is negative, there is no benefit. Recompute
that player's cumulative score; no other player's past score changes.`,kind:"judgment"}],x={angels:be,decrees:Ce,judgments:He},R={zadkiel:["During Organize","Take one unprotected soul from Heaven into your hand. Finish Heaven legally. Retrieval costs no Favor; playing that soul in the same action or later earns Favor normally."],raphael:["During Organize","Move one unprotected soul from Heaven to your Purgatory while arranging and playing hand souls. Later, while occupied, rescue it into a Procession or draw. Rescue permits hand play immediately. Purgatory never prevents going out. No Favor is lost on removal or earned on rescue."],selaphiel:["During Organize","Move one complete Choir into your Sanctuary. Only you may rearrange it. Additions are protected; removed tiles become public. Keep legal Choirs inside. If empty at action end, the Sanctuary closes for the round."],barachiel:["During Organize","Move one complete Procession into your Sanctuary. Only you may rearrange it. Additions are protected; removed tiles become public. Keep legal Processions inside. If empty at action end, the Sanctuary closes for the round."],chamuel:["During Organize","Randomly reveal one opponent’s hand soul. Deliver it directly into Heaven while delivering at least one of your own. Otherwise return it, then play normally or draw. The reveal spends this power. You earn Favor for both deliveries."],jophiel:["During Organize","Take exactly two unprotected souls from Heaven into your hand. Deliver at least two souls held before this action; keep the retrieved pair in hand until action end. Finish Heaven legally. Earn Favor only for contributions beyond the exchanged pair."],uriel:["When drawing","Inspect up to eight random bag souls instead of your Favor allowance. Keep one, return the rest, and end your turn. Cannot be used with an empty bag."],jegudiel:["After your turn","Immediately take one additional full turn, unless the round has ended. Then play passes clockwise as usual. May follow a draw."],raguel:["Before your action","Return any positive number K of hand souls to the bag. Mix, then draw 2K blindly. There must be enough bag souls after returning K. Then take your ordinary action."],haniel:["Before your action","Choose a positive X up to the smallest hand size. Everyone secretly selects X hand souls, then simultaneously passes them right, counterclockwise. Then take your ordinary action."],gabriel:["Before your action","Name a rank, 1–13. Every opponent gives you all hand souls of that rank, including rack commitments. Jokers have no rank. Resolve all transfers, check for players going out, then take your ordinary action if the round continues."],michael:["Before your action","Choose a rank in your hand and one opponent. Give them all your hand souls of that rank. Jokers cannot be included. An empty hand ends the round; otherwise take your ordinary action."],"decree-1":["Rounds one & two","Processions advance by exactly two ranks per step, in one color. Minimum three souls. No wrapping. Example: 2–4–6–8. Choirs are unchanged."],"decree-2":["Rounds one & two","Choirs contain three or four souls of the same rank. Colors may repeat. Processions are unchanged."],"decree-3":["Rounds one & two","Processions use consecutive ascending ranks in any combination of colors. Minimum three souls. No wrapping. Choirs are unchanged."],"decree-4":["Rounds one & two","Processions use consecutive ascending ranks, alternating exactly two different colors. Minimum three souls. No wrapping. Single-color Processions are illegal. Choirs are unchanged."],"decree-5":["Rounds one & two","Same-color Processions may wrap 13 → 1. Minimum three, maximum thirteen souls; no repeated rank within one Procession. Choirs are unchanged."],"decree-6":["Rounds one & two","Also allow Two Pair: two souls of each of two distinct ranks; and Full House: three of one rank plus two of another. Duplicate colors are allowed. These are neither Choirs nor Processions. Ordinary formations remain legal."],"decree-7":["Rounds one & two","Processions need at least four souls of one color in consecutive ascending ranks. No wrapping. Choirs are unchanged."],"decree-8":["Rounds one & two","Same-color Processions advance by one or two ranks at each step. Minimum three souls. Ranks strictly increase; no wrapping. Example: 3–5–6–8. Choirs are unchanged."],"decree-9":["Rounds one & two","Choirs may contain two, three, or four same-rank souls, all different colors. Processions are unchanged."],"decree-10":["Rounds one & two","A Choir is exactly two souls of the same color, with different ranks totaling fourteen: 1+13, 2+12, 3+11, 4+10, 5+9, or 6+8. No 7+7 or ordinary Choirs. Processions are unchanged."],"judgment-1":["Round three","All tied score leaders after round two are God’s Favorites. If a non-Favorite wins, double every Favorite’s penalty, increasing the winner’s award. If a Favorite wins, score normally. In stalemate, choose the winner before doubling."],"judgment-2":["Round three","After the deal, secretly choose another player. At round end, reveal and gain a credit equal to their penalty loss before credits. Selecting the winner earns zero. In stalemate, copy their penalty-difference loss. Your credit changes only your score."],"judgment-3":["Round three","Set aside up to five numbered hand souls on your rack. Delivery earns an immediate, permanent printed-rank credit; the tile then becomes ordinary. Undelivered commitments cost triple. Transfers outside Heaven cancel commitment; Communion delivery credits the owner. No jokers."],"judgment-4":["Round three","Start with Favor equal to the number of players with a strictly higher cumulative score after round two. Tied players get the same head start. Continue earning Favor normally."],"judgment-5":["Round three","The round winner replaces their worst negative score from rounds one or two with zero. If equal, erase round one. If neither is negative, gain no benefit. Other players’ scores are unchanged."]};function D(f){return f.map(e=>{if(!R[e.id])throw new Error(`Missing copy: ${e.id}`);return{...e,kind:e.kind,timing:R[e.id][0],copy:R[e.id][1]}})}const Pe=D(x.angels),Te=D(x.decrees),Fe=D(x.judgments),Ne=[...Pe,...Te,...Fe],je={angel:"Angels",decree:"Heavenly Decrees",judgment:"Final Judgments"};export{_e as G,Pe as a,Ne as b,Te as d,Oe as h,Fe as j,je as k};

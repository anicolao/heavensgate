<script lang="ts">
 import {base} from '$app/paths';
 import type {Card} from '$lib/data/game';
 let {card,back=false,mono=false}:{card:Card;back?:boolean;mono?:boolean}=$props();
</script>
<article class="game-card" class:back class:mono class:dense={card.copy.length>310} data-card-id={card.id} data-kind={card.kind} aria-label={back?`${card.kind} card back`:card.name}>
 <div class="paper-layer" data-layer="paper"></div>
 {#if !mono}<img class="background-layer" data-layer="background" src={`${base}/art/cards/heaven-background.webp`} alt="" draggable="false"/>{/if}
 {#if back}
  <div class="back-lettering" data-layer="typography"><span>HEAVEN’S</span><strong>Gate</strong><i></i><b>{card.kind==='angel'?'The twelve Angels':card.kind==='decree'?'Heavenly Decrees':'Final Judgment'}</b><small>{card.kind==='angel'?'ONE MIRACLE EACH ROUND':card.kind==='decree'?'A NEW ORDER FOR HEAVEN':'THE LAST SHALL HAVE THEIR CHANCE'}</small></div>
 {:else}
  {#if !mono}<img class="subject-layer" data-layer="illustration" src={`${base}/art/cards/${card.id}.webp`} alt="" draggable="false"/>{/if}
  <div class="card-lettering" data-layer="typography">
   <header data-fit="title"><span>{card.kind==='angel'?'ANGEL':card.kind==='decree'?'HEAVENLY DECREE':'FINAL JUDGMENT'}</span><h3>{card.name}</h3></header>
   <div class="copy-panel" data-fit="copy">{#if card.kind==='angel'}<h4>{card.title}</h4>{/if}<p class="timing">{card.timing}</p><p class="effect">{card.copy}</p></div>
   <footer><span>{card.kind==='angel'?'ONCE PER ROUND':card.kind==='decree'?'REPLACES AFFECTED RULES':'ROUND THREE ONLY'}</span><span>HG · {card.id.toUpperCase()}</span></footer>
  </div>
 {/if}
 {#if !mono}<img class="frame-layer" data-layer="frame" src={`${base}/art/cards/frame.webp`} alt="" draggable="false"/>{/if}
</article>

<script lang="ts">let {rank,color='blue'}:{rank:number|string;color?:string}=$props();</script>
<span class="soul-tile" data-color={color} aria-label={`${color} ${rank}`}><b>{rank}</b><i></i></span>

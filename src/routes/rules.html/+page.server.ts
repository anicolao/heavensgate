import {readFileSync} from 'node:fs';
import {marked} from 'marked';
export function load(){
 const source=readFileSync('HIGHER_POWERS_RULES.md','utf8');
 return {reference:marked.parse(source.slice(source.indexOf('## 1. Objective'))) as string};
}

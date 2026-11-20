import {chromium} from '@playwright/test';
import {readdir} from 'node:fs/promises';
export async function launchBrowser(){
 let executablePath=process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
 if(!executablePath&&process.platform==='darwin'){
  const cache=`${process.env.HOME}/Library/Caches/ms-playwright`;
  const dirs=(await readdir(cache)).filter(x=>/^chromium-\d+$/.test(x)).sort((a,b)=>Number(b.split('-')[1])-Number(a.split('-')[1]));
  if(dirs.length)executablePath=`${cache}/${dirs[0]}/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;
 }
 return chromium.launch({headless:true,executablePath});
}

"use strict";var e=require("node:fs"),t=require("node:fs/promises"),r=require("node:path"),n=require("puppeteer"),o=require("chalk"),a=require("node:http"),i=require("node:https"),s=require("node:url"),l=require("node:querystring"),c=require("https-proxy-agent");function u(e,t=0){let r=Math.floor(Math.random()*e);for(;r<t;)r=Math.floor(Math.random()*e);return r}const m=console.log,p=o.blueBright,d=o.whiteBright,f=o.green,g=o.red,h=o.yellow,y=o.hex("#a57fff");function w(e){return void 0===e}function x(e){return"number"==typeof e}function v(e){return"string"==typeof e}function T(e){return"object"==typeof e&&e&&!Array.isArray(e)}function C(e){return Array.isArray(e)}async function S(e,t,r,n){if(e&&n>1){const e=t?r:u(r.max,r.min);m(`Target id: ${y(n)} - Sleep time: ${y(e+"ms")}`),await function(e){return new Promise((t=>setTimeout(t,e)))}(e)}else m(`Target id: ${y(n)} - Sleep time: ${y("0ms")}`)}async function b(e,t,r){const{intervalTime:n}=t,o=!w(n),a=x(n),i=[];for(const s of e){const{id:e}=s;await S(o,a,n,e),i.push(r(s,t))}await Promise.all(i)}async function I(e,t,r){const{intervalTime:n}=t,o=!w(n),a=x(n);for(const i of e){const{id:e}=i;await S(o,a,n,e),await r(i,t)}}function j(e,t,r){const n=e[t];e[t]=e[r],e[r]=n}function $(e){if(1===e.length)return e;const t=Math.floor(e.length/2),r=$(e.slice(0,t)),n=$(e.slice(t)),o=[];let a=0,i=0;for(;a<r.length&&i<n.length;)r[a]>=n[i]?(o.push(r[a]),a++):(o.push(n[i]),i++);return a<r.length&&o.push(...r.slice(a)),i<n.length&&o.push(...n.splice(i)),o}function M(e){const{detailTargetConfig:t,detailTargetResult:r}=e;let n=null;if(T(r)&&Object.hasOwn(r,"response")&&r.response){n=r.response.status()}else T(r)&&(n=r.statusCode??null);let o=!1;const a=t.proxy?.switchByHttpStatus;return n&&a&&a.includes(n)&&(o=!0),o}async function E(e,t,r,n){const{type:o}=r,a=(!t.every((e=>e.priority===t[0].priority))?$(t.map((e=>({...e,valueOf:()=>e.priority})))):t).map(((e,t)=>{const r=++t,{maxRetry:n,proxyDetails:o}=e,a=[];return{id:r,isHandle:!1,isSuccess:!1,isStatusNormal:!1,detailTargetConfig:e,detailTargetResult:null,maxRetry:n,retryCount:0,proxyDetails:o,crawlErrorQueue:a,result:{id:r,isSuccess:!1,maxRetry:n,retryCount:0,proxyDetails:o,crawlErrorQueue:a,data:null}}}));m(p(`Start crawling - type: ${o}, mode: ${e}, total: ${a.length}`));const i="async"===e?b:I;let s=0,l=a;for(;l.length;)if(await i(l,r,n),l=l.filter((e=>{const{isHandle:t,retryCount:r,maxRetry:n,detailTargetConfig:o,proxyDetails:a,crawlErrorQueue:i,isStatusNormal:s}=e;let l=!1;if(!t&&r<n&&(l=!0,a.length>=2)){const e=o.proxy?.switchByErrorCount;if(!s||!w(e)&&e>=i.length){a.find((e=>e.url===o.proxyUrl)).state=!1;const e=a.find((e=>e.state))?.url;w(e)||(o.proxyUrl=e)}}return l})),l.length){const e=l.map((e=>(e.retryCount++,e.id)));m(h(`Start retrying - count: ${++s}, targets id: [ ${e.join(", ")} ]`))}const c=[],u=[];return a.forEach((e=>{e.isSuccess?c.push(e.id):u.push(e.id)})),m(d(`Crawl ${o}s finish:`)),m(f(`  Success - total: ${c.length}, targets id: [ ${c.join(", ")} ]`)),m(g(`    Error - total: ${u.length}, targets id: [ ${u.join(", ")} ]`)),a.map((e=>e.result))}function O(e){const{data:t,url:r,params:n,proxyUrl:o,timeout:u,method:m}=e,{protocol:p,hostname:d,port:f,pathname:g,search:h}=new s.URL(r);let y=g;(h||n)&&(y+=h?`${h}${n?"&"+l.stringify(n):""}`:`?${l.stringify(n)}`);const x={requestConfig:{agent:o?new c.HttpsProxyAgent(o):"http:"===p?new a.Agent:new i.Agent,protocol:p,hostname:d,port:f,path:y,method:m?.toLocaleUpperCase()??"GET",headers:{},timeout:u},protocol:p,data:T(t)?JSON.stringify(t):t};return function(e,t){const r=e.headers??{},{requestConfig:n,data:o}=t,a={"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",...r};w(o)||[{key:"Content-Type",value:"application/json"},{key:"Content-Length",value:Buffer.byteLength(o)}].forEach((e=>{const{key:t,value:n}=e;w(r[t])&&(a[t]=n)}));n.headers=a}(e,x),x}const V=[{platform:"Windows",mobile:"random",userAgent:{value:"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",versions:[{name:"Chrome",maxMajorVersion:112,minMajorVersion:100,maxMinorVersion:10,maxPatchVersion:5615},{name:"Safari",maxMinorVersion:36,maxPatchVersion:2333}]}},{platform:"Windows",mobile:"random",userAgent:{value:"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.59",versions:[{name:"Chrome",maxMajorVersion:91,minMajorVersion:88,maxMinorVersion:10,maxPatchVersion:5615},{name:"Safari",maxMinorVersion:36,maxPatchVersion:2333},{name:"Edg",maxMinorVersion:10,maxPatchVersion:864}]}},{platform:"Windows",mobile:"random",userAgent:{value:"Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0",versions:[{name:"Firefox",maxMajorVersion:47,minMajorVersion:43,maxMinorVersion:10,maxPatchVersion:5e3}]}}];function F(e){return C(e)?e.map((e=>T(e)?e:{url:e})):[T(e)?e:{url:e}]}function R(e,t){const{ua:r,platform:n,platformVersion:o,mobile:a,acceptLanguage:i,userAgent:s}=t;let l=e.headers;if(l||(e.headers=l={}),r&&(l["sec-ch-ua"]=r),a&&(l["sec-ch-ua-mobile"]="random"===a?u(2)?"?1":"?0":a),n&&(l["sec-ch-platform"]=n),o&&(l["sec-ch-ua-platform-version"]=o),i&&(l["accept-language"]=i),s){let e=s.value;s.versions?.forEach((t=>{const{name:r,maxMajorVersion:n,minMajorVersion:o,maxMinorVersion:a,minMinorVersion:i,maxPatchVersion:s,minPatchVersion:l}=t,c=e.split(`${r}/`)[1].split(" ")[0].split("."),m=c.join(".");w(n)||(c[0]=n===o?n:u(n,o)),w(a)||(c[1]=a===i?a:u(a,i)),w(s)||(c[2]=s===l?s:u(s,l));const p=`${r}/${m}`,d=`${r}/${c.join(".")}`;e=e.replace(p,d)})),l["user-agent"]=e}}function P(e,t){const{maxWidth:r,minWidth:n,maxHeight:o,minHidth:a}=t,i=e.viewport??{};r&&(i.width=r===n?r:u(r,n)),o&&(i.height=o===a?o:u(o,a)),Object.hasOwn(i,"width")&&Object.hasOwn(i,"height")&&(e.viewport=i)}function k(e,t,r){r.detailTargets=t.detailTargets.map((n=>{const o=n,{url:a,timeout:i,proxy:s,maxRetry:l,priority:c,headers:m,fingerprint:p}=o;if(e.baseUrl&&(o.url=e.baseUrl+a),w(i)&&(w(t.timeout)?o.timeout=e.timeout:o.timeout=t.timeout??void 0),w(l)&&(w(t.maxRetry)?o.maxRetry=e.maxRetry:o.maxRetry=t.maxRetry??0),w(s)&&(w(t.proxy)?w(e.proxy)||(o.proxy=e.proxy):o.proxy=t.proxy),w(o.proxy?.urls))o.proxyDetails=[];else{const e=o.proxy.urls;o.proxyUrl=e[0],o.proxyDetails=e.map((e=>({url:e,state:!0})))}if(w(c)&&(o.priority=0),w(m)&&t.headers&&(o.headers={...t.headers}),p)R(o,p);else if(w(p)&&C(t.fingerprints)&&t.fingerprints.length){const e=t.fingerprints,n=u(e.length),a=e[n];r.selectFingerprintIndexs.push(n),R(o,a)}else if(w(p)&&!C(t.fingerprints)&&e.enableRandomFingerprint){R(o,V[u(V.length)])}return o})),r.intervalTime=t.intervalTime,w(t.intervalTime)&&!w(e.intervalTime)&&(r.intervalTime=e.intervalTime),r.onCrawlItemComplete=t.onCrawlItemComplete}async function A(e,t){const{detailTargetConfig:r,detailTargetResult:n,retryCount:o,maxRetry:a,crawlErrorQueue:i}=e,{browser:s}=t,l=o===a,c=n?.page??await s.newPage();r.viewport&&await c.setViewport(r.viewport);let u=null,m=!0;try{if(r.proxyUrl?await s.createIncognitoBrowserContext({proxyServer:r.proxyUrl}):await s.createIncognitoBrowserContext({proxyServer:void 0}),r.cookies){const e=function(e,t){const r=[];return"string"==typeof t?t.split("; ").forEach((t=>{const n=t.split("=");r.push({name:n[0],value:n[1],url:e})})):Array.isArray(t)?t.forEach((t=>{t.url||(t.url=e),r.push(t)})):"object"==typeof t&&t&&(t.url||(t.url=e),r.push(t)),r}(r.url,r.cookies);await c.setCookie(...e)}else{const e=await c.cookies(r.url);await c.deleteCookie(...e)}r.headers&&await c.setExtraHTTPHeaders(r.headers),u=await c.goto(r.url,{timeout:r.timeout})}catch(e){m=!1,i.push(e)}e.detailTargetResult={response:u,page:c};const p=!M(e),d=m&&p;e.isStatusNormal=p,e.isSuccess=d,(d||l)&&(e.isHandle=!0,function(e,t){const{detailTargetResult:r,result:n}=e,{browser:o,onCrawlItemComplete:a}=t;q(e),n.data={browser:o,...r},a&&a(e.result)}(e,t))}async function D(n,o){const{detailTargetConfig:s,crawlErrorQueue:l,maxRetry:c,retryCount:u}=n,m=c===u;let p=null,d=!0;try{p=await(f=s,new Promise(((e,t)=>{const{requestConfig:r,protocol:n,data:o}=O(f);function s(t){const{statusCode:r,headers:n}=t,o=[];t.on("data",(e=>o.push(e))),t.on("end",(()=>{const t=Buffer.concat(o);e({statusCode:r,headers:n,data:t})}))}const l="http:"===n?a.request(r,s):i.request(r,s);l.on("timeout",(()=>{t(new Error(`Timeout ${r.timeout}ms`))})),l.on("error",(e=>{t(e)})),w(o)||l.write(o),l.end()})))}catch(e){d=!1,l.push(e)}var f;n.detailTargetResult=p;const g=!M(n),h=d&&g;n.isStatusNormal=g,n.isSuccess=h,(h||m)&&(n.isHandle=!0,"html"===o.type?function(e,t){const{isSuccess:r,detailTargetResult:n,result:o}=e,{onCrawlItemComplete:a}=t;if(q(e),r&&n){const{data:e,headers:t,statusCode:r}=n,a=e.toString();o.data={statusCode:r,headers:t,html:a}}a&&a(o)}(n,o):"data"===o.type?function(e,t){const{isSuccess:r,detailTargetResult:n,result:o}=e,{onCrawlItemComplete:a}=t;if(q(e),r&&n){const e=n.headers["content-type"]??"",t=e.includes("application/json")?JSON.parse(n.data.toString()):e.includes("text")?n.data.toString():n.data;o.data={...n,data:t}}a&&a(o)}(n,o):"file"===o.type&&function(n,o){const{id:a,isSuccess:i,detailTargetConfig:s,detailTargetResult:l,result:c}=n,{saveFileErrorArr:u,saveFilePendingQueue:m,onCrawlItemComplete:p,onBeforeSaveItemFile:d}=o;if(q(n),i&&l){const o=l.headers["content-type"]??"",i=s.fileName??`${a}-${(new Date).getTime()}`,f=s.extension??`.${o.split("/").pop()}`;s.storeDir&&!e.existsSync(s.storeDir)&&e.mkdirSync(s.storeDir,{recursive:!0});const g=s.storeDir??__dirname,h=r.resolve(g,i+f),y=l.data;let w=Promise.resolve(y);d&&(w=d({id:a,fileName:i,filePath:h,data:y}));const x=w.then((async e=>{let r=!0;try{await t.writeFile(h,e)}catch(e){r=!1;const t=`File save error at id ${a}: ${e.message}`,n=()=>a;u.push({message:t,valueOf:n})}const s=e.length;c.data={...l,data:{isSuccess:r,fileName:i,fileExtension:f,mimeType:o,size:s,filePath:h}},p&&p(n.result)}));m.push(x)}else p&&p(n.result)}(n,o))}const N=["isSuccess","retryCount"];function q(e){Object.keys(e).forEach((t=>{N.includes(t)&&(e.result[t]=e[t])}))}function W(e){let t=null,r=null,o=!1;return async function(a,i){o||(o=!0,r=n.launch(e.crawlPage?.puppeteerLaunch).then((e=>{t=e}))),r&&(await r,r&&(r=null));const{detailTargets:s,intervalTime:l,onCrawlItemComplete:c}=function(e,t){const r={detailTargets:[],intervalTime:void 0,selectFingerprintIndexs:[],onCrawlItemComplete:void 0};let n={targets:[],detailTargets:[]};if(T(t)&&Object.hasOwn(t,"targets")){const{targets:e}=t;n=t,n.detailTargets=F(e)}else n.detailTargets=F(t);return k(e,n,r),r.detailTargets.forEach(((e,t)=>{const{cookies:o,viewport:a,fingerprint:i}=e;if(w(o)&&n.cookies&&(e.cookies=n.cookies),w(a)&&n.viewport&&(e.viewport=n.viewport),i)P(e,i);else if(w(i)&&n.fingerprints?.length){const o=r.selectFingerprintIndexs[t];P(e,n.fingerprints[o])}})),r}(e,a),u={type:"page",browser:t,intervalTime:l,onCrawlItemComplete:c},m=await E(e.mode,s,u,A),p=C(a)||T(a)&&Object.hasOwn(a,"targets")?m:m[0];return i&&i(p),p}}function H(e){return async function(t,r){const{detailTargets:n,intervalTime:o,onCrawlItemComplete:a}=function(e,t){const r={detailTargets:[],intervalTime:void 0,selectFingerprintIndexs:[],onCrawlItemComplete:void 0};let n={targets:[],detailTargets:[]};if(T(t)&&Object.hasOwn(t,"targets")){const{targets:e}=t;n={...n,...t},n.detailTargets=F(e)}else n.detailTargets=F(t);return k(e,n,r),r}(e,t),i={type:"html",intervalTime:o,onCrawlItemComplete:a},s=await E(e.mode,n,i,D),l=C(t)||T(t)&&Object.hasOwn(t,"targets")?s:s[0];return r&&r(l),l}}function B(e){return async function(t,r){const{detailTargets:n,intervalTime:o,onCrawlItemComplete:a}=function(e,t){const r={detailTargets:[],intervalTime:void 0,selectFingerprintIndexs:[],onCrawlItemComplete:void 0};let n={targets:[],detailTargets:[]};if(T(t)&&Object.hasOwn(t,"targets")){const{targets:e}=t;n=t,n.detailTargets=F(e)}else n.detailTargets=F(t);return k(e,n,r),r}(e,t),i={type:"data",intervalTime:o,onCrawlItemComplete:a},s=await E(e.mode,n,i,D),l=C(t)||T(t)&&Object.hasOwn(t,"targets")?s:s[0];return r&&r(l),l}}function L(e){return async function(t,r){const{detailTargets:n,intervalTime:o,onBeforeSaveItemFile:a,onCrawlItemComplete:i}=function(e,t){const r={detailTargets:[],intervalTime:void 0,selectFingerprintIndexs:[],onBeforeSaveItemFile:void 0,onCrawlItemComplete:void 0};let n={targets:[],detailTargets:[]};if(T(t)&&Object.hasOwn(t,"targets")){const{targets:e}=t;n=t,n.detailTargets=F(e)}else n.detailTargets=C(t)?t:[t];k(e,n,r);const o=!w(n?.storeDirs),a=v(n?.storeDirs)?0:1,i=!w(n?.extensions),s=(v(n?.extensions),!w(n?.fileNames));return r.detailTargets.forEach(((e,t)=>{w(e.storeDir)&&o&&(e.storeDir=0===a?n.storeDirs:n.storeDirs[t]),w(e.extension)&&i&&(e.extension=0===a?n.extensions:n.extensions[t]),w(e.fileName)&&s&&(e.fileName=n.fileNames[t])})),r.onBeforeSaveItemFile=n.onBeforeSaveItemFile,r}(e,t),s={type:"file",saveFileErrorArr:[],saveFilePendingQueue:[],intervalTime:o,onCrawlItemComplete:i,onBeforeSaveItemFile:a},l=await E(e.mode,n,s,D),{saveFilePendingQueue:c,saveFileErrorArr:u}=s;var p;await Promise.all(c),(p=u,function e(t,r){if(t>=r)return;const n=p[r];let o=t,a=r-1;for(;o<=a;){for(;p[o]<n;)o++;for(;p[a]>n;)a--;o<=a&&(j(p,o,a),o++,a--)}j(p,o,r),e(t,o-1),e(o+1,r)}(0,p.length-1),p).forEach((e=>m(g(e.message))));const h=[],y=[];l.forEach((e=>{e.data?.data.isSuccess?h.push(e.id):y.push(e.id)})),m(d("Save files finish:")),m(f(`  Success - total: ${h.length}, targets id: [ ${h.join(", ")} ]`)),m(g(`    Error - total: ${y.length}, targets id: [ ${y.join(", ")} ]`));const x=C(t)||T(t)&&Object.hasOwn(t,"targets")?l:l[0];return r&&r(x),x}}function U(e,t){const{d:r,h:n,m:o}=e,a=(w(r)?0:1e3*r*60*60*24)+(w(n)?0:1e3*n*60*60)+(w(o)?0:1e3*o*60);let i=0;l();const s=setInterval(l,a);function l(){console.log(p("Start polling - count: "+ ++i)),t(i,c)}function c(){clearInterval(s),console.log(h("Stop the polling"))}}const Q={mode:"async",enableRandomFingerprint:!0,timeout:1e4,maxRetry:0};const K=function(e){const t=function(e){const t=e||{};return Object.keys(Q).forEach((e=>{w(t[e])&&(t[e]=Q[e])})),t}(e);return function(e){return{crawlPage:W(e),crawlHTML:H(e),crawlData:B(e),crawlFile:L(e),startPolling:U}}(t)}();K.crawlHTML("http://localhost:8888/html").then((e=>{console.log(e.data?.html)}));

const B='tdc-v:',FT='tdc-fonts',F=["./", "index.html", "ratio.html", "comparateur.html", "pression.html", "rayons.html", "axes.html", "potence.html", "boitier.html", "direction.html", "ligne-de-chaine.html", "compatibilite.html", "labo-tirages.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png", "icons/apple-touch-icon.png"];
function hasV(){return caches.keys().then(k=>k.some(x=>x.indexOf(B)===0&&x!==B+'rt'))}
self.addEventListener('install',e=>{e.waitUntil(hasV().then(h=>{if(h)return;return fetch('version.json?t='+Date.now(),{cache:'no-store'}).then(r=>r.json()).catch(()=>({v:'boot',files:F})).then(j=>caches.open(B+j.v).then(c=>c.addAll((j.files||F).map(f=>new Request(f,{cache:'reload'})))))}).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.indexOf(B)!==0&&x!==FT).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.origin===location.origin){if(u.pathname.endsWith('/version.json')||u.searchParams.has('upd'))return;
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(m=>m||fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(B+'rt').then(c=>c.put(r,cp))}return res}).catch(()=>caches.match('index.html',{ignoreSearch:true}))));return}
 if(u.hostname.indexOf('fonts.')===0){e.respondWith(caches.open(FT).then(c=>c.match(r).then(m=>m||fetch(r).then(res=>{c.put(r,res.clone());return res}))))}
});

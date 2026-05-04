const SB  = 'https://ehwkunrszanoggawpgse.supabase.co/rest/v1';
const RPC = 'https://ehwkunrszanoggawpgse.supabase.co/rest/v1/rpc';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVod2t1bnJzemFub2dnYXdwZ3NlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNDkxMzIsImV4cCI6MjA5MjkyNTEzMn0.e9Mahf7jgaexLXiIciyGR-0bupzu21m_ucsZq0y60fE';
const H = {
  'apikey': KEY,
  'Authorization': 'Bearer ' + KEY,
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const SVC_COLORS = {seguridad:'#1d4ed8',bomberos:'#ea580c',salud:'#dc2626',farmacias:'#16a34a',monumentos:'#b45309'};

const ICO = {
  seguridad:{sz:[28,28],s:`<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" fill="#1d4ed8" stroke="white" stroke-width="1.5"/><path d="M10 3.5L14 6L14 11Q14 14.5 10 16.5Q6 14.5 6 11L6 6Z" fill="white" opacity=".9"/><path d="M8.5 10L9.5 11.2L11.5 8.8" stroke="#1d4ed8" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`},
  bomberos: {sz:[30,30],s:`<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 22 22"><path d="M11,2L12.5,7.5L17.5,4.5L14.5,9.5L20,11L14.5,12.5L17.5,17.5L12.5,14.5L11,20L9.5,14.5L4.5,17.5L7.5,12.5L2,11L7.5,9.5L4.5,4.5L9.5,7.5Z" fill="#ea580c" stroke="white" stroke-width="1.2" stroke-linejoin="round"/><path d="M11,7Q12.5,9 11.5,10.5Q13,9.5 12.5,11.5Q11.5,10 11,12Q10.5,10 9.5,11.5Q9,9.5 10.5,10.5Q9.5,9 11,7Z" fill="white" opacity=".9"/></svg>`},
  farmacias:{sz:[14,14],s:`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6" fill="#16a34a" stroke="white" stroke-width="1.5"/></svg>`},
  salud:    {sz:[20,20],s:`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" fill="white" stroke="#dc2626" stroke-width="2"/><rect x="8.5" y="4.5" width="3" height="11" rx="1.2" fill="#dc2626"/><rect x="4.5" y="8.5" width="11" height="3" rx="1.2" fill="#dc2626"/></svg>`},
  monumentos:{sz:[22,22],s:`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="10" fill="#b45309" stroke="white" stroke-width="1.5"/><rect x="5" y="16" width="12" height="2" rx=".5" fill="white"/><rect x="6" y="6" width="10" height="2" rx=".5" fill="white"/><rect x="7.5" y="8" width="1.5" height="8" rx=".5" fill="white"/><rect x="10.25" y="8" width="1.5" height="8" rx=".5" fill="white"/><rect x="13" y="8" width="1.5" height="8" rx=".5" fill="white"/><polygon points="6,6 11,3 16,6" fill="white" opacity=".9"/></svg>`},
};

const LAYERS = [
  {id:'sc__seguridad_4326',          name:'Seguridad',     t:'pt', src:'rest', ik:'seguridad',   color:'#1d4ed8', grp:'Puntos',    flds:['nombre','tipo','direccion'],                          latF:'lat',  lonF:'lon',  idF:'gid'},
  {id:'sc_bomberos_4326',            name:'Bomberos',      t:'pt', src:'rest', ik:'bomberos',    color:'#ea580c', grp:'Puntos',    flds:['nombre','tipo','direccion'],                          latF:'lat',  lonF:'lon',  idF:'gid'},
  {id:'sc_farmacias_4326',           name:'Farmacias',     t:'pt', src:'rest', ik:'farmacias',   color:'#16a34a', grp:'Puntos',    flds:['nombre','tipo','direccion'],                          latF:'lat',  lonF:'lon',  idF:'gid'},
  {id:'sc_salud_4326',               name:'Salud',         t:'pt', src:'rest', ik:'salud',       color:'#dc2626', grp:'Puntos',    flds:['nombre','tipo','direccion'],                          latF:'lat',  lonF:'lon',  idF:'gid'},
  {id:'SC_monumentos_historicos_4326',name:'Monumentos',   t:'pt', src:'rest', ik:'monumentos',  color:'#b45309', grp:'Puntos',    flds:['NOMBRE','TIPO','CATEGORIA','DESCRIPCION','DIRECCION'], latF:'LAT',  lonF:'LON',  idF:'ID'},
  {id:'sc_roads_4326',               name:'Vías',          t:'ln', src:'rpc',  ik:null,          color:'#d97706', grp:'Líneas',    flds:['name','fclass','oneway','maxspeed'],                  rpcFn:'get_roads_geojson',      offDefault:true},
  {id:'sc_buildings_4326',           name:'Edificaciones', t:'pg', src:'rpc',  ik:null,          color:'#7c3aed', grp:'Polígonos', flds:['name','fclass','type'],                              rpcFn:'get_buildings_geojson',  offDefault:true},
  {id:'SC_barrios_4326',             name:'Barrios',       t:'pg', src:'rpc',  ik:null,          color:'#0891b2', grp:'Polígonos', flds:['nombre','tipo','municipi'],                          rpcFn:'get_barrios_geojson', barrios:true, offDefault:true},
];

/* MAP */
const map = L.map('map',{zoomControl:false});
L.control.zoom({position:'topleft'}).addTo(map);
map.setView([0,0],3);
const BMS={
  light:L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',{attribution:'© OSM © CARTO',maxZoom:20}),
  osm:  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap',maxZoom:19}),
  dark: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{attribution:'© OSM © CARTO',maxZoom:20}),
  sat:  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{attribution:'© Esri',maxZoom:18}),
};
BMS.light.addTo(map); let curBM='light';
function setBM(n){if(curBM===n)return;map.removeLayer(BMS[curBM]);BMS[n].addTo(map);BMS[n].bringToBack();curBM=n;document.querySelectorAll('.bmbtn').forEach(b=>b.classList.remove('on'));document.getElementById('bm-'+n).classList.add('on');}
map.on('mousemove',e=>{document.getElementById('clat').textContent=e.latlng.lat.toFixed(6);document.getElementById('clng').textContent=e.latlng.lng.toFixed(6);});
map.on('zoomend',()=>document.getElementById('czoom').textContent=map.getZoom());
document.getElementById('czoom').textContent=map.getZoom();

let hintDone=false;
map.on('click',e=>{
  if(!hintDone){hintDone=true;const h=document.getElementById('map-hint');h.classList.add('hidden');setTimeout(()=>h.style.display='none',900);}
  openStatsPunto(e.latlng.lat,e.latlng.lng);
});

/* ROUTES */
const routeGroup=L.layerGroup().addTo(map);
const barrioHlGroup=L.layerGroup().addTo(map); // always-visible barrio outline
let clickMarker=null;
function clearRoutes(){
  routeGroup.clearLayers();
  if(clickMarker){map.removeLayer(clickMarker);clickMarker=null;}
  document.getElementById('clear-btn').classList.remove('visible');
  document.querySelectorAll('.svc-row.active').forEach(r=>r.classList.remove('active'));
}
function goToService(lat,lon,name,tipo,svcType,rowEl){
  const oLat=window._oLat,oLon=window._oLon;
  if(oLat==null)return;
  routeGroup.clearLayers();
  document.querySelectorAll('.svc-row.active').forEach(r=>r.classList.remove('active'));
  rowEl.classList.add('active');
  const color=SVC_COLORS[svcType]||'#1d4ed8';
  const ico=ICO[svcType];

  // Straight-line distance (always available instantly)
  const distStraight=haversine(oLat,oLon,lat,lon);
  const fmtD=d=>d>=1000?(d/1000).toFixed(2)+' km':Math.round(d)+' m';

  // Draw origin marker immediately
  L.circleMarker([oLat,oLon],{radius:8,color:'#1d4ed8',weight:2.5,fillColor:'#eff4ff',fillOpacity:.95}).addTo(routeGroup);
  L.marker([oLat,oLon],{icon:L.divIcon({className:'',html:`<div style="background:#1d4ed8;color:#fff;font-size:9px;font-weight:700;padding:2px 7px;border-radius:10px;margin-top:-26px;margin-left:10px;white-space:nowrap;box-shadow:0 1px 4px rgba(0,0,0,.3)">📍 Origen</div>`,iconAnchor:[0,0]}),interactive:false}).addTo(routeGroup);

  // Draw destination marker
  const dest=L.circleMarker([lat,lon],{radius:11,color,weight:3,fillColor:'#fff',fillOpacity:.95}).addTo(routeGroup);
  L.marker([lat,lon],{icon:L.icon({iconUrl:'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(ico.s),iconSize:ico.sz,iconAnchor:[ico.sz[0]/2,ico.sz[1]/2]}),interactive:false,zIndexOffset:1000}).addTo(routeGroup);

  function openPopup(routeDist, routeDur, byRoute){
    const straightTxt=fmtD(distStraight);
    const routeTxt=byRoute?fmtD(routeDist):'—';
    const durTxt=byRoute?`${Math.round(routeDur/60)} min`:'—';
    dest.bindPopup(`
      <div class="pop">
        <div class="pop-head">${ico.s} ${name||tipo||'Servicio'}</div>
        <div class="pop-row"><span class="pop-k">tipo</span><span class="pop-v">${tipo||'—'}</span></div>
        <div class="pop-row" style="margin-top:6px;padding-top:6px;border-top:1px solid #e5e7eb">
          <span class="pop-k" style="color:#6b7280;font-size:9px">📏 línea recta</span>
          <span class="pop-v" style="font-weight:600;color:#374151">${straightTxt}</span>
        </div>
        <div class="pop-row">
          <span class="pop-k" style="color:#1d4ed8;font-size:9px">🛣 por ruta</span>
          <span class="pop-v" style="font-weight:700;color:#1d4ed8">${routeTxt}</span>
        </div>
        <div class="pop-row">
          <span class="pop-k" style="color:#6b7280;font-size:9px">🚶 a pie</span>
          <span class="pop-v" style="font-weight:600;color:#374151">${durTxt}</span>
        </div>
        ${!byRoute?'<div style="font-size:9px;color:#f59e0b;margin-top:4px">⚠ Ruta sin conexión · solo línea recta</div>':''}
      </div>`,{maxWidth:260}).openPopup();
  }

  // Routing: OpenRouteService foot-walking → OSRM foot → línea recta
  const orsUrl=`https://api.openrouteservice.org/v2/directions/foot-walking?api_key=5b3ce3597851110001cf624820b8e22c3a9f4e2093c7a8f7b9e8e3f3&start=${oLon},${oLat}&end=${lon},${lat}`;

  fetch(orsUrl,{headers:{'Accept':'application/json, application/geo+json'}})
    .then(r=>{if(!r.ok)throw new Error('ors fail');return r.json();})
    .then(data=>{
      if(!data.features||!data.features.length) throw new Error('no features');
      const feat=data.features[0];
      const routeDist=feat.properties.summary.distance;   // metres
      const routeDur=feat.properties.summary.duration;    // seconds
      const coords=feat.geometry.coordinates.map(([lng,lt])=>[lt,lng]);

      L.polyline(coords,{color,weight:4,opacity:.88}).addTo(routeGroup);
      const mid=coords[Math.floor(coords.length/2)];
      L.marker(mid,{icon:L.divIcon({className:'',
        html:`<div style="background:${color};color:#fff;font-size:10px;font-weight:700;padding:2px 9px;border-radius:10px;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,.25);border:1.5px solid #fff">🛣 ${fmtD(routeDist)}</div>`,
        iconAnchor:[40,10]}),interactive:false}).addTo(routeGroup);

      openPopup(routeDist,routeDur,true);
      map.fitBounds(L.polyline(coords).getBounds(),{padding:[60,60],maxZoom:17});
    })
    .catch(()=>{
      // Fallback: OSRM foot
      const osrmUrl=`https://router.project-osrm.org/route/v1/foot/${oLon},${oLat};${lon},${lat}?overview=full&geometries=geojson`;
      fetch(osrmUrl)
        .then(r=>r.json())
        .then(data=>{
          if(data.code!=='Ok'||!data.routes||!data.routes.length) throw new Error('no route');
          const route=data.routes[0];
          const coords=route.geometry.coordinates.map(([lng,lt])=>[lt,lng]);
          L.polyline(coords,{color,weight:4,opacity:.85}).addTo(routeGroup);
          const mid=coords[Math.floor(coords.length/2)];
          L.marker(mid,{icon:L.divIcon({className:'',
            html:`<div style="background:${color};color:#fff;font-size:10px;font-weight:700;padding:2px 9px;border-radius:10px;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,.25);border:1.5px solid #fff">🛣 ${fmtD(route.distance)}</div>`,
            iconAnchor:[40,10]}),interactive:false}).addTo(routeGroup);
          openPopup(route.distance,route.duration,true);
          map.fitBounds(L.polyline(coords).getBounds(),{padding:[60,60],maxZoom:17});
        })
        .catch(()=>{
          // Fallback 2: línea recta
          L.polyline([[oLat,oLon],[lat,lon]],{color,weight:3,dashArray:'8,5',opacity:.8}).addTo(routeGroup);
          const mid=[(oLat+lat)/2,(oLon+lon)/2];
          L.marker(mid,{icon:L.divIcon({className:'',
            html:`<div style="background:${color};color:#fff;font-size:10px;font-weight:700;padding:2px 9px;border-radius:10px;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,.25);border:1.5px solid #fff">${fmtD(distStraight)}</div>`,
            iconAnchor:[30,10]}),interactive:false}).addTo(routeGroup);
          openPopup(null,null,false);
          map.fitBounds([[oLat,oLon],[lat,lon]],{padding:[60,60],maxZoom:17});
        });
    });

  document.getElementById('clear-btn').classList.add('visible');
}
function haversine(a,b,c,d){const R=6371000,dL=(c-a)*Math.PI/180,dO=(d-b)*Math.PI/180,x=Math.sin(dL/2)**2+Math.cos(a*Math.PI/180)*Math.cos(c*Math.PI/180)*Math.sin(dO/2)**2;return R*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x));}

/* UTILS */
function showToast(msg,err=false){const el=document.getElementById('toast');el.textContent=msg;el.className=err?'err':'';el.style.display='block';clearTimeout(el._t);el._t=setTimeout(()=>el.style.display='none',5000);}
async function restFetch(table,qs){
  const r=await fetch(`${SB}/${table}?${qs}`,{headers:H});
  if(!r.ok)throw new Error(`REST ${r.status}: ${await r.text()}`);
  return r.json();
}
async function rpc(fn,body={}){
  const r=await fetch(`${RPC}/${fn}`,{method:'POST',headers:H,body:JSON.stringify(body)});
  if(!r.ok)throw new Error(`RPC ${r.status}: ${await r.text()}`);
  return r.json();
}

/* ICONS */
function mkIco(k){const c=ICO[k];return L.icon({iconUrl:'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(c.s),iconSize:c.sz,iconAnchor:[c.sz[0]/2,c.sz[1]/2],popupAnchor:[0,-c.sz[1]/2-2]});}
function legIco(cfg){
  if(cfg.t==='pt')return`<div class="sym-wrap">${ICO[cfg.ik].s}</div>`;
  if(cfg.t==='ln')return`<div class="sym-wrap"><div class="sym-ln" style="background:${cfg.color}"></div></div>`;
  return`<div class="sym-wrap"><div class="sym-pg" style="background:${cfg.color}22;border-color:${cfg.color}"></div></div>`;
}
function mkPop(props,flds,name,ik){
  const ico=ik?`<span>${ICO[ik].s}</span>`:'';
  let h=`<div class="pop"><div class="pop-head">${ico} ${name}</div>`;
  flds.forEach(f=>{const v=props[f]??props[f.toLowerCase()]??props[f.toUpperCase()];if(v!=null&&String(v).trim())h+=`<div class="pop-row"><span class="pop-k">${f.toLowerCase()}</span><span class="pop-v">${v}</span></div>`;});
  const gid=props.gid??props.id??props.ID;
  if(gid!=null)h+=`<div class="pop-row"><span class="pop-k">id</span><span class="pop-v">${gid}</span></div>`;
  return h+'</div>';
}

/* STATE */
const ST={};
let allOn=true,fitted=false,loaded=0,hlLayer=null;

/* LOAD LAYER */
async function loadLayer(cfg){
  setUI(cfg.id,'loading',null);
  try{
    let lyr;
    if(cfg.t==='pt'){
      const selFlds=cfg.flds.map(f=>`"${f}"`).join(',');
      const idQ=`"${cfg.idF}"`;
      const rows=await restFetch(cfg.id,`select=${idQ},"${cfg.latF}","${cfg.lonF}",${selFlds}&limit=5000`);
      const ico=mkIco(cfg.ik);const mks=[];
      rows.forEach(r=>{
        const la=parseFloat(r[cfg.latF]);
        const lo=parseFloat(r[cfg.lonF]);
        if(isNaN(la)||isNaN(lo))return;
        const m=L.marker([la,lo],{icon:ico});
        m.bindPopup(mkPop(r,cfg.flds,cfg.name,cfg.ik),{maxWidth:280});
        m.on('click',function(e){
          L.DomEvent.stopPropagation(e);this.openPopup();
          const nm=r[cfg.flds[0]]||r[cfg.flds[0].toUpperCase()]||cfg.name;
          openStatsPunto(la,lo,nm);
        });
        mks.push(m);
      });
      if(!mks.length){setUI(cfg.id,'empty',0);return;}
      lyr=L.layerGroup(mks);setUI(cfg.id,'ok',mks.length);
      if(!fitted){const b=L.latLngBounds(mks.map(m=>m.getLatLng()));if(b.isValid()){map.fitBounds(b,{padding:[50,50]});fitted=true;}}
    } else {
      const geojson=await rpc(cfg.rpcFn);
      const feats=geojson.features||[];
      if(!feats.length){setUI(cfg.id,'empty',0);return;}
      const isBarrios=cfg.barrios;
      lyr=L.geoJSON(geojson,{
        style:()=>({color:cfg.color,weight:isBarrios?2:(cfg.t==='ln'?2:1.5),opacity:.9,fillColor:cfg.color,fillOpacity:isBarrios?0.08:(cfg.t==='pg'?0.18:0),dashArray:isBarrios?'6,4':null}),
        onEachFeature:(feat,layer)=>{
          const p=feat.properties||{};
          if(isBarrios){
            layer.on('mouseover',function(){
              if(this!==hlLayer)this.setStyle({fillOpacity:.2,weight:3});
              const nm=p.nombre||p.NOMBRE||'';
              this.bindTooltip(`<b>${nm}</b>`,{className:'barrio-tt',sticky:true}).openTooltip();
            });
            layer.on('mouseout',function(){if(this!==hlLayer)lyr.resetStyle(this);this.closeTooltip();});
            layer.on('click',e=>{
              L.DomEvent.stopPropagation(e);
              const bid=p.id||p.ID;
              const bnm=p.nombre||p.NOMBRE||'Barrio';
              hlBarrio(layer,lyr);openStatsBarrio(bid,bnm,layer);
            });
          } else {
            layer.bindPopup(mkPop(p,cfg.flds,cfg.name,null),{maxWidth:265});
            layer.on('mouseover',function(){this.openPopup();});
          }
        }
      });
      setUI(cfg.id,'ok',feats.length);
      if(!fitted){try{const b=lyr.getBounds();if(b.isValid()){map.fitBounds(b,{padding:[50,50]});fitted=true;}}catch(e){}}
    }
    if(cfg.offDefault){
      ST[cfg.id].lyr=lyr; ST[cfg.id].vis=false;
      // Remove the 'on' class from toggle since layer starts hidden
      const swEl=document.querySelector(`.lyrow[data-id="${cfg.id}"] .sw`);
      if(swEl) swEl.classList.remove('on');
    } else {
      lyr.addTo(map); ST[cfg.id].lyr=lyr; ST[cfg.id].vis=true;
    }
    document.getElementById('dot').className='dot ok';
    document.getElementById('stxt').textContent='Conectado';
  }catch(err){
    console.error(`[${cfg.name}]`,err);setUI(cfg.id,'error',null);
    showToast(`Error en ${cfg.name}: ${err.message}`,true);
    document.getElementById('dot').className='dot err';
    document.getElementById('stxt').textContent='Error';
  }finally{
    loaded++;
    document.getElementById('loader-sub').textContent=`${loaded}/${LAYERS.length} — ${cfg.name}`;
    if(loaded===LAYERS.length){const el=document.getElementById('loader');el.classList.add('gone');setTimeout(()=>el.style.display='none',600);}
  }
}

/* BARRIO HIGHLIGHT */
function hlBarrio(layer,parentLyr){
  // Reset style on all barrio polygons (if layer is visible)
  const bc=LAYERS.find(l=>l.barrios);
  if(bc&&ST[bc.id]&&ST[bc.id].lyr)ST[bc.id].lyr.resetStyle();
  hlLayer=layer;
  // If barrio layer is visible, style it directly
  if(bc&&ST[bc.id]&&ST[bc.id].vis){
    layer.setStyle({color:'#0891b2',weight:3,fillColor:'#0891b2',fillOpacity:.22,dashArray:null});
    layer.bringToFront();
  }
  // Always draw a highlight outline in the dedicated group (visible regardless of layer toggle)
  barrioHlGroup.clearLayers();
  try{
    const geom=layer.feature&&layer.feature.geometry;
    if(geom){
      L.geoJSON(geom,{
        style:()=>({color:'#0891b2',weight:3,fillColor:'#0891b2',fillOpacity:.15,dashArray:null})
      }).addTo(barrioHlGroup);
    }
  }catch(e){}
  try{const b=layer.getBounds();if(b.isValid())map.fitBounds(b,{padding:[70,70],maxZoom:15});}catch(e){}
}
function hlBarrioById(id){
  const bc=LAYERS.find(l=>l.barrios);
  if(!bc||!ST[bc.id]||!ST[bc.id].lyr)return false;
  ST[bc.id].lyr.resetStyle();hlLayer=null;
  let found=false;
  ST[bc.id].lyr.eachLayer(layer=>{
    const p=layer.feature&&layer.feature.properties;if(!p)return;
    const lid=p.id??p.ID;
    if(String(lid)===String(id)){hlBarrio(layer,ST[bc.id].lyr);found=true;}
  });
  return found;
}

/* STATS PANEL */
function closeStats(){
  document.getElementById('sp').classList.remove('open');
  hlLayer=null;
  const bc=LAYERS.find(l=>l.barrios);
  if(bc&&ST[bc.id]&&ST[bc.id].lyr)ST[bc.id].lyr.resetStyle();
  barrioHlGroup.clearLayers();
  clearRoutes();window._oLat=null;window._oLon=null;window._oName=null;
}
async function openStatsBarrio(bid,nombre,layer){
  clearRoutes();
  document.getElementById('sp-title').textContent=nombre;
  document.getElementById('sp-sub').textContent='Barrio · Santiago de Compostela';
  document.getElementById('sp-badge').textContent='BARRIO';
  document.getElementById('sp-body').innerHTML=`<div class="sp-loading"><div class="spin"></div><div class="sp-loading-txt">Calculando estadísticas…</div></div>`;
  document.getElementById('sp').classList.add('open');
  try{const c=layer.getBounds().getCenter();window._oLat=c.lat;window._oLon=c.lng;window._oName=nombre;}catch(e){}
  try{const data=await rpc('estadisticas_barrio',{barrio_id:parseInt(bid)});renderStats(data,true);}
  catch(err){document.getElementById('sp-body').innerHTML=`<div class="sp-empty">⚠ ${err.message}</div>`;}
}
async function openStatsPunto(lat,lon,name){
  clearRoutes();
  if(clickMarker)map.removeLayer(clickMarker);
  clickMarker=L.circleMarker([lat,lon],{radius:9,color:'#1d4ed8',weight:2.5,fillColor:'#eff4ff',fillOpacity:.95,zIndexOffset:500}).addTo(map);
  window._oLat=lat;window._oLon=lon;window._oName=name||'Punto en el mapa';
  document.getElementById('sp-title').textContent=window._oName;
  document.getElementById('sp-sub').textContent=`${lat.toFixed(5)}, ${lon.toFixed(5)}`;
  document.getElementById('sp-badge').textContent='SERVICIOS CERCANOS';
  document.getElementById('sp-body').innerHTML=`<div class="sp-loading"><div class="spin"></div><div class="sp-loading-txt">Buscando servicios…</div></div>`;
  document.getElementById('sp').classList.add('open');
  try{const data=await rpc('servicios_cercanos',{lat,lon});renderStats(data,false);}
  catch(err){document.getElementById('sp-body').innerHTML=`<div class="sp-empty">⚠ ${err.message}</div>`;}
}

/* RENDER STATS */
function dCls(m){return m<500?'d-near':m<1500?'d-mid':'d-far';}
function fmtD(m){return m>=1000?(m/1000).toFixed(1)+' km':m+' m';}
function svcCard(title,hCls,icoKey,items){
  const ico=ICO[icoKey]?ICO[icoKey].s:'';
  if(!items||!items.length)return`<div class="stat-card"><div class="sc-head ${hCls}">${ico} ${title}</div><div class="sp-empty">Sin datos</div></div>`;
  const rows=items.map(it=>`
    <div class="svc-row" data-lat="${it.lat??''}" data-lon="${it.lon??''}" data-name="${(it.nombre||'').replace(/"/g,'&quot;')}" data-tipo="${(it.tipo||'').replace(/"/g,'&quot;')}" data-svctype="${icoKey}" onclick="onSvcClick(this)">
      <div class="svc-ico">${ico}</div>
      <div class="svc-info"><div class="svc-name">${it.nombre||'—'}</div><div class="svc-addr">${it.descripcion||it.direccion||it.tipo||'—'}</div></div>
      <div class="svc-right"><span class="svc-dist ${dCls(it.distancia_m)}">${fmtD(it.distancia_m)}</span>${it.lat!=null?`<span class="svc-goto">↗ ver</span>`:''}</div>
    </div>`).join('');
  return`<div class="stat-card"><div class="sc-head ${hCls}">${ico} ${title} <span style="font-weight:400;opacity:.5;font-size:9px">— clic para ir</span></div>${rows}</div>`;
}
function onSvcClick(rowEl){
  const lat=parseFloat(rowEl.dataset.lat),lon=parseFloat(rowEl.dataset.lon);
  if(isNaN(lat)||isNaN(lon)){showToast('Coordenadas no disponibles',true);return;}
  goToService(lat,lon,rowEl.dataset.name,rowEl.dataset.tipo,rowEl.dataset.svctype,rowEl);
}
function renderStats(d,showVias){
  const oLat=window._oLat,oLon=window._oLon,oName=window._oName||'Punto de consulta';
  let html=`<div class="origin-box"><div class="origin-pin">📍</div><div class="origin-info"><div class="origin-lbl">Punto de consulta</div><div class="origin-name">${oName}</div><div class="origin-coords">${oLat!=null?oLat.toFixed(5):''}, ${oLon!=null?oLon.toFixed(5):''}</div></div></div>`;
  if(showVias){
    const v=d.vias||{};
    const km=v.longitud_m?(v.longitud_m/1000).toFixed(2):'—';
    html+=`<div class="stat-card"><div class="sc-head h-vias"><svg width="13" height="13" viewBox="0 0 13 13"><line x1="1" y1="6.5" x2="12" y2="6.5" stroke="#d97706" stroke-width="2.5" stroke-linecap="round"/><line x1="1" y1="3" x2="12" y2="3" stroke="#d97706" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="2,2"/></svg> Red Vial</div><div class="vias-nums"><div class="vias-num"><div class="vn-val">${km}</div><div class="vn-lbl">km de vías</div></div><div class="vias-num"><div class="vn-val">${(v.num_segmentos||0).toLocaleString()}</div><div class="vn-lbl">segmentos</div></div></div></div>`;
  }
  html+=svcCard('Seguridad', 'h-seg', 'seguridad', d.seguridad);
  html+=svcCard('Bomberos',  'h-bomb','bomberos',  d.bomberos);
  html+=svcCard('Salud',     'h-sal', 'salud',     d.salud);
  html+=svcCard('Farmacias', 'h-farm','farmacias', d.farmacias);
  html+=svcCard('Monumentos','h-mon', 'monumentos',d.monumentos);
  document.getElementById('sp-body').innerHTML=html;
}

/* SEARCH BARRIOS */
let srchT=null;
const srchIn=document.getElementById('srch'),srchDr=document.getElementById('srch-drop');
srchIn.addEventListener('input',()=>{
  const q=srchIn.value.trim();
  document.getElementById('s-clr').style.display=q?'block':'none';
  document.getElementById('s-ico').style.display=q?'none':'block';
  clearTimeout(srchT);if(q.length<2){srchDr.classList.remove('open');return;}
  srchT=setTimeout(()=>doSearch(q),300);
});
srchIn.addEventListener('focus',()=>{if(srchIn.value.trim().length>=2)srchDr.classList.add('open');});
document.addEventListener('click',e=>{if(!e.target.closest('.search-wrap'))srchDr.classList.remove('open');});
function clearSearch(){srchIn.value='';document.getElementById('s-clr').style.display='none';document.getElementById('s-ico').style.display='block';srchDr.classList.remove('open');closeStats();}
async function doSearch(q){
  srchDr.innerHTML='<div class="sd-msg">Buscando…</div>';srchDr.classList.add('open');
  try{
    const res=await rpc('buscar_barrios',{texto:q});
    if(!res||!res.length){srchDr.innerHTML=`<div class="sd-msg">Sin resultados para "${q}"</div>`;return;}
    srchDr.innerHTML=res.map(r=>`<div class="sd-item" data-id="${r.id}" data-nombre="${r.nombre}" data-lat="${r.lat_c}" data-lon="${r.lon_c}"><div class="sd-name">${r.nombre}</div><div class="sd-meta">${[r.tipo,r.municipio].filter(Boolean).join(' · ')}</div></div>`).join('');
    srchDr.querySelectorAll('.sd-item').forEach(el=>el.addEventListener('click',()=>{
      const id=el.dataset.id,nombre=el.dataset.nombre;
      const la=parseFloat(el.dataset.lat),lo=parseFloat(el.dataset.lon);
      srchIn.value=nombre;srchDr.classList.remove('open');
      document.getElementById('s-clr').style.display='block';
      document.getElementById('s-ico').style.display='none';
      if(!isNaN(la)&&!isNaN(lo))map.setView([la,lo],15,{animate:true});
      const found=hlBarrioById(id);
      if(found){
        const bc=LAYERS.find(l=>l.barrios);
        if(bc&&ST[bc.id]&&ST[bc.id].lyr){
          ST[bc.id].lyr.eachLayer(layer=>{
            const p=layer.feature&&layer.feature.properties;if(!p)return;
            const lid=p.id??p.ID;
            if(String(lid)===String(id))openStatsBarrio(id,nombre,layer);
          });
        }
      } else {
        window._oLat=la;window._oLon=lo;window._oName=nombre;
        document.getElementById('sp-title').textContent=nombre;
        document.getElementById('sp-sub').textContent='Barrio · Santiago de Compostela';
        document.getElementById('sp-badge').textContent='BARRIO';
        document.getElementById('sp-body').innerHTML=`<div class="sp-loading"><div class="spin"></div><div class="sp-loading-txt">Calculando estadísticas…</div></div>`;
        document.getElementById('sp').classList.add('open');
        rpc('estadisticas_barrio',{barrio_id:parseInt(id)}).then(data=>renderStats(data,true)).catch(err=>document.getElementById('sp-body').innerHTML=`<div class="sp-empty">⚠ ${err.message}</div>`);
      }
    }));
  }catch(err){srchDr.innerHTML=`<div class="sd-msg" style="color:var(--red)">Error: ${err.message}</div>`;}
}

/* LAYER UI */
function setUI(id,st,count){
  const row=document.querySelector(`.lyrow[data-id="${id}"]`);if(!row)return;
  row.querySelector('.spin')?.remove();
  const cnt=row.querySelector('.lycount'),sw=row.querySelector('.sw');
  if(st==='loading'){const s=document.createElement('div');s.className='spin';row.querySelector('.lymeta').appendChild(s);}
  if(st==='ok'){if(cnt){cnt.textContent=count.toLocaleString();cnt.className='lycount';}if(sw)sw.classList.add('on');}
  if(st==='error'&&cnt){cnt.textContent='Error';cnt.className='lycount err';}
  if(st==='empty'&&cnt){cnt.textContent='0';cnt.className='lycount empty';}
}
function toggleLayer(id){
  const s=ST[id];if(!s||!s.lyr)return;s.vis=!s.vis;
  if(s.vis)s.lyr.addTo(map);else map.removeLayer(s.lyr);
  document.querySelector(`.lyrow[data-id="${id}"] .sw`)?.classList.toggle('on',s.vis);
}
function toggleAll(){
  allOn=!allOn;document.getElementById('btnall').textContent=allOn?'Ocultar todas':'Mostrar todas';
  LAYERS.forEach(c=>{const s=ST[c.id];if(!s||!s.lyr)return;if(allOn&&!s.vis)toggleLayer(c.id);if(!allOn&&s.vis)toggleLayer(c.id);});
}
let sbOpen=true;
function toggleSb(){sbOpen=!sbOpen;document.getElementById('sidebar').classList.toggle('closed',!sbOpen);}

/* BUILD SIDEBAR */
function buildSidebar(){
  const panel=document.getElementById('lylist');const grps={};
  LAYERS.forEach(cfg=>{ST[cfg.id]={lyr:null,vis:false};(grps[cfg.grp]=grps[cfg.grp]||[]).push(cfg);});
  Object.entries(grps).forEach(([g,cfgs])=>{
    const wrap=document.createElement('div');
    wrap.innerHTML=`<div class="grplabel">${g}</div>`;
    cfgs.forEach(cfg=>{
      const row=document.createElement('div');row.className='lyrow';row.setAttribute('data-id',cfg.id);
      row.innerHTML=`
        <div class="sw" onclick="toggleLayer('${cfg.id}');event.stopPropagation()"></div>
        ${legIco(cfg)}
        <div class="lyinfo"><div class="lyname">${cfg.name}</div><div class="lymeta"><span>${cfg.t==='pt'?'POINT':cfg.t==='ln'?'LINESTRING':'POLYGON'}</span><span class="lycount">—</span></div></div>
        <span class="zoom-hint">↗ zoom</span>`;
      row.addEventListener('click',()=>{
        const s=ST[cfg.id];if(!s||!s.lyr||!s.vis)return;
        try{let b;if(cfg.t==='pt'){const pts=[];s.lyr.eachLayer(m=>pts.push(m.getLatLng()));if(pts.length)b=L.latLngBounds(pts);}else b=s.lyr.getBounds();if(b&&b.isValid())map.fitBounds(b,{padding:[30,30]});}catch(e){}
      });
      wrap.appendChild(row);
    });
    panel.appendChild(wrap);
  });
}

/* START */
buildSidebar();

// Apply basemap chosen from landing page
(function(){
  const bm = sessionStorage.getItem('geoportal_bm');
  if(bm && BMS[bm]) {
    sessionStorage.removeItem('geoportal_bm');
    setBM(bm);
  }
})();

(async()=>{ for(const cfg of LAYERS) await loadLayer(cfg); })();

/* ══ MONUMENT SEARCH ══ */
(function(){
  let monTimer=null, monAll=[], monFiltered=[], monActiveCat='all', monActiveItem=null, monHlMarker=null;
  const inp = document.getElementById('mon-srch');
  const panel = document.getElementById('mon-panel');
  const resultsEl = document.getElementById('mon-results');
  const filtersEl = document.getElementById('mon-filters');
  const counterEl = document.getElementById('mon-counter');
  const countTxtEl = document.getElementById('mon-count-txt');
  const queryTxtEl = document.getElementById('mon-query-txt');

  document.getElementById('mon-close').addEventListener('click', closeMonPanel);

  inp.addEventListener('input', function(){
    const q = this.value.trim();
    clearTimeout(monTimer);
    if(!q){closeMonPanel();return;}
    panel.classList.add('open');
    monTimer = setTimeout(()=>doMonSearch(q), 280);
  });

  inp.addEventListener('focus', function(){
    if(this.value.trim() && monAll.length) panel.classList.add('open');
  });

  document.addEventListener('click', function(e){
    if(!e.target.closest('#mon-panel') && !e.target.closest('#mon-srch'))
      panel.classList.remove('open');
  });

  function closeMonPanel(){
    panel.classList.remove('open');
    clearMonHl();
  }

  function clearMonHl(){
    if(monHlMarker){map.removeLayer(monHlMarker);monHlMarker=null;}
    if(monActiveItem){monActiveItem.classList.remove('active');monActiveItem=null;}
  }

  async function doMonSearch(q){
    resultsEl.innerHTML='<div class="mon-msg">Buscando…</div>';
    counterEl.style.display='none';
    try{
      const res = await rpc('buscar_monumentos',{texto:q});
      monAll = res||[];
      buildFilters(monAll);
      monActiveCat='all';
      document.querySelectorAll('.mon-filter').forEach(f=>f.classList.toggle('active',f.dataset.cat==='all'));
      applyFilter();
      queryTxtEl.textContent='"'+q+'"';
    }catch(err){
      resultsEl.innerHTML=`<div class="mon-msg" style="color:var(--red)">Error: ${err.message}</div>`;
    }
  }

  function buildFilters(data){
    const cats=new Set();
    data.forEach(d=>{if(d.categoria)cats.add(d.categoria);});
    filtersEl.innerHTML='<span class="mon-filter active" data-cat="all">Todos</span>';
    cats.forEach(cat=>{
      const s=document.createElement('span');
      s.className='mon-filter'; s.dataset.cat=cat; s.textContent=cat;
      filtersEl.appendChild(s);
    });
    filtersEl.querySelectorAll('.mon-filter').forEach(f=>f.addEventListener('click',function(){
      monActiveCat=this.dataset.cat;
      filtersEl.querySelectorAll('.mon-filter').forEach(x=>x.classList.remove('active'));
      this.classList.add('active');
      applyFilter();
    }));
  }

  function applyFilter(){
    monFiltered = monActiveCat==='all' ? monAll : monAll.filter(d=>d.categoria===monActiveCat);
    renderResults(monFiltered);
  }

  function renderResults(data){
    counterEl.style.display='flex';
    countTxtEl.textContent=data.length+' resultado'+(data.length!==1?'s':'');
    if(!data.length){resultsEl.innerHTML='<div class="mon-msg">Sin resultados para este filtro.</div>';return;}
    const icoSvg=ICO.monumentos.s;
    resultsEl.innerHTML=data.map((it,i)=>`
      <div class="mon-item" data-idx="${i}" data-lat="${it.lat??''}" data-lon="${it.lon??''}" data-nombre="${(it.nombre||'').replace(/"/g,'&quot;')}">
        <div class="mon-item-ico">${icoSvg}</div>
        <div class="mon-item-info">
          <div class="mon-item-name">${it.nombre||'—'}</div>
          <div class="mon-item-tipo">${it.tipo||''}</div>
          <div class="mon-item-cat">${it.categoria||''}</div>
          ${it.descripcion?`<div class="mon-item-desc">${it.descripcion}</div>`:''}
          ${it.direccion?`<div class="mon-item-addr">📍 ${it.direccion}</div>`:''}
        </div>
        <span class="mon-goto">↗</span>
      </div>`).join('');

    resultsEl.querySelectorAll('.mon-item').forEach(el=>el.addEventListener('click',function(){
      const lat=parseFloat(this.dataset.lat), lon=parseFloat(this.dataset.lon);
      clearMonHl();
      this.classList.add('active'); monActiveItem=this;
      if(isNaN(lat)||isNaN(lon)){showToast('Coordenadas no disponibles',true);return;}
      map.setView([lat,lon],17,{animate:true});
      const idx=parseInt(this.dataset.idx);
      const it=monFiltered[idx]||{};
      monHlMarker=L.marker([lat,lon],{
        icon:L.divIcon({
          className:'',
          html:`<div style="position:relative;width:40px;height:40px;">
            <div style="position:absolute;inset:0;border-radius:50%;background:rgba(180,83,9,.2);animation:spinning 2s linear infinite;"></div>
            <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);">${ICO.monumentos.s}</div>
          </div>`,
          iconSize:[40,40],iconAnchor:[20,20],popupAnchor:[0,-22]
        }),
        zIndexOffset:2000
      }).addTo(map);
      monHlMarker.bindPopup(`<div class="pop">
        <div class="pop-head">${ICO.monumentos.s} ${it.nombre||''}</div>
        ${it.tipo?`<div class="pop-row"><span class="pop-k">tipo</span><span class="pop-v">${it.tipo}</span></div>`:''}
        ${it.categoria?`<div class="pop-row"><span class="pop-k">categoría</span><span class="pop-v">${it.categoria}</span></div>`:''}
        ${it.descripcion?`<div class="pop-row"><span class="pop-k">descripción</span><span class="pop-v">${it.descripcion}</span></div>`:''}
        ${it.direccion?`<div class="pop-row"><span class="pop-k">dirección</span><span class="pop-v">${it.direccion}</span></div>`:''}
      </div>`,{maxWidth:280}).openPopup();
    }));
  }
})();

/* ══════════════════════════════════════
   REPORTES CIUDADANOS
══════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", function(){
(function(){
  const REPORTE_ICONS = {
    obra_vial:        {emoji:'🚧', color:'#d97706', label:'Obra vial'},
    evento_cultural:  {emoji:'🎭', color:'#7c3aed', label:'Evento cultural'},
    incidencia_urbana:{emoji:'🏚', color:'#6b7280', label:'Incidencia urbana'},
    seguridad:        {emoji:'🚨', color:'#dc2626', label:'Seguridad'},
    riesgo_ambiental: {emoji:'⚠️', color:'#d97706', label:'Riesgo ambiental'},
    movilidad:        {emoji:'🚌', color:'#2563eb', label:'Movilidad'},
    accesibilidad:    {emoji:'♿', color:'#0891b2', label:'Accesibilidad'},
    limpieza:         {emoji:'🧹', color:'#15803d', label:'Limpieza'},
  };

  let selectedTipo=null, selectedLat=null, selectedLon=null;
  let pickingFromMap=false, reportesLayer=null;

  const fab       = document.getElementById('report-fab');
  const modalBg   = document.getElementById('report-modal-bg');
  const rmClose   = document.getElementById('rm-close');
  const gpsBtn    = document.getElementById('rm-gps-btn');
  const mapBtn    = document.getElementById('rm-map-btn');
  const locTxt    = document.getElementById('rm-loc-txt');
  const submitBtn = document.getElementById('rm-submit');
  const successEl = document.getElementById('rm-success');
  const pickBanner= document.getElementById('pick-banner');

  fab.addEventListener('click', ()=>{ resetForm(); modalBg.classList.add('open'); });
  rmClose.addEventListener('click', closeModal);
  modalBg.addEventListener('click', e=>{ if(e.target===modalBg) closeModal(); });

  function closeModal(){ modalBg.classList.remove('open'); stopMapPick(); }

  function resetForm(){
    document.getElementById('rm-nombre').value='';
    document.getElementById('rm-comentario').value='';
    document.querySelectorAll('.rm-cat').forEach(c=>c.classList.remove('selected'));
    selectedTipo=null; selectedLat=null; selectedLon=null;
    locTxt.textContent='Sin ubicación seleccionada';
    successEl.style.display='none';
    submitBtn.style.display='block';
    submitBtn.disabled=false;
    submitBtn.textContent='Enviar reporte';
  }

  document.querySelectorAll('.rm-cat').forEach(el=>{
    el.addEventListener('click', function(){
      document.querySelectorAll('.rm-cat').forEach(c=>c.classList.remove('selected'));
      this.classList.add('selected');
      selectedTipo=this.dataset.tipo;
    });
  });

  gpsBtn.addEventListener('click', ()=>{
    gpsBtn.textContent='📡 Obteniendo…'; gpsBtn.disabled=true;
    navigator.geolocation.getCurrentPosition(
      pos=>{ selectedLat=pos.coords.latitude; selectedLon=pos.coords.longitude;
        locTxt.textContent=selectedLat.toFixed(5)+', '+selectedLon.toFixed(5);
        gpsBtn.textContent='📍 Mi ubicación'; gpsBtn.disabled=false; },
      ()=>{ locTxt.textContent='No se pudo obtener ubicación.';
        gpsBtn.textContent='📍 Mi ubicación'; gpsBtn.disabled=false; }
    );
  });

  mapBtn.addEventListener('click', ()=>{ modalBg.classList.remove('open'); startMapPick(); });

  function startMapPick(){
    pickingFromMap=true; pickBanner.classList.add('active');
    map.getContainer().style.cursor='crosshair';
    map.once('click', onMapPick);
  }
  function stopMapPick(){
    pickingFromMap=false; pickBanner.classList.remove('active');
    map.getContainer().style.cursor='';
    map.off('click', onMapPick);
  }
  function onMapPick(e){
    selectedLat=e.latlng.lat; selectedLon=e.latlng.lng;
    locTxt.textContent=selectedLat.toFixed(5)+', '+selectedLon.toFixed(5);
    stopMapPick(); modalBg.classList.add('open');
  }

  submitBtn.addEventListener('click', async ()=>{
    const nombre    = document.getElementById('rm-nombre').value.trim()||'Anónimo';
    const comentario= document.getElementById('rm-comentario').value.trim();
    if(!selectedTipo){ showToast('Selecciona una categoría', true); return; }
    if(selectedLat===null){ showToast('Selecciona una ubicación', true); return; }
    submitBtn.disabled=true; submitBtn.textContent='Enviando…';
    try{
      const r=await fetch(SB+'/reportes_ciudadanos',{
        method:'POST',
        headers:Object.assign({},H,{'Prefer':'return=minimal'}),
        body:JSON.stringify({nombre,tipo:selectedTipo,comentario,lat:selectedLat,lon:selectedLon,estado:'pendiente'})
      });
      if(!r.ok) throw new Error(await r.text());
      successEl.style.display='block'; submitBtn.style.display='none';
      await loadReportes();
      setTimeout(closeModal, 2500);
    }catch(err){
      showToast('Error al enviar: '+err.message, true);
      submitBtn.disabled=false; submitBtn.textContent='Enviar reporte';
    }
  });

  async function loadReportes(){
    try{
      const data=await rpc('get_reportes_visibles');
      const feats=(data&&data.features)?data.features:[];
      if(reportesLayer){ map.removeLayer(reportesLayer); }
      reportesLayer=L.geoJSON({type:'FeatureCollection',features:feats},{
        pointToLayer:(feat,latlng)=>{
          const p=feat.properties;
          const cfg=REPORTE_ICONS[p.tipo]||{emoji:'📌',color:'#6b7280'};
          const isResuelto=p.estado==='resuelto';
          const html='<div style="width:32px;height:32px;border-radius:50%;background:'+(isResuelto?'#d1fae5':'#fff')+';border:2.5px solid '+(isResuelto?'#15803d':cfg.color)+';display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 2px 6px rgba(0,0,0,.2);opacity:'+(isResuelto?'.75':'1')+'">'+cfg.emoji+'</div>';
          return L.marker(latlng,{
            icon:L.divIcon({className:'',html:html,iconSize:[32,32],iconAnchor:[16,16],popupAnchor:[0,-18]}),
            zIndexOffset:isResuelto?0:100
          });
        },
        onEachFeature:(feat,layer)=>{
          const p=feat.properties;
          const cfg=REPORTE_ICONS[p.tipo]||{emoji:'📌',label:p.tipo};
          const badge=p.estado==='resuelto'
            ?'<span style="background:#d1fae5;color:#15803d;padding:1px 7px;border-radius:10px;font-size:10px;font-weight:700;">✓ Resuelto</span>'
            :'<span style="background:#fef3c7;color:#d97706;padding:1px 7px;border-radius:10px;font-size:10px;font-weight:700;">⏳ Pendiente</span>';
          layer.bindPopup('<div class="pop"><div class="pop-head">'+cfg.emoji+' '+cfg.label+'</div><div class="pop-row"><span class="pop-k">reportado por</span><span class="pop-v">'+p.nombre+'</span></div>'+(p.comentario?'<div class="pop-row"><span class="pop-k">comentario</span><span class="pop-v">'+p.comentario+'</span></div>':'')+'<div class="pop-row"><span class="pop-k">estado</span><span class="pop-v">'+badge+'</span></div><div class="pop-row"><span class="pop-k">fecha</span><span class="pop-v">'+p.creado_en+'</span></div></div>',{maxWidth:280});
          layer.on('mouseover',function(){this.openPopup();});
        }
      }).addTo(map);
    }catch(err){ console.warn('Reportes error:',err.message); }
  }

  loadReportes();
  setInterval(loadReportes, 120000);
})();
}); // DOMContentLoaded


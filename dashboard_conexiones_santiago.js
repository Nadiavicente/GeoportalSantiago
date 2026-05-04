// ── MAP ──────────────────────────────────────────────────────────
const map=L.map('map',{center:[38.5,-4.0],zoom:5,preferCanvas:true});
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',{
  attribution:'© OpenStreetMap © CARTO',subdomains:'abcd',maxZoom:19}).addTo(map);

function mkIcon(bg,border,emo,sz=28){
  return L.divIcon({className:'',
    html:`<div style="width:${sz}px;height:${sz}px;border-radius:50%;background:${bg};border:2px solid ${border};display:flex;align-items:center;justify-content:center;font-size:${Math.round(sz*.42)}px;box-shadow:0 2px 7px rgba(0,0,0,0.14);cursor:pointer">${emo}</div>`,
    iconSize:[sz,sz],iconAnchor:[sz/2,sz/2]});
}
function mkP(title,badge,bc,rows){
  let h=`<div class="ptitle">${title}</div><div><span class="pbadge" style="background:${bc}22;color:${bc}">${badge}</span></div>`;
  rows.forEach(([k,v])=>{if(v)h+=`<div class="prow"><span class="pkey">${k}</span><span>${v}</span></div>`;});
  return h;
}
function si(t,b){document.getElementById('infoPanel').innerHTML=`<div class="ititle">${t}</div><div class="ibody">${b}</div>`;}

const layers={};

// SCQ DESTINO
const scqIco=L.divIcon({className:'',html:`<div class="scq-p" style="width:36px;height:36px;border-radius:50%;background:#fff8e1;border:3px solid #b5781a;display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 0 14px #b5781a55">✦</div>`,iconSize:[36,36],iconAnchor:[18,18]});
L.marker([42.8805,-8.5458],{icon:scqIco})
  .bindPopup(mkP('Santiago de Compostela','DESTINO','#b5781a',[['Aeropuerto','SCQ · Rosalía de Castro · 11km'],['Tren','Daniel Castelao · AVE/Alvia'],['Bus','Estación central'],['Carretera','AP-9 / A-6 / A-52']]))
  .on('click',()=>si('✦ Santiago de Compostela','Destino principal. AVE desde 3h, vuelos directos y autobuses desde toda España.'))
  .addTo(map);

// AEROPUERTOS
const AD=[
  {n:"Apto. Santiago-Rosalía de Castro",iata:"SCQ",ciudad:"Santiago",tipo:"DESTINO",aero:"—",lat:42.8963,lon:-8.4151},
  {n:"Apto. Adolfo Suárez Madrid-Barajas",iata:"MAD",ciudad:"Madrid",tipo:"Vuelo directo",aero:"Iberia, Air Europa",lat:40.4936,lon:-3.5668},
  {n:"Apto. Barcelona-El Prat",iata:"BCN",ciudad:"Barcelona",tipo:"Vuelo directo",aero:"Vueling, Ryanair",lat:41.2974,lon:2.0833},
  {n:"Apto. Málaga-Costa del Sol",iata:"AGP",ciudad:"Málaga",tipo:"Vuelo directo",aero:"Vueling, Ryanair",lat:36.6749,lon:-4.4991},
  {n:"Apto. Alicante-Elche",iata:"ALC",ciudad:"Alicante",tipo:"Vuelo directo",aero:"Ryanair, Vueling",lat:38.2822,lon:-0.5582},
  {n:"Apto. Valencia",iata:"VLC",ciudad:"Valencia",tipo:"Vuelo directo",aero:"Ryanair, Vueling",lat:39.4893,lon:-0.4816},
  {n:"Apto. Sevilla-San Pablo",iata:"SVQ",ciudad:"Sevilla",tipo:"Vuelo directo",aero:"Vueling, Ryanair",lat:37.4180,lon:-5.8931},
  {n:"Apto. Palma de Mallorca",iata:"PMI",ciudad:"Palma",tipo:"Vuelo directo",aero:"Vueling, Ryanair",lat:39.5517,lon:2.7388},
  {n:"Apto. Ibiza",iata:"IBZ",ciudad:"Ibiza",tipo:"Vuelo directo",aero:"Ryanair, Vueling",lat:38.8729,lon:1.3731},
  {n:"Apto. Bilbao",iata:"BIO",ciudad:"Bilbao",tipo:"Vuelo directo",aero:"Iberia, Vueling",lat:43.3011,lon:-2.9106},
  {n:"Apto. Lanzarote",iata:"ACE",ciudad:"Lanzarote",tipo:"Vuelo directo",aero:"Ryanair, Vueling",lat:28.9455,lon:-13.6052},
  {n:"Apto. Gran Canaria",iata:"LPA",ciudad:"Las Palmas G.C.",tipo:"Vuelo directo",aero:"Vueling",lat:27.9319,lon:-15.3866},
  {n:"Apto. Tenerife Sur",iata:"TFS",ciudad:"Tenerife",tipo:"Vuelo directo",aero:"Ryanair",lat:28.0445,lon:-16.5725},
  {n:"Apto. Tenerife Norte",iata:"TFN",ciudad:"Tenerife",tipo:"Vuelo directo",aero:"Vueling",lat:28.4827,lon:-16.3414},
  {n:"Apto. Fuerteventura",iata:"FUE",ciudad:"Fuerteventura",tipo:"Vuelo directo",aero:"Vueling",lat:28.4527,lon:-13.8638},
  {n:"Apto. Girona-Costa Brava",iata:"GRO",ciudad:"Girona",tipo:"Vuelo directo",aero:"Euroairlines",lat:41.9010,lon:2.7605},
  {n:"Apto. Melilla",iata:"MLN",ciudad:"Melilla",tipo:"Temporada",aero:"Iberia",lat:35.2799,lon:-2.9563},
  {n:"Apto. A Coruña",iata:"LCG",ciudad:"A Coruña",tipo:"Aeropuerto próximo",aero:"Regional",lat:43.3021,lon:-8.3776},
  {n:"Apto. Vigo-Peinador",iata:"VGO",ciudad:"Vigo",tipo:"Aeropuerto próximo",aero:"Nacional",lat:42.2318,lon:-8.6268},
  {n:"Apto. Asturias",iata:"OVD",ciudad:"Asturias",tipo:"Aeropuerto próximo",aero:"Nacional",lat:43.5636,lon:-6.0346},
];
const aGrp=L.layerGroup();
AD.forEach(a=>{
  const c=a.tipo==='Aeropuerto próximo'?'#5b9fd4':a.tipo==='DESTINO'?'#b5781a':'#0077b6';
  L.marker([a.lat,a.lon],{icon:mkIcon(c+'22',c,'✈',30)})
    .bindPopup(mkP(a.n,a.iata,c,[['Ciudad',a.ciudad],['Tipo',a.tipo],['Aerolíneas',a.aero]]))
    .on('click',()=>si(`✈ ${a.n}`,`<b>${a.iata}</b> · ${a.ciudad}<br>${a.tipo}<br>${a.aero}`))
    .addTo(aGrp);
});
aGrp.addTo(map); layers['aeropuertos']=aGrp;

// TRENES
const TD=[
  {n:"Santiago-Daniel Castelao",ciudad:"Santiago",srv:"DESTINO",t:"—",lat:42.8720,lon:-8.5440},
  {n:"Madrid Chamartín",ciudad:"Madrid",srv:"AVE/AVLO/Alvia",t:"~3h",lat:40.4728,lon:-3.6880},
  {n:"Madrid Puerta de Atocha",ciudad:"Madrid",srv:"AVE/AVLO",t:"~3h 15min",lat:40.4065,lon:-3.6890},
  {n:"Barcelona Sants",ciudad:"Barcelona",srv:"Alvia",t:"~9h 30min",lat:41.3793,lon:2.1401},
  {n:"Ourense",ciudad:"Ourense",srv:"AVE/MD Galicia",t:"~43min",lat:42.3369,lon:-7.8640},
  {n:"A Coruña",ciudad:"A Coruña",srv:"AVE/Cercanías",t:"~30min",lat:43.3671,lon:-8.4084},
  {n:"Vigo-Urzáiz",ciudad:"Vigo",srv:"AVE/Avant",t:"~35min",lat:42.2318,lon:-8.7185},
  {n:"Pontevedra",ciudad:"Pontevedra",srv:"Avant/MD",t:"~25min",lat:42.4325,lon:-8.6503},
  {n:"Lugo",ciudad:"Lugo",srv:"MD Galicia",t:"~1h 30min",lat:43.0097,lon:-7.5567},
  {n:"Bilbao-Abando",ciudad:"Bilbao",srv:"Alvia",t:"~5h 30min",lat:43.2630,lon:-2.9250},
  {n:"San Sebastián-Donostia",ciudad:"San Sebastián",srv:"Alvia",t:"~6h",lat:43.3183,lon:-1.9812},
  {n:"Valladolid-Campo Grande",ciudad:"Valladolid",srv:"AVE/Alvia",t:"~2h",lat:41.6525,lon:-4.7245},
  {n:"Zamora",ciudad:"Zamora",srv:"AVE/Alvia",t:"~2h 30min",lat:41.5034,lon:-5.7461},
  {n:"Medina del Campo",ciudad:"Medina",srv:"AVE",t:"~2h",lat:41.3097,lon:-4.9133},
  {n:"León",ciudad:"León",srv:"Alvia",t:"~3h",lat:42.5985,lon:-5.5734},
];
const tGrp=L.layerGroup();
TD.forEach(t=>{
  L.marker([t.lat,t.lon],{icon:mkIcon('#d8f3dc','#2d6a4f','🚆',28)})
    .bindPopup(mkP(t.n,t.srv,'#2d6a4f',[['Ciudad',t.ciudad],['Servicio',t.srv],['Tiempo',t.t]]))
    .on('click',()=>si(`🚆 ${t.n}`,`${t.ciudad} · <b>${t.srv}</b><br>Tiempo: ${t.t}`))
    .addTo(tGrp);
});
tGrp.addTo(map); layers['trenes']=tGrp;

// BUSES
const BD=[
  {n:"Est. Autobuses Santiago",ciudad:"Santiago",op:"Monbus/ALSA/Arriva",f:"Múltiple/día",lat:42.8701,lon:-8.5434},
  {n:"Estación Sur Madrid",ciudad:"Madrid",op:"ALSA",f:"Diaria",lat:40.4066,lon:-3.6876},
  {n:"Estación Nord Barcelona",ciudad:"Barcelona",op:"ALSA",f:"Diaria",lat:41.3931,lon:2.1805},
  {n:"Est. Autobuses A Coruña",ciudad:"A Coruña",op:"Monbus/ALSA/Arriva",f:"Múltiple/día",lat:43.3604,lon:-8.4131},
  {n:"Est. Autobuses Vigo",ciudad:"Vigo",op:"Monbus/ALSA/Arriva",f:"Múltiple/día",lat:42.2309,lon:-8.7223},
  {n:"Est. Autobuses Lugo",ciudad:"Lugo",op:"Monbus/Arriva",f:"Diaria",lat:43.0097,lon:-7.5558},
  {n:"Est. Autobuses Pontevedra",ciudad:"Pontevedra",op:"Monbus/ALSA",f:"Múltiple/día",lat:42.4305,lon:-8.6479},
  {n:"Est. Autobuses Ourense",ciudad:"Ourense",op:"Monbus/ALSA",f:"Múltiple/día",lat:42.3364,lon:-7.8636},
  {n:"Est. Autobuses Bilbao",ciudad:"Bilbao",op:"ALSA",f:"Diaria",lat:43.2630,lon:-2.9513},
  {n:"Est. Autobuses Sevilla",ciudad:"Sevilla",op:"ALSA",f:"Diaria",lat:37.3902,lon:-6.0016},
  {n:"Est. Autobuses Valencia",ciudad:"Valencia",op:"ALSA",f:"Diaria",lat:39.4654,lon:-0.3773},
  {n:"Est. Autobuses Valladolid",ciudad:"Valladolid",op:"ALSA",f:"Diaria",lat:41.6525,lon:-4.7243},
  {n:"Est. Autobuses León",ciudad:"León",op:"ALSA",f:"Diaria",lat:42.5985,lon:-5.5734},
  {n:"Est. Autobuses Gijón",ciudad:"Gijón",op:"ALSA",f:"Diaria",lat:43.5390,lon:-5.6667},
  {n:"Est. Autobuses Oviedo",ciudad:"Oviedo",op:"ALSA",f:"Diaria",lat:43.3614,lon:-5.8497},
];
const bGrp=L.layerGroup();
BD.forEach(b=>{
  L.marker([b.lat,b.lon],{icon:mkIcon('#fdebd0','#c8580a','🚌',26)})
    .bindPopup(mkP(b.n,'Bus','#c8580a',[['Ciudad',b.ciudad],['Operadoras',b.op],['Frecuencia',b.f]]))
    .on('click',()=>si(`🚌 ${b.n}`,`${b.ciudad}<br>${b.op}<br>Frecuencia: <b>${b.f}</b>`))
    .addTo(bGrp);
});
bGrp.addTo(map); layers['buses']=bGrp;

// ── VÍAS PRINCIPALES AMPLIADAS (25 vías) ─────────────────────────
// Autopistas: color sólido morado oscuro
// Autovías: morado medio con dash
// Nacionales: morado claro con dotted
const SCQ=[42.878,-8.544];
const VD=[
  // ── GALICIA ──────────────────────────────────────────────────
  {n:"AP-9 Autopista del Atlántico (Ferrol–A Coruña–Santiago–Vigo)",tipo:"Autopista",ccaa:"Galicia",
   pts:[[43.490,-8.234],[43.367,-8.408],[43.200,-8.480],[43.100,-8.460],[42.878,-8.544],[42.650,-8.600],[42.432,-8.650],[42.232,-8.718]]},

  {n:"A-54 Autovía Santiago–Lugo",tipo:"Autovía",ccaa:"Galicia",
   pts:[[43.010,-7.557],[42.970,-7.800],[42.950,-8.000],[42.880,-8.440],SCQ]},

  {n:"AP-53 Autopista Santiago–Ourense",tipo:"Autopista",ccaa:"Galicia",
   pts:[SCQ,[42.700,-8.200],[42.500,-7.800],[42.337,-7.864]]},

  {n:"AG-56 Vía Ártabra (Santiago–Carballo–Ferrol)",tipo:"Autovía",ccaa:"Galicia",
   pts:[SCQ,[43.000,-8.600],[43.214,-8.691],[43.490,-8.234]]},

  {n:"N-550 / A-55 Eje Atlántico Sur (Santiago–Pontevedra–Vigo)",tipo:"Autovía",ccaa:"Galicia",
   pts:[SCQ,[42.700,-8.560],[42.432,-8.650],[42.232,-8.718]]},

  {n:"N-634 Costa Norte Galicia (Ferrol–Santiago)",tipo:"Nacional",ccaa:"Galicia",
   pts:[[43.490,-8.234],[43.440,-8.240],[43.370,-8.380],[43.300,-8.550],SCQ]},

  // ── HACIA MADRID (Corredor del Noroeste) ────────────────────
  {n:"A-6 Autovía del Noroeste (Madrid–Lugo–Santiago)",tipo:"Autovía",ccaa:"Madrid/Castilla y León/Galicia",
   pts:[[40.417,-3.704],[40.900,-3.950],[41.350,-4.100],[41.650,-4.720],[42.000,-5.200],[42.340,-5.570],[42.600,-6.800],[42.900,-7.200],[43.010,-7.557],SCQ]},

  {n:"AP-6 Autopista Segovia–Valladolid (conexión A-6)",tipo:"Autopista",ccaa:"Castilla y León/Madrid",
   pts:[[40.950,-4.120],[41.200,-4.400],[41.380,-4.680],[41.652,-4.724]]},

  // ── HACIA LEVANTE / CATALUÑA ─────────────────────────────────
  {n:"A-3 / AP-3 Autovía del Este (Madrid–Valencia)",tipo:"Autovía",ccaa:"Madrid/Castilla-La Mancha/C.Valenciana",
   pts:[[40.417,-3.704],[40.200,-3.500],[39.900,-3.000],[39.489,-0.482]]},

  {n:"AP-7 Autopista del Mediterráneo (Valencia–Barcelona)",tipo:"Autopista",ccaa:"C.Valenciana/Cataluña",
   pts:[[39.489,-0.482],[40.400,-0.500],[41.100, 1.200],[41.380, 2.140]]},

  {n:"A-2 Autovía del Nordeste (Madrid–Zaragoza–Barcelona)",tipo:"Autovía",ccaa:"Madrid/Aragón/Cataluña",
   pts:[[40.417,-3.704],[40.700,-2.500],[41.200,-1.200],[41.650,-0.880],[41.380, 2.140]]},

  // ── HACIA ANDALUCÍA ──────────────────────────────────────────
  {n:"A-4 Autovía del Sur (Madrid–Córdoba–Sevilla–Cádiz)",tipo:"Autovía",ccaa:"Madrid/Castilla-La Mancha/Andalucía",
   pts:[[40.417,-3.704],[40.000,-3.700],[39.500,-3.900],[38.000,-4.500],[37.418,-5.893],[36.500,-6.200]]},

  {n:"A-92 Autovía de Andalucía (Sevilla–Granada–Almería)",tipo:"Autovía",ccaa:"Andalucía",
   pts:[[37.418,-5.893],[37.200,-4.500],[37.180,-3.600],[36.840,-2.450]]},

  // ── CORREDOR CANTÁBRICO ──────────────────────────────────────
  {n:"A-8 Autovía del Cantábrico (San Sebastián–Bilbao–Oviedo–Lugo–Santiago)",tipo:"Autovía",ccaa:"País Vasco/Cantabria/Asturias/Galicia",
   pts:[[43.318,-1.981],[43.260,-2.920],[43.363,-5.850],[43.539,-5.667],[43.471,-6.030],[43.360,-7.000],[43.010,-7.557],SCQ]},

  {n:"AP-1 Autopista del Norte (Madrid–Vitoria–Bilbao)",tipo:"Autopista",ccaa:"Madrid/Castilla y León/País Vasco",
   pts:[[40.417,-3.704],[41.000,-3.700],[41.650,-2.900],[42.850,-2.670],[43.260,-2.920]]},

  // ── MESETA NORTE / CASTILLA Y LEÓN ──────────────────────────
  {n:"A-62 Autovía de Castilla (Burgos–Valladolid–Salamanca–Portugal)",tipo:"Autovía",ccaa:"Castilla y León",
   pts:[[42.344,-3.697],[41.652,-4.724],[40.960,-5.664],[40.600,-6.900]]},

  {n:"A-66 Autovía de la Plata (Gijón–Oviedo–Salamanca–Sevilla)",tipo:"Autovía",ccaa:"Asturias/Castilla y León/Extremadura/Andalucía",
   pts:[[43.539,-5.667],[43.361,-5.849],[40.960,-5.664],[38.000,-6.000],[37.418,-5.893]]},

  // ── DESDE EXTREMADURA / SUROESTE ────────────────────────────
  {n:"A-5 Autovía del Suroeste (Madrid–Badajoz–Lisboa)",tipo:"Autovía",ccaa:"Madrid/Castilla-La Mancha/Extremadura",
   pts:[[40.417,-3.704],[39.800,-4.500],[38.900,-5.300],[38.900,-6.970]]},

  // ── ARAGÓN / PAÍS VASCO ──────────────────────────────────────
  {n:"A-15 Autovía Navarra (Pamplona–Logroño–Burgos)",tipo:"Autovía",ccaa:"Navarra/La Rioja/Castilla y León",
   pts:[[42.817,-1.644],[42.466,-2.440],[42.344,-3.697]]},

  {n:"AP-68 Autopista del Ebro (Bilbao–Zaragoza)",tipo:"Autopista",ccaa:"País Vasco/Navarra/Aragón",
   pts:[[43.260,-2.920],[42.900,-2.000],[42.500,-1.800],[41.650,-0.880]]},

  // ── EJE MEDITERRÁNEO NORTE ───────────────────────────────────
  {n:"A-7 / AP-7 Autopista Mediterránea (Algeciras–Cádiz–Almería–Murcia–Alicante–Barcelona)",tipo:"Autopista",ccaa:"Andalucía/Murcia/C.Valenciana/Cataluña",
   pts:[[36.100,-5.450],[36.500,-6.200],[37.418,-5.893],[37.980,-1.130],[38.282,-0.558],[39.489,-0.482],[41.380,2.140]]},

  // ── INTERIOR ─────────────────────────────────────────────────
  {n:"A-52 Autovía de las Rías Bajas (Benavente–Ourense–Vigo)",tipo:"Autovía",ccaa:"Castilla y León/Galicia",
   pts:[[41.980,-5.680],[42.000,-6.300],[42.150,-7.000],[42.337,-7.864],[42.500,-8.300],[42.232,-8.718]]},

  {n:"A-76 Autovía Ponferrada–Ourense",tipo:"Autovía",ccaa:"Castilla y León/Galicia",
   pts:[[42.546,-6.598],[42.400,-7.000],[42.337,-7.864]]},

  {n:"N-VI / A-6 Conexión Betanzos–A Coruña",tipo:"Nacional",ccaa:"Galicia",
   pts:[[43.010,-7.557],[43.100,-8.000],[43.200,-8.200],[43.367,-8.408]]},

  {n:"N-120 Nacional Vigo–Logroño (interior)",tipo:"Nacional",ccaa:"Galicia/Castilla y León/La Rioja",
   pts:[[42.232,-8.718],[42.000,-7.800],[41.658,-4.724],[42.466,-2.440]]},
];

const vGrp=L.layerGroup();
VD.forEach(v=>{
  const isAP=v.tipo==='Autopista';
  const isAN=v.tipo==='Autovía';
  const color=isAP?'#5e35b1':isAN?'#7e57c2':'#b39ddb';
  const weight=isAP?3.5:isAN?2.8:2;
  const dash=isAP?null:isAN?'8,4':'5,4';
  const opacity=isAP?0.78:0.68;
  L.polyline(v.pts,{color,weight,opacity,dashArray:dash})
    .bindPopup(mkP(v.n,v.tipo,'#6b4fa0',[['CCAA',v.ccaa],['Tipo',v.tipo]]))
    .on('click',()=>si(`🛣 ${v.n}`,`<b>${v.tipo}</b><br>${v.ccaa}`))
    .addTo(vGrp);
});
vGrp.addTo(map); layers['vias']=vGrp;

// MONUMENTOS
const MD=[
  {n:"Catedral de Santiago",tipo:"catedral",cat:"religioso",lat:42.8805,lon:-8.5458},
  {n:"Mosteiro San Martiño Pinario",tipo:"monasterio",cat:"religioso",lat:42.8820,lon:-8.5455},
  {n:"Praza do Obradoiro",tipo:"plaza",cat:"histórico",lat:42.8806,lon:-8.5464},
  {n:"Hostal dos Reis Católicos",tipo:"palacio",cat:"histórico",lat:42.8811,lon:-8.5475},
  {n:"Pazo de Raxoi",tipo:"palacio",cat:"histórico",lat:42.8808,lon:-8.5471},
  {n:"Pazo de Fonseca",tipo:"palacio",cat:"histórico",lat:42.8793,lon:-8.5456},
  {n:"Museo das Peregrinacións",tipo:"museo",cat:"cultural",lat:42.8800,lon:-8.5451},
  {n:"Museo do Pobo Galego",tipo:"museo",cat:"cultural",lat:42.8835,lon:-8.5412},
  {n:"CGAC Arte Contemporánea",tipo:"museo",cat:"cultural",lat:42.8838,lon:-8.5420},
  {n:"Alameda de Santiago",tipo:"parque",cat:"histórico",lat:42.8755,lon:-8.5505},
  {n:"Praza das Praterías",tipo:"plaza",cat:"histórico",lat:42.8797,lon:-8.5449},
  {n:"Praza da Quintana",tipo:"plaza",cat:"histórico",lat:42.8799,lon:-8.5444},
  {n:"Igrexa de San Domingos de Bonaval",tipo:"iglesia",cat:"religioso",lat:42.8830,lon:-8.5415},
  {n:"Torre da Berenguela",tipo:"monumento",cat:"histórico",lat:42.8800,lon:-8.5455},
  {n:"Colexiata Santa María do Sar",tipo:"iglesia",cat:"religioso",lat:42.8688,lon:-8.5372},
  {n:"Fundación Eugenio Granell",tipo:"museo",cat:"cultural",lat:42.8792,lon:-8.5435},
  {n:"Praza de Abastos",tipo:"mercado",cat:"cultural",lat:42.8780,lon:-8.5425},
  {n:"Parque de Belvís",tipo:"parque",cat:"cultural",lat:42.8775,lon:-8.5385},
  {n:"Hórreo de Santa Susana",tipo:"patrimonio",cat:"histórico",lat:42.8753,lon:-8.5515},
  {n:"Fonte dos Cabalos",tipo:"monumento",cat:"histórico",lat:42.8797,lon:-8.5448},
  {n:"Igrexa San Fiz de Solovio",tipo:"iglesia",cat:"religioso",lat:42.8795,lon:-8.5440},
  {n:"Igrexa Santa María Salomé",tipo:"iglesia",cat:"religioso",lat:42.8800,lon:-8.5438},
  {n:"Praza de Cervantes",tipo:"plaza",cat:"histórico",lat:42.8814,lon:-8.5449},
  {n:"Porta do Camiño",tipo:"monumento",cat:"histórico",lat:42.8826,lon:-8.5406},
  {n:"Convento de Santo Agostiño",tipo:"convento",cat:"religioso",lat:42.8773,lon:-8.5435},
  {n:"Mosteiro San Paio de Antealtares",tipo:"monasterio",cat:"religioso",lat:42.8800,lon:-8.5442},
  {n:"Igrexa de Santa Susana",tipo:"iglesia",cat:"religioso",lat:42.8755,lon:-8.5513},
  {n:"Carballeira de Santa Susana",tipo:"parque",cat:"histórico",lat:42.8750,lon:-8.5510},
  {n:"Colexio de San Xerome",tipo:"patrimonio",cat:"histórico",lat:42.8803,lon:-8.5460},
  {n:"Pazo de Bendaña",tipo:"palacio",cat:"histórico",lat:42.8792,lon:-8.5433},
  {n:"Fonte de San Clemente",tipo:"monumento",cat:"histórico",lat:42.8807,lon:-8.5432},
  {n:"Cruceiro do Hórreo",tipo:"cruceiro",cat:"histórico",lat:42.8742,lon:-8.5447},
  {n:"Rúa do Franco",tipo:"calle",cat:"histórico",lat:42.8790,lon:-8.5455},
  {n:"Auditorio de Galicia",tipo:"auditorio",cat:"cultural",lat:42.8778,lon:-8.5340},
  {n:"Arquivo Histórico Universitario",tipo:"archivo",cat:"cultural",lat:42.8815,lon:-8.5460},
  {n:"Biblioteca Anxel Casal",tipo:"biblioteca",cat:"cultural",lat:42.8730,lon:-8.5425},
  {n:"Monumento ás Dúas Marías",tipo:"escultura",cat:"cultural",lat:42.8761,lon:-8.5502},
  {n:"Estatua Ecuestre do Apóstolo",tipo:"escultura",cat:"histórico",lat:42.8798,lon:-8.5450},
  {n:"Igrexa San Bieito do Campo",tipo:"iglesia",cat:"religioso",lat:42.8788,lon:-8.5393},
  {n:"Praza da Inmaculada",tipo:"plaza",cat:"histórico",lat:42.8815,lon:-8.5453},
];
const mGrp=L.layerGroup();
MD.forEach(m=>{
  const e=m.tipo==='iglesia'||m.tipo==='catedral'||m.tipo==='monasterio'||m.tipo==='convento'?'⛪':
          m.tipo==='museo'||m.tipo==='archivo'||m.tipo==='biblioteca'?'🏛':
          m.tipo==='parque'?'🌳':m.tipo==='plaza'||m.tipo==='calle'?'🏟':
          m.tipo==='palacio'?'🏰':m.tipo==='escultura'?'🗿':'⚑';
  L.marker([m.lat,m.lon],{icon:mkIcon('#fce8e8','#9b2226',e,24)})
    .bindPopup(mkP(m.n,m.tipo,'#9b2226',[['Categoría',m.cat]]))
    .on('click',()=>si(`🏛 ${m.n}`,`<b>${m.tipo}</b> · ${m.cat}`))
    .addTo(mGrp);
});
mGrp.addTo(map); layers['monumentos']=mGrp;

// SALUD
layers['salud']=L.layerGroup().addTo(map);
[{n:"Hospital Clínico Universitario",t:"Hospital",lat:42.8698,lon:-8.5659},{n:"Hospital Gil Casares",t:"Hospital",lat:42.8687,lon:-8.5643},{n:"Hospital Provincial de Conxo",t:"Hospital",lat:42.8630,lon:-8.5518},{n:"Hospital HM Rosaleda",t:"Hospital",lat:42.8718,lon:-8.5464},{n:"Punto Atención Continuada (PAC)",t:"PAC",lat:42.8752,lon:-8.5445},{n:"Urxencias",t:"Urgencias",lat:42.8801,lon:-8.5452}].forEach(s=>{
  L.marker([s.lat,s.lon],{icon:mkIcon('#d8f3e8','#1a7a5e',s.t==='Hospital'?'🏥':'🩺',26)}).bindPopup(mkP(s.n,s.t,'#1a7a5e',[['Tipo',s.t]])).on('click',()=>si(`🏥 ${s.n}`,s.t)).addTo(layers['salud']);
});

layers['seguridad']=L.layerGroup().addTo(map);
[{n:"Policía Local",t:"Policía Local",lat:42.8805,lon:-8.5464},{n:"Dir. Xeral Tráfico",t:"Policía Local",lat:42.8751,lon:-8.5516},{n:"Policía Nacional",t:"Policía Nacional",lat:42.8785,lon:-8.5464},{n:"Guardia Civil",t:"Guardia Civil",lat:42.8732,lon:-8.5297}].forEach(s=>{
  L.marker([s.lat,s.lon],{icon:mkIcon('#fce8e8','#9b2226','🚔',26)}).bindPopup(mkP(s.n,s.t,'#9b2226',[['Tipo',s.t]])).on('click',()=>si(`🚔 ${s.n}`,s.t)).addTo(layers['seguridad']);
});

layers['farmacias']=L.layerGroup().addTo(map);
[{n:"Farmacia Meixonfrío",lat:42.8835,lon:-8.5398},{n:"Farmacia Rúa do Franco",lat:42.8792,lon:-8.5456},{n:"Farmacia Praza de Galicia",lat:42.8762,lon:-8.5441},{n:"Farmacia Rúa Nova",lat:42.8800,lon:-8.5432},{n:"Farmacia Fontiñas",lat:42.8830,lon:-8.5280},{n:"Farmacia San Caetano",lat:42.8740,lon:-8.5415}].forEach(f=>{
  L.marker([f.lat,f.lon],{icon:mkIcon('#dce8f8','#1565c0','💊',22)}).bindPopup(mkP(f.n,'Farmacia','#1565c0',[])).on('click',()=>si(`💊 ${f.n}`,'Farmacia')).addTo(layers['farmacias']);
});

layers['bomberos']=L.layerGroup().addTo(map);
L.marker([42.8867,-8.5335],{icon:mkIcon('#fce8e0','#bf360c','🚒',28)}).bindPopup(mkP('Parque de Bombeiros','Bombeiros','#bf360c',[])).on('click',()=>si('🚒 Parque de Bombeiros','Extinción de incendios')).addTo(layers['bomberos']);

// TOGGLE
document.querySelectorAll('.lrow').forEach(r=>{
  r.addEventListener('click',()=>{
    const k=r.dataset.layer,lg=layers[k];if(!lg)return;
    if(map.hasLayer(lg)){map.removeLayer(lg);r.classList.add('off');}
    else{map.addLayer(lg);r.classList.remove('off');}
  });
});

// ════════════════════════════════════════════════════════
// CHARTS
// ════════════════════════════════════════════════════════
const F="'DM Sans',sans-serif";
Chart.defaults.font.family=F; Chart.defaults.color='#7a7168';
const gc='#e4dfd455';
const CR={}; // chart registry

// 1. Aerolíneas
CR.cAero = new Chart(document.getElementById('cAero'),{type:'bar',data:{
  labels:['Ryanair','Vueling','Iberia','easyJet','Lufthansa','SWISS','Euroair.','Air Eur.'],
  datasets:[{data:[18,12,2,2,1,1,2,1],
    backgroundColor:['#0055a499','#ff621f99','#c0000099','#ff600099','#f4c54299','#d4000099','#2e7d3299','#00437099'],
    borderColor:['#0055a4','#ff621f','#c00000','#ff6000','#f4c542','#d40000','#2e7d32','#004370'],
    borderWidth:1.5,borderRadius:4}]},
  options:{responsive:true,maintainAspectRatio:false,
    plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>`${c.raw} destinos`}}},
    scales:{y:{beginAtZero:true,grid:{color:gc},ticks:{stepSize:6,font:{size:8}}},
            x:{grid:{display:false},ticks:{font:{size:8}}}}}
});

// 2. Tiempo tren
CR.cTren = new Chart(document.getElementById('cTren'),{type:'bar',data:{
  labels:['Pontevedra','A Coruña','Vigo','Ourense','Lugo','Valladolid','León','Zamora','Madrid','Bilbao','S.Seb.','Barna'],
  datasets:[{data:[25,30,35,43,90,120,180,150,185,330,360,570],
    backgroundColor(ctx){const v=ctx.raw;return v<=60?'#2d6a4f99':v<=200?'#85c1a399':'#c8580a99';},
    borderColor(ctx){const v=ctx.raw;return v<=60?'#2d6a4f':v<=200?'#52b788':'#c8580a';},
    borderWidth:1.5,borderRadius:3}]},
  options:{responsive:true,maintainAspectRatio:false,indexAxis:'y',
    plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>{const m=c.raw,h=Math.floor(m/60),mn=m%60;return h>0?`${h}h${mn?' '+mn+'min':''}`:`${m}min`;}}}},
    scales:{x:{beginAtZero:true,grid:{color:gc},ticks:{callback:v=>`${Math.floor(v/60)}h`,font:{size:8}}},
            y:{grid:{display:false},ticks:{font:{size:7.5}}}}}
});

// 3. Frecuencia buses
CR.cBus = new Chart(document.getElementById('cBus'),{type:'bar',data:{
  labels:['A Coruña','Vigo','Pontevedra','Ourense','Lugo','Santiago','Madrid','Barcelona','Bilbao','Sevilla','Valencia','Oviedo','Gijón','León','Valladolid'],
  datasets:[{data:[3,3,3,3,2,3,1,1,1,1,1,1,1,1,1],
    backgroundColor(ctx){return ctx.raw===3?'#c8580aaa':ctx.raw===2?'#e8a97888':'#f0d0b088';},
    borderColor(ctx){return ctx.raw===3?'#c8580a':ctx.raw===2?'#e8a978':'#d4a060';},
    borderWidth:1.5,borderRadius:3}]},
  options:{responsive:true,maintainAspectRatio:false,indexAxis:'y',
    plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>c.raw===3?'Múltiples al día':c.raw===2?'Varias diarias':'Una diaria'}}},
    scales:{x:{beginAtZero:true,max:4,grid:{color:gc},ticks:{callback:v=>['','Diaria','','Múltiple',''][v]||'',font:{size:8}}},
            y:{grid:{display:false},ticks:{font:{size:7.5}}}}}
});

// 4. Tipos conexión
CR.cTipo = new Chart(document.getElementById('cTipo'),{type:'doughnut',data:{
  labels:['Vuelos directos','Tren AVE/Alvia','Autobuses','Vías carretera'],
  datasets:[{data:[17,14,15,25],
    backgroundColor:['#0077b6bb','#2d6a4fbb','#c8580abb','#6b4fa0bb'],
    borderColor:['#0077b6','#2d6a4f','#c8580a','#6b4fa0'],
    borderWidth:2,hoverOffset:6}]},
  options:{responsive:true,maintainAspectRatio:false,cutout:'56%',
    plugins:{legend:{position:'bottom',labels:{font:{size:8},boxWidth:10,padding:5}}}}
});

// 5. Heatmap CCAA
const ccaaData=[
  {c:'Galicia',v:16},{c:'Madrid',v:14},{c:'Cataluña',v:10},
  {c:'Andalucía',v:9},{c:'Canarias',v:7},{c:'C. Valenciana',v:7},
  {c:'País Vasco',v:6},{c:'Castilla y León',v:5},{c:'Asturias',v:4},
  {c:'C.-La Mancha',v:3},{c:'Illes Balears',v:3},{c:'Aragón',v:2},
  {c:'Extremadura',v:2},{c:'Navarra',v:2},{c:'Murcia',v:2},
  {c:'La Rioja',v:1},{c:'Cantabria',v:1},{c:'Melilla',v:1},
];
const maxV=Math.max(...ccaaData.map(d=>d.v));
const hm=document.getElementById('hmWrap');

// Color scale: light amber → deep crimson
function scaleColor(v,max){
  const t=v/max;
  const r=Math.round(245-t*90); const g=Math.round(200-t*170); const b=Math.round(180-t*142);
  return `rgb(${r},${g},${b})`;
}
ccaaData.forEach(d=>{
  const pct=Math.round((d.v/maxV)*100);
  const col=scaleColor(d.v,maxV);
  hm.innerHTML+=`<div class="hm-row">
    <div class="hm-label">${d.c}</div>
    <div class="hm-bar-wrap">
      <div class="hm-bar" style="width:${pct}%;background:${col}"></div>
      <span class="hm-val">${d.v}</span>
    </div>
  </div>`;
});

// ── CHART ZOOM OVERLAY ───────────────────────────────────────────
const overlay = document.getElementById('chartOverlay');
let ovChart = null;
let hideT = null;

const panelMeta = [
  {key:'cAero', title:'✈ Aerolíneas · vuelos directos SCQ',  type:'canvas'},
  {key:'cTren', title:'🚆 Tiempo de viaje en tren desde SCQ', type:'canvas'},
  {key:'cBus',  title:'🚌 Frecuencia autobuses por ciudad',   type:'canvas'},
  {key:'cTipo', title:'🔗 Tipos de conexión a Santiago',      type:'canvas'},
  {key:'hm',    title:'🌡 Conexiones por Comunidad Autónoma', type:'heatmap'},
];

function showOv(panel, meta) {
  clearTimeout(hideT);

  const rect = panel.getBoundingClientRect();
  const OW = 420, OH = 300;
  const vw = window.innerWidth;
  let left = rect.left;
  let top  = rect.top - OH - 12;
  if (left + OW > vw - 8) left = vw - OW - 8;
  if (left < 8) left = 8;
  if (top < 8)  top  = rect.bottom + 8;

  // Apply all styles via cssText so nothing is blocked by CSS
  overlay.setAttribute('style',
    `display:block;position:fixed;left:${left}px;top:${top}px;` +
    `width:${OW}px;min-height:${OH}px;z-index:99999;` +
    `background:#ffffff;border:2px solid #e4dfd4;border-radius:12px;` +
    `box-shadow:0 -16px 56px rgba(0,0,0,0.2),0 4px 16px rgba(0,0,0,0.08);` +
    `padding:14px 16px 10px;box-sizing:border-box;font-family:'DM Sans',sans-serif;pointer-events:auto;`
  );

  // Title
  const titleHTML = `<div style="font-family:'Lora',serif;font-size:0.9rem;font-weight:700;color:#28231e;margin-bottom:10px">${meta.title}</div>`;

  if (meta.type === 'heatmap') {
    let rows = '';
    ccaaData.forEach(d => {
      const pct = Math.round((d.v / maxV) * 100);
      const col = scaleColor(d.v, maxV);
      rows += `<div style="display:flex;align-items:center;gap:8px;margin-bottom:5px">
        <span style="font-size:0.74rem;color:#7a7168;width:95px;text-align:right;flex-shrink:0">${d.c}</span>
        <div style="flex:1;background:#f0ede7;border-radius:3px;height:16px;position:relative">
          <div style="height:100%;width:${pct}%;background:${col};border-radius:3px"></div>
          <span style="position:absolute;right:5px;top:50%;transform:translateY(-50%);font-size:0.66rem;font-weight:700;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,0.5)">${d.v}</span>
        </div>
      </div>`;
    });
    overlay.innerHTML = titleHTML +
      `<div style="overflow-y:auto;max-height:${OH-52}px;padding-right:4px">${rows}</div>`;

  } else {
    const src = CR[meta.key];
    if (!src) return;

    overlay.innerHTML = titleHTML + `<canvas id="ovCvs"></canvas>`;
    const cvs = document.getElementById('ovCvs');
    cvs.width  = OW - 32;
    cvs.height = OH - 58;

    // Clone data (safe for serialisable values)
    const cloneData = {
      labels: src.data.labels ? [...src.data.labels] : [],
      datasets: src.data.datasets.map(ds => ({
        ...ds,
        data: [...ds.data],
        backgroundColor: ds.backgroundColor,
        borderColor: ds.borderColor,
      }))
    };

    const isDoughnut = src.config.type === 'doughnut';
    const cloneOpts = {
      responsive: false,
      animation: false,
      plugins: {
        legend: isDoughnut
          ? {display:true, position:'bottom', labels:{font:{size:11},boxWidth:12,padding:8}}
          : {display:false},
        tooltip: {enabled:true},
      },
    };

    // Copy axis config if present
    const origScales = src.config.options && src.config.options.scales;
    if (origScales) {
      cloneOpts.scales = {};
      Object.keys(origScales).forEach(ax => {
        const orig = origScales[ax];
        cloneOpts.scales[ax] = {
          beginAtZero: orig.beginAtZero,
          grid: orig.grid,
          ticks: { ...orig.ticks, font:{size:11} },
        };
        if (orig.indexAxis) cloneOpts.indexAxis = orig.indexAxis;
        if (orig.max !== undefined) cloneOpts.scales[ax].max = orig.max;
        if (orig.callback) cloneOpts.scales[ax].ticks.callback = orig.ticks && orig.ticks.callback;
      });
    }
    if (src.config.options && src.config.options.indexAxis)
      cloneOpts.indexAxis = src.config.options.indexAxis;

    if (ovChart) { try{ovChart.destroy();}catch(e){} ovChart=null; }
    ovChart = new Chart(cvs.getContext('2d'), {
      type: src.config.type,
      data: cloneData,
      options: cloneOpts,
    });
  }
}

function hideOv() {
  hideT = setTimeout(() => {
    overlay.setAttribute('style','display:none');
    overlay.innerHTML = '';
    if (ovChart) { try{ovChart.destroy();}catch(e){} ovChart=null; }
  }, 100);
}

document.querySelectorAll('.cpanel').forEach((panel, i) => {
  const meta = panelMeta[i];
  if (!meta) return;
  panel.addEventListener('mouseenter', () => showOv(panel, meta));
  panel.addEventListener('mouseleave', hideOv);
});

// Keep overlay open while the cursor is inside it
overlay.addEventListener('mouseenter', () => clearTimeout(hideT));
overlay.addEventListener('mouseleave', hideOv);


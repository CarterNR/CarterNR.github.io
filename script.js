// --- Config personalizable ---
const CONFIG = {
  names: { you: 'Susana (Nicole)', him: 'Susano' },
  assets: { you: 'assets/susana.jpg', him: 'assets/susano.jpg' }, // coloca tus imágenes aquí
};

const state = {
  levelIndex: 0,
  score: 0,
  fragments: [],
  difficulty: 'Normal',
  interludeNext: 1,
};

// --- Interludios (preguntas rápidas entre niveles) ---
const interludes = {
  1: [
    { q:'Ping rápido: ¿primera impresión de Susano?', opts:[ {t:'Buen aim, peor ortografía', s:+1}, {t:'Main tanque pero corazón support', s:+2} ] },
    { q:'Mejor mapa para nuestra primera win:', opts:[ {t:'King’s Row', s:+2}, {t:'Junkertown (el caos nos llama)', s:+1} ]},
  ],
  2: [
    { q:'Respuesta correcta al “no estoy enojada” es…', opts:[ {t:'Snack + abrazo', s:+2}, {t:'“Ok” y silenciar chat', s:-2} ]},
    { q:'Drama favorito:', opts:[ {t:'Drama sarcástico', s:+1}, {t:'Drama real', s:-1} ]},
  ],
  3: [
    { q:'Postre ideal para nosotros:', opts:[ {t:'Helado', s:+1}, {t:'Brownie con helado', s:+2} ]},
    { q:'¿Quién roba papas?', opts:[ {t:'Los dos, obvio', s:+2}, {t:'Nadie, respeto sagrado', s:0} ]},
  ]
};

const levels = [
  {
    id: 1,
    title: 'El inicio del caos',
    tag: 'Discord + OW',
    scene: {
      actor: CONFIG.names.you,
      text: 'Nos conocimos en Discord, en plena partida de Overwatch. Susano pregunta: ¿con qué héroe entro?'
    },
    choices: [
      {label: 'Reinhardt, clásico: ¡YOLO al punto! 🛡️', effect:+2, remark:'Tanque noble, +2 por escuchar al team.'},
      {label: 'Genji, *main dragón shinobi* 🐉', effect:+1, remark:'Genji enjoyer, te vigilamos. +1.'},
      {label: 'Widow para “calentar la mira” 😏', effect:-1, remark:'Pro en la killcam, -1 por el objetivo.'},
    ],
    quiz: {
      q: '¿Dónde fue nuestra primera charla larga?',
      options: [
        {t:'Instagram', ok:false},
        {t:'Discord, obvio', ok:true},
        {t:'WhatsApp de la tía', ok:false},
      ],
      onOk:+3, onBad:-2
    },
    fragment: 'Fragmento 1: Siempre volvemos al lobby donde empezó todo.'
  },
  {
    id: 2,
    title: 'Modo Drama™',
    tag: 'Sarcasmo amoroso',
    scene: {
      actor: CONFIG.names.you,
      text: 'Él dice: “vuelvo en 5 min”. Pasan 37. *Nicole activa el Modo Drama™*.'
    },
    choices: [
      {label: 'Meme de perdón + snack virtual 🍟', effect:+2, remark:'Diplomacia + papitas = +2.'},
      {label: 'Decir “no estaba enojada” (mentira estratégica) 😇', effect:0, remark:'Plot twist: neutro, sobrevives.'},
      {label: 'Entrar a otra partida sin avisar', effect:-3, remark:'¿Auto-sabotaje speedrun? -3.'},
    ],
    quiz: {
      q: 'Si Susana dice “haz lo que quieras”, en realidad significa…',
      options: [
        {t:'Libertad total 🙃', ok:false},
        {t:'Elige bien (guiño)', ok:true},
        {t:'Es una trampa jurídica', ok:true},
      ],
      onOk:+2, onBad:-2,
      multi:true
    },
    fragment: 'Fragmento 2: Entre el caos y la risa, elegimos paciencia.'
  },
  {
    id: 3,
    title: 'Paladar de niños, amor gourmet',
    tag: 'Comida FTW',
    timed: true,
    timeSec: 18,
    scene: {
      actor: CONFIG.names.him,
      text: 'Hora de comer. El reto: elegir 3 opciones aprobadas por nuestro paladar de niños.'
    },
    foods: [
      {t:'Pizza', good:true}, {t:'Nuggets', good:true}, {t:'Tacos', good:true}, {t:'Ensalada de kale pura', good:false},
      {t:'Sushi con wasabi nuclear', good:false}, {t:'Papas fritas', good:true}, {t:'Hot dogs', good:true}, {t:'Quinoa triste', good:false}
    ],
    need: 3, reward:+3, penalty:-3,
    fragment: 'Fragmento 3: Compartir comida es nuestro lenguaje secreto.'
  },
  {
    id: 4,
    title: 'Boss Final: La distancia',
    tag: 'Conexión',
    scene: {
      actor: CONFIG.names.you,
      text: 'Aunque haya kilómetros, hay rituales que nos mantienen cerca. ¿Cuál es el combo ganador?'
    },
    choices: [
      {label: 'Videollamadas + meme diario + “buenas noches” sincero', effect:+3, remark:'Meta probada por la ciencia del amor.'},
      {label: 'Responder a destiempo pero con ensayo de 700 palabras', effect:0, remark:'Intenso, pero… meh.'},
      {label: 'Ignorar 2 días para “extrañarnos más”', effect:-4, remark:'No, no y no.'},
    ],
    quiz: {
      q: 'Clave final: ¿cómo nos llamamos en chiste?',
      options: [
        {t:'Rey & Reina', ok:false},
        {t:'Susano & Susana', ok:true},
        {t:'Main & Support', ok:false}
      ],
      onOk:+3, onBad:-3
    },
    fragment: 'Fragmento 4: A pesar de la distancia, siempre elegimos jugar en el mismo equipo.'
  }
];

// --- Helpers UI ---
const $ = (sel, el=document) => el.querySelector(sel);
const $$ = (sel, el=document) => [...el.querySelectorAll(sel)];
const screen = $('#screen');

function setHUD(){
  $('#score').textContent = state.score;
  $('#level').textContent = state.levelIndex+1;
  $('#diff').textContent = state.difficulty;
}

function renderLevel(){
  const L = levels[state.levelIndex];
  setHUD();
  screen.innerHTML = '';

  const wrap = document.createElement('section');
  wrap.className = 'card';
  wrap.innerHTML = `
    <div class="status">
      <span class="level-tag">Nivel ${L.id}: ${L.title}</span>
      <div style="min-width:200px" class="progress"><i id="pbar"></i></div>
    </div>
    <div class="row" style="align-items:flex-start">
      <div class="col">
        <div class="actor"><span class="chip">${L.tag}</span></div>
        <div class="bubble" style="margin-top:10px">${L.scene.actor}: ${L.scene.text}</div>
      </div>
      <div class="col" id="rightCol"></div>
    </div>
  `;
  screen.appendChild(wrap);

  // Choices (if any)
  const col = $('#rightCol');
  if(L.choices){
    const box = document.createElement('div');
    box.className = 'choices';
    L.choices.forEach((c)=>{
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = c.label;
      b.addEventListener('click',()=>{
        state.score += c.effect;
        toast(c.remark, c.effect>=0?'good':'bad');
        setHUD();
        b.disabled = true; b.classList.add(c.effect>=0?'good':'bad');
      });
      box.appendChild(b);
    });
    col.appendChild(box);
  }

  // Quiz
  if(L.quiz){
    const q = document.createElement('div'); q.className='card'; q.style.marginTop='14px';
    q.innerHTML = `<div class=\"sub\" style=\"margin-bottom:6px\">Quiz</div><div style=\"font-weight:700; margin-bottom:8px\">${L.quiz.q}</div>`;
    const opts = document.createElement('div'); opts.className='choices';
    q.appendChild(opts);
    L.quiz.options.forEach(o=>{
      const b = document.createElement('button'); b.className='btn'; b.textContent=o.t;
      b.addEventListener('click',()=>{
        if(o.ok){ state.score += L.quiz.onOk; toast('Correcto 👏', 'good'); b.classList.add('good'); }
        else{ state.score += L.quiz.onBad; toast('Ups, plot twist 😅', 'bad'); b.classList.add('bad'); }
        setHUD(); b.disabled = true;
        if(!L.quiz.multi){ $$('button', opts).forEach(x=>x.disabled=true); }
      });
      opts.appendChild(b);
    });
    col.appendChild(q);
  }

  // Timed mini-game
  if(L.timed){
    const zone = document.createElement('div'); zone.className='card'; zone.style.marginTop='14px';
    zone.innerHTML = `
      <div class=\"sub\" style=\"margin-bottom:6px\">Reto rápido</div>
      <div style=\"margin-bottom:10px\">Elige <b>${L.need}</b> favoritos antes de que el tiempo llegue a 0.</div>
      <div class=\"status\" style=\"margin-bottom:8px\"><span>⏱️ Tiempo: <b id=\"timer\">${L.timeSec}</b>s</span><span>Elegidos: <b id=\"picked\">0</b>/${L.need}</span></div>
      <div class=\"grid\" id=\"foods\"></div>
      <div class=\"center\" style=\"margin-top:10px\"><button class=\"btn\" id=\"btnEnviar\" disabled>Enviar</button></div>
    `;
    col.appendChild(zone);
    const foods = $('#foods');
    let picked = 0, time = L.timeSec; let over = false;
    L.foods.forEach((f)=>{
      const d = document.createElement('div'); d.className='food'; d.textContent=f.t;
      d.addEventListener('click',()=>{
        if(over) return;
        d.classList.toggle('selected');
        picked = $$('.food.selected', foods).length; $('#picked').textContent = picked;
        $('#btnEnviar').disabled = picked !== L.need;
      });
      foods.appendChild(d);
    });
    const tick = setInterval(()=>{
      time--; if(time<0){time=0}
      $('#timer').textContent=time;
      $('#pbar').style.width = `${Math.min(100, (100 - (time/L.timeSec)*100))}%`;
      if(time===0){ clearInterval(tick); finish(); }
    }, 1000);
    $('#btnEnviar').addEventListener('click', ()=>{ clearInterval(tick); finish(true); });
    function finish(byButton=false){
      over = true;
      const ok = $$('.food.selected', foods).every(el=>{
        const label = el.textContent;
        const meta = L.foods.find(x=>x.t===label);
        return meta?.good;
      });
      if(byButton && ok){ state.score += L.reward; toast('Combo aprobado 🍕🍟', 'good'); }
      else{ state.score += L.penalty; toast('Elegiste quinoa triste… -3 😭', 'bad'); }
      setHUD();
    }
  }

  // Next button
  const next = document.createElement('div'); next.className='center';
  const btnN = document.createElement('button'); btnN.className='btn primary'; btnN.textContent = state.levelIndex < levels.length-1 ? 'Siguiente →' : 'Ver final ✨';
  btnN.addEventListener('click', ()=>{
    state.fragments.push(levels[state.levelIndex].fragment);
    const after = interludes[state.levelIndex+1];
    if(after && after.length && state.levelIndex < levels.length-1){ renderInterlude(state.levelIndex+1); }
    else if(state.levelIndex < levels.length-1){ state.levelIndex++; renderLevel(); }
    else{ renderEnding(); }
  });
  next.appendChild(btnN); screen.appendChild(next);
}

function renderInterlude(key){
  setHUD();
  screen.innerHTML = '';
  const list = interludes[key];
  const wrap = document.createElement('section'); wrap.className='card';
  wrap.innerHTML = `<div class=\"status\"><span class=\"level-tag\">Entre niveles</span><span class=\"sub\">Ronda relámpago (${list.length} preguntas)</span></div>`;
  const box = document.createElement('div'); box.className='choices'; box.style.marginTop='10px';
  wrap.appendChild(box);
  list.forEach((q, idx)=>{
    const panel = document.createElement('div'); panel.className='card'; panel.style.background='#191d4b'; panel.style.borderColor='rgba(255,255,255,.08)';
    panel.innerHTML = `<div style=\"font-weight:700; margin-bottom:6px\">${idx+1}. ${q.q}</div>`;
    const opt = document.createElement('div'); opt.className='choices';
    q.opts.forEach(o=>{
      const b = document.createElement('button'); b.className='btn'; b.textContent=o.t; b.addEventListener('click',()=>{ b.disabled=true; state.score+=o.s; setHUD(); b.classList.add(o.s>=0?'good':'bad'); });
      opt.appendChild(b);
    });
    panel.appendChild(opt); box.appendChild(panel);
  });
  const cta = document.createElement('div'); cta.className='center';
  const btn = document.createElement('button'); btn.className='btn primary'; btn.textContent='Seguir';
  btn.addEventListener('click', ()=>{ state.levelIndex++; renderLevel(); });
  cta.appendChild(btn);
  screen.appendChild(wrap); screen.appendChild(box); screen.appendChild(cta);
}

function renderEnding(){
  setHUD();
  screen.innerHTML = '';
  const wrap = document.createElement('section'); wrap.className='card';
  const total = Math.max(0, state.score);
  const vibe = total>=8 ? 'Pareja experta 🏆' : total>=3 ? 'Relación seria 💞' : 'Sobrevivientes del caos 😅';
  wrap.innerHTML = `
    <div class=\"status\"><span class=\"level-tag\">Final</span>
      <div class=\"progress\" style=\"min-width:220px\"><i style=\"width:${Math.min(100,(total+8)*6)}%\"></i></div>
    </div>
    <div class=\"ending\" id=\"ending\">
      <div class=\"sky\"></div>
      <div class=\"avatar a-left\" id=\"avaL\"><img id=\"imgL\" alt=\"Susana\"></div>
      <div class=\"avatar a-right\" id=\"avaR\"><img id=\"imgR\" alt=\"Susano\"></div>
    </div>
    <div class=\"row\">
      <div class=\"col\">
        <div class=\"bubble\">${state.fragments.map(f=>`• ${f}`).join('<br>')}</div>
      </div>
      <div class=\"col\">
        <div class=\"card\">
          <div class=\"sub\" style=\"margin-bottom:6px\">Mensaje final</div>
          <div style=\"font-size:18px; font-weight:700; margin-bottom:6px\">${vibe}</div>
          <div>Entre risas, dramas y partidas, siempre elegimos <b>seguir jugando juntos</b>. Gracias por otro año siendo mi <b>compañero de caos</b>. — <i>Tu ${CONFIG.names.you}</i></div>
        </div>
      </div>
    </div>
    <div class=\"center\" style=\"margin-top:10px; display:flex; gap:8px; justify-content:center; flex-wrap:wrap\">
      <button class=\"btn\" id=\"btnAnim\">Reproducir animación 💫</button>
      <button class=\"btn\" id=\"btnSave\">Guardar como imagen</button>
    </div>
  `;
  screen.appendChild(wrap);

  loadAvatarsFromAssets();

  document.getElementById('btnAnim').addEventListener('click', playEnding);
  document.getElementById('btnSave').addEventListener('click', saveEndingAsImage);
}

function playEnding(){
  const aL = document.getElementById('avaL'), aR = document.getElementById('avaR');
  aL.animate([{transform:'translateX(0)'},{transform:'translateX(160%)'}], {duration:1400, fill:'forwards', easing:'ease-out'});
  aR.animate([{transform:'translateX(0)'},{transform:'translateX(-160%)'}], {duration:1400, fill:'forwards', easing:'ease-out'});
  const box = document.querySelector('.ending');
  for(let i=0;i<18;i++){
    const h = document.createElement('div'); h.className='heart';
    h.style.left = (45 + Math.random()*10) + '%';
    h.style.bottom = (50 + Math.random()*10) + 'px';
    h.style.animationDelay = (Math.random()*1.5)+'s';
    box.appendChild(h);
    setTimeout(()=>h.remove(), 2400);
  }
}

function saveEndingAsImage(){
  const el = document.querySelector('.ending');
  const {width, height} = el.getBoundingClientRect();
  const clone = el.cloneNode(true);
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'>
      <foreignObject width='100%' height='100%'>
        ${new XMLSerializer().serializeToString(clone)}
      </foreignObject>
    </svg>`;
  const svgBlob = new Blob([svg], {type:'image/svg+xml;charset=utf-8'});
  const url = URL.createObjectURL(svgBlob);
  const a = document.createElement('a'); a.href=url; a.download='final_susano_susana.svg'; a.click();
  setTimeout(()=>URL.revokeObjectURL(url), 1000);
}

function toast(msg, mood='good'){
  const t = document.createElement('div');
  t.textContent = msg; t.className = 'chip';
  t.style.position='fixed'; t.style.left='50%'; t.style.top='16px'; t.style.transform='translateX(-50%)';
  t.style.zIndex=9999; t.style.background = mood==='good'? 'rgba(104,244,163,.18)' : 'rgba(255,107,136,.18)';
  t.style.borderColor = mood==='good'? 'rgba(104,244,163,.6)' : 'rgba(255,107,136,.6)';
  document.body.appendChild(t);
  setTimeout(()=>{ t.style.transition='all .3s ease'; t.style.opacity='0'; t.style.transform='translateX(-50%) translateY(-8px)'; }, 1200);
  setTimeout(()=>t.remove(), 1800);
}

// Cargar avatares desde /assets sin panel de ajustes
function loadAvatarsFromAssets(){
  const L = document.getElementById('imgL');
  const R = document.getElementById('imgR');
  if(L){ L.src = CONFIG.assets.you; L.onerror = ()=>{ L.remove(); }; }
  if(R){ R.src = CONFIG.assets.him; R.onerror = ()=>{ R.remove(); }; }
}

// Boot y reinicio
window.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('btnRestart').addEventListener('click', ()=>{
    state.levelIndex = 0; state.score = 0; state.fragments = []; state.difficulty = 'Normal'; state.interludeNext = 1;
    renderLevel();
  });
  renderLevel();
});
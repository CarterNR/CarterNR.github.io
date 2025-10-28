// --- Config personalizable ---
const CONFIG = {
  names: { you: 'Susana', him: 'Susano' },
  // Coloca tus imágenes en ./assets/ (usando .png como pediste)
  assets: { you: 'assets/susana.png', him: 'assets/susano.png' },
};

const state = {
  levelIndex: 0,
  cardIndex: 0,      // Soporte para múltiples "cards" en cada nivel
  score: 0,
  fragments: [],
  interludeNext: 1,
};

// --- Interludios (preguntas rápidas entre niveles) ---
const interludes = {
  1: [
    { q:'Mapa preferido entre:', opts:[ {t:'Colosseo', s:+1}, {t:'Circuit Royal', s:+2}, {t:'Mosnasterio Shambali', s:-1} ] },
    { q:'Mejor baneo:', opts:[ {t:'Doomfist', s:+2}, {t:'Sombra', s:+1}, {t:'Tola', s:+4} ]},
  ],
  2: [
    { q:'Respuesta correcta al “me duelen los huevos” es…', opts:[ {t:'Ya te tomaste algo?', s:-10}, {t:'Dar una hamburguesa', s:+3} ]},
    { q:'Mejor plan:', opts:[ {t:'Quedarnos en la casa, ver pelis, comer y coger, jeje', s:+5}, {t:'Salir a convicir con gente', s:-5} ]},
  ],
  3: [
    { q:'Postre ideal para nosotros:', opts:[ {t:'Helado', s:-2}, {t:'Brownie con helado', s:-2}, {t:'Algo dulce para mi(susana) y algo salado para tu(susano)', s:+3} ]},
    { q:'Mejor cualida', opts:[ {t:'En el sillon de la casa de perez', s:+10}, {t:'En mi casa', s:+2}, {t:'En la fortuna', s:+2} ]},
  ]
};

// --- Niveles ---
// Puedes usar:
//   A) Formato clásico por nivel: scene/choices + quiz o quizzes
//   B) Formato con múltiples cards: cards: [ { scene, choices, quiz/quizzes }, ... ]
const levels = [
  // Nivel 1 — Inicio (Discord + Overwatch)
  {
    id: 1,
    title: 'El inicio del todo',
    tag: 'Discord + OW',

    // Si quieres varias "cards" dentro del mismo nivel, usa este bloque:
    // (Ya te incluyo una card equivalente a tu escena + quizzes)
    // Si no usas cards, se toma el formato clásico más abajo.
    // Descomenta para usar "cards" y comenta el formato clásico:
    /*
    cards: [
      {
        scene: {
          // Puedes omitir actor si no quieres que aparezca
          text: 'Cuando empezamos a quedarnos hablando hasta tarde. ¿Cuál era la excusa más usada?'
        },
        choices: [
          {label: 'No había excusa xd.', effect:+2, remark:'Nos hacíamos los rudos con la hora +2.'},
          {label: 'Es que no tengo sueño.', effect:+1, remark:'Ajá, sí claro, el insomnio +1.'},
          {label: 'Es que ud me gusta y por eso no me voy.', effect:-1, remark:'Nunca nos dijimos eso -_-, -1.'},
        ],
        quizzes: [
          {
            q: '¿Dónde fue que nos quedamos hablando hasta tarde la primera vez?',
            options: [
              {t:'Instagram', ok:false},
              {t:'Discord, obvio', ok:true},
              {t:'WhatsApp de la tía Cecilia', ok:false},
            ],
            onOk:+3, onBad:-2
          },
          {
            q: '¿Qué juego estábamos jugando cuando empezamos a hablar?',
            options: [
              { t:'Overwatch', ok:true },
              { t:'Valorant', ok:false },
              { t:'Hello Kitty Online', ok:false },
            ],
            onOk:+2, onBad:-1
          },
          {
            q: '¿Quién empezó el joteo primero?',
            options: [
              { t:'Susana, obviamente', ok:true },
              { t:'Susano, claramente', ok:false },
              { t:'Tola, oscuramente', ok:true },
            ],
            onOk:+1, onBad:-1,
            multi:true
          }
        ]
      },
      // Agrega más cards si quieres...
    ],
    */

    // === Formato clásico (activo por defecto si no usas cards) ===
    scene: {
      text: 'Cuando empezamos a quedarnos hablando hasta tarde. ¿Cuál era la excusa más usada?'
    },
    choices: [
      {label: 'No había excusa xd.', effect:+2, remark:'Nos haciamos los rudos con la hora +2.'},
      {label: 'Es que no tengo sueño.', effect:+1, remark:'Ajá, sí claro, el insomnio +1.'},
      {label: 'Es que ud me gusta y por eso no me voy.', effect:-1, remark:'Nunca nos dijimos eso -_-, -1.'},
    ],
    // Puedes dejar un solo "quiz"...
    /*
    quiz: {
      q: '¿Dónde fue que nos quedamos hablando hasta tarde la primera vez?',
      options: [
        {t:'Instagram', ok:false},
        {t:'Discord, obvio', ok:true},
        {t:'WhatsApp de la tía Cecilia', ok:false},
      ],
      onOk:+3, onBad:-2
    },
    */
    // ...o usar "quizzes" (array) para varias preguntas:
    quizzes: [
      {
        q: '¿Dónde fue que nos quedamos hablando hasta tarde la primera vez?',
        options: [
          {t:'Instagram', ok:false},
          {t:'Discord, obvio', ok:true},
          {t:'WhatsApp de la tía Cecilia', ok:false},
        ],
        onOk:+3, onBad:-2
      },
      {
        q: '¿Qué juego estábamos jugando cuando empezamos a hablar?',
        options: [
          { t:'Overwatch', ok:true },
          { t:'Valorant', ok:false },
          { t:'Hello Kitty Online', ok:false },
        ],
        onOk:+2, onBad:-1
      },
      {
        q: '¿Quién empezó el joteo primero?',
        options: [
          { t:'Susana, obviamente', ok:true },
          { t:'Susano, claramente', ok:false },
          { t:'Tola, oscuramente', ok:false },
        ],
        onOk:+1, onBad:-1,
        multi:true
      },
      {
        q: '¿Qué fue lo que yo te dije que cambió todo?',
        options: [
          { t:'Main Mercy pero corazón Hanzo', ok:false },
          { t:'Ud no entiende que es broma, pero si quiere no es broma', ok:true },
          { t:'¿Tiene micro?', ok:false },
        ],
        onOk:+1, onBad:-1,
        multi:true
      }
    ],
    fragment: 'Fragmento 1: Siempre volvemos al lobby donde empezó todo.'
  },

  // Nivel 2 — Modo drama (sarcasmo amoroso)
  {
    id: 2,
    title: 'Modo Drama',
    tag: 'Sarcasmo amoroso',
    scene: {
      text: 'Estamos jugando y tu(susano) me ganas. Yo te digo: ‘sabe qué, ni me hable’. ¿Qué haces?'
    },
    choices: [
      {label: 'Te sales del Discord y vuelves a los 10 segundos', effect:+2, remark:'Porque dramaticos los 2 xd, +2.'}, 
      {label: 'Me haces caso y nunca vulves', effect:-3, remark:'Eso me dolió :(, -3.'},
    ],
    quizzes: [
      {
        q: 'Cuando uno de los dos gana en algo, ¿qué es lo primero que pasa?',
        options: [
          {t:'Celebran tranquilos como gente normal', ok:false},
          {t:'Alguno dice, "Espero que te pares en un Lego"', ok:true},
          {t:'Nos ignoramos 3 días', ok:false},
        ],
        onOk:+3, onBad:-2
      },
      {
        q: '¿Quién es más dramático cuando pierde?',
        options: [
          { t:'Susana', ok:true },
          { t:'Susano', ok:false },
          { t:'Los dos, empate técnico en drama', ok:false },
        ],
        onOk:+2, onBad:-1
      }
    ],
    fragment: 'Fragmento 2: Entre el caos y la risa, elegimos paciencia.'
  },

  // Nivel 3 — Paladar de niños pero hambre seria
  {
    id: 3,
    title: 'Paladar de niños',
    tag: 'Comida',
    timed: true,
    timeSec: 30,
    scene: {
      text: 'Hora de comer. El reto: elegir 3 opciones aprobadas por LOS DOS para nuestro paladar de niños.'
    },
    foods: [
      {t:'Pizza', good:true}, {t:'Pescado entero al horno', good:false}, {t:'Ensalada rusa', good:false}, {t:'Tacos', good:true}, 
      {t:'Ensalada de kale pura', good:false}, {t:'Sushi', good:true}, {t:'Quinoa triste', good:false}, {t:'Taco Bell', good:false},
      {t:'Hamburguesa', good:true}, {t:'Espinaca', good:false},  {t:'Mila al horno', good:false}, {t:'Hot dogs', good:true} 
       
    ],
    need: 3, reward:+3, penalty:-3,
    fragment: 'Fragmento 3: Compartir comida es nuestro lenguaje secreto.'
  },

  // Nivel 4 — Boss final: La distancia
  {
    id: 4,
    title: 'La distancia',
    tag: 'Conexión',
    scene: {
      text: 'Aunque haya kilómetros, hay rituales que nos mantienen cerca. ¿Cuál es el combo ganador?'
    },
    choices: [
      {label: 'Videollamadas + memes diario + hablar todo el día', effect:+10, remark:'Lo que nos ha mantenido cuerdos este año.'},
      {label: 'Tratarnos mal y ni hacernos caso', effect:- 10, remark:'Pos no Susano, esa respuestita nada que ver.'},
      {label: 'Ignorarnos 2 días para “extrañarnos más”', effect:-4, remark:'No, no y no.'},
    ],
    quiz: {
      q: 'Clave final: ¿cómo nos llamamos en chiste?',
      options: [
        {t:'Baby o Bebé', ok:false},
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
}

function renderLevel(){
  const L = levels[state.levelIndex];
  setHUD();
  screen.innerHTML = '';

  // Si hay cards, tomamos la card actual; si no, usamos el nivel “clásico”
  const hasCards = Array.isArray(L.cards) && L.cards.length > 0;
  const C = hasCards ? L.cards[state.cardIndex] : null;

  const sceneActor = hasCards ? (C.scene?.actor ?? '') : (L.scene?.actor ?? '');
  const sceneText  = hasCards ? (C.scene?.text  ?? '') : (L.scene?.text  ?? '');
  const tag        = L.tag ?? '';

  const wrap = document.createElement('section');
  wrap.className = 'card';
  wrap.innerHTML = `
    <div class="status">
      <span class="level-tag">Nivel ${L.id}: ${L.title}</span>
      <div style="min-width:50%" class="progress"><i id="pbar"></i></div>
    </div>
    <div class="row" style="align-items:flex-start">
      <div class="col">
        <div class="actor">
          <span class="chip">${tag}</span>
          ${hasCards ? `<span class="chip" style="margin-left:8px">Card ${state.cardIndex+1}/${L.cards.length}</span>` : ''}
        </div>
        <div class="bubble" style="margin-top:10px">${sceneActor ? `${sceneActor}: ` : ''}${sceneText}</div>
      </div>
      <div class="col" id="rightCol"></div>
    </div>
  `;
  screen.appendChild(wrap);

  const col = $('#rightCol');

  // CHOICES
  const choices = hasCards ? C.choices : L.choices;
  if(choices && choices.length){
    const box = document.createElement('div');
    box.className = 'choices';
    choices.forEach((c)=>{
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = c.label;
      b.addEventListener('click',()=>{
        state.score += c.effect || 0;
        if(c.remark) toast(c.remark, (c.effect||0) >= 0 ? 'good':'bad');
        setHUD();
        b.disabled = true; b.classList.add((c.effect||0) >= 0 ? 'good':'bad');
      });
      box.appendChild(b);
    });
    col.appendChild(box);
  }

  // QUIZZES (soporta quiz único o varios) – toma de la card o del nivel
  const quizzes = (() => {
    const src = hasCards ? C : L;
    if (Array.isArray(src.quizzes)) return src.quizzes;
    if (src.quiz) return [src.quiz];
    return [];
  })();

  quizzes.forEach((quizObj, idx)=>{
    const q = document.createElement('div'); q.className='card'; q.style.marginTop='14px';
    q.innerHTML = `<div class="sub" style="margin-bottom:6px">Quiz ${quizzes.length>1? (idx+1): ''}</div><div style="font-weight:700; margin-bottom:8px">${quizObj.q}</div>`;
    const opts = document.createElement('div'); opts.className='choices';
    q.appendChild(opts);
    (quizObj.options||[]).forEach(o=>{
      const b = document.createElement('button'); b.className='btn'; b.textContent=o.t;
      b.addEventListener('click',()=>{
        if(o.ok){ state.score += quizObj.onOk || 0; toast('Correcto 👏', 'good'); b.classList.add('good'); }
        else{ state.score += quizObj.onBad || 0; toast('Ups, plot twist 😅', 'bad'); b.classList.add('bad'); }
        setHUD(); b.disabled = true;
        if(!quizObj.multi){ $$('button', opts).forEach(x=>x.disabled=true); }
      });
      opts.appendChild(b);
    });
    col.appendChild(q);
  });

  // Timed mini-game (formato clásico del nivel)
  if(L.timed){
    const zone = document.createElement('div'); zone.className='card'; zone.style.marginTop='14px';
    zone.innerHTML = `
      <div class="sub" style="margin-bottom:6px">Reto rápido</div>
      <div style="margin-bottom:10px">Elige <b>${L.need}</b> favoritos antes de que el tiempo llegue a 0.</div>
      <div class="status" style="margin-bottom:8px"><span>⏱️ Tiempo: <b id="timer">${L.timeSec}</b>s</span><span>Elegidos: <b id="picked">0</b>/${L.need}</span></div>
      <div class="grid" id="foods"></div>
      <div class="center" style="margin-top:10px"><button class="btn" id="btnEnviar" disabled>Enviar</button></div>
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

  // BOTÓN SIGUIENTE
  const next = document.createElement('div'); next.className='center';
  const btnN = document.createElement('button'); btnN.className='btn primary';

  const moreCards = hasCards && state.cardIndex < L.cards.length - 1;
  const moreLevels = state.levelIndex < levels.length - 1;
  btnN.textContent = moreCards ? 'Siguiente →'
                    : moreLevels ? 'Siguiente →'
                    : 'Ver final ✨';

  btnN.addEventListener('click', ()=>{
    // Guarda el fragment del nivel una sola vez (cuando terminas el nivel)
    if(!hasCards || (hasCards && state.cardIndex === L.cards.length - 1)){
      if (L.fragment) state.fragments.push(L.fragment);
    }

    if(moreCards){
      state.cardIndex++;
      renderLevel();
    }else if(moreLevels){
      state.cardIndex = 0;
      const after = interludes[state.levelIndex+1];
      if(after && after.length){ renderInterlude(state.levelIndex+1); }
      else { state.levelIndex++; renderLevel(); }
    }else{
      state.cardIndex = 0;
      renderEnding();
    }
  });

  next.appendChild(btnN); screen.appendChild(next);
}

function renderInterlude(key){
  setHUD();
  screen.innerHTML = '';
  const list = interludes[key];
  const wrap = document.createElement('section'); wrap.className='card';
  wrap.innerHTML = `<div class="status"><span class="level-tag">Entre niveles</span><span class="sub">Ronda relámpago</span></div>`;
  const box = document.createElement('div'); box.className='choices'; box.style.marginTop='10px';
  wrap.appendChild(box);
  list.forEach((q, idx)=>{
    const panel = document.createElement('div'); panel.className='card'; panel.style.background='#191d4b'; panel.style.borderColor='rgba(255,255,255,.08)';
    panel.innerHTML = `<div style="font-weight:700; margin-bottom:6px">${idx+1}. ${q.q}</div>`;
    const opt = document.createElement('div'); opt.className='choices';
    q.opts.forEach(o=>{
      const b = document.createElement('button'); b.className='btn'; b.textContent=o.t; b.addEventListener('click',()=>{ b.disabled=true; state.score+=o.s; setHUD(); b.classList.add(o.s>=0?'good':'bad'); });
      opt.appendChild(b);
    });
    panel.appendChild(opt); box.appendChild(panel);
  });
  const cta = document.createElement('div'); cta.className='center';
  const btn = document.createElement('button'); btn.className='btn primary'; btn.textContent='Seguir';
  btn.addEventListener('click', ()=>{
    state.levelIndex++;
    state.cardIndex = 0;     // arranca la primera card del siguiente nivel
    renderLevel();
  });
  cta.appendChild(btn);
  screen.appendChild(wrap); screen.appendChild(box); screen.appendChild(cta);
}

function renderEnding(){
  setHUD();
  screen.innerHTML = '';
  const wrap = document.createElement('section'); wrap.className='card';
  const total = Math.max(0, state.score);
  const vibe = total>=8 ? 'Pareja experta 🏆' : total>=3 ? 'Relación seria 💞' : 'Sobrevivientes a la distancia 😅';
  wrap.innerHTML = `
    <div class="status"><span class="level-tag">Final</span>
      <div class="progress" style="min-width:220px"><i style="width:${Math.min(100,(total+8)*6)}%"></i></div>
    </div>
    <div class="ending" id="ending">
      <div class="sky"></div>
      <div class="avatar a-left" id="avaL"><img id="imgL" alt="Susana"></div>
      <div class="avatar a-right" id="avaR"><img id="imgR" alt="Susano"></div>
    </div>
    <div class="center" style="margin-top:10px; margin-bottom: 20px; display:flex; gap:8px; justify-content:center; flex-wrap:wrap">
      <button class="btn" id="btnAnim">Reproducir animación 💫</button>
    </div>
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="sub" style="margin-bottom:6px">Mensaje final para tu</div>
          <div style="font-size:18px; font-weight:700; margin-bottom:6px">${vibe}</div>
          <div>Entre risas, dramas y partidas, siempre elegimos <b>seguir jugando juntos y ser equipo</b>. Gracias por este año siendo mi <b>compañero</b>. — <i>Tu ${CONFIG.names.you}</i></div>
        </div>
      </div>
    </div>
  `;
  screen.appendChild(wrap);

  loadAvatarsFromAssets();

  const btnAnim = document.getElementById('btnAnim');
  if (btnAnim) btnAnim.addEventListener('click', playEnding);

  // Solo agrega listener si existe el botón (por si no lo tienes en el HTML)
  const btnSave = document.getElementById('btnSave');
  if (btnSave) btnSave.addEventListener('click', saveEndingAsImage);
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
  t.style.zIndex=9999; t.style.background = mood==='good'? 'rgba(27, 85, 51, 1)' : 'rgba(97, 28, 42, 0.79)';
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
  const btnRestart = document.getElementById('btnRestart');
  if (btnRestart) {
    btnRestart.addEventListener('click', ()=>{
      // Reinicio completo
      state.levelIndex = 0;
      state.cardIndex  = 0;
      state.score = 0;
      state.fragments = [];
      state.interludeNext = 1;
      renderLevel();
    });
  }
  renderLevel();
});

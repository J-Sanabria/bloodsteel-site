// ===== Datos de ejemplo (reemplaza con tus rutas y textos) =====
const CHAR_DATA = {
  game: [
    {
      id: 'g-fornax',
      name: 'Fornax',
      role: 'Verdugo — Tanque',
      bg: '/assets/img/chars/game/Mortem_BG.png',
      png: '/assets/img/chars/game/Mortem_BG.png',
      thumb: '/assets/img/chars/game/Mortem_BG.png',
      desc: 'Guardián blindado del imperio; su armadura está alimentada por NOUS.',
      back: 'Criado en los astilleros de acero, su lealtad fue forjada por la guerra. Protege el núcleo de la ciudad a cualquier costo.'
    },
  ],
  comic: [
    {
      id: 'c-Victor',
      name: 'Victor',
      role: 'Creador de los verdugos',
      bg: '/assets/img/chars/comic/victor_bg.jpg',
      png: '/assets/img/chars/comic/noir.png',
      thumb: '/assets/img/chars/comic/noir_thumb.jpg',
      desc: 'asdasdasdasdasdasdasd',
      back: 'asdasdasdasdasdasdasd'
    },
    {
      id: 'c-Artiom',
      name: 'Artiom',
      role: 'Militar que abandono su antiguo nombre',
      bg: '/assets/img/chars/comic/lyra_bg.jpg',
      png: '/assets/img/chars/comic/lyra.png',
      thumb: '/assets/img/chars/comic/lyra_thumb.jpg',
      desc: 'asdasdasdasdasdasdasdasd',
      back: 'asdasdasdasdasdasdasdasdasdasdasd'
    }
    // … agrega más
  ]
};

// ===== Estado y selectores =====
const scopeBtns = document.querySelectorAll('.char-toggle .chip');
const heroBg   = document.getElementById('char-bg');
const heroPng  = document.getElementById('char-png');
const nameEl   = document.getElementById('char-name');
const roleEl   = document.getElementById('char-role');
const descEl   = document.getElementById('char-desc');
const backEl   = document.getElementById('char-back');

const carousel = document.querySelector('.char-carousel');
const track    = carousel?.querySelector('.track');
const leftBtn  = carousel?.querySelector('.arrow.left');
const rightBtn = carousel?.querySelector('.arrow.right');

let scope = 'game';      // 'game' o 'comic'
let index = 0;

// ===== Render =====
function renderThumbs(){
  if (!track) return;
  track.innerHTML = '';
  CHAR_DATA[scope].forEach((c,i)=>{
    const li = document.createElement('li');
    li.className = 'thumb';
    li.innerHTML = `
      <button type="button" data-i="${i}" aria-label="Seleccionar ${c.name}">
        <img src="${c.thumb}" alt="Miniatura de ${c.name}">
        <div class="t-name">${c.name}</div>
      </button>`;
    track.appendChild(li);
  });
}

function setActive(i){
  const list = CHAR_DATA[scope];
  if (!list || !list[i]) return;
  index = i;
  const c = list[i];

  // Actualiza hero
  heroBg.style.backgroundImage = `url('${c.bg}')`;
  heroPng.src = c.png;
  heroPng.alt = `Retrato de ${c.name}`;
  nameEl.textContent = c.name;
  roleEl.textContent = c.role;
  descEl.textContent = c.desc;
  backEl.textContent = c.back;

  // Marca activo en thumbs
  track?.querySelectorAll('.thumb').forEach((t,ii)=>{
    t.classList.toggle('is-active', ii === i);
  });
}

function switchScope(next){
  scope = next;
  // actualiza toggle UI
  scopeBtns.forEach(b=>{
    const on = b.dataset.scope === scope;
    b.classList.toggle('active', on);
    b.setAttribute('aria-pressed', String(on));
  });
  renderThumbs();
  setActive(0);
  updateArrows();
}

// ===== Carrusel (reutiliza la lógica simple) =====
function stepSize(){ return Math.round(track.clientWidth * 0.9); }
function updateArrows(){
  if (!leftBtn || !rightBtn) return;
  leftBtn.disabled  = track.scrollLeft <= 0;
  const max = track.scrollWidth - track.clientWidth - 1;
  rightBtn.disabled = track.scrollLeft >= max;
}
function scrollByStep(dir){
  track.scrollBy({ left: dir * stepSize(), behavior: 'smooth' });
}

leftBtn?.addEventListener('click', ()=>scrollByStep(-1));
rightBtn?.addEventListener('click',()=>scrollByStep(1));
track?.addEventListener('scroll', updateArrows, {passive:true});
window.addEventListener('resize', updateArrows);
window.addEventListener('load', updateArrows);

// Drag (mouse/touch) sencillo
let isDown=false, startX=0, startScroll=0, moved=false;
track?.addEventListener('mousedown', (e)=>{
  isDown=true; moved=false;
  startX=e.clientX; startScroll=track.scrollLeft;
  track.classList.add('dragging');
});
document.addEventListener('mousemove', (e)=>{
  if(!isDown) return;
  const dx=e.clientX-startX;
  if(Math.abs(dx)>2) moved=true;
  track.scrollLeft = startScroll - dx;
  e.preventDefault();
});
document.addEventListener('mouseup', ()=>{
  if(!isDown) return; isDown=false; track?.classList.remove('dragging');
});
track?.addEventListener('touchstart', (e)=>{
  isDown=true; moved=false;
  startX=e.touches[0].clientX; startScroll=track.scrollLeft;
  track.classList.add('dragging');
},{passive:true});
track?.addEventListener('touchmove', (e)=>{
  if(!isDown) return;
  const dx=e.touches[0].clientX - startX;
  if(Math.abs(dx)>2) moved=true;
  track.scrollLeft = startScroll - dx;
},{passive:true});
track?.addEventListener('touchend', ()=>{
  isDown=false; track?.classList.remove('dragging');
});
track?.addEventListener('click', (e)=>{
  if (moved){ e.preventDefault(); e.stopPropagation(); }
}, true);

// Click de thumb → cambiar personaje
track?.addEventListener('click', (e)=>{
  const btn = e.target.closest('button[data-i]');
  if(!btn) return;
  const i = parseInt(btn.dataset.i, 10);
  setActive(i);
});

// Toggle scope
scopeBtns.forEach(b=>{
  b.addEventListener('click', ()=>{
    const next = b.dataset.scope;
    if (next !== scope) switchScope(next);
  });
});

// Init
switchScope('game');
updateArrows();


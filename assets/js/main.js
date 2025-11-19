
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/bloodsteel-site/sw.js', { scope: '/bloodsteel-site/' });
}

// ===== BLOODSTEEL PRELOADER (espera a precache + imágenes) =====
(function(){
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  const delay = (ms) => new Promise(r => setTimeout(r, ms));
  const withTimeout = (p, ms=8000) =>
    Promise.race([p, delay(ms).then(()=>{ throw new Error('timeout'); })]);

  // Lista de assets que quieres sí o sí cacheados al entrar
  const CRITICAL = [
    '../assets/css/main.css',
    '../assets/css/comic.css',
    '../assets/js/main.js',
    '../assets/js/comic.js',
    '../assets/img/Empresa/LogoEmpresa.png'
  ];

  // Preload de imágenes (Image()) para “calentar” decodificación
  function preloadImages(urls=[]) {
    return Promise.all(urls.map(src => new Promise(res => {
      const im = new Image();
      im.onload = im.onerror = res;
      im.decoding = 'async';
      im.loading  = 'eager';
      im.src = src;
    })));
  }

  async function warmCaches() {
    // Espera a que el SW esté listo
    if (!('serviceWorker' in navigator)) return;

    const reg = await navigator.serviceWorker.ready;

    // Enviar manifiesto al SW (crítico + cómic)
    const comic = Array.isArray(window.__COMIC_URLS) ? window.__COMIC_URLS : [];
    const urls  = [...new Set([...CRITICAL, ...comic])];

    reg.active?.postMessage({ type:'WARM', urls });

    // Además: “preload” con Image() para que rendericen instantáneo
    await preloadImages(comic);
  }

  async function boot() {
    // Encendemos el brillo cobre de entrada
    preloader.classList.add('active');

    try {
      // Damos un pequeño respiro para que esté todo conectado
      await delay(150);
      // Espera (con tope) a que el SW caliente sus caches e imágenes
      await withTimeout(warmCaches(), 9000);
    } catch(e) {
      // Si tarda demasiado, seguimos (fallback gracioso)
      // console.warn('Precache tardó, seguimos…', e);
    }

    // Fade out y retiro del DOM
    preloader.classList.add('fade-out');
    await delay(800);
    preloader.remove();
  }

  // Arranca tan pronto haya DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once:true });
  } else {
    boot();
  }
})();

// ===== Menú hamburguesa overlay (siempre) =====
(() => {
  const toggleButton = document.getElementById('button-menu');
  const navWrapper   = document.getElementById('nav');
  if (!toggleButton || !navWrapper) return;

  const open = () => {
    toggleButton.classList.add('close');
    navWrapper.classList.add('show');
    toggleButton.setAttribute('aria-expanded','true');
    document.body.style.overflow = 'hidden'; // bloquea scroll del fondo
  };
  const close = () => {
    toggleButton.classList.remove('close');
    navWrapper.classList.remove('show');
    toggleButton.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
  };

  toggleButton.addEventListener('click', () => {
    const willOpen = !toggleButton.classList.contains('close');
    willOpen ? open() : close();
  });

  // Clic en el backdrop (fuera del panel) → cierra
  navWrapper.addEventListener('click', (e) => {
    if (e.target === navWrapper) close();
  });

  // Clic en cualquier enlace → cierra
  navWrapper.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', close);
  });
})();


// Scroll suave para anclas internas
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    const el = document.querySelector(id);
    if (el){
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });
});

// ===== Hero Parallax tipo cómic (más intenso) =====
(function(){
  const hero = document.querySelector('.hero-parallax');
  if (!hero) return;

  const layers = hero.querySelectorAll('.layer');
  // Aumentamos el rango de desplazamiento (más notorio)
  const speeds = { bg: -0.1, back: 0.1,  mid: -0.1, front: 0.1, text: -0.1 };

  function applyParallax(){
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const rect = hero.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));

    layers.forEach(layer => {
      let speed = speeds.bg;
      if(layer.classList.contains('back')) speed = speeds.back;
      if(layer.classList.contains('mid')) speed = speeds.mid;
      if(layer.classList.contains('front')) speed = speeds.front;
      if(layer.classList.contains('text')) speed = speeds.text;

      // Movimiento más acentuado
      const ty = (progress - 0.5) * 2 * 100 * speed;
      layer.style.transform = `translate3d(0, ${ty}px, 0) scale(${1 + speed * 0.1})`;
    });

    requestAnimationFrame(applyParallax);
  }

  applyParallax();
})();


// ===== Carrusel Productos: flechas + drag + rueda =====
(function(){
  const carousel = document.querySelector('#productos .carousel');
  if(!carousel) return;

  const track = carousel.querySelector('.track');
  const left = carousel.querySelector('.arrow.left');
  const right = carousel.querySelector('.arrow.right');

  // Asegurar que las flechas estén por encima
  if (left) left.style.zIndex = '2';
  if (right) right.style.zIndex = '2';

  // Estado para drag
  let isDown = false;
  let startX = 0;
  let startScroll = 0;
  let moved = false;

  function stepSize(){
    // Un “pase” casi de una vista completa
    return Math.round(track.clientWidth * 0.9);
  }

  function updateArrows(){
    if (!left || !right) return;
    left.disabled = track.scrollLeft <= 0;
    const max = track.scrollWidth - track.clientWidth - 1;
    right.disabled = track.scrollLeft >= max;
  }

  function scrollByStep(dir){
    track.scrollBy({left: dir * stepSize(), behavior: 'smooth'});
  }

  // Click en flechas
  left?.addEventListener('click', ()=>scrollByStep(-1));
  right?.addEventListener('click', ()=>scrollByStep(1));

  // Rueda del mouse: convertir scroll vertical en horizontal
  track.addEventListener('wheel', (e)=>{
    // Si hay deltaY, lo traducimos a desplazamiento horizontal
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      track.scrollBy({ left: e.deltaY, behavior: 'auto' });
      e.preventDefault();
    }
  }, { passive: false });

  // Teclado para el contenedor (ya tenía tabindex=0)
  track.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowRight') { e.preventDefault(); scrollByStep(1); }
    if(e.key === 'ArrowLeft')  { e.preventDefault(); scrollByStep(-1); }
  });

  // Actualiza estado de flechas
  track.addEventListener('scroll', updateArrows, { passive: true });
  window.addEventListener('resize', updateArrows);
  // Inicial
  updateArrows();

  // Por si hay imágenes que cambian el ancho/alto tras cargar
  const ro = new ResizeObserver(updateArrows);
  ro.observe(track);
})();

// Museo: alerta si no es móvil
document.getElementById('open-museum')?.addEventListener('click', (e)=>{
  const isMobile = /Android/i.test(navigator.userAgent);
  if(!isMobile){
    e.preventDefault();
    alert('El museo virtual está optimizado para verse en un dispositivo móvil.');
  }
});

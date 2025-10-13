
// ===== BLOODSTEEL PRELOADER =====
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Activa la animación del cobre después de un instante
  setTimeout(() => preloader.classList.add('active'), 300);

  // Espera que la animación ocurra y luego oculta todo
  setTimeout(() => {
    preloader.classList.add('fade-out');
    setTimeout(() => preloader.remove(), 900); // remueve del DOM
  }, 2600);
});

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
  const speeds = { bg: 0.1, mid: 1, front: 2 };

  function applyParallax(){
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const rect = hero.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));

    layers.forEach(layer => {
      let speed = speeds.bg;
      if(layer.classList.contains('mid')) speed = speeds.mid;
      if(layer.classList.contains('front')) speed = speeds.front;

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
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if(!isMobile){
    e.preventDefault();
    alert('El museo virtual está optimizado para verse en un dispositivo móvil.');
  }
});

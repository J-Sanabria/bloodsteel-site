

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

// Parallax del hero
(function(){
  const bg = document.querySelector('[data-parallax]');
  if (!bg) return;
  function raf(){
    const y = window.scrollY;
    const offset = y * 0.35;
    bg.style.transform = `translate3d(0, ${offset * -0.2}px, 0) scale(1.05)`;
    requestAnimationFrame(raf);
  }
  raf();
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

  // Drag con Pointer Events (sirve para mouse y touch)
  track.addEventListener('pointerdown', (e)=>{
    isDown = true;
    moved = false;
    startX = e.clientX;
    startScroll = track.scrollLeft;
    track.setPointerCapture?.(e.pointerId);
    track.classList.add('dragging');
  });

  track.addEventListener('pointermove', (e)=>{
    if(!isDown) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 3) moved = true;
    track.scrollLeft = startScroll - dx;
    // Evita seleccionar texto/arrastres accidentales
    e.preventDefault();
  });

  function endDrag(e){
    if(!isDown) return;
    isDown = false;
    track.classList.remove('dragging');
    try{ track.releasePointerCapture?.(e.pointerId); }catch(_){}
  }

  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointercancel', endDrag);
  track.addEventListener('pointerleave', endDrag);

  // Evitar que un click sobre un enlace se dispare tras arrastrar
  track.addEventListener('click', (e)=>{
    if(moved){
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

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

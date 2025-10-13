/* ===============================
   BloodSteel — COMIC ENGINE (JS)
   =============================== */

(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* --------------------------------
     1) Header transparente + Menú
  ----------------------------------*/
  const header = document.querySelector('.comic-header');
  const nav    = document.getElementById('nav');        // .comic-nav
  const btn    = document.getElementById('button-menu');

  const openMenu = () => {
    btn.classList.add('close');
    nav.classList.add('show');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    btn.classList.remove('close');
    nav.classList.remove('show');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  btn?.addEventListener('click', () => {
    const willOpen = !btn.classList.contains('close');
    willOpen ? openMenu() : closeMenu();
  });
  nav?.addEventListener('click', e => {
    if (e.target === nav) closeMenu();
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  const onScrollHeader = () => {
    if (!header) return;
    const sc = window.scrollY || document.documentElement.scrollTop;
    header.classList.toggle('scrolled', sc > 8);
  };
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* --------------------------------
     2) Datos del cómic (escenas)
     Estructura: id, layers, choices|next
  ----------------------------------*/
  const COMIC = {
    intro: {
      id: 'intro',
      title: 'Introducción',
      layers: {
        bg:    '../assets/img/comic/intro/bg_intro.jpg',
        mid:   '../assets/img/comic/intro/mid_intro.png',
        front: '../assets/img/comic/intro/front_intro.png',
        text:  '../assets/img/comic/intro/text_intro.png'
      },
      choices: [
        { id: 'pathA', label: 'Camino A' },
        { id: 'pathB', label: 'Camino B' },
        { id: 'pathC', label: 'Camino C' }
      ]
    },

    /* ---- Rama A ---- */
    pathA: {
      id: 'pathA',
      title: 'Ruta A — Acería',
      layers: {
        bg:    '../assets/img/comic/pathA/bg.jpg',
        mid:   '../assets/img/comic/pathA/mid.png',
        front: '../assets/img/comic/pathA/front.png',
        text:  '../assets/img/comic/pathA/text.png'
      },
      next: 'finale'
    },

    /* ---- Rama B ---- */
    pathB: {
      id: 'pathB',
      title: 'Ruta B — Barrio Bajo',
      layers: {
        bg:    '../assets/img/comic/pathB/bg.jpg',
        mid:   '../assets/img/comic/pathB/mid.png',
        front: '../assets/img/comic/pathB/front.png',
        text:  '../assets/img/comic/pathB/text.png'
      },
      next: 'finale'
    },

    /* ---- Rama C ---- */
    pathC: {
      id: 'pathC',
      title: 'Ruta C — Torre NOUS',
      layers: {
        bg:    '../assets/img/comic/pathC/bg.jpg',
        mid:   '../assets/img/comic/pathC/mid.png',
        front: '../assets/img/comic/pathC/front.png',
        text:  '../assets/img/comic/pathC/text.png'
      },
      next: 'finale'
    },

    /* ---- Convergencia ---- */
    finale: {
      id: 'finale',
      title: 'Final',
      layers: {
        bg:    '../assets/img/comic/finale/bg.jpg',
        mid:   '../assets/img/comic/finale/mid.png',
        front: '../assets/img/comic/finale/front.png',
        text:  '../assets/img/comic/finale/text.png'
      },
      next: null
    }
  };

  /* --------------------------------
     3) Motor de escenas
  ----------------------------------*/
  const view = document.getElementById('comic-view');

  function preload(images = []) {
    return Promise.all(images.map(src => new Promise(res => {
      if (!src) return res();
      const img = new Image();
      img.onload = () => res();
      img.onerror = () => res(); // no bloquea si falla
      img.src = src;
    })));
  }

  function buildVignette(scene) {
    const sec = document.createElement('section');
    sec.className = 'vignette';
    sec.id = `v-${scene.id}`;
    sec.dataset.id = scene.id;

    // 4 capas
    ['bg', 'mid', 'front', 'text'].forEach(k => {
      const d = document.createElement('div');
      d.className = `layer ${k}`;
      d.style.backgroundImage = `url('${scene.layers[k]}')`;
      sec.appendChild(d);
    });

    // Decisiones o avance
    if (scene.choices && scene.choices.length) {
      const box = document.createElement('div');
      box.className = 'decision';
      scene.choices.forEach(c => {
        const b = document.createElement('button');
        b.type = 'button';
        b.textContent = c.label;
        b.addEventListener('click', () => gotoScene(c.id));
        box.appendChild(b);
      });
      sec.appendChild(box);
    } else if (scene.next) {
      const box = document.createElement('div');
      box.className = 'decision';
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = 'Continuar';
      b.addEventListener('click', () => gotoScene(scene.next));
      box.appendChild(b);
      sec.appendChild(box);
    }

    return sec;
  }

  let currentId = 'intro';
  const loaded = new Set();

  async function gotoScene(id) {
    const scene = COMIC[id];
    if (!scene) return;

    // Precarga
    const imgs = ['bg', 'mid', 'front', 'text'].map(k => scene.layers[k]);
    await preload(imgs);

    // Construye y muestra
    const sec = buildVignette(scene);
    view.appendChild(sec);

    // Activa transición
    requestAnimationFrame(() => sec.classList.add('is-active'));

    // Desactiva viñetas anteriores (y las remueve tras animar)
    $$('.vignette').forEach(v => {
      if (v !== sec) {
        v.classList.remove('is-active');
        setTimeout(() => v.remove(), 350);
      }
    });

    currentId = id;
    loaded.add(id);

    // Scroll al inicio de la nueva viñeta
    view.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* --------------------------------
     4) Parallax tipo fuelle
  ----------------------------------*/
  const speeds = { bg: 0.15, mid: 0.3, front: 0.55, text: 0.75 };

  function applyParallax() {
    const sec = $('.vignette.is-active') || $('.vignette:last-child');
    if (!sec) return;

    const rect = sec.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));

    // translateY proporcional a scroll dentro de la viñeta
    const maxShift = 40; // px
    $$('.layer', sec).forEach(layer => {
      const k = layer.classList.contains('bg') ? 'bg'
              : layer.classList.contains('mid') ? 'mid'
              : layer.classList.contains('front') ? 'front' : 'text';
      const ty = (progress - 0.5) * 2 * maxShift * speeds[k];
      layer.style.transform = `translateY(${ty}px)`;
      layer.style.opacity = 0.75 + progress * 0.25;
    });
  }

  // micro parallax con el mouse
  let mx = 0, my = 0;
  window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    mx = (e.clientX - cx) / cx;   // -1 .. 1
    my = (e.clientY - cy) / cy;
  }, { passive: true });

  function tick() {
    // leve inclinación/deriva por mouse
    const sec = $('.vignette.is-active') || $('.vignette:last-child');
    if (sec) {
      $$('.layer', sec).forEach(layer => {
        const base = layer.style.transform || 'translateY(0px)';
        const tiltX = mx * 2; // grados sutiles
        const tiltY = my * -2;
        layer.style.transform = `${base} perspective(800px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;
      });
    }
    applyParallax();
    requestAnimationFrame(tick);
  }

  /* --------------------------------
     5) Observers y arranque
  ----------------------------------*/
  // Marca activa la última viñeta añadida
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) en.target.classList.add('is-active');
      else en.target.classList.remove('is-active');
    });
  }, { threshold: 0.35 });

  // Observa nuevas secciones
  const mo = new MutationObserver(muts => {
    muts.forEach(m => {
      m.addedNodes.forEach(n => {
        if (n.classList?.contains('vignette')) io.observe(n);
      });
    });
  });
  mo.observe(view, { childList: true });

  // Primera escena
  gotoScene('intro');
  tick();

  // Año en footer (si existe)
  const y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();
})();

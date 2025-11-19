/* ===============================
   BloodSteel — Comic Engine (fuelle + rutas)
   =============================== */

(() => {
  const $  = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];

  // ---------- 1) Datos ----------
  // Define tus escenas una vez (id → 4 capas)
  const SCENES = {
    // Intro (deja las tuyas reales)
    intro: { bg:'../assets/img/comic/intro/InicioFondo.png',
             mid:'../assets/img/comic/intro/InicioMitad.png',
             front:'../assets/img/comic/intro/InicioFrente.png',
             text:'../assets/img/comic/intro/InicioTexto.png' },

    // Thumbs/teasers de las 3 rutas (mini-viñetas botón)
    teaseA: { bg:'../assets/img/comic/RutaVictor/Pagina 2/Viñeta 1/Fondo.jpg',
              mid:'../assets/img/comic/RutaVictor/Pagina 2/Viñeta 1/Vic_Viñeta01_Mitad.png',
              front:'../assets/img/comic/RutaVictor/Pagina 2/Viñeta 1/Vic_Viñeta01_Frente.png',
              text:'../assets/img/comic/RutaVictor/Pagina 2/Viñeta 1/Vic_Viñeta01_Textos.png' },
    teaseB: { bg:'../assets/img/comic/RutaArtiom/Pagina 7/Viñeta 1/Artiom_Viñeta01_Fondo.png',
              mid:'../assets/img/comic/RutaArtiom/Pagina 7/Viñeta 1/Artiom_Viñeta01_Mitad.png',
              front:'../assets/img/comic/RutaArtiom/Pagina 7/Viñeta 1/Artiom_Viñeta01_Frente.png',
              text:'../assets/img/comic/RutaArtiom/Pagina 7/Viñeta 1/Artiom_Viñeta01_Texto.png' },
    teaseC: { bg:'../assets/img/comic/RutaFaraday/Viñeta01/Faraday_Viñeta01_Fondo.png',
              mid:'',
              front:'../assets/img/comic/RutaFaraday/Viñeta01/Faraday_Viñeta01_Frente.png',
              text:'../assets/img/comic/RutaFaraday/Viñeta01/Faraday_Viñeta01_Texto.png' },

    // Ejemplo de páginas de cada ruta (sustituye/expande a tus ~22 páginas)
    //Pagina 2// Victor
    a01:{bg:'../assets/img/comic/RutaVictor/Pagina 2/Viñeta 1/Fondo.jpg',mid:'../assets/img/comic/RutaVictor/Pagina 2/Viñeta 1/Vic_Viñeta01_Mitad.png',front:'../assets/img/comic/RutaVictor/Pagina 2/Viñeta 1/Vic_Viñeta01_Frente.png',text:'../assets/img/comic/RutaVictor/Pagina 2/Viñeta 1/Vic_Viñeta01_Texto02.png'},
    a02:{bg:'../assets/img/comic/RutaVictor/Pagina 2/Viñeta 2/Fondo.jpg',mid:'',front:'../assets/img/comic/RutaVictor/Pagina 2/Viñeta 2/Frente.png',text:'../assets/img/comic/RutaVictor/Pagina 2/Viñeta 2/Texto.png'},
    a03:{bg:'../assets/img/comic/RutaVictor/Pagina 2/Viñeta 3/Fondo.jpg',mid:'',front:'../assets/img/comic/RutaVictor/Pagina 2/Viñeta 3/Frente.png',text:'../assets/img/comic/RutaVictor/Pagina 2/Viñeta 3/Texto.png'},
    a04:{bg:'../assets/img/comic/RutaVictor/Pagina 2/Viñeta 4/Fondo.jpg',mid:'',front:'../assets/img/comic/RutaVictor/Pagina 2/Viñeta 4/Frente.png',text:'../assets/img/comic/RutaVictor/Pagina 2/Viñeta 4/Texto.png'},
    a05:{bg:'../assets/img/comic/RutaVictor/Pagina 2/Viñeta 5/Fondo.png',mid:'',front:'../assets/img/comic/RutaVictor/Pagina 2/Viñeta 5/Frente.png',text:'../assets/img/comic/RutaVictor/Pagina 2/Viñeta 5/Texto.png'},
    a06:{bg:'',mid:'',front:'../assets/img/comic/RutaVictor/Pagina 2/Viñeta 6/Frente.png',text:'../assets/img/comic/RutaVictor/Pagina 2/Viñeta 6/Texto.png'},
    a07:{bg:'',mid:'',front:'../assets/img/comic/RutaVictor/Pagina 2/Viñeta 7/Frente.png',text:'../assets/img/comic/RutaVictor/Pagina 2/Viñeta 7/Texto.png'},
    a08:{bg:'../assets/img/comic/RutaVictor/Pagina 2/Viñeta 8/Fondo.jpg',mid:'../assets/img/comic/RutaVictor/Pagina 2/Viñeta 8/Mitad.png',front:'../assets/img/comic/RutaVictor/Pagina 2/Viñeta 8/Frente.png',text:'../assets/img/comic/RutaVictor/Pagina 2/Viñeta 8/Texto.png'},
    
    //Pagina 3//
    a09:{bg:'../assets/img/comic/RutaVictor/Pagina 3/Viñeta 1/Fondo.jpg',mid:'',front:'',text:'../assets/img/comic/RutaVictor/Pagina 3/Viñeta 1/Texto.png'},
    a010:{bg:'../assets/img/comic/RutaVictor/Pagina 3/Viñeta 2/Fondo.jpg',mid:'../assets/img/comic/RutaVictor/Pagina 3/Viñeta 2/Mitad.png',front:'../assets/img/comic/RutaVictor/Pagina 3/Viñeta 2/Frente.png',text:'../assets/img/comic/RutaVictor/Pagina 3/Viñeta 2/Texto.png'},
    a011:{bg:'../assets/img/comic/RutaVictor/Pagina 3/Viñeta 2/Fondo.jpg',mid:'../assets/img/comic/RutaVictor/Pagina 3/Viñeta 2/Mitad.png',front:'../assets/img/comic/RutaVictor/Pagina 3/Viñeta 3/Frente.png',text:'../assets/img/comic/RutaVictor/Pagina 3/Viñeta 3/Texto.png'},                        
    a012:{bg:'',mid:'',front:'../assets/img/comic/RutaVictor/Pagina 3/Viñeta 4/Frente.png',text:'../assets/img/comic/RutaVictor/Pagina 3/Viñeta 4/Texto.png'},

    //Pagina 4//
    a013:{bg:'',mid:'',front:'../assets/img/comic/RutaVictor/Pagina 4/Viñeta 1/Frente.png',text:'../assets/img/comic/RutaVictor/Pagina 4/Viñeta 1/Texto.png'},
    a014:{bg:'',mid:'',front:'../assets/img/comic/RutaVictor/Pagina 4/Viñeta 2/Frente.jpg',text:'../assets/img/comic/RutaVictor/Pagina 4/Viñeta 2/Texto.png'},
    a015:{bg:'../assets/img/comic/RutaVictor/Pagina 4/Viñeta 3/Fondo.jpg',mid:'',front:'../assets/img/comic/RutaVictor/Pagina 4/Viñeta 3/Frente.png',text:'../assets/img/comic/RutaVictor/Pagina 4/Viñeta 3/Texto.png'},
    a016:{bg:'../assets/img/comic/RutaVictor/Pagina 4/Viñeta 4/Fondo.jpg',mid:'',front:'../assets/img/comic/RutaVictor/Pagina 4/Viñeta 4/Frente.png',text:'../assets/img/comic/RutaVictor/Pagina 4/Viñeta 4/Texto.png'},  
    a017:{bg:'',mid:'',front:'../assets/img/comic/RutaVictor/Pagina 4/Viñeta 5/Frente.jpg',text:'../assets/img/comic/RutaVictor/Pagina 4/Viñeta 5/Texto.png'},  

    //Pagina 5//
    a018:{bg:'',mid:'',front:'../assets/img/comic/RutaVictor/Pagina 5/Viñeta 1/Frente.jpg',text:'../assets/img/comic/RutaVictor/Pagina 5/Viñeta 1/Texto.png'},    
    a019:{bg:'../assets/img/comic/RutaVictor/Pagina 5/Viñeta 2/Fondo.jpg',mid:'../assets/img/comic/RutaVictor/Pagina 5/Viñeta 2/mitad.png',front:'../assets/img/comic/RutaVictor/Pagina 5/Viñeta 2/Frente.png',text:'../assets/img/comic/RutaVictor/Pagina 5/Viñeta 2/Texto.png'},      
    a020:{bg:'../assets/img/comic/RutaVictor/Pagina 5/Viñeta 3/Fondo.jpg',mid:'',front:'../assets/img/comic/RutaVictor/Pagina 5/Viñeta 3/Frente.png',text:'../assets/img/comic/RutaVictor/Pagina 5/Viñeta 3/Texto.png'},
    a021:{bg:'',mid:'',front:'../assets/img/comic/RutaVictor/Pagina 5/Viñeta 4/Frente.png',text:'../assets/img/comic/RutaVictor/Pagina 5/Viñeta 4/Texto.png'},            
    a022:{bg:'../assets/img/comic/RutaVictor/Pagina 5/Viñeta 5/Fondo.png',mid:'',front:'../assets/img/comic/RutaVictor/Pagina 5/Viñeta 5/Frente.png',text:'../assets/img/comic/RutaVictor/Pagina 5/Viñeta 5/Texto.png'},            
    a023:{bg:'',mid:'',front:'../assets/img/comic/RutaVictor/Pagina 5/Viñeta 6/Frente.png',text:'../assets/img/comic/RutaVictor/Pagina 5/Viñeta 6/Texto.png'},              
    a024:{bg:'',mid:'',front:'../assets/img/comic/RutaVictor/Pagina 5/Viñeta 7/Frente.png',text:'../assets/img/comic/RutaVictor/Pagina 5/Viñeta 7/Texto.png'},                

    //Pagina 6//
    a025:{bg:'../assets/img/comic/RutaVictor/Pagina 6/Viñeta 1/Fondo.png',mid:'',front:'../assets/img/comic/RutaVictor/Pagina 6/Viñeta 1/Frente.png',text:'../assets/img/comic/RutaVictor/Pagina 6/Viñeta 1/Texto.png'},                
    a026:{bg:'',mid:'',front:'../assets/img/comic/RutaVictor/Pagina 6/Viñeta 2/Frente.png',text:'../assets/img/comic/RutaVictor/Pagina 6/Viñeta 2/Texto.png'},
    a027:{bg:'',mid:'',front:'../assets/img/comic/RutaVictor/Pagina 6/Viñeta 3/Frente.png',text:'../assets/img/comic/RutaVictor/Pagina 6/Viñeta 3/Texto.png'},                                    
    a028:{bg:'',mid:'',front:'../assets/img/comic/RutaVictor/Pagina 6/Viñeta 4/Frente.png',text:'../assets/img/comic/RutaVictor/Pagina 6/Viñeta 4/Texto.png'},                
    a029:{bg:'../assets/img/comic/RutaVictor/Pagina 6/Viñeta 5/Fondo.jpg',mid:'../assets/img/comic/RutaVictor/Pagina 6/Viñeta 5/Mitad.png',front:'../assets/img/comic/RutaVictor/Pagina 6/Viñeta 5/Frente.png',text:'../assets/img/comic/RutaVictor/Pagina 6/Viñeta 5/Texto.png'},                    
    
    //Pagina 7// Artiom
    b01:{bg:'../assets/img/comic/RutaArtiom/Pagina 7/Viñeta 1/Artiom_Viñeta01_Fondo.png',mid:'../assets/img/comic/RutaArtiom/Pagina 7/Viñeta 1/Artiom_Viñeta01_Mitad.png',front:'../assets/img/comic/RutaArtiom/Pagina 7/Viñeta 1/Artiom_Viñeta01_Frente.png',text:'../assets/img/comic/RutaArtiom/Pagina 7/Viñeta 1/Texto02.png'},
    b02:{bg:'../assets/img/comic/RutaArtiom/Pagina 7/Viñeta 2/Fondo.jpg',mid:'',front:'../assets/img/comic/RutaArtiom/Pagina 7/Viñeta 2/Frente.png',text:'../assets/img/comic/RutaArtiom/Pagina 7/Viñeta 2/Texto.png'},
    b03:{bg:'../assets/img/comic/RutaArtiom/Pagina 7/Viñeta 3/Fondo.jpg',mid:'../assets/img/comic/RutaArtiom/Pagina 7/Viñeta 3/Mitad.png',front:'../assets/img/comic/RutaArtiom/Pagina 7/Viñeta 3/Frente.png',text:'../assets/img/comic/RutaArtiom/Pagina 7/Viñeta 3/Texto.png'},
    b04:{bg:'../assets/img/comic/RutaArtiom/Pagina 7/Viñeta 4/Fondo.png',mid:'',front:'../assets/img/comic/RutaArtiom/Pagina 7/Viñeta 4/Frente.png',text:'../assets/img/comic/RutaArtiom/Pagina 7/Viñeta 4/Texto.png'},
    b05:{bg:'../assets/img/comic/RutaArtiom/Pagina 7/Viñeta 5/Fondo.jpg',mid:'',front:'../assets/img/comic/RutaArtiom/Pagina 7/Viñeta 5/Frente.png',text:'../assets/img/comic/RutaArtiom/Pagina 7/Viñeta 5/Texto.png'},
    
    //Pagina 8//
    b06:{bg:'../assets/img/comic/RutaVictor/Pagina 3/Viñeta 1/Fondo.jpg',mid:'',front:'../assets/img/comic/RutaArtiom/Pagina 8/Viñeta 1/Frente.png',text:'../assets/img/comic/RutaArtiom/Pagina 8/Viñeta 1/Texto.png'},
    b07:{bg:'../assets/img/comic/RutaArtiom/Pagina 8/Viñeta 2/Fondo.jpg',mid:'../assets/img/comic/RutaArtiom/Pagina 8/Viñeta 2/Mitad.png',front:'../assets/img/comic/RutaArtiom/Pagina 8/Viñeta 2/Frente.png',text:'../assets/img/comic/RutaArtiom/Pagina 8/Viñeta 2/Texto.png'},
    b08:{bg:'../assets/img/comic/RutaArtiom/Pagina 8/Viñeta 2/Fondo.jpg',mid:'../assets/img/comic/RutaArtiom/Pagina 8/Viñeta 3/Mitad.png',front:'../assets/img/comic/RutaArtiom/Pagina 8/Viñeta 2/Frente.png',text:'../assets/img/comic/RutaArtiom/Pagina 8/Viñeta 3/Texto.png'},  
    b09:{bg:'',mid:'',front:'../assets/img/comic/RutaVictor/Pagina 3/Viñeta 4/Frente.png',text:'../assets/img/comic/RutaArtiom/Pagina 8/Viñeta 4/Texto.png'},  

    //Pagina 9//
    b010:{bg:'../assets/img/comic/RutaArtiom/Pagina 9/Viñeta 1/Fondo.jpg',mid:'',front:'',text:'../assets/img/comic/RutaArtiom/Pagina 9/Viñeta 1/Texto.png'}, 
    b011:{bg:'',mid:'',front:'../assets/img/comic/RutaArtiom/Pagina 9/Viñeta 2/Frente.png',text:'../assets/img/comic/RutaArtiom/Pagina 9/Viñeta 2/Texto.png'},  
    b012:{bg:'../assets/img/comic/RutaArtiom/Pagina 9/Viñeta 3/Fondo.jpg',mid:'../assets/img/comic/RutaArtiom/Pagina 9/Viñeta 3/Mitad.png',front:'../assets/img/comic/RutaArtiom/Pagina 9/Viñeta 3/Frente.png',text:'../assets/img/comic/RutaArtiom/Pagina 9/Viñeta 3/Texto.png'},   
    b013:{bg:'../assets/img/comic/RutaArtiom/Pagina 9/Viñeta 4/Fondo.jpg',mid:'',front:'../assets/img/comic/RutaArtiom/Pagina 9/Viñeta 4/Frente.png',text:'../assets/img/comic/RutaArtiom/Pagina 9/Viñeta 4/Texto.png'},  
    b014:{bg:'../assets/img/comic/RutaArtiom/Pagina 9/Viñeta 5/Fondo.jpg',mid:'../assets/img/comic/RutaArtiom/Pagina 9/Viñeta 5/Mitad.png',front:'../assets/img/comic/RutaArtiom/Pagina 9/Viñeta 5/Frente.png',text:'../assets/img/comic/RutaArtiom/Pagina 9/Viñeta 5/Texto.png'},  
    b015:{bg:'../assets/img/comic/RutaArtiom/Pagina 9/Viñeta 6/Fondo.jpg',mid:'',front:'../assets/img/comic/RutaArtiom/Pagina 9/Viñeta 6/Frente.png',text:'../assets/img/comic/RutaArtiom/Pagina 9/Viñeta 6/Texto.png'},
    b016:{bg:'../assets/img/comic/RutaArtiom/Pagina 9/Viñeta 7/Fondo.png',mid:'',front:'../assets/img/comic/RutaArtiom/Pagina 9/Viñeta 7/Frente.png',text:'../assets/img/comic/RutaArtiom/Pagina 9/Viñeta 7/Texto.png'}, 

    c01:{bg:'../assets/img/comic/pathC/01_bg.jpg',mid:'../assets/img/comic/pathC/01_mid.png',front:'../assets/img/comic/pathC/01_front.png',text:'../assets/img/comic/pathC/01_text.png'},
    c02:{bg:'../assets/img/comic/pathC/02_bg.jpg',mid:'../assets/img/comic/pathC/02_mid.png',front:'../assets/img/comic/pathC/02_front.png',text:'../assets/img/comic/pathC/02_text.png'},
    c03:{bg:'../assets/img/comic/pathC/03_bg.jpg',mid:'../assets/img/comic/pathC/03_mid.png',front:'../assets/img/comic/pathC/03_front.png',text:'../assets/img/comic/pathC/03_text.png'},

    // Convergencia / final
    fin1:{bg:'../assets/img/comic/finale/01_bg.jpg',mid:'../assets/img/comic/finale/01_mid.png',front:'../assets/img/comic/finale/01_front.png',text:'../assets/img/comic/finale/01_text.png'},
    fin2:{bg:'../assets/img/comic/finale/02_bg.jpg',mid:'../assets/img/comic/finale/02_mid.png',front:'../assets/img/comic/finale/02_front.png',text:'../assets/img/comic/finale/02_text.png'},
  };

    window.__COMIC_URLS = Object.values(SCENES)
    .flatMap(s => [s.bg, s.mid, s.front, s.text])
    .filter(Boolean);

  // Define rutas (orden de viñetas que se renderean tras elegir)
  const ROUTES = {
    A: ['a01','a02','a03', 'a04', 'a05', 'a06', 'a07', 'a08', 'a09', 'a010', 'a011', 'a012', 'a013', 'a014', 'a015', 'a016', 'a017',
        'a018','a019', 'a020', 'a021', 'a022', 'a023', 'a024', 'a025', 'a026', 'a027', 'a028','a029', 'fin1','fin2'],
    B: ['b01','b02','b03', 'b04', 'b05', 'b06', 'b07', 'b08', 'b09', 'b010', 'b011', 'b012', 'b013', 'b014', 'b015', 'b016', 'fin1','fin2'],
    C: ['c01','c02','c03','fin1','fin2'],
  };

  // ---------- 2) Utilidades ----------
  function preload(list) {
    return Promise.all((list||[]).map(src => new Promise(res => {
      if (!src) return res();
      const im = new Image();
      im.onload = im.onerror = () => res();
      im.src = src;
    })));
  }

  function sceneToVignette(id, data, options={size:'full'}) {
    const sec = document.createElement('section');
    sec.className = 'vignette';
    sec.dataset.id = id;
    if (options.size === 'tease') sec.classList.add('is-tease');

    // 4 capas
    ['bg','mid','front','text'].forEach(k=>{
      const d = document.createElement('div');
      d.className = `layer ${k}`;
      d.style.backgroundImage = `url('${data[k]}')`;
      sec.appendChild(d);
    });
    return sec;
  }

  // ---------- 3) Estructura base ----------
  const view   = $('#comic-view');            // contenedor global (scroll)
  const root   = document.createElement('div'); root.id='comic-root';
  const choice = document.createElement('section'); choice.className='choice-strip';

  view.appendChild(root);

  // Intro (pantalla completa)
  async function renderIntro(){
    const d = SCENES.intro;
    await preload([d.bg,d.mid,d.front,d.text]);
    const intro = sceneToVignette('intro', d, {size:'full'});
    root.appendChild(intro);
    requestAnimationFrame(()=> intro.classList.add('is-active'));
  }

async function renderChoices(){
  choice.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'choice-grid';

  const items = [
    {id:'A', s:SCENES.teaseA},
    {id:'B', s:SCENES.teaseB},
    {id:'C', s:SCENES.teaseC},
  ];

  // Precarga miniaturas
  await preload(items.flatMap(it => [it.s.bg,it.s.mid,it.s.front,it.s.text]));

  items.forEach(it=>{
    const v = sceneToVignette(`tease-${it.id}`, it.s, {size:'tease'});
    v.setAttribute('role','button');
    v.setAttribute('tabindex','0');
    v.classList.add('clickable');



    const go = () => startRoute(it.id);
    v.addEventListener('click', go);
    v.addEventListener('keydown', (e)=>{
      if(e.key==='Enter'||e.key===' '){
        e.preventDefault();
        go();
      }
    });

    wrap.appendChild(v);
  });

  choice.appendChild(wrap);
  root.appendChild(choice);

  // ---- Scroll vertical → horizontal en el carrusel ----
  wrap.addEventListener('wheel', (e)=>{
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      wrap.scrollBy({ left: e.deltaY, behavior:'auto' });
      e.preventDefault();
    }
  }, { passive:false });

  // anima entrada
  requestAnimationFrame(()=>{
    $$('.vignette', choice).forEach(v=>v.classList.add('is-active'));
  });
}


  // ---------- 4) Arranque de ruta ----------
  async function startRoute(routeId){
    // Limpia lo que hay debajo de la intro + choices
    const existing = $('#route-root');
    if (existing) existing.remove();

    const rr = document.createElement('div');
    rr.id = 'route-root';
    root.appendChild(rr);

    const order = ROUTES[routeId] || [];
    // Renderiza TODAS (si son muchas y pesadas, podríamos virtualizar después)
    for (const sid of order){
      const d = SCENES[sid];
      await preload([d.bg,d.mid,d.front,d.text]); // aseguras que se vea limpio al entrar
      const v = sceneToVignette(sid, d, {size:'full'});
      rr.appendChild(v);
      requestAnimationFrame(()=> v.classList.add('is-active'));
    }

    // Desplaza al primer panel de la ruta con un offset pequeño
    setTimeout(()=>{
      const first = rr.querySelector('.vignette');
      if (first) first.scrollIntoView({behavior:'smooth', block:'start'});
    }, 60);
  }

  // ---------- 5) Fuelle/parallax con CSS variables ----------
  // (Se aplica a toda viñeta en viewport; cuanto más scrolleas, más se desplaza cada capa)
  const speeds = { bg:0.2, mid:0.3, front:0.4, text: -0.5 };
  const MAX_SHIFT = 120;

  function applyParallax(){
    const vignettes = $$('.vignette');
    const vh = window.innerHeight || 1;

    vignettes.forEach(sec=>{
      const rect = sec.getBoundingClientRect();
      // progreso visible de -1 (arriba) a 1 (abajo). 0 = centro
      const center = (rect.top + rect.height/2) - vh/2;
      const norm = Math.max(-1, Math.min(1, -center / (vh/2))); // -1..1
      const progress = (norm + 1)/2; // 0..1

      sec.querySelectorAll('.layer').forEach(layer=>{
        const k =
          layer.classList.contains('bg')   ? 'bg'   :
          layer.classList.contains('mid')  ? 'mid'  :
          layer.classList.contains('front')? 'front': 'text';
        const ty = norm * MAX_SHIFT * speeds[k];
        layer.style.setProperty('--ty', `${ty}px`);
      });
    });
  }

  // Tilt leve al mover el mouse (no pisa el translate, solo --rx/--ry)
  let mx=0,my=0;
  window.addEventListener('mousemove', (e)=>{
    const cx = window.innerWidth/2, cy = window.innerHeight/2;
    mx = (e.clientX - cx)/cx;  // -1..1
    my = (e.clientY - cy)/cy;  // -1..1
  }, {passive:true});

  function tick(){
    const rx = (my * -2).toFixed(3) + 'deg';
    const ry = (mx *  2).toFixed(3) + 'deg';
    $$('.vignette .layer').forEach(l=>{
      l.style.setProperty('--rx', rx);
      l.style.setProperty('--ry', ry);
    });

    applyParallax();
    requestAnimationFrame(tick);
  }

  // ---------- 6) Intersection (activar “fuelle”) ----------
  const io = new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      en.target.classList.toggle('is-active', en.isIntersecting);
    });
  }, {root: $('#comic-view'), threshold: 0.25});

  const mo = new MutationObserver(muts=>{
    muts.forEach(m=>{
      m.addedNodes.forEach(n=>{
        if (n.classList?.contains('vignette')) io.observe(n);
        // observa las viñetas teaser también
        if (n.classList?.contains('choice-strip')){
          $$('.vignette', n).forEach(v=> io.observe(v));
        }
      });
    });
  });
  mo.observe($('#comic-view'), {childList:true, subtree:true});

  // ---------- 7) Boot ----------
  (async function boot(){
    await renderIntro();      // viñeta de introducción
    await renderChoices();    // tira con 3 viñetas botón (A/B/C)
    tick();                   // inicia loop del parallax tipo fuelle
  })();
})();

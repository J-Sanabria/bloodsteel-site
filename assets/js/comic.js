(() => {
  const $  = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];


  // ---------- 1) Datos ----------
  // Define tus escenas una vez (id → 4 capas)
  const SCENES = {
    // Intro (deja las tuyas reales)

    Lectura1: { bg:'../assets/img/comic/Lectura1.jpg',
             mid:'',
             front:'',
             text:'' },

    Lectura2: { bg:'../assets/img/comic/Lectura2.jpg',
             mid:'',
             front:'',
             text:'' },

    intro: { bg:'../assets/img/comic/intro/InicioFondo.png',
             mid:'../assets/img/comic/intro/InicioMitad.png',
             front:'../assets/img/comic/intro/InicioFrente.png',
             text:'../assets/img/comic/intro/InicioTexto.png' },

    // Thumbs/teasers de las 3 rutas (mini-viñetas botón)
    teaseA: { bg:'../assets/img/comic/RutaVictor/Pagina 2/Viñeta 1/Fondo.jpg',
              mid:'../assets/img/comic/RutaVictor/Pagina 2/Viñeta 1/Vic_Viñeta01_Mitad.png',
              front:'../assets/img/comic/RutaVictor/Pagina 2/Viñeta 1/Vic_Viñeta01_Frente.png',
              text:'../assets/img/comic/RutaVictor/Pagina 2/Viñeta 1/Vic_Viñeta01_Textos.png' },
    teaseB: { bg:'../assets/img/comic/RutaArtiom/Pagina 7/Viñeta 1/Artiom_Viñeta01_Fondo.jpg',
              mid:'../assets/img/comic/RutaArtiom/Pagina 7/Viñeta 1/Artiom_Viñeta01_Mitad.png',
              front:'../assets/img/comic/RutaArtiom/Pagina 7/Viñeta 1/Artiom_Viñeta01_Frente.png',
              text:'../assets/img/comic/RutaArtiom/Pagina 7/Viñeta 1/Artiom_Viñeta01_Texto.png' },
    teaseC: { bg:'../assets/img/comic/RutaFaraday/Pagina 12/Viñeta 1/Faraday_Viñeta01_Fondo.jpg',
              mid:'',
              front:'../assets/img/comic/RutaFaraday/Pagina 12/Viñeta 1/Faraday_Viñeta01_Frente.png',
              text:'../assets/img/comic/RutaFaraday/Pagina 12/Viñeta 1/Faraday_Viñeta01_Texto.png' },

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
    b01:{bg:'../assets/img/comic/RutaArtiom/Pagina 7/Viñeta 1/Artiom_Viñeta01_Fondo.jpg',mid:'../assets/img/comic/RutaArtiom/Pagina 7/Viñeta 1/Artiom_Viñeta01_Mitad.png',front:'../assets/img/comic/RutaArtiom/Pagina 7/Viñeta 1/Artiom_Viñeta01_Frente.png',text:'../assets/img/comic/RutaArtiom/Pagina 7/Viñeta 1/Texto02.png'},
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

    //Pagina 10//
    b017:{bg:'../assets/img/comic/RutaArtiom/Pagina 10/Viñeta 1/Fondo.jpg',mid:'',front:'',text:'../assets/img/comic/RutaArtiom/Pagina 10/Viñeta 1/Texto.png'}, 
    b018:{bg:'../assets/img/comic/RutaArtiom/Pagina 10/Viñeta 2/Fondo.jpg',mid:'',front:'../assets/img/comic/RutaArtiom/Pagina 10/Viñeta 2/Frente.png',text:'../assets/img/comic/RutaArtiom/Pagina 10/Viñeta 2/Texto.png'}, 
    b019:{bg:'../assets/img/comic/RutaVictor/Pagina 5/Viñeta 2/Fondo.jpg',mid:'../assets/img/comic/RutaVictor/Pagina 5/Viñeta 2/mitad.png',front:'../assets/img/comic/RutaVictor/Pagina 5/Viñeta 2/Frente.png',text:'../assets/img/comic/RutaVictor/Pagina 5/Viñeta 2/Texto.png'},
    b020:{bg:'../assets/img/comic/RutaVictor/Pagina 5/Viñeta 3/Fondo.jpg',mid:'',front:'../assets/img/comic/RutaVictor/Pagina 5/Viñeta 3/Frente.png',text:'../assets/img/comic/RutaArtiom/Pagina 10/Viñeta 4/Texto.png'},            
    b021:{bg:'',mid:'',front:'../assets/img/comic/RutaArtiom/Pagina 10/Viñeta 5/Frente.png',text:'../assets/img/comic/RutaArtiom/Pagina 10/Viñeta 5/Texto.png'},
    b022:{bg:'',mid:'',front:'../assets/img/comic/RutaArtiom/Pagina 10/Viñeta 6/Frente.png',text:'../assets/img/comic/RutaArtiom/Pagina 10/Viñeta 6/Texto.png'}, 
    b023:{bg:'',mid:'',front:'../assets/img/comic/RutaArtiom/Pagina 10/Viñeta 7/Frente.png',text:'../assets/img/comic/RutaArtiom/Pagina 10/Viñeta 7/Texto.png'},  
    b024:{bg:'../assets/img/comic/RutaArtiom/Pagina 10/Viñeta 8/Fondo.jpg',mid:'',front:'',text:'../assets/img/comic/RutaArtiom/Pagina 10/Viñeta 8/Texto.png'}, 
    b025:{bg:'',mid:'',front:'../assets/img/comic/RutaArtiom/Pagina 10/Viñeta 9/Frente.png',text:'../assets/img/comic/RutaArtiom/Pagina 10/Viñeta 9/Texto.png'}, 

    //Pagina 11//
    b026:{bg:'../assets/img/comic/RutaArtiom/Pagina 11/Viñeta 1/Fondo.jpg',mid:'../assets/img/comic/RutaArtiom/Pagina 11/Viñeta 1/Mitad.png',front:'../assets/img/comic/RutaArtiom/Pagina 11/Viñeta 1/Frente.png',text:'../assets/img/comic/RutaArtiom/Pagina 11/Viñeta 1/Texto.png'},   
    b027:{bg:'../assets/img/comic/RutaArtiom/Pagina 11/Viñeta 2/Fondo.jpg',mid:'',front:'../assets/img/comic/RutaArtiom/Pagina 11/Viñeta 2/Frente.png',text:'../assets/img/comic/RutaArtiom/Pagina 11/Viñeta 2/Texto.png'},
    b028:{bg:'',mid:'',front:'../assets/img/comic/RutaVictor/Pagina 6/Viñeta 4/Frente.png',text:'../assets/img/comic/RutaArtiom/Pagina 11/Viñeta 3/Texto.png'},
    b029:{bg:'',mid:'',front:'../assets/img/comic/RutaArtiom/Pagina 11/Viñeta 4/Frente.png',text:'../assets/img/comic/RutaArtiom/Pagina 11/Viñeta 4/Texto.png'},

    //Pagina 12//
    c01:{bg:'../assets/img/comic/RutaFaraday/Pagina 12/Viñeta 1/Faraday_Viñeta01_Fondo.jpg',mid:'',front:'../assets/img/comic/RutaFaraday/Pagina 12/Viñeta 1/Faraday_Viñeta01_Frente.png',text:'../assets/img/comic/RutaFaraday/Pagina 12/Viñeta 1/Texto02.png'},
    c02:{bg:'../assets/img/comic/RutaFaraday/Pagina 12/Viñeta 2/Fondo.jpg',mid:'',front:'../assets/img/comic/RutaFaraday/Pagina 12/Viñeta 2/Frente.png',text:'../assets/img/comic/RutaFaraday/Pagina 12/Viñeta 2/Texto.png'}, 
    c03:{bg:'../assets/img/comic/RutaFaraday/Pagina 12/Viñeta 3/Fondo.jpg',mid:'',front:'../assets/img/comic/RutaFaraday/Pagina 12/Viñeta 3/Frente.png',text:'../assets/img/comic/RutaFaraday/Pagina 12/Viñeta 3/Texto.png'},   
    c04:{bg:'../assets/img/comic/RutaFaraday/Pagina 12/Viñeta 1/Faraday_Viñeta01_Fondo.jpg',mid:'',front:'../assets/img/comic/RutaFaraday/Pagina 12/Viñeta 4/Frente.png',text:'../assets/img/comic/RutaFaraday/Pagina 12/Viñeta 4/Texto.png'},   
    c05:{bg:'../assets/img/comic/RutaFaraday/Pagina 12/Viñeta 5/Fondo.jpg',mid:'',front:'',text:'../assets/img/comic/RutaFaraday/Pagina 12/Viñeta 5/Texto.png'},   
    c06:{bg:'../assets/img/comic/RutaFaraday/Pagina 12/Viñeta 1/Faraday_Viñeta01_Fondo.jpg',mid:'',front:'../assets/img/comic/RutaFaraday/Pagina 12/Viñeta 6/Frente.png',text:'../assets/img/comic/RutaFaraday/Pagina 12/Viñeta 6/Texto.png'},   

    //Pagina 13//
    c07:{bg:'../assets/img/comic/RutaFaraday/Pagina 13/Viñeta 1/Fondo.jpg',mid:'',front:'../assets/img/comic/RutaFaraday/Pagina 13/Viñeta 1/Frente.png',text:'../assets/img/comic/RutaFaraday/Pagina 13/Viñeta 1/Texto.png'},   
    c08:{bg:'',mid:'',front:'../assets/img/comic/RutaVictor/Pagina 4/Viñeta 1/Frente.png',text:'../assets/img/comic/RutaFaraday/Pagina 13/Viñeta 2/Texto.png'},   
    c09:{bg:'../assets/img/comic/RutaFaraday/Pagina 13/Viñeta 3/Fondo.jpg',mid:'',front:'../assets/img/comic/RutaFaraday/Pagina 13/Viñeta 3/Frente.png',text:'../assets/img/comic/RutaFaraday/Pagina 13/Viñeta 3/Texto.png'},   
    c010:{bg:'',mid:'',front:'../assets/img/comic/RutaFaraday/Pagina 13/Viñeta 4/Frente.png',text:'../assets/img/comic/RutaFaraday/Pagina 13/Viñeta 4/Texto.png'},
    c011:{bg:'../assets/img/comic/RutaFaraday/Pagina 13/Viñeta 5/Fondo.jpg',mid:'',front:'',text:'../assets/img/comic/RutaFaraday/Pagina 13/Viñeta 5/Texto.png'},
    c012:{bg:'../assets/img/comic/RutaFaraday/Pagina 13/Viñeta 6/Fondo.jpg',mid:'',front:'../assets/img/comic/RutaFaraday/Pagina 13/Viñeta 6/Frente.png',text:'../assets/img/comic/RutaFaraday/Pagina 13/Viñeta 6/Texto.png'},

    //Pagina 14//
    c012:{bg:'../assets/img/comic/RutaFaraday/Pagina 14/Viñeta 1/Fondo.jpg',mid:'../assets/img/comic/RutaFaraday/Pagina 14/Viñeta 1/Mitad.png',front:'../assets/img/comic/RutaFaraday/Pagina 14/Viñeta 1/Frente.png',text:'../assets/img/comic/RutaFaraday/Pagina 14/Viñeta 1/Texto.png'},
    c013:{bg:'../assets/img/comic/RutaFaraday/Pagina 14/Viñeta 2/Fondo.jpg',mid:'../assets/img/comic/RutaFaraday/Pagina 14/Viñeta 2/Mitad.png',front:'../assets/img/comic/RutaFaraday/Pagina 14/Viñeta 2/Frente.png',text:'../assets/img/comic/RutaFaraday/Pagina 14/Viñeta 2/Texto.png'},
    c014:{bg:'',mid:'',front:'../assets/img/comic/RutaFaraday/Pagina 14/Viñeta 3/Frente.png',text:'../assets/img/comic/RutaFaraday/Pagina 14/Viñeta 3/Texto.png'},
    c015:{bg:'',mid:'',front:'../assets/img/comic/RutaFaraday/Pagina 14/Viñeta 4/Frente.png',text:'../assets/img/comic/RutaFaraday/Pagina 14/Viñeta 4/Texto.png'},
    c016:{bg:'../assets/img/comic/RutaFaraday/Pagina 14/Viñeta 5/Fondo.jpg',mid:'../assets/img/comic/RutaFaraday/Pagina 14/Viñeta 5/Mitad.png',front:'../assets/img/comic/RutaFaraday/Pagina 14/Viñeta 5/Frente.png',text:'../assets/img/comic/RutaFaraday/Pagina 14/Viñeta 5/Texto.png'},
    c017:{bg:'../assets/img/comic/RutaArtiom/Pagina 9/Viñeta 1/Fondo.jpg',mid:'',front:'',text:'../assets/img/comic/RutaFaraday/Pagina 14/Viñeta 6/Texto.png'},
    c018:{bg:'',mid:'',front:'../assets/img/comic/RutaArtiom/Pagina 9/Viñeta 2/Frente.png',text:'../assets/img/comic/RutaFaraday/Pagina 14/Viñeta 7/Texto.png'},
    c019:{bg:'../assets/img/comic/RutaArtiom/Pagina 9/Viñeta 5/Fondo.jpg',mid:'../assets/img/comic/RutaArtiom/Pagina 9/Viñeta 5/Mitad.png',front:'../assets/img/comic/RutaArtiom/Pagina 9/Viñeta 5/Frente.png',text:'../assets/img/comic/RutaFaraday/Pagina 14/Viñeta 8/Texto.png'},
    c020:{bg:'../assets/img/comic/RutaFaraday/Pagina 12/Viñeta 1/Faraday_Viñeta01_Fondo.jpg',mid:'../assets/img/comic/RutaFaraday/Pagina 14/Viñeta 9/Mitad.png',front:'../assets/img/comic/RutaFaraday/Pagina 14/Viñeta 9/Frente.png',text:'../assets/img/comic/RutaFaraday/Pagina 14/Viñeta 9/Texto.png'},
    c021:{bg:'',mid:'',front:'../assets/img/comic/RutaFaraday/Pagina 14/Viñeta 10/Frente.png',text:'../assets/img/comic/RutaFaraday/Pagina 14/Viñeta 10/Texto.png'},
    c022:{bg:'../assets/img/comic/RutaFaraday/Pagina 14/Viñeta 11/Fondo.jpg',mid:'',front:'../assets/img/comic/RutaFaraday/Pagina 14/Viñeta 11/Frente.png',text:'../assets/img/comic/RutaFaraday/Pagina 14/Viñeta 11/Texto.png'},

    //Pagina 15//
    c023:{bg:'../assets/img/comic/RutaFaraday/Pagina 15/Viñeta 1/Fondo.jpg',mid:'',front:'',text:'../assets/img/comic/RutaFaraday/Pagina 15/Viñeta 1/Texto.png'},
    c024:{bg:'../assets/img/comic/RutaFaraday/Pagina 15/Viñeta 2/Fondo.jpg',mid:'',front:'../assets/img/comic/RutaFaraday/Pagina 15/Viñeta 2/Frente.png',text:'../assets/img/comic/RutaFaraday/Pagina 15/Viñeta 2/Texto.png'},
    c025:{bg:'',mid:'',front:'../assets/img/comic/RutaFaraday/Pagina 15/Viñeta 3/Frente.png',text:'../assets/img/comic/RutaFaraday/Pagina 15/Viñeta 3/Texto.png'},
    c026:{bg:'../assets/img/comic/RutaFaraday/Pagina 15/Viñeta 4/Fondo.jpg',mid:'',front:'../assets/img/comic/RutaFaraday/Pagina 15/Viñeta 4/Frente.png',text:'../assets/img/comic/RutaFaraday/Pagina 15/Viñeta 4/Texto.png'},
    c027:{bg:'../assets/img/comic/RutaFaraday/Pagina 15/Viñeta 6/Fondo.jpg',mid:'',front:'../assets/img/comic/RutaFaraday/Pagina 15/Viñeta 6/Frente.png',text:'../assets/img/comic/RutaFaraday/Pagina 15/Viñeta 6/Texto.png'},
    c028:{bg:'',mid:'',front:'../assets/img/comic/RutaFaraday/Pagina 15/Viñeta 7/Frente.png',text:'../assets/img/comic/RutaFaraday/Pagina 15/Viñeta 7/Texto.png'},
    c029:{bg:'../assets/img/comic/RutaFaraday/Pagina 15/Viñeta 8/Fondo.png',mid:'',front:'',text:'../assets/img/comic/RutaFaraday/Pagina 15/Viñeta 8/Texto.png'},
    c030:{bg:'',mid:'../assets/img/comic/RutaFaraday/Pagina 15/Viñeta 9/Mitad.png',front:'../assets/img/comic/RutaFaraday/Pagina 15/Viñeta 9/Frente.png',text:'../assets/img/comic/RutaFaraday/Pagina 15/Viñeta 9/Texto.png'},

      // Convergencia / final
    //Pagina 16//
    fin1:{bg:'../assets/img/comic/RutaArtiom/Pagina 11/Viñeta 1/Fondo.jpg',mid:'../assets/img/comic/RutaArtiom/Pagina 11/Viñeta 1/Mitad.png',front:'../assets/img/comic/RutaArtiom/Pagina 11/Viñeta 1/Frente.png',text:'../assets/img/comic/Final/Pagina 16/Viñeta 1/Texto.png'},
    fin2:{bg:'',mid:'',front:'../assets/img/comic/Final/Pagina 16/Viñeta 2/Frente.png',text:'../assets/img/comic/Final/Pagina 16/Viñeta 2/Texto.png'},
    fin3:{bg:'',mid:'../assets/img/comic/Final/Pagina 16/Viñeta 3/Mitad.png',front:'../assets/img/comic/Final/Pagina 16/Viñeta 3/Frente.png',text:'../assets/img/comic/Final/Pagina 16/Viñeta 3/Texto.png'},

    //Pagina 17//
    fin4:{bg:'',mid:'',front:'../assets/img/comic/Final/Pagina 17/Viñeta 1/Frente.png',text:'../assets/img/comic/Final/Pagina 17/Viñeta 1/Texto.png'},
    fin5:{bg:'',mid:'',front:'../assets/img/comic/Final/Pagina 17/Viñeta 2/Frente.png',text:'../assets/img/comic/Final/Pagina 17/Viñeta 2/Texto.png'},
    fin6:{bg:'',mid:'',front:'../assets/img/comic/Final/Pagina 17/Viñeta 3/Frente.png',text:'../assets/img/comic/Final/Pagina 17/Viñeta 3/Texto.png'},
    fin7:{bg:'../assets/img/comic/RutaArtiom/Pagina 11/Viñeta 2/Fondo.jpg',mid:'',front:'../assets/img/comic/RutaArtiom/Pagina 11/Viñeta 2/Frente.png',text:'../assets/img/comic/Final/Pagina 17/Viñeta 4/Texto.png'},

    //Pagina 18//
     fin8:{bg:'',mid:'',front:'../assets/img/comic/Final/Pagina 18/Viñeta 1/Frente.png',text:'../assets/img/comic/Final/Pagina 18/Viñeta 1/Texto.png'},
     fin9:{bg:'',mid:'',front:'../assets/img/comic/Final/Pagina 18/Viñeta 2/Frente.png',text:''},
    fin10:{bg:'',mid:'../assets/img/comic/Final/Pagina 18/Viñeta 3/Mitad.png',front:'..assets/img/comic/Final/Pagina 18/Viñeta 3/Frente.png',text:'..assets/img/comic/Final/Pagina 18/Viñeta 3/Texto.png'},
    fin11:{bg:'',mid:'',front:'../assets/img/comic/Final/Pagina 18/Viñeta 4/Frente.png',text:'../assets/img/comic/Final/Pagina 18/Viñeta 4/Texto.png'},
    fin12:{bg:'../assets/img/comic/Final/Pagina 18/Viñeta 5/Fondo.jpg',mid:'',front:'../assets/img/comic/Final/Pagina 18/Viñeta 5/Frente.png',text:'../assets/img/comic/Final/Pagina 18/Viñeta 5/Texto.png'},
    fin13:{bg:'../assets/img/comic/Final/Pagina 18/Viñeta 6/Fondo.jpg',mid:'',front:'../assets/img/comic/Final/Pagina 18/Viñeta 6/Frente.png',text:'../assets/img/comic/Final/Pagina 18/Viñeta 6/Texto.png'},
    fin14:{bg:'../assets/img/comic/Final/Pagina 18/Viñeta 7/Fondo.jpg',mid:'../assets/img/comic/Final/Pagina 18/Viñeta 7/Mitad.png',front:'../assets/img/comic/Final/Pagina 18/Viñeta 7/Frente.png',text:'../assets/img/comic/Final/Pagina 18/Viñeta 7/Texto.png'},
    fin15:{bg:'',mid:'',front:'../assets/img/comic/Final/Pagina 18/Viñeta 8/Frente.png',text:'../assets/img/comic/Final/Pagina 18/Viñeta 8/Texto.png'},

    //Pagina 19//
    fin16:{bg:'',mid:'',front:'../assets/img/comic/Final/Pagina 19/Viñeta 1/Frente.jpg',text:''},
    fin17:{bg:'',mid:'',front:'../assets/img/comic/Final/Pagina 19/Viñeta 2/Frente.jpg',text:''},
    fin18:{bg:'',mid:'',front:'../assets/img/comic/Final/Pagina 19/Viñeta 3/Frente.png',text:''},
    fin19:{bg:'',mid:'',front:'../assets/img/comic/Final/Pagina 19/Viñeta 4/Frente.png',text:''},
    fin20:{bg:'',mid:'',front:'../assets/img/comic/Final/Pagina 19/Viñeta 5/Frente.png',text:''},
    fin21:{bg:'',mid:'',front:'../assets/img/comic/Final/Pagina 19/Viñeta 6/Frente.jpg',text:''},
    fin22:{bg:'',mid:'',front:'../assets/img/comic/Final/Pagina 19/Viñeta 7/Frente.png',text:''},
    fin23:{bg:'',mid:'',front:'../assets/img/comic/Final/Pagina 19/Viñeta 8/Frente.jpg',text:''},

       //Pagina 20//
    fin24:{bg:'',mid:'',front:'../assets/img/comic/Final/Pagina 20/Viñeta 1/Frente.jpg',text:''},
    fin25:{bg:'',mid:'',front:'../assets/img/comic/Final/Pagina 20/Viñeta 2/Frente.png',text:''},
    fin26:{bg:'',mid:'',front:'../assets/img/comic/Final/Pagina 20/Viñeta 3/Frente.png',text:''},
    fin27:{bg:'',mid:'',front:'../assets/img/comic/Final/Pagina 20/Viñeta 4/Frente.jpg',text:''},
    fin28:{bg:'',mid:'',front:'../assets/img/comic/Final/Pagina 20/Viñeta 5/Frente.png',text:''},
    fin29:{bg:'',mid:'',front:'../assets/img/comic/Final/Pagina 20/Viñeta 6/Frente.jpg',text:''},
    fin30:{bg:'',mid:'',front:'../assets/img/comic/Final/Pagina 20/Viñeta 7/Frente.jpg',text:''},
    fin31:{bg:'',mid:'',front:'../assets/img/comic/Final/Pagina 20/Viñeta 8/Frente.jpg',text:''},
    fin32:{bg:'',mid:'',front:'../assets/img/comic/Final/Pagina 20/Viñeta 9/Frente.jpg',text:''},
    fin33:{bg:'',mid:'',front:'../assets/img/comic/Final/Pagina 20/Viñeta 10/Frente.png',text:''},

    fin34:{bg:'../assets/img/comic/Final/Pagina 21/Fondo.jpg',mid:'../assets/img/comic/Final/Pagina 21/Mitad.png',front:'../assets/img/comic/Final/Pagina 21/Frente.png',text:'../assets/img/comic/Final/Pagina 21/Texto.png'},
  };  

    window.__COMIC_URLS = Object.values(SCENES)
    .flatMap(s => [s.bg, s.mid, s.front, s.text])
    .filter(Boolean);

  // Define rutas (orden de viñetas que se renderean tras elegir)
  const ROUTES = {
    A: ['a01','a02','a03', 'a04', 'a05', 'a06', 'a07', 'a08', 'a09', 'a010', 'a011', 'a012', 'a013', 'a014', 'a015', 'a016', 'a017',
        'a018','a019', 'a020', 'a021', 'a022', 'a023', 'a024', 'a025', 'a026', 'a027', 'a028','a029', 'fin1','fin2', 'fin3', 'fin4', 'fin5','fin6', 'fin7',
      'fin8', 'fin9', 'fin10', 'fin11', 'fin12', 'fin13', 'fin14', 'fin15', 'fin16', 'fin17','fin18','fin19','fin20','fin21','fin22','fin23','fin24', 'fin26','fin27','fin28','fin29','fin30','fin31','fin32', 'fin33', 'fin34'],
    B: ['b01','b02','b03', 'b04', 'b05', 'b06', 'b07', 'b08', 'b09', 'b010', 'b011', 'b012', 'b013', 'b014', 'b015', 'b016',
      'b017', 'b018', 'b019', 'b020', 'b021', 'b022', 'b023', 'b024', 'b025', 'b026', 'b027', 'b028', 'b029','fin1','fin2', 'fin3', 'fin4', 'fin5','fin6', 'fin7',
      'fin8', 'fin9', 'fin10', 'fin11', 'fin12', 'fin13', 'fin14', 'fin15', 'fin16', 'fin17','fin18','fin19','fin20','fin21','fin22','fin23','fin24', 'fin26','fin27','fin28','fin29','fin30','fin31','fin32', 'fin33', 'fin34'],
    C: ['c01', 'c02', 'c03', 'c04', 'c05', 'c06', 'c07', 'c08', 'c09', 'c010', 'c011', 'c012', 'c013', 'c014', 'c015', 'c016', 'c017',
      'c018', 'c019', 'c020', 'c021', 'c022', 'c023', 'c024', 'c025', 'c026', 'c027', 'c028', 'c029', 'c030', 'fin1','fin2', 'fin3', 'fin4', 'fin5','fin6', 'fin7',
      'fin8', 'fin9', 'fin10', 'fin11', 'fin12', 'fin13', 'fin14', 'fin15', 'fin16', 'fin17','fin18','fin19','fin20','fin21','fin22','fin23','fin24', 'fin26','fin27','fin28','fin29','fin30','fin31','fin32', 'fin33', 'fin34'
    ],
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

const routeLoader = document.createElement('div');
routeLoader.id = 'route-loading';
routeLoader.innerHTML = '<div class="spinner"></div>';
view.appendChild(routeLoader);

// ---- Botón flotante para volver al inicio de las rutas ----
const routesTopBtn = document.createElement('button');
routesTopBtn.type = 'button';
routesTopBtn.className = 'routes-top-btn';
routesTopBtn.setAttribute('aria-label', 'Volver al inicio de las rutas');
routesTopBtn.textContent = '↑ Ir a Rutas';

view.appendChild(routesTopBtn);

// Al hacer clic, desplazamos hasta el bloque de rutas
routesTopBtn.addEventListener('click', () => {
  if (choice && choice.isConnected) {
    // Hace scroll hasta el bloque de rutas dentro de su contenedor scrollable
    choice.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // pequeño ajuste por el header, opcional
    if (view && typeof view.scrollBy === 'function') {
      view.scrollBy({ top: -24, behavior: 'smooth' });
    }
  } else {
    // Fallback: subir arriba del todo
    if (view && typeof view.scrollTo === 'function') {
      view.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
});



 async function renderIntro() {

  // ---- Lectura 1 ----
  let d1 = SCENES.Lectura1;
  await preload([d1.bg, d1.mid, d1.front, d1.text]);
  let v1 = sceneToVignette('lectura1', d1, {size:'full'});
  root.appendChild(v1);
  await new Promise(res => requestAnimationFrame(()=>{ 
    v1.classList.add('is-active'); 
    setTimeout(res, 600); // pequeña pausa opcional
  }));

  // ---- Lectura 2 ----
  let d2 = SCENES.Lectura2;
  await preload([d2.bg, d2.mid, d2.front, d2.text]);
  let v2 = sceneToVignette('lectura2', d2, {size:'full'});
  root.appendChild(v2);
  await new Promise(res => requestAnimationFrame(()=>{ 
    v2.classList.add('is-active'); 
    setTimeout(res, 600);
  }));

  // ---- Intro normal ----
  let d3 = SCENES.intro;
  await preload([d3.bg, d3.mid, d3.front, d3.text]);
  let intro = sceneToVignette('intro', d3, {size:'full'});
  root.appendChild(intro);
  requestAnimationFrame(()=> intro.classList.add('is-active'));
}

  

async function renderChoices(){
  choice.innerHTML = '';

  // ---- Encabezado del bloque de rutas ----
  const head = document.createElement('div');
  head.className = 'choice-head';

  const title = document.createElement('h2');
  title.className = 'choice-heading';
  title.textContent = 'Selecciona la ruta que quieres seguir';
  head.appendChild(title);

  choice.appendChild(head);

  // ---- Carrusel horizontal ----
  const wrap = document.createElement('div');
  wrap.className = 'choice-grid';

  const items = [
    { id:'A', s:SCENES.teaseA, label:'Ruta Victor' },
    { id:'B', s:SCENES.teaseB, label:'Ruta Artiom' },
    { id:'C', s:SCENES.teaseC, label:'Ruta Faraday' },
  ];

  // Precargar miniaturas
  await preload(items.flatMap(it => [it.s.bg, it.s.mid, it.s.front, it.s.text]));

  items.forEach(it => {
    // Contenedor de cada opción
    const card = document.createElement('article');
    card.className = 'choice-item';

    // Título de la ruta arriba
    const rTitle = document.createElement('h3');
    rTitle.className = 'route-name';
    rTitle.textContent = it.label;
    card.appendChild(rTitle);

    // Viñeta teaser clicable
    const v = sceneToVignette(`tease-${it.id}`, it.s, {size:'tease'});
    v.setAttribute('role','button');
    v.setAttribute('tabindex','0');
    v.classList.add('clickable');

    const go = () => startRoute(it.id);
    v.addEventListener('click', go);
    v.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        go();
      }
    });

    card.appendChild(v);
    wrap.appendChild(card);
  });

  choice.appendChild(wrap);
  root.appendChild(choice);

  // ===== Transición suave entre rutas (slide centrado) =====
  const cards = $$('.choice-item', wrap);

  function updateCurrentSlide(){
    if (!cards.length) return;

    const viewportCenter = window.innerWidth / 2;
    let best = null;
    let bestDist = Infinity;

    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const dist = Math.abs(cardCenter - viewportCenter);
      if (dist < bestDist) {
        bestDist = dist;
        best = card;
      }
    });

    cards.forEach(c => {
      const isCurr = (c === best);
      c.classList.toggle('is-current', isCurr);
      c.classList.toggle('is-not-current', !isCurr);
    });
  }

  // Actualiza al hacer scroll horizontal del carrusel
  wrap.addEventListener('scroll', () => {
    requestAnimationFrame(updateCurrentSlide);
  }, { passive:true });

  // Scroll vertical → horizontal SOLO para rueda (desktop)
  wrap.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      wrap.scrollBy({
        left: e.deltaY * 0.7,
        behavior: 'smooth'
      });
      e.preventDefault();
    }
  }, { passive:false });

  // Estado inicial
  updateCurrentSlide();

  // Animación de entrada
  requestAnimationFrame(() => {
    $$('.vignette', choice).forEach(v => v.classList.add('is-active'));
  });
}




  // ---------- 4) Arranque de ruta ----------
async function startRoute(routeId){
  const loader = $('#route-loading');
    const html = document.documentElement;
  const body = document.body;
  
  if (loader) loader.classList.add('is-visible'); 
  if (html)  html.classList.add('route-loading-active');
  if (body)  body.classList.add('route-loading-active'); // ← mostrar loader

  // Limpia lo que hay debajo de la intro + choices
  const existing = $('#route-root');
  if (existing) existing.remove();

  const rr = document.createElement('div');
  rr.id = 'route-root';
  root.appendChild(rr);

  const order = ROUTES[routeId] || [];

  try {
    // Renderiza TODAS (si son muchas y pesadas, podríamos virtualizar después)
    for (const sid of order){
      const d = SCENES[sid];
      await preload([d.bg,d.mid,d.front,d.text]); // aseguras que se vea limpio al entrar
      const v = sceneToVignette(sid, d, {size:'full'});
      rr.appendChild(v);
      requestAnimationFrame(()=> v.classList.add('is-active'));
    }

    // Recalcular parallax una vez montadas
    applyParallax();

    // Desplaza al primer panel de la ruta (suave para todos)
    setTimeout(()=> {
      const first = rr.querySelector('.vignette');
      if (!first) return;

      const rect   = first.getBoundingClientRect();
      const offset = window.pageYOffset || document.documentElement.scrollTop || 0;
      const targetY = rect.top + offset - 16; // pequeño margen bajo el header

      const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        window.scrollTo(0, targetY);
      } else {
        window.scrollTo({
          top: targetY,
          behavior: 'smooth'
        });
      }
    }, 80);
  } finally {
    // Siempre ocultar loader aunque falle algo
    if (loader) loader.classList.remove('is-visible');
        if (html)  html.classList.remove('route-loading-active');
    if (body)  body.classList.remove('route-loading-active');
  }
}

// ---------- 5) Fuelle/parallax con CSS variables ----------
const speeds = { bg:0.2, mid:0.3, front:0.4, text: -0.5 };
const MAX_SHIFT = 120;

function applyParallax(){
  const vignettes = $$('.vignette');
  const vh = window.innerHeight || 1;

  vignettes.forEach(sec=>{
    const rect = sec.getBoundingClientRect();
    const center = (rect.top + rect.height/2) - vh/2;
    const norm = Math.max(-1, Math.min(1, -center / (vh/2))); // -1..1

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

// Throttle para no recalcular mil veces por frame
let parallaxScheduled = false;
function scheduleParallax(){
  if (parallaxScheduled) return;
  parallaxScheduled = true;
  requestAnimationFrame(() => {
    applyParallax();
    parallaxScheduled = false;
  });
}

// Scroll de la ventana (no del contenedor)
window.addEventListener('scroll', scheduleParallax, { passive:true });
window.addEventListener('resize', scheduleParallax, { passive:true });


// Tilt leve con el mouse (solo PC, en móvil prácticamente no afecta)
window.addEventListener('mousemove', (e)=>{
  const cx = window.innerWidth/2, cy = window.innerHeight/2;
  const mx = (e.clientX - cx)/cx;  // -1..1
  const my = (e.clientY - cy)/cy;  // -1..1
  const rx = (my * -2).toFixed(3) + 'deg';
  const ry = (mx *  2).toFixed(3) + 'deg';

  $$('.vignette .layer').forEach(l=>{
    l.style.setProperty('--rx', rx);
    l.style.setProperty('--ry', ry);
  });
}, {passive:true});

  // ---------- 6) Intersection (activar “fuelle”) ----------
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    en.target.classList.toggle('is-active', en.isIntersecting);
  });
}, {
  root: null,          // << usamos el viewport, no #comic-view
  threshold: 0.25
});


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
  applyParallax();          // primer cálculo inicial
})();
})();

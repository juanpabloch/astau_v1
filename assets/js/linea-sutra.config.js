/* ==========================================================================
   ASTAU · Configuración de la "Línea Viva" (Sūtra Scroll Line)
   Archivo: assets/js/linea-sutra.config.js
   Dónde actúa:
   - index.html (sección aria-labelledby="manifiesto-titulo", 4 pasos + botón)
   - astau/index.html (sección aria-labelledby="conceptos-titulo", 3 pasos + portal)
   ==========================================================================

   GUÍA RÁPIDA DE EDICIÓN:
   -----------------------
   1. CAMINO DE LA LÍNEA (puntos / puntosManifiesto / puntosConceptos):
      Cada punto tiene coordenadas { x, y } en porcentaje de 0 a 100:
      - x: 0 = borde izquierdo de la sección | 50 = centro | 100 = borde derecho
      - y: 0 = borde inferior exacto del medallón inicial
      - y: 100 = borde superior exacto del botón / portal de cierre
      El sistema une todos los puntos con una onda sinusoidal orgánica (monótona
      en Y, con entrada y salida estrictamente verticales y giros suaves).

   2. EDITOR VISUAL EN VIVO:
      Cambiá `modoEditor: true` abajo (o abrí la página agregando `?editar-linea`
      al final de la URL) para arrastrar los nodos en vivo.
   ========================================================================== */

window.ASTAU_LINEA_CONFIG = {
  /* Activar en `true` para ver y arrastrar los nodos de la curva con el mouse */
  modoEditor: false,

  /* ------------------------------------------------------------------------
     1. RECORRIDO DE LA LÍNEA (Coordenadas X e Y de 0 a 100)
     ------------------------------------------------------------------------ */

  /* Suavidad y redondez de las inflexiones (0.44 a 0.46 = onda de respiración de seda) */
  tensionCurva: 0.45,

  /* Recorrido en Inicio · manifiesto-titulo (4 bloques: Izq → Der → Izq → Centro → Botón):
     Onda continua que abraza cada estrofa por su espacio abierto sin cruzar palabras */
  puntosManifiesto: [
    { x: 50, y: 0 },
    { x: 70, y: 13 },
    { x: 30, y: 34 },
    { x: 70, y: 55 },
    { x: 22, y: 78 },
    { x: 50, y: 100 }
  ],

  puntosManifiestoTablet: [
    { x: 50, y: 0 },
    { x: 79, y: 12 },
    { x: 21, y: 33 },
    { x: 79, y: 54 },
    { x: 11, y: 81 },
    { x: 50, y: 100 }
  ],

  puntosManifiestoMobile: [
    { x: 50, y: 0 },
    { x: 94, y: 12 },
    { x: 6, y: 33 },
    { x: 94, y: 54 },
    { x: 4, y: 81 },
    { x: 50, y: 100 }
  ],

  /* Recorrido en Astau · conceptos-titulo (3 bloques: Izq → Der → Centro → Portal):
     Respiración pausada que enmarca cada párrafo y desemboca vertical en el círculo */
  puntosConceptos: [
    { x: 50, y: 0 },
    { x: 70, y: 18 },
    { x: 30, y: 47 },
    { x: 79, y: 76 },
    { x: 50, y: 100 }
  ],

  puntosConceptosTablet: [
    { x: 50, y: 0 },
    { x: 82, y: 17 },
    { x: 18, y: 46 },
    { x: 88, y: 79 },
    { x: 50, y: 100 }
  ],

  puntosConceptosMobile: [
    { x: 50, y: 0 },
    { x: 94, y: 18 },
    { x: 6, y: 48 },
    { x: 95, y: 80 },
    { x: 50, y: 100 }
  ],

  /* Respaldo general si se agrega otra sección en el futuro */
  puntos: [
    { x: 50, y: 0 },
    { x: 68, y: 21 },
    { x: 32, y: 52 },
    { x: 76, y: 81 },
    { x: 50, y: 100 }
  ],

  puntosTablet: [
    { x: 50, y: 0 },
    { x: 79, y: 21 },
    { x: 21, y: 53 },
    { x: 85, y: 81 },
    { x: 50, y: 100 }
  ],

  puntosMobile: [
    { x: 50, y: 0 },
    { x: 91, y: 21 },
    { x: 9, y: 54 },
    { x: 92, y: 82 },
    { x: 50, y: 100 }
  ],

  /* Opcional: trazado SVG fijo manual */
  svgPathManual: "",

  /* ------------------------------------------------------------------------
     2. TAMAÑOS, GROSORES Y ESTÉTICA DELICADA DE LA LÍNEA
     ------------------------------------------------------------------------ */
  estilo: {
    /* Filamento principal: trazo fino, orgánico y sutil */
    colorLinea: "#5b2e44",       // Color ciruela ASTAU
    grosorLinea: 1.3,            // Trazo fino y sedoso
    opacidadLinea: 0.74,         // Presencia serena sin dureza

    /* Estela difuminada detrás de la línea: halo muy tenue */
    mostrarEstela: true,
    colorEstela: "#5b2e44",
    grosorEstela: 13,            // Halo etéreo y limpio
    opacidadEstela: 0.04,

    /* Surco guía (el hilo aún no recorrido): invisible para que la línea se dibuje pura en el aire */
    mostrarSurcoGuia: false,
    colorGuia: "#c0b8b1",
    grosorGuia: 0.8,
    trazoGuia: "",
    opacidadGuia: 0,

    /* Orbe luminoso que viaja en la punta de la línea */
    mostrarOrbe: true,
    radioOrbe: 3.1,
    radioHaloOrbe: 9.5,
    opacidadHaloOrbe: 0.14,
    colorCentroOrbe: "#eeeae4"
  },

  /* ------------------------------------------------------------------------
     3. DINÁMICA DE SCROLL Y FLUIDEZ DE MOVIMIENTO
     ------------------------------------------------------------------------ */
  scroll: {
    /* Multiplicador general de avance de la línea (1.0 = natural, 1.15 = un poco más ágil) */
    velocidad: 1.1,

    /* Horizonte de lectura en pantalla (0 = borde superior, 1 = borde inferior):
       Arranca en 0.60 al entrar a la sección y avanza hasta 0.86 al final. */
    alturaEnPantalla: 0.60,
    alturaEnPantallaFinal: 0.86,

    /* Fluidez/inercia de la línea y las palabras (0.10 = más flotante/lento, 0.30 = más directo) */
    suavizado: 0.22,
    suavizadoEnPaso: 0.48,
    compensarCurvasHorizontales: true,

    /* Scroll guiado paso a paso en Desktop (en mobile queda 100% libre):
       - Poné `activo: false` si preferís scroll 100% libre también en desktop.
       - `duracionMs`: suavidad del deslizamiento (480–560 = muy fluido y sedoso; 700 = más lento).
       - `pausaEntrePasosMs`: espera mínima en ms para aceptar el siguiente gesto (180 = súper ágil). */
    scrollPorPasos: {
      activo: true,
      activoEnMobile: false,     // false = scroll libre en celulares / pantallas táctiles
      duracionMs: 620,           // Tiempo de deslizamiento suave con inercia continua (ms)
      pausaEntrePasosMs: 180,    // Qué tan rápido te deja hacer el siguiente scroll (ms)
      zonaCapturaVh: 0.34,       // Distancia a la que empieza a asistir al entrar a la sección
      posicionEnPantalla: 0.46,  // Altura donde se centra cada estrofa (0.46 = centro óptico)
      imanSuaveTouch: false
    }
  },

  textos: {
    /* Sin caja de fondo: el texto flota limpio sobre la sección */
    opacidadFondoTexto: 0,
    blurFondoTexto: 0,

    /* Sincronización con la posición real en pantalla de cada bloque */
    usarPosicionReal: true,
    adelantoInicioVh: 0.24,
    adelantoFinVh: 0.05,

    /* Contraste y color de palabras antes y después de encenderse */
    opacidadApagada: 0.32,
    blurApagada: 0,
    colorApagada: "#8a837b",
    colorEncendida: "#383838",
    colorMundoManifiesto: "#5e5852",
    colorAcento: "#5b2e44",

    /* Rangos de respaldo para 3 bloques (astau/index.html) */
    rangos: [
      [0.03, 0.34],
      [0.32, 0.66],
      [0.64, 0.93]
    ],

    /* Rangos de respaldo para 4 bloques (index.html) */
    rangosManifiesto: [
      [0.02, 0.25],
      [0.23, 0.49],
      [0.47, 0.72],
      [0.70, 0.94]
    ]
  },

  /* ------------------------------------------------------------------------
     4. TRANSICIONES DE ENTRADA Y SALIDA (Portales)
     ------------------------------------------------------------------------ */
  transiciones: {
    mostrarCurvaSuperior: false,
    mostrarCurvaInferior: false,
    intensidadCurvaScroll: 1,

    mostrarPortalInicio: true,
    rotacionIsotipoGrados: 30,

    mostrarPortalFin: true,
    umbralFloracionFinal: 0.955
  }
};

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

    /* Surco guía (el hilo aún no recorrido): continuo y apenas visible */
    mostrarSurcoGuia: true,
    colorGuia: "#c0b8b1",        // Color línea cálida ASTAU
    grosorGuia: 0.8,             // Hilo finísimo
    trazoGuia: "",               // Continuo (sin guiones duros)
    opacidadGuia: 0.36,          // Susurro visual sobre la superficie

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
    velocidad: 1.1,
    /* Horizonte progresivo: arranca sereno (0.60) al iniciar la sección y avanza
       suavemente (hasta 0.86) hacia el final para que, al detenerse en la última
       estrofa, la línea complete su recorrido hasta el botón o portal de cierre. */
    alturaEnPantalla: 0.60,
    alturaEnPantallaFinal: 0.86,

    /* Inercia sedosa en scroll libre y respuesta directa en scroll guiado */
    suavizado: 0.18,
    suavizadoEnPaso: 0.36,
    compensarCurvasHorizontales: true,

    /* Scroll guiado paso a paso entre cada estrofa */
    scrollPorPasos: {
      activo: true,
      duracionMs: 800,          // Deslizamiento de seda entre una estrofa y la siguiente
      pausaEntrePasosMs: 200,   // Pausa serena al posarse en cada estrofa
      posicionEnPantalla: 0.46, // Centro óptico descontando el header fijo superior
      imanSuaveTouch: true      // En pantallas táctiles acomoda suavemente al soltar
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

/* ==========================================================================
   ASTAU · Configuración de la "Línea Viva" (Sūtra Scroll Line)
   Archivo: assets/js/linea-sutra.config.js
   Dónde actúa:
   - index.html (sección aria-labelledby="manifiesto-titulo", 4 pasos)
   - astau/index.html (sección aria-labelledby="conceptos-titulo", 3 pasos)
   ==========================================================================

   GUÍA RÁPIDA DE EDICIÓN:
   -----------------------
   1. CAMINO DE LA LÍNEA (puntos / puntosManifiesto / puntosConceptos):
      Cada punto tiene coordenadas { x, y } en porcentaje de 0 a 100:
      - x: 0 = borde izquierdo de la sección | 50 = centro | 100 = borde derecho
      - y: 0 = portal superior (inicio)      | 100 = portal inferior (cierre)
      El sistema une todos los puntos con una curva sinusoidal orgánica (monótona
      en Y, con entrada y salida verticales en ambos portales y giros suaves).

   2. EDITOR VISUAL EN VIVO:
      Cambiá `modoEditor: true` abajo (o abrí la página agregando `?editar-linea`
      al final de la URL) para arrastrar los nodos en vivo.
   ========================================================================== */

window.ASTAU_LINEA_CONFIG = {
  /* Activar en `true` para ver y arrastrar los nodos de la curva con el mouse */
  modoEditor: false,
  // modoEditor: true,

  /* ------------------------------------------------------------------------
     1. RECORRIDO DE LA LÍNEA (Coordenadas X e Y de 0 a 100)
     ------------------------------------------------------------------------ */

  /* Suavidad y redondez de las inflexiones (0.42 a 0.48 = onda de respiración fluida) */
  tensionCurva: 0.45,

  /* Recorrido en Inicio · manifiesto-titulo (4 bloques: Izq → Der → Izq → Centro):
     Onda serena y simétrica que abraza cada bloque por su espacio de aire */
  puntosManifiesto: [
    { x: 50, y: 2 },
    { x: 65, y: 18 },
    { x: 35, y: 43 },
    { x: 64, y: 68 },
    { x: 50, y: 96 }
  ],

  puntosManifiestoMobile: [
    { x: 50, y: 0 },
    { x: 62, y: 19 },
    { x: 38, y: 45 },
    { x: 62, y: 71 },
    { x: 50, y: 96 }
  ],

  /* Recorrido en Astau · conceptos-titulo (3 bloques: Izq → Der → Centro):
     Respiración pausada en dos ondas suaves antes de volver al eje central */
  puntosConceptos: [
    { x: 50, y: 3 },
    { x: 65, y: 24 },
    { x: 35, y: 58 },
    { x: 50, y: 95 }
  ],

  puntosConceptosMobile: [
    { x: 50, y: 0 },
    { x: 62, y: 26 },
    { x: 38, y: 60 },
    { x: 50, y: 96 }
  ],

  /* Respaldo general si se agrega otra sección en el futuro */
  puntos: [
    { x: 50, y: 0 },
    { x: 65, y: 24 },
    { x: 35, y: 58 },
    { x: 50, y: 100 }
  ],

  puntosMobile: [
    { x: 50, y: 0 },
    { x: 62, y: 26 },
    { x: 38, y: 60 },
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
    grosorLinea: 1.35,           // Trazo fino y delicado (antes 2.4)
    opacidadLinea: 0.72,         // Presencia serena sin dureza

    /* Estela difuminada detrás de la línea: halo muy tenue */
    mostrarEstela: true,
    colorEstela: "#5b2e44",
    grosorEstela: 14,            // Halo contenido y etéreo (antes 28)
    opacidadEstela: 0.04,        // Muy sutil

    /* Surco guía (el hilo aún no recorrido): continuo y apenas visible */
    mostrarSurcoGuia: true,
    colorGuia: "#c0b8b1",        // Color línea cálida ASTAU
    grosorGuia: 0.85,            // Hilo finísimo
    trazoGuia: "",               // Continuo (sin guiones duros)
    opacidadGuia: 0.38,          // Susurro visual sobre el papel

    /* Orbe luminoso que viaja en la punta de la línea */
    mostrarOrbe: true,
    radioOrbe: 3.2,              // Punto delicado (antes 4.5)
    radioHaloOrbe: 10,           // Aura suave (antes 14)
    opacidadHaloOrbe: 0.14,
    colorCentroOrbe: "#eeeae4"   // Núcleo claro
  },

  /* ------------------------------------------------------------------------
     3. DINÁMICA DE SCROLL Y FLUIDEZ DE MOVIMIENTO
     ------------------------------------------------------------------------ */
  scroll: {
    velocidad: 1.0,
    alturaEnPantalla: 0.56,
    /* Inercia más sedosa (0.12 = acompañamiento orgánico y fluido con el scroll) */
    suavizado: 0.12,
    compensarCurvasHorizontales: true
  },

  textos: {
    /* Tarjetas más etéreas integradas con el fondo */
    opacidadFondoTexto: 0.66,
    blurFondoTexto: 10,

    /* Palabras antes y después de iluminarse */
    opacidadApagada: 0.26,
    blurApagada: 0.4,
    colorApagada: "#7d776f",
    colorEncendida: "#383838",
    colorAcento: "#5b2e44",

    /* Rangos de iluminación para 3 bloques (astau/index.html) */
    rangos: [
      [0.03, 0.34],
      [0.32, 0.66],
      [0.64, 0.93]
    ],

    /* Rangos de iluminación para 4 bloques (index.html) */
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
    umbralFloracionFinal: 0.9
  }
};

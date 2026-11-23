/* ==========================================================================
   ASTAU · Configuración de la "Línea Viva" (Sūtra Scroll Line)
   Archivo: assets/js/linea-sutra.config.js
   Dónde actúa: sección aria-labelledby="conceptos-titulo" en astau/index.html
   ==========================================================================

   GUÍA RÁPIDA DE EDICIÓN:
   -----------------------
   1. CAMINO DE LA LÍNEA (puntos):
      Cada punto tiene coordenadas { x, y } en porcentaje de 0 a 100:
      - x: 0 = borde izquierdo de la sección | 50 = centro | 100 = borde derecho
      - y: 0 = borde superior de la sección  | 100 = borde inferior (hacia Guías)
      El sistema une todos los puntos automáticamente con una curva orgánica suave.
      Podés agregar, quitar o mover puntos libremente.

   2. EDITOR VISUAL EN VIVO (Truco para diseñar el recorrido con el mouse):
      Cambiá `modoEditor: true` abajo (o abrí la página agregando `?editar-linea`
      al final de la URL). Verás los nodos numerados sobre la página para
      arrastrarlos con el mouse en vivo y un botón "Copiar puntos" para pegar
      el resultado acá.
   ========================================================================== */

window.ASTAU_LINEA_CONFIG = {
  /* Activar en `true` para ver y arrastrar los nodos de la curva con el mouse */
  modoEditor: false,
//   modoEditor: true,

  /* ------------------------------------------------------------------------
     1. RECORRIDO DE LA LÍNEA (Coordenadas X e Y de 0 a 100)
     ------------------------------------------------------------------------ */

  /* Curvatura / suavidad de los giros:
     - 0   = líneas rectas entre puntos
     - 0.35 = curva orgánica equilibrada (recomendado)
     - 0.5  = curvas muy amplias y redondeadas */
  tensionCurva: 0.36,

  /* Recorrido en Desktop (>= 768px):
     Pensado para abrazar los 3 textos por los espacios de aire sin tapar la lectura */
  puntos: [
    { x: 50, y: 3 },
    { x: 23, y: 10 },
    { x: 25, y: 27 },
    { x: 40, y: 37 },
    { x: 80, y: 44 },
    { x: 78, y: 62 },
    { x: 28, y: 76 },
    { x: 50, y: 95 }
  ],

  /* Recorrido en Mobile (< 768px):
     Ondulación más contenida en los bordes para pantallas verticales */
  puntosMobile: [
    { x: 50, y: 0 },
    { x: 10, y: 18 },
    { x: 90, y: 46 },
    { x: 12, y: 74 },
    { x: 50, y: 98 }
  ],

  /* Opcional: Si preferís pegar un trazado SVG fijo desde Illustrator/Figma
     (en un lienzo de 1000 x 1000), escribilo acá (ej: "M 500 0 C ...").
     Si está vacío (""), se usan los `puntos` de arriba automáticamente. */
  svgPathManual: "",

  /* ------------------------------------------------------------------------
     2. TAMAÑOS, GROSORES Y ESTÉTICA DE LA LÍNEA
     ------------------------------------------------------------------------ */
  estilo: {
    /* Filamento principal (la línea que se va pintando) */
    colorLinea: "#5b2e44",       // Color ciruela ASTAU
    grosorLinea: 2.4,            // Grosor en px (ej: 1.5 fino, 2.5 medio, 4 grueso)
    opacidadLinea: 0.9,          // Opacidad de 0 a 1

    /* Estela / Cinta ancha difuminada detrás de la línea (efecto Lusion) */
    mostrarEstela: true,
    colorEstela: "#5b2e44",
    grosorEstela: 28,            // Ancho del halo en px (ej: 20 a 42)
    opacidadEstela: 0.065,       // Muy sutil (0.04 a 0.12)

    /* Surco guía punteado (el camino aún no recorrido) */
    mostrarSurcoGuia: true,
    colorGuia: "#c0b8b1",        // Color línea suave ASTAU
    grosorGuia: 1,               // Grosor en px
    trazoGuia: "3 7",            // "largo_guion espacio" (poné "" para línea continua)
    opacidadGuia: 0.65,

    /* Orbe / Punto luminoso que viaja en la punta de la línea */
    mostrarOrbe: true,
    radioOrbe: 4.5,              // Tamaño del punto central en px
    radioHaloOrbe: 14,           // Tamaño del aura alrededor del punto en px
    opacidadHaloOrbe: 0.2,
    colorCentroOrbe: "#eeeae4"   // Puntito interior claro
  },

  /* ------------------------------------------------------------------------
     3. DINÁMICA DE SCROLL Y VELOCIDAD DE LA BOLITA (ORBE)
     ------------------------------------------------------------------------ */
  scroll: {
    /* 1. VELOCIDAD GENERAL DE LA BOLITA:
       - 1.0 = baja exactamente a la par del scroll (1:1)
       - 1.25 = baja un 25% más rápido que el scroll
       - 0.8  = baja más lento que el scroll */
    velocidad: 1.0,

    /* 2. ALTURA EN PANTALLA DONDE ACOMPAÑA LA BOLITA (de 0 a 1):
       - 0.50 = la bolita viaja siempre a la mitad exacta de tu pantalla
       - 0.58 = viaja apenas por debajo del centro (muy natural para leer)
       - 0.70 = viaja más abajo en la pantalla */
    alturaEnPantalla: 0.56,

    /* 3. SUAVIZADO / INERCIA (qué tan pegada va al movimiento de la rueda):
       - 0.22 = acompaña bien de cerca al scroll con suavidad (recomendado)
       - 0.08 = flota con mucha demora detrás del scroll
       - 1.0  = rígida instantánea sin suavizado */
    suavizado: 0.22,

    /* 4. COMPENSAR CURVAS ANCHAS:
       En `true`, acelera automáticamente en los tramos horizontales de la S
       para que la bolita nunca se atrase verticalmente respecto de tu scroll. */
    compensarCurvasHorizontales: true
  },

  textos: {
    /* Fondo translúcido detrás de cada bloque de texto (por donde pasa la línea detrás) */
    opacidadFondoTexto: 0.72,    // 0 = sin fondo, 0.72 = velo translúcido suave, 1 = sólido
    blurFondoTexto: 8,           // Desenfoque de la línea al pasar por detrás del texto (px)

    /* Cómo se ven las palabras ANTES de que el scroll las pinte */
    opacidadApagada: 0.24,       // Opacidad inicial de cada palabra (0.15 a 0.4)
    blurApagada: 0.6,            // Desenfoque inicial en px (0 para desactivar)
    colorApagada: "#7d776f",     // Color de palabra aún no leída

    /* Cómo se ven las palabras CUANDO el scroll las ilumina */
    colorEncendida: "#383838",   // Color de texto principal
    colorAcento: "#5b2e44",      // Color para palabras dentro de <em class="sutra-accent">

    /* Rangos de scroll [inicio, fin] (de 0 a 1) en que se pinta cada bloque:
       Podés adelantar o atrasar cuándo empieza/termina de pintarse cada párrafo */
    rangos: [
      [0.02, 0.34], // Bloque 01 (ASTAU nace con el propósito...)
      [0.32, 0.66], // Bloque 02 (Un espacio íntimo para encontrar tu ritmo...)
      [0.64, 0.94]  // Bloque 03 (Nuestro equipo guía y acompaña...)
    ]
  },

  /* ------------------------------------------------------------------------
     4. TRANSICIONES DE ENTRADA Y SALIDA (Portales y Arcos Orgánicos)
     ------------------------------------------------------------------------ */
  transiciones: {
    /* Arcos curvos superior e inferior que funden la sección con el Hero y con Guías
       y se arquean dinámicamente al hacer scroll (efecto respiración) */
    mostrarCurvaSuperior: true,
    mostrarCurvaInferior: true,
    intensidadCurvaScroll: 1,    // 1 = curvatura normal con el scroll, 0 = arco fijo

    /* Portal de Origen (Arriba: medallón con isotipo de donde nace el hilo) */
    mostrarPortalInicio: true,
    rotacionIsotipoGrados: 45,   // Cuántos grados gira suavemente el isotipo al scrollear

    /* Portal de Desembocadura (Abajo: nodo que florece con ondas cuando el orbe
       llega al 92%-100% del recorrido y tiende el puente hacia "Guías") */
    mostrarPortalFin: true,
    umbralFloracionFinal: 0.9    // En qué % del recorrido (0 a 1) se enciende el portal final
  }
};

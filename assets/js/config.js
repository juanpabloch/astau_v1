/* ==========================================================================
   ASTAU · Configuración
   Único archivo a editar para activar la analítica o el video del hero.
   ========================================================================== */

window.ASTAU_CONFIG = {
  /*
   * Analítica. Mientras "provider" esté vacío no se carga ningún script.
   *
   *   provider: "plausible" → siteId = dominio registrado en Plausible
   *                           src (opcional) = URL del script si es autoalojado
   *   provider: "umami"     → siteId = website ID, src = URL del script de Umami
   *   provider: "ga4"       → siteId = ID de medición (G-XXXXXXX).
   *                           GA4 usa cookies: sumar aviso de consentimiento.
   */
  analytics: {
    provider: "",
    siteId: "",
    src: ""
  },

  /*
   * Video de fondo del hero (Inicio). Rutas relativas a la raíz del sitio.
   * Se carga solo en navegadores sin "reducir movimiento" ni ahorro de datos;
   * en esos casos, y sin JavaScript, se ve la imagen assets/img/hero-astau.jpg.
   *
   * sound: true muestra el botón "Escuchar respiración". Activarlo solo si el
   * video definitivo tiene ese audio.
   */
  heroVideo: {
    webm: "assets/video/hero-astau_v3.webm",
    mp4: "assets/video/hero-astau_v3.mp4",
    sound: false
  }
};

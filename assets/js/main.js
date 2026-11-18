/* ==========================================================================
   ASTAU · Comportamiento
   Todo el contenido está en el HTML; este archivo solo agrega interacción.
   1. Medición  2. Header  3. Menú mobile  4. Apariciones
   5. Índice de prácticas  6. Horarios  7. Video del hero
   ========================================================================== */

(function () {
  "use strict";

  var config = window.ASTAU_CONFIG || {};
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var desktop = window.matchMedia("(min-width: 64rem)");

  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function $$(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  /* 1. Medición ---------------------------------------------------------- */

  var analytics = config.analytics || {};

  function loadScript(src, attrs) {
    var s = document.createElement("script");
    s.defer = true;
    s.src = src;
    Object.keys(attrs || {}).forEach(function (key) {
      s.setAttribute(key, attrs[key]);
    });
    document.head.appendChild(s);
  }

  function initAnalytics() {
    if (!analytics.provider || !analytics.siteId) return;

    if (analytics.provider === "plausible") {
      window.plausible =
        window.plausible ||
        function () {
          (window.plausible.q = window.plausible.q || []).push(arguments);
        };
      loadScript(analytics.src || "https://plausible.io/js/script.js", {
        "data-domain": analytics.siteId
      });
    } else if (analytics.provider === "umami" && analytics.src) {
      loadScript(analytics.src, { "data-website-id": analytics.siteId });
    } else if (analytics.provider === "ga4") {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
      window.gtag("js", new Date());
      window.gtag("config", analytics.siteId);
      loadScript("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(analytics.siteId));
    }
  }

  function track(name, props) {
    props = props || {};
    try {
      if (analytics.provider === "plausible" && window.plausible) {
        window.plausible(name, { props: props });
      } else if (analytics.provider === "umami" && window.umami) {
        window.umami.track(name, props);
      } else if (analytics.provider === "ga4" && window.gtag) {
        window.gtag("event", name, props);
      }
    } catch (error) {
      /* La medición nunca debe romper la navegación. */
    }
  }

  function initTracking() {
    document.addEventListener("click", function (event) {
      var el = event.target.closest("[data-track]");
      if (!el) return;
      var props = {};
      if (el.dataset.ubicacion) props.ubicacion = el.dataset.ubicacion;
      if (el.dataset.practica) props.practica = el.dataset.practica;
      track(el.dataset.track, props);
    });
  }

  /* 2. Header ------------------------------------------------------------ */

  function initHeader() {
    var header = $(".header");
    if (!header) return;
    var lastY = window.scrollY;
    var ticking = false;

    function update() {
      var y = window.scrollY;
      header.classList.toggle("is-scrolled", y > 8);
      var goingDown = y > lastY && y > 240;
      var focusInside = header.contains(document.activeElement);
      header.classList.toggle("is-hidden", goingDown && !focusInside);
      lastY = y;
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
    update();
  }

  /* 3. Menú mobile ------------------------------------------------------- */

  function initMenu() {
    var menu = $("#menu");
    var openBtn = $(".menu-toggle[data-menu-open]");
    var closeBtn = $(".menu-toggle[data-menu-close]");
    if (!menu || !openBtn || !closeBtn) return;

    function setOpen(open) {
      menu.classList.toggle("is-open", open);
      openBtn.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("menu-open", open);
      if (open) {
        closeBtn.focus();
      } else {
        openBtn.focus();
      }
    }

    openBtn.addEventListener("click", function () {
      setOpen(true);
    });

    closeBtn.addEventListener("click", function () {
      setOpen(false);
    });

    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        menu.classList.remove("is-open");
        openBtn.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      }
    });

    document.addEventListener("keydown", function (event) {
      if (!menu.classList.contains("is-open")) return;
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      var focusable = $$("a[href], button", menu);
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    desktop.addEventListener("change", function (event) {
      if (event.matches && menu.classList.contains("is-open")) setOpen(false);
    });
  }

  /* 4. Apariciones ------------------------------------------------------- */

  function initManifesto() {
    var manifesto = $('[aria-labelledby="manifiesto-titulo"]');
    if (!manifesto || reduceMotion) return;

    var lines = $$(".manifesto__world, .manifesto__practice, .manifesto__statement", manifesto);
    var cta = $(".manifesto__cta", manifesto);
    if (!lines.length) return;

    var delay = 40;      /* Espera inicial antes de la 1ª frase (ms) */
    var step = 900;       /* Tiempo entre el inicio de una frase y la siguiente (ms) */
    var duration = 1800;  /* Duración del recorrido/desenfoque de cada frase (ms) */

    manifesto.style.setProperty("--line-duration", duration + "ms");

    lines.forEach(function (line, index) {
      if (index > 0) {
        delay += step;
      }
      line.style.setProperty("--line-delay", delay + "ms");
    });

    if (cta) {
      cta.style.setProperty("--cta-delay", delay + step + "ms");
    }

    if (!("IntersectionObserver" in window)) {
      manifesto.classList.add("is-visible");
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            window.requestAnimationFrame(function () {
              manifesto.classList.add("is-visible");
            });
            observer.unobserve(manifesto);
          }
        });
      },
      { rootMargin: "0px 0px -22% 0px", threshold: 0.15 }
    );

    observer.observe(manifesto);
  }

  function initReveal() {
    var items = $$(".reveal");
    if (!items.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* 5. Índice de prácticas (Inicio) -------------------------------------- */

  function initIndexPreview() {
    var preview = $(".index__preview");
    if (!preview) return;
    var img = $("img", preview);
    var links = $$(".index__link[data-preview]");
    var timer;

    function show(link) {
      var src = link.dataset.preview;
      if (!src || img.getAttribute("src") === src) return;
      window.clearTimeout(timer);
      preview.classList.add("is-swapping");
      timer = window.setTimeout(
        function () {
          img.setAttribute("src", src);
          img.setAttribute("alt", link.dataset.previewAlt || "");
          preview.classList.remove("is-swapping");
        },
        reduceMotion ? 0 : 180
      );
    }

    links.forEach(function (link) {
      link.addEventListener("mouseenter", function () {
        if (desktop.matches) show(link);
      });
      link.addEventListener("focus", function () {
        if (desktop.matches) show(link);
      });
    });
  }

  /* 6. Horarios y abonos (JSON + interacción) ---------------------------- */

  var DIAS_META = [
    { id: "lunes", label: "Lunes", lower: "lunes" },
    { id: "martes", label: "Martes", lower: "martes" },
    { id: "miercoles", label: "Miércoles", lower: "miércoles" },
    { id: "jueves", label: "Jueves", lower: "jueves" },
    { id: "viernes", label: "Viernes", lower: "viernes" },
    { id: "sabado", label: "Sábado", lower: "sábado" }
  ];

  var BANDAS_META = [
    { id: "manana", label: "Mañana" },
    { id: "tarde", label: "Tarde" },
    { id: "noche", label: "Noche" }
  ];

  var PRACTICAS_NOMBRES = {
    "ashtanga": "Ashtanga",
    "yin-yoga": "Yin Yoga",
    "hatha-yoga": "Hatha Yoga",
    "yoga-terapia": "Yoga Terapia",
    "yoga-embarazo": "Yoga & Embarazo",
    "yoga-maternidad": "Yoga & Maternidad",
    "meditacion": "Meditación"
  };

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function getBandForTime(hora, explicitBand) {
    if (explicitBand) return explicitBand;
    var h = parseInt(String(hora || "0").split(":")[0], 10);
    if (h < 13) return "manana";
    if (h < 18) return "tarde";
    return "noche";
  }

  function renderHorarios(data, ui) {
    if (!data || !data.horarios || !ui) return;
    var whatsapp = data.whatsapp || "5491137042408";
    var horarios = data.horarios;
    var sched = $(".sched", ui);

    if (sched && Array.isArray(horarios.yoga)) {
      sched.replaceChildren();

      BANDAS_META.forEach(function (banda) {
        var p = el("p", "sched__band", banda.label);
        p.setAttribute("data-banda", banda.id);
        p.setAttribute("aria-hidden", "true");
        sched.appendChild(p);
      });

      DIAS_META.forEach(function (diaMeta) {
        var daySection = el("section", "day");
        daySection.setAttribute("data-dia", diaMeta.id);
        daySection.setAttribute("aria-labelledby", "dia-" + diaMeta.id);

        var h4 = el("h4", "day__name", diaMeta.label);
        h4.id = "dia-" + diaMeta.id;
        daySection.appendChild(h4);

        var dayItems = horarios.yoga.filter(function (item) {
          return item.dia === diaMeta.id;
        });

        BANDAS_META.forEach(function (banda) {
          var bandItems = dayItems
            .filter(function (item) {
              return getBandForTime(item.inicio, item.banda) === banda.id;
            })
            .sort(function (a, b) {
              return String(a.inicio).localeCompare(String(b.inicio));
            });

          if (!bandItems.length) {
            var emptyBand = el("div", "band is-empty");
            emptyBand.setAttribute("data-banda", banda.id);
            daySection.appendChild(emptyBand);
            return;
          }

          var bandDiv = el("div", "band");
          bandDiv.setAttribute("data-banda", banda.id);
          bandDiv.appendChild(el("h5", "band__name", banda.label));

          var ul = el("ul");
          bandItems.forEach(function (item) {
            var nombre = item.nombre || PRACTICAS_NOMBRES[item.practica] || item.practica;
            var li = el("li", "slot");
            li.setAttribute("data-practica", item.practica);
            li.setAttribute("data-hora", item.inicio);

            var msg = "Hola, quiero consultar por " + nombre + ", " + diaMeta.lower + " " + item.inicio + ".";
            var a = el("a", "slot__link");
            a.href = "https://wa.me/" + whatsapp + "?text=" + encodeURIComponent(msg);
            a.target = "_blank";
            a.rel = "noopener";
            a.setAttribute("data-track", "clic_whatsapp");
            a.setAttribute("data-ubicacion", "horarios");
            a.setAttribute("data-practica", item.practica);

            var timeSpan = el("span", "slot__time");
            timeSpan.appendChild(el("time", "", item.inicio));
            timeSpan.appendChild(document.createTextNode("–"));
            timeSpan.appendChild(el("time", "", item.fin));
            a.appendChild(timeSpan);

            a.appendChild(el("span", "slot__name", nombre));
            if (item.guia) {
              a.appendChild(el("span", "slot__info", item.guia));
            }
            if (item.nota) {
              a.appendChild(el("span", "slot__note", item.nota));
            }

            var ctaSpan = el("span", "slot__cta", "Consultar");
            ctaSpan.appendChild(el("span", "sr-only", " por WhatsApp, " + diaMeta.lower + " " + item.inicio));
            a.appendChild(ctaSpan);

            li.appendChild(a);
            ul.appendChild(li);
          });

          bandDiv.appendChild(ul);
          daySection.appendChild(bandDiv);
        });

        sched.appendChild(daySection);
      });
    }

    var notesEl = $(".sched__notes", ui);
    if (notesEl && (Array.isArray(horarios.notas) || horarios.actualizado)) {
      notesEl.replaceChildren();
      (horarios.notas || []).forEach(function (nota) {
        notesEl.appendChild(el("p", "", nota));
      });
      if (horarios.actualizado) {
        notesEl.appendChild(el("p", "", "Horarios actualizados: " + horarios.actualizado + "."));
      }
    }

    var med = horarios.meditacion;
    if (med) {
      var medSlots = $(".med__slots", ui);
      if (medSlots && Array.isArray(med.clases)) {
        medSlots.replaceChildren();
        med.clases.forEach(function (item) {
          var li = el("li", "slot");
          li.setAttribute("data-practica", "meditacion");
          li.setAttribute("data-hora", item.inicio);
          li.appendChild(el("span", "med__day", item.dia));

          var timeSpan = el("span", "slot__time");
          timeSpan.appendChild(el("time", "", item.inicio));
          timeSpan.appendChild(document.createTextNode(" a "));
          timeSpan.appendChild(el("time", "", item.fin));
          li.appendChild(timeSpan);

          li.appendChild(el("span", "slot__name", item.nombre || "Meditación"));
          if (item.info) {
            li.appendChild(el("span", "slot__info", item.info));
          }
          medSlots.appendChild(li);
        });
      }

      var medCopy = $(".med__copy", ui);
      if (medCopy && (Array.isArray(med.descripcion) || med.cta)) {
        medCopy.replaceChildren();
        (med.descripcion || []).forEach(function (par) {
          medCopy.appendChild(el("p", "", par));
        });
        if (med.cta && med.cta.texto) {
          var pCta = el("p");
          var aCta = el("a", "link", med.cta.texto);
          var waMsg = med.cta.mensajeWhatsapp || "Hola, quiero saber las fechas de meditación de este mes.";
          aCta.href = "https://wa.me/" + whatsapp + "?text=" + encodeURIComponent(waMsg);
          aCta.target = "_blank";
          aCta.rel = "noopener";
          aCta.setAttribute("data-track", "clic_whatsapp");
          aCta.setAttribute("data-ubicacion", "meditacion");
          aCta.setAttribute("data-practica", "meditacion");
          pCta.appendChild(aCta);
          medCopy.appendChild(pCta);
        }
      }
    }
  }

  function renderAbonos(data) {
    if (!data || !data.abonos) return;
    var abonosSection = $("#abonos");
    if (!abonosSection) return;
    var abonos = data.abonos;

    var pricesCol = $(".prices-col", abonosSection);
    if (pricesCol) {
      pricesCol.replaceChildren();
      if (Array.isArray(abonos.yoga) && abonos.yoga.length) {
        pricesCol.appendChild(el("h3", "label prices__title", "Yoga"));
        var dlYoga = el("dl", "prices");
        abonos.yoga.forEach(function (row) {
          var div = el("div");
          div.appendChild(el("dt", "", row.plan));
          div.appendChild(el("dd", "", row.precio));
          dlYoga.appendChild(div);
        });
        pricesCol.appendChild(dlYoga);
      }

      if (Array.isArray(abonos.meditacion) && abonos.meditacion.length) {
        pricesCol.appendChild(el("h3", "label prices__title", "Meditación"));
        var dlMed = el("dl", "prices");
        abonos.meditacion.forEach(function (row) {
          var div = el("div");
          div.appendChild(el("dt", "", row.plan));
          div.appendChild(el("dd", "", row.precio));
          dlMed.appendChild(div);
        });
        pricesCol.appendChild(dlMed);
      }

      if (abonos.notaMeditacion) {
        pricesCol.appendChild(el("p", "prices__note", abonos.notaMeditacion));
      }
      if (abonos.actualizado) {
        pricesCol.appendChild(el("p", "prices__note", "Precios actualizados: " + abonos.actualizado + "."));
      }
    }

    var termsCol = $(".terms-col", abonosSection);
    if (termsCol && Array.isArray(abonos.condiciones)) {
      termsCol.replaceChildren();
      termsCol.appendChild(el("h3", "label prices__title", "Condiciones"));
      var ulTerms = el("ul", "terms");
      abonos.condiciones.forEach(function (cond) {
        ulTerms.appendChild(el("li", "", cond));
      });
      termsCol.appendChild(ulTerms);
    }
  }

  function setupScheduleUI(ui) {
    if (!ui) return;

    /* Pestañas Yoga / Meditación */
    var tabs = $$('[role="tab"]', ui);
    var panels = $$('[role="tabpanel"]', ui);

    function selectTab(tab, focus) {
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute("aria-selected", selected ? "true" : "false");
        t.setAttribute("tabindex", selected ? "0" : "-1");
      });
      panels.forEach(function (panel) {
        panel.hidden = panel.id !== tab.getAttribute("aria-controls");
      });
      if (focus) tab.focus();
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () {
        selectTab(tab, false);
        track("horarios_pestana", { pestana: tab.textContent.trim() });
      });
      tab.addEventListener("keydown", function (event) {
        var next = null;
        if (event.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
        if (event.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
        if (event.key === "Home") next = tabs[0];
        if (event.key === "End") next = tabs[tabs.length - 1];
        if (next) {
          event.preventDefault();
          selectTab(next, true);
        }
      });
    });

    if (tabs.length) selectTab(tabs[0], false);

    /* Selector de día (mobile) */
    var sched = $(".sched", ui);
    var days = $$(".day", sched);
    var dayButtons = $$(".days__btn", ui);
    var order = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];

    function selectDay(name) {
      days.forEach(function (day) {
        day.classList.toggle("is-active", day.dataset.dia === name);
      });
      dayButtons.forEach(function (btn) {
        btn.setAttribute("aria-pressed", btn.dataset.dia === name ? "true" : "false");
      });
    }

    dayButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        selectDay(btn.dataset.dia);
        track("horarios_dia", { dia: btn.dataset.dia });
      });
    });

    var today = order[new Date().getDay()];
    var hasToday = days.some(function (day) {
      return day.dataset.dia === today;
    });
    days.forEach(function (day) {
      day.classList.toggle("is-today", day.dataset.dia === today);
    });
    selectDay(hasToday ? today : "lunes");

    /* Filtro por práctica */
    var chips = $$(".chip", ui);
    var slots = $$(".slot", sched);

    function applyFilter(practice) {
      var active = practice && practice !== "todas";
      chips.forEach(function (chip) {
        chip.setAttribute("aria-pressed", chip.dataset.filter === (active ? practice : "todas") ? "true" : "false");
      });
      slots.forEach(function (slot) {
        slot.classList.toggle("is-dim", active && slot.dataset.practica !== practice);
      });
      days.forEach(function (day) {
        var match = $$(".slot", day).some(function (slot) {
          return slot.dataset.practica === practice;
        });
        day.classList.toggle("has-match", active && match);
      });
      $$(".band", sched).forEach(function (band) {
        var match = $$(".slot", band).some(function (slot) {
          return slot.dataset.practica === practice;
        });
        band.classList.toggle("has-match", active && match);
      });
      sched.classList.toggle("is-filtered", !!active);
      ui.classList.toggle("is-filtered", !!active);
    }

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        applyFilter(chip.dataset.filter);
        track("horarios_filtro", { practica: chip.dataset.filter });
      });
    });

    function valid(practice) {
      return chips.some(function (chip) {
        return chip.dataset.filter === practice;
      });
    }

    /* Enlaces "Ver horarios de …" dentro de la página */
    $$("[data-goto-filter]").forEach(function (link) {
      link.addEventListener("click", function () {
        var practice = link.dataset.gotoFilter;
        if (practice === "meditacion") {
          if (tabs[1]) selectTab(tabs[1], false);
          return;
        }
        if (tabs[0]) selectTab(tabs[0], false);
        if (valid(practice)) applyFilter(practice);
      });
    });

    /* Llegada con /clases/?practica=yin-yoga#horarios */
    var param = new URLSearchParams(window.location.search).get("practica");
    if (param === "meditacion" && tabs[1]) {
      selectTab(tabs[1], false);
    } else if (param && valid(param)) {
      applyFilter(param);
    }
  }

  function initSchedule() {
    var ui = $(".sched-ui");
    var srcRoot = $("[data-clases-src]");
    var src = srcRoot ? srcRoot.getAttribute("data-clases-src") : "";

    if (!src || !("fetch" in window)) {
      setupScheduleUI(ui);
      return;
    }

    window
      .fetch(src)
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(function (data) {
        renderHorarios(data, ui);
        renderAbonos(data);
        setupScheduleUI(ui);
      })
      .catch(function () {
        /* Si falla la carga (ej. protocolo file://), usa el HTML de respaldo */
        setupScheduleUI(ui);
      });
  }

  /* 7. Video del hero ---------------------------------------------------- */

  function initHeroVideo() {
    var media = $("[data-hero-video]");
    var controls = $("[data-hero-controls]");
    var settings = config.heroVideo || {};
    if (!media || !(settings.mp4 || settings.webm)) return;
    var saveData = navigator.connection && navigator.connection.saveData;
    if (reduceMotion || saveData) return;

    var poster = $("img", media);
    var prefix = media.getAttribute("data-hero-video") || "";
    var video = document.createElement("video");
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("muted", "");
    video.setAttribute("preload", "auto");
    video.setAttribute("aria-hidden", "true");
    if (poster) video.poster = poster.currentSrc || poster.src;

    [["webm", "video/webm"], ["mp4", "video/mp4"]].forEach(function (pair) {
      if (!settings[pair[0]]) return;
      var source = document.createElement("source");
      source.src = prefix + settings[pair[0]];
      source.type = pair[1];
      video.appendChild(source);
    });

    function button(label, onClick) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "hero__ctrl";
      b.textContent = label;
      b.addEventListener("click", onClick);
      return b;
    }

    var heroSection = media.closest(".hero") || media;
    var ready = false;
    video.addEventListener("playing", function () {
      if (ready) return;
      ready = true;
      if (poster) poster.hidden = true;

      /* Pausar/reproducir haciendo click en el fondo del hero */
      heroSection.addEventListener("click", function (event) {
        if (event.target.closest("a, button")) return;
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      });

      if (!controls) return;

      /* Pausa: botón comentado (se controla haciendo click en el fondo del hero)
      var pause = button("Pausar video", function () {
        if (video.paused) {
          video.play();
          pause.textContent = "Pausar video";
          pause.setAttribute("aria-pressed", "false");
        } else {
          video.pause();
          pause.textContent = "Reproducir video";
          pause.setAttribute("aria-pressed", "true");
        }
      });
      pause.setAttribute("aria-pressed", "false");
      controls.appendChild(pause);
      */

      if (settings.sound) {
        var sound = button("Escuchar respiración", function () {
          video.muted = !video.muted;
          sound.textContent = video.muted ? "Escuchar respiración" : "Silenciar";
          sound.setAttribute("aria-pressed", video.muted ? "false" : "true");
          if (!video.muted) {
            if (video.paused) video.play();
            track("sonido_hero", {});
          }
        });
        sound.setAttribute("aria-pressed", "false");
        controls.appendChild(sound);
      }
    });

    video.addEventListener("error", function () {
      if (poster) poster.hidden = false;
    }, true);

    media.insertBefore(video, media.firstChild);
    var attempt = video.play();
    if (attempt && attempt.catch) attempt.catch(function () {});
  }

  /* Inicio --------------------------------------------------------------- */

  initAnalytics();
  initTracking();
  initHeader();
  initMenu();
  initManifesto();
  initReveal();
  initIndexPreview();
  initSchedule();
  initHeroVideo();
})();

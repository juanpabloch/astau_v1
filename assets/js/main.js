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

  /* 0. Layout compartido (Header, Menú y Footer) ------------------------- */

  function initSharedLayout() {
    var body = document.body;
    if (!body || !body.dataset.root) return;

    var root = body.dataset.root === "." ? "" : body.dataset.root.replace(/\/$/, "") + "/";
    var homeHref = root || "./";
    var page = body.dataset.page || "";
    var waHref =
      "https://wa.me/5491137042408?text=Hola%2C%20quiero%20agendar%20una%20pr%C3%A1ctica%20en%20ASTAU.";

    var navItems = [
      { id: "inicio", label: "Inicio", href: homeHref },
      { id: "clases", label: "Clases", href: root + "clases/" },
      { id: "astau", label: "Astau", href: root + "astau/" },
      { id: "contacto", label: "Contacto", href: "#contacto" }
    ];

    var header = $(".header");
    if (header) {
      var navListHtml = navItems
        .map(function (item) {
          var current = item.id === page ? ' aria-current="page"' : "";
          return '<li><a class="nav__link" href="' + item.href + '"' + current + ">" + item.label + "</a></li>";
        })
        .join("");

      header.innerHTML =
        '<div class="wrap header__inner">' +
        '<a class="header__logo" href="' + homeHref + '" aria-label="ASTAU, ir al inicio">' +
        '<img class="header__logo-color" src="' + root + 'assets/brand/logo-color.svg" alt="ASTAU" width="93" height="124">' +
        '<img class="header__logo-light" src="' + root + 'assets/brand/logo-negativo.svg" alt="" width="93" height="124">' +
        "</a>" +
        '<nav class="nav" aria-label="Principal">' +
        '<ul class="nav__list">' + navListHtml + "</ul>" +
        "</nav>" +
        '<div class="header__cta">' +
        '<a class="btn btn--small" href="' + waHref + '" target="_blank" rel="noopener" data-track="clic_whatsapp" data-ubicacion="header">Agendá tu práctica</a>' +
        "</div>" +
        '<button class="menu-toggle" type="button" data-menu-open aria-expanded="false" aria-controls="menu">Menú</button>' +
        "</div>";
    }

    var menu = $("#menu");
    if (menu) {
      var menuListHtml = navItems
        .map(function (item) {
          var current = item.id === page ? ' aria-current="page"' : "";
          return '<li><a class="menu__link" href="' + item.href + '"' + current + ">" + item.label + "</a></li>";
        })
        .join("");

      menu.innerHTML =
        '<div class="menu__top">' +
        '<a class="header__logo" href="' + homeHref + '" aria-label="ASTAU, ir al inicio">' +
        '<img src="' + root + 'assets/brand/logo-color.svg" alt="ASTAU" width="93" height="124">' +
        "</a>" +
        '<button class="menu-toggle" type="button" data-menu-close>Cerrar</button>' +
        "</div>" +
        '<ul class="menu__list">' + menuListHtml + "</ul>" +
        '<div class="menu__foot">' +
        '<a class="btn" href="' + waHref + '" target="_blank" rel="noopener" data-track="clic_whatsapp" data-ubicacion="menu">Agendá tu práctica</a>' +
        "<p>Austria 2272, 1° A, Recoleta, CABA</p>" +
        "</div>";
    }

    var footer = $("#contacto.footer");
    if (footer) {
      footer.innerHTML =
        '<div class="wrap">' +
        '<div class="grid footer__grid">' +
        '<div class="footer__logo">' +
        '<img src="' + root + 'assets/brand/logo-color.svg" alt="ASTAU" width="120" height="160" loading="lazy">' +
        "</div>" +
        '<div class="footer__col">' +
        '<h2 class="label">Sala</h2>' +
        "<p>Nuestra sala está equipada con elementos de la más alta calidad para acompañar tu práctica.</p>" +
        "</div>" +
        '<div class="footer__col">' +
        '<h2 class="label">Ubicación</h2>' +
        '<p class="footer__item">' +
        '<svg class="footer__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10Z"/>' +
        '<circle cx="12" cy="11" r="2.2"/>' +
        "</svg>" +
        "<span>Austria 2272, 1° A<br>Recoleta, CABA</span>" +
        "</p>" +
        '<p><a href="https://maps.app.goo.gl/wTtZTwhwu7xZctVu7" target="_blank" rel="noopener" data-track="clic_maps">Ver mapa</a></p>' +
        "</div>" +
        '<div class="footer__col">' +
        '<h2 class="label">Contacto</h2>' +
        '<p><a href="' + waHref + '" target="_blank" rel="noopener" data-track="clic_whatsapp" data-ubicacion="footer">' +
        '<svg class="footer__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>' +
        '<path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>' +
        "</svg>" +
        "<span>WhatsApp +54 9 11 3704 2408</span>" +
        "</a></p>" +
        '<p><a href="https://www.instagram.com/astau.yogastudio/" target="_blank" rel="noopener" data-track="clic_instagram">' +
        '<svg class="footer__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<rect x="3" y="3" width="18" height="18" rx="5"/>' +
        '<circle cx="12" cy="12" r="4"/>' +
        '<circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>' +
        "</svg>" +
        "<span>@astau.yogastudio</span>" +
        "</a></p>" +
        '<p><a href="mailto:astauyogastudio@gmail.com" data-track="clic_mail">' +
        '<svg class="footer__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<rect x="3" y="5" width="18" height="14" rx="2"/>' +
        '<path d="m3 7 9 6 9-6"/>' +
        "</svg>" +
        "<span>astauyogastudio@gmail.com</span>" +
        "</a></p>" +
        "</div>" +
        "</div>" +
        '<div class="site-footer__bottom">' +
        "<p>© 2026 ASTAU Yoga Studio · Recoleta, Buenos Aires.</p>" +
        '<p class="site-footer__mantra">Menos escuela, más experiencia · Menos doctrina, más exploración · Menos autoridad, más guía.</p>' +
        "</div>" +
        "</div>";
    }
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
    if ($(".page-head__media img, .page-head__media video")) {
      header.classList.add("header--over");
    }
    var ticking = false;

    function update() {
      var y = window.scrollY;
      header.classList.toggle("is-scrolled", y > 8);
      header.classList.remove("is-hidden");
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

    /* Grilla semanal y barra de progreso horizontal (mobile) */
    var sched = $(".sched", ui);
    var days = $$(".day", sched);
    var scrollBar = $(".sched__scrollbar", ui);
    var scrollThumb = $(".sched__scrollbar-thumb", ui);
    var order = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];

    var today = order[new Date().getDay()];
    days.forEach(function (day) {
      day.classList.toggle("is-today", day.dataset.dia === today);
    });

    function updateScrollIndicator() {
      if (!sched || !scrollBar || !scrollThumb) return;
      var maxScroll = sched.scrollWidth - sched.clientWidth;
      if (maxScroll <= 2) {
        scrollBar.hidden = true;
        return;
      }
      scrollBar.hidden = false;
      var ratio = sched.clientWidth / sched.scrollWidth;
      var thumbPct = Math.max(ratio * 100, 18);
      var progress = Math.min(Math.max(sched.scrollLeft / maxScroll, 0), 1);
      scrollThumb.style.width = thumbPct + "%";
      scrollThumb.style.insetInlineStart = progress * (100 - thumbPct) + "%";
    }

    if (sched) {
      sched.addEventListener("scroll", updateScrollIndicator, { passive: true });
      window.addEventListener("resize", updateScrollIndicator, { passive: true });
      updateScrollIndicator();
    }

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

      if (sched && !desktop.matches) {
        if (active) {
          var firstMatchDay = $(".day.has-match .day__name", sched);
          if (firstMatchDay) {
            var targetLeft = Math.max(firstMatchDay.offsetLeft, 0);
            sched.scrollTo({ left: targetLeft, behavior: reduceMotion ? "auto" : "smooth" });
          }
        } else {
          sched.scrollTo({ left: 0, behavior: reduceMotion ? "auto" : "smooth" });
        }
      }
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
    var saveData = navigator.connection && navigator.connection.saveData;
    var pageHeadVideo = $(".page-head__media video");
    if (pageHeadVideo) {
      if (reduceMotion || saveData) {
        pageHeadVideo.removeAttribute("autoplay");
        pageHeadVideo.pause();
      } else {
        var pageHead = pageHeadVideo.closest(".page-head");
        if (pageHead) {
          pageHead.addEventListener("click", function (event) {
            if (event.target.closest("a, button")) return;
            if (pageHeadVideo.paused) {
              pageHeadVideo.play();
            } else {
              pageHeadVideo.pause();
            }
          });
        }
      }
    }

    var media = $("[data-hero-video]");
    var controls = $("[data-hero-controls]");
    var settings = config.heroVideo || {};
    if (!media || !(settings.mp4 || settings.webm)) return;
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

  function initFaq() {
    var items = $$(".faq details");
    if (!items.length || reduceMotion || !("animate" in HTMLElement.prototype)) return;

    items.forEach(function (details) {
      var summary = $("summary", details);
      var answer = $(".faq__answer", details);
      if (!summary || !answer) return;

      var heightAnim = null;
      var fadeAnim = null;

      function cleanup() {
        details.style.height = "";
        details.style.overflow = "";
        details.classList.remove("is-closing");
        heightAnim = null;
        fadeAnim = null;
      }

      summary.addEventListener("click", function (event) {
        event.preventDefault();

        if (heightAnim) heightAnim.cancel();
        if (fadeAnim) fadeAnim.cancel();

        var startHeight = details.offsetHeight;
        details.style.overflow = "clip";

        if (details.open) {
          details.classList.add("is-closing");
          var endHeight = summary.offsetHeight;

          heightAnim = details.animate(
            [{ height: startHeight + "px" }, { height: endHeight + "px" }],
            { duration: 320, easing: "cubic-bezier(0.4, 0, 0.2, 1)" }
          );
          fadeAnim = answer.animate(
            [
              { opacity: 1, transform: "translateY(0)" },
              { opacity: 0, transform: "translateY(-0.25rem)" }
            ],
            { duration: 240, easing: "cubic-bezier(0.4, 0, 0.2, 1)" }
          );

          heightAnim.onfinish = function () {
            details.open = false;
            cleanup();
          };
          heightAnim.oncancel = cleanup;
        } else {
          details.classList.remove("is-closing");
          details.open = true;
          var openHeight = details.offsetHeight;

          heightAnim = details.animate(
            [{ height: startHeight + "px" }, { height: openHeight + "px" }],
            { duration: 340, easing: "cubic-bezier(0.4, 0, 0.2, 1)" }
          );
          fadeAnim = answer.animate(
            [
              { opacity: 0, transform: "translateY(-0.25rem)" },
              { opacity: 1, transform: "translateY(0)" }
            ],
            { duration: 320, easing: "cubic-bezier(0.4, 0, 0.2, 1)" }
          );

          heightAnim.onfinish = cleanup;
          heightAnim.oncancel = cleanup;
        }
      });
    });
  }

  function initGuideModals() {
    var modals = $$("dialog.guide-modal");
    if (!modals.length) return;

    var supportsDisplayTransition;
    function canTransitionDisplay() {
      if (supportsDisplayTransition !== undefined) return supportsDisplayTransition;
      if (!window.CSS || !window.CSS.supports || !window.CSS.supports("transition-behavior", "allow-discrete") || !document.body) {
        return false;
      }
      var probe = document.createElement("div");
      probe.style.cssText = "transition: display 1s allow-discrete !important; display: block;";
      document.body.appendChild(probe);
      window.getComputedStyle(probe).display;
      probe.style.display = "none";
      supportsDisplayTransition = window.getComputedStyle(probe).display === "block";
      probe.remove();
      return supportsDisplayTransition;
    }

    function supportsTopLayerExit() {
      return !!(window.CSS && window.CSS.supports && window.CSS.supports("overlay", "auto") && canTransitionDisplay());
    }

    function closeTopLayer(dialog) {
      if (!dialog || !dialog.open) return;
      if (!supportsTopLayerExit() && !reduceMotion && dialog.getAnimations) {
        dialog.setAttribute("data-closing", "");
        var animations = dialog.getAnimations({ subtree: true });
        if (animations.length > 0) {
          Promise.race([
            Promise.allSettled(
              animations.map(function (a) {
                return a.finished;
              })
            ),
            new Promise(function (resolve) {
              window.setTimeout(resolve, 400);
            })
          ]).then(function () {
            if (!dialog.hasAttribute("data-closing")) return;
            dialog.removeAttribute("data-closing");
            dialog.close();
          });
          return;
        }
        dialog.removeAttribute("data-closing");
      }
      dialog.close();
    }

    function isOutside(event, dialog) {
      var r = dialog.getBoundingClientRect();
      return event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom;
    }

    $$("[data-guide-open]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var modal = document.getElementById(btn.getAttribute("data-guide-open"));
        if (modal && !modal.open && typeof modal.showModal === "function") {
          modal.removeAttribute("data-closing");
          modal.showModal();
        }
      });
    });

    modals.forEach(function (dialog) {
      $$("[data-modal-close]", dialog).forEach(function (closeBtn) {
        closeBtn.addEventListener("click", function () {
          closeTopLayer(dialog);
        });
      });

      dialog.addEventListener("cancel", function (event) {
        event.preventDefault();
        closeTopLayer(dialog);
      });

      if (!("closedBy" in HTMLDialogElement.prototype)) {
        var pressedOutside = false;
        dialog.addEventListener("pointerdown", function (event) {
          pressedOutside = event.target === dialog && isOutside(event, dialog);
        });
        dialog.addEventListener("pointerup", function (event) {
          if (pressedOutside && event.target === dialog && isOutside(event, dialog)) {
            closeTopLayer(dialog);
          }
          pressedOutside = false;
        });
      }
    });

    function openFromHash() {
      var hash = (window.location.hash || "").replace(/^#/, "");
      if (!hash) return;
      var modal = document.getElementById("modal-" + hash);
      if (modal && typeof modal.showModal === "function") {
        modals.forEach(function (other) {
          if (other !== modal && other.open) other.close();
        });
        if (!modal.open) {
          modal.removeAttribute("data-closing");
          modal.showModal();
        }
      }
    }

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
  }

  /* 9. Línea Viva Sūtra + Pintado de palabras (Astau) -------------------- */

  function initSutraLine() {
    var section = $("[data-sutra-section]");
    if (!section) return;

    var cfg = window.ASTAU_LINEA_CONFIG || {};
    var estilo = cfg.estilo || {};
    var scrollCfg = cfg.scroll || {};
    var textosCfg = cfg.textos || {};
    var transCfg = cfg.transiciones || {};

    var canvasWrap = $("[data-sutra-canvas]", section) || section;
    var svg = $("[data-sutra-svg]", section);
    var pathGuide = $("[data-sutra-guide]", section);
    var pathTrail = $("[data-sutra-trail]", section);
    var pathMain = $("[data-sutra-main]", section);
    var orbGroup = $("[data-sutra-orb]", section);
    var orbHalo = $("[data-sutra-orb-halo]", section);
    var orbDot = $("[data-sutra-orb-dot]", section);
    var orbCore = $("[data-sutra-orb-core]", section);

    var waveTopPath = $("[data-sutra-wave-top]", section);
    var waveBottomPath = $("[data-sutra-wave-bottom]", section);
    var portalStart = $("[data-sutra-portal-start]", section);
    var portalEnd = $("[data-sutra-portal-end]", section);
    var portalMark = portalStart ? $(".sutra-portal__mark", portalStart) : null;
    var portalRing = portalStart ? $(".sutra-portal__ring", portalStart) : null;

    if (waveTopPath && transCfg.mostrarCurvaSuperior === false) {
      waveTopPath.closest(".sutra-wave").style.display = "none";
    }
    if (waveBottomPath && transCfg.mostrarCurvaInferior === false) {
      waveBottomPath.closest(".sutra-wave").style.display = "none";
    }
    if (portalStart && transCfg.mostrarPortalInicio === false) {
      portalStart.style.display = "none";
    }
    if (portalEnd && transCfg.mostrarPortalFin === false) {
      portalEnd.style.display = "none";
    }

    if (!svg || !pathMain) return;

    /* 1. Aplicar estilos desde la configuración */
    var colorLinea = estilo.colorLinea || "#5b2e44";
    var grosorLinea = estilo.grosorLinea != null ? estilo.grosorLinea : 2.4;
    var opacidadLinea = estilo.opacidadLinea != null ? estilo.opacidadLinea : 0.9;

    pathMain.setAttribute("stroke", colorLinea);
    pathMain.setAttribute("stroke-width", String(grosorLinea));
    pathMain.setAttribute("stroke-linecap", "round");
    pathMain.setAttribute("stroke-opacity", String(opacidadLinea));

    if (pathTrail) {
      if (estilo.mostrarEstela === false) {
        pathTrail.style.display = "none";
      } else {
        pathTrail.setAttribute("stroke", estilo.colorEstela || colorLinea);
        pathTrail.setAttribute("stroke-width", String(estilo.grosorEstela != null ? estilo.grosorEstela : 28));
        pathTrail.setAttribute("stroke-linecap", "round");
        pathTrail.setAttribute("stroke-opacity", String(estilo.opacidadEstela != null ? estilo.opacidadEstela : 0.065));
      }
    }

    if (pathGuide) {
      if (estilo.mostrarSurcoGuia === false) {
        pathGuide.style.display = "none";
      } else {
        pathGuide.setAttribute("stroke", estilo.colorGuia || "#c0b8b1");
        pathGuide.setAttribute("stroke-width", String(estilo.grosorGuia != null ? estilo.grosorGuia : 1));
        if (estilo.trazoGuia !== "") {
          pathGuide.setAttribute("stroke-dasharray", estilo.trazoGuia || "3 7");
        }
        pathGuide.setAttribute("stroke-opacity", String(estilo.opacidadGuia != null ? estilo.opacidadGuia : 0.65));
      }
    }

    if (orbGroup) {
      if (estilo.mostrarOrbe === false) {
        orbGroup.style.display = "none";
      } else {
        var rOrbe = estilo.radioOrbe != null ? estilo.radioOrbe : 4.5;
        var rHalo = estilo.radioHaloOrbe != null ? estilo.radioHaloOrbe : 14;
        if (orbHalo) {
          orbHalo.setAttribute("r", String(rHalo));
          orbHalo.setAttribute("fill", colorLinea);
          orbHalo.setAttribute("fill-opacity", String(estilo.opacidadHaloOrbe != null ? estilo.opacidadHaloOrbe : 0.2));
        }
        if (orbDot) {
          orbDot.setAttribute("r", String(rOrbe));
          orbDot.setAttribute("fill", colorLinea);
        }
        if (orbCore) {
          orbCore.setAttribute("r", String(Math.max(1.5, rOrbe * 0.42)));
          orbCore.setAttribute("fill", estilo.colorCentroOrbe || "#eeeae4");
        }
      }
    }

    /* 2. Separar palabras de cada bloque preservando <em class="sutra-accent"> */
    var wordBlocks = [];
    var textEls = $$("[data-sutra-text]", section);
    var totalBlocks = textEls.length || 1;
    var isManifiesto =
      section.getAttribute("aria-labelledby") === "manifiesto-titulo" || totalBlocks >= 4;

    var defaultRanges =
      (isManifiesto && textosCfg.rangosManifiesto) ||
      textosCfg.rangos || [
        [0.02, 0.34],
        [0.32, 0.66],
        [0.64, 0.94]
      ];

    textEls.forEach(function (el, blockIdx) {
      var stepCard = el.closest(".sutra-step");
      if (stepCard) {
        if (textosCfg.opacidadFondoTexto != null && textosCfg.opacidadFondoTexto > 0) {
          stepCard.style.backgroundColor = "rgb(238 234 228 / " + textosCfg.opacidadFondoTexto + ")";
        } else {
          stepCard.style.backgroundColor = "transparent";
        }
        if (textosCfg.blurFondoTexto != null && textosCfg.blurFondoTexto > 0) {
          var blurVal = "blur(" + textosCfg.blurFondoTexto + "px)";
          stepCard.style.backdropFilter = blurVal;
          stepCard.style.webkitBackdropFilter = blurVal;
        } else {
          stepCard.style.backdropFilter = "none";
          stepCard.style.webkitBackdropFilter = "none";
        }
      }
      var words = [];
      var nodes = Array.prototype.slice.call(el.childNodes);
      el.innerHTML = "";

      function pushWordsFromText(text, isAccent) {
        var parts = text.replace(/\s+/g, " ").trim().split(" ");
        parts.forEach(function (w) {
          if (!w) return;
          var span = document.createElement("span");
          span.className = "sutra-word" + (isAccent ? " sutra-word--accent" : "");
          span.textContent = w;
          el.appendChild(span);
          el.appendChild(document.createTextNode(" "));
          words.push({ el: span, accent: isAccent, lastState: -1 });
        });
      }

      nodes.forEach(function (node) {
        if (node.nodeType === 3) {
          pushWordsFromText(node.textContent, false);
        } else if (node.nodeType === 1) {
          if (node.tagName === "BR") {
            el.appendChild(document.createElement("br"));
            return;
          }
          var isAccent =
            node.classList.contains("sutra-accent") ||
            node.tagName === "EM" ||
            node.tagName === "STRONG";
          pushWordsFromText(node.textContent, isAccent);
        }
      });

      var blockRange;
      if (totalBlocks === defaultRanges.length && defaultRanges[blockIdx]) {
        blockRange = defaultRanges[blockIdx];
      } else {
        var span = 0.92 / totalBlocks;
        var r0 = Math.max(0.02, 0.02 + blockIdx * span - (blockIdx > 0 ? 0.02 : 0));
        var r1 = Math.min(0.94, 0.02 + (blockIdx + 1) * span);
        blockRange = [r0, r1];
      }

      wordBlocks.push({
        el: el,
        stepCard: stepCard,
        words: words,
        range: blockRange,
        autoRange: null
      });
    });

    function parseHexRgb(hex, fallback) {
      var clean = String(hex || "").replace("#", "").trim();
      if (clean.length === 3) {
        clean = clean[0] + clean[0] + clean[1] + clean[1] + clean[2] + clean[2];
      }
      if (clean.length !== 6) return fallback;
      var num = parseInt(clean, 16);
      if (isNaN(num)) return fallback;
      return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
    }

    function mixRgbString(rgbA, rgbB, t) {
      var r = Math.round(rgbA[0] + (rgbB[0] - rgbA[0]) * t);
      var g = Math.round(rgbA[1] + (rgbB[1] - rgbA[1]) * t);
      var b = Math.round(rgbA[2] + (rgbB[2] - rgbA[2]) * t);
      return "rgb(" + r + " " + g + " " + b + ")";
    }

    /* 3. Generador de curva orgánica (Spline Hermite Monótono en Y / Onda Sinusoidal) */
    var isMobileQuery = window.matchMedia("(max-width: 47.99rem)");
    var isTabletQuery = window.matchMedia("(min-width: 48rem) and (max-width: 63.99rem)");
    var startMedallion = portalStart ? $(".sutra-portal__medallion", portalStart) : null;
    var endVisualTarget = portalEnd
      ? $(".sutra-portal__cta .link, .sutra-portal__bloom", portalEnd) || portalEnd
      : null;

    function resolvePoints() {
      var rawPts;
      if (isMobileQuery.matches) {
        rawPts =
          (isManifiesto && cfg.puntosManifiestoMobile) ||
          (!isManifiesto && cfg.puntosConceptosMobile) ||
          cfg.puntosMobile;
      } else if (isTabletQuery.matches) {
        rawPts =
          (isManifiesto && cfg.puntosManifiestoTablet) ||
          (!isManifiesto && cfg.puntosConceptosTablet) ||
          cfg.puntosTablet;
      }
      if (!rawPts) {
        rawPts =
          (isManifiesto && cfg.puntosManifiesto) ||
          (!isManifiesto && cfg.puntosConceptos) ||
          cfg.puntos || [
            { x: 50, y: 0 },
            { x: 68, y: 21 },
            { x: 32, y: 52 },
            { x: 76, y: 81 },
            { x: 50, y: 100 }
          ];
      }
      return rawPts;
    }

    var activePoints = resolvePoints();

    function buildSmoothPath(pts, width, height, tension) {
      if (!pts || !pts.length) return "";
      var p = pts.map(function (pt) {
        return { x: (pt.x / 100) * width, y: (pt.y / 100) * height };
      });
      if (p.length === 1) return "M " + p[0].x + " " + p[0].y;
      var t = tension != null ? tension : 0.45;
      if (t <= 0) {
        return p
          .map(function (pt, idx) {
            return (idx === 0 ? "M " : "L ") + pt.x.toFixed(1) + " " + pt.y.toFixed(1);
          })
          .join(" ");
      }

      var n = p.length;
      var m = new Array(n);
      /* Entrada y salida estrictamente verticales en los portales superior e inferior */
      m[0] = 0;
      m[n - 1] = 0;

      for (var j = 1; j < n - 1; j++) {
        var dy0 = Math.max(1, p[j].y - p[j - 1].y);
        var dy1 = Math.max(1, p[j + 1].y - p[j].y);
        var s0 = (p[j].x - p[j - 1].x) / dy0;
        var s1 = (p[j + 1].x - p[j].x) / dy1;

        /* En crestas de onda (cambio de dirección izq/der), tangente vertical pura (0)
           para lograr una onda de respiración sin codos ni sobreimpulsos */
        if (s0 * s1 <= 0) {
          m[j] = 0;
        } else {
          /* Media armónica ponderada (Fritsch-Carlson) en puntos intermedios */
          var w1 = 2 * dy1 + dy0;
          var w2 = dy1 + 2 * dy0;
          m[j] = (w1 + w2) / (w1 / s0 + w2 / s1);
        }
      }

      var handleFactor = Math.min(0.49, Math.max(0.32, t));
      var d = "M " + p[0].x.toFixed(1) + " " + p[0].y.toFixed(1);
      for (var i = 0; i < n - 1; i++) {
        var p1 = p[i];
        var p2 = p[i + 1];
        var dy = Math.max(0, p2.y - p1.y);

        var cp1x = p1.x + m[i] * dy * handleFactor;
        var cp1y = p1.y + dy * handleFactor;
        var cp2x = p2.x - m[i + 1] * dy * handleFactor;
        var cp2y = p2.y - dy * handleFactor;

        d +=
          " C " +
          cp1x.toFixed(1) +
          " " +
          cp1y.toFixed(1) +
          ", " +
          cp2x.toFixed(1) +
          " " +
          cp2y.toFixed(1) +
          ", " +
          p2.x.toFixed(1) +
          " " +
          p2.y.toFixed(1);
      }
      return d;
    }

    var totalLen = 1000;
    var canvasHeight = 1000;
    var yToLengthTable = [];

    function syncCanvasEndpointsToPortals() {
      if (canvasWrap === section) return;
      var sRect = section.getBoundingClientRect();
      if (sRect.height < 120) return;

      if (startMedallion && portalStart && portalStart.style.display !== "none") {
        var mRect = startMedallion.getBoundingClientRect();
        var topOffset = Math.max(0, mRect.bottom - sRect.top - 0.5);
        canvasWrap.style.top = topOffset.toFixed(1) + "px";
      }
      if (endVisualTarget && portalEnd && portalEnd.style.display !== "none") {
        var eRect = endVisualTarget.getBoundingClientRect();
        var bottomOffset = Math.max(0, sRect.bottom - eRect.top - 0.5);
        canvasWrap.style.bottom = bottomOffset.toFixed(1) + "px";
      }
    }

    function rebuildGeometry() {
      syncCanvasEndpointsToPortals();

      var w = Math.max(280, canvasWrap.clientWidth);
      var h = Math.max(320, canvasWrap.clientHeight);
      canvasHeight = h;
      svg.setAttribute("viewBox", "0 0 " + w + " " + h);

      var d =
        cfg.svgPathManual && cfg.svgPathManual.trim()
          ? cfg.svgPathManual.trim()
          : buildSmoothPath(activePoints, w, h, cfg.tensionCurva);

      if (pathGuide) pathGuide.setAttribute("d", d);
      if (pathTrail) pathTrail.setAttribute("d", d);
      pathMain.setAttribute("d", d);

      if (typeof pathMain.getTotalLength === "function") {
        totalLen = Math.max(1, pathMain.getTotalLength());
        pathMain.style.strokeDasharray = String(totalLen);
        if (pathTrail) pathTrail.style.strokeDasharray = String(totalLen);

        /* Tabla de muestreo monotónica para que el orbe avance en Y como seda */
        yToLengthTable = [];
        var samples = 200;
        var maxSeenY = 0;
        for (var s = 0; s <= samples; s++) {
          var lenRatio = s / samples;
          var len = lenRatio * totalLen;
          var pt = pathMain.getPointAtLength(len);
          var rawY = Math.min(1, Math.max(0, pt.y / Math.max(1, h)));
          if (s === 0) rawY = 0;
          if (s === samples) rawY = 1;
          if (rawY < maxSeenY) rawY = maxSeenY;
          maxSeenY = rawY;
          yToLengthTable.push({ yRatio: rawY, lenRatio: lenRatio });
        }
      }

      /* Medir la posición vertical real de cada bloque de texto dentro del lienzo
         para que se ilumine apenas entra en la zona de lectura */
      if (textosCfg.usarPosicionReal !== false) {
        var cRect = canvasWrap.getBoundingClientRect();
        var vh = window.innerHeight || document.documentElement.clientHeight || 800;
        var leadStartRatio = (vh * (textosCfg.adelantoInicioVh != null ? textosCfg.adelantoInicioVh : 0.24)) / Math.max(1, h);
        var leadEndRatio = (vh * (textosCfg.adelantoFinVh != null ? textosCfg.adelantoFinVh : 0.05)) / Math.max(1, h);

        wordBlocks.forEach(function (block) {
          if (!block.el) return;
          var bRect = block.el.getBoundingClientRect();
          var topRatio = (bRect.top - cRect.top) / Math.max(1, h);
          var bottomRatio = (bRect.bottom - cRect.top) / Math.max(1, h);
          var startP = Math.max(0, topRatio - leadStartRatio);
          var endP = Math.max(startP + 0.075, bottomRatio - leadEndRatio);
          block.autoRange = [startP, Math.min(0.95, endP)];
        });
      }
    }

    function mapScrollProgressToArcRatio(p) {
      if (scrollCfg.compensarCurvasHorizontales === false || !yToLengthTable.length) {
        return p;
      }
      if (p <= 0) return 0;
      if (p >= 1) return 1;
      for (var i = 0; i < yToLengthTable.length - 1; i++) {
        var a = yToLengthTable[i];
        var b = yToLengthTable[i + 1];
        if (p >= a.yRatio && p <= b.yRatio) {
          var span = b.yRatio - a.yRatio;
          if (span <= 0.00001) return b.lenRatio;
          var t = (p - a.yRatio) / span;
          return a.lenRatio + t * (b.lenRatio - a.lenRatio);
        }
      }
      return 1;
    }

    /* 4. Cálculo y renderizado del progreso de scroll con inercia de seda */
    var targetP = 0;
    var currentP = 0;
    var rafId = null;
    var isStepAnimating = false;
    var baseLerpFactor = reduceMotion ? 1 : scrollCfg.suavizado != null ? scrollCfg.suavizado : 0.18;
    var stepLerpFactor = reduceMotion ? 1 : scrollCfg.suavizadoEnPaso != null ? scrollCfg.suavizadoEnPaso : 0.36;
    var speedMult = scrollCfg.velocidad != null ? scrollCfg.velocidad : 1.0;
    var screenAnchorStart = scrollCfg.alturaEnPantalla != null ? scrollCfg.alturaEnPantalla : 0.60;
    var screenAnchorEnd = scrollCfg.alturaEnPantallaFinal != null ? scrollCfg.alturaEnPantallaFinal : screenAnchorStart;

    var offOpacity = textosCfg.opacidadApagada != null ? textosCfg.opacidadApagada : 0.32;
    var offBlur = textosCfg.blurApagada != null ? textosCfg.blurApagada : 0;
    var offColor = textosCfg.colorApagada || "#8a837b";
    var onColor = textosCfg.colorEncendida || "#383838";
    var worldColor = textosCfg.colorMundoManifiesto || "#5e5852";
    var accentColor = textosCfg.colorAcento || "#5b2e44";

    var offRgb = parseHexRgb(offColor, [138, 131, 123]);
    var onRgb = parseHexRgb(onColor, [56, 56, 56]);
    var worldRgb = parseHexRgb(worldColor, [94, 88, 82]);
    var accentRgb = parseHexRgb(accentColor, [91, 46, 68]);

    function computeTargetProgress() {
      if (reduceMotion) return 1;
      var rect = canvasWrap.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight || 800;
      var totalTravel = Math.max(1, rect.height);

      /* Horizonte progresivo: comienza en screenAnchorStart y avanza suavemente a screenAnchorEnd
         para que al posarse en la última estrofa el filamento complete su llegada al cierre */
      var approxP = Math.min(1, Math.max(0, (vh * screenAnchorStart - rect.top) / totalTravel));
      var dynamicAnchor = screenAnchorStart + (screenAnchorEnd - screenAnchorStart) * approxP;
      var rawP = (vh * dynamicAnchor - rect.top) / totalTravel;
      var scaledP = (rawP - 0.5) * speedMult + 0.5;
      return Math.min(1, Math.max(0, scaledP));
    }

    function renderProgress(p) {
      var arcRatio = mapScrollProgressToArcRatio(p);
      var dashOffset = totalLen * (1 - arcRatio);
      var lineVisible = arcRatio > 0.001;
      pathMain.style.strokeDashoffset = dashOffset.toFixed(1);
      pathMain.style.opacity = lineVisible ? "1" : "0";
      if (pathTrail) {
        pathTrail.style.strokeDashoffset = dashOffset.toFixed(1);
        pathTrail.style.opacity = lineVisible ? "1" : "0";
      }

      if (orbGroup && estilo.mostrarOrbe !== false && typeof pathMain.getPointAtLength === "function") {
        var pt = pathMain.getPointAtLength(totalLen * Math.min(1, Math.max(0, arcRatio)));
        /* Aparición suave al nacer del medallón y fusión delicada al posarse en el cierre */
        var fadeIn = Math.min(1, p / 0.035);
        var fadeOut = p > 0.965 ? Math.max(0, (1 - p) / 0.035) : 1;
        var orbAlpha = Math.min(fadeIn, fadeOut);
        orbGroup.setAttribute("transform", "translate(" + pt.x.toFixed(1) + ", " + pt.y.toFixed(1) + ")");
        orbGroup.style.opacity = orbAlpha.toFixed(3);
      }

      /* Animar portales y arcos orgánicos de entrada y salida */
      var curveIntensity = transCfg.intensidadCurvaScroll != null ? transCfg.intensidadCurvaScroll : 1;
      if (waveTopPath && curveIntensity > 0) {
        var topDepth = Math.round(28 + (1 - Math.min(1, p * 1.6)) * 88 * curveIntensity);
        waveTopPath.setAttribute("d", "M0,0 L1440,0 L1440,18 Q720," + topDepth + " 0,18 Z");
      }
      if (waveBottomPath && curveIntensity > 0) {
        var bottomCurve = Math.round(92 - Math.max(0, (p - 0.5) * 2) * 82 * curveIntensity);
        waveBottomPath.setAttribute("d", "M0,120 L1440,120 L1440,102 Q720," + bottomCurve + " 0,102 Z");
      }

      var rotDeg = transCfg.rotacionIsotipoGrados != null ? transCfg.rotacionIsotipoGrados : 30;
      if (portalMark) {
        portalMark.style.transform = "rotate(" + (p * rotDeg).toFixed(1) + "deg)";
      }
      if (portalRing) {
        portalRing.style.transform = "rotate(" + (-p * rotDeg * 1.4).toFixed(1) + "deg) scale(" + (1 + Math.sin(p * Math.PI) * 0.08).toFixed(3) + ")";
      }
      if (portalEnd) {
        var bloomThreshold = transCfg.umbralFloracionFinal != null ? transCfg.umbralFloracionFinal : 0.92;
        portalEnd.classList.toggle("is-blooming", p >= bloomThreshold);
      }

      wordBlocks.forEach(function (block) {
        var activeRange = block.autoRange || block.range;
        var rStart = activeRange[0];
        var rEnd = activeRange[1];
        var localP = (p - rStart) / Math.max(0.01, rEnd - rStart);
        var count = block.words.length || 1;
        var feather = Math.max(0.24, 2.6 / count);

        if (block.stepCard) {
          block.stepCard.classList.toggle("is-active", localP >= 0.08);
        }

        block.words.forEach(function (item, idx) {
          var threshold = (idx / Math.max(1, count - 1)) * (1 - feather);
          var rawW = reduceMotion ? 1 : (localP - threshold) / feather;
          var wP = Math.min(1, Math.max(0, rawW));
          if (Math.abs(wP - item.lastState) < 0.003 && item.lastState !== -1) return;
          item.lastState = wP;

          /* Curva easeOut para que las palabras cobren contraste y cuerpo con fluidez */
          var easeW = 1 - (1 - wP) * (1 - wP);
          var op = offOpacity + (1 - offOpacity) * easeW;
          var targetRgb = item.accent ? accentRgb : isManifiesto ? worldRgb : onRgb;

          item.el.style.opacity = op.toFixed(3);
          item.el.style.color = mixRgbString(offRgb, targetRgb, easeW);
          if (offBlur > 0) {
            var blurPx = offBlur * (1 - easeW);
            item.el.style.filter = blurPx <= 0.04 ? "none" : "blur(" + blurPx.toFixed(2) + "px)";
          } else if (item.el.style.filter) {
            item.el.style.filter = "";
          }
        });
      });
    }

    function tick() {
      var diff = targetP - currentP;
      var activeLerp = isStepAnimating ? stepLerpFactor : baseLerpFactor;
      if (Math.abs(diff) > 0.00025) {
        currentP += diff * activeLerp;
        renderProgress(currentP);
        rafId = window.requestAnimationFrame(tick);
      } else {
        currentP = targetP;
        renderProgress(currentP);
        rafId = null;
      }
    }

    function onScrollOrResize() {
      targetP = computeTargetProgress();
      if (!rafId) {
        rafId = window.requestAnimationFrame(tick);
      }
    }

    function refreshAll() {
      activePoints = resolvePoints();
      rebuildGeometry();
      onScrollOrResize();
    }

    rebuildGeometry();
    targetP = computeTargetProgress();
    currentP = targetP;
    renderProgress(currentP);

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", refreshAll, { passive: true });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refreshAll);
    }
    if ("ResizeObserver" in window) {
      var ro = new ResizeObserver(function () {
        refreshAll();
      });
      ro.observe(section);
    }

    var editorActive = cfg.modoEditor === true || window.location.search.indexOf("editar-linea") !== -1;

    /* 4b. Scroll guiado de seda paso a paso entre cada estrofa (scrollPorPasos) */
    var stepScrollCfg = scrollCfg.scrollPorPasos || {};
    var stepCards = $$(".sutra-step", section);
    var siteHeader = $(".header");
    var isTouchDeviceQuery = window.matchMedia("(hover: none) and (pointer: coarse)");

    function isStepScrollBlockedOnDevice() {
      if (stepScrollCfg.activoEnMobile === true) return false;
      return isMobileQuery.matches || isTouchDeviceQuery.matches;
    }

    if (stepScrollCfg.activo !== false && !reduceMotion && stepCards.length > 1) {
      var stepDuration = stepScrollCfg.duracionMs != null ? stepScrollCfg.duracionMs : 520;
      var minGestureGapMs = stepScrollCfg.pausaEntrePasosMs != null ? stepScrollCfg.pausaEntrePasosMs : 180;
      var stepStopRatio = stepScrollCfg.posicionEnPantalla != null ? stepScrollCfg.posicionEnPantalla : 0.46;
      var captureVh = stepScrollCfg.zonaCapturaVh != null ? stepScrollCfg.zonaCapturaVh : 0.34;

      var stepAnimRaf = null;
      var stepAnimDir = 0;
      var activeDestinationY = null;
      var scrollFloatY = window.scrollY;
      var scrollVelocityY = 0;
      var lastFrameTs = 0;
      var touchActive = false;
      var touchSettleTimer = null;

      /* Detector ágil de campana de gesto (Subida → Pico → Bajada):
         absorbe toda la inercia decreciente de un gesto, pero destraba en el acto
         apenas detecta un nuevo empuje ascendente de dedos o clic de rueda */
      var lastWheelEventTs = 0;
      var lastStepTriggerTs = 0;
      var prevWheelAbsDelta = 0;
      var peakDeltaSinceTrigger = 0;
      var hasDecayedSinceTrigger = false;
      var minDeltaAfterDecay = Infinity;
      var risingDeltaFrames = 0;
      var wheelGestureConsumed = false;
      var wheelGestureDir = 0;

      function getHeaderClearance(vh) {
        if (!siteHeader) return 0;
        var h = siteHeader.offsetHeight || 83;
        return Math.min(vh * 0.16, Math.min(92, h));
      }

      function getStepTargetY(stepEl, idx) {
        var r = stepEl.getBoundingClientRect();
        var vh = window.innerHeight || document.documentElement.clientHeight || 800;
        var clearance = getHeaderClearance(vh);
        var opticalAnchor = clearance + (vh - clearance) * stepStopRatio;
        var centerInPage = window.scrollY + r.top + r.height * 0.5;
        var target = centerInPage - opticalAnchor;

        /* En la última estrofa, encuadrar también el botón / portal de cierre para que el final
           de la línea se vea posarse con delicadeza sin cortar el botón abajo */
        if (idx === stepCards.length - 1 && endVisualTarget) {
          var eRect = endVisualTarget.getBoundingClientRect();
          var endBottomInPage = window.scrollY + eRect.bottom;
          var minScrollForEnd = endBottomInPage - vh * 0.9;
          var stepTopInPage = window.scrollY + r.top;
          var maxScrollWithoutHeaderOverlap = stepTopInPage - (clearance + 24);
          if (minScrollForEnd > target) {
            target = Math.min(minScrollForEnd, Math.max(target, maxScrollWithoutHeaderOverlap));
          }
        }
        return Math.max(0, Math.round(target));
      }

      function getAllStepTargets() {
        return stepCards.map(getStepTargetY);
      }

      function cancelStepGlide() {
        if (stepAnimRaf) {
          window.cancelAnimationFrame(stepAnimRaf);
          stepAnimRaf = null;
        }
        isStepAnimating = false;
        activeDestinationY = null;
        scrollVelocityY = 0;
        lastFrameTs = 0;
      }

      function animateScrollToY(destinationY, duration, dir) {
        if (!isStepAnimating) {
          scrollFloatY = window.scrollY;
          scrollVelocityY = 0;
          lastFrameTs = 0;
        }

        if (Math.abs(destinationY - scrollFloatY) < 4 && Math.abs(scrollVelocityY) < 10) {
          cancelStepGlide();
          return;
        }

        activeDestinationY = destinationY;
        stepAnimDir = dir || (destinationY >= scrollFloatY ? 1 : -1);
        isStepAnimating = true;

        /* Amortiguación crítica continua (smoothDamp): arranque sedoso sin tirón, aterrizaje
           suave y conservación de velocidad si el usuario encadena otro scroll en el camino */
        var smoothTime = Math.max(0.11, (duration || stepDuration) / 2850);

        function springFrame(now) {
          if (!isStepAnimating || activeDestinationY == null) return;
          var dt = lastFrameTs ? Math.min(0.05, Math.max(0.004, (now - lastFrameTs) / 1000)) : 1 / 60;
          lastFrameTs = now;

          var omega = 2 / smoothTime;
          var x = omega * dt;
          var exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
          var change = scrollFloatY - activeDestinationY;
          var temp = (scrollVelocityY + omega * change) * dt;
          scrollVelocityY = (scrollVelocityY - omega * temp) * exp;
          scrollFloatY = activeDestinationY + (change + temp) * exp;

          if (Math.abs(activeDestinationY - scrollFloatY) < 0.75 && Math.abs(scrollVelocityY) < 12) {
            window.scrollTo({ top: activeDestinationY, behavior: "instant" });
            onScrollOrResize();
            cancelStepGlide();
            return;
          }

          window.scrollTo({ top: scrollFloatY, behavior: "instant" });
          onScrollOrResize();
          stepAnimRaf = window.requestAnimationFrame(springFrame);
        }

        if (!stepAnimRaf) {
          stepAnimRaf = window.requestAnimationFrame(springFrame);
        }
      }

      function findNextStepIndex(targets, refY, dir) {
        var tolerance = 20;
        if (dir > 0) {
          for (var i = 0; i < targets.length; i++) {
            if (targets[i] > refY + tolerance) {
              return i;
            }
          }
          return -1;
        } else {
          for (var j = targets.length - 1; j >= 0; j--) {
            if (targets[j] < refY - tolerance) {
              return j;
            }
          }
          return -1;
        }
      }

      window.addEventListener(
        "wheel",
        function (ev) {
          if (editorActive || reduceMotion || isStepScrollBlockedOnDevice()) return;
          if (ev.ctrlKey || ev.metaKey || ev.defaultPrevented) return;
          if (Math.abs(ev.deltaX) > Math.abs(ev.deltaY)) return;
          if (document.body.classList.contains("menu-open") || $("dialog[open]")) return;

          var absDelta = Math.abs(ev.deltaY);
          var dir = ev.deltaY > 0 ? 1 : ev.deltaY < 0 ? -1 : 0;
          if (!dir) return;

          var now = performance.now();
          var gapMs = now - lastWheelEventTs;
          var sinceTriggerMs = now - lastStepTriggerTs;

          if (absDelta > prevWheelAbsDelta + 0.5) {
            risingDeltaFrames++;
          } else if (absDelta < prevWheelAbsDelta - 0.5) {
            risingDeltaFrames = 0;
          }

          /* 1) Pausa real entre gestos (>140ms sin eventos) o cambio de sentido = gesto nuevo inmediato */
          if (gapMs > 140 || dir !== wheelGestureDir) {
            wheelGestureConsumed = false;
            risingDeltaFrames = 0;
          } else if (wheelGestureConsumed) {
            if (!hasDecayedSinceTrigger) {
              if (absDelta > peakDeltaSinceTrigger) {
                peakDeltaSinceTrigger = absDelta;
              } else if (absDelta <= peakDeltaSinceTrigger - 2) {
                hasDecayedSinceTrigger = true;
                minDeltaAfterDecay = absDelta;
              }
            } else {
              if (absDelta < minDeltaAfterDecay) {
                minDeltaAfterDecay = absDelta;
              }
              /* 2) Apenas el gesto anterior ya bajó de su pico y los dedos vuelven a empujar
                    hacia arriba en velocidad (incluso suave), liberar el siguiente paso en el acto */
              var reaccelerated =
                sinceTriggerMs >= minGestureGapMs &&
                ((risingDeltaFrames >= 2 && absDelta >= minDeltaAfterDecay + 3) ||
                  absDelta >= Math.max(45, minDeltaAfterDecay * 2.2));
              if (reaccelerated) {
                wheelGestureConsumed = false;
                risingDeltaFrames = 0;
              }
            }
          }

          lastWheelEventTs = now;
          prevWheelAbsDelta = absDelta;
          wheelGestureDir = dir;

          var targets = getAllStepTargets();
          if (!targets.length) return;

          var vh = window.innerHeight || document.documentElement.clientHeight || 800;
          var curY = window.scrollY;
          /* Si ya está deslizando en el mismo sentido, calcular el siguiente paso desde el destino
             actual para encadenar estrofas sin repetir ni frenar en la misma */
          var refY =
            isStepAnimating && activeDestinationY != null && dir === stepAnimDir
              ? activeDestinationY
              : curY;

          var firstY = targets[0];
          var lastY = targets[targets.length - 1];

          var inDownZone = dir > 0 && curY >= firstY - vh * captureVh && refY < lastY - 18;
          var inUpZone = dir < 0 && curY > firstY + 18 && refY <= lastY + vh * captureVh;

          if (!inDownZone && !inUpZone) {
            /* Si el usuario hace un gesto nuevo para salir de la última/primera estrofa, soltar suave */
            if (isStepAnimating && !wheelGestureConsumed) {
              cancelStepGlide();
            }
            return;
          }

          if (wheelGestureConsumed || (sinceTriggerMs < minGestureGapMs && dir === stepAnimDir)) {
            ev.preventDefault();
            return;
          }

          if (absDelta < 3) return;

          var nextIdx = findNextStepIndex(targets, refY, dir);
          if (nextIdx === -1) {
            if (isStepAnimating) cancelStepGlide();
            return;
          }

          ev.preventDefault();
          wheelGestureConsumed = true;
          lastStepTriggerTs = now;
          peakDeltaSinceTrigger = absDelta;
          hasDecayedSinceTrigger = false;
          minDeltaAfterDecay = absDelta;
          risingDeltaFrames = 0;
          animateScrollToY(targets[nextIdx], stepDuration, dir);
        },
        { passive: false }
      );

      window.addEventListener("keydown", function (ev) {
        if (editorActive || reduceMotion || isStepScrollBlockedOnDevice()) return;
        if (document.body.classList.contains("menu-open") || $("dialog[open]")) return;
        var tag = ev.target && ev.target.tagName ? ev.target.tagName.toLowerCase() : "";
        if (tag === "input" || tag === "textarea" || tag === "select" || tag === "button" || tag === "a") return;

        var dir = 0;
        if (ev.key === "ArrowDown" || ev.key === "PageDown" || (ev.key === " " && !ev.shiftKey)) {
          dir = 1;
        } else if (ev.key === "ArrowUp" || ev.key === "PageUp" || (ev.key === " " && ev.shiftKey)) {
          dir = -1;
        }
        if (!dir) return;

        var targets = getAllStepTargets();
        var vh = window.innerHeight || document.documentElement.clientHeight || 800;
        var curY = window.scrollY;
        var refY =
          isStepAnimating && activeDestinationY != null && dir === stepAnimDir
            ? activeDestinationY
            : curY;
        var firstY = targets[0];
        var lastY = targets[targets.length - 1];

        var inDownZone = dir > 0 && curY >= firstY - vh * captureVh && refY < lastY - 18;
        var inUpZone = dir < 0 && curY > firstY + 18 && refY <= lastY + vh * captureVh;
        if (!inDownZone && !inUpZone) return;

        var now = performance.now();
        if (now - lastStepTriggerTs < 140 && dir === stepAnimDir) {
          ev.preventDefault();
          return;
        }

        var nextIdx = findNextStepIndex(targets, refY, dir);
        if (nextIdx === -1) return;

        ev.preventDefault();
        lastStepTriggerTs = now;
        animateScrollToY(targets[nextIdx], stepDuration, dir);
      });

      if (stepScrollCfg.imanSuaveTouch === true) {
        window.addEventListener(
          "touchstart",
          function () {
            touchActive = true;
            if (touchSettleTimer) window.clearTimeout(touchSettleTimer);
            cancelStepGlide();
          },
          { passive: true }
        );

        window.addEventListener(
          "touchend",
          function () {
            if (isStepScrollBlockedOnDevice()) return;
            touchActive = false;
            if (touchSettleTimer) window.clearTimeout(touchSettleTimer);
            touchSettleTimer = window.setTimeout(function () {
              if (touchActive || isStepAnimating) return;
              var targets = getAllStepTargets();
              var vh = window.innerHeight || document.documentElement.clientHeight || 800;
              var curY = window.scrollY;
              var firstY = targets[0];
              var lastY = targets[targets.length - 1];
              if (curY < firstY - vh * 0.24 || curY > lastY + vh * 0.24) return;

              var closestY = targets[0];
              var minDiff = Math.abs(curY - closestY);
              for (var i = 1; i < targets.length; i++) {
                var d = Math.abs(curY - targets[i]);
                if (d < minDiff) {
                  minDiff = d;
                  closestY = targets[i];
                }
              }
              if (minDiff > 14 && minDiff < vh * 0.26) {
                animateScrollToY(closestY, 560);
              }
            }, 170);
          },
          { passive: true }
        );
      }
    }

    /* 5. Modo Editor Visual Interactivo (?editar-linea o modoEditor: true) */
    if (editorActive) {
      var handles = [];
      function renderHandles() {
        handles.forEach(function (h) {
          h.remove();
        });
        handles = [];
        activePoints.forEach(function (pt, idx) {
          var h = document.createElement("div");
          h.className = "sutra-editor-handle";
          h.textContent = String(idx + 1);
          h.title = "Arrastrar punto " + (idx + 1) + " (Shift+Clic para eliminar)";
          h.style.left = pt.x + "%";
          h.style.top = pt.y + "%";

          h.addEventListener("pointerdown", function (ev) {
            if (ev.shiftKey && activePoints.length > 2) {
              activePoints.splice(idx, 1);
              rebuildGeometry();
              renderProgress(currentP);
              renderHandles();
              return;
            }
            ev.preventDefault();
            h.setPointerCapture(ev.pointerId);
            function onMove(moveEv) {
              var r = section.getBoundingClientRect();
              var nx = ((moveEv.clientX - r.left) / r.width) * 100;
              var ny = ((moveEv.clientY - r.top) / r.height) * 100;
              pt.x = Math.round(Math.min(98, Math.max(2, nx)));
              pt.y = Math.round(Math.min(100, Math.max(0, ny)));
              h.style.left = pt.x + "%";
              h.style.top = pt.y + "%";
              rebuildGeometry();
              renderProgress(currentP);
            }
            function onUp() {
              h.removeEventListener("pointermove", onMove);
              h.removeEventListener("pointerup", onUp);
            }
            h.addEventListener("pointermove", onMove);
            h.addEventListener("pointerup", onUp);
          });

          section.appendChild(h);
          handles.push(h);
        });
      }

      section.addEventListener("dblclick", function (ev) {
        if (ev.target.closest(".sutra-editor-handle")) return;
        var r = section.getBoundingClientRect();
        var nx = Math.round(((ev.clientX - r.left) / r.width) * 100);
        var ny = Math.round(((ev.clientY - r.top) / r.height) * 100);
        activePoints.push({ x: nx, y: ny });
        activePoints.sort(function (a, b) {
          return a.y - b.y;
        });
        rebuildGeometry();
        renderProgress(currentP);
        renderHandles();
      });

      var bar = document.createElement("div");
      bar.className = "sutra-editor-bar";
      bar.innerHTML =
        '<span>Editor de Línea Viva (doble clic suma punto · Shift+clic borra)</span><button type="button">Copiar puntos</button>';
      var copyBtn = $("button", bar);
      copyBtn.addEventListener("click", function () {
        var formatted =
          "puntos: [\n" +
          activePoints
            .map(function (pt, i) {
              return "    { x: " + pt.x + ", y: " + pt.y + " }" + (i < activePoints.length - 1 ? "," : "");
            })
            .join("\n") +
          "\n  ],";
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(formatted);
        }
        copyBtn.textContent = "¡Copiado!";
        window.setTimeout(function () {
          copyBtn.textContent = "Copiar puntos";
        }, 1800);
      });
      document.body.appendChild(bar);
      renderHandles();
    }
  }

  initSharedLayout();
  initAnalytics();
  initTracking();
  initHeader();
  initMenu();
  initManifesto();
  initReveal();
  initIndexPreview();
  initSchedule();
  initFaq();
  initGuideModals();
  initSutraLine();
  initHeroVideo();
})();

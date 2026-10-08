/* Eggley Company — interactions du site */
(function () {
  "use strict";

  var doc = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* En-tête : ombre au défilement + bouton retour en haut */
  var header = document.querySelector(".site-header");
  var toTop = document.querySelector(".to-top");
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("is-scrolled", y > 8);
    if (toTop) toTop.classList.toggle("is-visible", y > 700);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      var skip = document.querySelector(".brand");
      if (skip) skip.focus({ preventScroll: true });
    });
  }

  /* Menu mobile */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    var mq = window.matchMedia("(max-width: 991px)");
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
    var onChange = function () { if (!mq.matches) setOpen(false); };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }

  /* Apparition au défilement (texte : .reveal, images : .reveal-media) */
  var reveals = document.querySelectorAll(".reveal, .reveal-media");
  if (reveals.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      reveals.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });
      reveals.forEach(function (el) { io.observe(el); });
    }
  }

  /* Index des gammes : aperçu qui suit la souris (décoratif, pointeur précis uniquement).
     Interpolation amortie sans rebond, part toujours de la position affichée. */
  var index = document.querySelector("[data-index]");
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (index && finePointer) {
    var preview = document.createElement("div");
    preview.className = "index-preview";
    preview.setAttribute("aria-hidden", "true");
    var previewImg = document.createElement("img");
    previewImg.alt = "";
    var firstRow = index.querySelector("[data-preview]");
    if (firstRow) previewImg.src = firstRow.getAttribute("data-preview");
    preview.appendChild(previewImg);
    document.body.appendChild(preview);
    var pos = { x: 0, y: 0 }, target = { x: 0, y: 0 }, raf = null, active = false;
    var halfW = 130, halfH = 162;
    var step = function () {
      var k = reduceMotion ? 1 : 0.2;
      pos.x += (target.x - pos.x) * k;
      pos.y += (target.y - pos.y) * k;
      preview.style.transform = "translate3d(" + (pos.x - halfW) + "px," + (pos.y - halfH) + "px,0)";
      if (active || Math.abs(target.x - pos.x) > 0.5 || Math.abs(target.y - pos.y) > 0.5) {
        raf = requestAnimationFrame(step);
      } else {
        raf = null;
      }
    };
    index.querySelectorAll("[data-preview]").forEach(function (row) {
      var img = new Image(); img.src = row.getAttribute("data-preview"); /* préchargement */
      row.addEventListener("pointerenter", function (e) {
        if (e.pointerType !== "mouse") return;
        previewImg.src = row.getAttribute("data-preview");
        if (!active) { pos.x = target.x = e.clientX; pos.y = target.y = e.clientY; }
        active = true;
        preview.classList.add("is-visible");
        if (!raf) raf = requestAnimationFrame(step);
      });
    });
    index.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse") return;
      target.x = e.clientX; target.y = e.clientY;
      if (!raf) raf = requestAnimationFrame(step);
    });
    index.addEventListener("pointerleave", function () {
      active = false;
      preview.classList.remove("is-visible");
    });
    window.addEventListener("scroll", function () {
      if (active) { active = false; preview.classList.remove("is-visible"); }
    }, { passive: true });
  }

  /* Chapitres : indique le chapitre en cours dans la colonne de progression */
  var chapterLinks = document.querySelectorAll(".chapters__progress a");
  if (chapterLinks.length && "IntersectionObserver" in window) {
    var setCurrent = function (id) {
      chapterLinks.forEach(function (a) {
        a.setAttribute("aria-current", a.getAttribute("href") === "#" + id ? "true" : "false");
      });
    };
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { if (entry.isIntersecting) setCurrent(entry.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll(".chapter[id]").forEach(function (c) { co.observe(c); });
  }

  /* Contenus tiers (YouTube, Google Maps) chargés uniquement au clic */
  document.querySelectorAll("[data-embed]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var wrap = btn.closest(".embed");
      var iframe = document.createElement("iframe");
      iframe.src = btn.getAttribute("data-embed");
      iframe.title = btn.getAttribute("data-title") || "";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen";
      iframe.allowFullscreen = true;
      wrap.innerHTML = "";
      wrap.appendChild(iframe);
      iframe.focus();
    });
  });

  /* Formulaire de contact : validation accessible */
  var form = document.getElementById("contact-form");
  if (form) {
    form.setAttribute("novalidate", "");
    var status = form.querySelector(".form-status");
    if (status) {
      status.setAttribute("tabindex", "-1");
      status.addEventListener("click", function (ev) {
        var link = ev.target.closest("a[href^='#']");
        if (!link) return;
        ev.preventDefault();
        var target = document.getElementById(link.getAttribute("href").slice(1));
        if (target) {
          target.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
          target.focus({ preventScroll: true });
        }
      });
    }
    var submit = form.querySelector('button[type="submit"]');

    var messages = {
      valueMissing: "Ce champ est obligatoire.",
      typeMismatch: "Veuillez saisir une adresse e-mail valide (ex. : nom@societe.com).",
      patternMismatch: "Le format n'est pas valide.",
      tooShort: "Votre message est un peu court (20 caractères minimum)."
    };

    var check = function (input) {
      var field = input.closest(".field") || input.closest(".consent");
      if (!field) return true;
      var err = field.querySelector(".field__error-text");
      var v = input.validity;
      var msg = "";
      if (!v.valid) {
        if (input.type === "checkbox") msg = "Merci d'accepter le traitement de vos données pour envoyer votre demande.";
        else if (v.valueMissing) msg = messages.valueMissing;
        else if (v.typeMismatch) msg = messages.typeMismatch;
        else if (v.tooShort) msg = messages.tooShort;
        else if (v.patternMismatch) msg = messages.patternMismatch;
        else msg = input.validationMessage;
      }
      field.classList.toggle("has-error", !!msg);
      input.setAttribute("aria-invalid", msg ? "true" : "false");
      if (err) err.textContent = msg;
      return !msg;
    };

    var inputs = form.querySelectorAll("input[required], textarea[required], select[required], input[type='email'], input[type='tel']");
    inputs.forEach(function (input) {
      input.addEventListener("blur", function () {
        if (input.value !== "" || input.type === "checkbox") check(input);
      });
      input.addEventListener("input", function () {
        var field = input.closest(".field") || input.closest(".consent");
        if (field && field.classList.contains("has-error")) check(input);
      });
      input.addEventListener("change", function () {
        if (input.type === "checkbox" || input.tagName === "SELECT") check(input);
      });
    });

    form.addEventListener("submit", function (e) {
      var firstInvalid = null;
      inputs.forEach(function (input) {
        if (!check(input) && !firstInvalid) firstInvalid = input;
      });
      if (firstInvalid) {
        e.preventDefault();
        if (status) {
          /* Récapitulatif cliquable des champs à corriger */
          var invalid = Array.prototype.filter.call(inputs, function (input) {
            return input.getAttribute("aria-invalid") === "true";
          });
          var items = invalid.map(function (input) {
            var label = form.querySelector('label[for="' + input.id + '"]');
            var name = input.type === "checkbox" ? "Consentement au traitement des données"
              : (label ? label.textContent.replace("*", "").trim() : input.name);
            return '<li><a href="#' + input.id + '">' + name + "</a></li>";
          });
          var plural = invalid.length > 1;
          status.innerHTML = '<p class="form-status__title">' +
            (plural ? invalid.length + " champs doivent être corrigés" : "Un champ doit être corrigé") +
            " avant l'envoi :</p><ul>" + items.join("") + "</ul>";
          status.classList.add("is-error");
          status.focus();
        } else {
          firstInvalid.focus();
        }
        return;
      }
      if (status) { status.textContent = ""; status.classList.remove("is-error"); }

      /* Objet de l'e-mail reçu : reprend le motif choisi */
      var subjectField = form.querySelector('input[name="_subject"]');
      var topic = form.querySelector('select[name="motif"]');
      if (subjectField && topic && topic.value) {
        subjectField.value = "Site web — " + topic.value;
      }
      if (submit) {
        submit.setAttribute("aria-busy", "true");
        var label = submit.querySelector(".btn__label");
        if (label) label.textContent = "Envoi en cours…";
      }
    });
  }

  /* Retour arrière (cache navigateur) : réactive le bouton d'envoi */
  window.addEventListener("pageshow", function () {
    var btn = document.querySelector('#contact-form button[aria-busy="true"]');
    if (btn) {
      btn.removeAttribute("aria-busy");
      var label = btn.querySelector(".btn__label");
      if (label) label.textContent = "Envoyer le message";
    }
  });

  /* Année du copyright */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();

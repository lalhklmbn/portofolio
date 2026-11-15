/* ===========================================================
   PORTOFOLIO — script.js
   Semua interaksi murni frontend, tanpa dependensi eksternal.
   =========================================================== */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Tahun otomatis di footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar: shadow saat scroll ---------- */
  var navbar = document.getElementById("navbar");
  function updateNavbarState() {
    if (window.scrollY > 12) navbar.classList.add("is-scrolled");
    else navbar.classList.remove("is-scrolled");
  }
  updateNavbarState();
  window.addEventListener("scroll", updateNavbarState, { passive: true });

  /* ---------- Menu mobile ---------- */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  navToggle.addEventListener("click", function () {
    var isOpen = navbar.classList.toggle("is-menu-open");
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navbar.classList.remove("is-menu-open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Scrollspy: tandai link aktif ---------- */
  var sections = Array.prototype.slice.call(
    document.querySelectorAll("main section[id]")
  );
  var navAnchors = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));

  function updateActiveLink() {
    var scrollPos = window.scrollY + 140;
    var current = sections[0];
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollPos) current = sec;
    });
    navAnchors.forEach(function (link) {
      var match = link.getAttribute("href") === "#" + current.id;
      link.classList.toggle("is-active", match);
    });
  }
  updateActiveLink();
  window.addEventListener("scroll", updateActiveLink, { passive: true });

  /* ---------- Scroll progress bar ---------- */
  var progressBar = document.getElementById("scrollProgress");
  function updateProgress() {
    var doc = document.documentElement;
    var scrollable = doc.scrollHeight - doc.clientHeight;
    var pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progressBar.style.width = pct + "%";
  }
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);

  /* ---------- Reveal-on-scroll (IntersectionObserver) ---------- */
  var revealTargets = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  var wordTargets = Array.prototype.slice.call(document.querySelectorAll(".reveal-word"));

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealTargets.concat(wordTargets).forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var delay = parseInt(el.getAttribute("data-reveal-delay") || "0", 10);
          setTimeout(function () {
            el.classList.add("is-visible");
          }, delay);
          observer.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach(function (el) { observer.observe(el); });

    // Hero title: animasi kata muncul berurutan saat halaman dimuat
    wordTargets.forEach(function (el, i) {
      setTimeout(function () { el.classList.add("is-visible"); }, 120 + i * 110);
    });
  }

  /* ---------- Role rotator (cross-fade, bukan efek mengetik) ---------- */
  var roleWords = Array.prototype.slice.call(document.querySelectorAll(".role-rotator__word"));
  if (roleWords.length > 1 && !prefersReducedMotion) {
    var activeIndex = 0;
    setInterval(function () {
      roleWords[activeIndex].classList.remove("is-active");
      activeIndex = (activeIndex + 1) % roleWords.length;
      roleWords[activeIndex].classList.add("is-active");
    }, 2600);
  }

  /* ---------- Lightbox galeri foto ---------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxTriggers = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));
  var lastFocusedEl = null;

  function openLightbox(src, alt) {
    lastFocusedEl = document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "Pratinjau gambar";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    lightbox.querySelector(".lightbox__close").focus();
  }
  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lightboxImg.src = "";
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  lightboxTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var img = trigger.querySelector("img");
      // Jangan buka lightbox jika gambar asli belum ditambahkan (placeholder aktif)
      if (!img || img.style.display === "none") return;
      openLightbox(trigger.getAttribute("data-lightbox"), img.alt);
    });
  });
  lightbox.querySelectorAll("[data-close]").forEach(function (el) {
    el.addEventListener("click", closeLightbox);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
  });

  /* ---------- Tombol kembali ke atas ---------- */
  var backToTop = document.getElementById("backToTop");
  function updateBackToTop() {
    backToTop.classList.toggle("is-visible", window.scrollY > 600);
  }
  updateBackToTop();
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });

  /* ---------- Fallback pratinjau PDF jika berkas belum ada ----------
     iframe tidak selalu memicu error saat berkas 404, jadi kita cek
     status via fetch (HEAD) bila memungkinkan; jika gagal, fallback tetap tampil. */
  document.querySelectorAll(".doc-card__preview iframe").forEach(function (frame) {
    var src = frame.getAttribute("src");
    if (!src) return;
    fetch(src, { method: "HEAD" })
      .then(function (res) {
        if (!res.ok) frame.closest(".doc-card__preview").classList.add("no-file");
      })
      .catch(function () {
        /* Dibuka langsung dari file:// atau offline — biarkan iframe mencoba memuat. */
      });
  });
})();

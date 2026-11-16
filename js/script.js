/* ===========================================================
   PORTFOLIO — script.js
   Pure frontend interactions, no external dependencies.
   =========================================================== */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar shadow on scroll ---------- */
  var navbar = document.getElementById("navbar");
  function updateNavbarState() {
    if (window.scrollY > 12) navbar.classList.add("is-scrolled");
    else navbar.classList.remove("is-scrolled");
  }
  updateNavbarState();
  window.addEventListener("scroll", updateNavbarState, { passive: true });

  /* ---------- Mobile menu ---------- */
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

  /* ---------- Scrollspy ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var navAnchors = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  function updateActiveLink() {
    var scrollPos = window.scrollY + 140;
    var current = sections[0];
    sections.forEach(function (sec) { if (sec.offsetTop <= scrollPos) current = sec; });
    navAnchors.forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("href") === "#" + current.id);
    });
  }
  updateActiveLink();
  window.addEventListener("scroll", updateActiveLink, { passive: true });

  /* ---------- Scroll progress bar ---------- */
  var progressBar = document.getElementById("scrollProgress");
  function updateProgress() {
    var doc = document.documentElement;
    var scrollable = doc.scrollHeight - doc.clientHeight;
    progressBar.style.width = (scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0) + "%";
  }
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);

  /* ---------- Reveal-on-scroll ---------- */
  var revealTargets = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  var wordTargets = Array.prototype.slice.call(document.querySelectorAll(".reveal-word"));

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealTargets.concat(wordTargets).forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = parseInt(el.getAttribute("data-reveal-delay") || "0", 10);
        setTimeout(function () { el.classList.add("is-visible"); }, delay);
        observer.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealTargets.forEach(function (el) { observer.observe(el); });

    wordTargets.forEach(function (el, i) {
      setTimeout(function () { el.classList.add("is-visible"); }, 120 + i * 110);
    });
  }

  /* ---------- Role rotator (cross-fade, single element so it can never overflow) ---------- */
  var roleRotator = document.querySelector(".role-rotator");
  if (roleRotator) {
    var roles = (roleRotator.getAttribute("data-roles") || "")
      .split(",")
      .map(function (s) { return s.trim(); })
      .filter(Boolean);
    var roleWordEl = roleRotator.querySelector(".role-rotator__word");
    if (roles.length > 1 && roleWordEl && !prefersReducedMotion) {
      var roleIndex = 0;
      setInterval(function () {
        roleWordEl.classList.add("is-fading");
        setTimeout(function () {
          roleIndex = (roleIndex + 1) % roles.length;
          roleWordEl.textContent = roles[roleIndex];
          roleWordEl.classList.remove("is-fading");
        }, 220);
      }, 2800);
    }
  }

  /* ---------- Animated stat counters ---------- */
  var statValues = Array.prototype.slice.call(document.querySelectorAll(".stat-value"));
  function formatCount(value, decimals) {
    return decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString("en-US");
  }
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count-to"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    if (prefersReducedMotion || isNaN(target)) {
      el.textContent = formatCount(target, decimals) + suffix;
      return;
    }
    var duration = 1200;
    var start = null;
    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = formatCount(target * eased, decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (statValues.length) {
    if ("IntersectionObserver" in window) {
      var statObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            statObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      statValues.forEach(function (el) { statObserver.observe(el); });
    } else {
      statValues.forEach(animateCount);
    }
  }

  /* ---------- Timeline scroll-fill line ---------- */
  var timeline = document.getElementById("timeline");
  var timelineFill = document.getElementById("timelineFill");
  function updateTimelineFill() {
    if (!timeline || !timelineFill) return;
    var rect = timeline.getBoundingClientRect();
    var viewportCenter = window.innerHeight * 0.65;
    var total = rect.height;
    var covered = viewportCenter - rect.top;
    var pct = Math.max(0, Math.min(100, (covered / total) * 100));
    timelineFill.style.height = pct + "%";
  }
  updateTimelineFill();
  window.addEventListener("scroll", updateTimelineFill, { passive: true });
  window.addEventListener("resize", updateTimelineFill);

  /* ---------- Case study tabs (GorryWell use cases) ---------- */
  document.querySelectorAll(".tabs").forEach(function (tabGroup) {
    var tabs = Array.prototype.slice.call(tabGroup.querySelectorAll('[role="tab"]'));
    var panels = tabs.map(function (tab) { return document.getElementById(tab.getAttribute("aria-controls")); });

    function activate(index) {
      tabs.forEach(function (tab, i) {
        var isActive = i === index;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", String(isActive));
        tab.tabIndex = isActive ? 0 : -1;
        if (panels[i]) panels[i].hidden = !isActive;
      });
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { activate(i); });
      tab.addEventListener("keydown", function (e) {
        var newIndex = null;
        if (e.key === "ArrowRight") newIndex = (i + 1) % tabs.length;
        else if (e.key === "ArrowLeft") newIndex = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === "Home") newIndex = 0;
        else if (e.key === "End") newIndex = tabs.length - 1;
        if (newIndex !== null) {
          e.preventDefault();
          activate(newIndex);
          tabs[newIndex].focus();
        }
      });
    });
  });

  /* ---------- Copy email to clipboard ---------- */
  var copyBtn = document.getElementById("copyEmailBtn");
  var copyText = document.getElementById("copyEmailText");
  if (copyBtn && copyText) {
    var originalText = copyText.textContent;
    copyBtn.addEventListener("click", function () {
      var email = originalText.trim();
      function showCopied() {
        copyText.textContent = "Copied to clipboard!";
        setTimeout(function () { copyText.textContent = originalText; }, 1800);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(showCopied).catch(function () {
          window.location.href = "mailto:" + email;
        });
      } else {
        window.location.href = "mailto:" + email;
      }
    });
  }

  /* ---------- Back to top ---------- */
  var backToTop = document.getElementById("backToTop");
  function updateBackToTop() { backToTop.classList.toggle("is-visible", window.scrollY > 600); }
  updateBackToTop();
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
})();

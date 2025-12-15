(function () {
  "use strict";

  function setActiveLinks() {
    var path = (location.pathname || "/").toLowerCase();
    document.querySelectorAll(".nav-links a").forEach(function (a) {
      var href = (a.getAttribute("href") || "").toLowerCase();
      if (!href || href === "#") return;
      // match by directory
      if (href !== "/" && path.startsWith(href)) a.classList.add("is-active");
      if (href === "/" && (path === "/" || path === "/index.html")) a.classList.add("is-active");
    });
  }

  function setupMenu() {
    var btn = document.querySelector("[data-menu-btn]");
    var menu = document.querySelector("[data-menu]");
    if (!btn || !menu) return;

    function closeMenu() {
      menu.hidden = true;
      btn.setAttribute("aria-expanded", "false");
    }

    function toggleMenu() {
      var isOpen = btn.getAttribute("aria-expanded") === "true";
      if (isOpen) closeMenu();
      else {
        menu.hidden = false;
        btn.setAttribute("aria-expanded", "true");
      }
    }

    btn.addEventListener("click", function (e) {
      e.preventDefault();
      toggleMenu();
    });

    // close when clicking a link
    menu.addEventListener("click", function (e) {
      var t = e.target;
      if (t && t.tagName === "A") closeMenu();
    });

    // close on outside click
    document.addEventListener("click", function (e) {
      if (!menu.hidden) {
        var nav = document.getElementById("site-nav");
        if (nav && !nav.contains(e.target)) closeMenu();
      }
    });

    // close on resize to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 780) closeMenu();
    });

    closeMenu();
  }

  document.addEventListener("DOMContentLoaded", function () {
    setActiveLinks();
    setupMenu();
  });
})();

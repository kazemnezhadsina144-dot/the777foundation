/* 777 Shell (Inject Header/Footer + Year + Mobile Menu + Active Link + Contact mailto) */
/* Version: 2025.12.14+777 */

(function () {
  "use strict";

  var PARTIALS_BASE = "/assets/partials";

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function setYear() {
    var y = $("#year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  function setupMobileMenu() {
    var burger = $(".burger");
    var menu = $("#mobile-menu");
    if (!burger || !menu) return;

    function openMenu() {
      menu.hidden = false;
      burger.setAttribute("aria-expanded", "true");
    }
    function closeMenu() {
      menu.hidden = true;
      burger.setAttribute("aria-expanded", "false");
    }

    burger.addEventListener("click", function () {
      var expanded = burger.getAttribute("aria-expanded") === "true";
      if (expanded) closeMenu();
      else openMenu();
    });

    menu.addEventListener("click", function (e) {
      var a = e.target && e.target.closest && e.target.closest("a");
      if (!a) return;
      closeMenu();
    });

    document.addEventListener("click", function (e) {
      if (menu.hidden) return;
      if (menu.contains(e.target) || burger.contains(e.target)) return;
      closeMenu();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  function setupContactForm() {
    var form = $("#contact-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = ($("#name") && $("#name").value || "").trim();
      var role = ($("#role") && $("#role").value) || "Enquiry";
      var msg = ($("#message") && $("#message").value || "").trim();

      var subject = "The 777 Foundation Society – " + role + " enquiry";
      var bodyParts = [];

      if (name) bodyParts.push("Name: " + name);
      bodyParts.push("Role: " + role);
      if (msg) bodyParts.push("\nSummary:\n" + msg);

      bodyParts.push("\n(Please do not include full names, addresses, or employer identifiers in this first email.)");

      var body = encodeURIComponent(bodyParts.join("\n"));
      var mailto =
        "mailto:contact@the777foundation.org?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        body;

      window.location.href = mailto;
    });
  }

  function markActiveLinks() {
    var path = (window.location.pathname || "/").toLowerCase();
    if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);

    var links = $all(".nav a, .mobile-menu a");
    links.forEach(function (a) {
      var href = (a.getAttribute("href") || "").toLowerCase();
      if (!href || href.indexOf("mailto:") === 0 || href.indexOf("#") === 0) return;

      // Normalize href path (ignore trailing slash)
      var tmp = href;
      if (tmp.indexOf("http") === 0) return;
      if (tmp.length > 1 && tmp.endsWith("/")) tmp = tmp.slice(0, -1);

      if (tmp === path) {
        a.style.color = "var(--text)";
        a.style.position = "relative";
      }
    });
  }

  function fetchPartial(url) {
    return fetch(url, { credentials: "same-origin" }).then(function (r) {
      if (!r.ok) throw new Error("Partial fetch failed: " + url + " (" + r.status + ")");
      return r.text();
    });
  }

  function inject() {
    var headerHost = document.getElementById("site-header");
    var footerHost = document.getElementById("site-footer");

    var tasks = [];

    if (headerHost) {
      tasks.push(
        fetchPartial(PARTIALS_BASE + "/header.html").then(function (html) {
          headerHost.innerHTML = html;
        })
      );
    }

    if (footerHost) {
      tasks.push(
        fetchPartial(PARTIALS_BASE + "/footer.html").then(function (html) {
          footerHost.innerHTML = html;
        })
      );
    }

    return Promise.all(tasks).then(function () {
      setYear();
      setupMobileMenu();
      setupContactForm();
      markActiveLinks();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();

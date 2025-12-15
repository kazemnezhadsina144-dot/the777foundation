/* 777 Shell JS — inject header/footer, active nav, mobile menu, footer year, contact mailto
   Version: 2025.12.14
*/
(function () {
  "use strict";

  var BASE = "/assets/partials";
  var HEADER_URL = BASE + "/header.html";
  var FOOTER_URL = BASE + "/footer.html";

  function norm(p) {
    if (!p) return "/";
    p = String(p).split("?")[0].split("#")[0];
    if (p.endsWith("/index.html")) p = p.slice(0, -11) + "/";
    if (p === "/index.html") p = "/";
    if (!p.startsWith("/")) p = "/" + p;
    if (p.length > 1 && !p.endsWith("/") && !p.includes(".")) p += "/";
    return p.toLowerCase();
  }

  async function inject(id, url) {
    var el = document.getElementById(id);
    if (!el) return;
    try {
      var res = await fetch(url, { cache: "no-cache" });
      if (!res.ok) throw new Error(String(res.status));
      el.innerHTML = await res.text();
    } catch (e) {
      el.innerHTML =
        '<div class="container" style="padding:14px 20px;color:var(--muted);font-size:12px;">' +
        "Navigation failed to load. Please reload." +
        "</div>";
    }
  }

  function setYear() {
    var y = document.getElementById("year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  function activateNav() {
    var path = norm(location.pathname || "/");
    document.querySelectorAll('[data-nav] a[href]').forEach(function (a) {
      var href = a.getAttribute("href") || "";
      if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("#")) return;

      var target = href.startsWith("/")
        ? href
        : (location.pathname || "/").replace(/[^\/]*$/, "") + href;

      target = norm(target);
      if ((target === "/" && path === "/") || (target !== "/" && path.startsWith(target))) {
        a.classList.add("active");
      }
    });
  }

  function wireBurger() {
    var burger = document.getElementById("burger");
    var mobile = document.getElementById("mobileNav");
    if (!burger || !mobile) return;

    burger.addEventListener("click", function () {
      var open = mobile.style.display === "block";
      mobile.style.display = open ? "none" : "block";
      burger.setAttribute("aria-expanded", String(!open));
    });

    mobile.addEventListener("click", function (e) {
      if (e.target && e.target.tagName === "A") {
        mobile.style.display = "none";
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  function wireMailtoBuilder() {
    var form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = (document.getElementById("name") || {}).value || "";
      var role = (document.getElementById("role") || {}).value || "General";
      var msg = (document.getElementById("message") || {}).value || "";

      name = String(name).trim();
      role = String(role).trim();
      msg = String(msg).trim();

      var subject = "The 777 Foundation Society – " + role + " enquiry";
      var body = [];
      if (name) body.push("Name: " + name);
      body.push("Role: " + role);
      if (msg) body.push("\nSummary:\n" + msg);
      body.push("\n(Please avoid full names, addresses, or employer identifiers in the first email.)");

      location.href =
        "mailto:contact@the777foundation.org?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body.join("\n"));
    });
  }

  async function boot() {
    await inject("site-header", HEADER_URL);
    await inject("site-footer", FOOTER_URL);
    setYear();
    activateNav();
    wireBurger();
    wireMailtoBuilder();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();

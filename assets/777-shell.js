(function () {
  "use strict";

  // Footer year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Active nav link (matches pathname)
  try {
    var path = (window.location.pathname || "/").toLowerCase();
    var links = document.querySelectorAll("[data-nav] a");
    links.forEach(function (a) {
      var href = (a.getAttribute("href") || "").toLowerCase();
      if (!href || href.startsWith("#")) return;
      // simple match on filename
      if (path.endsWith(href) || (href === "index.html" && (path === "/" || path.endsWith("/index.html")))) {
        a.classList.add("active");
      }
    });
  } catch (e) {}

  // Mobile menu
  var burger = document.getElementById("burger");
  var mobile = document.getElementById("mobileNav");
  if (burger && mobile) {
    burger.addEventListener("click", function () {
      var isOpen = mobile.style.display === "block";
      mobile.style.display = isOpen ? "none" : "block";
      burger.setAttribute("aria-expanded", String(!isOpen));
    });
  }

  // Optional mailto builder
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (document.getElementById("name") || {}).value || "";
      var role = (document.getElementById("role") || {}).value || "General";
      var msg  = (document.getElementById("message") || {}).value || "";

      name = String(name).trim();
      role = String(role).trim();
      msg  = String(msg).trim();

      var subject = "The 777 Foundation Society – " + role + " enquiry";
      var bodyParts = [];
      if (name) bodyParts.push("Name: " + name);
      bodyParts.push("Role: " + role);
      if (msg) bodyParts.push("\nSummary:\n" + msg);

      bodyParts.push(
        "\n(Please do not include full names, addresses, or employer identifiers in this first email.)"
      );

      var mailto =
        "mailto:contact@the777foundation.org?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(bodyParts.join("\n"));

      window.location.href = mailto;
    });
  }
})();

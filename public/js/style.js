/* =====================================
    GLOBAL.JS
    - Nav active state
    - Contact open / close
    - Custom cursor
===================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
    NAV ACTIVE STATE (HTML-DRIVEN)
=============================== */

  const currentPage = document.body.dataset.page;

  if (currentPage) {
    document.querySelectorAll('.nav-menu-each').forEach(item => {
      if (item.dataset.page === currentPage) {
        item.classList.add('is-active', 'is-page-active');
      }
    });
  }

  /* ===============================
    CONTACT OPEN / CLOSE
  =============================== */

  const contactOpenBtns = document.querySelectorAll('[data-open="contact"]');
  const contactCloseBtn = document.querySelector('[data-close="contact"]');

  // OPEN
  contactOpenBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      document.body.classList.add("contact-open", "nav-lock");
      setTimeout(focusContact, 50); // wait for animation
    });
  });

  // CLOSE
  if (contactCloseBtn) {
    contactCloseBtn.addEventListener("click", e => {
      e.preventDefault();
      document.body.classList.remove("contact-open", "nav-lock");
    });
  }

  const contactSection = document.getElementById("page-contact");

  function focusContact() {
    if (!contactSection) return;

    const focusable = contactSection.querySelector(
      'a, button, input, textarea, [tabindex]:not([tabindex="-1"])'
    );

    focusable?.focus();
  }

  document.addEventListener("click", e => {
    if (
      document.body.classList.contains("contact-open") &&
      !e.target.closest(".contact-box") &&
      !e.target.closest('[data-open="contact"]')
    ) {
      document.body.classList.remove("contact-open", "nav-lock");
    }
  });

  // ESC to close contact
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && document.body.classList.contains("contact-open")) {
      document.body.classList.remove("contact-open", "nav-lock");
    }
  });

  /* ===============================
     CUSTOM CURSOR
  =============================== */

  const mouseCursor = document.getElementById("mouse_cursor");
  if (!mouseCursor) return;

  let cursorX = 0, cursorY = 0;
  let currentX = 0, currentY = 0;

  function lerp(start, end, t) {
    return start * (1 - t) + end * t;
  }

  function setCursorSize(size) {
    mouseCursor.style.width = `${size}px`;
    mouseCursor.style.height = `${size}px`;
  }

  window.addEventListener("mousemove", e => {
    mouseCursor.style.display = "inline-block";
    cursorX = e.clientX;
    cursorY = e.clientY;
  });

  const hoverTargets = document.querySelectorAll(
    "a, button, label, i, .hover-trigger"
  );

  hoverTargets.forEach(el => {
    el.addEventListener("mouseenter", e => {
      const text = e.target.closest("[data-text]")?.dataset.text || "";
      mouseCursor.textContent = text;
      setCursorSize(120);
      el.style.cursor = "pointer";
    });

    el.addEventListener("mouseleave", () => {
      mouseCursor.textContent = "";
      setCursorSize(25);
      el.style.cursor = "default";
    });

    el.addEventListener("click", () => {
      mouseCursor.style.transform += " scale(0.85)";
      setTimeout(() => {
        mouseCursor.style.transform =
          mouseCursor.style.transform.replace(" scale(0.85)", "");
      }, 80);
    });
  });

  function animateCursor() {
    currentX = lerp(currentX, cursorX, 0.08);
    currentY = lerp(currentY, cursorY, 0.08);
    mouseCursor.style.transform =
      `translate(calc(-50% + ${currentX}px), calc(-90% + ${currentY}px))`;
    requestAnimationFrame(animateCursor);
  }

  animateCursor();
});
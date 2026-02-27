/* =====================================
    GLOBAL.JS
    - Nav active state
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
      mouseCursor.style.transform += "scale(0.85)";
      setTimeout(() => {
        mouseCursor.style.transform =
          mouseCursor.style.transform.replace("scale(0.85)", "");
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
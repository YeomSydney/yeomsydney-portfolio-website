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

  /* ---------- helpers ---------- */
  function lerp(start, end, t) {
    return start * (1 - t) + end * t;
  }

  function setCursorText(text = "") {
    mouseCursor.textContent = text;
  }

  function setDefaultCursor() {
    mouseCursor.classList.remove("is-hover", "has-text");
    setCursorText("");
    mouseCursor.style.width = "16px";
    mouseCursor.style.height = "16px";
    mouseCursor.style.padding = "0";

  }

  function setHoverCursor(text) {
    mouseCursor.classList.add("is-hover");

    if (text) {
      mouseCursor.classList.add("has-text");
      setCursorText(text);
      // auto width based on text
      mouseCursor.style.width = "auto";
      mouseCursor.style.height = "auto";
      mouseCursor.style.padding = "6px 10px";
    } else {
      mouseCursor.classList.remove("has-text");
      setCursorText("");
      mouseCursor.style.width = "16px";
      mouseCursor.style.height = "16px";
      mouseCursor.style.padding = "0";
    }
  }

  /* ---------- mouse move ---------- */
  window.addEventListener("mousemove", e => {
    mouseCursor.style.display = "flex";
    cursorX = e.clientX;
    cursorY = e.clientY;
  });

  /* ---------- hover targets ---------- */
  const hoverTargets = document.querySelectorAll(
    "a, button, [role='button'], .hover-trigger"
  );

  hoverTargets.forEach(el => {
    el.addEventListener("mouseenter", e => {
      const text = e.target.closest("[data-text]")?.dataset.text || "";
      setHoverCursor(text);
    });

    el.addEventListener("mouseleave", () => {
      setDefaultCursor();
    });

    el.addEventListener("click", () => {
      mouseCursor.style.transform += " scale(0.9)";
      setTimeout(() => {
        mouseCursor.style.transform =
          mouseCursor.style.transform.replace(" scale(0.9)", "");
      }, 0);
    });
  });

  /* ---------- smooth follow ---------- */
  function animateCursor() {
    currentX = lerp(currentX, cursorX, 0.22);
    currentY = lerp(currentY, cursorY, 0.22);

    mouseCursor.style.transform =
      `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  /* ---------- init ---------- */
  setDefaultCursor();
});
/* =====================================
    GLOBAL.JS
    - Page/Section Reveal Effects
    - Nav active state
      - Colour Change (Whole:Footer)
    - Custom cursor
===================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- reveal system ---------- */
  function revealElements(selector, options = {}) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    /* --- instant reveal --- */
    if (options.instant) {
      elements.forEach(element => {
        requestAnimationFrame(() => {
          element.classList.add("is-visible");
        });
      });

      return;
    }

    /* --- scroll reveal --- */
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");

            observer.unobserve(entry.target);
          }
        });
      },

      {
        threshold: options.threshold || 0.15
      }
    );

    elements.forEach(element => {
      observer.observe(element);
    });
  }

  /* ---------- hero reveal ---------- */
  revealElements(
    ".hero-top-desc, .hero-top-name",
    { instant: true }
  );

  /* ---------- about reveal ---------- */
  revealElements(
    ".about-myself-wrapper, .about-myself-desc-wrapper",
    { threshold: 0.25 }
  );

  /* ---------- casestudy reveal ---------- */
  revealElements(
    ".casestudy-title h3, .casestudy-details, .casestudy-container-right-3c",
    { threshold: 0.25 }
  );

  /* ---------- footer/contact reveal ---------- */
  revealElements(
    ".footer-container-top, .footer-container-bottom",
    { threshold: 0.25 }
  );

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
    mouseCursor.style.width = "18px";
    mouseCursor.style.height = "18px";
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
      mouseCursor.style.width = "26px";
      mouseCursor.style.height = "26px";
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
  document.addEventListener("mouseenter", e => {
    const target = e.target.closest(
      "a, button, [role='button'], .hover-trigger"
    );

    if (!target) return;

    const text = target.dataset.text || "";

    setHoverCursor(text);
  }, true);

  document.addEventListener("mouseleave", e => {
    const target = e.target.closest(
      "a, button, [role='button'], .hover-trigger"
    );

    if (!target) return;
    setDefaultCursor();

  }, true);

  document.addEventListener("click", e => {
    const target = e.target.closest(
      "a, button, [role='button'], .hover-trigger"
    );

    if (!target) return;
    mouseCursor.style.transform += " scale(0.9)";

    setTimeout(() => {
      mouseCursor.style.transform =
        mouseCursor.style.transform.replace(
          " scale(0.9)",
          ""
        );
    }, 0);
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

  /* ---------- footer observer ---------- */
  const footer = document.querySelector("footer");

  if (footer) {
    const footerObserver = new IntersectionObserver (

      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            document.body.classList.add("footer-active");
            mouseCursor.style.backgroundColor =
              "var(--color-cursor-ft)";
          } else {
            document.body.classList.remove("footer-active");

            mouseCursor.style.backgroundColor =
              "var(--color-cursor)";
          }
        });
      },
      {
        threshold: 0.35
      }
    );

    footerObserver.observe(footer);
  }

  /* ---------- init ---------- */
  setDefaultCursor();
});
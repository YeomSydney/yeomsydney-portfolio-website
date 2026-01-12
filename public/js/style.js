// === Set 'Home' Active by Default if None Set ===
const anyActive = document.querySelector('[data-page].nav-active, [data-page].selected');
if (!anyActive) {
  document.querySelectorAll('[data-page="home"]').forEach((el) =>
    el.classList.add('nav-active', 'selected')
  );
}

// === Toggle View Buttons ===
const worksBox = document.querySelector('.hero-extra-works-box');
const viewButtons = document.querySelectorAll('.works-view-toggle button');

viewButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    worksBox.classList.add("changing");

    setTimeout(() => {
      // 1. Reset buttons
      viewButtons.forEach(b => {
        b.classList.remove('active');
        b.classList.remove('label-open');
      });

      // 2. Activate clicked button
      btn.classList.add('active');
      btn.classList.add('label-open');

      // 3. Toggle view
      const view = btn.dataset.view;
      worksBox.classList.toggle("list", view === "list");
      worksBox.classList.toggle("gallery", view === "gallery");

      worksBox.classList.remove("changing");
    }, 200);
  });
});

// === Casestudy BG ===
document.querySelectorAll('.casestudy-each-list').forEach(item => {
  const img = item.querySelector('img');
  if (!img) return;

  item.style.setProperty('--bg-image', `url(${img.src})`);
});

// === Hovering Effect (Sliding in + out) ===
document.querySelectorAll('.allProjectThumbnails').forEach(box => {
  let isAnimating = false;

  box.addEventListener('mouseenter', () => {
    if (isAnimating) return;

    box.classList.remove('is-leaving');
    box.classList.add('is-resetting');

    requestAnimationFrame(() => {
      box.classList.remove('is-resetting');
      box.classList.add('is-hovered');
    });
  });

  box.addEventListener('mouseleave', () => {
    if (isAnimating) return;
    isAnimating = true;

    box.classList.remove('is-hovered');
    box.classList.add('is-leaving');

    box.addEventListener(
      'transitionend',
      () => {
        isAnimating = false;
      },
      { once: true }
    );
  });
});

// === Snapping Effect ===
const sections = document.querySelectorAll('.work-gallery-each-box .casestudy-each-list');
let isSnapping = false;
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        entry.target.classList.remove('snapped');
        return;
      }

      isSnapping = true;

      requestAnimationFrame(() => {
        if (!entry.target.classList.contains('snapped')) {
          entry.target.classList.add('snapped');
          entry.target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });

      // release lock slightly after scroll finishes
      setTimeout(() => {
        isSnapping = false;
      }, 600);
    });
  },
  {
    root: null,
    threshold: 0.15,              // triggers earlier = smoother
    rootMargin: '0px 0px -30% 0px' // makes snapping feel natural
  }
);

sections.forEach(section => observer.observe(section));



// === Open Case Studies & Cursor ===
document.addEventListener("DOMContentLoaded", function () {

  /* === NAV LOGIC (FINAL) === */
  const navItems = document.querySelectorAll(".nav-menu-each");
  const contactItem = document.querySelector('[data-page="contact"]');

  let currentPage = "home";

  /* Set page-active state */
  function setPage(page) {
    navItems.forEach(item => {
      item.classList.remove("is-page-active");
      item.classList.remove("is-active");

      if (item.dataset.page === page) {
        item.classList.add("is-page-active");
        item.classList.add("is-active");
      }
    });

    currentPage = page;
  }

  /* Contact open */
  function openContact() {
    document.body.classList.add("nav-lock");
    contactItem.classList.add("is-active");
  }

  /* Contact close */
  function closeContact() {
    document.body.classList.remove("nav-lock");
    contactItem.classList.remove("is-active");

    // restore page highlight (home/about stays full opacity)
    navItems.forEach(item => {
      if (item.dataset.page === currentPage) {
        item.classList.add("is-active");
      }
    });
  }

  /* Initial page */
  setPage("home");

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const page = item.dataset.page;

      if (page === "contact") {
        openContact();
        return;
      }

      setPage(page);
    });
  });

  /* Expose close hook for modal */
  window.closeContactNav = closeContact;

  // === Toggle ===
  document.querySelectorAll('.cs-imgbox-textbox-span-box-2').forEach(box => {
    box.addEventListener('click', () => {
      box.classList.toggle('desc-active');
    });
  });

  document.querySelectorAll('.define-detail-box-each').forEach(box => {
    box.addEventListener('click', () => {
      box.classList.toggle('define-active');
    });
  });

  document.querySelectorAll('.casestudy-each-step-details-box').forEach(box => {
    box.addEventListener('click', () => {
      box.classList.toggle('active');
    });
  });

  /* ================================
    1. CASESTUDY INTERACTIONS
  ================================= */

  const casestudyButtons = document.querySelectorAll(".casestudy-each-list");

  casestudyButtons.forEach(button => {
    const targetClass = button.getAttribute("data-target");

    // Hover (only visual / cursor-related logic)
    button.addEventListener("mouseenter", () => {
      button.classList.add("is-hovered");
    });

    button.addEventListener("mouseleave", () => {
      button.classList.remove("is-hovered");
    });

    // Click → open casestudy
    button.addEventListener("click", (e) => {
      e.preventDefault();
      if (!targetClass) return;

      const cs = document.querySelector(`.${targetClass}`);
      if (!cs) return;

      cs.classList.add("page-open");
      updateCaseStudyUI();
      cs.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  /* ================================
    2. CUSTOM CURSOR
  ================================= */

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

  window.addEventListener("mousemove", (e) => {
    mouseCursor.style.display = "inline-block";
    cursorX = e.clientX;
    cursorY = e.clientY;
  });

  const hoverElements = document.querySelectorAll(
    "a, button, label, i, .hover-trigger, .casestudy-each-list, .casestudy-each-step-details-box-title"
  );

  hoverElements.forEach(el => {
    el.addEventListener("mouseenter", (e) => {
      const text = e.target.closest("[data-text]")?.getAttribute("data-text") || "";
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
        mouseCursor.style.transform = mouseCursor.style.transform.replace(" scale(0.85)", "");
      }, 80);
    });
  });

  function animateCursor() {
    currentX = lerp(currentX, cursorX, 0.08);
    currentY = lerp(currentY, cursorY, 0.08);
    mouseCursor.style.transform = `translate(calc(-50% + ${currentX}px), calc(-90% + ${currentY}px))`;
    requestAnimationFrame(animateCursor);
  }

  animateCursor();
});




const goBackWrapper = document.querySelector('.goback-btn-wrapper');
const behanceBtn = document.querySelector('.behance-btn');
const caseStudies = document.querySelectorAll('.casestudy-item');

function updateCaseStudyUI() {
  const activePage = document.querySelector('.casestudy-item.page-open');

  // show / hide go-back buttons
  goBackWrapper.style.display = activePage ? 'flex' : 'none';

  // update behance link
  if (activePage && activePage.dataset.behance) {
    behanceBtn.href = activePage.dataset.behance;
  } else {
    behanceBtn.href = '#';
  }
}

// initial state
updateCaseStudyUI();

// close casestudy
function closeCaseStudy(page) {
  if (!page) return;

  // Add closing class to trigger CSS transition
  page.classList.add('closing');

  // After transition ends, remove page-open & closing
  page.addEventListener('transitionend', function handler() {
    page.classList.remove('page-open', 'closing');
    page.removeEventListener('transitionend', handler);
    updateCaseStudyUI(); // update buttons and Behance link
  });
}

// Example: bind close button
const closeBtn = document.querySelector('.close-page-btn');
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    const activePage = document.querySelector('.casestudy-item.page-open');
    closeCaseStudy(activePage);
  });
}

document.querySelector('[data-open="contact"]')?.addEventListener('click', () => {
  document.getElementById('nav-toggle3').checked = true;
});

document.querySelector('.contact-close-btn')?.addEventListener('click', () => {
  contactBtn.classList.remove('is-active');
  if (lastActivePage) lastActivePage.classList.add('is-active');
});

// Close all project views when nav toggles are clicked
['nav-toggle1', 'nav-toggle2', 'nav-toggle4'].forEach(id => {

  const navToggle = document.getElementById(id);
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      document.querySelectorAll('.casestudy-item').forEach(el => {
        el.classList.remove('page-open');
      });

      document.querySelector('.mobileNavBox')?.classList.remove('is-active');
    });
  }
});




// === Open Individual Pages ===
function openPage(pageClass) {
  // Close any open CaseStudy pages first
  document.querySelectorAll('.casestudy-item.page-open').forEach(el => {
    el.classList.remove('page-open');
  });

  // Scroll main page container to top
  const page = document.querySelector(pageClass);
  if (page) {
    // Ensure page is visible first (CSS should handle visibility)
    page.scrollTop = 0;          // immediately set scroll top
    page.scrollTo({ top: 0, behavior: 'smooth' }); // smooth fallback
  }

  // Also scroll body/document just in case
  window.scrollTo({ top: 0, behavior: 'auto' });
}

// === Bind nav toggles ===
document.querySelectorAll("#nav-toggle1, #nav-toggle2").forEach(toggle => {
  toggle.addEventListener("click", (e) => {
    const targetPage = toggle.id === "nav-toggle1" ? "#page-about" : "#page-projects";
    openPage(targetPage);

    toggle.checked = true; // Set input checked state

    document.querySelector('.mobileNavBox')?.classList.remove('is-active'); // Close mobile nav if open
  });
});

// === Service Worker ===
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}
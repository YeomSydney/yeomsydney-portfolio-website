// === Toggle ===
document.querySelectorAll('.casestudy-each-step-details-box').forEach(box => {
  box.addEventListener('click', () => {
    box.classList.toggle('active');
  });
});

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


// === Set 'Home' Active by Default if None Set ===
const anyActive = document.querySelector('[data-page].nav-active, [data-page].selected');
if (!anyActive) {
  document.querySelectorAll('[data-page="home"]').forEach((el) =>
    el.classList.add('nav-active', 'selected')
  );
}


const worksBox = document.querySelector('.hero-extra-works-box');
const viewButtons = document.querySelectorAll('.works-view-toggle button');

viewButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    worksBox.classList.add("changing");

    setTimeout(() => {
      viewButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const view = btn.dataset.view;

      worksBox.classList.toggle("compact", view === "compact");
      worksBox.classList.toggle("list", view === "list");
      worksBox.classList.toggle("gallery", view == "gallery");

      worksBox.classList.remove("changing");
    }, 200);
  });
});



// Back to top, 1000ms
document.body.addEventListener("click", (e) => {
  const btn = e.target.closest(".gotop-btn");
  if (!btn) return;

  e.preventDefault();

  // If you're using Lenis/Locomotive etc., call their API instead
  if (window.lenis?.scrollTo) {
    window.lenis.scrollTo(0, { duration: 1.4, easing: t => 1 - Math.pow(1 - t, 3) });
    return;
  }

  const scroller = getScrollableAncestor(btn) || document.scrollingElement || document.documentElement;
  animateToTop(scroller, 1000, easeOutCubic);
});

function getScrollableAncestor(el) {
  let p = el.parentElement;
  while (p) {
    const s = getComputedStyle(p);
    const canScrollY = (s.overflowY === "auto" || s.overflowY === "scroll") && p.scrollHeight > p.clientHeight;
    if (canScrollY) return p;
    p = p.parentElement;
  }
  return null;
}

function animateToTop(container, duration = 1000, easing = t => t) {
  const start = container.scrollTop;
  const startTime = performance.now();

  function frame(now) {
    const t = Math.min((now - startTime) / duration, 1);
    const eased = easing(t);
    container.scrollTop = start * (1 - eased);
    if (t < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}



document.addEventListener("DOMContentLoaded", () => {
  const pages = {
    home: "nav-toggle2",
    about: "nav-toggle1"
  };

  function navigate(page) {
    if (!(page in pages)) {
      console.warn("Page not found:", page);
      window.location.href = "/";
      return;
    }

    // Close any open CaseStudy pages first
    document.querySelectorAll('.casestudy-item.page-open').forEach(cs => {
      cs.classList.remove('page-open');
    });

    // Set the correct input state
    const targetInput = document.getElementById(pages[page]);
    if (targetInput) targetInput.checked = true;

    // Update URL hash without reloading
    window.location.hash = page === "home" ? "" : `#/${page}`;

    // Scroll Home/About pages to top if needed
    const pageId = page === "home" ? "page-projects" : page === "about" ? "page-about" : null;
    if (pageId) {
      const pageEl = document.getElementById(pageId);
      pageEl?.scrollTo({ top: 0, behavior: "auto" });
    }
  }

  // Bind nav link clicks
  document.querySelectorAll("[data-url]").forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      navigate(el.dataset.url);
    });
  });

  // Handle hash changes/back-forward navigation
  window.addEventListener("hashchange", () => {
    const hashPage = location.hash.replace("#/", "") || "home";
    if (hashPage in pages) {
      navigate(hashPage);
    } else {
      window.location.href = "/";
    }
  });

  // Initial page load
  const initialPage = location.hash.replace("#/", "") || "home";
  navigate(initialPage);

  // Enable page transitions AFTER initial load
  const allPages = document.querySelectorAll("#page-about, #page-projects");
  allPages.forEach(page => {
    // force browser to compute style first
    page.offsetHeight; // triggers reflow
    page.style.transition = "transform 0.5s ease, opacity 0.5s ease";
  });

  // Reveal Scroll Effect
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target); // reveal once
        }
      });
    },
    {
      threshold: 0.2, // 20% visible before triggering
    }
  );

  reveals.forEach(section => {
    observer.observe(section);
  });
});




// Open Case Studies
document.addEventListener("DOMContentLoaded", function () {

  // === 1. Hero Background & Loop ===
  const layers = [
    document.querySelector(".bg-layer.layer1"),
    document.querySelector(".bg-layer.layer2")
  ];

  // Only hero lists with data-bg for looping
  const heroButtons = Array.from(document.querySelectorAll(".casestudy-each-list[data-bg]"));
  const projectTypeEl = document.querySelector(".project-type");

  let currentIndex = 0;
  let topLayer = 0;
  let intervalId;

  function setActiveButton(index) {
    heroButtons.forEach(btn => btn.querySelector("a")?.classList.remove("active-text"));
    const currentLink = heroButtons[index].querySelector("a");
    if (currentLink) currentLink.classList.add("active-text");
    projectTypeEl.textContent = heroButtons[index].getAttribute("data-type");
  }

  function switchBg(index) {
    currentIndex = index;
    const nextImage = heroButtons[index].getAttribute("data-bg");
    const bottomLayer = topLayer;
    topLayer = 1 - topLayer;

    layers[topLayer].style.backgroundImage = `url(${nextImage})`;
    layers[topLayer].classList.add("active");
    layers[bottomLayer].classList.remove("active");

    setActiveButton(index);
  }

  function startLoop() {
    intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % heroButtons.length;
      switchBg(currentIndex);
    }, 3500);
  }

  // Initial setup
  layers[topLayer].style.backgroundImage = `url(${heroButtons[0].getAttribute("data-bg")})`;
  layers[topLayer].classList.add("active");
  layers.forEach(layer => layer.style.cursor = "pointer");
  setActiveButton(0);
  startLoop();

  // === Hover & Click on Hero Buttons ===
  heroButtons.forEach((button, index) => {
    const targetClass = button.getAttribute("data-target");

    button.addEventListener("mouseenter", () => {
      clearInterval(intervalId);
      switchBg(index);
    });

    button.addEventListener("mouseleave", () => {
      startLoop();
    });

    button.addEventListener("click", (e) => {
      e.preventDefault();
      const cs = document.querySelector(`.${targetClass}`);
      if (cs) cs.classList.add("page-open");
    });
  });

  // === Click on Background Layers ===
  layers.forEach(layer => {
    layer.addEventListener("click", () => {
      const targetClass = heroButtons[currentIndex].getAttribute("data-target");
      const cs = document.querySelector(`.${targetClass}`);
      if (cs) {
        cs.classList.add("page-open");
        // Scroll the CaseStudy to top
        cs.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  // === 2. Custom Cursor ===
  const mouseCursor = document.getElementById("mouse_cursor");
  let cursorX = 0, cursorY = 0, currentX = 0, currentY = 0;

  function lerp(start, end, t) { return start * (1 - t) + end * t; }
  function styling(s) {
    mouseCursor.style.width = `${s}px`;
    mouseCursor.style.height = `${s}px`;
  }

  window.addEventListener("mousemove", (e) => {
    mouseCursor.style.display = "inline-block";
    cursorX = e.clientX;
    cursorY = e.clientY;
  });

  const hoverElements = document.querySelectorAll(
    "a, label, button, i, .hover-trigger, .thumb, .displayedImage, .bg-layer, .casestudy-each-list, .casestudy-each-step-details-box-title, .cs-imgbox-textbox-span-box-2-title, .define-detail-box-each"
  );

  hoverElements.forEach(el => {
    el.addEventListener("mouseover", (e) => {
      let text = e.target.closest("[data-text]")?.getAttribute("data-text");
      if (el.classList.contains("bg-layer")) text = heroButtons[currentIndex].getAttribute("data-text");
      styling(120);
      mouseCursor.textContent = text || "";
      el.style.cursor = "pointer";
    });
    el.addEventListener("mouseleave", () => {
      mouseCursor.textContent = "";
      styling(25);
      el.style.cursor = "default";
    });
    el.addEventListener("click", () => {
      mouseCursor.style.transform = `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px)) scale(0.85)`;
      setTimeout(() => {
        mouseCursor.style.transform = `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px)) scale(1)`;
      }, 80);
    });
  });

  function animateCursor() {
    currentX = lerp(currentX, cursorX, 0.05);
    currentY = lerp(currentY, cursorY, 0.05);
    const currentScale = mouseCursor.style.transform.includes("scale(0.85)") ? "scale(0.85)" : "scale(1)";
    mouseCursor.style.transform = `translate(calc(-80% + ${currentX}px), calc(-80% + ${currentY}px)) ${currentScale}`;
    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // === 3. Attach click to ALL casestudy-each-list ===
  const allCaseStudyButtons = document.querySelectorAll(".casestudy-each-list");
  allCaseStudyButtons.forEach(btn => {
    const targetClass = btn.getAttribute("data-target");
    if (!targetClass) return;

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const cs = document.querySelector(`.${targetClass}`);
      if (cs) cs.classList.add("page-open");
      cs?.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

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

// observe class changes on all case study pages
caseStudies.forEach(page => {
  new MutationObserver(updateCaseStudyUI)
    .observe(page, { attributes: true, attributeFilter: ['class'] });
});

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
closeBtn.addEventListener('click', () => {
  const activePage = document.querySelector('.casestudy-item.page-open');
  closeCaseStudy(activePage);
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




// Open Individual Pages
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

// Bind nav toggles
document.querySelectorAll("#nav-toggle1, #nav-toggle2").forEach(toggle => {
  toggle.addEventListener("click", (e) => {
    const targetPage = toggle.id === "nav-toggle1" ? "#page-about" : "#page-projects";
    openPage(targetPage);

    // Set input checked state
    toggle.checked = true;

    // Close mobile nav if open
    document.querySelector('.mobileNavBox')?.classList.remove('is-active');
  });
});


// Footer 2025 Copyright
function fitTextToPaddingBox() {
  const container = document.querySelector('.footer-credit');
  const el = container?.querySelector('.copyright-year');
  if (!container || !el) return;

  // Measure natural text width at a baseline size inside the same container
  const clone = el.cloneNode(true);
  clone.style.cssText = `
    position:absolute; visibility:hidden; white-space:nowrap;
    font-size:10px; line-height:1; margin:0; padding:0;
    left:0; top:0;
  `;
  container.appendChild(clone);
  const naturalWidth = clone.getBoundingClientRect().width;
  clone.remove();

  // Available inner width = border-box width minus horizontal padding
  const cs = getComputedStyle(container);
  const containerWidth = container.getBoundingClientRect().width;
  const innerWidth = containerWidth
    - parseFloat(cs.paddingLeft || 0)
    - parseFloat(cs.paddingRight || 0);

  // Scale font size proportionally
  const newFontSize = 10 * (innerWidth / naturalWidth);
  el.style.fontSize = `${newFontSize}px`;
}

window.addEventListener('load', fitTextToPaddingBox);
window.addEventListener('resize', fitTextToPaddingBox);
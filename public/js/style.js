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




// Toggle View Buttons
const worksBox = document.querySelector('.hero-extra-works-box');
const viewButtons = document.querySelectorAll('.works-view-toggle button');

viewButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    worksBox.classList.add("changing");

    setTimeout(() => {
      // 1. Reset buttons
      viewButtons.forEach(b => {
        b.classList.remove('active');
        b.classList.remove('label-open'); // 👈 key
      });

      // 2. Activate clicked button
      btn.classList.add('active');
      btn.classList.add('label-open'); // 👈 only THIS keeps space

      // 3. Toggle view
      const view = btn.dataset.view;
      worksBox.classList.toggle("list", view === "list");
      worksBox.classList.toggle("gallery", view === "gallery");

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



// URL
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




document.querySelectorAll('.casestudy-each-list').forEach(item => {
  const img = item.querySelector('img');
  if (!img) return;

  item.style.setProperty('--bg-image', `url(${img.src})`);
});




// ====== Hovering Effect (Sliding in + out) ======
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




const sections = document.querySelectorAll('.work-gallery-each-box .casestudy-each-list');

let isSnapping = false;

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || isSnapping) return;

      isSnapping = true;

      requestAnimationFrame(() => {
        entry.target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
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




// Open Case Studies
document.addEventListener("DOMContentLoaded", function () {

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
    "a, button, label, i, .hover-trigger, .casestudy-each-list"
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
    mouseCursor.style.transform = `translate(calc(-70% + ${currentX}px), calc(-70% + ${currentY}px))`;
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
  const containers = document.querySelectorAll('.footer-container');

  containers.forEach(container => {
    const el = container.querySelector('.footer-credit-bottom h4');
    if (!el) return;

    // Clone for measurement
    const clone = el.cloneNode(true);
    clone.style.cssText = `
      position:absolute;
      visibility:hidden;
      white-space:nowrap;
      font-size:10px;
      line-height:1;
      margin:0;
      padding:0;
      left:0;
      top:0;
    `;

    container.appendChild(clone);
    const naturalWidth = clone.getBoundingClientRect().width;
    clone.remove();

    if (!naturalWidth) return;

    const cs = getComputedStyle(container);
    const containerWidth = container.getBoundingClientRect().width;

    const innerWidth =
      containerWidth -
      parseFloat(cs.paddingLeft || 0) -
      parseFloat(cs.paddingRight || 0);

    const newFontSize = 10 * (innerWidth / naturalWidth);
    el.style.fontSize = `${newFontSize}px`;
  });
}

window.addEventListener('load', fitTextToPaddingBox);
window.addEventListener('resize', fitTextToPaddingBox);




// Real time & Weather
document.addEventListener("DOMContentLoaded", () => {
  const timeEl = document.getElementById("footer-time");
  const weatherEl = document.getElementById("footer-weather");

  // ---------- TIME ----------
  function updateTime() {
    const now = new Date();

    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    const utcOffset = now.getTimezoneOffset() / -60;
    const utcSign = utcOffset >= 0 ? "+" : "-";
    const utcString = `UTC${utcSign}${Math.abs(utcOffset)}`;

    timeEl.textContent = `${hours}:${minutes} ${ampm} (${utcString})`;
  }

  updateTime();
  setInterval(updateTime, 1000);

  // ---------- WEATHER ----------
  const apiKey = '238d581aaca901802a77a9d5cd72f8c5';
  const lat = 43.7;     // Toronto
  const lon = -79.4;
  const units = 'metric';

  function getWeatherEmoji(condition) {
    switch (condition) {
      case 'Clear': return '☀️';
      case 'Clouds': return '☁️';
      case 'Rain': return '🌧️';
      case 'Drizzle': return '🌦️';
      case 'Thunderstorm': return '⛈️';
      case 'Snow': return '❄️';
      case 'Mist':
      case 'Fog':
      case 'Haze': return '🌫️';
      default: return '🌡️';
    }
  }

  async function updateWeather() {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`
      );

      if (!res.ok) throw new Error('Weather API error');

      const data = await res.json();

      const temp = Math.round(data.main.temp);
      const condition = data.weather[0].main;
      const emoji = getWeatherEmoji(condition);

      weatherEl.textContent = `${emoji} ${temp}°C · Toronto`;
    } catch (err) {
      console.error(err);
      weatherEl.textContent = 'Weather unavailable';
    }
  }

  updateWeather();
  setInterval(updateWeather, 10 * 60 * 1000);
});




/* Search */
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("site-search");
  if (!searchInput) return;

  const pages = {
    home: { inputId: "nav-toggle2", name: "Home", pageId: "page-projects" },
    about: { inputId: "nav-toggle1", name: "About", pageId: "page-about" },
    contact: { inputId: "nav-toggle3", name: "Contact", pageId: "page-contact" },
    branding: { inputId: "nav-toggle-branding", name: "Branding", pageId: "page-branding" },
    uxui: { inputId: "nav-toggle-uxui", name: "UX/UI", pageId: "page-uxui" }
  };

  // Create modal
  let searchModal = document.createElement("div");
  searchModal.className = "search-modal";
  document.body.appendChild(searchModal);

  // Close modal on click
  searchModal.addEventListener("click", () => {
    searchModal.classList.remove("active");
  });

  function getMessage(query) {
    if (!query) return "";

    const matchedKey = Object.keys(pages).find(key => query.includes(key));
    if (matchedKey) {
      return `➡ Will go to ${pages[matchedKey].name} page`;
    } else if (query === "404") {
      return "⚠ Will go to 404 page";
    } else {
      return `🌍 Will search Google for "${query}"`;
    }
  }

  function navigate(query) {
    const matchedKey = Object.keys(pages).find(key => query.includes(key));
    if (matchedKey) {
      const page = pages[matchedKey];

      // Close any open CaseStudy pages
      document.querySelectorAll('.casestudy-item.page-open').forEach(cs => cs.classList.remove('page-open'));

      // Check input if exists
      const targetInput = document.getElementById(page.inputId);
      if (targetInput) targetInput.checked = true;

      // Update hash
      window.location.hash = matchedKey === "home" ? "" : `#/${matchedKey}`;

      // Scroll page to top
      const pageEl = document.getElementById(page.pageId);
      pageEl?.scrollTo({ top: 0, behavior: "auto" });
    } else if (query === "404") {
      window.location.href = "404.html";
    } else {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
    }
  }

  // Real-time preview as user types
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    const message = getMessage(query);

    if (message) {
      searchModal.textContent = message;
      searchModal.classList.add("active");
    } else {
      searchModal.classList.remove("active");
    }
  });

  // Execute navigation on Enter
  searchInput.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;

    const query = searchInput.value.toLowerCase().trim();
    if (!query) return;

    navigate(query);

    // Clear input
    searchInput.value = "";

    // Hide modal after navigation
    searchModal.classList.remove("active");
  });
});
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
    home: {
      toggle: "nav-toggle2",
      section: "page-projects",
      path: "/"
    },
    about: {
      toggle: "nav-toggle1",
      section: "page-about",
      path: "/about"
    }
  };

  /* -----------------------------
      CORE NAVIGATION
  ----------------------------- */

  function navigate(page, push = true) {
    if (!(page in pages)) {
      navigate("home");
      return;
    }

    // Close any open case studies
    document.querySelectorAll(".casestudy-item.page-open").forEach(el =>
      el.classList.remove("page-open")
    );

    // Toggle correct page
    const toggleInput = document.getElementById(pages[page].toggle);
    if (toggleInput) toggleInput.checked = true;

    // Update URL
    if (push) {
      history.pushState({ page }, "", pages[page].path);
    }

    // Scroll to top of page
    const section = document.getElementById(pages[page].section);
    section?.scrollTo({ top: 0, behavior: "auto" });
  }

  /* -----------------------------
      URL → PAGE
  ----------------------------- */

  function getPageFromURL() {
    const path = window.location.pathname.replace("/", "");
    return path === "about" ? "about" : "home";
  }

  /* -----------------------------
      NAV LINK CLICKS
  ----------------------------- */

  document.querySelectorAll("[data-url]").forEach(el => {
    el.addEventListener("click", e => {
      e.preventDefault();
      navigate(el.dataset.url);
    });
  });

  /* -----------------------------
      BACK / FORWARD
  ----------------------------- */

  window.addEventListener("popstate", e => {
    const page = e.state?.page || getPageFromURL();
    navigate(page, false);
  });

  /* -----------------------------
      INITIAL LOAD
  ----------------------------- */

  navigate(getPageFromURL(), false);

  /* -----------------------------
      ENABLE TRANSITIONS AFTER LOAD
  ----------------------------- */

  document.querySelectorAll("#page-about, #page-projects").forEach(page => {
    page.offsetHeight; // force reflow
    page.style.transition = "transform 0.5s ease, opacity 0.5s ease";
  });

  /* -----------------------------
      REVEAL ON SCROLL
  ----------------------------- */

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
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
  const input = document.getElementById("site-search");
  const modal = document.getElementById("search-preview-modal");
  const preview = modal.querySelector(".search-preview-text");

  if (!input || !modal || !preview) return;

  /* ------------------------------
      DATA
  ------------------------------ */

  const items = [
    {
      type: "page",
      label: "Home",
      slug: "home",
      keywords: ["home", "hero"],
      open: () => {
        document.getElementById("nav-toggle2")?.click();
        history.replaceState(null, "", "#/");
        scrollToTop("page-projects");
        closeAllCases();
      }
    },
    {
      type: "page",
      label: "About",
      slug: "about",
      keywords: ["about", "about me", "education", "experience", "work experience"],
      open: () => {
        document.getElementById("nav-toggle1")?.click();
        history.replaceState(null, "", "#/about");
        scrollToTop("page-about");
        closeAllCases();
      }
    },

    {
      type: "case",
      label: "Gentle Dazs",
      slug: "gentle-dazs",
      selector: ".casestudy-item-13",
      keywords: ["gentle dazs", "gentledazs", "gentle", "dazs", "ice cream", "sunglasses", "glasses", "branding", "product", "package", "packaging", "logo"],
      open: () => openCase(".casestudy-item-13", "gentle-dazs")
    },
    {
      type: "case",
      label: "Trace Toronto",
      slug: "trace-toronto",
      selector: ".casestudy-item-14",
      keywords: ["trace toronto", "tracetoronto", "trace", "toronto", "city", "dashboard", "app", "branding", "uxui", "ux/ui", "logo"],
      open: () => openCase(".casestudy-item-14", "trace-toronto")
    },
    {
      type: "case",
      label: "Lights of Seoul",
      slug: "lights-of-seoul",
      selector: ".casestudy-item-12",
      keywords: ["lights of seoul", "lightsofseoul", "lights", "seoul", "festival", "lantern", "multiculture", "branding", "uxui", "ux/ui", "logo"],
      open: () => openCase(".casestudy-item-12", "lights-of-seoul")
    },
    {
      type: "case",
      label: "I Wasn’t There",
      slug: "i-wasnt-there",
      selector: ".casestudy-item-2",
      keywords: ["i wasn't there", "iwasn'tthere", "i was not", "book", "booklet", "editorial", "typography", "poem", "mono", "type"],
      open: () => openCase(".casestudy-item-2", "i-wasnt-there")
    }
  ];

  const funResponses = [
    /* -----------------------------
        GREETINGS / CASUAL
    ----------------------------- */
    { triggers: ["hello", "hi", "hey"], message: ["Hi there 👋 Search anything!"] },
    { triggers: ["howdy"], message: ["Howdy 🤠"] },
    { triggers: ["good morning", "morning", "coffee", "breakfast"], message: ["Good morning ☀️"] },
    { triggers: ["good afternoon", "afternoon", "lunch"], message: ["Good afternoon. Time flies!"] },
    { triggers: ["good evening", "evening", "night", "dinner", "good night"], message: ["Late night browsing? 🌙"] },
    { triggers: ["sleep", "sleep sydney", "go to bed"], message: ["Go to bed too! 😴"] },

    /* -----------------------------
        PERSONAL / ABOUT SYDNEY
    ----------------------------- */
    { triggers: ["sydney", "sydney yeom", "seunghyeon", "yeom", "염승현", "승현"], message: ["Yes, Sydney is here. She’s busy designing 🖌️"] },
    { triggers: ["who made this"], message: ["Guess who! 😎"] },
    { triggers: ["who are you"], message: ["I'm Sydney's search assistant! 😎"] },
    { triggers: ["are you human"], message: ["Depends on how you define human 🤔"] },
    { triggers: ["what are you hiding"], message: ["Shh… nothing 🤫"] },
    { triggers: ["secret", "what is your secret", "what's your secret"], message: ["Tell me yours first, then I’ll tell you 😏"] },
    { triggers: ["what do you do", "job", "what's your job", "what are you doing"], message: ["I'm a search assistant 💃"] },

    /* -----------------------------
        FUN / MOOD
    ----------------------------- */
    { triggers: ["cool", "nice", "awesome", "amazing", "fabulous", "sick"], message: ["You think so? Thanks!"] },
    { triggers: ["wow", "whoa", "woah", "ooo"], message: ["I take it as a compliment!"] },
    { triggers: ["meow", "miaow", "purr", "cat", "kitty"], message: ["Purrrr 🐈‍⬛🐾"] },
    { triggers: ["bark", "dog", "puppy", "woof"], message: ["Woof Woof 🐕 🐾"] },
    { triggers: ["shit"], message: ["🫢😧"] },
    { triggers: ["fuck", "fuck you"], message: ["abcdefu 🎵"] },
    { triggers: ["pretty", "beautiful", "you're pretty"], message: ["Thank you 🫶"] },
    { triggers: ["bestie", "friend", "friends", "best friends"], message: ["🫵🤝"] },

    /* -----------------------------
        COFFEE / FOOD
    ----------------------------- */
    { triggers: ["coffee", "expresso"], message: ["Go tell Sydney your favourite coffee shop ☕️"] },
    { triggers: ["starbucks"], message: ["Yes, my favourite ☕✨"] },
    { triggers: ["tim hortons", "tims", "horton", "hortons"], message: ["Iced capp with croissant for all seasons 🥐"] },
    { triggers: ["no coffee", "no starbucks"], message: ["Can’t take it! I need coffee 🫠"] },

    /* -----------------------------
        HOLIDAYS / SEASONS
    ----------------------------- */
    { triggers: ["happy new year", "new year", "2026"], message: ["Happy New Year! 🎉"] },
    { triggers: ["2025"], message: ["Hope your 2025 was amazing! 💫"] },
    { triggers: ["merry christmas", "christmas", "x-mas"], message: ["Merry Christmas! 🎄🎅"] },

    /* -----------------------------
        PORTFOLIO / PROJECT
    ----------------------------- */
    { triggers: ["portfolio", "website"], message: ["You’re already here! Enjoy!"] },
    { triggers: ["project", "work", "casestudy", "case study"], message: ["Sydney’s favourites are Gentle Dazs & Trace Toronto ✨"] },
    { triggers: ["help"], message: ["Try searching for home, about, or project names (e.g. Gentle Dazs)."] },

    /* -----------------------------
        PLAYFUL / RANDOM
    ----------------------------- */
    { triggers: ["yes"], message: ["Say no 😏"] },
    { triggers: ["no"], message: ["Say yes 😏"] },
    { triggers: ["okay"], message: ["👌"] },
    { triggers: ["what"], message: ["Hmm? Need help?"] },
    { triggers: ["you"], message: ["Yes, you 🫵"] },
    { triggers: ["?"], message: ["Fingers crossed 🤞"] },
    { triggers: ["!"], message: ["‼️🫢"] },
    { triggers: ["."], message: ["Yes, period."] },
  ];

  /* ------------------------------
      HELPERS
  ------------------------------ */
  const normalize = str => str.toLowerCase().trim();
  let selectedIndex = -1; // For arrow key selection
  let currentMatches = [];

  function show(content) {
    preview.innerHTML = content;
    modal.classList.add("active");
  }

  function hide() {
    modal.classList.remove("active");
    preview.innerHTML = "";
    selectedIndex = -1;
  }

  function findFun(query) {
    return funResponses.find(f => f.triggers.some(t => query.includes(t)));
  }

  function findMatches(query) {
    return items.filter(item =>
      item.keywords.some(k => k.startsWith(query) || k === query)
    );
  }

  function buildSilhouette(query, firstKeyword) {
    const rest = firstKeyword.slice(query.length);
    return `<div class="search-preview">
              <span class="typed">${query}</span>
              <span class="silhouette">${rest}</span>
            </div>`;
  }

  function scrollToTop(pageId) {
    document.getElementById(pageId)?.scrollTo({ top: 0, behavior: "auto" });
  }

  function closeAllCases() {
    document.querySelectorAll(".casestudy-item.page-open").forEach(el => el.classList.remove("page-open"));
    history.replaceState(null, "", "#/");
  }

  function openCase(selector, slug) {
    closeAllCases();
    const el = document.querySelector(selector);
    if (el) el.classList.add("page-open");
    history.replaceState(null, "", "#/" + slug);
  }

  /* ------------------------------
      INPUT REAL-TIME
  ------------------------------ */
  input.addEventListener("input", () => {
    const query = normalize(input.value);
    selectedIndex = -1;

    if (!query) {
      show("Search anything…");
      return;
    }

    const fun = findFun(query);
    if (fun) {
      const msg = Array.isArray(fun.message) ? fun.message[Math.floor(Math.random() * fun.message.length)] : fun.message;
      show(msg);
      return;
    }

    currentMatches = findMatches(query).sort((a, b) => a.label.localeCompare(b.label));

    if (currentMatches.length) {
      const firstKeyword = currentMatches[0].keywords.find(k => k.startsWith(query)) || query;
      const silhouetteHtml = buildSilhouette(query, firstKeyword);

      const hintsHtml = currentMatches
        .map((item, idx) => `<div class="preview-hint" data-index="${idx}">↳ ${item.label}</div>`)
        .join("");

      show(`${silhouetteHtml}${hintsHtml}`);
      return;
    }

    show(`<div>${query}</div><div class="search-engine">Search on Google</div>`);
  });

  /* ------------------------------
      CLICK ON HINT
  ------------------------------ */
  preview.addEventListener("click", e => {
    const hint = e.target.closest(".preview-hint");
    if (!hint) return;
    const idx = parseInt(hint.dataset.index);
    if (!isNaN(idx)) currentMatches[idx].open();
    input.value = "";
    hide();
  });

  /* ------------------------------
      ARROW KEYS + ENTER
  ------------------------------ */
  input.addEventListener("keydown", e => {
    if (currentMatches.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % currentMatches.length;
      updateHighlight();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + currentMatches.length) % currentMatches.length;
      updateHighlight();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0) {
        currentMatches[selectedIndex].open();
        input.value = "";
        hide();
      } else if (currentMatches.length) {
        currentMatches[0].open();
        input.value = "";
        hide();
      }
    }
  });

  function updateHighlight() {
    preview.querySelectorAll(".preview-hint").forEach((el, idx) => {
      if (idx === selectedIndex) el.classList.add("highlighted");
      else el.classList.remove("highlighted");
    });
  }

  /* ------------------------------
      OPEN / RESTORE FROM HASH
  ------------------------------ */
  function openFromHash() {
    const slug = location.hash.replace("#/", "");
    if (!slug || slug === "") return closeAllCases();
    const match = items.find(i => i.slug === slug);
    if (!match) return closeAllCases();
    match.open();
  }

  window.addEventListener("load", openFromHash);
  window.addEventListener("popstate", openFromHash);

  /* ------------------------------
      CLOSE BUTTON FOR CASES
  ------------------------------ */
  document.querySelectorAll(".goback-btn-wrapper .close-page-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      closeAllCases();
    });
  });

  /* ------------------------------
      SHORTCUTS
  ------------------------------ */
  window.addEventListener("keydown", e => {
    const isMac = navigator.platform.includes("Mac");
    const cmdK = isMac ? e.metaKey : e.ctrlKey;

    if ((cmdK && e.key === "k") || e.key === "/") {
      e.preventDefault();
      input.focus();
      show("Type to search…");
    }

    if (e.key === "Escape") {
      input.blur();
      hide();
    }
  });

  modal.addEventListener("click", hide);
});
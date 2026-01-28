/* ------------------------------
    SCROLL TO TOP BUTTON
------------------------------ */
document.body.addEventListener("click", (e) => {
    const btn = e.target.closest(".gotop-btn");
    if (!btn) return;

    e.preventDefault();
    scrollToTop();
});

/* ------------------------------
    AUTO SCROLL TO TOP WHEN SPA OPENS PAGE
------------------------------ */
export function scrollToTop() {
    // If using Lenis smooth scrolling
    if (window.lenis?.scrollTo) {
        window.lenis.scrollTo(0, { duration: 1.4, easing: t => 1 - Math.pow(1 - t, 3) });
        return;
    }

    // Fallback: manual smooth scroll
    const scroller = document.scrollingElement || document.documentElement || document.body;
    animateToTop(scroller, 1000, easeOutCubic);
}

/* ------------------------------
    HELPERS
------------------------------ */
function animateToTop(container, duration = 1000, easing = t => t) {
    const start = container.scrollTop;
    const startTime = performance.now();

    function frame(now) {
        const t = Math.min((now - startTime) / duration, 1);
        container.scrollTop = start * (1 - easing(t));
        if (t < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

/* ------------------------------
    EXPORT FOR SEARCH.JS USAGE
------------------------------ */
window.scrollToTop = scrollToTop;

/* ------------------------------
    GO TOP VISIBILITY
------------------------------ */
const goTopBtn = document.querySelector(".gotop-btn");

if (goTopBtn) {
    const toggleGoTop = () => {
        if (window.scrollY > 300) {
            goTopBtn.classList.add("is-visible");
        } else {
            goTopBtn.classList.remove("is-visible");
        }
    };

    toggleGoTop();
    window.addEventListener("scroll", toggleGoTop);
}
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
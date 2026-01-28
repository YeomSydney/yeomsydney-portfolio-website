// reveal.js
document.addEventListener("DOMContentLoaded", () => {
    // IntersectionObserver to trigger reveal animation
    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    revealObserver.unobserve(entry.target); // animate only once
                }
            });
        },
        { threshold: 0.2 } // trigger when 20% of element is visible
    );

    // Observe all elements with class 'reveal'
    document.querySelectorAll(".reveal").forEach(el => {
        revealObserver.observe(el);
    });
});
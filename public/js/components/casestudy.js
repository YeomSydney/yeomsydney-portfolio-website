/* =====================================
    CASESTUDY ENHANCE
    - Thumbnail background sync
    - Hover effects
    - Snap scrolling
    - Expand / collapse steps
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
        BG IMAGE FROM IMG → CSS VAR
    =============================== */

    document.querySelectorAll('.casestudy-each-list').forEach(item => {
        const img = item.querySelector('img');
        if (!img) return;

        item.style.setProperty('--bg-image', `url(${img.src})`);
    });

    /* ===============================
        HOVER SLIDE EFFECT
    =============================== */

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

    /* ===============================
       SNAP SCROLLING
    =============================== */

    const sections = document.querySelectorAll(
        '.work-gallery-each-box .casestudy-each-list'
    );

    if (sections.length) {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        entry.target.classList.remove('snapped');
                        return;
                    }

                    requestAnimationFrame(() => {
                        if (!entry.target.classList.contains('snapped')) {
                            entry.target.classList.add('snapped');
                            entry.target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    });
                });
            },
            {
                root: null,
                threshold: 0.15,
                rootMargin: '0px 0px -30% 0px'
            }
        );

        sections.forEach(section => observer.observe(section));
    }

    /* ===============================
        STEP TOGGLE (DETAILS)
    =============================== */

    document
        .querySelectorAll('.casestudy-each-step-details-box')
        .forEach(box => {
            box.addEventListener('click', () => {
                box.classList.toggle('active');
            });
        });

});
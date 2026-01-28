/* =====================================
    GALLERY VIEW TOGGLE
    - List / Gallery switch
===================================== */

document.addEventListener("DOMContentLoaded", () => {
    const worksBox = document.querySelector('.hero-extra-works-box');
    const viewButtons = document.querySelectorAll('.works-view-toggle button');

    if (!worksBox || !viewButtons.length) return;

    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            worksBox.classList.add("changing");

            setTimeout(() => {
                // reset buttons
                viewButtons.forEach(b => {
                    b.classList.remove('active', 'label-open');
                });

                // activate current
                btn.classList.add('active', 'label-open');

                // toggle layout
                const view = btn.dataset.view;
                worksBox.classList.toggle('list', view === 'list');
                worksBox.classList.toggle('gallery', view === 'gallery');

                worksBox.classList.remove("changing");
            }, 200);
        });
    });
});
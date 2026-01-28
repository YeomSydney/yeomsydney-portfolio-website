document.addEventListener("DOMContentLoaded", () => {
    const archiveSection = document.getElementById("page-archive");
    const archiveButtons = document.querySelectorAll(".casestudy-each-list");
    const backBtn = document.querySelector(".goback-btn");

    if (!archiveSection) return;

    // OPEN
    archiveButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const isLinkClick = e.target.closest("a");
            if (isLinkClick) return;

            e.preventDefault();

            const targetClass = button.dataset.target;
            if (!targetClass) return;

            const project = document.querySelector(`.${targetClass}`);
            if (!project) return;

            document
                .querySelectorAll(".casestudy-item.page-open")
                .forEach(el => el.classList.remove("page-open"));

            archiveSection.classList.add("is-active");
            project.classList.add("page-open");

            requestAnimationFrame(() => {
                if (window.lenis?.scrollTo) {
                    window.lenis.scrollTo(archiveSection, { duration: 1.2 });
                } else {
                    archiveSection.scrollIntoView({ behavior: "smooth" });
                }
            });
        });
    });

    // CLOSE
    if (!backBtn) return;

    backBtn.addEventListener("click", e => {
        e.preventDefault();

        document
            .querySelectorAll(".casestudy-item.page-open")
            .forEach(el => el.classList.remove("page-open"));

        archiveSection.classList.remove("is-active");
        document.body.classList.remove("archive-open", "nav-lock");

        if (window.lenis?.scrollTo) {
            window.lenis.scrollTo("#archives", { duration: 1.2 });
        } else {
            document
                .getElementById("archives")
                ?.scrollIntoView({ behavior: "smooth" });
        }
    });
});
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
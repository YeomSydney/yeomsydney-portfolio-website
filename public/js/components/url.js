document.addEventListener("DOMContentLoaded", () => {
    const pages = {
        home: {
            toggle: "nav-toggle2",
            section: "page-projects",
            path: "#/",
            seoKey: "home"
        },
        about: {
            toggle: "nav-toggle1",
            section: "page-about",
            path: "#/about",
            seoKey: "about"
        },
        "gentle-dazs": {
            selector: ".casestudy-item-3",
            path: "#/gentle-dazs",
            type: "case",
            seo: {
                title: "Gentle Dazs — Sydney Yeom",
                description: "Gentle Dazs is a branding and packaging case study by Sydney Yeom."
            }
        },
        "trace-toronto": {
            selector: ".casestudy-item-4",
            path: "#/trace-toronto",
            type: "case",
            seo: {
                title: "Trace Toronto — Sydney Yeom",
                description: "Trace Toronto is a UX/UI and branding case study by Sydney Yeom."
            }
        },
        "lights-of-seoul": {
            selector: ".casestudy-item-2",
            path: "#/lights-of-seoul",
            type: "case",
            seo: {
                title: "Lights of Seoul — Sydney Yeom",
                description: "Lights of Seoul is a branding and festival identity case study by Sydney Yeom."
            }
        },
        "i-wasnt-there": {
            selector: ".casestudy-item-0",
            path: "#/i-wasnt-there",
            type: "case",
            seo: {
                title: "I Wasn’t There — Sydney Yeom",
                description: "I Wasn’t There is an editorial and typography-focused book design case study by Sydney Yeom."
            }
        }
    };

    /* -----------------------------
        SEO MAP
    ----------------------------- */

    const SEO_MAP = {
        home: {
            title: "Sydney Yeom — Designer",
            description: "Sydney Yeom is a designer focused on typography, branding, and structured systems."
        },
        about: {
            title: "About — Sydney Yeom",
            description: "About Sydney Yeom, a designer focused on typography, branding, and structured systems."
        },
        cases: {
            "gentle-dazs": {
                title: "Gentle Dazs — Sydney Yeom",
                description: "Gentle Dazs is a branding and packaging case study by Sydney Yeom."
            },
            "trace-toronto": {
                title: "Trace Toronto — Sydney Yeom",
                description: "Trace Toronto is a UX/UI and branding case study by Sydney Yeom."
            },
            "lights-of-seoul": {
                title: "Lights of Seoul — Sydney Yeom",
                description: "Lights of Seoul is a branding and festival identity case study by Sydney Yeom."
            },
            "i-wasnt-there": {
                title: "I Wasn’t There — Sydney Yeom",
                description: "I Wasn’t There is an editorial and typography-focused book design case study by Sydney Yeom."
            }
        }
    };

    /* -----------------------------
        SEO UPDATE
    ----------------------------- */

    function updateSEO({ title, description }) {
        if (title) document.title = title;

        const desc = document.querySelector('meta[name="description"]');
        if (desc && description) {
            desc.setAttribute("content", description);
        }

        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDesc = document.querySelector('meta[property="og:description"]');
        const ogUrl = document.querySelector('meta[property="og:url"]');

        if (ogTitle && title) ogTitle.setAttribute("content", title);
        if (ogDesc && description) ogDesc.setAttribute("content", description);
        if (ogUrl) ogUrl.setAttribute("content", location.href);
    }

    /* -----------------------------
        ROUTING
    ----------------------------- */

    function getPageFromURL() {
        const hash = location.hash.replace("#/", "");
        return hash === "about" ? "about" : "home";
    }

    function navigate(page, push = true) {
        if (!(page in pages)) {
            navigate("home");
            return;
        }

        // Close case studies
        document.querySelectorAll(".casestudy-item.page-open").forEach(el =>
            el.classList.remove("page-open")
        );

        // Toggle page
        const toggle = document.getElementById(pages[page].toggle);
        if (toggle) toggle.checked = true;

        // Update URL
        if (push) {
            history.replaceState({ page }, "", pages[page].path);
        }

        // Scroll reset
        const section = document.getElementById(pages[page].section);
        section?.scrollTo({ top: 0, behavior: "auto" });

        // 🔥 SEO UPDATE HERE (this was missing before)
        const seo = SEO_MAP[pages[page].seoKey];
        if (seo) updateSEO(seo);
    }

    /* -----------------------------
        NAV CLICKS
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
        page.offsetHeight;
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
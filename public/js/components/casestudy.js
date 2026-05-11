/* =====================================
    CASESTUDY ENHANCE
    - Thumbnail background sync
    - Hover effects
    - Snap scrolling
    - Expand / collapse steps
===================================== */

document.addEventListener("DOMContentLoaded", () => {
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
    




    // Casestudy Grid, List, Full Modes.
    const projects = [
        {
            number: "01",
            year: "2026",
            title: "Mellow Ground",
            type: "Casestudy",
            category: "Brand Identity",
            industry: "Cafe/Beverage",
            desc: "Mellow Ground is a café designed as a quiet escape from the noise and fast pace of the city.",
            image: "./public/images/mellowground/MellowGround_CoffeeCan01_Thumbnail.jpg",
            url: "/mellowground/",
            message: "View Casestudy"
        },

        {
            number: "02",
            year: "2026",
            title: "Lazy Donut",
            type: "Casestudy",
            category: "Brand Identity",
            industry: "Cafe/Desserts",
            desc: "Lazy Donut is a donut brand designed for busy students and workers who struggle to take breaks.",
            image: "./public/images/lazydonut/LazyDonut_Menu03.jpg",
            url: "/lazydonut/",
            message: "View Casestudy"
        },

        {
            number: "03",
            year: "2025",
            title: "Trace Toronto",
            type: "Casestudy",
            category: "Campaign Planning",
            industry: "Campaign/City Plan",
            desc: "Trace Toronto is a campaign under the City of Toronto, designed to help residents stay informed about the city’s progress on public initiatives and infrastructure projects.",
            image: "./public/images/tracetoronto/TraceToronto_BannerBillboard02.jpg",
            url: "/trace-toronto/",
            message: "View Casestudy"
        },

        {
            number: "04",
            year: "2026",
            title: "Brass Fork",
            type: "Casestudy",
            category: "Brand Identity",
            industry: "Restaurant/Burger",
            desc: "Brass Fork is a burger house that balances a semi-luxurious experience with a classic, casual, and friendly tone of voice.",
            image: "./public/images/brassfork/BrassFork_Ad.jpg",
            url: "/brassfork/",
            message: "View Casestudy"
        },

        {
            number: "05",
            year: "2025",
            title: "Gentle Dazs",
            type: "Casestudy",
            category: "Brand Identity/Packaging",
            industry: "Fashion/Dessert",
            desc: "Gentle Dazs is a conceptual collaboration between Gentle Monster and Häagen-Dazs, reimagining how a product can engage multiple senses through design.",
            image: "./public/images/gentledazs/GentleDazs_Packages_01.jpg",
            url: "/gentle-dazs/",
            message: "View Casestudy"
        },

        {
            number: "06",
            year: "2026",
            title: "One Spoon",
            type: "Casestudy",
            category: "Brand Identity",
            industry: "Museum",
            desc: "One Spoon is an immersive food museum that explores the relationship between food, dining cultures, and climate.",
            image: "./public/images/onespoon/OneSpoon_Banner03_Building.jpg",
            url: "/onespoon/",
            message: "View Casestudy"
        },
        
        {
            number: "07",
            year: "2025",
            title: "The Favric Expo",
            type: "Casestudy",
            category: "Brand Identity",
            industry: "Exhibition",
            desc: "The Favric Expo is an annual exhibition that celebrates personal identity through fashion and self-expression.",
            image: "./public/images/thefavricexpo/thefabricexpo-binder03.jpg",
            url: "/the-favric-expo/",
            message: "View Casestudy"
        },

        {
            number: "08",
            year: "2024",
            title: "I Wasn't There",
            type: "Casestudy",
            category: "Editorial",
            industry: "Poem Commentary",
            desc: "<I Wasn't There> is a set of two booklets enclosed in a box cover, exploring the themes of absence and existence through two different poems.",
            image: "./public/images/iwasntthere/iwasntthere_Mockup01.jpg",
            url: "/i-wasnt-there/",
            message: "View Casestudy"
        },
        
        {
            number: "09",
            year: "2026",
            title: "Les Petites",
            type: "Coming Soon",
            category: "Brand Identity",
            industry: "Sandwich House",
            desc: "Les Petites is a sandwich house in the United Kingdom run by an elderly couple. They started the business while taking care of their grandchildren and now offer small bites to busy young adults who remind them of their grandchildren.",
            image: "./public/images/coming-soon.jpg",
            url: "/index.html",
            message: "Come Back Later"
        },

        {
            number: "10",
            year: "2026",
            title: "Lights of Seoul",
            type: "Casestudy",
            category: "Brand Identity",
            industry: "Festival",
            desc: "Lights of Seoul is a lantern festival held on Toronto Island that reinterprets Korean cultural traditions within a Canadian context.",
            image: "./public/images/lightsofseoul/Revision_Mockups04.jpg",
            url: "/lightsofseoul/",
            message: "View Casestudy"
        },
    ];




    /* ------------------------------
    PROJECT COUNT + PROJECT LIST
    ------------------------------ */
    const projectList = document.querySelector(".hero-project-list");
    const projectCount = document.querySelector(".project-count");
    const viewMoreBtn = document.querySelector(".hero-casestudy-top-list-btn");

    const INITIAL_VISIBLE = 6;

    let expanded = false;

    function renderProjectList() {
        // auto project count
        projectCount.textContent = `(${projects.length})`;

        // clear list
        projectList.innerHTML = "";

        // visible items
        const visibleProjects = expanded
            ? projects
            : projects.slice(0, INITIAL_VISIBLE);

        visibleProjects.forEach((project, index) => {
            const li = document.createElement("li");

            li.style.opacity = "0";
            li.style.transform = "translateY(10px)";

            li.innerHTML = `
            <a href="${project.url}" data-text="${project.title}">
                <div class="hero-project-list-name">
                    <span>${project.number}</span>
                    <h4>${project.title}</h4>
                </div>

                <div class="hero-project-list-cat">
                    <h4>${project.category}</h4>
                </div>
            </a>
        `;

            projectList.appendChild(li);

            // stagger animation
            setTimeout(() => {
                li.style.transition = "all 0.4s ease";
                li.style.opacity = "1";
                li.style.transform = "translateY(0)";
            }, index * 60);
        });

        // button text
        if (projects.length <= INITIAL_VISIBLE) {
            viewMoreBtn.style.display = "none";
        } else {
            viewMoreBtn.style.display = "block";
            viewMoreBtn.textContent = expanded
                ? "View Less"
                : "View More";
        }
    }

    /* ------------------------------
        VIEW MORE TOGGLE
    ------------------------------ */
    viewMoreBtn.addEventListener("click", () => {
        expanded = !expanded;
        renderProjectList();
    });

    /* ------------------------------
        INIT
    ------------------------------ */
    renderProjectList();




    const layoutRows = [
        [
            "hero-cp-row-1-left",
            "hero-cp-row-1-right"
        ],

        [
            "hero-cp-row-2-left",
            "hero-cp-row-2-right"
        ],

        [
            "hero-cp-row-3-left",
            "hero-cp-row-3-right"
        ],

        [
            "hero-cp-row-4-left",
            "hero-cp-row-4-right"
        ],

        [
            "hero-cp-row-5-left",
            "hero-cp-row-5-right"
        ]

    ];



    /* ------------------------------
    PREVIEW CARD GENERATOR
    ------------------------------ */

    const previewContainer = document.querySelector(".hero-casestudy-previews");

    previewContainer.innerHTML = "";
    let projectIndex = 0;

    layoutRows.forEach((row, rowIndex) => {
        const rowElement = document.createElement("div");
        rowElement.className =
            `hero-casestudy-previews-row hero-cp-row-${rowIndex + 1}`;

        row.forEach(className => {
            const project = projects[projectIndex];
            if (!project) return;
            const card = document.createElement("div");
            card.className =
                `hero-cp-row-each ${className}`;

            card.innerHTML = `
                <a href="${project.url}" class="hero-project-link" data-text="${project.message}">
                    <div class="hero-cp-row-imgbox reveal">
                        <img src="${project.image}" alt="(${project.title})">
                    </div>

                    <div class="grid-layout reveal">
                        <div class="hero-casestudy-previews-info-wrapper">
                            <div class="hero-casestudy-previews-info">
                                <div class="hero-casestudy-previews-info-title">
                                    <div class="hero-cp-each-title">
                                        <h3>${project.title}</h3>
                                    </div>
                                </div>

                                <h4 class="hero-cp-category">${project.category} — ${project.industry}</h4>
                            </div>
                        </div>
                    </div>
                    
                    <div class="list-layout">
                        <div class="hero-cp-list-img">
                            <img src="${project.image}" alt="(${project.title})">
                        </div>

                        <div class="hero-project-list-row hero-project-list-body reveal">
                            <span>${project.year}</span>
                            <h3 class="project-title">${project.title}</h3>
                            <span>${project.category}</span>
                            <span>${project.industry}</span>
                        </div>
                    </div>

                    <div class="full-layout">
                        <div class="hero-casestudy-previews-info-wrapper">
                            <div class="hero-casestudy-previews-info reveal">
                                <div class="hero-casestudy-previews-info-title">
                                    <div class="hero-cp-each-title">
                                        <h3>${project.title}</h3>
                                        <h4>${project.category}</h4>
                                        <p>${project.desc}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="reveal">
                                <span class="full-mode-btn">
                                    <i class="ri-arrow-right-line"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </a>
            `;

            rowElement.appendChild(card);
            projectIndex++;
        });

        previewContainer.appendChild(rowElement);
    });




    /* ------------------------------
    VIEW MODE SWITCHER
    ------------------------------ */

    const viewButtons = document.querySelectorAll(
        ".hero-casestudy-view-mode button"
    );

    /* ------------------------------
FULL MODE SNAP
------------------------------ */

    let fullModeObserver = null;

    function initFullModeSnap() {

        // disconnect old observer
        if (fullModeObserver) {
            fullModeObserver.disconnect();
        }

        const sections = document.querySelectorAll(
            ".hero-casestudy-previews.is-full .hero-cp-row-each"
        );

        if (!sections.length) return;

        fullModeObserver = new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    // SNAP IN
                    if (
                        entry.isIntersecting &&
                        entry.intersectionRatio > 0.45 &&
                        !entry.target.classList.contains("snapped")
                    ) {

                        entry.target.classList.add("snapped");

                        entry.target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                    // RESET
                    if (!entry.isIntersecting) {
                        entry.target.classList.remove("snapped");
                    }

                });

            },

            {
                root: null,
                threshold: [0.45],
                rootMargin: "0px"
            }

        );

        sections.forEach(section => {
            fullModeObserver.observe(section);
        });

    }

    /* ------------------------------
    VIEW SWITCHING
    ------------------------------ */

    viewButtons.forEach(button => {

        button.addEventListener("click", () => {

            const view = button.dataset.view;

            // remove old modes
            previewContainer.classList.remove(
                "is-grid",
                "is-list",
                "is-full"
            );

            // apply new mode
            previewContainer.classList.add(`is-${view}`);

            // active button
            viewButtons.forEach(btn => {
                btn.classList.remove("is-active");
            });

            button.classList.add("is-active");

            // remove body state
            document.body.classList.remove(
                "full-mode-active"
            );

            // FULL MODE
            if (view === "full") {

                document.body.classList.add(
                    "full-mode-active"
                );

                initFullModeSnap();

            }

            // LEAVING FULL MODE
            else {

                if (fullModeObserver) {
                    fullModeObserver.disconnect();
                }

                document.querySelectorAll(
                    ".hero-cp-row-each"
                ).forEach(section => {
                    section.classList.remove("snapped");
                });

            }

        });

    });
});
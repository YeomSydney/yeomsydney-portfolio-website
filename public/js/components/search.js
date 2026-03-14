document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("site-search");
    const modal = document.getElementById("search-preview-modal");
    const preview = modal.querySelector(".search-preview-text");

    let lastFocusedElement = null;

    if (!input || !modal || !preview) return;

    /* ------------------------------
        DATA
    ------------------------------ */
    const items = [
        {
            label: "Home",
            keywords: ["home"],
            url: "/"
        },
        {
            label: "About",
            keywords: ["about", "about me"],
            url: "/about"
        },
        {
            label: "Contact",
            keywords: ["contact", "co", "con"],
            url: "/contact"
        },
        {
            label: "Desire Art Museum",
            keywords: ["desire", "art", "museum", "branding"],
            url: "/desire-art-museum"
        },
        {
            label: "The Favric Expo",
            keywords: ["favric", "the favric", "the", "expo"],
            url: "/the-favric-expo"
        },
        {
            label: "Gentle Dazs",
            keywords: ["gentle dazs", "branding", "packaging"],
            url: "/gentle-dazs"
        },
        {
            label: "Trace Toronto",
            keywords: ["trace", "toronto", "ux", "app"],
            url: "/trace-toronto"
        },
        {
            label: "Lights of Seoul",
            keywords: ["lights", "seoul", "festival"],
            url: "/lights-of-seoul"
        },
        {
            label: "I Wasn’t There",
            keywords: ["i wasn't there", "book", "typography"],
            url: "/i-wasnt-there"
        }
    ];

    const funResponses = [
        { triggers: ["hello", "hi", "hey"], message: ["Hi there 👋 Search anything!"] },
        { triggers: ["howdy"], message: ["Howdy 🤠"] },
        { triggers: ["good morning", "morning", "coffee", "breakfast"], message: ["Good morning ☀️"] },
        { triggers: ["good afternoon", "afternoon", "lunch"], message: ["Good afternoon. Time flies!"] },
        { triggers: ["good evening", "evening", "night", "dinner", "good night"], message: ["Late night browsing? 🌙"] },
        { triggers: ["sleep", "sleep sydney", "go to bed"], message: ["Go to bed too! 😴"] },
        { triggers: ["sydney", "sydney yeom", "seunghyeon", "yeom", "염승현", "승현"], message: ["Yes, Sydney is here. She’s busy designing 🖌️"] },
        { triggers: ["who made this"], message: ["Guess who! 😎"] },
        { triggers: ["who are you"], message: ["I'm Sydney's search assistant! 😎"] },
        { triggers: ["are you human"], message: ["Depends on how you define human 🤔"] },
        { triggers: ["what are you hiding"], message: ["Shh… nothing 🤫"] },
        { triggers: ["secret", "what is your secret", "what's your secret"], message: ["Tell me yours first, then I’ll tell you 😏"] },
        { triggers: ["what do you do", "job", "what's your job", "what are you doing"], message: ["I'm a search assistant 💃"] },
        { triggers: ["cool", "nice", "awesome", "amazing", "fabulous", "sick"], message: ["You think so? Thanks!"] },
        { triggers: ["wow", "whoa", "woah", "ooo"], message: ["I take it as a compliment!"] },
        { triggers: ["meow", "miaow", "purr", "cat", "kitty"], message: ["Purrrr 🐈‍⬛🐾"] },
        { triggers: ["bark", "dog", "puppy", "woof"], message: ["Woof Woof 🐕 🐾"] },
        { triggers: ["shit"], message: ["🫢😧"] },
        { triggers: ["pretty", "beautiful"], message: ["Thank you 🫶"] },
        { triggers: ["bestie", "friend", "friends", "best friends"], message: ["🫵🤝"] },
        { triggers: ["coffee", "expresso"], message: ["Go tell Sydney your favourite coffee shop ☕️"] },
        { triggers: ["starbucks"], message: ["Yes, my favourite ☕✨"] },
        { triggers: ["tim hortons", "tims", "horton", "hortons"], message: ["Iced capp with croissant for all seasons 🥐"] },
        { triggers: ["no coffee", "no starbucks"], message: ["Can’t take it! I need coffee 🫠"] },
        { triggers: ["happy new year", "new year", "2026"], message: ["Happy New Year! 🎉"] },
        { triggers: ["2025"], message: ["Hope your 2025 was amazing! 💫"] },
        { triggers: ["merry christmas", "christmas", "x-mas"], message: ["Merry Christmas! 🎄🎅"] },
        { triggers: ["portfolio", "website"], message: ["You’re already here! Enjoy!"] },
        { triggers: ["project", "work", "casestudy", "case study"], message: ["Sydney’s favourites are Gentle Dazs & Trace Toronto ✨"] },
        { triggers: ["help"], message: ["Try searching for home, about, or project names (e.g. Gentle Dazs)."] },
        { triggers: ["yes"], message: ["😏"] },
        { triggers: ["no"], message: ["😏"] },
        { triggers: ["okay"], message: ["👌"] },
        { triggers: ["what"], message: ["Need help?"] },
        { triggers: ["you"], message: ["Yes, you 🫵"] },
        { triggers: ["?"], message: ["Fingers crossed 🤞"] },
        { triggers: ["!"], message: ["‼️🫢"] },
        { triggers: ["."], message: ["Yes, period."] },
        { triggers: ["email"], message: ["Contact me via yeomsydney@gmail.com!"] },
        { triggers: ["linkedin", "li"], message: ["Find me @sydney-yeom in LinkedIn!"] },
        { triggers: ["instagram", "ins"], message: ["Find me @theissue.xyz in Instagram!"] },
    ];

    /* ------------------------------
        HELPERS
    ------------------------------ */
    function goTo(url) {
        window.location.href = url;
    }

    const normalize = str => str.toLowerCase().trim();
    let selectedIndex = -1;
    let currentMatches = [];

    function show(content) {
        if (!modal.classList.contains("active")) {
            lastFocusedElement = document.activeElement;
        }
        preview.innerHTML = content;
        modal.classList.add("active");
    }

    function hide() {
        modal.classList.remove("active");
        preview.innerHTML = "";
        selectedIndex = -1;

        if (lastFocusedElement) {
            lastFocusedElement.focus();
            lastFocusedElement = null;
        }
    }

    function findFun(query) {
        return funResponses.find(f => f.triggers.some(t => query.includes(t)));
    }

    function findMatches(query) {
        return items.filter(item =>
            item.keywords.some(k => k.startsWith(query))
        );
    }

    function buildSilhouette(query, firstKeyword) {
        const rest = firstKeyword.slice(query.length);
        return `<div class="search-preview">
                <span class="typed">${query}</span>
                <span class="silhouette">${rest}</span>
            </div>`;
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
        if (hint) {
            const idx = parseInt(hint.dataset.index);
            if (!isNaN(idx)) goTo(currentMatches[idx].url);
            input.value = "";
            hide();
            return;
        }

        if (e.target.closest(".search-engine")) {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(input.value)}`, "_blank");
            input.value = "";
            hide();
        }
    });

    /* ------------------------------
        ARROW KEYS + ENTER
    ------------------------------ */
    input.addEventListener("keydown", e => {
        const query = normalize(input.value);

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

            // Check arrow selection first
            if (selectedIndex >= 0 && currentMatches[selectedIndex]) {
                goTo(currentMatches[selectedIndex].url);
            }
            else {
                // Check for partial or exact matches
                const matches = items.filter(item =>
                    item.keywords.some(k => k.startsWith(query) || k === query)
                );
                if (matches.length > 0) {
                    goTo(matches[0].url);
                }
                else {
                    // Nothing matches → Google
                    window.open(`https://www.google.com/search?q=${encodeURIComponent(input.value)}`, "_blank");
                }
            }

            input.value = "";
            hide();
        }
    });

    function updateHighlight() {
        preview.querySelectorAll(".preview-hint").forEach((el, idx) => {
            if (idx === selectedIndex) el.classList.add("highlighted");
            else el.classList.remove("highlighted");
        });
    }

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
            hide();
        }
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) hide();
    });
});
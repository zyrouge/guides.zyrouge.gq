const HTML = require("node-html-parser");
const HTMLOptions = { pre: true, script: true, style: true };
const bulmaColors = ["dark", "info", "link", "primary", "warning", "success", "danger"];

module.exports = ({ template, content, divID, navbar, footer, config }) => (new Promise((resolve, reject) => {
    const parsed = HTML.parse(template, HTMLOptions);

    const title = parsed.querySelector("title");
    title.set_content(content.meta.title);

    const titleDiv = parsed.querySelector("#title");
    const titleOG = parsed.querySelector("#og-title");
    if (titleDiv) titleDiv.set_content(content.meta.title);
    if (titleOG) titleOG.setAttribute("content", content.meta.title);

    const descriptionDiv = parsed.querySelector("#description");
    const descriptionOG = parsed.querySelector("#og-description");
    const descriptionMeta = parsed.querySelector("#meta-desc");
    if (titleDiv && content.meta.description) descriptionDiv.set_content(content.meta.description);
    if (descriptionOG && content.meta.description) descriptionOG.setAttribute("content", content.meta.description);
    if (descriptionMeta && content.meta.description) descriptionMeta.setAttribute("content", content.meta.description);

    const robotsMeta = parsed.querySelector("#meta-robots");
    const googleMeta = parsed.querySelector("#meta-google");
    const keywordsMeta = parsed.querySelector("#meta-keywords");
    if (robotsMeta && content.meta.tags) robotsMeta.setAttribute("content", `${content.meta.tags}, ${content.meta.description}`);
    if (googleMeta && content.meta.tags) googleMeta.setAttribute("content", `${content.meta.tags}, ${content.meta.description}`);
    if (keywordsMeta && content.meta.tags) keywordsMeta.setAttribute("content", `${content.meta.tags}, ${content.meta.description}`);

    const heroDiv = parsed.querySelector("#hero");
    const imageOG = parsed.querySelector("#og-image");
    if (heroDiv) heroDiv.setAttribute("src", content.meta.image || "/assets/images/placeholder-4by3.png");
    if (imageOG) imageOG.setAttribute("content", content.meta.image || "/assets/images/placeholder-4by3.png");

    const contentDiv = parsed.querySelector(`#${divID}`);
    if (!contentDiv) reject("No Content Div");
    contentDiv.set_content(content.body, HTMLOptions);

    /* Default Bulma Classes */
    contentDiv.querySelectorAll("pre").forEach(div => {
        const previousStyle = div.getAttribute("style") || "";
        div.setAttribute("style", `background-color: #1C1D21; margin-bottom: 2rem; ${previousStyle}`);
    });
    contentDiv.querySelectorAll("table").forEach(div => {
        const previousClasses = div.getAttribute("class") || "";
        div.setAttribute("class", `table is-fullwidth ${previousClasses}`);
    });
    contentDiv.querySelectorAll("h1").forEach(div => {
        const previousClasses = div.getAttribute("class") || "";
        div.setAttribute("class", `subtitle is-1  is-spaced ${previousClasses}`);
    });
    contentDiv.querySelectorAll("h2").forEach(div => {
        const previousClasses = div.getAttribute("class") || "";
        div.setAttribute("class", `subtitle is-2  is-spaced ${previousClasses}`);
        attachAnchor(div);
    });
    contentDiv.querySelectorAll("h3").forEach(div => {
        const previousClasses = div.getAttribute("class") || "";
        div.setAttribute("class", `subtitle is-3  is-spaced ${previousClasses}`);
    });
    contentDiv.querySelectorAll("h4").forEach(div => {
        const previousClasses = div.getAttribute("class") || "";
        div.setAttribute("class", `subtitle is-4  is-spaced ${previousClasses}`);
    });
    contentDiv.querySelectorAll("h5").forEach(div => {
        const previousClasses = div.getAttribute("class") || "";
        div.setAttribute("class", `subtitle is-5  is-spaced ${previousClasses}`);
    });
    contentDiv.querySelectorAll("h6").forEach(div => {
        const previousClasses = div.getAttribute("class") || "";
        div.setAttribute("class", `subtitle is-6  is-spaced ${previousClasses}`);
    });
    contentDiv.querySelectorAll("button").forEach(div => {
        const previousClasses = div.getAttribute("class") || "";
        div.setAttribute("class", `button is-light ${previousClasses}`);
    });
    contentDiv.querySelectorAll("pre").forEach(div => {
        const previousClasses = div.getAttribute("class") || "";
        div.setAttribute("class", `${previousClasses} mt-3`);
    });

    /* Hints */
    contentDiv.querySelectorAll(".admonition").forEach(div => {
        const prevHintContent = div.querySelectorAll("p").filter(tags => !tags.classNames.includes("admonition-title"));
        const prevHintContext = prevHintContent.join("").replace(/(<p>|<\/p>)/g, "");
        const newContent =
            `<br>` +
            `<article class="message is-${getBulmaColor(div.classNames[1])}">` +
                `<div class="message-body">` +
                    prevHintContext +
                `</div>` +
            `</article>`;
        div.set_content(newContent);
    });

    if (config) {
        if (navbar && config.navbar.divID) {
            const navbarDiv = parsed.querySelector(`#${config.navbar.divID}`);
            if (!navbarDiv) reject("No NavBar Div");
            navbarDiv.set_content(navbar);
        }

        if (footer && config.footer.divID) {
            const footerDiv = parsed.querySelector(`#${config.footer.divID}`);
            if (!footerDiv) reject("No Footer Div");
            footerDiv.set_content(footer);
        }
    }

    const rendered = parsed.toString();
    resolve(rendered);
}));

function getBulmaColor(color) {
    return (color && bulmaColors.includes(color.toLowerCase()) ? color.toLowerCase() : "primary");
}

function getTitleAnchor(title) {
    return (title.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-"));
}

function attachAnchor(div) {
    const previousContent = div.innerHTML || "";
    if (previousContent) {
        const encodedTitle = getTitleAnchor(previousContent);
        div.set_content(`<a class="title-anchor" href="#${encodedTitle}" id="${encodedTitle}">#</a> ${previousContent}`);
    }
    return div;
}
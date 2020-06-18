const markdownIt = require("markdown-it");
const meta = require("markdown-it-meta");
const attr = require("markdown-it-attrs");
// const container = require("markdown-it-container");
const admonition = require("markdown-it-admonition");
const bulmaColors = ["dark", "info", "link", "primary", "warning", "success", "danger"];

module.exports = (markdownContent, env) => (new Promise((resolve, reject) => {
    const markdown = new markdownIt({
        html: true
    });

    /* Plugins */
    markdown.use(meta);
    markdown.use(attr);
    markdown.use(admonition, {
        types: ["hint", ...bulmaColors]
    });
    // markdown.use(container, 'hint', {
    //     validate: function (params) {
    //         return params.trim().match(/^hint\s+(.*)$/);
    //     },
    //     render: function (tokens, idx) {
    //         var m = tokens[idx].info.trim().match(/^hint\s+(.*)$/);

    //         if (tokens[idx].nesting === 1) {
    //             // opening tag
    //             return (
    //                 '<article class="message is-link"><div class="message-body">' +
    //                 md.utils.escapeHtml(m[1]) +
    //                 '</div>\n'
    //             );

    //         } else {
    //             // closing tag
    //             return '</article>\n';
    //         }
    //     }
    // });

    /* Render */
    const renderedMarkdown = markdown.render(markdownContent, env);
    resolve({
        meta: markdown.meta,
        body: renderedMarkdown,
        env
    });
}));
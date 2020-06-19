$(async function () {
    const recommendationsSnippet = $("#recommendations");
    const recommendationsBox = $("#recommendations-box");
    const routes = (await (await fetch("/assets/routes.json")).json()).map(route => {
        const nRoutes = route;
        nRoutes.tags = route.tags.split(",").map(t => t.trim());
        return nRoutes;
    });
    if (recommendationsBox) {
        const searchPosts = new Fuse(routes, {
            includeScore: true,
            keys: [
                {
                    name: "title",
                    weight: 3
                }, {
                    name: "description",
                    weight: 2
                }, {
                    name: "tags",
                    weight: 2
                }, {
                    name: "route",
                    weight: 1
                }, {
                    name: "writtenAt",
                    weight: 1
                }
            ]
        });

        // Search
        const searchInput = $("#recommendations-search");
        refreshPosts();
        if(searchInput) searchInput.on("change keyup paste", function () {
            refreshPosts();
        });
        function refreshPosts() {
            const searchTerms = searchInput && searchInput.val() ? searchInput.val().toLowerCase() : false;
            const resultPosts = searchTerms ? searchPosts.search(searchTerms) : false;
            recommendationsBoxHTML(recommendationsBox, searchTerms && resultPosts && resultPosts.length ? resultPosts.sort((a, b) => a.score - b.score).map(x => x.item) : routes);
        }
    }
    if (recommendationsSnippet) {
        recommendationsSnippet.html("");
        const shuffled = [...routes];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i)
            const temp = shuffled[i]
            shuffled[i] = shuffled[j]
            shuffled[j] = temp
        }
        const postsLimit = routes.length > 4 ? 4 : routes.length;
        for (let i = 0; i < postsLimit; i++) {
            const post = shuffled[i];
            recommendationsSnippet.append(
                `<div class="column is-3">` +
                    getCard(post, true) +
                `</div>`
            );
        }
    }
});

function recommendationsBoxHTML (recommendationsBox, routes) {
    recommendationsBox.html("");
    const chunked = chunk([...routes], 4);
    const columns = [];
    chunked.forEach(chunke => {
        const column = [];
        chunke.forEach(post => {
            column.push(
                `<div class="column is-3" id="post-box">` +
                getCard(post) +
                `</div>`
            );
        });
        columns.push(column.join(""));
    });
    const append = routes.length ? columns.map(col => `<div class="columns">${col}</div>`).join("") : "<p class='title is-5'>No results were found.</p>";
    recommendationsBox.append(append);
}

function chunk (array, size) {
    const chunked_arr = [];
    let copied = [...array];
    const numOfChild = Math.ceil(copied.length / size);
    for (let i = 0; i < numOfChild; i++) {
        chunked_arr.push(copied.splice(0, size));
    }
    return chunked_arr;
}

function getCard (post, small = false) {
    return (
        `<div class="card">` +
            `<div class="card-image">` +
                `<figure class="image is-4by3">` +
                    `<img src="${post.image || "/assets/images/placeholder-4by3.png"}" alt="Preview">` +
                `</figure>` +
            `</div>` +
            `<div class="card-content" id="post-content">` +
                `<p class="title is-${small ? "5" : "4"}" style="margin-bottom: 10px;" id="post-content-title">${post.title}</p>` +
                `<p class="title is-6" id="post-content-description">${post.description ? (String(post.description).length > 60 ? post.description.substr(0, 57) + "..." : post.description) : ""}</p>` +
                `${post.tags
                    ?   `<div class="tags">` +
                            post.tags.map(tag => `<span class="tag">${tag}</span>`).join("") +
                        `</div>`
                    :   ""}` +
                `${post.writtenAt ? `<p class="subtitle" style="font-size: 12px;">Written on ${new Date(Date.parse(post.writtenAt)).toLocaleString() || "-"}</p>` : ""}` +
            `</div>` +
            `<footer class="card-footer">` +
                `<p class="card-footer-item">` +
                    `<span>` +
                        `<a href="${post.route}">Read</a>` +
                    `</span>` +
                `</p>` +
            `</footer>` +
        `</div>`
    );
}
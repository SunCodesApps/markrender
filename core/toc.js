class Toc {

    static build(article) {

        const sidebar = document.getElementById("md-sidebar");

        if (!sidebar)
            return;

        const headings = [
            ...article.querySelectorAll("h1,h2,h3,h4,h5,h6")
        ];

        if (headings.length < 2) {
            sidebar.style.display = "none";
            return;
        }

        sidebar.innerHTML = "";

        const title = document.createElement("h2");
        title.textContent = "Table of Contents";
        title.className = "md-toc-title";

        sidebar.appendChild(title);

        const nav = document.createElement("nav");
        nav.className = "md-toc";

        headings.forEach(h => {

            const level = Number(h.tagName.substring(1));

            const a = document.createElement("a");

            a.href = "#" + h.id;
            a.textContent = h.textContent;

            a.className = `level-${level}`;

            nav.appendChild(a);

        });

        sidebar.appendChild(nav);

        sidebar.style.display = "block";

    }

}
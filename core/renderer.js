class Renderer {

  static extractMarkdown() {

    return document.body.innerText;

  }


  static slug(text) {

    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  }


  static addHeadingIds(article) {

    const used = new Set();

    article.querySelectorAll("h1,h2,h3,h4,h5,h6")
      .forEach((h) => {

        let id = this.slug(h.textContent);

        if (!id)
          id = "section";

        let n = 2;

        while (used.has(id)) {
          id = `${id}-${n++}`;
        }

        used.add(id);

        h.id = id;

      });

  }


  static highlight(article) {

    if (typeof hljs === "undefined")
      return;


    article.querySelectorAll("pre code")
      .forEach((code) => {

        hljs.highlightElement(code);

      });

  }


  static buildLayout(html) {

    return `
      <div id="md-toolbar">

  <div class="toolbar-left">
    <button 
      id="md-toggle-toc"
      title="Toggle table of contents"
      aria-label="Toggle table of contents">

      <svg id="md-toc-icon-active" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <rect x="2" y="3" width="20" height="18" rx="4" fill="none" stroke="#ffffff" stroke-width="2" />
        <line x1="9" y1="3" x2="9" y2="21" stroke="#ffffff" stroke-width="2" stroke-linecap="round" />
        <line x1="2" y1="9" x2="9" y2="9" stroke="#ffffff" stroke-width="1" stroke-linecap="round" />
        <line x1="2" y1="12" x2="9" y2="12" stroke="#ffffff" stroke-width="1" stroke-linecap="round" />
        <line x1="2" y1="15" x2="9" y2="15" stroke="#ffffff" stroke-width="1" stroke-linecap="round" />
      </svg>

      <svg id="md-toc-icon-collapsed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <rect x="2" y="3" width="20" height="18" rx="4" fill="none" stroke="#ffffff" stroke-width="2" />
        <line x1="9" y1="3" x2="9" y2="21" stroke="#ffffff" stroke-width="2" stroke-linecap="round" />
      </svg>

    </button>

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="24" height="24">

      <rect width="128" height="128" rx="16" fill="#2b2b2b"/>

      <text 
        x="64" 
        y="55" 
        font-family="monospace" 
        font-size="89" 
        font-weight="bold" 
        fill="#ffffff" 
        text-anchor="middle" 
        dominant-baseline="central">
        MR
      </text>

      <!-- grupo da seta -->
      <g transform="translate(16, 7)">
        <path 
          d="M18 98 H86 M76 88 L86 98 L76 108"
          stroke="#ffffff"
          stroke-width="6"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"/>
      </g>

    </svg>
  </div>


  <div class="toolbar-right">
    <span class="version">v1.0.0</span>

    <a href="https://github.com/suncodesapps" target="_blank">
      GitHub
    </a>
  </div>

</div>
      <div id="md-root">

        <aside id="md-sidebar"></aside>

        <main id="md-main">

          <article class="markdown-body">
            ${html}
          </article>

        </main>

      </div>
    `;

  }


  static applyPageStyle() {

    Object.assign(document.body.style, {
      margin: "0",
      background: "#161b22",
      overflowY: "scroll",
    });

  }


  static applyLayoutStyle() {

    // reservado para ajustes de layout

  }


  static bindEvents() {

    const button = document.getElementById("md-toggle-toc");
    const sidebar = document.getElementById("md-sidebar");
    const icon = document.getElementById("md-toc-icon");
    const iconActive = document.getElementById("md-toc-icon-active");
    const iconCollapsed = document.getElementById("md-toc-icon-collapsed");


    button.onclick = () => {

  const hidden = sidebar.style.display === "none";

  sidebar.style.display = hidden
    ? "block"
    : "none";

  iconActive.style.display = hidden ? "block" : "none";
  iconCollapsed.style.display = hidden ? "none" : "block";

  document.getElementById("md-root").classList.toggle(
    "toc-open",
    hidden
  );
};

}


  static render() {

    const markdown = this.extractMarkdown();

    const html = Parser.parse(markdown);

    document.body.innerHTML = this.buildLayout(html);

    this.applyPageStyle();

    const article = document.querySelector(".markdown-body");

    this.addHeadingIds(article);

    Toc.build(article);

    this.bindEvents();

    this.highlight(article);

    document.title = document.title.replace(/\.md$/i, "");
    const sidebar = document.getElementById("md-sidebar");

    window.addEventListener("scroll", () => {
      const viewportTop = window.scrollY;
      console.log(viewportTop)

      if (viewportTop > 53) {
        sidebar.style.top = viewportTop;
      } else {
        sidebar.style.top = "0px";
      }
    });

  }

}
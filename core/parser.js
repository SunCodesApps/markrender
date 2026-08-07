class Parser {

    static renderer = null;

    static configure() {

        if (this.renderer)
            return;

        this.renderer = new marked.Renderer();

        //
        // Links externos em nova aba
        //
        this.renderer.link = function ({ href, title, tokens }) {

            const text = this.parser.parseInline(tokens);

            const t = title
                ? ` title="${title}"`
                : "";

            return `
                <a href="${href}"
                target="_blank"
                rel="noopener noreferrer"${t}>${text}</a>`;

        };


        //
        // Imagens responsivas
        //
        this.renderer.image = ({ href, title, text }) => {

            const t = title
                ? ` title="${title}"`
                : "";

            return `
<img
    src="${href}"
    alt="${text}"
    loading="lazy"
    ${t}
/>`;

        };

        marked.setOptions({

            renderer: this.renderer,

            gfm: true,
            breaks: false,

            pedantic: false,

            headerIds: false,

            mangle: false

        });

    }

    static parse(markdown) {

        this.configure();

        return marked.parse(markdown);

    }

}
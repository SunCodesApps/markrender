class Detector {

    static markdownExtensions = [
        ".md",
        ".markdown",
        ".mdown",
        ".mkd",
        ".mkdn"
    ];


    static isLocalFile() {

        return location.protocol === "file:";

    }


    static hasMarkdownExtension() {

        const path = location.pathname.toLowerCase();

        return this.markdownExtensions.some(ext =>
            path.endsWith(ext)
        );

    }


    static isLocalMarkdown() {

        return (
            this.isLocalFile() &&
            this.hasMarkdownExtension()
        );

    }

}
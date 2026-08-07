(async () => {

    if (window.__MarkdownViewerLoaded__) {
        return;
    }

    const isMd = Detector.isLocalMarkdown();

    if (!isMd) {
        return;
    }

    window.__MarkdownViewerLoaded__ = true;

    Renderer.render();

})();
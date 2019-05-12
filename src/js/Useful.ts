export function isElementInViewport(elem: Element, viewport: Element = document.documentElement): boolean {
    const elemBounding = elem.getBoundingClientRect();
    const viewBounding = viewport.getBoundingClientRect();

    return (
        elemBounding.top >= viewBounding.top &&
        elemBounding.left >= viewBounding.left &&
        elemBounding.right <= viewBounding.right &&
        elemBounding.bottom <= viewBounding.bottom
    );
}
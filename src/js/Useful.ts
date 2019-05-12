export type ConsumerFunction = (...args: any[]) => void;

/**
 * Determines if a given element is currently placed inside of another one (the viewport).
 * @param elem 
 * @param viewport 
 */
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

/**
 * Returns a new function that when called, will call f, but only if it hasn't been called
 * in the last `time` milliseconds.
 * 
 * @param time 
 * @param f 
 */
export function rateLimit(time: number, f: ConsumerFunction): ConsumerFunction {
    let isRunning = false;

    return function(this: any, ...args: any[]) {
        const thisArg = this;

        if(!isRunning) {
            // Call the function immediately, but asynchronously
            setTimeout(f.bind(thisArg, args));

            // Reset the running flag after the time expires
            setTimeout(() => {isRunning = false}, time);
            isRunning = true;
        }
    }
}
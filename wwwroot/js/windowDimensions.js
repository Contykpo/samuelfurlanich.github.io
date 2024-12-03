export function getWindowDimensions() {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
};

export function registerViewportChangeCallback(dotnetHelper) {
    window.addEventListener('load', () => {
        dotnetHelper.invokeMethodAsync('OnResize', window.innerWidth, window.innerHeight);
    });
    window.addEventListener('resize', () => {
        dotnetHelper.invokeMethodAsync('OnResize', window.innerWidth, window.innerHeight);
    });
}
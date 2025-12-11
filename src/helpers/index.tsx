export function ScrollTo(element: any) {
    document.querySelector(element)?.scrollIntoView({
        behavior: 'smooth'
    });
}
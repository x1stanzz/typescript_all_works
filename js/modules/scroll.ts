export function initScrollButton(): void {
    document.addEventListener('DOMContentLoaded', () => {
        const scrollButton = document.getElementById('scrollButton') as HTMLButtonElement;
    
        if(scrollButton) {
            scrollButton.addEventListener('click', (event: Event) => {
                event.preventDefault()
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        } else {
            console.error("Button was not found.")
        }
    })
}
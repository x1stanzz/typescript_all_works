import { ModalProps } from "../types/types";

export function openModal( { title, body }: ModalProps): void {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${title}</h2>
            <p>${body}</p>
        </div>
    `;
    document.body.appendChild(modal);

    modal.style.display = "flex";

    const closeBtn = modal.querySelector('.close') as HTMLElement;
    closeBtn?.addEventListener('click', () => {
        modal.style.display = "none"; 
        document.body.removeChild(modal); 
    });

    modal.addEventListener('click', (event: MouseEvent) => {
        if (event.target === modal) {
            modal.style.display = "none";
            document.body.removeChild(modal);
        }
    });
}

export function initModalButton(): void {
    document.addEventListener('DOMContentLoaded', () => {
        const modalButton = document.getElementById('modalButton') as HTMLElement;
        if (modalButton) {
            modalButton.addEventListener('click', (event: Event) => {
                event.preventDefault();
                openModal({ title: "Modal Window", body: "Some content..."});
            });
        } else {
            console.error("Button was not found.");
        }
    });
}
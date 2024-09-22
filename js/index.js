"use strict";
//Відкриття модального вікна
function openModal(title, body) {
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
    const closeBtn = modal.querySelector('.close');
    closeBtn?.addEventListener('click', () => {
        modal.style.display = "none";
        document.body.removeChild(modal);
    });
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
            document.body.removeChild(modal);
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const modalButton = document.getElementById('modalButton');
    if (modalButton) {
        modalButton.addEventListener('click', (event) => {
            event.preventDefault();
            openModal("Modal Window", "Some content...");
        });
    }
    else {
        console.error("Button was not found.");
    }
});
//Плавний перехід
document.addEventListener('DOMContentLoaded', () => {
    const scrollButton = document.getElementById('scrollButton');
    if (scrollButton) {
        scrollButton.addEventListener('click', (event) => {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    else {
        console.error("Button was not found.");
    }
});
//Fetch
document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetchButton');
    const dataContainer = document.getElementById('dataContainer');
    if (fetchButton) {
        fetchButton.addEventListener('click', async (event) => {
            event.preventDefault();
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                if (!response.ok) {
                    throw new Error("No connection");
                }
                const data = await response.json();
                dataContainer.innerHTML = '';
                data.forEach((post) => {
                    const postElement = document.createElement('div');
                    postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
                    dataContainer.append(postElement);
                });
            }
            catch (error) {
                console.error('Error: ', error);
                dataContainer.innerHTML = '<p>An erros occurred while loading data.</p>';
            }
        });
    }
    else {
        console.error("Button was not found.");
    }
});

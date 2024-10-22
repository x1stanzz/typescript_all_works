import { Post } from "../types/types";

export function initFetchButton(): void {
    document.addEventListener('DOMContentLoaded', () => {
        const fetchButton = document.getElementById('fetchButton') as HTMLAnchorElement;
        const dataContainer = document.getElementById('dataContainer') as HTMLDivElement;
    
        if(fetchButton) {
            fetchButton.addEventListener('click', async(event: Event) => {
                event.preventDefault();
                try {
                    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                    if(!response.ok) {
                        throw new Error("No connection");
                    }
                    const data: Post[] = await response.json();
    
                    dataContainer.innerHTML = '';
                    data.forEach((post: Post) => {
                        const postElement = document.createElement('div');
                        postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
                        dataContainer.append(postElement);
                    });
                } catch(error: unknown) {
                    console.error('Error: ', error);
                    dataContainer.innerHTML = '<p>An erros occurred while loading data.</p>';
                }
            });
        } else {
            console.error("Button was not found.")
        }
    })
}
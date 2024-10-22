"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initScrollButton = initScrollButton;
function initScrollButton() {
    document.addEventListener('DOMContentLoaded', function () {
        var scrollButton = document.getElementById('scrollButton');
        if (scrollButton) {
            scrollButton.addEventListener('click', function (event) {
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
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openModal = openModal;
exports.initModalButton = initModalButton;
function openModal(_a) {
    var title = _a.title, body = _a.body;
    var modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = "\n        <div class=\"modal-content\">\n            <span class=\"close\">&times;</span>\n            <h2>".concat(title, "</h2>\n            <p>").concat(body, "</p>\n        </div>\n    ");
    document.body.appendChild(modal);
    modal.style.display = "flex";
    var closeBtn = modal.querySelector('.close');
    closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.addEventListener('click', function () {
        modal.style.display = "none";
        document.body.removeChild(modal);
    });
    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
            document.body.removeChild(modal);
        }
    });
}
function initModalButton() {
    document.addEventListener('DOMContentLoaded', function () {
        var modalButton = document.getElementById('modalButton');
        if (modalButton) {
            modalButton.addEventListener('click', function (event) {
                event.preventDefault();
                openModal({ title: "Modal Window", body: "Some content..." });
            });
        }
        else {
            console.error("Button was not found.");
        }
    });
}

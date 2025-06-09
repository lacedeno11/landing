"use strict";

const showToast = () => {
    const toast = document.getElementById("toast-interactive");
    if (toast) {
        toast.classList.remove("hidden");
    }
};
const showVideo = () => {
    const demo = document.getElementById("demo");
    if (demo) {
        demo.addEventListener("click", () => {
            window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
        });
    }
};
(() => {
    // Asignar evento al botón Comenzar
    document.addEventListener("DOMContentLoaded", () => {
        const start = document.getElementById("start");
        if (start) {
            start.addEventListener("click", showToast);
        }
        showVideo();
        // Evento para cerrar el toast
        const closeBtn = document.querySelector('[data-dismiss-target="#toast-interactive"]');
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                const toast = document.getElementById("toast-interactive");
                if (toast) toast.classList.add("hidden");
            });
        }
    });
})();
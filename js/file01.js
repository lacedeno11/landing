'use strict';

import { fetchFakerData } from './functions.js';

// Función para renderizar las cards
const renderCards = (items) => {
    const container = document.getElementById('skeleton-container');
    if (!container) return;

    // Limpiar el contenedor
    container.innerHTML = '';

    // Tomar solo los primeros 3 elementos
    items.slice(0, 3).forEach(({ title, author, genre, content }) => {
        const card = `
            <div class="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
                <div class="w-full h-40 bg-purple-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <span class="text-gray-500 dark:text-gray-400 text-2xl font-bold">${genre}</span>
                </div>
                <div class="h-6 text-xl font-semibold text-orange-900 dark:text-white">${title}</div>
                <div class="h-5 text-blue-600 dark:text-gray-300 text-sm mb-2">Por: ${author}</div>
                <div class="space-y-2">
                    <div class="text-gray-700 dark:text-gray-400 text-base">${content}</div>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
};

const loadData = async () => {
    const url = 'https://fakerapi.it/api/v2/texts?_quantity=10&_characters=120';

    try {
        const result = await fetchFakerData(url);

        if (result.success) {
            console.log('Datos obtenidos con éxito:', result.body);
            renderCards(result.body.data);
        } else {
            console.error('Error al obtener los datos:', result.error);
        }

    } catch (error) {
        console.error('Ocurrió un error inesperado:', error);
    }
};

// Función de autoejecución
(() => {
    loadData();
})();
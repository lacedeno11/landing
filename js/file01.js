'use strict';

import { fetchFakerData } from './functions.js';
import { saveVote, getVotes } from './firebase.js';

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

// Función para mostrar los votos en una tabla
const displayVotes = async () => {
    const resultsContainer = document.getElementById('results');
    if (!resultsContainer) return;

    const response = await getVotes();
    if (!response.success || !response.data) {
        resultsContainer.innerHTML = '<p>No hay votos registrados.</p>';
        return;
    }

    // Contar votos por producto
    const votes = response.data;
    const voteCounts = {};
    Object.values(votes).forEach(vote => {
        if (vote.productID) {
            voteCounts[vote.productID] = (voteCounts[vote.productID] || 0) + 1;
        }
    });

    // Crear tabla
    let table = `
        <table>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Total de votos</th>
                </tr>
            </thead>
            <tbody>
    `;
    Object.entries(voteCounts).forEach(([productID, count]) => {
        table += `
            <tr>
                <td>${productID}</td>
                <td>${count}</td>
            </tr>
        `;
    });
    table += `
            </tbody>
        </table>
    `;

    resultsContainer.innerHTML = table;
};

// Nueva función para habilitar el formulario de votación
const enableForm = () => {
    const form = document.getElementById('form_voting');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const input = document.getElementById('select_product');
        if (!input) return;

        const productID = input.value;
        await saveVote(productID);
        form.reset();
        await displayVotes();
    });
};

// Función de autoejecución
(() => {
    loadData();
    enableForm();
    displayVotes();
})();
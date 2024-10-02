/**
 * @fileoverview This script handles the selection of Hiragana characters in the UI.
 * It allows users to select and deselect Hiragana buttons, and updates the mastery list accordingly.
 */

import { updateMasteryList } from './mastery_update.js';

// Array to store selected Hiraganas
let selectedHiraganas = [];

/**
 * Function to handle the click event on Hiragana buttons
 * @param {Event} event - The click event
 */
function handleHiraganaButtonClick(event) {
    const button = event.target;
    const hiragana = Object.entries(hiraganas).find(([key, value]) => value[0] === button.textContent);

    if (button.classList.contains('selected')) {
        // Remove the hiragana from the list if it is already selected
        selectedHiraganas = selectedHiraganas.filter(item => item[0] !== button.textContent);
    } else {
        // Add the hiragana to the list if it is not already selected
        selectedHiraganas.push(hiragana);
    }

    // Toggle the 'selected' class on the button
    button.classList.toggle('selected');

    // Update the mastery list
    updateMasteryList(hiragana[0], !button.classList.contains('selected'));
}

/**
 * Function to initialize the Hiragana selection buttons
 * Adds click event listeners to all Hiragana buttons in the UI.
 */
function initializeHiraganaButtons() {
    const hiraganaButtons = document.querySelectorAll('.hiragana-button');

    hiraganaButtons.forEach(button => {
        button.addEventListener('click', handleHiraganaButtonClick);
    });
}

// Initialize the Hiragana buttons when the DOM content is loaded
document.addEventListener('DOMContentLoaded', initializeHiraganaButtons);

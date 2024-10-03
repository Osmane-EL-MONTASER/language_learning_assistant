/**
 * @fileoverview This script handles the selection of Hiragana characters in the UI.
 * It allows users to select and deselect Hiragana buttons, and updates the mastery list accordingly.
 */

import { updateMasteryList } from './mastery_ui_update.js';
import { loadFromCache } from './cache/hiragana_selection_cache.js';
import { saveToCache } from './cache/hiragana_selection_cache.js';

// Array to store selected Hiraganas
let selectedHiraganas = [];

/**
 * Handles the click event on Hiragana buttons.
 * Toggles the selection state of the clicked button and updates the selected Hiraganas list.
 * 
 * @param {Event} event - The click event.
 */
function handleHiraganaButtonClick(event) {
    const button = event.target;
    const hiragana = Object.entries(hiraganas).find(([key, value]) => value[1] === button.textContent);

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

    // Save the current selectedHiragana's list state
    saveToCache(selectedHiraganas);
}

/**
 * Initializes the Hiragana selection buttons.
 * Adds click event listeners to all Hiragana buttons in the UI and loads previously selected Hiraganas from the cache.
 */
function initializeHiraganaButtons() {
    const hiraganaButtons = document.querySelectorAll('.hiragana-button');
    
    // Load Hiraganas selected in the previous session for convenience
    selectedHiraganas = loadFromCache(selectedHiraganas);

    // Select the previously selected hiraganas and update Hiragana mastery list accordingly
    selectedHiraganas.forEach(hiraganaData => {
        selectHiraganaDynamically(hiraganaData[0]);

        updateMasteryList(hiraganaData[0], false);
    });
    
    hiraganaButtons.forEach(button => {
        button.addEventListener('click', handleHiraganaButtonClick);
    });
}

/**
 * Selects a Hiragana button dynamically by adding the 'selected' class to it.
 *
 * @param {number} hiraganaId - The ID of the Hiragana to be selected.
 */
function selectHiraganaDynamically(hiraganaId) {
    // Get the button associated to id=hiraganaId
    var button = document.getElementById(hiraganaId);

    // Set the 'selected' class on the button to True
    button.classList.add('selected');
}

// Initialize the Hiragana buttons when the DOM content is loaded
document.addEventListener('DOMContentLoaded', initializeHiraganaButtons);

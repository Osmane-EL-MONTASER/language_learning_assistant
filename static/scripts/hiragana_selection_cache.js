/**
 * @fileoverview This script handles the caching of selected Hiragana characters.
 * It provides functions to load and save the selected Hiraganas to and from the local storage.
 */

/**
 * Loads the selected Hiraganas from the cache.
 *
 * @param {Array} selectedHiraganas - The array to store the selected Hiraganas.
 * @return {Array} The array of selected Hiraganas loaded from the cache.
 */
export function loadFromCache(selectedHiraganas) {
    selectedHiraganas = JSON.parse(localStorage.getItem('selectedHiraganas'));

    return selectedHiraganas;
}

/**
 * Saves the selected Hiraganas to the cache.
 *
 * @param {Array} selectedHiraganas - The array of selected Hiraganas to be saved.
 */
export function saveToCache(selectedHiraganas) {
    localStorage.setItem('selectedHiraganas', JSON.stringify(selectedHiraganas));
}
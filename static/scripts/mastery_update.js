// List of hiragana's masteries to show depending on which one is selected.
let masteriesToShow = [];

/**
 * Updates the mastery list by either removing or adding a hiragana based on the provided parameters.
 *
 * @param {number} hiragana_id - The ID of the hiragana to be updated.
 * @param {boolean} to_remove - A flag indicating whether to remove (true) or add (false) the hiragana.
 */
export function updateMasteryList(hiragana_id, to_remove) {
    // Gather the corresponding hiragana's string from the list with the hiragana_id.
    const hiraganaText = hiraganas[hiragana_id];

    // Remove the hiragana if it was selected, else we add it.
    if (to_remove) {
        masteriesToShow.filter(item => item !== hiraganaText);
    } else {
        masteriesToShow.push(hiraganaText);
    }
    
    // Then we update the display.
    updateMasteryGrid();
}

function updateMasteryGrid() {
    const masteryGrid = flushMasteryGrid();

    // Foreach hiragana, we add it in the grid!
    masteriesToShow.forEach(hiraganaToShow => {
        
    });
}

/**
 * Clears the content of the mastery grid element and returns the element.
 *
 * @returns {HTMLElement} The mastery grid element after it has been cleared.
 */
function flushMasteryGrid() {
    document.getElementById("mastery-grid").innerHTML = "";

    return document.getElementById("mastery-grid");
}
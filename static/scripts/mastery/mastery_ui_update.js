/**
 * @fileoverview This script handles the updating and display of Hiragana mastery levels.
 * It allows users to add or remove Hiragana from the mastery list and updates the display accordingly.
 */

// List of hiragana's masteries to show depending on which one is selected.
let masteriesToShow = [];

/**
 * Updates the mastery list by either removing or adding a hiragana based on the provided parameters.
 *
 * @param {number} hiraganaId - The ID of the hiragana to be updated.
 * @param {boolean} toRemove - A flag indicating whether to remove (true) or add (false) the hiragana.
 */
export function updateMasteryList(hiraganaId, toRemove) {
    // Remove the hiragana if it was selected, else we add it.
    if (toRemove) {
        masteriesToShow = masteriesToShow.filter(item => item !== hiraganaId);
    } else {
        masteriesToShow.push(hiraganaId);
    }
    
    // Then we update the display.
    updateMasteryGrid();
}

/**
 * Updates the mastery grid by displaying the mastery levels of the selected hiraganas.
 * If no hiraganas are selected, a message prompting the user to select hiraganas is displayed.
 */
function updateMasteryGrid() {
    const masteryGrid = flushMasteryGrid();

    if (masteriesToShow.length === 0) {
        masteryGrid.innerHTML = "<i style='text-align: center;'>Select the desired hiraganas to display the percentage of mastery!</i>";
        return;
    }

    // For each selected hiragana, compute its mastery percentage and add it to the grid.
    masteriesToShow.forEach(hiraganaToShow => {
        const masteryPercentage = computeMasteryPercentageOf(hiraganaToShow);
        const masteryItem = buildMasteryItem(masteryPercentage, hiraganas[hiraganaToShow][1]);
        
        masteryGrid.appendChild(masteryItem);
    });
}

/**
 * Builds a mastery item element for displaying the mastery percentage of a hiragana.
 *
 * @param {number} masteryPercentage - The mastery percentage of the hiragana.
 * @return {HTMLElement} The created mastery item element.
 */
function buildMasteryItem(masteryPercentage, hiragana) {
    const masteryItem = createElementWithClass('div', 'mastery-item');
    const label = createElementWithClass('div', 'mastery-label', hiragana);
    const track = createElementWithClass('div', 'mastery-track');
    const fill = createElementWithClass('div', 'mastery-fill');
    const percentage = createElementWithClass('div', 'mastery-percentage', `${Math.round(masteryPercentage)}%`);
    
    // Set fill width and color
    fill.style.width = `${masteryPercentage}%`;
    fill.classList.add(getMasteryColorClass(masteryPercentage));
    
    track.appendChild(fill);
    masteryItem.appendChild(label);
    masteryItem.appendChild(track);
    masteryItem.appendChild(percentage);

    return masteryItem;
}

/**
 * Creates an HTML element with a specified class and optional text content.
 *
 * @param {string} elementType - The type of the HTML element to create (e.g., 'div', 'span').
 * @param {string} className - The class to add to the created element.
 * @param {string} [textContent=''] - Optional text content to set for the created element.
 * @return {HTMLElement} The created HTML element with the specified class and text content.
 */
function createElementWithClass(elementType, className, textContent = '') {
    const element = document.createElement(elementType);
    element.classList.add(className);
    if (textContent) {
        element.textContent = textContent;
    }
    return element;
}

/**
 * Determines the CSS class for the mastery level color based on the given percentage.
 *
 * @param {number} percentage - The mastery percentage.
 * @return {string} The CSS class representing the mastery level color.
 */
function getMasteryColorClass(percentage) {
    const HIGH_THRESHOLD = 80;
    const MEDIUM_THRESHOLD = 40;

    if (percentage > HIGH_THRESHOLD) {
        return 'mastery-high';  // green in CSS
    } else if (percentage > MEDIUM_THRESHOLD) {
        return 'mastery-medium';  // orange in CSS
    }
    return 'mastery-low';  // red in CSS
}

/**
 * Computes the mastery percentage of a given hiragana.
 *
 * @param {number} hiraganaId - The ID of the hiragana.
 * @return {number} The mastery percentage of the hiragana.
 */
export function computeMasteryPercentageOf(hiraganaId) {
    // Getting the mastery data with the hiraganaId.
    var masteryData = masteries[hiraganaId];

    // We get the current number of good and total answers of the given hiragana.
    const nbGoodAnswers = masteryData[0];
    const nbtotalAnswers = masteryData[2];

    // Avoid useless nan values.
    if (nbGoodAnswers == 0 || nbtotalAnswers == 0)
        return 0;

    return (nbGoodAnswers / nbtotalAnswers) * 100;
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
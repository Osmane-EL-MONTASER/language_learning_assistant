/**
 * @fileoverview This script handles the synchronization of Hiragana mastery data with the server.
 * It provides functions to update the mastery data of a specific Hiragana character.
 */

/**
 * Updates the mastery data of a specific Hiragana character by sending a POST request to the server.
 *
 * @param {number} hiraganaId - The ID of the Hiragana character to update.
 * @param {Object} masteries - An object containing the mastery data of all Hiragana characters.
 */
export function updateMasteryOf(hiraganaId, masteries) {
    console.log(buildMasteryDataOf(hiraganaId, masteries));

    fetch('update_mastery', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ masteryToUpdate: buildMasteryDataOf(hiraganaId, masteries) })
    })
    .then(response => {
        if (!response.ok) {
            // For error tracking purposes
            return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
    })
    .then(data => {
        //console.log(data);
    })
    .catch((error) => {
        //console.error('Error: ', error);
    });
}

/**
 * Builds the mastery data object for a specific Hiragana character.
 *
 * @param {number} hiraganaId - The ID of the Hiragana character.
 * @param {Object} masteries - An object containing the mastery data of all Hiragana characters.
 * @return {Object} The mastery data object for the specified Hiragana character.
 */
function buildMasteryDataOf(hiraganaId, masteries) {
    return {
        "hiragana_id": hiraganaId,
        "correct": masteries[hiraganaId][0],
        "incorrect": masteries[hiraganaId][1],
        "occurrences": masteries[hiraganaId][2]
    };
}
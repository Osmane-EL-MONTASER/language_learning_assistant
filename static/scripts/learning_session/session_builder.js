/**
 * @fileoverview Script for building a learning session.
 * This script generates a learning session by computing the probability of each selected Hiragana to appear in the session.
 * It uses the mastery percentage of each Hiragana to determine its probability.
 */
import { computeMasteryPercentageOf } from "../mastery/mastery_ui_update.js";

/**
 * Generates a learning session by computing the probability of each selected Hiragana to appear in the session.
 *
 * @param {Array} selectedHiraganas - An array of selected Hiraganas.
 * @param {number} sessionLength - The length of the learning session.
 */
export function generateLearningSession(selectedHiraganas, sessionLength) {
    // Generate the probability of each Hiragana to appear in the session.
    var hiraganaProbsDict = computeHiraganaProbabilities(selectedHiraganas);
    const randomHiraganaIds = Array.from({ length: sessionLength }, () => chooseRandomKey(hiraganaProbsDict));

    const temp = getQuestionAnswerTupleFrom(randomHiraganaIds, selectedHiraganas);
    const questions = temp[0];
    const answers = temp[1];
}

/**
 * Computes the probabilities of each selected Hiragana based on their accuracies and weights.
 *
 * @param {Array} selectedHiraganas - An array of selected Hiraganas.
 * @return {Object} A dictionary with Hiragana IDs as keys and their probabilities as values.
 */
function computeHiraganaProbabilities(selectedHiraganas) {
    var accuracies = getAccuracies(selectedHiraganas);
    var weights = getWeights(selectedHiraganas, accuracies);

    return getProbabilities(selectedHiraganas, weights);
}

/**
 * Computes the accuracies of each selected Hiragana.
 *
 * @param {Array} selectedHiraganas - An array of selected Hiraganas.
 * @param {number} [epsilon=1e-6] - A small value to avoid division by zero.
 * @return {Object} A dictionary with Hiragana IDs as keys and their accuracies as values.
 */
function getAccuracies(selectedHiraganas, epsilon = 1e-6) {
    var accuracies = { };

    // We re-use the function made in 'mastery_ui_update.js' file to compute the mastery percentages
    selectedHiraganas.forEach(hiragana => {
        accuracies[hiragana[0]] = computeMasteryPercentageOf(hiragana[0]) + epsilon;
    });

    return accuracies;
}

/**
 * Computes the weights of each selected Hiragana based on their accuracies.
 *
 * @param {Array} selectedHiraganas - An array of selected Hiraganas.
 * @param {Object} accuracies - A dictionary with Hiragana IDs as keys and their accuracies as values.
 * @return {Object} A dictionary with Hiragana IDs as keys and their weights as values.
 */
function getWeights(selectedHiraganas, accuracies) {
    var weights = { };

    selectedHiraganas.forEach(hiragana => {
        weights[hiragana[0]] = 1 / accuracies[hiragana[0]];
    });

    return weights;
}

/**
 * Computes the probabilities of each selected Hiragana based on their weights.
 *
 * @param {Array} selectedHiraganas - An array of selected Hiraganas.
 * @param {Object} weights - A dictionary with Hiragana IDs as keys and their weights as values.
 * @return {Object} A dictionary with Hiragana IDs as keys and their probabilities as values.
 */
function getProbabilities(selectedHiraganas, weights) {
    var totalWeight = Object.values(weights).reduce((acc, value) => acc + value, 0);

    var probs = { };

    selectedHiraganas.forEach(hiragana => {
        probs[hiragana[0]] = weights[hiragana[0]] / totalWeight;
    });

    return probs;
}

/**
 * Chooses a random key from the given key probabilities.
 *
 * @param {Object} keyProbs - A dictionary with keys and their associated probabilities.
 * @return {string|null} The chosen key based on the probabilities, or null if no key is chosen.
 */
function chooseRandomKey(keyProbs) {
    const cumProbs = computeCumSum(keyProbs);
    const cumKeys = Object.keys(cumProbs);
    const randomFloat = Math.random();

    for (let key of cumKeys) {
        if (randomFloat <= cumProbs[key])
            return key;
    }

    return null;
}

/**
 * Computes the cumulative sum of the given key probabilities.
 *
 * @param {Object} keyProbs - A dictionary with keys and their associated probabilities.
 * @return {Object} A dictionary with keys and their cumulative probabilities.
 */
function computeCumSum(keyProbs) {
    const keys = Object.keys(keyProbs);
    const cumsum = { };

    keys.reduce((sum, key) => {
        cumsum[key] = sum + keyProbs[key];
        return cumsum[key];
    }, 0);

    return cumsum;
}

/**
 * Converts an array of random Hiragana IDs into a tuple of questions and answers.
 *
 * @param {Array} randomHiraganaIds - An array of randomly chosen Hiragana IDs.
 * @param {Array} hiraganas - An array of Hiraganas with their IDs, questions, and answers.
 * @return {Array} A tuple containing two arrays: questions and answers.
 */
function getQuestionAnswerTupleFrom(randomHiraganaIds, hiraganas) {
    // Convert hiraganas to a map for faster lookups
    const hiraganasMap = hiraganas.reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});

    const questions = randomHiraganaIds.map((id) => {
        return hiraganasMap[id.toString()][1];
    });

    const answers = randomHiraganaIds.map((id) => {
        return hiraganasMap[id.toString()][2];
    });

    return [questions, answers];
}
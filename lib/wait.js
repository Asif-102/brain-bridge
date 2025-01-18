/**
 * Introduces a delay for the specified duration.
 * @param {number} ms - The delay duration in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default wait;

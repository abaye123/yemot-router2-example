import { activeCallsStore } from './routerCalls.js';


// Backward compatibility for token functions
export const setCallToken = (callId, value) => setCallValue(callId, 'token', value);
export const resetCallToken = (callId) => resetCallValue(callId, 'token');
export const getCallToken = (callId) => getCallValue(callId, 'token');
export const hasCallToken = (callId) => hasCallValue(callId, 'token');


/**
 * Sets a value for a specific call and key
 * @param {string} callId - Call identifier
 * @param {string} key - Key to store the value under
 * @param {any} value - Value to be stored
 * @returns {boolean} - Whether the operation was successful
 */
export function setCallValue(callId, key, value) {
    try {
        let callData = activeCallsStore.get(callId) || {};
        callData[key] = value;
        activeCallsStore.set(callId, callData);
        return true;
    } catch (error) {
        console.error(`Error setting value for call ${callId}, key ${key}:`, error);
        return false;
    }
}

/**
 * Resets/removes a specific key value for a call
 * @param {string} callId - Call identifier
 * @param {string} key - Key to reset
 * @returns {boolean} - Whether the operation was successful
 */
export function resetCallValue(callId, key) {
    try {
        let callData = activeCallsStore.get(callId);
        if (!callData) return false;

        callData[key] = null;
        activeCallsStore.set(callId, callData);
        return true;
    } catch (error) {
        console.error(`Error resetting value for call ${callId}, key ${key}:`, error);
        return false;
    }
}

/**
 * Gets a value for a specific call and key
 * @param {string} callId - Call identifier
 * @param {string} key - Key to get the value from
 * @returns {any|null} - Stored value or null if not found
 */
export function getCallValue(callId, key) {
    try {
        const callData = activeCallsStore.get(callId);
        return callData?.[key] || null;
    } catch (error) {
        console.error(`Error getting value for call ${callId}, key ${key}:`, error);
        return null;
    }
}

/**
 * Checks if a value exists for a specific call and key
 * @param {string} callId - Call identifier
 * @param {string} key - Key to check
 * @returns {boolean} - Whether a value exists
 */
export function hasCallValue(callId, key) {
    try {
        const callData = activeCallsStore.get(callId);
        return Boolean(callData?.[key]);
    } catch (error) {
        console.error(`Error checking value for call ${callId}, key ${key}:`, error);
        return false;
    }
}

/**
 * Removes all stored values for a specific call
 * @param {string} callId - Call identifier to remove
 * @returns {boolean} - Whether the operation was successful
 */
export function clearCallValues(callId) {
    try {
        activeCallsStore.delete(callId);
        return true;
    } catch (error) {
        console.error(`Error clearing values for call ${callId}:`, error);
        return false;
    }
}
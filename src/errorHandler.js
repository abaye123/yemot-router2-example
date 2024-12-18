import axios from 'axios';
import os from 'os';

/**
* Global error handling
* @param {Error|string} error - the error object or error message
* @param {Object} options - additional options
* @param {string} [options.statusAction='ERROR_CODE'] - the status of the action
* @param {boolean} [options.logToConsole=true] - whether to print the error to the console
* @param {boolean} [options.sendWebhook=false] - whether to send a webhook to the developer
* @param {string} [options.functionName] - the name of the function where the error occurred
* @returns {Object} a built-in response object
*/

export async function handleError(call, error, options = {}) {
    const {
        statusAction = 'ERROR_CODE',
        logToConsole = true,
        sendWebhook = false,
        functionName = 'Unknown Function',
        level = 'error',
    } = options;

    const errorMessage = typeof error === 'string' ? error : error.message;
    const fullErrorDetails = `error in - ${functionName}: ${errorMessage}`;

    if (logToConsole) {
        console.error(fullErrorDetails, error);
    }

    if (sendWebhook) {
        await webhookToReportChannel(fullErrorDetails);
        console.log('sendWebhook: ' + webhookToReportChannel.success);
    }

    /*
    call.id_list_message([{
        type: 'file',
        data: 'messages/E000'
    }]);
    */

    return {
        success: false,
        statusAction,
        message: errorMessage,
        error: error instanceof Error ? error.message : error
    };
}


export async function webhookToReportChannel(messageError) {
    const text = `*שגיאה קריטית*\nפרויקט:\nkehilotCardPhone\n\n${messageError}\n\nשרת: ${os.hostname()}`;

    // Add the Hoverhawk to your notification channel here

}
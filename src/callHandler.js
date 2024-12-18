import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { setCallToken, hasCallToken, getCallToken } from './storeActiveCalls.js';

export const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);





export async function callHandler(call) {

    // tahzoka mode
    const tahzoka = false;
    if (tahzoka && call.ApiPhone != '0505555555') {
        return call.id_list_message([{
            type: 'text',
            data: 'המערכת בתחזוקה, חזרו מאוחר יותר'
        }], { removeInvalidChars: true });
    }


    // example of use with store
    setCallToken(call.ApiCallId, '98fdsf9435f9mdflr');

    if (hasCallToken(call.ApiCallId)) {
        const token = getCallToken(call.ApiCallId);

        return call.id_list_message([{
            type: 'text',
            data: 'הטוקן שלכם הוא'
        }, {
            type: 'text',
            data: token
        }], { removeInvalidChars: true });
    }

    // restart extension anyway
    return call.restart_ext();
}
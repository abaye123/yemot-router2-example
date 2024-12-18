import { YemotRouter } from 'yemot-router2';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { webhookToReportChannel } from './errorHandler.js';

// importing the actual call handler
import { callHandler } from './callHandler.js';

export const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// store for active calls values
export const activeCallsStore = new Map();


// Router configuration and error handling
export const router = YemotRouter({
    printLog: true,
    timeout: 300000,
    uncaughtErrorHandler: (error, call) => {
        const messageError = `Uncaught error in ${call.req.path} from ${call.phone}. error stack: ${error.stack}`;
        console.log(messageError);

        // Error reporting
        webhookToReportChannel(messageError);

        return call.id_list_message([{
            type: 'text',
            data: 'שגיאה, הינכם מועברים לתפריט הראשי'
        }], { removeInvalidChars: true });

    },
    defaults: {
        // zmani. It also doesn't always work!
        // https://github.com/ShlomoCode/yemot-router2/issues/43
        id_list_message: {
            removeInvalidChars: true
        },
        read: {
            removeInvalidChars: true
        }
    }
});



// events
router.events.on('call_hangup', (call) => {
    activeCallsStore.delete(call.ApiCallId);
});



// call endpoints
// router.get('/', callHandler);
router.post('/', callHandler);

/* If you have several extensions in the application, it is recommended to handle each one in a separate file. */

router.all('*', function (call) {
    console.log(`general request to an unspecified address. url: ${call.req.path} from ${call.phone} to ${call.ApiDID}`);
    return call.id_list_message([{
        type: 'text',
        data: 'שגיאה, כתובת לא קיימת בשרת'
    }], { removeInvalidChars: true });
});


export default router;
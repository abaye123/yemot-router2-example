import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import requestIp from 'request-ip';
import pkg from '../package.json' assert { type: "json" }; // experimental. displays a warning when running


import { resMethodError, res403, res404 } from './responses.js';
import calls from './routerCalls.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

process.env.TZ = 'UTC';
process.env.DIRNAME = __dirname;

dotenv.config({
    path: join(process.env.DIRNAME, '../.env')
});

// Client Map db & API Keys
export const organizationDBMap = new Map([
    ['exampleTest-569gjh2m6t', 'kehilotCardAbayeTest']
]);


// express server config
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


/* enabling reads on post or get only and unifying parameters */
app.use((req, res, next) => {
    if (req.method === 'GET' || req.method === 'POST') {
        const params = { ...req.query, ...req.body };
        req.appParams = params;

        // set request ip
        req.appParams.ip = requestIp.getClientIp(req);

        next();
    } else {
        resMethodError(req, res);
    }
});


// Client authentication
app.use((req, res, next) => {
    let apiKey = req.headers['x-api-key'] || req.headers['x-api-key'];

    if (!apiKey) {
        apiKey = req.appParams.key;
    }

    if (!apiKey) {
        return res403(req, res);
    }

    const organization = organizationDBMap.get(apiKey);
    if (!organization) {
        return res403(req, res);
    }

    req.appParams.organization = organization;
    next();
});


// endpoint for calls
app.use('/p/call', calls);

// endpoint all
app.all('*', (req, res) => res404(req, res));


// starting app
const port = process.env.PORT;
app.listen(port, () => console.log(`\napp ${pkg.name} ${pkg.version} is now running & listening on port ${port}`));

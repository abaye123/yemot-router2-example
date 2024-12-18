export function sendResponse(res, status, statusAction, additionalData = {}) {
    const response = {
        status: status,
        statusAction: statusAction,
        ...additionalData,
        APIVersion: process.env.API_VERSION
    };

    if (status) {
        res.status(200).json(response);
    } else {
        res.status(500).json(response);
    }
}


export function res404(req, res) {
    console.log(`error 404. url: ${req.path}`);

    const response = {
        status: false,
        statusAction: 'NOT_FOUND',
        message: `path ${req.path} does not exist`,
        APIVersion: process.env.API_VERSION
    };

    res.status(404).json(response);
}


export function res403(req, res) {
    console.log(`error 403. url: ${req.path}`);

    const response = {
        status: false,
        statusAction: 'FORBIDDEN',
        message: 'Access to the requested path is prohibited',
        APIVersion: process.env.API_VERSION
    };

    res.status(403).json(response);
}


export function resMethodError(req, res) {
    console.log(`error method. url: ${req.path}`);

    const response = {
        status: true,
        statusAction: 'METHOD_NOT_ALLOWED',
        message: 'this server only accepts GET or POST requests',
        APIVersion: process.env.API_VERSION
    };

    res.status(405).json(response);
}
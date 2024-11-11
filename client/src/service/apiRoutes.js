const baseURL = 'http://localhost:3000/';
const routes = {
    IS_CONNECTED : baseURL + 'isconnected',
    VERIFY_POSITION : baseURL + 'verifyPosition',
    REGISTER : baseURL + 'register',
    SEND_VOTE : baseURL + 'sendvote',
    VOTE : baseURL + 'vote/:id'
}

export {baseURL,routes};
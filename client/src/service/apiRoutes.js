const baseURL = 'http://localhost:3000/';
const routes = {
    IS_CONNECTED : baseURL + 'isConnected',
    VERIFY_POSITION : baseURL + 'verifyPosition',
    REGISTER : baseURL + 'register',
    SEND_VOTE : baseURL + 'sendVote',
    VOTE : baseURL + 'vote/:id'
}

export {baseURL,routes};
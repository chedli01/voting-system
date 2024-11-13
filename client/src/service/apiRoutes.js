const baseURL = 'https://voting.jeinsat.com/api/';
const routes = {
    IS_CONNECTED : baseURL + 'isconnected',
    VERIFY_POSITION : baseURL + 'verifyPosition',
    REGISTER : baseURL + 'register',
    SEND_VOTE : baseURL + 'sendvote',
    VOTE : baseURL + 'vote/:id',
    GET_CURRENT_VOTE : baseURL + 'currentteam',
    HAS_VOTED : baseURL + 'hasvoted'
}

export {baseURL,routes};
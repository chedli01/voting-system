const baseURL = 'http://102.219.179.69:3000/api/';
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
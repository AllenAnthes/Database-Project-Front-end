import auth0 from 'auth0-js'

export default class AuthService {

    constructor () {
        this.login = this.login.bind(this)
    }

    auth0 = new auth0.WebAuth({
        domain: 'dbproto.auth0.com',
        clientID: '0pEHMnPsxGKkALOif89WI6O5e5c5ETlX',
        redirectUri: 'http://localhost:8080/callback',
        audience: 'https://dbproto.auth0.com/userinfo',
        responseType: 'token id_token',
        scope: 'openid'
    })

    login () {
        this.auth0.authorize()
    }
}
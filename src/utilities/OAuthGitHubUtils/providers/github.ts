import { guid } from '../services/utilities'
import { IProvider } from 'react-very-simple-oauth'

const client_id = process.env.REACT_APP_GITHUB_CLIENT_ID;
const client_secret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
const state = guid()
const redirect_uri = encodeURIComponent(`https://snek.at/oauth`)
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'

export const githubProvider: IProvider<boolean> = {
    buildAuthorizeUrl(): string {
        return `https://github.com/login/oauth/authorize?redirect_uri=${redirect_uri}
        &client_id=${client_id}
        &client_secret=${client_secret}
        &scope=repo, user:email, read:user, read:org
        &state=${state}`
    },

    extractError(redirectUrl: string): Error | undefined
    {
        const errorMatch = redirectUrl.match(/error=([^&]+)/)
        if (!errorMatch) {
            return undefined
        }

        const errorReason = errorMatch[1]
        const errorDescriptionMatch = redirectUrl.match(/error_description=([^&]+)/)
        const errorDescription = errorDescriptionMatch ? errorDescriptionMatch[1] : ''
        return new Error(`Error during login. Reason: ${errorReason} Description: ${errorDescription}`)
    },

    extractSession(redirectUrl: string): boolean {
        let code = null
        const codeMatch = redirectUrl.match(/code=([^&]+)/)
        if (codeMatch) {
            code = codeMatch[1]
        }

        let state = null
        const stateMatch = redirectUrl.match(/state=([^&]+)/)
        if (stateMatch) {
            state = stateMatch[1]
        }

        const AuthorizeUrl = `${proxyUrl}https://github.com/login/oauth/access_token?code=${code}
        &client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}`

        fetch(AuthorizeUrl, {
            headers: {
                'Accept': "application/json",
                'Access-Allow-Credentials': 'True',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': "application/json",
                'Vary': 'Origin',
            },
            method: "POST",
        })
        .then(async res => await res.json())
        .then(res => {
            window.localStorage.setItem("access_token", res.access_token)
            window.localStorage.setItem("token_type", res.token_type)
        })
        return true
    },
}



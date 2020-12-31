import endpoints from '../endpoints.config'
import { Token, Endpoints, Storage } from '../components/types/interfaces'

const points: Endpoints = {
    redirectUri: chrome.identity.getRedirectURL(),
    responseType: encodeURIComponent('token'),
    scope: encodeURIComponent('user-read-email'),
}

// implicit functions defined here

const createEndpoint = (point: Endpoints): string => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${endpoints.ClientID}&response_type=${point.responseType}&redirect_uri=${point.redirectUri}&scope=${point.scope}`
    return authUrl
}

const timestampChecker = (token: Token): boolean => {
    const time = Date.now() - token.tokenTimestamp
    if (time >= token.expirationTime) {
        return false
    } else {
        return true
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    let userToken: Token = Storage.get('tokenObject')
    // first checking if userToken already exists and if so
    // then if the timestamp already exceeeded. if the timestamp exceeded
    // then we need to get a new token
    console.log('this being run here ')
    console.log(
        sender.tab
            ? 'from a content script:' + sender.tab.url
            : 'from the extension'
    )
    console.log(userToken)
    if (userToken) {
        if (!timestampChecker(userToken)) {
            userToken = {} as Token
        }
    } else {
        userToken = {} as Token
    }

    if (request.message === 'login') {
        // if the user is logged in
        if (userToken.authStatus) {
            console.log('The user is already signed in ')
            chrome.browserAction.setPopup(
                { popup: '../../html/popup.html' },
                () => {
                    sendResponse({ message: 'success' })
                }
            )
            return true
        } else {
            // the user is not logged in, we are generating a new access token object
            chrome.identity.launchWebAuthFlow(
                {
                    url: createEndpoint(points),
                    interactive: true,
                },
                (redirectUri) => {
                    if (chrome.runtime.lastError) {
                        sendResponse({ message: 'fail' })
                    } else {
                        if (
                            redirectUri === undefined ||
                            redirectUri.includes('callback?error=access_denied')
                        ) {
                            sendResponse({ message: 'fail' })
                        } else {
                            let accessToken = redirectUri.substring(
                                redirectUri.indexOf('access_token=')
                            )
                            accessToken = accessToken.substring(
                                0,
                                accessToken.indexOf('&')
                            )
                            // setting the access token details here
                            userToken.accessToken = accessToken
                            userToken.authStatus = true
                            userToken.expirationTime = 3600 * 1000
                            userToken.tokenTimestamp = Date.now()

                            Storage.set('tokenObject', userToken)
                            chrome.browserAction.setPopup(
                                { popup: '../../html/popup.html' },
                                () => {
                                    sendResponse({ message: 'success' })
                                }
                            )
                        }
                    }
                }
            )
        }
        return true
    }
    if (request.message === 'logout') {
        userToken = {} as Token
        Storage.set('tokenObject', userToken)
        chrome.browserAction.setPopup(
            { popup: '../../html/popup.html' },
            () => {
                sendResponse({ message: 'success' })
            }
        )
        return true
    }
    console.log('done here')
    sendResponse({ message: 'fail' })
    return false
})

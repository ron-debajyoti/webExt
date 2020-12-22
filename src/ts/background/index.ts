import endpoints from '../endpoints.config'
import { Endpoints } from '../components/types/interfaces'

const points: Endpoints = {
    redirectUri: chrome.identity.getRedirectURL(),
    responseType: encodeURIComponent('token'),
    scope: encodeURIComponent('user-read-email'),
    accessToken: null,
}

let userSignedIn = false

const createEndpoint = (point: Endpoints) => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${endpoints.ClientID}&response_type=${point.responseType}&redirect_uri=${point.redirectUri}&scope=${point.scope}`
    return authUrl
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'login') {
        if (userSignedIn) {
            console.log('The user is already signed in ')
            console.log(
                sender.tab
                    ? 'from a content script:' + sender.tab.url
                    : 'from the extension'
            )

            chrome.browserAction.setPopup(
                { popup: '../../html/popup.html' },
                () => {
                    sendResponse({ message: 'success' })
                }
            )
            return true
        } else {
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
                            points.accessToken = accessToken
                            userSignedIn = true
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
        userSignedIn = false
        chrome.browserAction.setPopup(
            { popup: '../../html/popup.html' },
            () => {
                sendResponse({ message: 'success' })
            }
        )
        return true
    }
    sendResponse({ message: 'fail' })
    return false
})

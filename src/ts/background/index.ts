import endpoints from '../endpoints.config';

interface Endpoints {
  redirectUri: string;
  responseType: string;
  scope: string;
  accessToken: string | null;
}


const points: Endpoints = {
  redirectUri: chrome.identity.getRedirectURL(),
  responseType: encodeURIComponent('token'),
  scope: encodeURIComponent('user-read-email'),
  accessToken: null,
};

let userSignedIn = false;
console.log('this is getting loaded and executed');
console.log(points.redirectUri);

const createEndpoint = (point: Endpoints) => {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${endpoints.ClientID}&response_type=${point.responseType}&redirect_uri=${point.redirectUri}&scope=${point.scope}`;
  return authUrl;
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(
	sender.tab
		? 'from a content script:' + sender.tab.url
		: 'from the extension'
  );

  if (request.message === 'login') {
	if (userSignedIn) {
		console.log('The user is already signed in ');
	} else {
		chrome.identity.launchWebAuthFlow(
		{
			url: createEndpoint(points),
			interactive: true,
		},
		(redirectUri) => {
			if (chrome.runtime.lastError) {
			sendResponse({ message: 'fail' });
			} else {
			if (
				redirectUri === undefined ||
				redirectUri.includes('callback?error=access_denied')
			) {
				sendResponse({ message: 'fail' });
			} else {
				let accessToken = redirectUri.substring(
					redirectUri.indexOf('access_token=')
				);
				accessToken = accessToken.substring(0,accessToken.indexOf('&'));
				points.accessToken = accessToken;
				chrome.browserAction.setPopup(
				{ popup: '../../html/options.html' },
				() => {
					sendResponse({ message: 'success' });
				}
				);
			}
			}
		}
		);
	}
	return true;
  } else if (request.message === 'logout') {
	userSignedIn = false;
	chrome.browserAction.setPopup({ popup: '../../html/options.html' }, () => {
		sendResponse({ message: 'success' });
	});
	return true;
  } else {
	sendResponse({ message: 'fail' });
	return false;
  }
});
import * as React from 'react';
import ReactDOM from 'react-dom';
import PopupApp from './containers/SignInPage';
import MainPage from './containers/Main';


const handler = () => {
  const [authState,setAuthState] = React.useState(false);
  
}

ReactDOM.render(
  <handler theme={'light'} />,
  document.getElementById('popup-root')
);

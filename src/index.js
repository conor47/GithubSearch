import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { UserProvider } from './context/context';
import { Auth0Provider } from '@auth0/auth0-react';

require('dotenv').config();

console.log(process.env);

//

ReactDOM.render(
  <Auth0Provider
    domain="dev-z53glv3v.us.auth0.com"
    clientId="bBc4oZrBO8fohqaGtVDj9M8fKUhVckfb"
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <UserProvider>
        <App />
      </UserProvider>
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById('root')
);

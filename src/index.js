import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { UserProvider } from './context/context';
import { Auth0Provider } from '@auth0/auth0-react';

require('dotenv').config();

//

ReactDOM.render(
  <Auth0Provider
    domain={process.env.DOMAIN}
    clientId={process.env.CLIENT_ID}
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

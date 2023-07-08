import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./loginformstyle.css";
import "./signup1.css";
import "./signup2.css";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-xqffekb3jc3m31sh.us.auth0.com"
    clientId="hF2hL2MxJOsnxu6uISGBwflOIGKCJzcF"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
  <BrowserRouter>
      <App />
  </BrowserRouter>
  </Auth0Provider>
);




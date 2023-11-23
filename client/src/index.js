import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';

import './index.css';
import Login from './Login';
import MainContextProvider from './MainContext';
import reportWebVitals from './network/reportWebVitals';

const App = () => {
  const [storedClientID, setClientId] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {

    const fetchClientId = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/clientid`);
        const res = await response.json();
        setClientId(res.clientid);
      } catch (e) {
        console.error('error fetching client ID:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchClientId();

  }, [storedClientID])

  return (
    <React.StrictMode>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <GoogleOAuthProvider clientId={storedClientID}>
          <MainContextProvider>
            <Login />
          </MainContextProvider>
        </GoogleOAuthProvider>
      )}
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


reportWebVitals();

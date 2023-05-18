import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/auth/AuthContext';
// import { GoogleOAuthProvider } from '@react-oauth/google';
import { ProductProvider } from './contexts/product/productContext';
import { FeatureProvider } from './contexts/feature/FeatureContext';

// const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
    <FeatureProvider>
      <ProductProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ProductProvider>
    </FeatureProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

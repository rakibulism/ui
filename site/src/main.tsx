import React from 'react';
import { createRoot } from 'react-dom/client';
import 'rakibulism-ui/styles';
import './site.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

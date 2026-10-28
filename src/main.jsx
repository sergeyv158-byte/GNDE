import React from 'react';
import { createRoot } from 'react-dom/client';
import GuidedNDEWebsite from './src/App.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GuidedNDEWebsite />
  </React.StrictMode>
);

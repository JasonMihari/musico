import React from 'react'; 
import ReactDOM from 'react-dom/client';
import './index.css';
import Musico from './src/components/Musico.js'; // Ensure correct path
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Musico /> {/* Render Musico */}
  </React.StrictMode>
);

reportWebVitals();



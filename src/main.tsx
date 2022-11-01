import React from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import Popup from './Popup';

let RenderedComponent = () => <div />;

switch (window.location.hash) {
  case '#popup':
    RenderedComponent = Popup;
    break;

  default:
    break;
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RenderedComponent />
  </React.StrictMode>,
);

import React from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import Popup from './Popup';
import NewTab from './NewTab';

let RenderedComponent = () => <div />;

switch (window.location.hash) {
  case '#newtab':
    RenderedComponent = NewTab;
    break;

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

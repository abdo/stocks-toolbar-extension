import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const body = document.querySelector('body')!;

// Creating the content to be injected
const injectedContent = document.createElement('div');
injectedContent.id = 'root';
injectedContent.style.position = 'fixed';
injectedContent.style.top = '0';
injectedContent.style.zIndex = '1000000000000';
injectedContent.style.overflow = 'hidden';

// Make sure the element that you want to mount the injectedContent to has loaded. You can
// also use `append` or insert the injectedContent using another method:
// https://developer.mozilla.org/en-US/docs/Web/API/Element#methods
//
// Also control when the content script is injected from the manifest.json:
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/#run_time

body.prepend(injectedContent);

const container = document.getElementById('root');
const root = createRoot(container!);

// Rendering App into the injected content
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

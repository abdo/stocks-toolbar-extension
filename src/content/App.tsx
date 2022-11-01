/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import { useEffect } from 'react';
import BarInfo from './components/BarInfo';
import { AppStyled } from './style';
const elementHeight = '28px';

const App = () => {
  useEffect(() => {
    const body = document.querySelector('body')!;
    body.style.setProperty('margin-top', elementHeight, 'important');
    // Configuring the page to suit the content to be injected
    const documentHeader = document.querySelector<HTMLElement>(
      'header, #topnav, #masthead-container',
    );
    if (documentHeader) {
      const headerTopAttribute =
        getComputedStyle(documentHeader).top.toString();
      if (headerTopAttribute.startsWith('0')) {
        documentHeader.style.setProperty('top', elementHeight, 'important');
      }
    }
  }, []);

  return (
    <AppStyled>
      <BarInfo />
    </AppStyled>
  );
};

export default App;

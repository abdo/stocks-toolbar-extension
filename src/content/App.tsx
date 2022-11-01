/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import { useEffect, useState } from 'react';
import storageKeys from '../data/constants/storageKeys';
import parseStorageValues from '../utils/parseStorageValues';
import BarInfo from './components/BarInfo';
import { AppStyled } from './style';
const elementHeight = '28px';

const App = () => {
  const [currentStorageValues, setCurrentStorageValues] = useState<{
    [key: string]: any;
  }>({});

  useEffect(() => {
    const body = document.querySelector('body');
    body?.style.setProperty('margin-top', elementHeight, 'important');

    // Configuring the page header (for pages that have header)
    // to suit the content to be injected
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

    // Configuring the page header specifically for google pages
    const currentUrl = window.location.href;
    if (currentUrl.includes('google.com') && !currentUrl.includes('mail')) {
      const googleHeader = document.querySelector<HTMLElement>('form#tsf');
      googleHeader?.style.setProperty('margin-top', elementHeight, 'important');
    }

    // get storage values in the beginning
    chrome.storage.sync.get(null, parseAndSetStorageValues);

    // listener for storage values
    chrome.storage.onChanged.addListener(parseAndSetStorageValues);
  }, []);

  const parseAndSetStorageValues = (values: chrome.storage.StorageChange) => {
    const parsedValues = parseStorageValues(values);
    setCurrentStorageValues({ ...currentStorageValues, ...parsedValues });
  };

  return (
    <AppStyled>
      <BarInfo
        chosenSymbolsList={currentStorageValues[storageKeys.chosenSymbolsList]}
      />
    </AppStyled>
  );
};

export default App;

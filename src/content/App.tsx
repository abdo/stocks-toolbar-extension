/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import { useEffect, useState } from 'react';
import storageKeys from '../data/constants/storageKeys';
import parseStorageValues from '../utils/parseStorageValues';
import BarInfo from './components/BarInfo';
import { AppStyled } from './style';
const elementHeight = '30px';

const App = () => {
  const [currentStorageValues, setCurrentStorageValues] = useState<{
    [key: string]: any;
  }>({});

  const {
    [storageKeys.chosenSymbolsList]: chosenSymbolsList,
    [storageKeys.toolbarVisible]: toolbarVisible,
  } = currentStorageValues;

  // Adjusting the page for when the header is on or off
  useEffect(() => {
    const body = document.querySelector('body');

    const documentHeader = document.querySelector<HTMLElement>(
      'header, #topnav, #masthead-container',
    );
    const headerTopAttribute =
      documentHeader && getComputedStyle(documentHeader).top.toString();
    const headerPositionAttribute =
      documentHeader && getComputedStyle(documentHeader).position.toString();

    // Configuring the page header specifically for google pages
    const currentUrl = window.location.href;
    const isGoogleUrl =
      currentUrl.includes('google.com') && !currentUrl.includes('mail');

    if (toolbarVisible) {
      body?.style.setProperty('margin-top', elementHeight, 'important');

      if (
        headerTopAttribute?.startsWith('0') &&
        ['absolute', 'fixed'].includes(headerPositionAttribute as string)
      ) {
        // Configuring the page header (for pages that have header)
        // to suit the content to be injected
        documentHeader?.style.setProperty('top', elementHeight, 'important');
      }
      if (isGoogleUrl) {
        const googleHeader = document.querySelector<HTMLElement>('form#tsf');
        googleHeader?.style.setProperty(
          'margin-top',
          elementHeight,
          'important',
        );
      }
    } else {
      body?.style.setProperty('margin-top', '0px', 'important');

      if (headerTopAttribute?.includes(elementHeight)) {
        // Configuring the page header (for pages that have header)
        // to suit the content to be injected
        documentHeader?.style.setProperty('top', '0px', 'important');
      }
      if (isGoogleUrl) {
        const googleHeader = document.querySelector<HTMLElement>('form#tsf');
        googleHeader?.style.setProperty('margin-top', '0px', 'important');
      }
    }
  }, [toolbarVisible]);

  useEffect(() => {
    // get storage values in the beginning
    chrome.storage.sync.get(null, parseAndSetStorageValues);

    // listener for storage values
    chrome.storage.onChanged.addListener(parseAndSetStorageValues);
  }, []);

  const parseAndSetStorageValues = (values: chrome.storage.StorageChange) => {
    const parsedValues = parseStorageValues(values);
    setCurrentStorageValues((values) => ({ ...values, ...parsedValues }));
  };

  return (
    <AppStyled $height={elementHeight} $hidden={!toolbarVisible}>
      <BarInfo chosenSymbolsList={chosenSymbolsList} />
    </AppStyled>
  );
};

export default App;

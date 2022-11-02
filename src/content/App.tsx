/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import { useEffect, useState } from 'react';
import StorageKeys, {
  defaultStorageValues,
} from '../data/constants/storageKeys';
import WebsiteVisibilityOptions from '../data/constants/websiteVisibilityOptions';
import parseStorageValues from '../utils/parseStorageValues';
import BarInfo from './components/BarInfo';
import { AppStyled } from './style';
const elementHeight = '30px';

const App = () => {
  const [currentStorageValues, setCurrentStorageValues] = useState<{
    [key: string]: any;
  }>(defaultStorageValues);

  const {
    [StorageKeys.chosenSymbolsList]: chosenSymbolsList,
    [StorageKeys.toolbarVisible]: toolbarVisibleStoredValue,
    [StorageKeys.websiteVisibility]: websiteVisibility,
    [StorageKeys.selectedWebsitesList]: selectedWebsitesList,
  } = currentStorageValues;

  const currentUrl = window.location.href;
  const toolbarVisible =
    // saved value for toolbarVisible is true
    toolbarVisibleStoredValue &&
    // storage values have been extracted
    currentStorageValues.storageInitiallyChecked &&
    // current website is chosen for toolbar visibility
    (websiteVisibility === WebsiteVisibilityOptions.All ||
      selectedWebsitesList.some((website: string) =>
        currentUrl.includes(website),
      ));
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
    setCurrentStorageValues((values) => ({
      ...values,
      ...parsedValues,
      storageInitiallyChecked: true,
    }));
  };

  return (
    <AppStyled $height={elementHeight} $hidden={!toolbarVisible}>
      <BarInfo chosenSymbolsList={chosenSymbolsList} />
    </AppStyled>
  );
};

export default App;

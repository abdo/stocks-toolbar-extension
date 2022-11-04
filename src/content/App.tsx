/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import { useEffect, useState } from 'react';
import StorageKeys, {
  defaultStorageValues,
} from '../data/constants/storageKeys';
import WebsiteVisibilityOptions from '../data/constants/websiteVisibilityOptions';
import parseStorageValues from '../utils/parseStorageValues';
import getStocksSnapshot from '../utils/requests/getStocksSnapshot';
import BarInfo from './components/BarInfo';
import { AppStyled } from './style';

export const contentHeight = '30px';

const App = () => {
  const [currentStorageValues, setCurrentStorageValues] = useState<{
    [key: string]: any;
  }>(defaultStorageValues);

  const {
    [StorageKeys.chosenSymbolsList]: chosenSymbolsList,
    [StorageKeys.toolbarVisible]: toolbarVisibleStoredValue,
    [StorageKeys.websiteVisibility]: websiteVisibility,
    [StorageKeys.selectedWebsitesList]: selectedWebsitesList,
    [StorageKeys.switchIndicationColors]: switchIndicationColors,
    [StorageKeys.refreshStockDataInterval]: refreshStockDataInterval,
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
      'header, nav, #topnav, #masthead-container',
    );
    const headerTopAttribute =
      documentHeader && getComputedStyle(documentHeader).top.toString();
    const headerPositionAttribute =
      documentHeader && getComputedStyle(documentHeader).position.toString();

    // Configuring the page header specifically for google pages
    const isGoogleUrl =
      currentUrl.includes('google.com') && !currentUrl.includes('mail');

    if (toolbarVisible) {
      body?.style.setProperty('margin-top', contentHeight, 'important');

      if (
        headerTopAttribute?.startsWith('0') &&
        ['absolute', 'fixed'].includes(headerPositionAttribute as string)
      ) {
        // Configuring the page header (for pages that have header)
        // to suit the content to be injected
        documentHeader?.style.setProperty('top', contentHeight, 'important');
      }
      if (isGoogleUrl) {
        const googleHeader = document.querySelector<HTMLElement>('form#tsf');
        googleHeader?.style.setProperty(
          'margin-top',
          contentHeight,
          'important',
        );
      }
    } else {
      body?.style.setProperty('margin-top', '0px', 'important');

      if (headerTopAttribute?.includes(contentHeight)) {
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

  if (!toolbarVisible) {
    return null;
  }

  return (
    <AppStyled $height={contentHeight}>
      <BarInfo
        chosenSymbolsList={chosenSymbolsList}
        switchIndicationColors={switchIndicationColors}
        refreshStockDataInterval={refreshStockDataInterval}
      />
    </AppStyled>
  );
};

export default App;

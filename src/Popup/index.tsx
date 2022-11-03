/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import 'antd/dist/antd.css';
import { useEffect, useState } from 'react';
import StorageKeys, {
  defaultStorageValues,
} from '../data/constants/storageKeys';
import parseStorageValues from '../utils/parseStorageValues';
import Options from './components/Options';
import { AppStyled } from './style';

function App() {
  const [currentStorageValues, setCurrentStorageValues] = useState<{
    [key: string]: any;
  }>(defaultStorageValues);

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

  const {
    [StorageKeys.chosenSymbolsList]: chosenSymbolsList,
    [StorageKeys.toolbarVisible]: toolbarVisible,
    [StorageKeys.websiteVisibility]: websiteVisibility,
    [StorageKeys.selectedWebsitesList]: selectedWebsitesList,
    [StorageKeys.switchIndicationColors]: switchIndicationColors,
  } = currentStorageValues;

  return (
    <AppStyled>
      <Options
        chosenSymbolsList={chosenSymbolsList}
        toolbarVisible={toolbarVisible}
        websiteVisibility={websiteVisibility}
        selectedWebsitesList={selectedWebsitesList}
        switchIndicationColors={switchIndicationColors}
      />
    </AppStyled>
  );
}

export default App;

/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import 'antd/dist/antd.css';
import { useEffect, useState } from 'react';
import storageKeys from '../data/constants/storageKeys';
import { defaultCompanies } from '../data/static/companies';
import parseStorageValues from '../utils/parseStorageValues';
import Options from './components/Options';
import { AppStyled } from './style';

function App() {
  const [currentStorageValues, setCurrentStorageValues] = useState<{
    [key: string]: any;
  }>({});

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
    [storageKeys.chosenSymbolsList]: chosenSymbolsList,
    [storageKeys.toolbarVisible]: toolbarVisible,
  } = currentStorageValues;

  return (
    <AppStyled>
      <Options
        chosenSymbolsList={chosenSymbolsList || defaultCompanies}
        toolbarVisible={toolbarVisible}
      />
    </AppStyled>
  );
}

export default App;

/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import { Select } from 'antd';
import 'antd/dist/antd.css';
import { useEffect, useState } from 'react';
import storageKeys from '../data/constants/storageKeys';
import { popularCompanies, defaultCompanies } from '../data/static/companies';
import parseStorageValues from '../utils/parseStorageValues';
import { AppStyled } from './style';

function App() {
  const [typedSymbol, setTypedSymbol] = useState('');
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
    setCurrentStorageValues({ ...currentStorageValues, ...parsedValues });
  };

  const onSymbolsListChange = (list: string[]) => {
    chrome.storage.sync.set({
      [storageKeys.chosenSymbolsList]: JSON.stringify(list),
    });
  };

  return (
    <AppStyled>
      <b>Stocks:</b>
      <Select
        mode='multiple'
        style={{
          width: '100%',
          boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
          borderRadius: '25px',
          margin: '10px 0',
        }}
        placeholder='Select symbols'
        value={
          currentStorageValues[storageKeys.chosenSymbolsList] ||
          defaultCompanies
        }
        onSearch={(s) => setTypedSymbol(s)}
        onChange={onSymbolsListChange}
        optionLabelProp='label'
        options={
          typedSymbol
            ? popularCompanies.map((symbol) => ({
                label: symbol,
                value: symbol,
              }))
            : []
        }
        notFoundContent={null}
      ></Select>
    </AppStyled>
  );
}

export default App;

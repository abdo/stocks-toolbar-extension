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
import MainLogo from '../components/MainLogo';
import Box from '../components/Box';
import UnpaidContent from './components/UnpaidContent';
import { Button } from 'antd';

function App() {
  const [currentStorageValues, setCurrentStorageValues] = useState<{
    [key: string]: any;
  }>(defaultStorageValues);

  const [isUnpaid, setIsUnpaid] = useState<boolean>(false);

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
    [StorageKeys.refreshStockDataInterval]: refreshStockDataInterval,
    [StorageKeys.toolbarPosition]: toolbarPosition,
    [StorageKeys.showGainersBar]: showGainersBar,
    [StorageKeys.toolbarMotionType]: toolbarMotionType,
    [StorageKeys.isOnline]: isOnline,
  } = currentStorageValues;

  return (
    <AppStyled>
      <Box m='0 0 30px -10px'>
        <MainLogo />
      </Box>

      <Button
        onClick={() => setIsUnpaid(!isUnpaid)}
        style={{ width: '10px', height: '10px', margin: '0 0 10px' }}
      >
        <span></span>
      </Button>

      {isOnline ? (
        isUnpaid ? (
          <UnpaidContent />
        ) : (
          <Options
            chosenSymbolsList={chosenSymbolsList}
            toolbarVisible={toolbarVisible}
            websiteVisibility={websiteVisibility}
            selectedWebsitesList={selectedWebsitesList}
            showGainersBar={showGainersBar}
            switchIndicationColors={switchIndicationColors}
            refreshStockDataInterval={refreshStockDataInterval}
            toolbarPosition={toolbarPosition}
            toolbarMotionType={toolbarMotionType}
          />
        )
      ) : (
        <b>Please make sure you have an internet connection.</b>
      )}
    </AppStyled>
  );
}

export default App;

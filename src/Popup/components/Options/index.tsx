import { Select, Switch } from 'antd';
import storageKeys from '../../../data/constants/storageKeys';
import { useState } from 'react';
import { popularCompanies } from '../../../data/static/companies';
import { Option } from './style';

type Props = {
  chosenSymbolsList: string[];
  toolbarVisible: boolean;
};

const Options = ({ chosenSymbolsList, toolbarVisible }: Props) => {
  const [typedSymbol, setTypedSymbol] = useState('');

  const onSymbolsListChange = (list: string[]) => {
    chrome.storage.sync.set({
      [storageKeys.chosenSymbolsList]: JSON.stringify(list),
    });
  };

  const onToolbarVisibleToggle = (visible: Boolean) => {
    chrome.storage.sync.set({
      [storageKeys.toolbarVisible]: visible,
    });
  };

  return (
    <>
      <Option>
        <b>Toolbar visible:</b>
        <Switch
          checkedChildren='On'
          unCheckedChildren='Off'
          checked={toolbarVisible}
          onChange={onToolbarVisibleToggle}
          style={{
            display: 'block',
            margin: '10px 0',
          }}
        />
      </Option>

      <Option>
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
          value={chosenSymbolsList}
          onSearch={(s) => setTypedSymbol(s)}
          onChange={onSymbolsListChange}
          optionLabelProp='label'
          options={
            typedSymbol
              ? popularCompanies.map((symbol: string) => ({
                  label: symbol,
                  value: symbol,
                }))
              : []
          }
          notFoundContent={null}
        ></Select>
      </Option>
    </>
  );
};

Options.defaultProps = {
  toolbarVisible: true,
};

export default Options;

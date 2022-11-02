import { Tag, Select, Switch } from 'antd';
import StorageKeys from '../../../data/constants/storageKeys';
import { useState } from 'react';
import { popularCompanies } from '../../../data/static/companies';
import { Option } from './style';
import theme from '../../../style/theme';
import { Input, Radio, Space } from 'antd';
import WebsiteVisibilityOptions from '../../../data/constants/websiteVisibilityOptions';
import type { RadioChangeEvent } from 'antd';

type Props = {
  chosenSymbolsList: string[];
  toolbarVisible: boolean;
  websiteVisibility: WebsiteVisibilityOptions;
  selectedWebsitesList: string[];
};

const Options = ({
  chosenSymbolsList,
  toolbarVisible,
  websiteVisibility,
  selectedWebsitesList,
}: Props) => {
  const [typedSymbol, setTypedSymbol] = useState('');
  const [typedWebsite, setTypedWebsite] = useState('');

  const onSymbolsListChange = (list: string[]) => {
    chrome.storage.sync.set({
      [StorageKeys.chosenSymbolsList]: JSON.stringify(list),
    });
  };

  const onToolbarVisibleToggle = (visible: Boolean) => {
    chrome.storage.sync.set({
      [StorageKeys.toolbarVisible]: visible,
    });
  };

  const onChangeWebsiteVisibilityOption = (e: RadioChangeEvent) => {
    chrome.storage.sync.set({
      [StorageKeys.websiteVisibility]: e.target.value,
    });
  };

  const onAddSelectedWebsite = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const canAddWebsite =
      e.code === 'Enter' &&
      typedWebsite.includes('.') &&
      !selectedWebsitesList.includes(typedWebsite);
    if (!canAddWebsite) return;
    chrome.storage.sync.set({
      [StorageKeys.selectedWebsitesList]: JSON.stringify([
        typedWebsite,
        ...selectedWebsitesList,
      ]),
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
          showSearch
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
          listHeight={100}
        ></Select>
      </Option>

      <Option>
        <Space direction='vertical'>
          <b>Where is the toolbar shown?:</b>
          <Radio.Group
            onChange={onChangeWebsiteVisibilityOption}
            value={websiteVisibility}
          >
            <Space direction='vertical'>
              <Radio value={WebsiteVisibilityOptions.All}>
                Visible on all websites
              </Radio>
              <Radio value={WebsiteVisibilityOptions.Selected}>
                Only visible on selected websites
              </Radio>
              {websiteVisibility === WebsiteVisibilityOptions.Selected ? (
                <Space direction='vertical'>
                  <>
                    <Input
                      addonBefore='https://www.'
                      placeholder='google.com'
                      onChange={(e) => setTypedWebsite(e.target.value)}
                      onKeyDown={onAddSelectedWebsite}
                    />
                    {selectedWebsitesList.map((website) => (
                      <Tag
                        key={website}
                        color={theme.colors.secondary}
                        style={{
                          display: 'block',
                          margin: '3px 0 0',
                          borderRadius: '5px',
                        }}
                      >
                        https://www.{website}
                      </Tag>
                    ))}
                  </>
                </Space>
              ) : null}
            </Space>
          </Radio.Group>
        </Space>
      </Option>
    </>
  );
};

export default Options;

import { Checkbox, Divider, Select, Switch, Tag } from 'antd';
import StorageKeys, {
  ToolbarPositionOptions,
} from '../../../data/constants/storageKeys';
import { useState } from 'react';
import { popularCompanies } from '../../../data/static/companies';
import { Option } from './style';
import theme from '../../../style/theme';
import { Input, InputNumber, Radio, Space } from 'antd';
import WebsiteVisibilityOptions from '../../../data/constants/websiteVisibilityOptions';
import type { RadioChangeEvent } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import Box from '../../../components/Box';

type Props = {
  chosenSymbolsList: string[];
  toolbarVisible: boolean;
  websiteVisibility: WebsiteVisibilityOptions;
  selectedWebsitesList: string[];
  switchIndicationColors: boolean;
  refreshStockDataInterval: number;
  toolbarPosition: ToolbarPositionOptions;
};

const Options = ({
  chosenSymbolsList,
  toolbarVisible,
  websiteVisibility,
  selectedWebsitesList,
  switchIndicationColors,
  refreshStockDataInterval,
  toolbarPosition,
}: Props) => {
  const [typedSymbol, setTypedSymbol] = useState('');
  const [typedWebsite, setTypedWebsite] = useState('');

  const onSymbolsListChange = (list: string[]) => {
    chrome.storage.sync.set({
      [StorageKeys.chosenSymbolsList]: JSON.stringify(list),
    });
  };

  const onToolbarVisibleToggle = (visible: boolean) => {
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
    setTypedWebsite('');
  };

  const onRemoveSelectedWebsite = (removedWebsite: string) => {
    chrome.storage.sync.set({
      [StorageKeys.selectedWebsitesList]: JSON.stringify(
        selectedWebsitesList.filter((website) => website !== removedWebsite),
      ),
    });
  };

  const onCheckSwitchIndicationColors = (e: CheckboxChangeEvent) => {
    chrome.storage.sync.set({
      [StorageKeys.switchIndicationColors]: e.target.checked,
    });
  };

  const onChangeRefreshStockDataInterval = (value: number | null) => {
    if (value) {
      chrome.storage.sync.set({
        [StorageKeys.refreshStockDataInterval]: value,
      });
    }
  };

  const onChangeToolbarPosition = (e: RadioChangeEvent) => {
    chrome.storage.sync.set({
      [StorageKeys.toolbarPosition]: e.target.value,
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
            boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
            display: 'block',
            margin: '10px 0',
          }}
        />
      </Option>

      <Divider />

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

      <Divider />

      <Option>
        <Space direction='vertical'>
          <b>Where is the toolbar shown?:</b>
          <Radio.Group
            onChange={onChangeWebsiteVisibilityOption}
            value={websiteVisibility}
          >
            <Space direction='vertical'>
              <Radio value={WebsiteVisibilityOptions.All}>
                Shown on all websites
              </Radio>
              <Radio value={WebsiteVisibilityOptions.Selected}>
                Only shown on selected websites
              </Radio>
              {websiteVisibility === WebsiteVisibilityOptions.Selected ? (
                <Space direction='vertical'>
                  <>
                    <Input
                      addonBefore='https://www.'
                      placeholder='google.com'
                      onChange={(e) => setTypedWebsite(e.target.value)}
                      onKeyDown={onAddSelectedWebsite}
                      value={typedWebsite}
                    />
                    {selectedWebsitesList.map((website) => (
                      <Tag
                        key={website}
                        color={theme.colors.secondary}
                        closable
                        onClose={(e) => {
                          e.preventDefault();
                          onRemoveSelectedWebsite(website);
                        }}
                        style={{
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

      <Divider />

      <Option>
        <Space direction='vertical'>
          <b>Color indications:</b>

          <Checkbox
            onChange={onCheckSwitchIndicationColors}
            checked={switchIndicationColors}
          >
            Invert{' '}
            <Box span color={theme.colors.negative} display='inline-block'>
              red
            </Box>{' '}
            /{' '}
            <Box span color={theme.colors.positive} display='inline-block'>
              green
            </Box>{' '}
            colors
          </Checkbox>
        </Space>
      </Option>

      <Divider />

      <Option>
        <Space direction='vertical'>
          <b>Data refresh rate:</b>
          <InputNumber
            min={10}
            max={600}
            value={refreshStockDataInterval}
            onChange={onChangeRefreshStockDataInterval}
            style={{
              boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
            }}
          />
          <Box fz='11px' fw='bold' color={theme.colors.primary}>
            Stock market information will refresh every{' '}
            {refreshStockDataInterval >= 60
              ? `${Math.floor(refreshStockDataInterval / 60)} ${
                  Math.floor(refreshStockDataInterval / 60) > 1
                    ? 'minutes'
                    : 'minute'
                }` +
                (refreshStockDataInterval % 60
                  ? ` and ${refreshStockDataInterval % 60} seconds`
                  : '')
              : `${refreshStockDataInterval} seconds`}
          </Box>
        </Space>
      </Option>

      <Divider />

      <Option>
        <Space direction='vertical'>
          <b>Toolbar position:</b>

          <Radio.Group
            buttonStyle='solid'
            onChange={onChangeToolbarPosition}
            value={toolbarPosition}
          >
            <Radio.Button
              value={ToolbarPositionOptions.top}
              style={{
                minWidth: '80px',
                textAlign: 'center',
              }}
            >
              Top
            </Radio.Button>
            <Radio.Button
              value={ToolbarPositionOptions.bottom}
              style={{
                minWidth: '80px',
                textAlign: 'center',
              }}
            >
              Bottom
            </Radio.Button>
          </Radio.Group>
        </Space>
      </Option>
    </>
  );
};

export default Options;

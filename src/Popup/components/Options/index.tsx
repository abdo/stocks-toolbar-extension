import {
  Checkbox,
  Divider,
  Select,
  Switch,
  Tag,
  Typography,
  Input,
  InputNumber,
  Radio,
  Space,
} from "antd";
import StorageKeys, {
  SecondaryBarTypeOptions,
  SubscriptionStatusTypeOptions,
  ToolbarMotionTypeOptions,
  ToolbarPositionOptions,
} from "../../../data/constants/storageKeys";
import { useEffect, useState } from "react";
import { Option } from "./style";
import theme from "../../../style/theme";
import WebsiteVisibilityOptions from "../../../data/constants/websiteVisibilityOptions";
import type { RadioChangeEvent } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import Box from "../../../components/Box";
import getSearchSuggestions, {
  type SuggestedQuote,
} from "../../../utils/requests/getSearchSuggestions";
import useDebounce from "../../../utils/hooks/useDebounce";
import getQuoteTypeIndicator from "../../../utils/helpers/getQuoteTypeIndicator";
import SecondBarOption from "./SecondBarOption";
import PremiumHint from "../../../components/PremiumHint";
import { freeUserRefreshRateInSeconds } from "../../../data/static/refreshRate";

const { Text } = Typography;

type Props = {
  currentStorageValues: {
    [key: string]: any;
  };
};

const Options = ({ currentStorageValues }: Props) => {
  const [typedSymbol, setTypesQuery] = useState("");
  const [typedWebsite, setTypedWebsite] = useState("");
  const [suggestedQuotes, setSuggestedQuotes] = useState<SuggestedQuote[]>([]);

  let {
    [StorageKeys.subscriptionStatus]: subscriptionStatus,
    [StorageKeys.toolbarVisible]: toolbarVisible,
    [StorageKeys.chosenSymbolsList]: chosenSymbolsList,
    [StorageKeys.switchIndicationColors]: switchIndicationColors,
    [StorageKeys.websiteVisibility]: websiteVisibility,
    [StorageKeys.toolbarPosition]: toolbarPosition,
    [StorageKeys.toolbarMotionType]: toolbarMotionType,
    [StorageKeys.showSecondBar]: showSecondBar,
    [StorageKeys.secondBarType]: secondBarType,
    [StorageKeys.selectedWebsitesList]: selectedWebsitesList,
  } = currentStorageValues;

  const isSubscriptionActive =
    subscriptionStatus === SubscriptionStatusTypeOptions.active;
  const isSubscriptionStopped =
    subscriptionStatus === SubscriptionStatusTypeOptions.stopped;

  if (!isSubscriptionActive) {
    showSecondBar = false;
  }

  const debouncedTypedQuery = useDebounce(typedSymbol, 200);

  useEffect(() => {
    const query = debouncedTypedQuery.trim();
    if (!query) return;
    getSearchSuggestions({ query }).then(setSuggestedQuotes);
  }, [debouncedTypedQuery]);

  const onSymbolsListChange = (list: string[]) => {
    chrome.storage.sync.set({
      [StorageKeys.chosenSymbolsList]: JSON.stringify(list),
    });
    setTypesQuery("");
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

  const onAddSelectedWebsiteByEnter = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const typedWebsiteAdjusted = typedWebsite.toLowerCase();
    const canAddWebsite =
      e.code === "Enter" &&
      typedWebsiteAdjusted.includes(".") &&
      !(selectedWebsitesList as string[]).includes(typedWebsiteAdjusted);
    if (!canAddWebsite) return;
    chrome.storage.sync.set({
      [StorageKeys.selectedWebsitesList]: JSON.stringify([
        typedWebsiteAdjusted,
        ...selectedWebsitesList,
      ]),
    });
    setTypedWebsite("");
  };

  const onRemoveSelectedWebsite = (removedWebsite: string) => {
    chrome.storage.sync.set({
      [StorageKeys.selectedWebsitesList]: JSON.stringify(
        (selectedWebsitesList as string[]).filter(
          (website) => website !== removedWebsite
        )
      ),
    });
  };

  const onCheckShowSecondBar = (e: CheckboxChangeEvent) => {
    chrome.storage.sync.set({
      [StorageKeys.showSecondBar]: e.target.checked,
    });
  };

  const onChangeSecondBarType = (type: SecondaryBarTypeOptions) => {
    chrome.storage.sync.set({
      [StorageKeys.secondBarType]: type,
    });
  };

  const onCheckSwitchIndicationColors = (e: CheckboxChangeEvent) => {
    chrome.storage.sync.set({
      [StorageKeys.switchIndicationColors]: e.target.checked,
    });
  };

  const onChangeToolbarMotionType = (e: RadioChangeEvent) => {
    chrome.storage.sync.set({
      [StorageKeys.toolbarMotionType]: e.target.value,
    });
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
          checkedChildren="On"
          unCheckedChildren="Off"
          checked={toolbarVisible}
          onChange={onToolbarVisibleToggle}
          style={{
            boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
            display: "block",
            margin: "10px 0",
          }}
        />
      </Option>

      <Divider />

      <Option>
        <Box display="flex" alignItems="center" gap="5px">
          <b>Quotes to monitor:</b>
          <Text type="secondary" style={{ fontSize: 10 }}>
            Stocks, Indices, Crypto.. etc
          </Text>
        </Box>
        <Select
          mode="multiple"
          style={{
            width: "100%",
            boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
            borderRadius: "25px",
            margin: "10px 0",
          }}
          placeholder="Select symbols"
          value={chosenSymbolsList}
          searchValue={typedSymbol}
          onSearch={(s) => setTypesQuery(s)}
          onChange={onSymbolsListChange}
          optionLabelProp="label"
          options={suggestedQuotes.map(({ symbol, ...quote }) => ({
            value: symbol,
            ...quote,
            disabled:
              quote.quoteType === "CRYPTOCURRENCY" && !isSubscriptionActive,
          }))}
          optionRender={({
            value,
            data: { shortname, exchange, quoteType, typeDisp },
          }) => (
            <Box display="flex" alignItems="center" gap="6px">
              <Box>
                {value} - {shortname} ({exchange})
              </Box>
              {getQuoteTypeIndicator({
                quoteType,
                typeDisp,
              })}
              {!isSubscriptionActive && quoteType === "CRYPTOCURRENCY" && (
                <PremiumHint isSubscriptionStopped={isSubscriptionStopped} />
              )}
            </Box>
          )}
          notFoundContent={null}
          listHeight={100}
          onBlur={() => setTypesQuery("")}
          filterOption={false}
        />
      </Option>

      <Divider />

      <Option>
        <SecondBarOption
          showSecondBar={showSecondBar}
          onCheckShowSecondBar={onCheckShowSecondBar}
          secondBarType={secondBarType}
          onChangeSecondBarType={onChangeSecondBarType}
          isSubscriptionActive={isSubscriptionActive}
          isSubscriptionStopped={isSubscriptionStopped}
        />
      </Option>

      <Divider />

      <Option>
        <Space direction="vertical">
          <Box display="flex" alignItems="center" gap="5px">
            <b>Data refresh rate:</b>
            {isSubscriptionActive ? (
              <span>real time ⚡</span>
            ) : (
              <PremiumHint isSubscriptionStopped={isSubscriptionStopped} />
            )}
          </Box>

          <Box hidden={isSubscriptionActive}>
            <InputNumber
              min={10}
              max={600}
              value={freeUserRefreshRateInSeconds}
              style={{
                boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
              }}
              disabled
            />

            <Box fz="11px" color={theme.colors.primary}>
              Quotes prices will refresh every{" "}
              <Box display="inline-block" fw="bold">
                {freeUserRefreshRateInSeconds}
              </Box>{" "}
              seconds, upgrade to premium for{" "}
              <Box display="inline-block" fw="bold">
                real time
              </Box>{" "}
              prices
            </Box>
          </Box>
        </Space>
      </Option>

      <Divider />

      <Option>
        <Space direction="vertical">
          <b>Where is the toolbar shown?:</b>
          <Radio.Group
            onChange={onChangeWebsiteVisibilityOption}
            value={websiteVisibility}
          >
            <Space direction="vertical">
              <Radio value={WebsiteVisibilityOptions.All}>
                Shown on all websites
              </Radio>
              <Radio value={WebsiteVisibilityOptions.Selected}>
                Only shown on selected websites
              </Radio>
              {websiteVisibility === WebsiteVisibilityOptions.Selected ? (
                <Space direction="vertical">
                  <>
                    <Input
                      addonBefore="https://www."
                      placeholder="google.com"
                      onChange={(e) => setTypedWebsite(e.target.value)}
                      onKeyDown={onAddSelectedWebsiteByEnter}
                      value={typedWebsite}
                    />
                    {(selectedWebsitesList as string[]).map((website) => (
                      <Tag
                        key={website}
                        color={theme.colors.secondary}
                        closable
                        onClose={(e) => {
                          e.preventDefault();
                          onRemoveSelectedWebsite(website);
                        }}
                        style={{
                          margin: "3px 0 0",
                          borderRadius: "5px",
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
        <Space direction="vertical">
          <b>Color indications:</b>

          <Checkbox
            onChange={onCheckSwitchIndicationColors}
            checked={switchIndicationColors}
          >
            Invert{" "}
            <Box span color={theme.colors.negative} display="inline-block">
              red
            </Box>{" "}
            /{" "}
            <Box span color={theme.colors.positive} display="inline-block">
              green
            </Box>{" "}
            colors
          </Checkbox>
        </Space>
      </Option>

      <Divider />

      <Option>
        <Space direction="vertical">
          <b>Toolbar type:</b>

          <Radio.Group
            buttonStyle="solid"
            onChange={onChangeToolbarMotionType}
            value={toolbarMotionType}
            style={{
              boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
            }}
          >
            <Radio.Button
              value={ToolbarMotionTypeOptions.scrolling}
              style={{
                minWidth: "80px",
                textAlign: "center",
              }}
            >
              Scrolling
            </Radio.Button>
            <Radio.Button
              value={ToolbarMotionTypeOptions.static}
              style={{
                minWidth: "80px",
                textAlign: "center",
              }}
            >
              Static
            </Radio.Button>
          </Radio.Group>
        </Space>
      </Option>

      <Divider />

      <Option>
        <Space direction="vertical">
          <b>Toolbar position:</b>

          <Radio.Group
            buttonStyle="solid"
            onChange={onChangeToolbarPosition}
            value={toolbarPosition}
            style={{
              boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
            }}
          >
            <Radio.Button
              value={ToolbarPositionOptions.top}
              style={{
                minWidth: "80px",
                textAlign: "center",
              }}
            >
              Top
            </Radio.Button>
            <Radio.Button
              value={ToolbarPositionOptions.bottom}
              style={{
                minWidth: "80px",
                textAlign: "center",
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

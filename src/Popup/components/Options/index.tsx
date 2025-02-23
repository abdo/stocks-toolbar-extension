import { Tag, Input, InputNumber, Radio } from "antd";
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
import Box from "../../../components/Box";
import getSearchSuggestions, {
  type SuggestedQuote,
} from "../../../utils/requests/getSearchSuggestions";
import useDebounce from "../../../utils/hooks/useDebounce";
import getQuoteTypeIndicator from "../../../utils/helpers/getQuoteTypeIndicator";
import SecondBarOption from "./SecondBarOption";
import PremiumHint from "../../../components/PremiumHint";
import { freeUserRefreshRateInSeconds } from "../../../data/static/refreshRate";
import Switch from "../../../components/Switch";
import Checkbox from "../../../components/Checkbox";
import SolidSelect from "../../../components/SolidSelect";
import MultiSelect from "../../../components/MultiSelect";

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

  const onCheckShowSecondBar = (e: React.ChangeEvent<HTMLInputElement>) => {
    chrome.storage.sync.set({
      [StorageKeys.showSecondBar]: e.target.checked,
    });
  };

  const onChangeSecondBarType = (type: SecondaryBarTypeOptions) => {
    chrome.storage.sync.set({
      [StorageKeys.secondBarType]: type,
    });
  };

  const onCheckSwitchIndicationColors = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
        <Switch checked={toolbarVisible} onChange={onToolbarVisibleToggle} />
      </Option>

      <Option>
        <Box display="flex" alignItems="center" gap="5px">
          <b>Quotes to monitor:</b>
          <span
            style={{
              fontSize: 10,
              color: "rgba(0, 0, 0, 0.45)",
              fontWeight: 400,
            }}
          >
            Stocks, Indices, Crypto.. etc
          </span>
        </Box>
        <MultiSelect
          placeholder="Select symbols"
          value={chosenSymbolsList}
          searchValue={typedSymbol}
          onSearch={(s) => setTypesQuery(s)}
          onChange={onSymbolsListChange}
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
              {getQuoteTypeIndicator({ quoteType, typeDisp })}
              {!isSubscriptionActive && quoteType === "CRYPTOCURRENCY" && (
                <PremiumHint isSubscriptionStopped={isSubscriptionStopped} />
              )}
            </Box>
          )}
          notFoundContent="No options found"
          onBlur={() => setTypesQuery("")}
          filterOption={false}
        />
      </Option>

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

      <Option>
        <Box display="flex" flexDirection="column" gap="5px">
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
        </Box>
      </Option>

      <Option>
        <Box display="flex" flexDirection="column" gap="5px">
          <b>Where is the toolbar shown?:</b>
          <Radio.Group
            onChange={onChangeWebsiteVisibilityOption}
            value={websiteVisibility}
          >
            <Box display="flex" flexDirection="column" gap="5px">
              <Radio value={WebsiteVisibilityOptions.All}>
                Shown on all websites
              </Radio>
              <Radio value={WebsiteVisibilityOptions.Selected}>
                Only shown on selected websites
              </Radio>
              {websiteVisibility === WebsiteVisibilityOptions.Selected ? (
                <Box display="flex" flexDirection="column" gap="5px">
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
                </Box>
              ) : null}
            </Box>
          </Radio.Group>
        </Box>
      </Option>

      <Option>
        <Box display="flex" alignItems="center" gap="5px">
          <b>Color indications:</b>
        </Box>
        <Checkbox
          checked={switchIndicationColors}
          onChange={onCheckSwitchIndicationColors}
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
      </Option>

      <Option>
        <Box display="flex" flexDirection="column" gap="10px">
          <b>Toolbar type:</b>
          <SolidSelect
            name="toolbar-type"
            value={toolbarMotionType}
            onChange={(value) =>
              onChangeToolbarMotionType({
                target: { value },
              } as RadioChangeEvent)
            }
            options={[
              {
                value: ToolbarMotionTypeOptions.scrolling,
                label: "Scrolling",
              },
              {
                value: ToolbarMotionTypeOptions.static,
                label: "Static",
              },
            ]}
          />
        </Box>
      </Option>

      <Option>
        <Box display="flex" flexDirection="column" gap="10px">
          <b>Toolbar position:</b>
          <SolidSelect
            name="toolbar-position"
            value={toolbarPosition}
            onChange={(value) =>
              onChangeToolbarPosition({ target: { value } } as RadioChangeEvent)
            }
            options={[
              {
                value: ToolbarPositionOptions.top,
                label: "Top",
              },
              {
                value: ToolbarPositionOptions.bottom,
                label: "Bottom",
              },
            ]}
          />
        </Box>
      </Option>
    </>
  );
};

export default Options;

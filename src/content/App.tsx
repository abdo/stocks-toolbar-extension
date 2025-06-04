/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import { useEffect, useState } from "react";
import LocalStorageKeys from "../data/constants/localStorageKeys";
import StorageKeys, {
  defaultStorageValues,
  SubscriptionStatusTypeOptions,
  ToolbarPositionOptions,
} from "../data/constants/storageKeys";
import WebsiteVisibilityOptions from "../data/constants/websiteVisibilityOptions";
import parseStorageValues from "../utils/parseStorageValues";
import BarInfo from "./components/BarInfo";
import { AppStyled } from "./style";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [currentStorageValues, setCurrentStorageValues] = useState<{
    [key: string]: any;
  }>(defaultStorageValues);

  let {
    [StorageKeys.subscriptionStatus]: subscriptionStatus,
    [StorageKeys.toolbarVisible]: toolbarVisibleStoredValue,
    [StorageKeys.websiteVisibility]: websiteVisibility,
    [StorageKeys.selectedWebsitesList]: selectedWebsitesList,
    [StorageKeys.toolbarPosition]: toolbarPosition,
    [StorageKeys.showSecondBar]: showSecondBar,
    [StorageKeys.isOnline]: isOnline,
    [StorageKeys.subscriptionId]: subscriptionId,
  } = currentStorageValues;

  const isSubscriptionActive =
    subscriptionStatus === SubscriptionStatusTypeOptions.active;

  if (!isSubscriptionActive) {
    showSecondBar = false;
  }

  const currentUrl = window.location.href;

  const toolbarVisible =
    // saved value for toolbarVisible is true
    toolbarVisibleStoredValue &&
    // storage values have been extracted
    currentStorageValues.storageInitiallyChecked &&
    // current website is chosen for toolbar visibility
    (websiteVisibility === WebsiteVisibilityOptions.All ||
      selectedWebsitesList.some((website: string) =>
        currentUrl.includes(website)
      )) &&
    // internet is on
    isOnline;

  const numberOfBars = showSecondBar ? 2 : 1;
  const contentHeight = `${numberOfBars * 30}px`;
  const barHeight = "30px";

  // Adjusting the page to suit the header when it is -visible & at the top-
  useEffect(() => {
    const body = document.querySelector("body");

    // Potential page headers
    const getElement = (el: string) => document.querySelector<HTMLElement>(el);
    const documentHeader =
      getElement("#global-nav") ||
      getElement("header") ||
      getElement("nav") ||
      getElement("#topnav") ||
      getElement("#masthead-container");

    const headerTopAttribute =
      documentHeader && getComputedStyle(documentHeader).top.toString();
    const headerPositionAttribute =
      documentHeader && getComputedStyle(documentHeader).position.toString();

    // Configuring the page header specifically for google pages
    const isGoogleUrl =
      currentUrl.includes("google.com") && !currentUrl.includes("mail");

    // Configuring the page header specifically for linkedin pages
    const isLinkedInUrl = currentUrl.includes("linkedin.com");

    const shouldModifyPage =
      toolbarVisible && toolbarPosition === ToolbarPositionOptions.top;

    if (shouldModifyPage) {
      body?.style.setProperty("margin-top", contentHeight, "important");

      if (
        headerTopAttribute &&
        ["absolute", "fixed"].includes(headerPositionAttribute as string)
      ) {
        // Configuring the page header (for pages that have header)
        // to suit the content to be injected
        documentHeader?.style.setProperty("top", contentHeight, "important");
      }
      if (isGoogleUrl) {
        const googleSearch = document.querySelector<HTMLElement>("form#tsf");
        googleSearch?.style?.setProperty?.(
          "margin-top",
          contentHeight,
          "important"
        );

        const googleHeader = document.querySelector<HTMLElement>("div.sfbg");
        googleHeader?.style?.setProperty?.(
          "margin-top",
          `calc(${contentHeight} - 20px)`,
          "important"
        );
      }
      if (isLinkedInUrl) {
        const userSection = document.querySelector<HTMLElement>(
          "section.scaffold-layout-toolbar"
        );
        userSection?.style?.setProperty?.(
          "top",
          `calc(${contentHeight} + 50px)`,
          "important"
        );
      }

      // When toolbar is hidden
    } else {
      body?.style.setProperty("margin-top", "0px", "important");

      if (headerTopAttribute?.includes(contentHeight)) {
        // Configuring the page header (for pages that have header)
        // to suit the content to be injected
        documentHeader?.style.setProperty("top", "0px", "important");
      }
      if (isGoogleUrl) {
        const googleSearch = document.querySelector<HTMLElement>("form#tsf");
        googleSearch?.style?.setProperty?.("margin-top", "0px", "important");

        const googleHeader = document.querySelector<HTMLElement>("div.sfbg");
        googleHeader?.style?.setProperty?.("margin-top", "-20px", "important");
      }
      if (isLinkedInUrl) {
        const userSection = document.querySelector<HTMLElement>(
          "section.scaffold-layout-toolbar"
        );
        userSection?.style?.setProperty?.("top", `50px`, "important");
      }
    }
  }, [toolbarVisible, toolbarPosition, contentHeight]);

  const onChangeOnlineState = (value: boolean) => {
    chrome.storage.sync.set({
      [StorageKeys.isOnline]: value,
    });
  };

  useEffect(() => {
    // get storage values in the beginning
    chrome.storage.sync.get(null, parseAndSetStorageValues);

    // listener for storage values
    chrome.storage.onChanged.addListener(parseAndSetStorageValues);

    // Detect when offline
    window.addEventListener("offline", () => onChangeOnlineState(false));
    window.addEventListener("online", () => onChangeOnlineState(true));
  }, []);

  // Check for subscription id added by payment page
  const passedSubscriptionId = localStorage?.getItem?.(
    LocalStorageKeys.financialtoolbarsubscriptionid
  );
  const storageSavedSubscriptionId = subscriptionId;
  const shouldSetNewStorageSavedSubscriptionId =
    passedSubscriptionId && passedSubscriptionId !== storageSavedSubscriptionId;

  if (shouldSetNewStorageSavedSubscriptionId) {
    chrome.storage.sync.set({
      [StorageKeys.subscriptionId]: passedSubscriptionId,
    });
    localStorage?.removeItem?.(LocalStorageKeys.financialtoolbarsubscriptionid);
  }

  // Detect when offline
  useEffect(() => {
    onChangeOnlineState(navigator.onLine);
  }, [navigator.onLine]);

  const parseAndSetStorageValues = (values: chrome.storage.StorageChange) => {
    const parsedValues = parseStorageValues(values);

    setCurrentStorageValues((values) => ({
      ...values,
      ...parsedValues,
      storageInitiallyChecked: true,
    }));
    // saving userId to local storage for the payment page to consume
    const userId = parsedValues[StorageKeys.userId];
    if (userId) {
      localStorage?.setItem?.(LocalStorageKeys.financialtoolbaruserid, userId);
    }
  };

  if (!toolbarVisible) {
    return null;
  }

  return (
    <AppStyled $height={contentHeight} $position={toolbarPosition} dir="ltr">
      <Toaster />
      <BarInfo
        currentStorageValues={currentStorageValues}
        isSecondaryBar={false}
        numberOfBars={numberOfBars}
        barHeight={barHeight}
        hidden={!toolbarVisible}
        isSubscriptionActive={isSubscriptionActive}
      />
      <BarInfo
        currentStorageValues={currentStorageValues}
        isSecondaryBar
        numberOfBars={numberOfBars}
        barHeight={barHeight}
        hidden={!showSecondBar}
        isSubscriptionActive={isSubscriptionActive}
      />
    </AppStyled>
  );
};

export default App;

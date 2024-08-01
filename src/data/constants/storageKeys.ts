import { defaultCompanies } from "../static/companies";
import WebsiteVisibilityOptions from "./websiteVisibilityOptions";

enum StorageKeys {
  chosenSymbolsList,
  toolbarVisible,
  websiteVisibility,
  selectedWebsitesList,
  switchIndicationColors,
  refreshStockDataInterval,
  toolbarPosition,
  showSecondBar,
  secondBarType,
  toolbarMotionType,
  isOnline,
  subscriptionStatus,
  subscriptionStatusUpdatedAt,
  hasClickedSubscribe,
  subscriptionId,
  financeApiCrumb,
  financeApiCookie,
  userId = "userId",
}

export default StorageKeys;

export enum SecondaryBarTypeOptions {
  INDEX_FUNDS,
  MOST_ACTIVE,
  CRYPTO,
  TOP_GAINERS,
  TOP_LOSERS,
}

export enum ToolbarPositionOptions {
  top,
  bottom,
}

export enum ToolbarMotionTypeOptions {
  scrolling,
  static,
}

export enum SubscriptionStatusTypeOptions {
  active,
  notActive,
  stopped,
}

export const defaultStorageValues = {
  [StorageKeys.chosenSymbolsList]: defaultCompanies,
  [StorageKeys.toolbarVisible]: true,
  [StorageKeys.websiteVisibility]: WebsiteVisibilityOptions.All,
  [StorageKeys.selectedWebsitesList]: [],
  [StorageKeys.switchIndicationColors]: false,
  [StorageKeys.refreshStockDataInterval]: 60,
  [StorageKeys.toolbarPosition]: ToolbarPositionOptions.top,
  [StorageKeys.showSecondBar]: false,
  [StorageKeys.secondBarType]: SecondaryBarTypeOptions.MOST_ACTIVE,
  [StorageKeys.toolbarMotionType]: ToolbarMotionTypeOptions.scrolling,
  [StorageKeys.isOnline]: true,
  [StorageKeys.userId]: "",
  [StorageKeys.subscriptionStatus]: null,
  [StorageKeys.subscriptionStatusUpdatedAt]: null,
  [StorageKeys.hasClickedSubscribe]: false,
  [StorageKeys.subscriptionId]: "",
};

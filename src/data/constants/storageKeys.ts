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
  showGainersBar,
  toolbarMotionType,
  isOnline,
  userId,
};

export default StorageKeys;

export enum ToolbarPositionOptions {
  top,
  bottom
};

export enum ToolbarMotionTypeOptions {
  scrolling,
  static
};

export const defaultStorageValues = {
  [StorageKeys.chosenSymbolsList]: defaultCompanies,
  [StorageKeys.toolbarVisible]: true,
  [StorageKeys.websiteVisibility]: WebsiteVisibilityOptions.All,
  [StorageKeys.selectedWebsitesList]: [],
  [StorageKeys.switchIndicationColors]: false,
  [StorageKeys.refreshStockDataInterval]: 60,
  [StorageKeys.toolbarPosition]: ToolbarPositionOptions.top,
  [StorageKeys.showGainersBar]: false,
  [StorageKeys.toolbarMotionType]: ToolbarMotionTypeOptions.scrolling,
  [StorageKeys.isOnline]: true,
  [StorageKeys.userId]: '',
};
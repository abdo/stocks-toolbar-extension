import { defaultCompanies } from "../static/companies";
import WebsiteVisibilityOptions from "./websiteVisibilityOptions";

enum StorageKeys {
  chosenSymbolsList,
  toolbarVisible,
  websiteVisibility,
  selectedWebsitesList,
};

export default StorageKeys;

export const defaultStorageValues = {
  [StorageKeys.chosenSymbolsList]: defaultCompanies,
  [StorageKeys.toolbarVisible]: true,
  [StorageKeys.websiteVisibility]: WebsiteVisibilityOptions.All,
  [StorageKeys.selectedWebsitesList]: [],
};
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    // Code to be executed on first install
    chrome.identity.getProfileUserInfo(
      { accountStatus: chrome.identity.AccountStatus.ANY },
      function (userInfo) {
        const userEmail = userInfo?.email;
        chrome.tabs.create({
          url: `https://tastola.com/investfellowsetup?userId=${userEmail}`,
        });
      }
    );
  } else if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
    // When extension is updated
  } else if (
    details.reason === chrome.runtime.OnInstalledReason.CHROME_UPDATE
  ) {
    // When browser is updated
  } else if (
    details.reason === chrome.runtime.OnInstalledReason.SHARED_MODULE_UPDATE
  ) {
    // When a shared module is updated
  }
});

// setting user email
chrome.identity.getProfileUserInfo(
  { accountStatus: chrome.identity.AccountStatus.ANY },
  function (userInfo) {
    const userEmail = userInfo?.email;
    if (userEmail) {
      chrome.storage.sync.set({
        userId: userEmail,
      });
    }
  }
);

chrome.commands.onCommand.addListener((shortcut) => {
  if (shortcut === "reload-e") {
    chrome.runtime.reload();
  }
});

// the extension reloads when the browser is focused, only in development
chrome.windows.onFocusChanged.addListener(() => {
  const isDevMode = !("update_url" in chrome.runtime.getManifest());

  if (isDevMode) {
    chrome.runtime.reload();
  }
});

// For clearing storage for testing:
// chrome.storage.sync.clear();

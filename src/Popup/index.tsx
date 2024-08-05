/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import React, { useEffect, useState } from "react";
import StorageKeys, {
  defaultStorageValues,
  SubscriptionStatusTypeOptions,
} from "../data/constants/storageKeys";
import parseStorageValues from "../utils/parseStorageValues";
import Options from "./components/Options";
import { AppStyled } from "./style";
import MainLogo from "../components/MainLogo";
import Box from "../components/Box";
import getSubscriptionStatus from "../utils/requests/getSubscriptionStatus";
import getHoursDiff from "../utils/helpers/getHoursDiff";
import { Skeleton, Typography } from "antd";
import theme from "../style/theme";

const { Link } = Typography;

function App() {
  const [currentStorageValues, setCurrentStorageValues] = useState<{
    [key: string]: any;
  }>(defaultStorageValues);

  const [isLoadingSubscriptionStatus, setIsLoadingSubscriptionStatus] =
    useState<boolean>(false);

  useEffect(() => {
    // get storage values in the beginning
    chrome.storage.sync.get(null, parseAndSetStorageValues);

    // listener for storage values
    chrome.storage.onChanged.addListener(parseAndSetStorageValues);

    // setting user email
    // it is already sat from background file, but again here just in case
    chrome.identity.getProfileUserInfo(
      { accountStatus: chrome.identity.AccountStatus.ANY },
      function (userInfo) {
        const userEmail = userInfo?.email;
        if (userEmail) {
          chrome.storage.sync.set({
            [StorageKeys.userId]: userEmail,
          });
        }
      }
    );
  }, []);

  const parseAndSetStorageValues = (values: chrome.storage.StorageChange) => {
    const parsedValues = parseStorageValues(values);

    setCurrentStorageValues((values) => ({
      ...values,
      ...parsedValues,
    }));
  };

  const {
    [StorageKeys.isOnline]: isOnline,
    [StorageKeys.userId]: userId,
    [StorageKeys.subscriptionStatus]: subscriptionStatus,
    [StorageKeys.subscriptionStatusUpdatedAt]: subscriptionStatusUpdatedAt,
    [StorageKeys.hasClickedSubscribe]: hasClickedSubscribe,
    [StorageKeys.subscriptionId]: subscriptionId,
  } = currentStorageValues;

  const isSubscriptionActive =
    subscriptionStatus === SubscriptionStatusTypeOptions.active;

  // Check user subscription status
  useEffect(() => {
    const subscriptionLastUpdatedInHours = subscriptionStatusUpdatedAt
      ? getHoursDiff({
          startDate: new Date(subscriptionStatusUpdatedAt),
          endDate: new Date(),
        })
      : 0;

    const wasSubscriptionUpdatedRecently: boolean =
      subscriptionStatusUpdatedAt && subscriptionLastUpdatedInHours < 24;
    const noNeedForSubscriptionCheck =
      wasSubscriptionUpdatedRecently && isSubscriptionActive;
    const needToCheckSubscription = userId && !noNeedForSubscriptionCheck;

    if (needToCheckSubscription) {
      setIsLoadingSubscriptionStatus(true);
      getSubscriptionStatus({ userId, subscriptionId })
        .then((data) => {
          const status = data.status;
          const newSubscriptionStatus =
            status === "NOT ACTIVE"
              ? SubscriptionStatusTypeOptions.notActive
              : status === "STOPPED"
              ? SubscriptionStatusTypeOptions.stopped
              : SubscriptionStatusTypeOptions.active;
          chrome.storage.sync.set({
            [StorageKeys.subscriptionStatus]: newSubscriptionStatus,
            [StorageKeys.subscriptionStatusUpdatedAt]: new Date().toJSON(),
            [StorageKeys.hasClickedSubscribe]:
              newSubscriptionStatus === SubscriptionStatusTypeOptions.active
                ? false
                : hasClickedSubscribe,
          });
        })
        .finally(() => setIsLoadingSubscriptionStatus(false));
    }
  }, [userId, subscriptionId]);

  const PopupContainer = ({ children }: { children: React.ReactNode }) => (
    <AppStyled>
      <Box m="0 0 30px -10px">
        <Box
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <MainLogo />
          <Link
            style={{
              color: "#0057d1",
              fontWeight: 500,
              textDecoration: "underline",
            }}
          >
            {userId}
          </Link>
        </Box>
        {children}
      </Box>
      <Box
        w="fit-content"
        onClick={() =>
          chrome.tabs.create({ url: "mailto: contact@tastola.com" })
        }
        color={theme.colors.secondary}
        pointer
        fz="14px"
      >
        Contact us
      </Box>
    </AppStyled>
  );

  if (!isOnline) {
    return (
      <PopupContainer>
        <Box m="30px 0 0">
          <b>Please make sure you are connected to the internet.</b>
        </Box>
      </PopupContainer>
    );
  }

  if (isLoadingSubscriptionStatus) {
    return (
      <PopupContainer>
        <br />
        <br />
        <br />
        <br />
        <Skeleton active />
      </PopupContainer>
    );
  }

  return (
    <PopupContainer>
      <Options currentStorageValues={currentStorageValues} />
    </PopupContainer>
  );
}

export default App;

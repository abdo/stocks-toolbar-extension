import { useEffect, useState } from "react";
import Box from "../../../components/Box";
import StorageKeys from "../../../data/constants/storageKeys";
import theme from "../../../style/theme";

// This component is not used anymore

type Props = {
  hasClickedSubscribe: boolean;
  isSubscriptionStopped: boolean;
};

const UnpaidContent = ({
  hasClickedSubscribe,
  isSubscriptionStopped,
}: Props) => {
  const [userEmail, setUserEmail] = useState("");

  const checkUserEmail = () => {
    chrome.identity.getProfileUserInfo(
      { accountStatus: chrome.identity.AccountStatus.ANY },
      (userInfo) => {
        const userEmail = userInfo?.email;
        setUserEmail(userEmail);
      }
    );
  };

  useEffect(() => {
    checkUserEmail();
  }, []);

  const onSubscribe = () => {
    chrome.storage.sync.set({
      [StorageKeys.hasClickedSubscribe]: true,
    });
    window.open(`https://tastola.com/investfellowsetup?userId=${userEmail}`);
  };

  return (
    <Box>
      {hasClickedSubscribe ? (
        <h3 style={{ color: theme.colors.primary, fontWeight: "bold" }}>
          Have you already subscribed?
          <br />
          It will just take a minute to reflect.
        </h3>
      ) : isSubscriptionStopped ? (
        <h3 style={{ color: theme.colors.primary, fontWeight: "bold" }}>
          It looks like your subscription has stopped or was paused.
          <br />
          Subscribe again to continue using InvestFellow
        </h3>
      ) : (
        <h3 style={{ color: theme.colors.primary, fontWeight: "bold" }}>
          Thank you for trusting InvestFellow.
        </h3>
      )}
      <br />
      <h4 style={{ color: theme.colors.primary }}>
        You are now ready to constantly get{" "}
        <span style={{ fontWeight: "bold" }}>real time</span> stock market
        information about your favorite stocks.. and many more features.
      </h4>
      <br />
      {userEmail ? (
        <>
          <Box hidden={isSubscriptionStopped}>
            <h4 style={{ color: theme.colors.primary }}>
              Subscription will be automatically associated with your{" "}
              <span style={{ fontWeight: "bold" }}>Google account</span>, to
              avoid any signup hustle.
            </h4>
          </Box>
          <br />
          <button style={{ fontWeight: "bold" }} onClick={onSubscribe}>
            {isSubscriptionStopped ? "Subscribe" : "Try for free"}
          </button>
        </>
      ) : (
        <Box>
          <h4 style={{ color: theme.colors.primary }}>
            It looks like you are not signed up with a chrome{" "}
            <span style={{ fontWeight: "bold" }}>Google account</span> (or in
            guest mode), please make sure you are signed up with a Google
            account to be able to use InvestFellow.
          </h4>
          <br />
          <button style={{ fontWeight: "bold" }} onClick={checkUserEmail}>
            Try again
          </button>
        </Box>
      )}
    </Box>
  );
};

export default UnpaidContent;

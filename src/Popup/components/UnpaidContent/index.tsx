import { Button } from 'antd';
import Box from '../../../components/Box';
import StorageKeys from '../../../data/constants/storageKeys';
import theme from '../../../style/theme';

type Props = {
  hasClickedSubscribe: boolean;
  isSubscriptionStopped: boolean;
};

const UnpaidContent = ({
  hasClickedSubscribe,
  isSubscriptionStopped,
}: Props) => {
  const onSubscribe = () => {
    chrome.storage.sync.set({
      [StorageKeys.hasClickedSubscribe]: true,
    });
    chrome.identity.getProfileUserInfo(
      { accountStatus: chrome.identity.AccountStatus.ANY },
      function (userInfo) {
        const userEmail = userInfo.email;
        window.open(
          `https://tastola.com/investfellowsetup?userId=${userEmail}`,
        );
      },
    );
  };

  return (
    <Box>
      {hasClickedSubscribe ? (
        <h3 style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
          Have you already subscribed?
          <br />
          It will just take a minute to reflect.
        </h3>
      ) : isSubscriptionStopped ? (
        <h3 style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
          It looks like your subscription has stopped or was paused.
          <br />
          Subscribe again to continue using InvestFellow
        </h3>
      ) : (
        <h3 style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
          Thank you for trusting InvestFellow.
        </h3>
      )}
      <br />
      <h4 style={{ color: theme.colors.primary }}>
        You are now ready to constantly get{' '}
        <span style={{ fontWeight: 'bold' }}>real time</span> stock market
        information about your favorite stocks.. and many more features.
      </h4>
      <br />
      <Box hidden={isSubscriptionStopped}>
        <h4 style={{ color: theme.colors.primary }}>
          Subscription will be automatically associated with your{' '}
          <span style={{ fontWeight: 'bold' }}>Google account</span>, to avoid
          any signup hustle.
        </h4>
      </Box>
      <br />
      <Button
        type='primary'
        style={{ fontWeight: 'bold' }}
        size='large'
        shape='round'
        onClick={onSubscribe}
      >
        {isSubscriptionStopped ? 'Subscribe' : 'Try for free'}
      </Button>
    </Box>
  );
};

export default UnpaidContent;

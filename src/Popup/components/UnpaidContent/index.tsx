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
          You have just chosen Invest Fellow, thank you!
        </h3>
      )}
      <br />
      <h3 style={{ color: theme.colors.black }}>
        You are ready to always get{' '}
        <span style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
          real time
        </span>{' '}
        stock market information about your favorite stocks.. and many more
        features.
      </h3>
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

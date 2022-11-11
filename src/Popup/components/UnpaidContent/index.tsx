import { Button } from 'antd';
import React from 'react';
import Box from '../../../components/Box';
import theme from '../../../style/theme';

const UnpaidContent: React.FC = () => {
  const onSubscribe = () => {
    chrome.identity.getProfileUserInfo(
      { accountStatus: chrome.identity.AccountStatus.ANY },
      function (userInfo) {
        const userEmail = userInfo.email;
        window.open(
          `http://127.0.0.1:5500/investfellowsetup.html?userId=${userEmail}`,
        );
      },
    );
  };

  return (
    <Box>
      <h3 style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
        You have just chosen Invest Fellow, thank you!
      </h3>
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
        Try for free
      </Button>
    </Box>
  );
};

export default UnpaidContent;

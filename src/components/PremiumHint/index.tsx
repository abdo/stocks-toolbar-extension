import { CrownFilled } from "@ant-design/icons";
import { Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import Box from "../Box";

const { Link } = Typography;

type Props = {
  message?: string;
  isSubscriptionStopped?: boolean;
  isPlain?: boolean;
  tryText?: string;
};

const PremiumHint = ({
  message,
  isSubscriptionStopped,
  isPlain,
  tryText,
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

  const tryContent = (
    <Link
      href={`https://tastola.com/investfellowsetup?userId=${userEmail}#pricing`}
      target="_blank"
    >
      {isSubscriptionStopped ? "Subscribe again" : tryText || "Try for free"}
    </Link>
  );

  const motivatorContent = (
    <Box display="flex" alignItems="center" gap="5px">
      <Box>{message || "Premium feature"}</Box>
      {tryContent}
    </Box>
  );

  return isPlain ? (
    tryContent
  ) : (
    <Tooltip title={motivatorContent}>
      <CrownFilled
        style={{
          color: "#ceb300",
          fontSize: 18,
          cursor: "pointer",
        }}
      />
    </Tooltip>
  );
};

export default PremiumHint;

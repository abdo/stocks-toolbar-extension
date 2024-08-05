import { CrownFilled } from "@ant-design/icons";
import { Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import Box from "../Box";

const { Link } = Typography;

const PremiumHint = ({
  message,
  isSubscriptionStopped,
}: {
  message?: string;
  isSubscriptionStopped?: boolean;
}) => {
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
    window.open(
      `https://tastola.com/investfellowsetup?userId=${userEmail}#pricing`
    );
  };

  return (
    <Tooltip
      title={
        <Box display="flex" alignItems="center" gap="5px">
          <Box>{message || "Premium feature"}</Box>
          <Link
            href={`https://tastola.com/investfellowsetup?userId=${userEmail}#pricing`}
            target="_blank"
          >
            {isSubscriptionStopped ? "Subscribe again" : "Try for free"}
          </Link>
        </Box>
      }
    >
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

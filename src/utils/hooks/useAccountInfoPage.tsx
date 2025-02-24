import Box from "../../components/Box";
import ContactUs from "../../components/ContactUs";
import KeyValue from "../../components/KeyValue";
import PremiumHint from "../../components/PremiumHint";
import toast from "react-hot-toast";
import styled from "styled-components";

type Props = {
  isSubscriptionActive: boolean;
  userId: string;
};

const ToastContent = styled.div`
  padding: 8px;
  min-width: 300px;
`;

const ToastHeader = styled.div`
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 8px;
`;

const useAccountInfoPage = ({ isSubscriptionActive, userId }: Props) => {
  const renderSubscriptionStatusContent = (args?: { plainHint?: boolean }) => {
    const plainHint = args?.plainHint;

    return (
      <KeyValue
        k="Subscription status"
        v={
          isSubscriptionActive ? (
            <>Active ✅</>
          ) : (
            <Box display="flex" alignItems="center" gap="5px" m="0 5px 5px">
              <span>Free</span>
              <PremiumHint
                message="Upgrade to premium"
                isPlain={plainHint}
                tryText="Try Premium"
              />
            </Box>
          )
        }
      />
    );
  };

  const pageContent = (
    <ToastContent>
      <ToastHeader>My Account</ToastHeader>
      {renderSubscriptionStatusContent({ plainHint: true })}
      <br />
      <KeyValue k="ID" v={userId} />
      <br />
      <ContactUs />
    </ToastContent>
  );

  const openAccountInfo = () => {
    toast(pageContent, {
      duration: Infinity,
      position: "bottom-right",
      style: {
        background: "#fff",
        color: "#000",
        padding: "0",
        boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
      },
    });
  };

  return {
    openAccountInfo,
    renderSubscriptionStatusContent,
  };
};

export default useAccountInfoPage;

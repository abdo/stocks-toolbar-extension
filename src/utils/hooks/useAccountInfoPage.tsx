import Box from "../../components/Box";
import ContactUs from "../../components/ContactUs";
import KeyValue from "../../components/KeyValue";
import PremiumHint from "../../components/PremiumHint";
import { notification } from "antd";

type Props = {
  isSubscriptionActive: boolean;
  userId: string;
};

const useAccountInfoPage = ({ isSubscriptionActive, userId }: Props) => {
  const [api, contextHolder] = notification.useNotification();

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
    <>
      {renderSubscriptionStatusContent({ plainHint: true })}
      <br />
      <KeyValue k="ID" v={userId} />
      <br />
      <ContactUs />
    </>
  );

  const openAccountInfo = () => {
    api.open({
      message: "My Account",
      description: pageContent,
      duration: 0,
      placement: "bottomRight",
    });
  };

  return {
    openAccountInfo,
    renderSubscriptionStatusContent,
    // contextHolder needs to be rendered to be able to show the account info notification
    contextHolder,
  };
};

export default useAccountInfoPage;

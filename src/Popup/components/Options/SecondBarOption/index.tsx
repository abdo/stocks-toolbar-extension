import Box from "../../../../components/Box";
import { SecondaryBarTypeOptions } from "../../../../data/constants/storageKeys";
import PremiumHint from "../../../../components/PremiumHint";
import Checkbox from "../../../../components/Checkbox";
import SolidSelect from "../../../../components/SolidSelect";

type Props = {
  showSecondBar: boolean;
  onCheckShowSecondBar: (e: React.ChangeEvent<HTMLInputElement>) => void;
  secondBarType: SecondaryBarTypeOptions;
  onChangeSecondBarType: (type: SecondaryBarTypeOptions) => void;
  isSubscriptionActive?: boolean;
  isSubscriptionStopped?: boolean;
};

const secondaryBarOptions = [
  {
    value: SecondaryBarTypeOptions.INDEX_FUNDS,
    label: "Index Funds",
  },
  {
    value: SecondaryBarTypeOptions.MOST_ACTIVE,
    label: "Most Active",
  },
  {
    value: SecondaryBarTypeOptions.CRYPTO,
    label: "Crypto",
  },
  {
    value: SecondaryBarTypeOptions.TOP_GAINERS,
    label: "Top Gainers",
  },
  {
    value: SecondaryBarTypeOptions.TOP_LOSERS,
    label: "Top Losers",
  },
];

const SecondBarOption = ({
  showSecondBar,
  onCheckShowSecondBar,
  secondBarType,
  onChangeSecondBarType,
  isSubscriptionActive,
  isSubscriptionStopped,
}: Props) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start">
      <Box display="flex" alignItems="center" gap="5px">
        <b>Secondary toolbar:</b>
        {!isSubscriptionActive && (
          <PremiumHint isSubscriptionStopped={isSubscriptionStopped} />
        )}
      </Box>

      <Checkbox
        onChange={onCheckShowSecondBar}
        checked={showSecondBar}
        disabled={!isSubscriptionActive}
      >
        Show the secondary toolbar
      </Checkbox>

      <Box
        style={{
          opacity: !showSecondBar ? 0.5 : 1,
          pointerEvents: !showSecondBar ? "none" : "auto",
        }}
      >
        <SolidSelect
          name="secondary-bar-type"
          value={secondBarType}
          onChange={onChangeSecondBarType}
          options={secondaryBarOptions}
        />
      </Box>
    </Box>
  );
};

export default SecondBarOption;

import { Checkbox, Radio, Space } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { RadioGroup } from "./style";
import { SecondaryBarTypeOptions } from "../../../../data/constants/storageKeys";
import Box from "../../../../components/Box";
import PremiumHint from "../../../../components/PremiumHint";

type Props = {
  showSecondBar: boolean;
  onCheckShowSecondBar: (e: CheckboxChangeEvent) => void;
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
    <Space direction="vertical">
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
      <RadioGroup
        value={showSecondBar && secondBarType}
        buttonStyle="solid"
        disabled={!showSecondBar}
        onChange={({ target: { value } }) => onChangeSecondBarType(value)}
      >
        {secondaryBarOptions.map((option) => (
          <Radio.Button key={option.value} value={option.value}>
            {option.label}
          </Radio.Button>
        ))}
      </RadioGroup>
    </Space>
  );
};

export default SecondBarOption;

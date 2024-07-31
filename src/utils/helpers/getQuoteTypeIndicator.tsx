import { ReactNode } from "react";
import { Tag } from "antd";

const colorPerStockType: Record<string, string> = {
  EQUITY: "#61b03f",
  INDEX: "#2db7f5",
  FUTURE: "#FFC107",
  CRYPTOCURRENCY: "#f50",
};

const defaultColor = "#b976fb";

const getQuoteTypeIndicator = ({
  quoteType = "EQUITY",
  typeDisp = "Equity",
}: {
  quoteType?: string;
  typeDisp?: string;
}): ReactNode => {
  const color = colorPerStockType[quoteType] || defaultColor;
  return <Tag color={color}>{typeDisp}</Tag>;
};

export default getQuoteTypeIndicator;

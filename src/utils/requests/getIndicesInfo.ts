import getStocksInfo from "./getStocksInfo";

const indicesSymbols = [
  "^GSPC",
  "^DJI",
  "^IXIC",
  "^NYA",
  "^XAX",
  "^BUK100P",
  "^RUT",
  "^VIX",
  "^FTSE",
  "^GDAXI",
  "^FCHI",
  "^STOXX50E",
  "^N100",
  "^BFX",
  "MOEX.ME",
  "^HSI",
  "^STI",
  "^AXJO",
  "^AORD",
  "^BSESN",
  "^JKSE",
  "^KLSE",
  "^NZ50",
  "^KS11",
  "^TWII",
  "^GSPTSE",
  "^BVSP",
  "^MXX",
  "^IPSA",
  "^MERV",
  "^TA125.TA",
  "^CASE30",
  "^JN0U.JO",
];

const getIndicesInfo = ({
  crumb: passedCrumb,
  cookie: passedCookie,
}: {
  crumb?: string;
  cookie?: string;
}) => {
  return getStocksInfo({
    chosenSymbolsList: indicesSymbols,
    crumb: passedCrumb,
    cookie: passedCookie,
  });
};

export default getIndicesInfo;

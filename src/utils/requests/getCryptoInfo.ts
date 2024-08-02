import getStocksInfo from "./getStocksInfo";

const cryptoSymbols = [
  "BTC-USD",
  "ETH-USD",
  "BNB-USD",
  "XRP-USD",
  "USDT-USD",
  "ADA-USD",
  "DOGE-USD",
  "SOL-USD",
  "DOT-USD",
  "LTC-USD",
  "BCH-USD",
  "LINK-USD",
  "MATIC-USD",
  "XLM-USD",
  "ATOM-USD",
  "UNI1-USD",
  "VET-USD",
  "ALGO-USD",
  "TRX-USD",
  "ETC-USD",
  "FIL-USD",
  "EOS-USD",
  "XTZ-USD",
  "AAVE-USD",
  "THETA-USD",
  "DAI-USD",
  "CRO-USD",
  "MKR-USD",
  "XMR-USD",
  "NEO-USD",
];

const getCryptoInfo = ({
  crumb: passedCrumb,
  cookie: passedCookie,
}: {
  crumb?: string;
  cookie?: string;
}) => {
  return getStocksInfo({
    chosenSymbolsList: cryptoSymbols,
    crumb: passedCrumb,
    cookie: passedCookie,
  });
};

export default getCryptoInfo;

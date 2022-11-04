const getStocksSnapshot = ({ chosenSymbolsList }: { chosenSymbolsList: string[] }) => {
  return fetch(
    `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?tickers=${chosenSymbolsList.join(',')}&apiKey=aGIqQW9gjVprdQlMNXhDB_LQUDmtSicU`,
  )
    .then((response) => response.json());
};

export default getStocksSnapshot;
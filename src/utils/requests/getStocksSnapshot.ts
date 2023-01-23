const getStocksSnapshot = ({ chosenSymbolsList }: { chosenSymbolsList: string[] }) => {
  return fetch(
    `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?tickers=${chosenSymbolsList.join(',')}&apiKey=${process.env.polygonApiKey}`,
  )
    .then((response) => response.json());
};

export default getStocksSnapshot;
export type StockData = {
  name: string;
  price: number;
  priceBeforeClose: number;
  todaysChange: number;
  todaysChangePerc: number;
  isMarketClosed: boolean;
  askPrice: number;
  bidPrice: number;
  logo: string;
  exchange: string;
  company: string;
};

const formatStocksData = (data: Object[]): StockData[] =>
  data.map((ticker: { [key: string]: any }) => {
    const isMarketClosed = ticker.marketState === "CLOSED";
    const price = ticker.regularMarketPrice;
    const priceBeforeClose = ticker.regularMarketPreviousClose || price;

    return {
      name: ticker.symbol,
      price: Number(price.toFixed(5)),
      priceBeforeClose: Number(priceBeforeClose.toFixed(5)),
      askPrice: Number(ticker.ask?.toFixed(5)),
      bidPrice: Number(ticker.bid?.toFixed(5)),
      todaysChange: Number(ticker.regularMarketChange?.toFixed(4)),
      todaysChangePerc: Number(ticker.regularMarketChangePercent?.toFixed(4)),
      isMarketClosed,
      logo: ticker.logoUrl,
      exchange: ticker.fullExchangeName,
      company: ticker.longName,
    };
  });

export default formatStocksData;

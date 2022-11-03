export type StockData = {
  name: string;
  price: number;
  todaysChange: number;
  todaysChangePerc: number;
  isMarketClosed: boolean;
  askPrice: number,
  bidPrice: number,
  lastTrade: {
    id: string,
    pricePerStock: number,
    size: number,
  };
};

const formatTickersData = (data: Object[]): StockData[] => data.map((ticker: {
  [key: string]: any;
}) => ({
  name: ticker.ticker,
  price: (ticker.lastQuote.P || ticker.min.o || ticker.prevDay.o).toFixed(2),
  askPrice: ticker.lastQuote.P,
  bidPrice: ticker.lastQuote.p,
  todaysChange: ticker.todaysChange.toFixed(2),
  todaysChangePerc: ticker.todaysChangePerc.toFixed(2),
  isMarketClosed: !ticker.updated,
  lastTrade: {
    id: ticker.lastTrade?.i,
    pricePerStock: ticker.lastTrade?.p,
    size: ticker.lastTrade?.s,
  }
}));

export default formatTickersData;
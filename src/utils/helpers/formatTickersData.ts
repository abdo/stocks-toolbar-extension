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
  price: Number((ticker.day.c || ticker.lastQuote.P || ticker.min.o || ticker.lastTrade.p || ticker.prevDay.o).toFixed(5)),
  askPrice: Number(ticker.lastQuote.P.toFixed(5)),
  bidPrice: Number(ticker.lastQuote.p.toFixed(5)),
  todaysChange: Number(ticker.todaysChange.toFixed(4)),
  todaysChangePerc: Number(ticker.todaysChangePerc.toFixed(4)),
  isMarketClosed: !ticker.updated,
  lastTrade: {
    id: ticker.lastTrade?.i,
    pricePerStock: Number(ticker.lastTrade?.p.toFixed(4)),
    size: ticker.lastTrade?.s,
  }
}));

export default formatTickersData;
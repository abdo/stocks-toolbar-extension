export type StockData = {
  name: string;
  price: number;
  todaysChange: number;
  todaysChangePerc: number;
  isMarketClosed: boolean;
  askPrice: number;
  bidPrice: number;
  lastTrade: {
    id: string;
    pricePerStock: number;
    size: number;
  };
};

const formatTickersData = (data: Object[]): StockData[] =>
  data.map((ticker: { [key: string]: any }) => {
    const isMarketClosed = !ticker.day.c;
    const priceForClosed =
      ticker.day.c ||
      ticker.prevDay.c ||
      ticker.lastTrade?.p ||
      ticker.lastQuote?.P ||
      ticker.min.o;
    const priceForOpen =
      ticker.day.c ||
      ticker.lastTrade?.p ||
      ticker.prevDay.c ||
      ticker.lastQuote?.P ||
      ticker.min.o;
    const price = isMarketClosed ? priceForClosed : priceForOpen;

    return {
      name: ticker.ticker,
      price: Number(price.toFixed(5)),
      askPrice: Number(ticker.lastQuote?.P.toFixed(5)),
      bidPrice: Number(ticker.lastQuote?.p.toFixed(5)),
      todaysChange: Number(ticker.todaysChange.toFixed(4)),
      todaysChangePerc: Number(ticker.todaysChangePerc.toFixed(4)),
      isMarketClosed,
      lastTrade: {
        id: ticker.lastTrade?.i,
        pricePerStock: Number(ticker.lastTrade?.p.toFixed(4)),
        size: ticker.lastTrade?.s,
      },
    };
  });

export default formatTickersData;

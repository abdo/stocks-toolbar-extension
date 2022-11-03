type Params = {
  ticker: string;
};

const goToStockPage = ({ ticker }: Params) => {
  window.open(
    `https://www.google.com/search?site=finance&tbm=fin&q=${ticker}`,
    '_blank',
  );
};

export default goToStockPage;
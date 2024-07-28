import encryptRequestInfo from "../helpers/encryptRequestInfo";

const getStocksGainers = () => {
  const requestInfo =
    "/info/v1/finance/screener/predefined/saved?scrIds=day_gainers&count=20&&fields=regularMarketPrice,regularMarketPreviousClose,regularMarketChange,regularMarketChangePercent,logoUrl,longName,fullExchangeName,ask,bid";

  const encryptedInfo = encryptRequestInfo(requestInfo);

  return fetch(
    `https://us-central1-invest-fellow.cloudfunctions.net/d/api/${encryptedInfo}`,
    {
      method: "POST",
      // body: JSON.stringify({ crumb: "", Cookie: "" }),
    }
  ).then((response) => response.json());
};

export default getStocksGainers;

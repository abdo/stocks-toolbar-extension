import encryptRequestInfo from "../helpers/encryptRequestInfo";

const getStocksInfo = ({
  chosenSymbolsList,
}: {
  chosenSymbolsList: string[];
}) => {
  const requestInfo = `/info/v7/finance/quote?symbols=${chosenSymbolsList.join(
    ","
  )}&fields=regularMarketPrice,regularMarketPreviousClose,regularMarketChange,regularMarketChangePercent,logoUrl,longName,fullExchangeName,ask,bid`;

  const encryptedInfo = encryptRequestInfo(requestInfo);

  return fetch(
    `https://us-central1-invest-fellow.cloudfunctions.net/d/api/${encryptedInfo}`,
    {
      method: "POST",
      // body: JSON.stringify({ crumb: "", Cookie: "" }),
    }
  ).then((response) => response.json());
};

export default getStocksInfo;

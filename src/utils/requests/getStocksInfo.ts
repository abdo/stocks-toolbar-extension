import StorageKeys from "../../data/constants/storageKeys";
import encryptRequestInfo from "../helpers/encryptRequestInfo";

const getStocksInfo = ({
  chosenSymbolsList,
  crumb: passedCrumb,
  cookie: passedCookie,
}: {
  chosenSymbolsList: string[];
  crumb?: string;
  cookie?: string;
}) => {
  const requestInfo = `/info/v7/finance/quote?symbols=${chosenSymbolsList.join(
    ","
  )}&fields=regularMarketPrice,regularMarketPreviousClose,regularMarketChange,regularMarketChangePercent,logoUrl,longName,fullExchangeName,ask,bid`;

  const encryptedInfo = encryptRequestInfo(requestInfo);

  const areCrumbAndCookieProvided = passedCrumb && passedCookie;

  return fetch(
    `https://us-central1-invest-fellow.cloudfunctions.net/d/api/${encryptedInfo}`,
    {
      method: "POST",
      body: areCrumbAndCookieProvided
        ? new URLSearchParams({
            crumb: passedCrumb,
            Cookie: passedCookie,
          })
        : undefined,
    }
  ).then((response) =>
    response.json().then(({ quoteResponse, crumb, cookie }) => {
      // update the crumb and cookie
      if (crumb !== passedCrumb || cookie !== passedCookie) {
        chrome.storage.sync.set({
          [StorageKeys.financeApiCrumb]: crumb,
          [StorageKeys.financeApiCookie]: cookie,
        });
      }

      return quoteResponse.result;
    })
  );
};

export default getStocksInfo;

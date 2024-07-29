import StorageKeys from "../../data/constants/storageKeys";
import encryptRequestInfo from "../helpers/encryptRequestInfo";

const getStocksGainers = ({
  crumb: passedCrumb,
  cookie: passedCookie,
}: {
  crumb?: string;
  cookie?: string;
}) => {
  const requestInfo =
    "/info/v1/finance/screener/predefined/saved?scrIds=day_gainers&count=20&&fields=regularMarketPrice,regularMarketPreviousClose,regularMarketChange,regularMarketChangePercent,logoUrl,longName,fullExchangeName,ask,bid";

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
    response.json().then(({ finance, crumb, cookie }) => {
      // update the crumb and cookie
      if (crumb !== passedCrumb || cookie !== passedCookie) {
        chrome.storage.sync.set({
          [StorageKeys.financeApiCrumb]: crumb,
          [StorageKeys.financeApiCookie]: cookie,
        });
      }

      return finance.result[0].quotes;
    })
  );
};

export default getStocksGainers;

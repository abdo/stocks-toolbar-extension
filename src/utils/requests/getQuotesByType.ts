import StorageKeys from "../../data/constants/storageKeys";
import encryptRequestInfo from "../helpers/encryptRequestInfo";

const getQuotesByType = ({
  type,
  crumb: passedCrumb,
  cookie: passedCookie,
}: {
  type: "day_gainers" | "day_losers" | "most_actives";
  crumb?: string;
  cookie?: string;
}) => {
  const requestInfo = `info/v1/finance/screener/predefined/saved?scrIds=${type}&count=20&&fields=regularMarketPrice,regularMarketPreviousClose,regularMarketChange,regularMarketChangePercent,logoUrl,longName,fullExchangeName,ask,bid`;

  // const encryptedInfo = encryptRequestInfo(requestInfo);
  const encryptedInfo = requestInfo;

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

const getQuotesGainers = ({
  crumb,
  cookie,
}: {
  crumb?: string;
  cookie?: string;
}) => getQuotesByType({ type: "day_gainers", crumb, cookie });

const getQuotesLosers = ({
  crumb,
  cookie,
}: {
  crumb?: string;
  cookie?: string;
}) => getQuotesByType({ type: "day_losers", crumb, cookie });

const getQuotesMostActive = ({
  crumb,
  cookie,
}: {
  crumb?: string;
  cookie?: string;
}) => getQuotesByType({ type: "most_actives", crumb, cookie });

export default getQuotesByType;

export { getQuotesGainers, getQuotesLosers, getQuotesMostActive };

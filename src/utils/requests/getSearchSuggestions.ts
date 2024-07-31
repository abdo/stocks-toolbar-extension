type SuggestedQuote = {
  symbol: string;
  shortname: string;
  exchange: string;
  quoteType: string;
  typeDisp: string;
  sectorDisp: string;
};

const getSearchSuggestions = ({ query }: { query: string }) => {
  return fetch(
    `https://us-central1-invest-fellow.cloudfunctions.net/d/api/info/v1/finance/search?q=${query}&quotesCount=10&newsCount=0&listsCount=0&enableLogoUrl=true`
  ).then((response) =>
    response.json().then(({ quotes }): SuggestedQuote[] => {
      return quotes.map(
        ({
          symbol,
          shortname,
          exchange,
          quoteType,
          typeDisp,
          sectorDisp,
        }: SuggestedQuote) => ({
          symbol,
          shortname,
          exchange,
          quoteType,
          typeDisp,
          sectorDisp,
        })
      );
    })
  );
};

export default getSearchSuggestions;
export type { SuggestedQuote };

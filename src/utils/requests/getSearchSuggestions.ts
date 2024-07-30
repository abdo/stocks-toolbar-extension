type SuggestedQuote = {
  symbol: string;
  shortname: string;
  exchange: string;
};

const getSearchSuggestions = ({ query }: { query: string }) => {
  return fetch(
    `https://us-central1-invest-fellow.cloudfunctions.net/d/api/info/v1/finance/search?q=${query}&quotesCount=10&newsCount=0&listsCount=0&enableLogoUrl=true`
  ).then((response) =>
    response.json().then(({ quotes }): SuggestedQuote[] =>
      quotes.map(({ symbol, shortname, exchange }: SuggestedQuote) => ({
        symbol,
        shortname,
        exchange,
      }))
    )
  );
};

export default getSearchSuggestions;
export type { SuggestedQuote };

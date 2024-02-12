import { polygonApiKey } from "../../keys.ignore";

const getCurrentGainers = () => {
  return fetch(
    `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/gainers?apiKey=${polygonApiKey}`
  ).then((response) => response.json());
};

export default getCurrentGainers;

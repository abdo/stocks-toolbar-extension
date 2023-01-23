const getCurrentGainers = () => {
  return fetch(
    `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/gainers?apiKey=${process.env.polygonApiKey}`,
  )
    .then((response) => response.json());
};

export default getCurrentGainers;
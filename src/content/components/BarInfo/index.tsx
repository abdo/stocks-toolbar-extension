import Box from "../../../components/Box";
import { defaultCompanies } from "../../../data/static/companies";
import { TickersWrap, Tickers, BarIcon, AnimatedTickers } from "./style";
import world from "../../../assets/world.svg";
import getMediaUrl from "../../../utils/helpers/getMediaUrl";
import { useEffect, useState } from "react";
import goToStockPage from "../../../utils/helpers/goToStockPage";
import theme from "../../../style/theme";
import StorageKeys, {
  SecondaryBarTypeOptions,
  SubscriptionStatusTypeOptions,
  ToolbarMotionTypeOptions,
} from "../../../data/constants/storageKeys";
import getStocksInfo from "../../../utils/requests/getStocksInfo";
import formatStocksData, {
  StockData,
} from "../../../utils/helpers/formatStocksData";
import {
  getQuotesGainers,
  getQuotesLosers,
  getQuotesMostActive,
} from "../../../utils/requests/getQuotesByType";
import getQuoteTypeIndicator from "../../../utils/helpers/getQuoteTypeIndicator";
import Ticker from "../Ticker";
import getIndicesInfo from "../../../utils/requests/getIndicesInfo";
import getCryptoInfo from "../../../utils/requests/getCryptoInfo";
import {
  freeUserRefreshRateInSeconds,
  premiumUserRefreshRateInSeconds,
} from "../../../data/static/refreshRate";

let refreshInterval: ReturnType<typeof setInterval>;
let secondaryRefreshInterval: ReturnType<typeof setInterval>;

type Props = {
  currentStorageValues: {
    [key: string]: any;
  };
  isSecondaryBar: boolean;
  numberOfBars: number;
  barHeight: string;
  hidden?: boolean;
  isSubscriptionActive: boolean;
};

const BarInfo = ({
  currentStorageValues,
  isSecondaryBar,
  numberOfBars,
  barHeight,
  hidden,
  isSubscriptionActive,
}: Props) => {
  if (hidden) return null;

  const [stocksData, setStocksData] = useState<StockData[]>([]);

  const [chosenSymbolsList, setChosenSymbolsList] = useState<string[]>([]);

  const [tickersPositions, setTickersPositions] = useState<any>({});

  const {
    [StorageKeys.chosenSymbolsList]: passedChosenSymbolsList,
    [StorageKeys.financeApiCrumb]: financeApiCrumb,
    [StorageKeys.financeApiCookie]: financeApiCookie,
    [StorageKeys.switchIndicationColors]: switchIndicationColors,
    [StorageKeys.toolbarPosition]: toolbarPosition,
    [StorageKeys.toolbarMotionType]: toolbarMotionType,
    [StorageKeys.secondBarType]: secondBarType,
  } = currentStorageValues;

  const refreshStockDataInterval = isSubscriptionActive
    ? premiumUserRefreshRateInSeconds
    : freeUserRefreshRateInSeconds;

  // Behavior when the passed chosen symbols list changes
  useEffect(() => {
    if (
      !passedChosenSymbolsList ||
      !passedChosenSymbolsList.length ||
      isSecondaryBar
    )
      return;

    // whether or not all passed symbols are included in current symbols in state
    // meaning that we need to make a new request
    const newSymbolsAdded = (passedChosenSymbolsList as string[]).some(
      (passedSymbol) => !chosenSymbolsList.includes(passedSymbol)
    );

    if (newSymbolsAdded) {
      getStocksInfo({
        chosenSymbolsList: passedChosenSymbolsList,
        crumb: financeApiCrumb,
        cookie: financeApiCookie,
      }).then((stocks) => setStocksData(formatStocksData(stocks)));
    }

    setChosenSymbolsList(passedChosenSymbolsList);
  }, [passedChosenSymbolsList, financeApiCrumb, financeApiCookie]);

  // request done for the main bar only
  useEffect(() => {
    if (isSecondaryBar) return;
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
      if (!chosenSymbolsList?.length) {
        return;
      }
      getStocksInfo({
        chosenSymbolsList,
        crumb: financeApiCrumb,
        cookie: financeApiCookie,
      }).then((stocks) => setStocksData(formatStocksData(stocks)));
    }, refreshStockDataInterval * 1000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, [
    refreshStockDataInterval,
    chosenSymbolsList,
    isSecondaryBar,
    financeApiCrumb,
    financeApiCookie,
  ]);

  // Remove saved ticker positions when toolbar position changes
  useEffect(() => {
    setTickersPositions({});
  }, [toolbarPosition]);

  // request done for secondary bar only
  useEffect(() => {
    if (!isSecondaryBar) return;

    const requestPerBarType: {
      [key: string]: (args: {
        crumb?: string;
        cookie?: string;
      }) => Promise<any>;
    } = {
      [SecondaryBarTypeOptions.INDEX_FUNDS]: getIndicesInfo,
      [SecondaryBarTypeOptions.CRYPTO]: getCryptoInfo,
      [SecondaryBarTypeOptions.TOP_GAINERS]: getQuotesGainers,
      [SecondaryBarTypeOptions.TOP_LOSERS]: getQuotesLosers,
      [SecondaryBarTypeOptions.MOST_ACTIVE]: getQuotesMostActive,
    };

    const getQuotesRequest: (args: {
      crumb?: string;
      cookie?: string;
    }) => Promise<any> = requestPerBarType[secondBarType] || getQuotesGainers;

    // Initial request
    getQuotesRequest({
      crumb: financeApiCrumb,
      cookie: financeApiCookie,
    }).then((stocks) => {
      setStocksData(formatStocksData(stocks));
    });

    clearInterval(secondaryRefreshInterval);
    secondaryRefreshInterval = setInterval(() => {
      getQuotesRequest({
        crumb: financeApiCrumb,
        cookie: financeApiCookie,
      }).then((stocks) => setStocksData(formatStocksData(stocks)));
    }, refreshStockDataInterval * 1000);

    return () => {
      clearInterval(secondaryRefreshInterval);
    };
  }, [
    financeApiCrumb,
    financeApiCookie,
    secondBarType,
    refreshStockDataInterval,
  ]);

  const stocksDataSorted = stocksData.sort(
    (stock1, stock2) =>
      chosenSymbolsList.indexOf(stock1.name) -
      chosenSymbolsList.indexOf(stock2.name)
  );

  // Save the position of the ticker on hover
  const handleTickerMouseOver = (
    e: React.MouseEvent<HTMLElement>,
    i: number
  ): void => {
    const node = e.currentTarget as HTMLElement;
    const rect = node?.getBoundingClientRect();

    const tickerPosition = rect.left + rect.width / 2;
    if (tickerPosition !== tickersPositions[i]) {
      setTickersPositions((savedPositions: {}) => ({
        ...savedPositions,
        [i]: rect.left + rect.width / 2,
      }));
    }
  };

  const isStaticBar = toolbarMotionType === ToolbarMotionTypeOptions.static;

  const TickersComponent = isStaticBar ? Tickers : AnimatedTickers;

  return (
    <Box
      display="flex"
      alignItems="center"
      h={`${100 / numberOfBars}%`}
      hidden={hidden}
    >
      <Box
        h={`calc(${barHeight} - 4px)`}
        zIndex={1}
        bgc={theme.colors.black}
        hidden={isSecondaryBar}
        display="flex"
        alignItems="center"
        justifyContent="center"
        onClick={() => {
          chrome.runtime.sendMessage({ action: "open-popup" });
        }}
      >
        <Box cursor="pointer" title="Settings">
          ⚙️
        </Box>
        <BarIcon src={`${getMediaUrl(world)}`} alt="stocks-world" />
      </Box>
      <Box w={isSecondaryBar ? "100%" : "95%"}>
        <TickersWrap $isStaticBar={isStaticBar}>
          <TickersComponent
            className="ticker-bar"
            $isStaticBar={isStaticBar}
            $animationDuration={isSecondaryBar ? "45s" : "35s"}
          >
            {stocksDataSorted.map((stockData, i) => {
              const stockisChosen = chosenSymbolsList.includes(stockData.name);
              if (!stockisChosen && !isSecondaryBar) return null;

              return (
                <Ticker
                  key={`${stockData.name}${i}`}
                  stockData={stockData}
                  highToolbarTop={numberOfBars > 1 && !isSecondaryBar}
                  barHeight={barHeight}
                  tickersPositions={tickersPositions}
                  isStaticBar={isStaticBar}
                  toolbarPosition={toolbarPosition}
                  handleTickerMouseOver={handleTickerMouseOver}
                  getQuoteTypeIndicator={getQuoteTypeIndicator}
                  switchIndicationColors={switchIndicationColors}
                  isSubscriptionActive={isSubscriptionActive}
                />
              );
            })}
          </TickersComponent>
        </TickersWrap>
      </Box>
    </Box>
  );
};

BarInfo.defaultProps = {
  chosenSymbolsList: defaultCompanies,
  numberOfBars: 1,
};

export default BarInfo;

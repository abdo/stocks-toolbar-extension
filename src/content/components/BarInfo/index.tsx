import Box from "../../../components/Box";
import { defaultCompanies } from "../../../data/static/companies";
import { TickersWrap, Tickers, BarIcon, AnimatedTickers } from "./style";
import world from "../../../assets/world.svg";
import getMediaUrl from "../../../utils/helpers/getMediaUrl";
import { useEffect, useState } from "react";
import goToStockPage from "../../../utils/helpers/goToStockPage";
import theme from "../../../style/theme";
import StorageKeys, {
  ToolbarMotionTypeOptions,
  ToolbarPositionOptions,
} from "../../../data/constants/storageKeys";
import getStocksInfo from "../../../utils/requests/getStocksInfo";
import formatStocksData, {
  StockData,
} from "../../../utils/helpers/formatStocksData";
import getStocksGainers from "../../../utils/requests/getStocksGainers";
import getQuoteTypeIndicator from "../../../utils/helpers/getQuoteTypeIndicator";
import Ticker from "../Ticker";

let refreshInterval: NodeJS.Timer;

type Props = {
  currentStorageValues: {
    [key: string]: any;
  };
  switchIndicationColors: boolean;
  refreshStockDataInterval: number;
  isGainersBar: boolean;
  numberOfBars: number;
  barHeight: string;
  hidden?: boolean;
  toolbarMotionType: ToolbarMotionTypeOptions;
  toolbarPosition: ToolbarPositionOptions;
};

const BarInfo = ({
  currentStorageValues,
  switchIndicationColors,
  refreshStockDataInterval,
  isGainersBar,
  numberOfBars,
  barHeight,
  hidden,
  toolbarMotionType,
  toolbarPosition,
}: Props) => {
  if (hidden) return null;

  const [stocksData, setStocksData] = useState<StockData[]>([]);

  const [chosenSymbolsList, setChosenSymbolsList] = useState<string[]>([]);

  const [tickersPositions, setTickersPositions] = useState<any>({});

  const {
    [StorageKeys.chosenSymbolsList]: passedChosenSymbolsList,
    [StorageKeys.financeApiCrumb]: financeApiCrumb,
    [StorageKeys.financeApiCookie]: financeApiCookie,
  } = currentStorageValues;

  // Behavior when the passed chosen symbols list changes
  useEffect(() => {
    if (
      !passedChosenSymbolsList ||
      !passedChosenSymbolsList.length ||
      isGainersBar
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

  useEffect(() => {
    if (isGainersBar) return;
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
    isGainersBar,
    financeApiCrumb,
    financeApiCookie,
  ]);

  // Remove saved ticker positions when toolbar position changes
  useEffect(() => {
    setTickersPositions({});
  }, [toolbarPosition]);

  // Request done for gainers bar only
  useEffect(() => {
    if (!isGainersBar) return;

    // Initial request
    getStocksGainers({
      crumb: financeApiCrumb,
      cookie: financeApiCookie,
    }).then((stocks) => {
      setStocksData(formatStocksData(stocks));
    });

    const refreshGainersDataInterval = 60;

    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
      getStocksGainers({
        crumb: financeApiCrumb,
        cookie: financeApiCookie,
      }).then((stocks) => setStocksData(formatStocksData(stocks)));
    }, refreshGainersDataInterval * 1000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, [financeApiCrumb, financeApiCookie]);

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
        hidden={isGainersBar}
      >
        <BarIcon src={`${getMediaUrl(world)}`} alt="stocks-world" />
      </Box>
      <Box w={isGainersBar ? "100%" : "95%"}>
        <TickersWrap $isStaticBar={isStaticBar}>
          <TickersComponent
            className="ticker-bar"
            $isStaticBar={isStaticBar}
            $animationDuration={isGainersBar ? "45s" : "35s"}
          >
            {stocksDataSorted.map((stockData, i) => {
              const stockisChosen = chosenSymbolsList.includes(stockData.name);
              if (!stockisChosen && !isGainersBar) return null;

              return (
                <Ticker
                  stockData={stockData}
                  numberOfBars={numberOfBars}
                  isGainersBar={isGainersBar}
                  barHeight={barHeight}
                  tickersPositions={tickersPositions}
                  isStaticBar={isStaticBar}
                  toolbarPosition={toolbarPosition}
                  handleTickerMouseOver={handleTickerMouseOver}
                  getQuoteTypeIndicator={getQuoteTypeIndicator}
                  switchIndicationColors={switchIndicationColors}
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

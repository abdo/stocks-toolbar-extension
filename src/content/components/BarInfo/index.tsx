import Box from "../../../components/Box";
import { defaultCompanies } from "../../../data/static/companies";
import {
  DataItem,
  Ticker,
  TickersWrap,
  Tickers,
  BarIcon,
  AnimatedTickers,
} from "./style";
import world from "../../../assets/world.svg";
import getMediaUrl from "../../../utils/helpers/getMediaUrl";
import { useEffect, useState } from "react";
import goToStockPage from "../../../utils/helpers/goToStockPage";
import theme from "../../../style/theme";
import {
  ToolbarMotionTypeOptions,
  ToolbarPositionOptions,
} from "../../../data/constants/storageKeys";
import getStocksInfo from "../../../utils/requests/getStocksInfo";
import formatStocksData, {
  StockData,
} from "../../../utils/helpers/formatStocksData";
import getStocksGainers from "../../../utils/requests/getStocksGainers";

let refreshInterval: NodeJS.Timer;

type Props = {
  chosenSymbolsList: string[];
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
  chosenSymbolsList: passedChosenSymbolsList,
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
    const newSymbolsAdded = passedChosenSymbolsList.some(
      (passedSymbol) => !chosenSymbolsList.includes(passedSymbol)
    );

    if (newSymbolsAdded) {
      getStocksInfo({ chosenSymbolsList: passedChosenSymbolsList }).then(
        (details) =>
          setStocksData(formatStocksData(details.quoteResponse.result))
      );
    }

    setChosenSymbolsList(passedChosenSymbolsList);
  }, [passedChosenSymbolsList]);

  useEffect(() => {
    if (isGainersBar) return;
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
      if (!chosenSymbolsList?.length) {
        return;
      }
      getStocksInfo({ chosenSymbolsList }).then((details) =>
        setStocksData(formatStocksData(details.quoteResponse.result))
      );
    }, refreshStockDataInterval * 1000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, [refreshStockDataInterval, chosenSymbolsList, isGainersBar]);

  // Remove saved ticker positions when toolbar position changes
  useEffect(() => {
    setTickersPositions({});
  }, [toolbarPosition]);

  // Request done for gainers bar only
  useEffect(() => {
    if (!isGainersBar) return;

    // Initial request
    getStocksGainers().then((details) =>
      setStocksData(formatStocksData(details.finance.result[0].quotes))
    );

    const refreshGainersDataInterval = 120;

    refreshInterval = setInterval(() => {
      getStocksGainers().then((details) =>
        setStocksData(formatStocksData(details.finance.result[0].quotes))
      );
    }, refreshGainersDataInterval * 1000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  const isPositive = (value: number) => {
    const positive = value > 0;
    return switchIndicationColors ? !positive : positive;
  };
  const isNegative = (value: number) => {
    const negative = value < 0;
    return switchIndicationColors ? !negative : negative;
  };

  const onClickTicker = (ticker: string) => goToStockPage({ ticker });

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
                  onClick={() => onClickTicker(stockData.name)}
                  key={i}
                  $highToolbarTop={numberOfBars > 1 && !isGainersBar}
                  $barHeight={barHeight}
                  onMouseOver={(e) => handleTickerMouseOver(e, i)}
                  $tickerLeftPosition={tickersPositions[i]}
                  $isStaticBar={isStaticBar}
                  $toolbarPosition={toolbarPosition}
                >
                  <DataItem>{stockData.name}</DataItem>
                  <DataItem title="Current price">{stockData?.price}</DataItem>
                  <DataItem
                    title="Today's change"
                    $isPositive={isPositive(stockData?.todaysChange)}
                    $isNegative={isNegative(stockData?.todaysChange)}
                    $hidden={!stockData?.todaysChange}
                  >
                    {stockData?.todaysChange}
                  </DataItem>
                  <DataItem
                    title="Today's change percentage"
                    $isPositive={isPositive(stockData?.todaysChangePerc)}
                    $isNegative={isNegative(stockData?.todaysChangePerc)}
                    $hidden={!stockData?.todaysChangePerc}
                  >
                    ({stockData?.todaysChangePerc}%)
                  </DataItem>
                  <div className="tooltipWrapper">
                    <div
                      className="tickinfo-tooltip"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {
                        <>
                          {stockData.isMarketClosed ? (
                            <>
                              <b className="special-info">
                                Market is now closed
                              </b>
                              <small
                                title="Market is now closed"
                                style={{ verticalAlign: "text-bottom" }}
                              >
                                🔒
                              </small>
                              <br />
                              <br />
                            </>
                          ) : null}
                          <b className="special-info">BID price:</b>{" "}
                          {stockData.bidPrice}
                          <br />
                          <br />
                          <b className="special-info">ASK price:</b>{" "}
                          {stockData.askPrice}
                          <br />
                          <div className="last-trade">
                            <b className="special-info">Name:</b>{" "}
                            {stockData.company}
                            <br />
                            <br />
                            <b className="special-info">Exchange:</b>{" "}
                            {stockData.exchange}
                          </div>
                        </>
                      }
                    </div>
                  </div>
                </Ticker>
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

import Box from '../../../components/Box';
import { defaultCompanies } from '../../../data/static/companies';
import {
  DataItem,
  SlowTickers,
  Ticker,
  TickersWrap,
  Tickers,
  BarIcon,
} from './style';
import world from '../../../assets/world.svg';
import getMediaUrl from '../../../utils/helpers/getMediaUrl';
import { useEffect, useState } from 'react';
import getStocksSnapshot from '../../../utils/requests/getStocksSnapshot';
import formatTickersData, {
  StockData,
} from '../../../utils/helpers/formatTickersData';
import goToStockPage from '../../../utils/helpers/goToStockPage';
import theme from '../../../style/theme';
import getCurrentGainers from '../../../utils/requests/getCurrentGainers';

let refreshInterval: NodeJS.Timer;

type Props = {
  chosenSymbolsList: string[];
  switchIndicationColors: boolean;
  refreshStockDataInterval: number;
  isGainersBar: boolean;
  numberOfBars: number;
  barHeight: string;
  hidden?: boolean;
};

const BarInfo = ({
  chosenSymbolsList: passedChosenSymbolsList,
  switchIndicationColors,
  refreshStockDataInterval,
  isGainersBar,
  numberOfBars,
  barHeight,
  hidden,
}: Props) => {
  if (hidden) return null;

  const [stocksData, setStocksData] = useState<StockData[]>([]);

  const [chosenSymbolsList, setChosenSymbolsList] = useState<string[]>([]);

  // Behavior when the passed chosen symbols list changes
  useEffect(() => {
    if (!passedChosenSymbolsList || isGainersBar) return;

    // whether or not all passed symbols are included in current symbols in state
    // meaning that we need to make a new request
    const newSymbolsAdded = passedChosenSymbolsList.some(
      (passedSymbol) => !chosenSymbolsList.includes(passedSymbol),
    );

    if (newSymbolsAdded) {
      getStocksSnapshot({ chosenSymbolsList: passedChosenSymbolsList }).then(
        (details) => setStocksData(formatTickersData(details.tickers)),
      );
    }

    setChosenSymbolsList(passedChosenSymbolsList);
  }, [passedChosenSymbolsList]);

  useEffect(() => {
    if (isGainersBar) return;
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
      getStocksSnapshot({ chosenSymbolsList }).then((details) =>
        setStocksData(formatTickersData(details.tickers)),
      );
    }, refreshStockDataInterval * 1000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, [refreshStockDataInterval, chosenSymbolsList, isGainersBar]);

  // Request done for gainers bar only
  useEffect(() => {
    if (!isGainersBar) return;

    // Initial request
    getCurrentGainers().then((details) => {
      setStocksData(formatTickersData(details.tickers));
    });

    const refreshGainersDataInterval = 120;

    refreshInterval = setInterval(() => {
      getCurrentGainers().then((details) =>
        setStocksData(formatTickersData(details.tickers)),
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

  const TickersComponent = isGainersBar ? SlowTickers : Tickers;

  const stocksDataSorted = stocksData.sort(
    (stock1, stock2) =>
      chosenSymbolsList.indexOf(stock1.name) -
      chosenSymbolsList.indexOf(stock2.name),
  );

  return (
    <Box
      display='flex'
      alignItems='center'
      h={`${100 / numberOfBars}%`}
      hidden={hidden}
    >
      <Box
        h={`calc(${barHeight} - 4px)`}
        m='0 0 0 2px'
        zIndex={1}
        bgc={theme.colors.black}
        hidden={isGainersBar}
      >
        <BarIcon src={`${getMediaUrl(world)}`} alt='stocks-world' />
      </Box>
      <Box w='95%'>
        <TickersWrap>
          <TickersComponent className='ticker-bar'>
            {stocksDataSorted.map((stockData, i) => {
              const stockisChosen = chosenSymbolsList.includes(stockData.name);
              if (!stockisChosen && !isGainersBar) return null;
              return (
                <Ticker
                  onClick={() => onClickTicker(stockData.name)}
                  key={stockData.name}
                  $highToolbarTop={numberOfBars > 1 && !isGainersBar}
                >
                  <DataItem>{stockData.name}</DataItem>
                  <DataItem title='Current price'>{stockData?.price}</DataItem>
                  {stockData?.isMarketClosed ? (
                    <small
                      title='Market is now closed'
                      style={{ verticalAlign: 'text-bottom' }}
                    >
                      🔒
                    </small>
                  ) : (
                    <>
                      <DataItem
                        title="Today's change"
                        $isPositive={isPositive(stockData?.todaysChange)}
                        $isNegative={isNegative(stockData?.todaysChange)}
                      >
                        {stockData?.todaysChange}
                      </DataItem>
                      <DataItem
                        title="Today's change percentage"
                        $isPositive={isPositive(stockData?.todaysChangePerc)}
                        $isNegative={isNegative(stockData?.todaysChangePerc)}
                      >
                        ({stockData?.todaysChangePerc}%)
                      </DataItem>
                    </>
                  )}
                  <div className='tooltip' onClick={(e) => e.stopPropagation()}>
                    {stockData.isMarketClosed ? (
                      <>
                        <b className='special-info'>Market is now closed</b>
                      </>
                    ) : (
                      <>
                        <b className='special-info'>BID price:</b>{' '}
                        {stockData.bidPrice}
                        <br />
                        <div className='last-trade'>
                          <b className='special-info'>Last trade info:</b>
                          <br />
                          <Box hidden={stockData.lastTrade.size === 0}>
                            <span className='special-info'>
                              {stockData.lastTrade.size}
                            </span>{' '}
                            stocks were sold
                          </Box>
                          <br />
                          <div>
                            <span className='special-info'>
                              ${stockData.lastTrade.pricePerStock}
                            </span>{' '}
                            per stock
                          </div>
                          <br />
                          <div>
                            Trade id:{' '}
                            <span className='special-info'>
                              {stockData.lastTrade.id}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
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

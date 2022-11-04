import Box from '../../../components/Box';
import { defaultCompanies } from '../../../data/static/companies';
import { DataItem, Ticker, TickersWrap, Tickers, BarIcon } from './style';
import world from '../../../assets/world.svg';
import getMediaUrl from '../../../utils/helpers/getMediaUrl';
import { contentHeight } from '../../App';
import { useEffect, useState } from 'react';
import getStocksSnapshot from '../../../utils/requests/getStocksSnapshot';
import formatTickersData, {
  StockData,
} from '../../../utils/helpers/formatTickersData';
import goToStockPage from '../../../utils/helpers/goToStockPage';
import theme from '../../../style/theme';

let refreshInterval: NodeJS.Timer;

type Props = {
  chosenSymbolsList: string[];
  switchIndicationColors: boolean;
  refreshStockDataInterval: number;
};

const BarInfo = ({
  chosenSymbolsList: passedChosenSymbolsList,
  switchIndicationColors,
  refreshStockDataInterval,
}: Props) => {
  const [stocksData, setStocksData] = useState<StockData[]>([]);

  const [chosenSymbolsList, setChosenSymbolsList] = useState<string[]>([]);

  useEffect(() => {
    if (!passedChosenSymbolsList) return;

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
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
      getStocksSnapshot({ chosenSymbolsList }).then((details) =>
        setStocksData(formatTickersData(details.tickers)),
      );
    }, refreshStockDataInterval * 1000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, [refreshStockDataInterval, chosenSymbolsList]);

  const isPositive = (value: number) => {
    const positive = value > 0;
    return switchIndicationColors ? !positive : positive;
  };
  const isNegative = (value: number) => {
    const negative = value < 0;
    return switchIndicationColors ? !negative : negative;
  };

  const onClickTicker = (ticker: string) => goToStockPage({ ticker });

  return (
    <Box display='flex' alignItems='center' h='100%'>
      <Box
        h={`calc(${contentHeight} - 4px)`}
        m='0 0 0 2px'
        zIndex={1}
        bgc={theme.colors.black}
      >
        <BarIcon src={`${getMediaUrl(world)}`} alt='stocks-world' />
      </Box>
      <Box w='95%'>
        <TickersWrap>
          <Tickers id='ticker-bar'>
            {chosenSymbolsList.map((ticker: string, i) => {
              const stockData = stocksData.find(
                (stock) => stock.name === ticker,
              );
              if (!stockData) return null;
              return (
                <Ticker onClick={() => onClickTicker(ticker)}>
                  <DataItem>{ticker}</DataItem>
                  <DataItem title='Current price'>{stockData?.price}</DataItem>
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
                  <div className='tooltip' onClick={(e) => e.stopPropagation()}>
                    <b className='special-info'>BID price:</b>{' '}
                    {stockData.bidPrice}
                    <div className='last-trade'>
                      <b className='special-info'>Last trade:</b>
                      <div>
                        <span className='special-info'>
                          {stockData.lastTrade.size}
                        </span>{' '}
                        stocks were sold
                      </div>
                      <div>
                        Each for{' '}
                        <span className='special-info'>
                          ${stockData.lastTrade.pricePerStock}
                        </span>
                      </div>
                      <div>
                        Trade id:{' '}
                        <span className='special-info'>
                          {stockData.lastTrade.id}
                        </span>
                      </div>
                    </div>
                  </div>
                </Ticker>
              );
            })}
          </Tickers>
        </TickersWrap>
      </Box>
    </Box>
  );
};

BarInfo.defaultProps = {
  chosenSymbolsList: defaultCompanies,
};

export default BarInfo;

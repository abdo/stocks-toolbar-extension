import React from "react";
import Box from "../../../components/Box";
import { DataItem, TickerStyle } from "./style";
import { type StockData } from "../../../utils/helpers/formatStocksData";
import goToStockPage from "../../../utils/helpers/goToStockPage";

type Props = {
  stockData: StockData;
  numberOfBars: number;
  isGainersBar: boolean;
  barHeight: string;
  tickersPositions: number[];
  isStaticBar: boolean;
  toolbarPosition: number;
  handleTickerMouseOver: (
    e: React.MouseEvent<HTMLElement>,
    index: number
  ) => void;
  getQuoteTypeIndicator: (stockData: StockData) => React.ReactNode;
  switchIndicationColors: boolean;
};

const Ticker: React.FC<Props> = ({
  stockData,
  numberOfBars,
  isGainersBar,
  barHeight,
  tickersPositions,
  isStaticBar,
  toolbarPosition,
  handleTickerMouseOver,
  getQuoteTypeIndicator,
  switchIndicationColors,
}) => {
  const isPositive = (value: number | undefined) => {
    if (!value) return false;
    const positive = value > 0;
    return switchIndicationColors ? !positive : positive;
  };
  const isNegative = (value: number | undefined) => {
    if (!value) return false;
    const negative = value < 0;
    return switchIndicationColors ? !negative : negative;
  };

  const onClick = (ticker: string) => goToStockPage({ ticker });

  return (
    <TickerStyle
      onClick={() => onClick(stockData.name)}
      $highToolbarTop={numberOfBars > 1 && !isGainersBar}
      $barHeight={barHeight}
      onMouseOver={(e) => handleTickerMouseOver(e, 0)}
      $tickerLeftPosition={tickersPositions[0]}
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
        <div className="tickinfo-tooltip" onClick={(e) => e.stopPropagation()}>
          <>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap="10px"
                m="0 0 5px 0"
              >
                <Box hidden={!stockData.logo}>
                  <img src={stockData.logo} className="stock-logo" />
                </Box>
                {getQuoteTypeIndicator(stockData)}
              </Box>
              {stockData.company}
              <br />
            </Box>
            <Box hidden={!stockData.exchange}>
              <b className="special-info">Exchange:</b> {stockData.exchange}
            </Box>
            <Box className="box">
              <Box hidden={!stockData.askPrice}>
                <b className="special-info">ASK price:</b> {stockData.askPrice}
              </Box>
              <Box hidden={!stockData.bidPrice}>
                <b className="special-info">BID price:</b> {stockData.bidPrice}
              </Box>
              <Box hidden={!stockData.marketState}>
                <b className="special-info">Market state:</b>{" "}
                <small>
                  {stockData.marketState} {stockData.isMarketClosed ? "🔒" : ""}
                </small>
              </Box>
            </Box>
          </>
        </div>
      </div>
    </TickerStyle>
  );
};

export default Ticker;

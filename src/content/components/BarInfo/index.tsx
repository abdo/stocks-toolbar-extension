import { defaultCompanies } from '../../../data/static/companies';
import { TickerItem, TickerWrap, Ticker } from './style';

type Props = {
  chosenSymbolsList: string[];
};

const BarInfo = ({ chosenSymbolsList }: Props) => {
  return (
    <TickerWrap>
      <Ticker>
        {chosenSymbolsList.map((ticker: string, i) => (
          <TickerItem>
            {ticker} 302 12% {i === chosenSymbolsList.length - 1 ? null : '-'}
          </TickerItem>
        ))}
      </Ticker>
    </TickerWrap>
  );
};

BarInfo.defaultProps = {
  chosenSymbolsList: defaultCompanies,
};

export default BarInfo;

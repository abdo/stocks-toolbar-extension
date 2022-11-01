import { defaultCompanies } from '../../../data/static/companies';
import { TickerItem, TickerWrap, Ticker } from './style';

type Props = {
  chosenSymbolsList: any;
};

const BarInfo = ({ chosenSymbolsList }: Props) => {
  return (
    <TickerWrap>
      <Ticker>
        {chosenSymbolsList.map((ticker: string) => (
          <TickerItem>{ticker} 302 12%</TickerItem>
        ))}
      </Ticker>
    </TickerWrap>
  );
};

BarInfo.defaultProps = {
  chosenSymbolsList: defaultCompanies,
};

export default BarInfo;

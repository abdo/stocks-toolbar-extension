import Box from '../../../components/Box';
import { defaultCompanies } from '../../../data/static/companies';
import { TickerItem, TickerWrap, Ticker, BarIcon } from './style';
import world from '../../../assets/world.svg';
import getMediaUrl from '../../../utils/helpers/getMediaUrl';
import { contentHeight } from '../../App';

type Props = {
  chosenSymbolsList: string[];
};

const BarInfo = ({ chosenSymbolsList }: Props) => {
  return (
    <Box display='flex' alignItems='center' h='100%'>
      <Box h={`calc(${contentHeight} - 4px)`} m='0 0 0 2px'>
        <BarIcon src={`${getMediaUrl(world)}`} alt='stocks-world' />
      </Box>
      <Box w='95%'>
        <TickerWrap>
          <Ticker id='ticker-bar'>
            {chosenSymbolsList.map((ticker: string, i) => (
              <TickerItem>
                {ticker} 302 12%{' '}
                {i === chosenSymbolsList.length - 1 ? null : '-'}
              </TickerItem>
            ))}
          </Ticker>
        </TickerWrap>
      </Box>
    </Box>
  );
};

BarInfo.defaultProps = {
  chosenSymbolsList: defaultCompanies,
};

export default BarInfo;

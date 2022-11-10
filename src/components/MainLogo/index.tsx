import getMediaUrl from '../../utils/helpers/getMediaUrl';
import mainLogo from '../../assets/investfellow-logo.svg';

const MainLogo = () => {
  return (
    <img
      src={`${getMediaUrl(mainLogo)}`}
      alt='logo'
      style={{ width: '200px' }}
    />
  );
};

export default MainLogo;

import styled from 'styled-components';
import { ToolbarPositionOptions } from '../data/constants/storageKeys';
import theme from '../style/theme';

export const AppStyled = styled.div<{ $height: string, $position: ToolbarPositionOptions }>`
  background-color: ${theme.colors.black};
  background: linear-gradient(to bottom, #4c4c4c 0%,#000000 0%,#2c2c2c 61%,#2c2c2c 85%,#1c1c1c 91%,#131313 100%);
  box-shadow:1px 1px 5px rgba(0, 0, 0, 0.5); 
  height: ${({ $height }) => $height};
  width: 100vw;
  position: fixed;
  top: ${({ $position }) => $position === ToolbarPositionOptions.top && '0'};;
  bottom: ${({ $position }) => $position === ToolbarPositionOptions.bottom && '0'};;
  z-index: 1000000000000;

  &:hover .ticker-bar {
    animation-play-state: paused;
  }
`;

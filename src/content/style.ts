import styled from 'styled-components';
import { ToolbarPositionOptions } from '../data/constants/storageKeys';
import theme from '../style/theme';

export const AppStyled = styled.div<{ $height: string, $position: ToolbarPositionOptions }>`
  background-color: ${theme.colors.black};
  height: ${({ $height }) => $height};
  width: 100vw;
  position: fixed;
  top: ${({ $position }) => $position === ToolbarPositionOptions.top && '0'};;
  bottom: ${({ $position }) => $position === ToolbarPositionOptions.bottom && '0'};;
  z-index: 1000000000000;

  &:hover #ticker-bar {
    animation-play-state: paused;
  }
`;

import styled from 'styled-components';
import theme from '../style/theme';

export const AppStyled = styled.div<{ $height: string }>`
  background-color: ${theme.colors.black};
  height: ${({ $height }) => $height};
  width: 100vw;

  &:hover #ticker-bar {
    animation-play-state: paused;
  }
`;

import styled from 'styled-components';
import theme from '../style/theme';

export const AppStyled = styled.div<{ $height: string, $hidden: boolean }>`
  background-color: ${theme.colors.toolbarBackground};
  height: ${({ $height }) => $height};
  display: ${({ $hidden }) => $hidden && 'none'};
  width: 100vw;

  * {
  font-family: 'Press Start 2P', sans-serif;
  }
`;

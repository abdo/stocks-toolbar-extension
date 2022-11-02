import styled from 'styled-components';
import theme from '../style/theme';

export const AppStyled = styled.div<{ $height: string }>`
  background-color: ${theme.colors.toolbarBackground};
  height: ${({ $height }) => $height as string};
  width: 100vw;

  * {
  font- family: 'Lexend Tera', sans - serif;
  }
`;

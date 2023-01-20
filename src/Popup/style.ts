import styled from 'styled-components';
import theme from '../style/theme';

export const AppStyled = styled.div`
  background-color: ${theme.colors.background};
  min-height: 400px;
  width: 400px;
  padding: 25px;

  p,
  b {
    color: ${theme.colors.primary};
    font-family: 'Open Sans', sans-serif;
  }
`;

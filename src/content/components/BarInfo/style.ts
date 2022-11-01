import styled, { keyframes } from 'styled-components';

const ticker = keyframes`
    0% {
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }

  100% {
    transform: translate3d(-100%, 0, 0);
  }
`;

export const TickerWrap = styled.div`
  width: 100%;
  overflow: hidden;
  padding-left: 100%;
  box-sizing: content-box;
`;

export const Ticker = styled.div`
  display: inline-block;
  white-space: nowrap;
  padding-right: 100%;
  box-sizing: content-box;
  animation: ${ticker} 19s linear infinite;
`;

export const TickerItem = styled.div`
  display: inline-block;
  padding: 0 10px;
  font-size: 20px;
  color: white;
`;

import styled, { keyframes } from 'styled-components';
import theme from '../../../style/theme';

const ticker = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }

  100% {
    transform: translate3d(-100%, 0, 0);
  }
`;

const flicker = keyframes`
	0% {
		opacity: 0.8;
	}
	5% {
		opacity: 0.5;
	}
	10% {
		opacity: 0.6;
	}
	15% {
		opacity: 0.85;
	}
	25% {
		opacity: 0.5;
	}
	30% {
		opacity: 1;
	}
	35% {
		opacity: 0.1;
	}
	40% {
		opacity: 0.25;
	}
	45% {
		opacity: 0.5;
	}
	60% {
		opacity: 1;
	}
	70% {
		opacity: 0.85;
	}
	80% {
		opacity: 0.4;
	}
	90% {
		opacity: 0.5;
	}
	100% {
		opacity: 1;
	}
`;

export const BarIcon = styled.img`
  width: 100%;
  height: 100%;
  animation: ${flicker} 10s infinite linear;
`;

export const TickersWrap = styled.div`
  width: 100%;
  padding-left: 100%;
  box-sizing: content-box;
`;

export const Tickers = styled.div`
  display: inline-block;
  white-space: nowrap;
  padding-right: 100%;
  box-sizing: content-box;
  animation: ${ticker} 35s linear infinite;
`;

export const SlowTickers = styled(Tickers)`
  animation: ${ticker} 55s linear infinite;
`;

export const Ticker = styled.div<{ $highToolbarTop: boolean }>`
  display: inline-block;
  padding: 0 10px;
  color: white;
  position: relative;

  & .tooltip {
    visibility: hidden;
    color: ${theme.colors.background};
    background-color: ${theme.colors.black};
    padding: 8px;
    border-radius: 8px;
    border: 1px solid ${theme.colors.background};
    top: ${({ $highToolbarTop }) => $highToolbarTop ? '280%' : '140%'};
    left: 50%;
    transform: translate(-50%, 0);
    position: absolute;
    transition: all 0s ease 0.2s;
    cursor: default;
    width: 80%;
    min-width: 150px;
    white-space: break-spaces;

    &:hover {
      transition-delay: 0s;
      visibility: visible;
    }

    & .special-info {
      color: ${theme.colors.gray};
    }

    & .last-trade {
      border-radius: 6px;
      border: 1px solid ${theme.colors.background};
      padding: 8px;
      margin: 4px 0 0;
    }
  }

  &:hover .tooltip {
    transition-delay: 0s;
    visibility: visible;
  }
`;

export const DataItem = styled.span<{ $isNegative?: boolean, $isPositive?: boolean, $hidden?: boolean }>`
  padding: 0 5px;
  cursor: pointer;
  color: ${({ $isPositive, $isNegative }) => $isPositive ? theme.colors.positive : $isNegative ? theme.colors.negative : theme.colors.white};
  display: ${({ $hidden }) => $hidden && 'none'};
  font-family: 'Lato', sans-serif;
  font-size: 17px;

  &:hover {
    opacity: 0.7;
  }
`;

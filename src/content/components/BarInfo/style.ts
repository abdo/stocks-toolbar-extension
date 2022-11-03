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
  animation: ${ticker} 35s linear infinite;
`;

export const TickerItem = styled.div`
  display: inline-block;
  padding: 0 10px;
  font-size: 12px;
  color: white;
`;

export const BarIcon = styled.img`
  width: 100%;
  height: 100%;
  animation: ${flicker} 10s infinite linear;
`;
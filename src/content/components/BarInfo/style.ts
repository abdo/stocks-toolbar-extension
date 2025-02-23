import styled, { css, keyframes } from "styled-components";

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

interface TickersWrapProps {
  $isStaticBar: boolean;
}

export const TickersWrap = styled.div<TickersWrapProps>`
  width: 100%;
  box-sizing: content-box;
  padding-left: ${({ $isStaticBar }) => !$isStaticBar && "100%"};
  overflow-x: ${({ $isStaticBar }) => $isStaticBar && "auto"};

  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    -webkit-appearance: none;
  }
`;

interface TickerBaseProps {
  $isStaticBar: boolean;
  $animationDuration?: string;
}

const baseTickerStyles = css<TickerBaseProps>`
  display: inline-block;
  white-space: nowrap;
  padding-right: ${({ $isStaticBar }) => !$isStaticBar && "100%"};
  box-sizing: content-box;
`;

export const Tickers = styled.div<TickerBaseProps>`
  ${baseTickerStyles}
`;

export const AnimatedTickers = styled.div<TickerBaseProps>`
  ${baseTickerStyles}
  animation-name: ${ticker};
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: ${({ $animationDuration }) => $animationDuration};
`;

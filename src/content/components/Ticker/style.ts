import { ToolbarPositionOptions } from "./../../../data/constants/storageKeys";
import styled from "styled-components";
import theme from "../../../style/theme";

export const TickerStyle = styled.div<{
  $highToolbarTop: boolean;
  $barHeight: string;
  $tickerLeftPosition: number;
  $isStaticBar: boolean;
  $toolbarPosition: ToolbarPositionOptions;
}>`
  display: inline-block;
  padding: 0 10px;
  color: white;
  position: relative;

  & .tooltipWrapper {
    position: fixed;
    margin-top: ${({ $highToolbarTop, $barHeight, $toolbarPosition }) =>
      $toolbarPosition === ToolbarPositionOptions.bottom
        ? "-200px"
        : $highToolbarTop
        ? `calc(${$barHeight} + 10px)`
        : "10px"};
    left: ${({ $tickerLeftPosition, $isStaticBar }) =>
      $isStaticBar && `${$tickerLeftPosition}px`};
    margin-left: ${({ $isStaticBar }) => !$isStaticBar && "100px"};
  }

  & .tickinfo-tooltip {
    visibility: hidden;
    color: ${theme.colors.background};
    background-color: ${theme.colors.black};
    padding: 8px;
    border-radius: 8px;
    border: 1px solid ${theme.colors.background};
    transform: translate(-50%, 0);
    position: absolute;
    transition: all 0s ease 0.2s;
    cursor: default;
    min-width: 200px;
    white-space: break-spaces;

    &:hover {
      transition-delay: 0s;
      visibility: visible;
    }

    & .stock-logo {
      width: 20px;
      height: 20px;
    }

    & .special-info {
      color: ${theme.colors.gray};
    }

    & .box {
      border-radius: 6px;
      border: 1px solid ${theme.colors.background};
      padding: 8px;
      margin: 4px 0 0;
    }
  }

  &:hover .tickinfo-tooltip {
    transition-delay: 0s;
    visibility: visible;
  }
`;

export const AITooltipWrapper = styled.div<{
  $highToolbarTop: boolean;
  $barHeight: string;
  $tickerLeftPosition: number;
  $isStaticBar: boolean;
  $toolbarPosition: ToolbarPositionOptions;
}>`
  display: inline-block;
  position: relative;
  margin-left: 5px;

  & .ai-emoji {
    cursor: pointer;
    font-size: 16px;
    opacity: 1;
    filter: brightness(1.5) saturate(1.2);
    transition: all 0.2s;

    &:hover {
      filter: brightness(1.8) saturate(1.5);
      transform: scale(1.1);
    }
  }

  & .ai-tooltip {
    visibility: hidden;
    color: ${theme.colors.background};
    background: transparent;
    padding: 0;
    border: none;
    position: absolute;
    top: ${({ $highToolbarTop, $barHeight, $toolbarPosition }) =>
      $toolbarPosition === ToolbarPositionOptions.bottom
        ? "-220px"
        : $highToolbarTop
        ? "35px"
        : "25px"};
    left: 50%;
    transform: translateX(-50%);
    transition: all 0s ease 0.2s;
    cursor: default;
    white-space: break-spaces;
    z-index: 10001;
    box-shadow: none;

    &:hover {
      transition-delay: 0s;
      visibility: visible;
    }
  }

  &:hover .ai-tooltip {
    transition-delay: 0s;
    visibility: visible;
  }
`;

export const DataItem = styled.span<{
  $isNegative?: boolean;
  $isPositive?: boolean;
  $hidden?: boolean;
}>`
  padding: 0 5px;
  cursor: pointer;
  color: ${({ $isPositive, $isNegative }) =>
    $isPositive
      ? theme.colors.positive
      : $isNegative
      ? theme.colors.negative
      : theme.colors.white};
  display: ${({ $hidden }) => $hidden && "none"};
  font-family: "Open Sans", sans-serif;
  font-size: 17px;

  &:hover {
    opacity: 0.7;
  }
`;

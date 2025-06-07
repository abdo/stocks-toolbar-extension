import styled, { keyframes, css } from "styled-components";

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const slideLeft = keyframes`
  0% { transform: translateX(0); opacity: 1; }
  100% { transform: translateX(-100%); opacity: 0; }
`;

export const slideRight = keyframes`
  0% { transform: translateX(0); opacity: 1; }
  100% { transform: translateX(100%); opacity: 0; }
`;

export const slideInFromRight = keyframes`
  0% { transform: translateX(100%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;

export const slideInFromLeft = keyframes`
  0% { transform: translateX(-100%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;

export const aiGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(138, 43, 226, 0.3), 0 5px 15px 0 #00000026; }
  50% { box-shadow: 0 0 30px rgba(138, 43, 226, 0.5), 0 5px 15px 0 #00000026; }
`;

export const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export const LoadingSpinner = styled.div`
  border: 2px solid rgba(138, 43, 226, 0.2);
  border-top: 2px solid #8a2be2;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 1s linear infinite;
  margin: 0 auto;
`;

export const CarouselContainer = styled.div<{ $isAnimating: boolean }>`
  position: relative;
  overflow: visible;
  width: 300px;
  height: auto;
`;

export const StaticCard = styled.div<{ $isLoading?: boolean }>`
  --dark-grey: #2d2d2d;
  --middle-grey: #767676;
  --ai-primary: #8a2be2;
  --ai-secondary: #4b0082;
  --lightest-grey: linear-gradient(
    135deg,
    #fafafa 0%,
    #f0f0f0 50%,
    #ebebeb 100%
  );
  --shadow: 0 5px 15px 0 #00000026;
  --shadow-active: 0 5px 5px 0 #00000026;
  --border-radius-main: 12px;
  --border-radius-icon: 50px;

  position: relative;
  width: 280px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
  cursor: default;
  color: var(--dark-grey);
  opacity: 0.95;
  font-weight: 500;
  background: var(--lightest-grey);
  border-radius: var(--border-radius-main);
  border: 1px solid rgba(138, 43, 226, 0.2);
  box-shadow: var(--shadow);
  transition: 0.3s ease all;

  ${({ $isLoading }) =>
    $isLoading &&
    css`
      animation: ${aiGlow} 2s ease-in-out infinite;
    `}

  &:hover {
    box-shadow: 0 8px 25px rgba(138, 43, 226, 0.15), var(--shadow-active);
    transform: translateY(-1px);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      var(--ai-primary),
      transparent
    );
    background-size: 200% 100%;
    animation: ${shimmer} 3s ease-in-out infinite;
    border-radius: var(--border-radius-main) var(--border-radius-main) 0 0;
  }
`;

export const ContentSlider = styled.div<{ $isAnimating: boolean }>`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const SlidingContent = styled.div<{
  $isAnimating: boolean;
  $direction: "left" | "right";
  $slideOut: boolean;
}>`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  ${({ $isAnimating, $direction, $slideOut }) =>
    $isAnimating &&
    css`
      animation: ${$slideOut
          ? $direction === "right"
            ? slideLeft
            : slideRight
          : $direction === "right"
          ? slideInFromRight
          : slideInFromLeft}
        0.3s ease-in-out forwards;
    `}
`;

export const NavigationButton = styled.button<{ $direction: "left" | "right" }>`
  position: absolute;
  top: 50%;
  ${({ $direction }) => ($direction === "right" ? "right: 5px;" : "left: 5px;")}
  transform: translateY(-50%);
  background: linear-gradient(135deg, var(--ai-primary), var(--ai-secondary));
  color: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(138, 43, 226, 0.3);

  &:hover {
    background: linear-gradient(135deg, var(--ai-secondary), var(--ai-primary));
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 4px 12px rgba(138, 43, 226, 0.5);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }
`;

export const TextContent = styled.div`
  font-size: 14px;
  line-height: 1.6;
  cursor: default;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 2rem;
  font-weight: 500;
  letter-spacing: 0.3px;
  flex-grow: 1;
`;

export const InsightText = styled.div`
  font-size: 14px;
  line-height: 1.6;
`;

export const MoreInfoContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-block: 16px;
`;

export const MoreInfoTrigger = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--ai-primary);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  background: rgba(138, 43, 226, 0.1);
  border: 1px solid rgba(138, 43, 226, 0.2);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(138, 43, 226, 0.15);
    border-color: rgba(138, 43, 226, 0.3);
    transform: scale(1.02);
  }
`;

export const NestedTooltip = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 8px;
  background: linear-gradient(135deg, #2d2d2d, #1a1a1a);
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 12px;
  line-height: 1.4;
  width: 200px;
  text-align: left;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(138, 43, 226, 0.3);
  z-index: 10002;
  opacity: 0;
  visibility: hidden;
  transform: translateX(-50%) translateY(4px);
  transition: all 0.2s ease;

  &:before {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: #2d2d2d;
  }

  ${MoreInfoContainer}:hover & {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
  }
`;

export const NestedTooltipContent = styled.div`
  color: #e0e0e0;
  font-size: 10px;
  line-height: 1.3;
`;

export const IconsBox = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 0;
`;

export const IconContainer = styled.div<{ $isChecked: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ $isChecked }) => ($isChecked ? 1 : 0.6)};
  cursor: pointer;
  user-select: none;
  border: 1px solid
    ${({ $isChecked }) =>
      $isChecked ? "var(--ai-primary)" : "var(--middle-grey)"};
  border-radius: var(--border-radius-icon);
  transition: 0.2s ease all;
  padding: 8px 12px;
  background: ${({ $isChecked }) =>
    $isChecked ? "rgba(138, 43, 226, 0.1)" : "transparent"};

  &:hover {
    opacity: 0.9;
    box-shadow: var(--shadow);
    border-color: var(--ai-primary);
  }

  &:active {
    opacity: 0.9;
    box-shadow: var(--shadow-active);
  }
`;

export const rotateIconAnimation = keyframes`
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(3deg);
  }
  50% {
    transform: rotate(-3deg);
  }
  75% {
    transform: rotate(1deg);
  }
`;

export const IconSvg = styled.svg<{
  $isChecked: boolean;
  $isDislike?: boolean;
}>`
  width: 1.1rem;
  fill: ${({ $isChecked }) => ($isChecked ? "var(--ai-primary)" : "#353535")};
  transition: 0.2s ease all;

  &:hover {
    ${({ $isDislike }) =>
      !$isDislike &&
      css`
        animation: ${rotateIconAnimation} 0.7s ease-in-out both;
      `}
  }
`;

export const LoadingText = styled.div`
  background: linear-gradient(
    90deg,
    var(--ai-primary),
    var(--ai-secondary),
    var(--ai-primary)
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmer} 2s ease-in-out infinite;
  font-weight: 600;
  font-size: 14px;
`;

export const PremiumPlaceholderTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: var(--ai-primary);
  margin-bottom: 12px;
`;

export const PremiumPlaceholderText = styled.div`
  font-size: 13px;
  color: var(--middle-grey);
  margin-bottom: 20px;
  line-height: 1.5;
`;

export const PremiumUpgradeButton = styled.button`
  background: linear-gradient(135deg, var(--ai-primary), var(--ai-secondary));
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(138, 43, 226, 0.3);

  &:hover {
    background: linear-gradient(135deg, var(--ai-secondary), var(--ai-primary));
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(138, 43, 226, 0.5);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const DisclaimerContainer = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: middle; /* Helps align with the MoreInfoTrigger button */
`;

export const DisclaimerIcon = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--middle-grey);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-family: "Georgia", serif; /* A font that has a nice 'i' */
  font-weight: bold;
  cursor: help;
  user-select: none;
  transition: all 0.2s ease;

  &:hover {
    background: var(--dark-grey);
    transform: scale(1.1);
  }
`;

export const DisclaimerTooltip = styled.div`
  position: absolute;
  bottom: 120%; /* Position it well above the icon */
  left: 50%;
  transform: translateX(-50%);
  background: #3c3c3c;
  color: #f1f1f1;
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 10px;
  line-height: 1.5;
  width: 180px;
  text-align: left;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  z-index: 10003; /* Ensure it's on top of everything */
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
  pointer-events: none; /* So the tooltip doesn't interfere with mouse events */

  ${DisclaimerContainer}:hover & {
    opacity: 1;
    visibility: visible;
  }

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: #3c3c3c;
  }
`;

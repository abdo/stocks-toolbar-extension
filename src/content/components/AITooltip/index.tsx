import React, { useState, useEffect } from "react";
import Box from "../../../components/Box";
import styled, { keyframes, css } from "styled-components";
import theme from "../../../style/theme";

interface AITooltipProps {
  stockSymbol: string;
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const slideLeft = keyframes`
  0% { transform: translateX(0); opacity: 1; }
  100% { transform: translateX(-100%); opacity: 0; }
`;

const slideRight = keyframes`
  0% { transform: translateX(0); opacity: 1; }
  100% { transform: translateX(100%); opacity: 0; }
`;

const slideInFromRight = keyframes`
  0% { transform: translateX(100%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;

const slideInFromLeft = keyframes`
  0% { transform: translateX(-100%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;

const aiGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(138, 43, 226, 0.3), 0 5px 15px 0 #00000026; }
  50% { box-shadow: 0 0 30px rgba(138, 43, 226, 0.5), 0 5px 15px 0 #00000026; }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const LoadingSpinner = styled.div`
  border: 2px solid rgba(138, 43, 226, 0.2);
  border-top: 2px solid #8a2be2;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 1s linear infinite;
  margin: 0 auto;
`;

const CarouselContainer = styled.div<{ $isAnimating: boolean }>`
  position: relative;
  overflow: visible;
  width: 300px;
  height: 200px;
`;

const StaticCard = styled.div<{ $isLoading?: boolean }>`
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
  height: 200px;
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: default;
  color: var(--dark-grey);
  opacity: 0.95;
  padding: 1.2rem;
  padding-bottom: 0.4rem;
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

const ContentSlider = styled.div<{ $isAnimating: boolean }>`
  position: relative;
  width: 100%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const SlidingContent = styled.div<{
  $isAnimating: boolean;
  $direction: "left" | "right";
  $slideOut: boolean;
}>`
  position: absolute;
  width: 100%;
  height: 100%;
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

const NavigationButton = styled.button<{ $direction: "left" | "right" }>`
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

const TextContent = styled.div`
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
`;

const InsightText = styled.div`
  font-size: 14px;
  line-height: 1.6;
`;

const MoreInfoContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 8px;
`;

const MoreInfoTrigger = styled.div`
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

const NestedTooltip = styled.div`
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

const NestedTooltipTitle = styled.div`
  font-weight: 700;
  color: var(--ai-primary);
  margin-bottom: 6px;
  font-size: 13px;
`;

const NestedTooltipContent = styled.div`
  color: #e0e0e0;
  font-size: 9px;
  line-height: 1.3;
`;

const IconsBox = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 0;
`;

const IconContainer = styled.div<{ $isChecked: boolean }>`
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

const rotateIconAnimation = keyframes`
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

const IconSvg = styled.svg<{ $isChecked: boolean; $isDislike?: boolean }>`
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

const LoadingText = styled.div`
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

const insights = [
  "Market sentiment for this stock is currently bullish based on recent trading patterns and volume analysis.",
  "Technical indicators suggest a potential breakout above resistance levels with strong momentum signals.",
  "Analyst consensus shows strong buy recommendations with average price target increases of 15-20%.",
  "Options flow indicates institutional accumulation with significant call activity and positive gamma exposure.",
];

const insightEmojis = [
  "⚡", // Momentum insight
  "💧", // Liquidity insight
  "🎯", // Technical timing insight
  "🌍", // Market context insight
];

const insightTitles = [
  "Momentum Insight",
  "Liquidity Insight",
  "Technical Timing Insight",
  "Market Context Insight",
];

const loadingMessages = [
  "🔮 Doing magic with market data...",
  "✨ Analyzing quantum patterns...",
  "🧠 AI neurons firing...",
  "🚀 Consulting crystal ball...",
];

const moreInfoData = [
  {
    title: "Momentum Analysis",
    content:
      "AI detected 73% bullish sentiment from social media, news sentiment, and institutional trading patterns over the last 48 hours.",
  },
  {
    title: "Liquidity Depth",
    content:
      "Strong support at $156.20 with 2.3M shares. RSI at 67 indicates potential for continued upward movement.",
  },
  {
    title: "Technical Signals",
    content:
      "12 out of 15 analysts upgraded ratings. Average price target: $185 (+18% upside). Next earnings in 3 weeks.",
  },
  {
    title: "Market Context",
    content:
      "Unusual options activity: 340% above average call volume. Dark pool data shows institutional accumulation over 5 days.",
  },
];

const AITooltip: React.FC<AITooltipProps> = ({ stockSymbol }) => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [currentInsight, setCurrentInsight] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "right"
  );
  const [isSlideOut, setIsSlideOut] = useState(false);
  const [likes, setLikes] = useState<boolean[]>([false, false, false, false]);
  const [dislikes, setDislikes] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const nextInsight = () => {
    if (isAnimating) return;

    setSlideDirection("right");
    setIsSlideOut(true);
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentInsight((prev) => (prev + 1) % insights.length);
      setIsSlideOut(false);
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }, 300);
  };

  const previousInsight = () => {
    if (isAnimating) return;

    setSlideDirection("left");
    setIsSlideOut(true);
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentInsight(
        (prev) => (prev - 1 + insights.length) % insights.length
      );
      setIsSlideOut(false);
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }, 300);
  };

  const handleLike = (index: number) => {
    setLikes((prev) => {
      const newLikes = [...prev];
      newLikes[index] = !newLikes[index];
      return newLikes;
    });
    if (dislikes[index]) {
      setDislikes((prev) => {
        const newDislikes = [...prev];
        newDislikes[index] = false;
        return newDislikes;
      });
    }
  };

  const handleDislike = (index: number) => {
    setDislikes((prev) => {
      const newDislikes = [...prev];
      newDislikes[index] = !newDislikes[index];
      return newDislikes;
    });
    if (likes[index]) {
      setLikes((prev) => {
        const newLikes = [...prev];
        newLikes[index] = false;
        return newLikes;
      });
    }
  };

  if (isInitialLoading) {
    return (
      <StaticCard $isLoading={true}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap="16px"
          style={{ height: "100%" }}
        >
          <Box fontSize="16px" fontWeight="600" color="var(--ai-primary)">
            <strong>✨ AI Analysis</strong>
          </Box>
          <LoadingSpinner />
          <Box fontSize="12px" opacity={0.8} textAlign="center">
            <LoadingText>Initializing AI models...</LoadingText>
            <div style={{ marginTop: "4px", color: "#767676" }}>
              Analyzing {stockSymbol} across multiple dimensions
            </div>
          </Box>
        </Box>
      </StaticCard>
    );
  }

  return (
    <CarouselContainer $isAnimating={isAnimating}>
      <StaticCard>
        <ContentSlider $isAnimating={isAnimating}>
          <SlidingContent
            $isAnimating={isAnimating}
            $direction={slideDirection}
            $slideOut={isSlideOut}
          >
            <TextContent>
              <InsightText>{insights[currentInsight]}</InsightText>
              <MoreInfoContainer>
                <MoreInfoTrigger>ℹ️ More Details</MoreInfoTrigger>
                <NestedTooltip>
                  <NestedTooltipTitle>
                    {moreInfoData[currentInsight].title}
                  </NestedTooltipTitle>
                  <NestedTooltipContent>
                    {moreInfoData[currentInsight].content}
                  </NestedTooltipContent>
                </NestedTooltip>
              </MoreInfoContainer>
            </TextContent>
          </SlidingContent>
        </ContentSlider>

        <IconsBox>
          <IconContainer
            $isChecked={likes[currentInsight]}
            onClick={() => handleLike(currentInsight)}
          >
            <IconSvg viewBox="0 0 512 512" $isChecked={likes[currentInsight]}>
              <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
            </IconSvg>
          </IconContainer>

          <IconContainer
            $isChecked={dislikes[currentInsight]}
            onClick={() => handleDislike(currentInsight)}
          >
            <IconSvg
              viewBox="0 0 512 512"
              style={{ transform: "rotate(180deg)" }}
              $isChecked={dislikes[currentInsight]}
              $isDislike={true}
            >
              <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
            </IconSvg>
          </IconContainer>
        </IconsBox>

        <NavigationButton $direction="left" onClick={previousInsight}>
          ←
        </NavigationButton>

        <NavigationButton $direction="right" onClick={nextInsight}>
          →
        </NavigationButton>
      </StaticCard>
    </CarouselContainer>
  );
};

export default AITooltip;

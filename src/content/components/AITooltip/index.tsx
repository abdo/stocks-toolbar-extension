import React, { useState, useEffect } from "react";
import Box from "../../../components/Box";
import { StockData } from "../../../utils/helpers/formatStocksData";
import getAIInsights, {
  AIInsightsData,
} from "../../../utils/helpers/getAIInsights";
import Tooltip from "../../../components/Tooltip";
import {
  CarouselContainer,
  ContentSlider,
  IconContainer,
  IconsBox,
  IconSvg,
  InsightText,
  LoadingSpinner,
  LoadingText,
  MoreInfoContainer,
  MoreInfoTrigger,
  NavigationButton,
  NestedTooltip,
  NestedTooltipContent,
  PremiumPlaceholderText,
  PremiumPlaceholderTitle,
  PremiumUpgradeButton,
  SlidingContent,
  StaticCard,
  TextContent,
  DisclaimerContainer,
  DisclaimerIcon,
  DisclaimerTooltip,
  BlurredContentContainer,
  UnlockMessageOverlay,
} from "./style";

interface AITooltipProps {
  stockData: StockData;
  isSubscriptionActive: boolean;
}

const AITooltip: React.FC<AITooltipProps> = ({
  stockData,
  isSubscriptionActive,
}) => {
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
  const [aiInsights, setAiInsights] = useState<AIInsightsData | null>(null);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  const fallbackInsights = [
    "Market sentiment for this stock is currently bullish based on recent trading patterns and volume analysis.",
    "Technical indicators suggest a potential breakout above resistance levels with strong momentum signals.",
    "Analyst consensus shows strong buy recommendations with average price target increases of 15-20%.",
    "Options flow indicates institutional accumulation with significant call activity and positive gamma exposure.",
  ];

  const insightKeys = ["momentum", "liquidity", "timing", "context"] as const;

  useEffect(() => {
    if (isSubscriptionActive) {
      setIsInitialLoading(true);
      setLoadingError(null);
      setAiInsights(null);

      const fetchInsightsOnMount = async () => {
        try {
          const insights = await getAIInsights(stockData);
          setAiInsights(insights);
        } catch (error) {
          console.error("Failed to fetch AI insights:", error);
          if (error instanceof Error) {
            setLoadingError(error.message);
          } else {
            setLoadingError(
              "An unknown error occurred while fetching AI insights."
            );
          }
          setAiInsights(null);
        } finally {
          setIsInitialLoading(false);
        }
      };

      fetchInsightsOnMount();
    } else {
      setIsInitialLoading(false);
      setAiInsights(null);
      setLoadingError(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpgradeClick = () => {
    chrome.runtime.sendMessage({ action: "open-popup" });
  };

  const getCurrentInsight = () => {
    if (!aiInsights) return fallbackInsights[currentInsight];
    const key = insightKeys[currentInsight];
    return (
      aiInsights.object[key]?.simple_insight || fallbackInsights[currentInsight]
    );
  };

  const getCurrentExpertInsight = () => {
    if (!aiInsights)
      return "Expert analysis fallback: Detailed data currently unavailable.";
    const key = insightKeys[currentInsight];
    return (
      aiInsights.object[key]?.expert_insight ||
      "Expert analysis fallback: Detailed data currently unavailable."
    );
  };

  const nextInsight = () => {
    if (isAnimating) return;
    setSlideDirection("right");
    setIsSlideOut(true);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentInsight((prev) => (prev + 1) % insightKeys.length);
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
        (prev) => (prev - 1 + insightKeys.length) % insightKeys.length
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

  if (!isSubscriptionActive) {
    return (
      <StaticCard>
        <UnlockMessageOverlay>
          <PremiumPlaceholderTitle>
            ✨ Unlock AI Insights for {stockData.name}
          </PremiumPlaceholderTitle>
          <PremiumPlaceholderText>
            Get exclusive analysis for deeper market understanding of the stocks
            you are interested in.
          </PremiumPlaceholderText>
          <PremiumUpgradeButton onClick={handleUpgradeClick}>
            Try for free
          </PremiumUpgradeButton>
        </UnlockMessageOverlay>

        <BlurredContentContainer>
          <ContentSlider $isAnimating={false}>
            <SlidingContent
              $isAnimating={false}
              $direction={"right"}
              $slideOut={false}
            >
              <TextContent>
                <InsightText>{fallbackInsights[0]}</InsightText>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap="8px"
                  mt="16px"
                >
                  <MoreInfoContainer>
                    <MoreInfoTrigger>ℹ️ More Details</MoreInfoTrigger>
                  </MoreInfoContainer>
                  <DisclaimerContainer>
                    <DisclaimerIcon>i</DisclaimerIcon>
                  </DisclaimerContainer>
                </Box>
              </TextContent>
            </SlidingContent>
          </ContentSlider>
          <IconsBox>
            <Tooltip title="Helpful insight">
              <IconContainer $isChecked={false}>
                <IconSvg viewBox="0 0 512 512" $isChecked={false}>
                  <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                </IconSvg>
              </IconContainer>
            </Tooltip>
            <Tooltip title="Not that helpful">
              <IconContainer $isChecked={false}>
                <IconSvg
                  viewBox="0 0 512 512"
                  style={{ transform: "rotate(180deg)" }}
                  $isChecked={false}
                  $isDislike={true}
                >
                  <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                </IconSvg>
              </IconContainer>
            </Tooltip>
          </IconsBox>
          <NavigationButton $direction="left">←</NavigationButton>
          <NavigationButton $direction="right">→</NavigationButton>
        </BlurredContentContainer>
      </StaticCard>
    );
  }

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
            <LoadingText>Making magic happen...</LoadingText>
            <div style={{ marginTop: "4px", color: "#767676" }}>
              Analyzing {stockData.name} with AI insights
            </div>
          </Box>
        </Box>
      </StaticCard>
    );
  }

  if (loadingError) {
    return (
      <StaticCard>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap="16px"
          style={{ height: "100%" }}
        >
          <Box fontSize="16px" fontWeight="600" color="#ff6b6b">
            ⚠️ Analysis Error
          </Box>
          <Box fontSize="12px" opacity={0.8} textAlign="center" color="#666">
            {loadingError}
          </Box>
          <Box
            fontSize="10px"
            opacity={0.6}
            textAlign="center"
            color="#888"
            marginTop="8px"
          >
            Please try again shortly.
          </Box>
        </Box>
      </StaticCard>
    );
  }

  if (!aiInsights) {
    return (
      <StaticCard>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap="16px"
          style={{ height: "100%" }}
        >
          <Box fontSize="16px" fontWeight="600" color="#ffcc00">
            🤔 No Insights Available
          </Box>
          <Box fontSize="12px" opacity={0.8} textAlign="center" color="#666">
            AI insights are currently unavailable for {stockData.name}.
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
              <InsightText>{getCurrentInsight()}</InsightText>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                gap="2px"
                mt="16px"
              >
                <MoreInfoContainer>
                  <MoreInfoTrigger>ℹ️ More Details</MoreInfoTrigger>
                  <NestedTooltip>
                    <NestedTooltipContent>
                      {getCurrentExpertInsight()}
                    </NestedTooltipContent>
                  </NestedTooltip>
                </MoreInfoContainer>
                <DisclaimerContainer>
                  <DisclaimerIcon>i</DisclaimerIcon>
                  <DisclaimerTooltip>
                    This content is AI-generated and for informational purposes
                    only. It is not financial advice. Always conduct your own
                    research or consult with a qualified professional before
                    making investment decisions.
                  </DisclaimerTooltip>
                </DisclaimerContainer>
              </Box>
            </TextContent>
          </SlidingContent>
        </ContentSlider>

        <IconsBox>
          <Tooltip title="Helpful insight">
            <IconContainer
              $isChecked={likes[currentInsight]}
              onClick={() => handleLike(currentInsight)}
            >
              <IconSvg viewBox="0 0 512 512" $isChecked={likes[currentInsight]}>
                <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
              </IconSvg>
            </IconContainer>
          </Tooltip>

          <Tooltip title="Not that helpful">
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
          </Tooltip>
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

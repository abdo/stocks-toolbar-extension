import { StockData } from "./formatStocksData";
import HmacSHA256 from "crypto-js/hmac-sha256";
import Utf8 from "crypto-js/enc-utf8";
import Base64 from "crypto-js/enc-base64";
import CryptoJS from "crypto-js"; // Import the full CryptoJS library to access .lib.WordArray

export interface AIInsightResponse {
  momentum: {
    expert_insight: string;
    simple_insight: string;
  };
  liquidity: {
    expert_insight: string;
    simple_insight: string;
  };
  timing: {
    expert_insight: string;
    simple_insight: string;
  };
  context: {
    expert_insight: string;
    simple_insight: string;
  };
}

export interface AIInsightsData {
  object: AIInsightResponse;
}

// Helper function for Base64URL encoding
function base64urlEncode(source: CryptoJS.lib.WordArray): string {
  // Encode in classical base64
  let encodedSource = Base64.stringify(source);
  // Remove padding equal characters
  encodedSource = encodedSource.replace(/=+$/, "");
  // Replace characters according to base64url specifications
  encodedSource = encodedSource.replace(/\+/g, "-");
  encodedSource = encodedSource.replace(/\//g, "_");
  return encodedSource;
}

const generateJWT = (): string => {
  const header = { alg: "HS256", typ: "JWT" };
  // Using an empty payload as implied by Postman's default if no claims are added
  const payload = {};
  const secret = "iloveinvestfellow";

  const encodedHeader = base64urlEncode(Utf8.parse(JSON.stringify(header)));
  const encodedPayload = base64urlEncode(Utf8.parse(JSON.stringify(payload)));

  const signatureInput = `${encodedHeader}.${encodedPayload}`;
  const signature = HmacSHA256(signatureInput, secret);
  const encodedSignature = base64urlEncode(signature);

  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
};

const getAIInsights = async (stockData: StockData): Promise<AIInsightsData> => {
  try {
    const token = generateJWT();
    const response = await fetch(
      "https://primary-production-5b10.up.railway.app/webhook/getInsights",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          language: "en-US",
          region: "US",
          quoteType: stockData.quoteType || "EQUITY",
          typeDisp: stockData.typeDisp || "Equity",
          quoteSourceName: "CoinMarketCap", // This was in your Postman body example
          triggerable: true, // This was in your Postman body example
          customPriceAlertConfidence: "HIGH", // This was in your Postman body example
          marketState: stockData.marketState || "REGULAR",
          longName: stockData.company || stockData.name,
          // Include other relevant fields from stockData as per your Postman body
          symbol: stockData.name,
          regularMarketPrice: stockData.price,
          regularMarketChange: stockData.todaysChange,
          regularMarketChangePercent: stockData.todaysChangePerc,
          regularMarketPreviousClose: stockData.priceBeforeClose,
          ask: stockData.askPrice,
          bid: stockData.bidPrice,
          fullExchangeName: stockData.exchange,
          logoUrl: stockData.logo,
          sectorDisp: stockData.sectorDisp,
          // Ensure all fields from your Postman request body screenshot are included
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        console.error(
          "Authentication error fetching AI insights:",
          response.status
        );
        throw new Error(
          `Authentication failed (${response.status}). Please check client-side token generation or server-side validation.`
        );
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data && data.length > 0) {
      return data[0]; // API returns an array, we want the first item
    }
    throw new Error("AI insights response format is unexpected or empty.");
  } catch (error) {
    console.error("Error fetching AI insights:", error);
    // Make sure the error is re-thrown so AITooltip can catch it and set loadingError
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unknown error occurred while fetching AI insights.");
  }
};

export default getAIInsights;

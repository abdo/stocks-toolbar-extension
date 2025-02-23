import React, { useState, useRef, useEffect } from "react";

interface TooltipProps {
  title: React.ReactNode; // Can be a string or JSX
  children: React.ReactElement; // The hoverable element
}

const Tooltip: React.FC<TooltipProps> = ({ title, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const showTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(true);
  };

  const hideTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 500); // Delay of 0.5 seconds
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      style={{ position: "relative", display: "inline-block" }}
    >
      {React.cloneElement(
        children as React.ReactElement<{ ref?: React.Ref<HTMLDivElement> }>,
        { ref: tooltipRef }
      )}
      {isVisible && (
        <div
          className="tooltip"
          style={{
            position: "absolute",
            bottom: "100%", // Position above the hoverable element
            left: "50%",
            transform: "translateX(-50%)", // Center align
            padding: "8px",
            backgroundColor: "#333",
            color: "#fff",
            borderRadius: "4px",
            whiteSpace: "nowrap",
            zIndex: 1000,
          }}
        >
          {title}
        </div>
      )}
    </div>
  );
};

export default Tooltip;

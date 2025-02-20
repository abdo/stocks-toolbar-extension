import React, { useState } from "react";
import "./style.css";

export interface Option<T = any> {
  value: T;
  label: string;
}

interface SolidSelectProps<T = any> {
  options: Option<T>[];
  value?: T;
  onChange: (value: T) => void;
  name: string;
}

const SolidSelect = <T extends any>({
  options,
  value,
  onChange,
  name,
}: SolidSelectProps<T>) => {
  const [lastUserInteraction, setLastUserInteraction] = useState<T | null>(
    null
  );

  const handleClick = (newValue: T) => {
    // Only trigger animation if it's an actual user click
    setLastUserInteraction(newValue);
    onChange(newValue);
    // Reset animation state after animation completes
    setTimeout(() => setLastUserInteraction(null), 800);
  };

  return (
    <div className="radio-inputs">
      {options.map((option) => (
        <label key={String(option.value)} className="radio">
          <input
            type="radio"
            name={name}
            checked={value === option.value}
            onChange={() => handleClick(option.value)}
          />
          <span
            className={`name ${
              value === option.value && lastUserInteraction === option.value
                ? "animate"
                : ""
            }`}
          >
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
};

export default SolidSelect;

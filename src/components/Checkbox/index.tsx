import React from "react";
import { CheckboxWrapper, TermsLabel } from "./style";

interface CheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
  disabled?: boolean;
  id?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  children,
  disabled,
  id = `cbx-${Math.random().toString(36).substr(2, 9)}`,
}) => {
  return (
    <CheckboxWrapper>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        id={id}
      />
      <TermsLabel htmlFor={id} $disabled={disabled}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 200 200"
          className="checkbox-svg"
        >
          <mask fill="white" id={`path-1-inside-1_476_5-${id}`}>
            <rect height="200" width="200"></rect>
          </mask>
          <rect
            mask={`url(#path-1-inside-1_476_5-${id})`}
            strokeWidth="40"
            className="checkbox-box"
            height="200"
            width="200"
          ></rect>
          <path
            strokeWidth="15"
            d="M52 111.018L76.9867 136L149 64"
            className="checkbox-tick"
          ></path>
        </svg>
        {children && <span className="label-text">{children}</span>}
      </TermsLabel>
    </CheckboxWrapper>
  );
};

export default Checkbox;

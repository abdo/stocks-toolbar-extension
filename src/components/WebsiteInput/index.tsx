import React, { useState } from "react";
import styled from "styled-components";

// Styled component for the input container
const StyledInputContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding-inline-start: 5px;
  background-color: rgba(0, 0, 0, 0.04);
  font-size: 12px;
  height: 40px; /* Adjust height as needed */
`;

// Styled component for the static text
const StaticText = styled.span`
  color: #333;
`;

// Styled component for the input with the specified styles
const StyledInput = styled.input`
  border: none; /* Remove border from input to match container */
  border-radius: 4px;
  padding: 5px;
  background-color: white; /* White background for input */
  margin-left: 5px; /* Space between static text and input */
  box-sizing: border-box;
  flex-grow: 1; /* Allow input to take up remaining space */
  height: 100%; /* Ensure input has the same height as container */
`;

// WebsiteInput component
const WebsiteInput: React.FC<{
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  value: string;
}> = ({ onChange, onKeyDown, value }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
  };

  return (
    <StyledInputContainer>
      <StaticText>https://www.</StaticText>
      <StyledInput
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        placeholder="google.com"
      />
    </StyledInputContainer>
  );
};

export default WebsiteInput;

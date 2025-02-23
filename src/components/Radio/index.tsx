import React from "react";
import styled from "styled-components";
import theme from "../../style/theme";

interface RadioProps<T = any> {
  id: string;
  name: string;
  value: T;
  checked: boolean;
  onChange: (e: { target: { value: T } }) => void;
  label: string;
}

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 4px 0;
  cursor: pointer;
`;

const RadioInput = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid ${theme.colors.gray};
  border-radius: 50%;
  margin-right: 8px;
  cursor: pointer;
  position: relative;
  outline: none;

  &:checked {
    border-color: ${theme.colors.primary};

    &:after {
      content: "";
      position: absolute;
      width: 12px;
      height: 12px;
      background-color: ${theme.colors.primary};
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &:hover {
    border-color: ${theme.colors.primary};
  }
`;

const Label = styled.label`
  cursor: pointer;
  color: ${theme.colors.black};
  font-size: 14px;
`;

function Radio<T>({
  id,
  name,
  value,
  checked,
  onChange,
  label,
}: RadioProps<T>) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ target: { value } });
  };

  return (
    <RadioContainer>
      <RadioInput
        type="radio"
        id={id}
        name={name}
        value={String(value)}
        checked={checked}
        onChange={handleChange}
      />
      <Label htmlFor={id}>{label}</Label>
    </RadioContainer>
  );
}

export default Radio;

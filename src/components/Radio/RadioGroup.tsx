import React from "react";
import styled from "styled-components";
import Radio from "./index";

interface Option<T> {
  value: T;
  label: string;
}

interface RadioGroupProps<T> {
  name: string;
  options: Option<T>[];
  value: T;
  onChange: (e: { target: { value: T } }) => void;
}

const RadioGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

function RadioGroup<T>({ name, options, value, onChange }: RadioGroupProps<T>) {
  return (
    <RadioGroupContainer>
      {options.map((option) => (
        <Radio
          key={String(option.value)}
          id={`${name}-${String(option.value)}`}
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={onChange}
          label={option.label}
        />
      ))}
    </RadioGroupContainer>
  );
}

export default RadioGroup;

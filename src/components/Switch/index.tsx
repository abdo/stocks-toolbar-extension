import React from "react";
import { SwitchContainer } from "./style";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => {
  return (
    <SwitchContainer>
      <input
        id="toggleSwitch"
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label className="toggleSwitch" htmlFor="toggleSwitch"></label>
    </SwitchContainer>
  );
};

export default Switch;

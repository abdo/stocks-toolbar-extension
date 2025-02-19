import styled from "styled-components";
import theme from "../../style/theme";

interface CheckboxLabelProps {
  $disabled?: boolean;
}

export const CheckboxWrapper = styled.div`
  margin-block: 12px;

  input[type="checkbox"] {
    display: none;
  }
`;

export const TermsLabel = styled.label<CheckboxLabelProps>`
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  font-size: 14px;
  color: ${theme.colors.black};

  .label-text {
    margin-left: 10px;
  }

  .checkbox-svg {
    width: 14px;
    height: 14px;
  }

  .checkbox-box {
    fill: rgba(207, 205, 205, 0.425);
    stroke: ${theme.colors.primary};
    stroke-dasharray: 800;
    stroke-dashoffset: 800;
    transition: stroke-dashoffset 0.6s ease-in;
  }

  .checkbox-tick {
    stroke: ${theme.colors.primary};
    stroke-dasharray: 172;
    stroke-dashoffset: 172;
    transition: stroke-dashoffset 0.6s ease-in;
  }

  input[type="checkbox"]:checked + & .checkbox-box,
  input[type="checkbox"]:checked + & .checkbox-tick {
    stroke-dashoffset: 0;
  }
`;

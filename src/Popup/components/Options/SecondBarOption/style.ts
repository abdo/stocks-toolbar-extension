import { Radio } from "antd";

import styled from "styled-components";

export const RadioGroup = styled(Radio.Group)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  text-align: center;
`;

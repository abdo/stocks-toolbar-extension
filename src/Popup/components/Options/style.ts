import styled from "styled-components";

export const Option = styled.div`
  margin: 0 0 20px;

  // it should have nice slight bottom border, except the last one
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 20px;
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

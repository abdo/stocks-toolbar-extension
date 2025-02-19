import styled from "styled-components";

export const StyledLink = styled.a`
  color: #0057d1;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color 0.3s;
  font-weight: 500;

  &:hover {
    color: rgb(24, 109, 230);
  }

  &:active {
    color: rgb(9, 66, 146);
  }
`;

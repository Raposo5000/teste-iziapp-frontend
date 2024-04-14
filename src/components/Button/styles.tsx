import styled from "styled-components";

export const StyledButton = styled.button<{fullWidth?: boolean}>`
  padding: 12px;
  border-radius: 8px;
  font-size: 18px;
  background-color: #892cdc;
  color: white;
  border: none;
  cursor: pointer;
  transition: 0.2s;
  width: ${({fullWidth}) => fullWidth ? "-webkit-fill-available" : "auto"};

  &:hover {
    filter: brightness(1.2);
  }
`;

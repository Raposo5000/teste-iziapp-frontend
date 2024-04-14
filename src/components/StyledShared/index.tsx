import styled from "styled-components";


export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContainerIcon = styled.span`
  border-radius: 100%;
  display: flex;
  padding: 2px;
  transition: 0.1s;
  cursor: pointer;

  &:hover {
    background-color: lightgrey;
  }
`;
import styled from "styled-components";
import { animationFadeIn } from "../../components/StyledShared";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BoxLogin = styled.div`
  background-color: white;
  width: 300px;
  /* height: 300px; */
  border-radius: 12px;
  padding: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 2px 2px 28px black;
  animation: ${animationFadeIn} 0.7s ease-in;
`;

export const ContainerFormLogin = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: -webkit-fill-available;
`;

export const WelcomeText = styled.h1`
  margin: 0;
  margin-bottom: 32px;
`

export const RegisterText = styled.span`
  cursor: pointer;
  text-decoration: underline;
`
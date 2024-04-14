import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BoxRegister = styled.div`
  background-color: white;
  width: 300px;
  /* height: 300px; */
  border-radius: 12px;
  padding: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 2px 2px 3px gray;
`;

export const RegisterText = styled.h1`
  margin: 0;
  margin-bottom: 32px;
`

export const ContainerFormRegister = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: -webkit-fill-available;
`;
import styled from "styled-components";
import { TypeStatusTask } from "../../interfaces/task";
import { animationFadeIn } from "../../components/StyledShared";

export const ContainerTasks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: auto;
  padding: 10px;
`;

export const BoxTask = styled.div<{ status?: TypeStatusTask }>`
  display: flex;
  background: ${({ status }) =>
    status === "completed" ? "#00d14824 " : "white"};
  box-shadow: 2px 2px 7px #959595;
  padding: 8px;
  border-radius: 8px;
  justify-content: space-between;
  color: #535353;
  font-weight: 600;
`;

export const BoxDashboard = styled.div`
  width: 800px;
  height: 600px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 0px 16px;
  padding: 16px;
  box-shadow: 2px 2px 28px black;
  background-color: #f1f2f4;
  border-radius: 12px;
  animation: ${animationFadeIn} 0.7s ease-in;
`;

export const ContainerIcons = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  font-size: 20px;
`;

export const ActionsHeader = styled.header`
  display: flex;
  justify-content: space-between;
`;

export const MainHeader = styled.header`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 600;
  color: #535353;
`;

export const ModalContent = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const LogoutSpan = styled.span`
  cursor: pointer;
  text-decoration: underline;
`;

export const TitleTask = styled.span<{ status?: TypeStatusTask }>`
  word-break: break-word;
  margin-right: 3px;
  text-decoration: ${({ status }) =>
    status === "completed" ? "line-through" : "none"};
`;

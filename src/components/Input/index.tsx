import { ReactNode } from "react";
import { StyledInput } from "./styles";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
}

const Input = ({ ...props }: InputProps) => {
  return (
    <StyledInput {...props}>
    </StyledInput>
  );
};

export default Input;

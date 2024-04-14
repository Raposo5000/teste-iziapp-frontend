import React from "react";

import { StyledButton } from "./styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean
}

const Button = ({ fullWidth, ...props }: ButtonProps) => {
  return <StyledButton {...props} fullWidth={fullWidth} />;
};

export default Button;

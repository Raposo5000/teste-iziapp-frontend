import React, { useState } from "react";

import { StyledButton } from "./styles";
import CircularProgress from "../CircularProgress";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  onClick: () => Promise<void>;
}

const Button = ({
  onClick,
  fullWidth,
  disabled,
  children,
  ...props
}: ButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (disabled) {
      return; // Se o botão estiver desabilitado, não faz nada
    }

    setIsLoading(true);
    try {
      await onClick();
    } catch (error) {
      // Trate o erro, se necessário
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledButton
      {...props}
      fullWidth={fullWidth}
      disabled={isLoading || disabled}
      onClick={handleClick}
    >
      {isLoading ? (
        <CircularProgress color="white" />
      ) : (
        children
      )}
    </StyledButton>
  );
};

export default Button;

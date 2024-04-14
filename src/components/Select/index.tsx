import React, { ReactNode } from "react";
import { StyledSelect } from "./Style";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children?: ReactNode;
}

const Select = ({ children, ...props }: SelectProps) => {
  return <StyledSelect {...props}>{children}</StyledSelect>;
};

export default Select;

import React from "react";
import { buttonType, buttonSize, buttonRounded } from "./style";
import { IButton } from "../../react-app-env";

const Button: React.FC<IButton> = ({
  children,
  onClick,
  type,
  size,
  rounded,
}: IButton) => {
  return (
    <button
      onClick={onClick}
      className={buttonType[type] + buttonSize[size] + buttonRounded[rounded]}
    >
      {children}
    </button>
  );
};

export default Button;

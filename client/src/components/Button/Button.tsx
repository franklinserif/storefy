import React from "react";
import { buttonType, buttonSize, buttonRounded } from "./style";
import { IButton } from "../../react-app-env";

/**
 * Button component with all differents type, size and shapes
 * @param props
 * @param props.children
 * @param props.onClick
 * @param props.type
 * @param props.size
 * @param props.rounded
 * @returns JSX.Element
 */
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

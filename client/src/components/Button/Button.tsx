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
 * @param props.className
 * @returns JSX.Element
 */
const Button: React.FC<IButton> = ({
  children,
  type,
  size,
  rounded,
  onClick,
  classes,
}: IButton) => {
  return (
    <button
      className={
        buttonType[type] + buttonSize[size] + buttonRounded[rounded] + classes
      }
    >
      {children}
    </button>
  );
};

export default Button;

import React, { useState } from "react";
import { IExpansButton } from "../../react-app-env";

import "./style.css";

/**
 * Expans button component
 * @param props
 * @param props.nextFunction
 * @param props.icon
 * @param props.check
 * @param props.classes
 * @returns
 */
const ExpansButton: React.FC<IExpansButton> = ({
  nextFunction,
  children,
  icon,
  check,
  classes,
}: IExpansButton) => {
  const [isActive, setIsActive] = useState(!!check);

  const handleClick = () => {
    nextFunction();
    setIsActive((active) => !active);
  };

  return (
    <button
      onClick={handleClick}
      className={
        `favorite-btn font-light text-sm  transition ${
          isActive ? " bg-teal-500 text-white" : "text-teal-500 bg-white "
        }` + classes
      }
    >
      {icon}
      <div
        className={` custom-text  ${isActive ? " text-white" : "text-back"}`}
      >
        {children}
      </div>
    </button>
  );
};

export default ExpansButton;

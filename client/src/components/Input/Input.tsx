import React from "react";
import { IInput } from "../../react-app-env";
import {
  inputBaseStyle,
  inputSize,
  inputRounded,
  labelBaseStyle,
  labelSize,
  errorStyle,
} from "./style";

/**
 * Input component, value change with onChange event
 * @param props
 * @returns JSX.Element
 */
const Input: React.FC<IInput> = ({
  name,
  size,
  rounded,
  type,
  error,
  ...rest
}: IInput) => {
  return (
    <fieldset>
      <label htmlFor={name} className={`${labelBaseStyle} ${labelSize[size]}`}>
        {name}
      </label>
      <input
        {...rest}
        type={type}
        name={name}
        className={
          `${inputBaseStyle} ${inputSize[size]} ${inputRounded[rounded]}` +
          (error && errorStyle)
        }
      />
      <span
        className={`${error ? "visible" : "invisible"} ${
          labelSize[size]
        } text-red-500 font-medium mt-2`}
      >
        {name} is required and must be a valie {type}
      </span>
    </fieldset>
  );
};

export default Input;

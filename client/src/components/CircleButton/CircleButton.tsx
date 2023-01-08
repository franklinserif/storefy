import React, { useState } from "react";
import { ICircleButton } from "../../react-app-env";
import { circleButtonStyle } from "./style";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

const CircleButton: React.FC<ICircleButton> = ({
  productModel,
  isActive,
  parentFunction,
  image,
}: ICircleButton) => {
  const [visible, setVisible] = useState(false);

  return (
    <Tippy
      visible={visible}
      content={<span>{productModel.name}</span>}
      placement="top"
    >
      <button
        onClick={() => parentFunction(productModel.id)}
        onMouseEnter={() => {
          setVisible(true);
        }}
        onMouseLeave={() => {
          setVisible(false);
        }}
        className={`${circleButtonStyle} hover:ring-offset-2 ${
          isActive && "ring-teal-500"
        }`}
        style={{ background: `${productModel.color}` }}
        name={productModel.name}
      >
        {image && (
          <img
            src={productModel.image}
            alt={productModel.name}
            className="w-full h-full rounded-full hover:w-80"
          />
        )}
      </button>
    </Tippy>
  );
};

export default CircleButton;

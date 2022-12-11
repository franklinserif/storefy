import React, { useState } from "react";
import { ICircleButton } from "../../react-app-env";
import { circleButtonStyle } from "./style";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

const CircleButton: React.FC<ICircleButton> = ({
  color = "",
  image,
  name,
}: ICircleButton) => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible((prev) => !prev);
  };

  return (
    <Tippy
      onClickOutside={() => {
        setVisible(false);
      }}
      visible={visible}
      content={<span>{name}</span>}
      placement="top"
    >
      <button
        onClick={handleClick}
        className={`${circleButtonStyle} hover:ring-offset-2 ${
          visible && "ring-teal-500"
        }`}
        style={{ background: `#${color}` }}
        name={name}
      >
        {image && (
          <img src={image} alt={name} className="w-full h-full rounded-full" />
        )}
      </button>
    </Tippy>
  );
};

export default CircleButton;

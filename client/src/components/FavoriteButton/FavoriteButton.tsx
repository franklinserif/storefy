import React from "react";
import { IFavoriteButton } from "../../react-app-env";

import "./style.css";

const FavoriteButton: React.FC<IFavoriteButton> = ({
  nextFunction,
  children,
  icon,
}: IFavoriteButton) => {
  const handleClick = () => {
    nextFunction();
  };

  return (
    <button
      onClick={handleClick}
      className="favorite-btn font-light text-sm text-teal-500"
    >
      {icon}
      <div className="custom-text">{children}</div>
    </button>
  );
};

export default FavoriteButton;

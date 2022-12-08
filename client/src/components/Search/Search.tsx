import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { ISearch } from "../../react-app-env";
import { inputSize } from "../Input/style";
import { buttonSize } from "../Button/style";
import { inputBaseStyle, buttonBaseStyle, textSize } from "./style";

const Search: React.FC<ISearch> = ({ onChange, size }: ISearch) => {
  return (
    <fieldset className="drop-shadow-2xl">
      <input type="search" className={`${inputSize[size]} ${inputBaseStyle}`} />
      <button
        className={`${buttonBaseStyle} ${buttonSize[size]} ${textSize[size]}`}
      >
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          color="white"
          className="mr-2"
        />{" "}
        Search
      </button>
    </fieldset>
  );
};

export default Search;

import { useState } from "react";
import { IProduct, IProductModel } from "../../react-app-env";
import CircleButton from "../CircleButton/CircleButton";
import Button from "../Button/Button";
import ExpansButton from "../ExpansButton/ExpansButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

import "./style.css";

/**
 * Product component
 * @param props
 * @returns JSX.Element
 */
const Product: React.FC<IProduct> = ({ product }: IProduct) => {
  const [selectedProduct, setSelectedProduct] = useState(
    product.productModels[0]
  );

  const handleSelect = (id: string) => {
    setSelectedProduct(
      product.productModels.find((model) => model.id === id) as IProductModel
    );
  };

  return (
    <div className="flex flex-col w-72 items-center  text-center product">
      <section className="relative w-72 flex flex-col img-custom">
        <ExpansButton
          classes=" absolute top-2 expans-btn expans-btn "
          icon={<FontAwesomeIcon icon={faHeart} />}
          check
          nextFunction={() => {
            console.log("qwd");
          }}
        >
          Add to wish list
        </ExpansButton>
        <img className="h-96" src={selectedProduct?.image} alt="produt" />

        <Button
          classes=" absolute w-full bottom-0 transition-all duration-500"
          type="OUTLINED"
          size="MD"
          onClick={() => {
            console.log("click");
          }}
          rounded="SM"
        >
          QUICK ADD
        </Button>
      </section>
      <p className="uppercase text-slate-400 mt-4 text-sm font-light">
        {product.seller}
      </p>
      <a href="#link" className="text-slate-900">
        {product.description}
      </a>
      <p className="text-slate-900 font-bold text-base mt-3">$36.99</p>
      <section className="flex justify-between w-36 mt-3">
        {product.productModels.map(
          (productModel, index) =>
            index < 4 && (
              <CircleButton
                parentFunction={handleSelect}
                isActive={selectedProduct.id === productModel.id}
                productModel={productModel}
                key={productModel.id}
              ></CircleButton>
            )
        )}
        <p className="text-slate-300 ml-2 text-sm">
          {product.productModels.length - 4} +
        </p>
      </section>
    </div>
  );
};

export default Product;

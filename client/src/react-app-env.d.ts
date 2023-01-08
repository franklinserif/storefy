/// <reference types="react-scripts" />

export interface IButton {
  classes: string;
  children: React.ReactNode;
  type: "PRIMARY" | "SECONDARY" | "OUTLINED";
  size: "SM" | "MD" | "BG";
  rounded: "SM" | "MD" | "BG" | "CIRCLE";
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface IInput {
  name: string;
  type: "text" | "password" | "email" | "search";
  size: "SM" | "MD" | "BG";
  rounded: "SM" | "MD" | "BG" | "CIRCLE";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error?: boolean;
  required?: boolean;
}

export interface ISearch {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size: "SM" | "MD" | "BG";
}

export interface ICircleButton {
  image?: string;
  productModel: IProductModel;
  isActive: boolean;
  parentFunction: (id: string) => void;
}

export interface IExpansButton {
  nextFunction: () => void;
  children: React.ReactNode;
  icon: React.ReactNode;
  check?: boolean;
  classes: string;
}

export interface IProductModel {
  color: string;
  name: string;
  image: string;
  id: string;
}

export interface IProduct {
  product: {
    name: string;
    seller: string;
    description: string;
    productModels: IProductModel[];
  };
}

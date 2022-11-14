import UserService from "./services/user.service";
import joi from "joi";

export type UserRolesTypes = "customer" | "seller";

export type TUser = typeof UserService;

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  roles: "admin" | "seller" | "client";
  isActive: boolean;
  streetNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  region: string;
  postalCode: number;
}

export interface ICategory {
  id: string;
  name: string;
  image: string;
  Parent: ICategory;
  children: ICategory[];
}

export interface IPayment {
  id: string;
  provider: string;
  accountNumber: number;
  expiryDate: Date;
  paymentType: string;
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
}

export interface IProductRating {
  id: string;
  productId: string;
  userId: string;
  rating: number;
}

export interface IPromotion {
  id: string;
  name: string;
  description: string;
  discountRate: number;
  startDate: Date;
  endDate: Date;
}

export interface IReview {
  id: string;
  productId: string;
  userId: string;
  comments: string;
}

export interface IShoppingCart {
  id: string;
  total: number;
}

export interface IProductModel {
  id: string;
  price: number;
  sizes: string[];
  colors: string[];
  qty: number;
}

export interface IShoppingCartItem {
  id: string;
  productId: string;
  shoppingCartId: string;
  qty: number;
}

export interface ISignTokens {
  accessToken: string;
  refresToken: string;
}

export interface IMail {
  to: string[];
  subject: string;
  text: string;
  html: string;
}

export interface IChangeUserPassword {
  email: string;
  code: number;
  password: string;
}

export interface IConfirmCode {
  code: string;
  email: string;
}

export interface IWishList {
  productId: string;
  wishListId: string;
}

export type TSchemas =
  | joi.ObjectSchema<ICategory>
  | joi.ObjectSchema<IPayment>
  | joi.ObjectSchema<IProductRating>
  | joi.ObjectSchema<IProduct>
  | joi.ObjectSchema<IPromotion>
  | joi.ObjectSchema<IReview>
  | joi.ObjectSchema<IShoppingCart>
  | joi.ObjectSchema<IShoppingCartItem>
  | joi.ObjectSchema<IUser>
  | joi.ObjectSchema<{ email: string }>
  | joi.ObjectSchema<IConfirmCode>
  | joi.ObjectSchema<IChangeUserPassword>
  | joi.ObjectSchema<IWishList>
  | joi.ObjectSchema<{ id: string }>;

export type TProperty = "body" | "params";

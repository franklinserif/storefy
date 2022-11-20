import UserService from "./services/user.service";
import joi from "joi";
import { productModelFullCreateSchema } from "./schemas/ProductModelSchemas";

export type UserRolesTypes = "customer" | "seller";

export type TUser = typeof UserService;

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: "admin" | "seller" | "client";
  city: string;
  region: string;
  phoneNumber?: string;
  postalCode?: number;
  confirmCode?: number;
  isActive?: boolean;
  streetNumber?: string;
  addressLine1?: string;
  addressLine2?: string;
}

export interface ICategory {
  id: string;
  name: string;
  image: string;
  Parent: ICategory;
  children: ICategory[];
}

export interface IAddOrRemoveCategoryParent {
  parentCategoryId: string;
  childCategoryId: string;
}

export interface IPayment {
  id: string;
  provider?: string;
  accountNumber?: number;
  expiryDate?: Date;
  paymentType?: string;
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
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

export interface IVariation {
  id: string;
  name: string;
}

export interface IVariationOption {
  id: string;
  value: string;
}

export interface IVariationCreate {
  name: string;
  values: string[];
}

export interface IProductModelCreate {
  productModel: IProductModel;
  variations: IVariationCreate[];
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
  | joi.ObjectSchema<{ id: string }>
  | joi.ObjectSchema<IAddOrRemoveCategoryParent>
  | typeof productModelFullCreateSchema;

export type TProperty = "body" | "params";

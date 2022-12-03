import UserService from "./services/user.service";
import joi from "joi";

export type UserRolesTypes = "customer" | "seller";

export type TUser = typeof UserService;

interface IBaseEntity {
  id: string;
  name: string;
  qty: number;
  description: string;
  email: string;
  price: number;
  total: number;
}

export interface IUser extends Pick<IBaseEntity, "id" | "email"> {
  firstName: string;
  lastName: string;
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
  payment: IPayment;
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

export interface IPayment extends Pick<IBaseEntity, "id"> {
  provider?: string;
  accountNumber?: number;
  expiryDate?: Date;
  paymentType?: string;
}

export interface IWishList {
  productId: string;
  wishListId: string;
}

export interface IShoppingCart extends Pick<IBaseEntity, "id"> {
  total: number;
}

export interface IProduct extends Pick<IBaseEntity, "id" | "description"> {
  name: string;
  productsModels: IProduct;
  image: string[];
}

export interface IProductModel extends Pick<IBaseEntity, "id" | "qty"> {
  price: number;
  variations: IVariation[];
}

export interface IVariation extends Pick<IBaseEntity, "id" | "name"> {
  variationOptions: IVariationOption[];
}

export interface IVariationOption extends Pick<IBaseEntity, "id"> {
  value: string;
}

export interface IShoppingCartItem extends Pick<IBaseEntity, "id" | "qty"> {
  productId: string;
  shoppingCartId: string;
}

export interface IProductRating extends Pick<IBaseEntity, "id"> {
  productId: string;
  userId: string;
  rating: number;
}

export interface IReview extends Pick<IBaseEntity, "id"> {
  productId: string;
  userId: string;
  comments: string;
}

export interface ICategory extends Pick<IBaseEntity, "id" | "name"> {
  image: string;
  Parent: ICategory;
  children: ICategory[];
}

export interface IAddOrRemoveCategoryParent {
  parentCategoryId: string;
  childCategoryId: string;
}

export interface IPromotion
  extends Pick<IBaseEntity, "id" | "description" | "name"> {
  discountRate: number;
  startDate: Date;
  endDate: Date;
}

export interface IImage extends Pick<IBaseEntity, "id"> {
  imageUrl: string;
  size: number;
  file: Express.Multer.File;
}

export interface IOrder extends Pick<IBaseEntity, "id"> {
  total: number;
  user: IUser;
  OrderItem: IOrderItem[];
}

export interface IOrderItem
  extends Pick<IBaseEntity, "id" | "name" | "qty" | "total" | "price"> {}

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
  | joi.ObjectSchema<IAddOrRemoveCategoryParent>;

export type TProperty = "body" | "params";

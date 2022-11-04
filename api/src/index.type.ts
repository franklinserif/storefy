export type UserRolesTypes = "customer" | "seller";

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
  paymentType: "paypal";
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface IProductRating {
  id: string;
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
  comment: string;
}

export interface IShoppinCart {
  id: string;
}

export interface IShoppinCartItem {
  id: string;
  qty: number;
}

export interface IVariation {
  id: string;
  name: string;
}

export interface IVariationOption {
  id: string;
  value: string;
  qty: number;
}

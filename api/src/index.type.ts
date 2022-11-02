export type UserRolesTypes = "customer" | "seller";

export interface IUser {
  id: String;
  firstName: String;
  lastName: String;
  email: String;
  phoneNumber: String;
  password: String;
  roles: "admin" | "seller" | "client";
  isActive: Boolean;
  streetNumber: Number;
  addressLine1: String;
  addressLine2: String;
  city: String;
  region: String;
  postalCode: Number;
}

export interface ICategory {
  id: String;
  name: String;
  image: String;
  Parent: ICategory;
  children: ICategory[];
}

export interface IPayment {
  id: String;
  provider: String;
  accountNumber: Number;
  expiryDate: Date;
  paymentType: "paypal";
}

export interface IProduct {
  id: String;
  name: String;
  description: String;
  price: Number;
}

export interface IProductRating {
  id: String;
  rating: Number;
}

export interface IPromotion {
  id: String;
  name: String;
  description: String;
  discountRate: Number;
  startDate: Date;
  endDate: Date;
}

export interface IReview {
  id: String;
  comment: String;
}

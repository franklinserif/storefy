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

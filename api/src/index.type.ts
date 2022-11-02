export type UserRolesTypes = "customer" | "seller";

export interface IUser {
  id: string;
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

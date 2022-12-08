/// <reference types="react-scripts" />

export interface IButton {
  children: React.ReactNode;
  type: "PRIMARY" | "SECONDARY";
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

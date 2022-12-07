/// <reference types="react-scripts" />
export interface IButton {
  children: React.ReactNode;
  type: "PRIMARY" | "SECONDARY";
  size: "SM" | "MD" | "BG";
  rounded: "SM" | "MD" | "BG" | "CIRCLE";
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

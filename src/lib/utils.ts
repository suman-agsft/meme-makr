import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const safeParse = (str: any) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
};

export const getFileFromURL = (url: string): string => {
  const urlObj = new URL(url);
  return urlObj.pathname.split("/").pop() || "";
};

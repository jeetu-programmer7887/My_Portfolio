import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

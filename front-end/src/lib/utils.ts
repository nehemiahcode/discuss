import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// export const frontendBaseUrl =
//   process.env.NODE_ENV === "development"
//     ? "http://localhost:3000" 
//     : process.env.APP_BASE_URL; 

export const backendBaseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : process.env.NEXT_PUBLIC_API_ENDPOINT;


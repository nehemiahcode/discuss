export const frontendBaseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000" 
    : process.env.APP_BASE_URL; 

export const backendBaseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.BACKEND_BASE_URL;

"use client";

import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode"; // Make sure this is imported correctly

interface TokenProps {
  id: string;
  email: string;
  username: string;
}

export function useToken(storageType: "sessionStorage" | "localStorage" = "sessionStorage") {
  const [token, setToken] = useState<TokenProps | null>(null); // Allow null when no token is available

  useEffect(() => {
    const storageToken = window[storageType].getItem("token");

    if (storageToken) {
      try {
        const decodedToken: TokenProps = jwtDecode(storageToken);
        setToken(decodedToken);
        console.log(decodedToken);
      } catch (error) {
        console.error("Error decoding token:", error);
        setToken(null); // Handle invalid tokens by setting it to null
      }
    }
  }, [storageType]);

  return token;
}

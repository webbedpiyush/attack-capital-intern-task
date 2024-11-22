"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthCheckProps {
  children: React.ReactNode;
}

export function AuthCheck({ children }: AuthCheckProps) {
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }
      console.log("this is corrected token")
    } catch (error) {
      console.error("Authentication error:", error);
      const returnUrl = window.location.pathname;
      router.push(`/login?next=${encodeURIComponent(returnUrl)}`);
    }
  };

  return <>{children}</>;
}

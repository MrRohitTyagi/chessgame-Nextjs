"use client";

import { getToken } from "@/utils/cookie";
import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuthStore, userType } from "@/store/store";
import MyLoader from "./Loader/Loader";

const Authorize = ({ children }: { children: React.ReactNode }) => {
  const { setUser, isLoading } = useAuthStore();
  useEffect(() => {
    const token = getToken();
    if (token) {
      const user: userType = jwtDecode(token);
      setUser(user);
    }
  }, []);

  return <div>{isLoading ? <MyLoader /> : children}</div>;
};

export default Authorize;

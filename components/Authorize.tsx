"use client";

import { getToken } from "@/utils/cookie";
import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuthStore, userType } from "@/store/store";
import MyLoader from "./Loader/Loader";
import useSocket from "@/hooks/useSocket";

const Authorize = ({ children }: { children: React.ReactNode }) => {
  const { setUser, isLoading, tokenNotfound, user } = useAuthStore();
  console.log(`%c user `, "color: pink;border:1px solid pink", user);
  useSocket();

  useEffect(() => {
    const token = getToken();
    if (token) {
      const user: userType = jwtDecode(token);
      setUser(user);
    } else {
      tokenNotfound();
    }
  }, []);

  return <div>{isLoading ? <MyLoader /> : children}</div>;
};

export default Authorize;

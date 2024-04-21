"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Input } from "./ui/input";
import { BaseSyntheticEvent, useState } from "react";
import { useAuthStore, userType } from "@/store/store";
import { useRouter } from "next/navigation";
import { createUser } from "@/handlers/user.handler";
import { setToken } from "@/utils/cookie";
import { redirectionConfig } from "@/utils/redirection.routes";

type userresponseType = {
  response: userType;
  success: boolean;
  token: string;
};

const LoginDialogue = ({
  onClose,
  open,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  //states
  const [values, setValues] = useState<userType>({
    displayName: "",
    userName: "",
    password: "",
  });
  //hooks
  const navigate = useRouter();
  const { setUser } = useAuthStore();

  function handleChange(e: BaseSyntheticEvent, name: string) {
    setValues((prev) => {
      return {
        ...prev,
        [name]: e.target.value,
      };
    });
  }

  async function handleSubmit() {
    const response: userresponseType = await createUser(values);
    setUser(response.response);
    setToken(response.token);
    navigate.push(redirectionConfig["play-online-configure"]);
  }

  return (
    <Dialog open={open}>
      <DialogContent
        className="border-green-700
        bg-gradient-to-br from-[#05000e] to-[#032913] text-white"
      >
        <DialogHeader>
          <DialogTitle className="flex flex-row justify-between items-center">
            Login / signup
            <Button
              onClick={onClose}
              size="sm"
              variant="secondary"
              className="p-1 h-fit bg-transparent"
            >
              <X color="white" />
            </Button>
          </DialogTitle>
          <div className="space-y-3">
            <div className="text-start">
              <label htmlFor="displayName">Display name</label>
              <Input
                placeholder="Enter display name"
                className="bg-[#05000e] text-white placeholder:opacity-7 "
                id="displayName"
                value={values.displayName}
                onChange={(e) => handleChange(e, "displayName")}
              />
            </div>
            <div className="text-start">
              <label htmlFor="userName">Unique username</label>
              <Input
                placeholder="Enter username"
                className="bg-[#05000e] text-white placeholder:opacity-7 "
                id="userName"
                value={values.userName}
                onChange={(e) => handleChange(e, "userName")}
              />
            </div>
            <div className="text-start">
              <label htmlFor="password">Password</label>
              <Input
                placeholder="Enter password"
                className="bg-[#05000e] text-white placeholder:opacity-7 "
                id="password"
                value={values.password}
                onChange={(e) => handleChange(e, "password")}
              />
            </div>
          </div>

          <Button
            disabled={!(!!values.password && !!values.userName)}
            onClick={handleSubmit}
            size="sm"
            variant="secondary"
            className="self-end"
          >
            <h2>Continue</h2>
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialogue;

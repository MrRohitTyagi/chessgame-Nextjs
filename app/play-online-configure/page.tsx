"use client";
import Image from "next/image";

import boardimage from "@/assets/board image.png";
import { Button } from "@/components/ui/button";
import Chessicon from "@/assets/Chessicon";
import compicon from "@/assets/computer.png";
import { useAuthStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoginDialogue from "@/components/LoginDialogue";
import { redirectionConfig } from "@/utils/redirection.routes";
import {
  Dices,
  DicesIcon,
  GitBranchPlus,
  Merge,
  MergeIcon,
} from "lucide-react";

function PlayOnline() {
  const { user } = useAuthStore();
  const navigate = useRouter();

  return (
    <div className="flex flex-col-reverse  gap-6 sm:flex-row">
      <Image
        src={boardimage}
        alt="Board Image"
        height={300}
        className="lg:w-[500px]"
      />
      <div className="controllsborder rounded items-center flex flex-col space-y-4">
        <h1 className="text-3xl text-center sm:text-4xl">
          Play Chess Online !
        </h1>
        <Button className="w-60 space-x-2 h-16 shadow-green">
          <DicesIcon />
          <h1 className="text-sm"> Play Random</h1>
        </Button>

        <Button className="w-60 space-x-2 h-16 shadow-green">
          <MergeIcon />
          <h1 className="text-sm"> Join Room</h1>
        </Button>

        <Button className="w-60 space-x-2 h-16 shadow-green">
          <GitBranchPlus />
          <h1 className="text-sm"> Create Room</h1>
        </Button>
      </div>
    </div>
  );
}

export default PlayOnline;

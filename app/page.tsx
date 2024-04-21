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

function Home() {
  const { user } = useAuthStore();
  const navigate = useRouter();

  const [openLoginPrompt, setopenLoginPrompt] = useState(false);

  function handlePlayOnline() {
    if (user?.pk) {
      navigate.push(redirectionConfig["play-online-configure"]);
    } else {
      setopenLoginPrompt(true);
    }
  }

  return (
    <>
      {openLoginPrompt && (
        <LoginDialogue
          open={openLoginPrompt}
          onClose={() => setopenLoginPrompt(false)}
        />
      )}
      <div className="flex flex-col-reverse  gap-6 sm:flex-row">
        <Image
          src={boardimage}
          alt="Board Image"
          height={300}
          className="lg:w-[500px]"
        />
        <div className="controllsborder rounded items-center flex flex-col space-y-4">
          <Button
            className="w-60 space-x-2 h-16 shadow-green"
            onClick={handlePlayOnline}
          >
            <Chessicon />
            <h1 className="text-sm"> Play online</h1>
          </Button>
          <Button className="w-60 space-x-2 h-16 shadow-green">
            <Image alt="Bot" src={compicon} height={27} />{" "}
            <h2 className="text-sm"> Play With Computer</h2>
          </Button>
        </div>
      </div>
    </>
  );
}

export default Home;

"use client";
import Image from "next/image";

import boardimage from "@/assets/board image.png";
import { Button } from "@/components/ui/button";
import { useAuthStore, userType } from "@/store/store";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DicesIcon, GitBranchPlus, MergeIcon, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { updateUser } from "@/handlers/user.handler";
import MyLoader from "@/components/Loader/Loader";
import useSocket from "@/hooks/useSocket";
import FakeSearching from "@/components/FakeSearching";
import PlayerCard from "@/components/PlayerCard";
import { redirectionConfig } from "@/utils/redirection.routes";

type playTypeTypes = "JOIN-ROOM" | "CREATE-ROOM" | "jOIN-RANDOM" | null;
const headings = {
  "jOIN-RANDOM": "Searching for players...",
  "JOIN-ROOM": "Join a room",
  "CREATE-ROOM": "Create a room",
};

function PlayOnline() {
  const { user } = useAuthStore();
  const navigate = useRouter();

  const [playType, setplayType] = useState<playTypeTypes>(null);

  const handlePlayRandom = () => setplayType("jOIN-RANDOM");

  const handleJoinRoom = () => setplayType("JOIN-ROOM");

  const handleCreateRoom = () => setplayType("CREATE-ROOM");

  const closeLayer = () => setplayType(null);

  return (
    <>
      {playType && (
        <Dialog open={!!playType}>
          <DialogContent
            className="border-green-700
                       bg-gradient-to-br from-[#05000e] to-[#032913] text-white"
          >
            <DialogHeader className="flex flex-row justify-between items-center border-b-2">
              <h2 className="text-xl">{headings[playType]}</h2>
              <Button
                onClick={closeLayer}
                size="sm"
                variant="secondary"
                className="p-1 h-fit bg-transparent"
              >
                <X color="white" />
              </Button>
            </DialogHeader>
            <RenderDialogues playType={playType} setplayType={setplayType} />
          </DialogContent>
        </Dialog>
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
            onClick={handlePlayRandom}
            className="w-60 space-x-2 h-16 shadow-green"
          >
            <DicesIcon />
            <h1 className="text-sm"> Play Random</h1>
          </Button>

          <Button
            onClick={handleJoinRoom}
            className="w-60 space-x-2 h-16 shadow-green"
          >
            <MergeIcon />
            <h1 className="text-sm"> Join Room </h1>
          </Button>

          <Button
            onClick={handleCreateRoom}
            className="w-60 space-x-2 h-16 shadow-green"
          >
            <GitBranchPlus />
            <h1 className="text-sm"> Create Room</h1>
          </Button>
        </div>
      </div>
    </>
  );
}

const RenderDialogues = ({
  setplayType,
  playType,
}: {
  setplayType: Dispatch<SetStateAction<playTypeTypes>>;
  playType: playTypeTypes;
}) => {
  switch (playType) {
    case "CREATE-ROOM":
      return <CreateRoom />;
    case "JOIN-ROOM":
      return <JoinRoom />;
    case "jOIN-RANDOM":
      return <PlayWithRandom />;

    default:
      return null;
  }
};
const JoinRoom = () => "Under development";
const CreateRoom = () => "Under development";

const PlayWithRandom = () => {
  const { user } = useAuthStore();
  const { socket } = useSocket();
  const router = useRouter();

  const [foundPlayer, setfoundPlayer] = useState<userType>({});

  useEffect(() => {
    (function () {
      updateUser({ ...user, isSearching: true });
    })();

    socket.emit("FIND_RANDOM_SEARCHING_PLAYERS", { user_pk: user?.pk });

    window.addEventListener("beforeunload", async function (e) {
      await updateUser({ ...user, isSearching: false });
    });

    return () => {
      updateUser({ ...user, isSearching: false });
    };
  }, []);

  useEffect(() => {
    const handlePlayersSearching = (foundUser: userType) => {
      if (foundUser?.pk) {
        setfoundPlayer(foundUser);

        setTimeout(() => {
          const unique_id =
            (foundUser.pk || 1) > (user?.pk || 1) ? foundUser.pk : user?.pk;

          router.push(
            `${
              redirectionConfig["play-with-random"]
            }?room_id=${unique_id}&orientation=${
              unique_id === user?.pk ? "white" : "black"
            }&other=${foundUser.pk}&me=${user?.pk}`
          );
        }, 2000);
      } else {
        setTimeout(() => {
          socket.emit("FIND_RANDOM_SEARCHING_PLAYERS", { user_pk: user?.pk });
        }, 1000);
      }
    };

    socket.on("PLAYERS_SEARCHING_FOR_GAME", handlePlayersSearching);
    return () => {
      socket.off("PLAYERS_SEARCHING_FOR_GAME", handlePlayersSearching);
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {foundPlayer.pk ? (
        <div className="flex flex-col gap-4 items-center">
          <h3 className="text-2xl">{`Match found !`}</h3>
          <h4 className="text-wrap">{`Your are playing against ${foundPlayer.displayName?.slice(
            0,
            20
          )}`}</h4>
          <PlayerCard
            name={foundPlayer.displayName || ""}
            pic={
              foundPlayer.picture ||
              "https://res-console.cloudinary.com/derplm8c6/media_explorer_thumbnails/3d2ebe856e25a61a68b519ac4daf2cdc/detailed"
            }
          />
          <h3 className="text-2xl">joining Room..</h3>
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center justify-center">
          <FakeSearching />
          <MyLoader />
        </div>
      )}
    </div>
  );
};

export default PlayOnline;

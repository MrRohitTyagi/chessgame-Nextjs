"use client";

import React, { useEffect, useMemo, useState } from "react";
// import Chessboard from "chessboardjsx";
import { Chess } from "chess.js";
import { boardStyles } from "@/utils/board.utils";
import { useSearchParams } from "next/navigation";
import useSocket from "@/hooks/useSocket";
import dynamic from "next/dynamic";
const Chessboard = dynamic(() => import("chessboardjsx"), { ssr: false });

type orientationType = "white" | "black" | undefined;

const ChessboardComponent = () => {
  const [fen, setFen] = useState<string>("start");

  const params = useSearchParams();
  const game = useMemo(() => new Chess(), []);
  const { socket } = useSocket();

  const room_id = params.get("room_id");
  const me = params.get("me");
  const other = params.get("other");
  const orientation: orientationType = params.get(
    "orientation"
  ) as orientationType;

  const [turn, setturn] = useState(room_id);

  useEffect(() => {
    socket.emit("JOIN_ROOM", room_id);
  }, []);

  useEffect(() => {
    try {
      socket.on("OPPONENT_PLAYED", ({ nextturn, from, to }) => {
        game.move({ from, to });
        const fenString = game.fen();
        setFen(fenString);
        setturn(nextturn);
      });
    } catch (error) {
      console.log(`%c error `, "color: red;border:2px dotted red", error);
    }
  }, []);

  const onDrop = ({ sourceSquare = "", targetSquare = "" }) => {
    try {
      const move = game.move({ from: sourceSquare, to: targetSquare });

      if (move === null) return;
      const fenString = game.fen();
      setturn(other);

      socket.emit("MOVE_PLAYED", {
        room_id,
        nextturn: other,
        from: sourceSquare,
        to: targetSquare,
      });

      setFen(fenString);
    } catch (error) {
      console.log(`%c error `, "color: red;border:2px dotted red", error);
    }
  };

  const isMyTurn = turn === me;

  const allowDrag = ({ piece = "" }) => {
    return isMyTurn && piece.charAt(0) === orientation?.charAt(0);
  };

  return (
    <div className="gap-3 flex flex-col">
      <h2 className="text-center text-2xl">
        {isMyTurn ? "Your Turn" : `Opponent's Turn`}
      </h2>
      <Chessboard
        orientation={orientation}
        position={fen}
        onDrop={onDrop}
        {...boardStyles}
        allowDrag={allowDrag}
        calcWidth={({ screenWidth }) => (screenWidth < 500 ? 350 : 480)}
      />
      <h2 className="text-center text-2xl text-wrap">
        Do not refresh the page else progress will be lost
      </h2>
    </div>
  );
};

export default ChessboardComponent;

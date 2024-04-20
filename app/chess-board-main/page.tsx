"use client";
import React, { useMemo, useRef, useState } from "react";
import Chessboard from "chessboardjsx";
import { Chess } from "chess.js";

const ChessboardComponent = () => {
  const [fen, setFen] = useState<string>("start");
  const game = useMemo(() => new Chess(), []);
  const turn = useRef<"w" | "b">("w");

  function toggleTurn() {
    turn.current = turn.current === "w" ? "b" : "w";
  }

  const onDrop = ({ sourceSquare = "", targetSquare = "" }) => {
    try {
      const move = game.move({ from: sourceSquare, to: targetSquare });
      console.log("move", {
        move,
        fen: game.fen(),
        targetSquare,
        sourceSquare,
      });

      if (move === null) return;

      toggleTurn();
      setFen(game.fen());
    } catch (error) {
      console.log(`%c error `, "color: red;border:2px dotted red", error);
    }
  };

  function allowDrag({ piece = "" }) {
    return piece.charAt(0) === turn.current;
  }

  return (
    <Chessboard
      position={fen}
      onDrop={onDrop}
      // draggable={false}
      darkSquareStyle={{ backgroundColor: "#431c01", borderRadius: "5px" }}
      lightSquareStyle={{ backgroundColor: "#bea25f", borderRadius: "5px" }}
      allowDrag={allowDrag}
    />
  );
};

export default ChessboardComponent;

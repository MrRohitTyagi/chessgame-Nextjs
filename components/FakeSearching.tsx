"use client";

import React, { useEffect, useState } from "react";
import { fakePlayers } from "@/constants/fakePlayers";
import PlayerCard from "./PlayerCard";

type fakePersiontype = { name: string; pic: string };

const FakeSearching = () => {
  const [player, setplayer] = useState<fakePersiontype>({
    name: "",
    pic: "",
  });

  useEffect(() => {
    let index = 0;

    const processPerson = () => {
      if (index === fakePlayers.length - 2) index = 0;

      if (index < fakePlayers.length) {
        const person: fakePersiontype = fakePlayers[index];
        setplayer(person);
        index++;
        setTimeout(processPerson, 600);
      }
    };
    processPerson();
  }, []);

  return (
    <div className="" key={player.name}>
      <PlayerCard name={player.name} pic={player.pic} />
    </div>
  );
};

export default FakeSearching;

"use client";

import React from "react";
import { motion } from "framer-motion";

const PlayerCard = ({ name = "", pic }: { name: string; pic: any }) => {
  return (
    <div
      className="flex flex-row gap-4 items-center
 !border-white !rounded-lg bg-slate-500 px-4 py-2"
    >
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring" }}
        className="h-10 w-10 rounded-full"
        alt="img"
        src={pic}
      />
      <motion.h4
        className="w-40 text-ellipsis"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "spring" }}
      >
        {name.slice(0, 20)}
      </motion.h4>
    </div>
  );
};

export default PlayerCard;

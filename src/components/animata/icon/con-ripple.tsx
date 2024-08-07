"use client";

import { Disc3 } from "lucide-react";

import * as React from "react";

import { motion, useTime, useTransform } from "framer-motion";

export default function IconRipple({
  children,
}: {
  children: React.ReactNode;
}) {
  const time = useTime();
  const rotate = useTransform(time, [0, 2000], [0, 360], { clamp: false });

  return (
    <div className="grid grid-cols-1 justify-items-center p-4">
      <motion.div style={{ rotate }}>{children}</motion.div>
    </div>
  );
}

IconRipple.defaultProps = {
  children: (
    <div className="rounded-xl bg-yellow-400">
      <div className="grid justify-evenly">
        <Disc3 size={30} stroke="black" strokeWidth={2} />
      </div>
    </div>
  ),
};

import { cn } from "@/lib/cn";
import React from "react";

const Skeleton = ({ className }: { className: string }) => {
  return (
    <div
      className={cn(
        "rounded-md",
        "bg-amlost-white/10",
        "animate-pulse",
        className
      )}
    ></div>
  );
};

export default Skeleton;

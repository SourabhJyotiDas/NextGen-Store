import React from "react";
import CircularText from "@/lib/CircularText";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <CircularText
        text="NEXTGEN*STORE*"
        onHover="speedUp"
        spinDuration={20}
        className="animate-spin-slow"
      />
    </div>
  );
}

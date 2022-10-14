import React from "react";
import CardJadwal from "./Cards/CardJadwal.js";

// components

import CardProfile from "./Cards/CardProfile.js";

export default function Jadwal() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardJadwal />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div>
      </div>
    </>
  );
}

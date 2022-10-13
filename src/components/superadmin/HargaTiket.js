import React from "react";

// components

import CardHargaTiket from "./Cards/CardHargaTiket.js";
import CardProfile from "./Cards/CardProfile.js";

export default function HargaTiket() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardHargaTiket />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div>
      </div>
    </>
  );
}

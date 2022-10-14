import React from "react";

// components

import CardDataSanggahan from "./Cards/CardDataSanggahan.js";

export default function Tables() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardDataSanggahan />
        </div>
      </div>
    </>
  );
}

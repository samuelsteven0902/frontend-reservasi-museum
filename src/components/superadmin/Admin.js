import React from "react";

// components

import CardAdmin from "./Cards/CardAdmin.js";

export default function Admin() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardAdmin />
        </div>
      </div>
    </>
  );
}

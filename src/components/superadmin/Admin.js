import React from "react";
import DefaultFooterAdmin from "components/DefaultFooterAdmin.js";

// components

import CardAdmin from "./Cards/CardAdmin.js";

export default function Admin() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <CardAdmin />
        </div>
      </div>
          <DefaultFooterAdmin/>
    </>
  );
}

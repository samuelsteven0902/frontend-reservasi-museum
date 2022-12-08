import React from "react";
import DefaultFooterAdmin from "components/DefaultFooterAdmin.js";

// components

import InfoPanduan from "./Cards/Info/InfoPanduan.js";

export default function Panduan() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <InfoPanduan />
        </div>
      </div>
          <DefaultFooterAdmin/>
    </>
  );
}

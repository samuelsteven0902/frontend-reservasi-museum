import React from "react";
import DefaultFooterAdmin from "components/DefaultFooterAdmin.js";

// components

import InfoPanduan from "./Cards/Info/InfoPanduan.js";
import TextPanduan from "./Cards/Info/TextPanduan.js";

export default function Panduan() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <TextPanduan />
          <InfoPanduan />
        </div>
      </div>
          <DefaultFooterAdmin/>
    </>
  );
}

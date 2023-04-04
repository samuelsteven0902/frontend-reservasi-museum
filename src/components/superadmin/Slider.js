import React from "react";
import DefaultFooterAdmin from "components/DefaultFooterAdmin.js";

// components

import CardSlider from "./Cards/CardSlider";

export default function Slider() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <CardSlider/>
        </div>
      </div>
          {/* <DefaultFooterAdmin/> */}
    </>
  );
}

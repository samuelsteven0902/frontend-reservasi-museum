import React from "react";
import DefaultFooterAdmin from "components/DefaultFooterAdmin.js";
import InfoAbout from "./Cards/Info/InfoAbout";

export default function About() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <InfoAbout />
        </div>
      </div>
          <DefaultFooterAdmin/>
    </>
  );
}

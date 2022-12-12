import React from "react";
import InfoFAQ from "./Cards/Info/InfoFAQ.js";
import DefaultFooterAdmin from "components/DefaultFooterAdmin.js";

export default function FAQ() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <InfoFAQ />
        </div>
      </div>
          <DefaultFooterAdmin/>
    </>
  );
}

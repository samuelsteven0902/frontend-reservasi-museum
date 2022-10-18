import React from "react";

// components

import InfoFAQ from "./Cards/Info/InfoFAQ.js";

export default function FAQ() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <InfoFAQ />
        </div>
      </div>
    </>
  );
}

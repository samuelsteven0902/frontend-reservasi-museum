import React from "react";

// components

import CardLineChart from "./Cards/CardLineChart.js";

export default function Home() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>

      </div>
    </>
  );
}

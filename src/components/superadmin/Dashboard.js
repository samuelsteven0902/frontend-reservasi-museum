import React from "react";

// components

import CardLineChart from "./Cards/CardLineChart.js";
import HeaderStats from "./Headers/HeaderStats.js";

export default function Home() {
  return (
    <>
    <HeaderStats />
    <div className="px-4 md:px-10 mx-auto w-full -m-20">
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div> 
      </div>
    </div>
    </>
  );
}
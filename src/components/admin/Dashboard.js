import DefaultFooterAdmin from "components/DefaultFooterAdmin.js";
import React from "react";

// components

import CardLineChart from "./Cards/CardLineChart.js";
import HeaderStats from "./Headers/HeaderStats.js";

export default function Home() {
  return (
    <>
    <div className="px-4 md:px-10 mx-auto w-full -m-20">
        <HeaderStats />
      <div className="flex flex-wrap">
        <div className="w-full mb-10 xl:mb-0 px-4">
          <CardLineChart />
        </div> 
      </div>
      <DefaultFooterAdmin />
    </div>
    </>
  );
}
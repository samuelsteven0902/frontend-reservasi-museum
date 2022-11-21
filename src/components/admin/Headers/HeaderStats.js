import React from "react";

// components

import CardStats from "../Cards/CardStats.js";

export default function HeaderStats() {
  return (
    <>
      {/* Header */}
      <div className="relative md:pt-10 pb-10 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-2">
                <CardStats
                  statSubtitle="Total Pengunjung Bulan Lalu"
                  statTitle="3500"
                  statArrow="up"
                  statPercent="2.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Bulan Lusa"
                  statIconName="fas fa-solid fa-user"
                  statIconColor="bg-[#A70B0B]"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-2">
                <CardStats
                  statSubtitle="Total Pengunjung Bulan Ini"
                  statTitle="2240"
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Bulan Kemarin"
                  statIconName="fas fa-solid fa-user"
                  statIconColor="bg-[#A70B0B]"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-2">
                <CardStats
                  statSubtitle="Total Pengunjung Kemarin"
                  statTitle="920"
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-red-500"
                  statDescripiron="Kemarin Lusa"
                  statIconName="fas fa-solid fa-user"
                  statIconColor="bg-[#A70B0B]"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-2">
                <CardStats
                  statSubtitle="Total Pengunjung Hari Ini"
                  statTitle="490"
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Kemarin"
                  statIconName="fas fa-solid fa-user"
                  statIconColor="bg-[#A70B0B]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

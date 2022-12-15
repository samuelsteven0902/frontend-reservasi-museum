import DefaultFooterAdmin from "components/DefaultFooterAdmin.js";
import React from "react";

// components

import CardGrafikPendapatan from "./Cards/CardGrafikPendapatan";
import HeaderStatsPembayaran from "./Headers/HeaderStatsPembayaran";

export default function Home() {
  return (
    <>
    <div className="px-4 md:px-10 mx-auto w-full -m-20">
        <HeaderStatsPembayaran />
      <div className="flex flex-wrap">
        <div className="w-full mb-10 xl:mb-0 px-4">
          <CardGrafikPendapatan />
        </div> 
      </div>
    </div>
        <DefaultFooterAdmin />
    </>
  );
}
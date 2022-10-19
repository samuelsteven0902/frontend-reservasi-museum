import axios from "axios";
import React, { useEffect, useState } from "react";

// components

import CardMasterTiket from "./Cards/CardMasterTiket.js";
// import CardProfile from "./Cards/CardProfile.js";

export default function MasterTiket() {





  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full  px-4">
          <CardMasterTiket  />  
        </div>
        {/* <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div> */}
      </div>
    </>
  );
}

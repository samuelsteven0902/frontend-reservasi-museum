import axios from "axios";
import React, { useEffect, useState } from "react";
import DefaultFooterAdmin from "components/DefaultFooterAdmin.js";

// components

import CardMasterTiket from "./Cards/CardMasterTiket.js";
// import CardProfile from "./Cards/CardProfile.js";

export default function MasterTiket() {

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <CardMasterTiket />  
        </div>
      </div>
        <DefaultFooterAdmin />
    </>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import DefaultFooterAdmin from "components/DefaultFooterAdmin.js";

// components

import CardMasterTiketcopy from "./Cards/CardMasterTiketcopy.js";
// import CardProfile from "./Cards/CardProfile.js";

export default function MasterTiket() {

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <CardMasterTiketcopy />  
        </div>
      </div>
        <DefaultFooterAdmin />
    </>
  );
}

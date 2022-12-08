import axios from "axios";
import React, { useEffect, useState } from "react";
import CardTambahMuseum from "./Cards/CardTambahMuseum.js";
import DefaultFooterAdmin from "components/DefaultFooterAdmin.js";

function MasterTiket() {

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <CardTambahMuseum />  
        </div>
      </div>
          <DefaultFooterAdmin/>
    </>
  );
}

export default MasterTiket
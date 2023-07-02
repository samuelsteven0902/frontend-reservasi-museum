import axios from "axios";
import React, { useEffect, useState } from "react";
import DefaultFooterAdmin from "components/DefaultFooterAdmin.js";
import CardTambahKategori from "./Cards/CardTambahKategori.js";

function MasterKategori() {

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <CardTambahKategori />  
        </div>
      </div>
          <DefaultFooterAdmin/>
    </>
  );
}

export default MasterKategori
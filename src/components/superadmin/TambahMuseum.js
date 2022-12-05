import axios from "axios";
import React, { useEffect, useState } from "react";

// components

import CardTambahMuseum from "./Cards/CardTambahMuseum.js";

export default function MasterTiket() {





  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full  px-4">
          <CardTambahMuseum  />  
        </div>
      </div>
    </>
  );
}

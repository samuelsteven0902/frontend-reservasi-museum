// import axios from "axios"; 
// import React, { useEffect, useState} from "react";
import DefaultFooterAdmin from "components/DefaultFooterAdmin.js";
import CardMasterTiketcopy from "./Cards/CardMasterTiketcopy.js";

export default function MasterTiket(){

  return ( 
    <>
    <div className="flex flex-wrap">
      <div className="w-full px-4">
        <CardMasterTiketcopy/>  
      </div>
    </div>
        <DefaultFooterAdmin/>
    </> 
  ); 
} 

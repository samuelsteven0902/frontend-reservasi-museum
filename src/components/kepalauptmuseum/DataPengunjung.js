import axios from 'axios'
import CardTable from './Cards/CardDataSanggahan'
import React, { useEffect, useState } from 'react'
import DefaultFooterAdmin from "components/DefaultFooterAdmin.js";

function DataPengunjung() {

  return (
    <>
    {/* <div className="px-4 md:px-10 mx-auto w-full -m-20"> */}
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <CardTable />
        </div>
      </div>
    {/* </div> */}
      <DefaultFooterAdmin/>
    </>
  )
}

export default DataPengunjung
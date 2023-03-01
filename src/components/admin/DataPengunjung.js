import axios from 'axios'
import CardTable from './Cards/CardDataSanggahan'
import CardDataPengunjung from './Cards/CardDataPengunjung'
import React, { useEffect, useState, Component } from 'react'
import DefaultFooterAdmin from "components/DefaultFooterAdmin.js";
// import 'bootstrap/dist/css/bootstrap.min.css';

const $ = require('jquery')
$.DataTable = require('datatables.net')

function DataPengunjung() {

  $(`#datatable`).DataTable()

  return (
    <>
    {/* <div className="px-4 md:px-10 mx-auto w-full -m-20"> */}
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          {/* <CardTable /> */}
          <CardDataPengunjung/>
        </div>
      </div>
    {/* </div> */}
      <DefaultFooterAdmin/>
    </>
  )
}

export default DataPengunjung
// import axios from 'axios'
import CardDataPengunjung from './Cards/CardDataPengunjung';
// import CardDataPengunjung from './Cards/CardDataPengunjung'
// import CardDataaaa from './Cards/CardDataaaa'
import DefaultFooterAdmin from "components/DefaultFooterAdmin.js";

// const $ = require('jquery')
// $.DataTable = require('datatables.net')

function DataPengunjung() {

  // $(`#datatable`).DataTable()

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <CardDataPengunjung/>
          {/* <CardDataPengunjung/> */}
          {/* <CardDataaaa/> */}
        </div>
      </div>
      <DefaultFooterAdmin/>
    </>
  )
}

export default DataPengunjung
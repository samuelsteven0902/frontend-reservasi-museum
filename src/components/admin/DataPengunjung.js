// import axios from 'axios'
// import CardTable from './Cards/CardDataSanggahan'
// import CardDataPengunjung from './Cards/CardDataPengunjung'
// import CardDataSanggahan from './Cards/CardDataSanggahan'
import CardDataaaa from './Cards/CardDataaaa'
import DefaultFooterAdmin from "components/DefaultFooterAdmin.js";

// const $ = require('jquery')
// $.DataTable = require('datatables.net')

function DataPengunjung() {

  // $(`#datatable`).DataTable()

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          {/* <CardTable /> */}
          {/* <CardDataPengunjung/> */}
          {/* <CardDataSanggahan/> */}
          <CardDataaaa/>
        </div>
      </div>
      <DefaultFooterAdmin/>
    </>
  )
}

export default DataPengunjung
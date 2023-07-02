import CardDataPengunjung from './Cards/CardDataPengunjung';
import DefaultFooterAdmin from "components/DefaultFooterAdmin.js";
function DataPengunjung(){
  return (
    <>
    <div className="flex flex-wrap">
      <div className="w-full px-4">
        <CardDataPengunjung/>
      </div>
    </div>
      <DefaultFooterAdmin/>
    </>
  )
}

export default DataPengunjung
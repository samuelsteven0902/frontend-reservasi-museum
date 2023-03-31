import React, { useEffect, useState, } from "react";
// import PropTypes from "prop-types";
import ReactLoading from 'react-loading';
import { GrFormView } from 'react-icons/gr';

// components
// import TableDropdown from "../Dropdowns/TableDropdown.js";
import axios from "axios";
import excel from "../../../assets/img/admin/excel.png"
// import $ from 'jquery'; 
import { useHistory } from 'react-router-dom';
// import DataTable from 'datatables.net';
// import DataTable from 'datatables.net';
// import { Dataset } from "@mui/icons-material";

export default function CardTable({ color }) {
  const [loading,setLoading] = useState(true)
  const [pengunjung,setPengunjung] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const history = useHistory()

  const handleDownload = () => {
    axios({
      url: 'http://localhost:8000/api/pengunjungExport',
      method: 'GET',
      responseType: 'blob', // important`
    }).then((response) => {
      console.log(response);
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  
  const tanggal = new Date(Date.now()).toLocaleString().split(',')[0];

  let filename = 'file-' + tanggal + '.xlsx';
  link.setAttribute('download', filename); //or any other extension
  document.body.appendChild(link);
  link.click();
});
}

const handleTiket = (e) =>{
  history.push("/tiket/" + e );
}

  useEffect(() => {
    axios.get(`http://localhost:8000/api/pengunjung`).then(res=>{
    console.log(res);  
    if(res.status === 200)
      {
        setPengunjung(res.data.pengunjung)
        setLoading(false);
      }
  });
}, [])


  if(loading)
  {
    var pengunjung_HTMLTABLE =   
    <tr className="bg-white border-b" >
      <td colspan={8} className="text-xl text-center justify-center font-semibold py-5">
        <ReactLoading type={"spin"} color={"red"} height={'5%'} width={'5%'} className="m-auto" />
      </td>
    </tr>
  }
  else
  {
    // var pengunjung_HTMLTABLE = "";
    // eslint-disable-next-line array-callback-return
    pengunjung_HTMLTABLE = pengunjung.filter(val => {
      if(searchTerm === "")
      {
        return val
      }
      else if(val.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.museum.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.kategori.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.kota.toLowerCase().includes(searchTerm.toLowerCase()) )
      {
        return val
      }
    }).map((item,index)=>{
      console.log(typeof item.harga_awal  );
      return(
        <tr key={index} className="text-black">
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.nama }</td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.museum}</td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.kategori}</td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.phone}</td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.kota}</td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.negara == null?"Indonesia":item.negara}</td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.jumlah}</td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.harga_awal}</td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.pembayaran}</td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.status === "Lunas" ? "Lunas" : "Belum Lunas"}</td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.tanggal_pembayaran}</td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.kehadiran === "Hadir" ? "Hadir" : "Tidak Hadir"}</td>
          <td className="sticky right-0 bg-white  w-full m-auto border-b flex py-3 justify-center">
            <button className="bg-gray-500 hover:bg-gray-600 rounded shadow-inner drop-shadow-2xl  py-0.5 px-1" onClick={e=>handleTiket(item.kode_tiket,e)}>
            <GrFormView className=""/>
            </button>
          </td>
        </tr>
      )
    })
  }


  return (
    <>
    <div className="flex">
      <div className="my-2  w-72">
        <input type='text' className="w-full font-nunito border-none ring-2 ring-red-300 focus:border-none focus:ring-red-500 focus:ring-2 active:border-none rounded-lg"  placeholder="Cari nama, kategori, kota,..." onChange={e=>{setSearchTerm(e.target.value)}} /> 
      </div>
      <div className=" flex justify-end items-center w-full">
        <button className="bg-green-400 rounded-xl h-7 px-5 text-sm font-nunito text-green-800" onClick={handleDownload}><p className="flex">Unduh Laporan <img src={excel} className='w-4 ml-2' alt="excel" /></p></button>
      </div>
    </div>

    <div
      className={
        "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded" +
        (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }>
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className="font-semibold text-lg font-merriweather text-red-600" 
                >Data Pengunjung
              </h3>
            </div>
          </div>
        </div>

        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table  className="display items-center w-full bg-transparent border-collapse">
            <thead>
              <tr className='bg-red-600 text-red-200'>
                <th
                  className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left ">Nama
                </th>
                <th
                  className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left ">
                  Museum
                </th>
                <th
                  className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left ">
                  Kategori
                </th>
                <th
                  className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left ">
                  Nomor Hp
                </th>
                <th
                  className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left ">
                  Asal Kota
                </th>
                <th
                  className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left ">
                  Asal Negara
                </th>
                <th
                  className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left ">
                  Jumlah Pengunjung
                </th>
                <th
                  className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left ">
                  Total Pembelian Tiket
                </th>
                <th
                  className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left ">
                  Pembayaran
                </th>
                <th
                  className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left ">
                  Status
                </th>
                <th
                  className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left ">
                  Kehadiran
                </th>
                <th
                  className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left ">
                  Tanggal Pembayaran
                </th>
                <th
                  className="sticky right-0 bg-white text-red-700 px-2">
                  Tiket
                </th>
              </tr>
            </thead>
            <tbody>
              {pengunjung_HTMLTABLE}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// CardDataSanggahan.defaultProps = {
//   color: "light",
// };

// CardDataSanggahan.propTypes = {
//   color: PropTypes.oneOf(["light", "dark"]),
// };

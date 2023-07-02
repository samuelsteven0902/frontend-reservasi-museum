import React, { useEffect, useState, } from "react";
import ReactLoading from 'react-loading';
import { GrFormView } from 'react-icons/gr';
import PaginationDataPengunjung from './PaginationDataPengunjung';

// components
import axios from "axios";
import excel from "../../../assets/img/admin/excel.png"
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function CardDataPengunjung ({ color }) {

//loading
const [loading,setLoading] = useState(true)
const [pengunjung,setPengunjung] = useState([])
//for search bar
const [searchTerm, setSearchTerm] = useState("")
const [namaMuseum, setNamaMuseum] = useState('');
const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');


const history = useHistory()

//export excel
const handleDownload = () => {
  const queryParams = new URLSearchParams();
  if (namaMuseum) {
    queryParams.append('nama_museum', namaMuseum);
  }
  if (startDate) {
    queryParams.append('start_date', startDate);
  }
  if (endDate) {
    queryParams.append('end_date', endDate);
  }

  const url = `${process.env.REACT_APP_API_ENDPOINT}/api/pengunjungExport?${queryParams.toString()}`;

  axios({
    url,
    method: 'GET',
    responseType: 'blob',
  }).then((response) => {
    console.log(response);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    const tanggal = new Date(Date.now()).toLocaleString().split(',')[0];
    let filename = 'file-' + tanggal + '.xlsx';
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
  }).catch(error => {
    console.error('Error exporting pengunjung:', error);
  });
};


//go page tiket
const handleTiket = (e) =>{
  history.push("/tiket/" + e );
}

useEffect(() => {
  //axios perlu header authorization karena API di backend mengharuskan untuk login
  axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/pengunjung`, {
    headers : {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: `Bearer ${Cookies.get('token')}`,
    }}).then(res=>{
    console.log(res);  
    if(res.status === 200) {
        setPengunjung(res.data.pengunjung)
        setLoading(false);
      }
  });
}, [])


if(loading) {
  var pengunjung_HTMLTABLE =   
    <tr className="bg-white border-b">
      <td colspan={8} className="text-xl text-center justify-center font-semibold py-5">
        <ReactLoading type={"spin"} color={"red"} height={'5%'} width={'5%'} className="m-auto" />
      </td>
    </tr>
  }
else {
  pengunjung_HTMLTABLE = <PaginationDataPengunjung data={pengunjung} searchTerm={searchTerm} handleTiket={handleTiket}/>
}

  return (
    <>
    <div className="flex">
      {/* search bar */}
      <div className="my-2 w-80 px-6">
        <input type='text' className="w-full font-nunito border-none ring-2 ring-red-300 focus:border-none focus:ring-red-500 focus:ring-2 active:border-none rounded-lg"  placeholder="Cari nama, kategori, kota,..." onChange={e=>{setSearchTerm(e.target.value)}} /> 
      </div>
      {/* export excel  */}
      <div className=" flex justify-end items-center w-full px-6">
        <button className="bg-green-400 rounded-xl h-7 px-5 text-sm font-nunito text-green-800" onClick={handleDownload}><p className="flex">Unduh Laporan<img src={excel} className='w-4 ml-2' alt="excel"/></p></button>
      </div>
    </div>

    {/* header */}
    <div className=
      {"relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded" + (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")}>
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-lg font-merriweather text-red-600">Data Pengunjung</h3>
            </div>
          </div>
          <div className="text-black">
            <h3>Export Data Pengunjung</h3>
            <div>
              <label>Nama Museum:</label>
              <input
                type="text"
                value={namaMuseum}
                onChange={e => setNamaMuseum(e.target.value)}
              />
            </div>
            <div>
              <label>Tanggal Mulai:</label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label>Tanggal Akhir:</label>
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
              />
            </div>
            <button className="" onClick={handleDownload}>Export</button>
          </div>
        </div>

        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table  className="display items-center w-full bg-transparent border-collapse">
            <thead>
              <tr className='bg-red-600 text-white'>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left">Kode Tiket</th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left">Nama</th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left">Museum</th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left">Kategori</th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left">Phone</th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left">Kota</th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left">Jumlah</th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left">Harga</th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left">Pembayaran</th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left">Status</th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left">Kehadiran</th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left">Tanggal Pembayaran</th>
                <th className="sticky right-0 bg-white text-red-700 px-2">Tiket</th>
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
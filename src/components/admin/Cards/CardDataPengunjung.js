import React, { useEffect, useState, } from "react";
import ReactLoading from 'react-loading';
import PaginationDataPengunjung from './PaginationDataPengunjung';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// components
import axios from "axios";
import excel from "../../../assets/img/admin/excel.png"
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import {
  Modal,
  Ripple,
  initTE,
} from "tw-elements";

export default function CardDataPengunjung ({ color }) {

//loading
const [loading,setLoading] = useState(true)
const [pengunjung,setPengunjung] = useState([])
//for search bar
const [selectedMuseum, setSelectedMuseum] = useState('');
const [searchTerm, setSearchTerm] = useState("")
const [semuaMuseum, setSemuaMuseum] = useState('');
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
        const dataPengunjung = res.data.pengunjung
        setPengunjung(dataPengunjung)
        setSemuaMuseum([...new Set(dataPengunjung.map(pengunjung => pengunjung.museum))])
        setLoading(false);
      }
  });
  initTE({ Modal, Ripple });
}, [])

console.log(namaMuseum);

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
    
    </div>   
    <div className="flex w-full items-center">    
      <div className="flex my-2 w-80 px-6 pt-4">
        <input type='text' className="w-full font-nunito border-none ring-2 ring-red-300 focus:border-none focus:ring-red-500 focus:ring-2 active:border-none rounded-lg"  placeholder="Cari kode tiket, nama, kategori, kota,..." onChange={e=>{setSearchTerm(e.target.value)}} /> 
      </div>
      <div className="flex w-full justify-end"> 
        {/* <h3>Export Data Pengunjung</h3> */}
        <button
          type="button"
          class="bg-green-400 rounded-xl px-6 py-3 h-modal text-sm font-nunito text-white flex items-center"
          data-te-toggle="modal"
          data-te-target="#exampleModalCenter"
          data-te-ripple-init
          data-te-ripple-color="light">
          Export Data <img src={excel} className='w-4 ml-2' alt="excel"/>
        </button>
      </div>
      </div>

    

    {/* header */}
    <div className= {"relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded" + (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")}>
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-lg font-merriweather text-red-600">Data Pengunjung</h3>
            </div>
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
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left">Status</th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left">Kehadiran</th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left">Kategori</th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left">Phone</th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left">Kota</th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left">Jumlah</th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left">Harga</th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left">Pembayaran</th>
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
      
      {/* MODAL */}
<div
  data-te-modal-init
  class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
  id="exampleModalCenter"
  tabindex="-1"
  aria-labelledby="exampleModalCenterTitle"
  aria-modal="true"
  role="dialog">
  <div
    data-te-modal-dialog-ref
    class="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]">
    <div
      class="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-red-600">
      <div
        class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-red-100 border-opacity-100 p-4 dark:border-opacity-50">
        <h5
          class="text-xl font-medium leading-normal text-red-800 dark:text-red-200"
          id="exampleModalScrollableLabel">
          Export Data Pengunjung
        </h5>
        <button
          type="button"
          class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
          data-te-modal-dismiss
          aria-label="Close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="relative p-4 my-5 flex flex-wrap w-full">
        
        {/* <h3>Export Data Pengunjung</h3> */}
        <div className='mb-5 m-2 w-full '>
          {/* <label className='block font-nunito font-bold'>Museum:</label>
            <input className=" font-nunito py-2 px-4  text-black font-bold hover:bg-red-200 transition-all duration-300 ease-in-out active:bg-red-400 focus:bg-red-400 bg-white text-base z-50 float-left list-none text-left rounded-xl  shadow-none border-red-300 min-w-0 border-2" type="text" value={namaMuseum} onChange={e => setNamaMuseum(e.target.value)}/> */}
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Pilih Museum</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={namaMuseum}
                  label="Pilih Museum"
                  onChange={e => setNamaMuseum(e.target.value)}
                >
                  {semuaMuseum &&  semuaMuseum.map((item,index)=>{
                    return(
                      <MenuItem value={item} key={index}>{item}</MenuItem>

                    )
                  })}
                </Select>
              </FormControl>
            </Box>
        </div>
       <div className="flex">
        <div className=' mx-2'>
            <label className='block font-nunito font-bold'>Tanggal Mulai:</label>
            <input className="block font-nunito py-2 px-4  text-black font-bold hover:bg-red-200 transition-all duration-300 ease-in-out active:bg-red-400 focus:bg-red-400 bg-white text-base z-50 float-left list-none text-left rounded-xl  shadow-none border-red-300 min-w-0 border-2" type="date" value={startDate} onChange={e => setStartDate(e.target.value)}/>
          </div>
          <div className=' mx-2'>
            <label className='block font-nunito font-bold'>Tanggal Akhir:</label>
            <input className="block font-nunito py-2 px-4  text-black font-bold hover:bg-red-200 transition-all duration-300 ease-in-out active:bg-red-400 focus:bg-red-400 bg-white text-base z-50 float-left list-none text-left rounded-xl  shadow-none border-red-300 min-w-0 border-2" type="date" value={endDate} onChange={e => setEndDate(e.target.value)}/>
          </div>
       </div>
      </div>


      <div
        class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-red-100 border-opacity-100 p-4 dark:border-opacity-50">
        <button
          type="button"
          class="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
          data-te-modal-dismiss
          data-te-ripple-init
          data-te-ripple-color="light">
          Close
        </button>
        <button
          type="button"
          class="bg-green-400 rounded-xl  px-6 py-3 text-sm font-nunito bold text-white flex items-center"
          onClick={handleDownload}
          data-te-ripple-init
          data-te-ripple-color="light">
          Export<img src={excel} className='w-4 ml-2' alt="excel"/>
        </button>
      </div>
    </div>
  </div>
</div>
    </>
  );
}
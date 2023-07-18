import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading';
import Cookies from 'js-cookie';
import PaginationPemasukan from './PaginationPemasukan';
import { createPopper } from "@popperjs/core";
import {BiDownArrow} from 'react-icons/bi'
import excel from "../../../assets/img/admin/excel.png"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
  Modal,
  Ripple,
  initTE,
} from "tw-elements";
import moment from 'moment';

function CardPemasukan() {

  const [searchTerm, setSearchTerm] = useState("")
  const [loading,setLoading] = useState(true)
  const [pemasukan,setPemasukan] = useState([])
  const [namaMuseum,setNamaMuseum] = useState([])
  const [semuaMuseum,setSemuaMuseum] = useState([])
  const [namaMuseumSelected,setNamaMuseumSelected] = useState('Semua Museum')
  const [museumExport,setMuseumExport] = useState(null)
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');

  const fetchMuseum = () =>{
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/show_museum`, {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      }}).then(res=>{
      console.log(res);  
      if(res.status === 200) {
        setSemuaMuseum(res.data.museum);        
        }
    });
  }

  useEffect(() => {
    fetchMuseum();
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/pemasukan` , {
      headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
      }})
    .then(res=>{
    // console.log(res);  
    if(res.status === 200)
      {
          setPemasukan(res.data.pemasukan)
          setLoading(false);
      }
  });
  initTE({ Modal, Ripple });
  }, [])

  //export excel
const handleDownload = () => {
  const queryParams = new URLSearchParams();
  if (museumExport) {
    queryParams.append('nama_museum', museumExport);
  }
  if (startDateFilter) {
    queryParams.append('start_date', startDateFilter);
  }
  if (endDateFilter) {
    queryParams.append('end_date', endDateFilter);
  }

  const url = `${process.env.REACT_APP_API_ENDPOINT}/api/pemasukanExport?${queryParams.toString()}`;
  console.log(url);
  console.log(namaMuseumSelected);

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

  console.log(pemasukan);

  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();

  function refreshPage() {
    window.location.reload(false);
  }
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const handleFilterMusuem = (e) =>{
    setNamaMuseumSelected(e.target.value)
    setMuseumExport(e.target.id)
  } 

  function formatCurrency(amount) {
    const formattedAmount = amount.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    });
  
    return formattedAmount.replace(",00", "");
  }

  const totalPemasukan = pemasukan
  .filter((item) => {
    // Filter by museum name
    if (namaMuseumSelected === '' || namaMuseumSelected === 'Semua Museum') {
      return true;
    } else {
      return item.kategori.museum.nama_museum === namaMuseumSelected;
    }
  })
  .filter((item) => {
    // Filter by start and end dates
    if (startDateFilter && endDateFilter) {
      const tanggalVal = moment(item.tanggal, 'DD-MM-YYYY').toDate();
        const start = moment(startDateFilter, 'YYYY-MM-DD').toDate();
        const end = moment(endDateFilter, 'YYYY-MM-DD').toDate();
      return tanggalVal >= start && tanggalVal <= end;
    }
    return true;
  })
  .map((item) => Math.floor(item.total_harga))
  .reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);



  if(loading) {
    var pemasukan_HTMLTABLE =   
      <tr className="bg-white border-b">
        <td colspan={6} className="text-xl text-center justify-center font-semibold py-5">
          <ReactLoading type={"spin"} color={"red"} height={'5%'} width={'5%'} className="m-auto" />
        </td>
      </tr>
  }
  else {     
    pemasukan_HTMLTABLE = <PaginationPemasukan dataPengunjung={pemasukan.filter((item) => {
      if (namaMuseumSelected === ''|| namaMuseumSelected === 'Semua Museum' ) {
        return true;
      } else {
        return item.kategori.museum.nama_museum == namaMuseumSelected;
      }
    })} searchTerm={searchTerm} startDate={startDateFilter} endDate={endDateFilter} />
  }
  return (
  <div className='container relative flex flex-col min-w-0 break-words w-full mb-6'>
    <div className="flex items-center justify-between ">
      <div className="my-2 w-72 pt-4">
        <input type='text' className="w-full font-nunito border-none ring-2 ring-red-300 focus:border-none focus:ring-red-500 focus:ring-2 active:border-none rounded-lg"  placeholder="Cari berdasarkan tanggal, nama admin, pengunjung, dan pemasukan..." onChange={e=>{setSearchTerm(e.target.value)}} /> 
      </div>              
        <button
          type="button"
          class="bg-green-400 rounded-xl px-6 py-3 h-modal text-sm font-nunito text-white flex items-center"
          onClick={handleDownload}
          data-te-ripple-color="light">
          Export Data <img src={excel} className='w-4 ml-2' alt="excel"/>
        </button>

    </div>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden shadow-lg rounded-xl m-2 bg-white">
              
              <div className="flex p-5  ">

                
              <div className="flex flex-col  my-2 ">
                <a className="text-blueGray-500 block" href="#pablo" ref={btnDropdownRef} onClick={(e) => { e.preventDefault(); dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover(); }}>
                  <div className="items-center flex">
                    <div className="px-4 py-2 border-2 bg-white border-red-300  text-black font-nunito font-bold flex items-center hover:bg-red-200 rounded-xl transition-all duration-300 ease-in-out active:bg-red-400"><p className="pr-1">{namaMuseumSelected}</p><BiDownArrow/></div>
                    </div>
                </a>
                <div ref={popoverDropdownRef} className={ (dropdownPopoverShow ? "block " : "hidden ") + "bg-white text-base z-[5000] float-left py-2 px-3 list-none text-left rounded-xl shadow-lg border-2 border-gray-200" }>
                    <div>
                      <button className="block font-nunito py-2 px-4 w-full text-black font-bold hover:bg-red-200 transition-all duration-300 ease-in-out active:bg-red-400 focus:bg-red-400" onClick={handleFilterMusuem} value='Semua Museum'>Semua Musuem</button>
                    </div>
                    {semuaMuseum.map((item,index)=>{
                      return(
                    <div key={index}>
                      <button className="block font-nunito py-2 px-4 text-black font-bold hover:bg-red-200  transition-all duration-300 ease-in-out active:bg-red-400 focus:bg-red-400" onClick={handleFilterMusuem} id={item.id} value={item.nama_museum}>{item.nama_museum}</button>
                    </div>
                  )
                  })}
               </div>

              <div className="flex my-2  px-6 pt-4 ">
                <div className="flex flex-col mx-2">
                  <label htmlFor="startDate" className="text-black">Mulai Tanggal:</label>
                  <input  
                    type="date"
                    id="startDate"
                    value={startDateFilter}
                    onChange={(e) => setStartDateFilter(e.target.value)}
                    className="block font-nunito py-2 px-4  text-black font-bold hover:bg-red-200 transition-all duration-300 ease-in-out active:bg-red-400 focus:bg-red-400 bg-white text-base z-50 float-left list-none text-left rounded-xl  shadow-none border-red-300 min-w-0 border-2"
                  />
                </div>
                <div className="flex flex-col mx-2">
                  <label htmlFor="endDate" className="text-black">Akhir Tanggal:</label>
                  <input
                    type="date"
                    id="endDate"
                    value={endDateFilter}
                    onChange={(e) => setEndDateFilter(e.target.value)}
                    className="block font-nunito py-2 px-4  text-black font-bold hover:bg-red-200 transition-all duration-300 ease-in-out active:bg-red-400 focus:bg-red-400 bg-white text-base z-50 float-left list-none text-left rounded-xl  shadow-none border-red-300 min-w-0 border-2"
                  />
                </div>
             </div>
          
              </div>
              <div className='flex pr-10 justify-end items-center w-full'>
              <span className='text-3xl font-nunito font-semibold  px-6 items-center text-center flex'>Total = {
                loading?<p> Loading...</p>: formatCurrency(totalPemasukan)
              }</span>
              </div>
  
          </div>
            <table id="pemasukann" class="min-w-full">
              <thead class="border-b bg-white">
                <tr className=''>
                  <th scope="col" class="text-xl font-nunito font-semibold text-[#A70B0B] px-6 py-4 text-center"> Tanggal</th>
                  <th scope="col" class="text-xl font-nunito font-semibold text-[#A70B0B] px-6 py-4 text-center">Nama Admin</th>
                  <th scope="col" class="text-xl font-nunito font-semibold text-[#A70B0B] px-6 py-4 text-center">Nama Pengunjung</th>
                  <th scope="col" class="text-xl font-nunito font-semibold text-[#A70B0B] px-6 py-4 text-center">Pemasukan</th>
                </tr>
                </thead>
              <tbody className='text-center'>
                {pemasukan_HTMLTABLE}
              </tbody>
            </table> 
            
          </div>
        </div>
      </div>
    </div>

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
          Export Data Pemasukan
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
                  value={museumExport === ''?'Semua Musuem':museumExport}
                  label="Pilih Museum"
                  onChange={e => setMuseumExport(e.target.value)}
                >
                <MenuItem value='' >Semua Museum</MenuItem>
                  {semuaMuseum &&  semuaMuseum.map((item,index)=>{
                    return(
                      <MenuItem value={item.id} key={index}>{item.nama_museum}</MenuItem>

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

  </div>
    
  )
}

export default CardPemasukan
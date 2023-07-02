import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading';
import Cookies from 'js-cookie';
import PaginationPemasukan from './PaginationPemasukan';
import Pemasukan from '../Pemasukan';
import { createPopper } from "@popperjs/core";
import {BiDownArrow} from 'react-icons/bi'


function CardPemasukan() {

  const [searchTerm, setSearchTerm] = useState("")
  const [loading,setLoading] = useState(true)
  const [pemasukan,setPemasukan] = useState([])
  const [namaMuseum,setNamaMuseum] = useState([])
  const [namaMuseumSelected,setNamaMuseumSelected] = useState('Pilih Museum')
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
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
          const dataPendapatan = res.data.pemasukan
          setNamaMuseum([...new Set(dataPendapatan.map(pemasukan => pemasukan.museum))])
          setPemasukan(res.data.pemasukan)
          setLoading(false);
      }
  });
  }, [])

  //export excel
const handleDownload = () => {
  const queryParams = new URLSearchParams();
  if (namaMuseum) {
    queryParams.append('nama_museum', namaMuseumSelected);
  }
  if (startDate) {
    queryParams.append('start_date', startDate);
  }
  if (endDate) {
    queryParams.append('end_date', endDate);
  }

  const url = `${process.env.REACT_APP_API_ENDPOINT}/api/pemasukanExport?${queryParams.toString()}`;

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

  console.log(namaMuseum);

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
  } 


  if(loading)
  {
    var pemasukan_HTMLTABLE =   
      <tr className="bg-white border-b" >
        <td colspan={6} className="text-xl text-center justify-center font-semibold py-5">
          <ReactLoading type={"spin"} color={"red"} height={'5%'} width={'5%'} className="m-auto" />
        </td>
      </tr>
  }
  else
  {     
    pemasukan_HTMLTABLE = <PaginationPemasukan data={pemasukan.filter((item) => {
      if (namaMuseumSelected === ''|| namaMuseumSelected === 'Pilih Museum' ) {
        return true;
      } else {
        return item.museum == namaMuseumSelected;
      }
    })} searchTerm={searchTerm} />
  }
  return (
  <div className='container  relative flex flex-col min-w-0 break-words w-full mb-6'>
    <div className="my-2  w-72">
        <input type='text' className="w-full font-nunito border-none ring-2 ring-red-300 focus:border-none focus:ring-red-500 focus:ring-2 active:border-none rounded-lg"  placeholder="Cari tanggal..." onChange={e=>{setSearchTerm(e.target.value)}} /> 
      </div>
    <div class="flex flex-col " >
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden shadow-lg rounded-xl m-2">
                <div className="flex p-5 bg-white">
                <div clas>
          <a
            className="text-blueGray-500 block"
            href="#pablo"
            ref={btnDropdownRef}
            onClick={(e) => {
              e.preventDefault();
              dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
            }}
          >
            <div className="items-center flex">
              <div className="px-4 py-2 border-2 border-red-300  text-black font-nunito font-bold flex items-center hover:bg-red-200 rounded-xl transition-all duration-300 ease-in-out active:bg-red-400"><p className="pr-1">{namaMuseumSelected}</p><BiDownArrow/></div>
            </div>
          </a>
          <div
            ref={popoverDropdownRef}
            className={
              (dropdownPopoverShow ? "block " : "hidden ") +
              "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 border-2 border-gray-200"
            }
          >
                <div>
                  <button className="block font-nunito py-2 px-4 w-full text-black font-bold hover:bg-red-200  transition-all duration-300 ease-in-out active:bg-red-400 focus:bg-red-400'" onClick={handleFilterMusuem} value='Pilih Museum'>Pilih Musuem</button>
                </div>
            {namaMuseum.map((item,index)=>{
              return(
                <div key={index}>
                  <button className="block font-nunito py-2 px-4 text-black font-bold hover:bg-red-200  transition-all duration-300 ease-in-out active:bg-red-400 focus:bg-red-400'" onClick={handleFilterMusuem} value={item}>{item}</button>
                </div>
              )
            })}
          </div>
        </div>
            <th scope="col" class="text-xl font-nunito font-semibold text-[#A70B0B] px-6 items-center text-center flex">
              Total = {
                loading?<p> Loading...</p>:
                pemasukan.filter((item) => {
                  if (namaMuseumSelected === ''|| namaMuseumSelected === 'Pilih Museum' ) {
                    return true;
                  } else {
                    return item.museum == namaMuseumSelected;
                  }
                }).map((item,index)=>Math.floor(item.harga_awal)).reduce((accumulator, value) => {
                  return accumulator + value;
                }, 0)
              }
                    </th>
                    <div className="text-black">
                    <h3>Export Data Pengunjung</h3>
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
                <table id="pemasukann" class="min-w-full ">
                <thead class="border-b bg-white ">
                    <tr className=''>
                    <th scope="col" class="text-xl font-nunito font-semibold text-[#A70B0B] px-6 py-4 text-center ">
                        Tanggal
                    </th>
                    <th scope="col" class="text-xl font-nunito font-semibold text-[#A70B0B] px-6 py-4 text-center">
                        Nama Admin
                    </th>
                    <th scope="col" class="text-xl font-nunito font-semibold text-[#A70B0B] px-6 py-4 text-center">
                        Nama Pengunjung
                    </th>
                    <th scope="col" class="text-xl font-nunito font-semibold text-[#A70B0B] px-6 py-4 text-center">
                        Pemasukan
                    </th>
                    </tr>
                </thead>
                <tbody className='text-center '>
                    {/* <td class=" text-gray-900 px-6 py-4 whitespace-nowrap">
                        10-09-2022
                    </td>
                    <td class=" text-gray-900 px-6 py-4 whitespace-nowrap">
                        Sabila Wibu
                    </td>
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        22.000
                    </td> */}
                    {pemasukan_HTMLTABLE}
                    
                    
                </tbody>
                </table>
            </div>
            </div>
        </div>
    </div>
  </div>
    
  )
}

export default CardPemasukan
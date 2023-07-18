import React from 'react'
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Cookies from 'js-cookie'
import axios from 'axios';
import swal from 'sweetalert';

function PaginationStatusPembayaran(props){
  const [dataPembayaran, setDataPembayaran] = useState(props.data);
  const searchTerm = props.searchTerm

const [token, setToken] = useState(Cookies.get('token'));
const [user,setUser] = useState('loading');

const fetchData = async () => {
  const data = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/me`, {
    headers : {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: `Bearer ${token}`,
    }
    });
const json = await data.json();
  console.log(json);
  var result =''
  if(json.message !== 'Unauthenticated.') {
    result = json.user.name;
  }
  setUser(result);
}

const fetchPengunjung = () => {
  axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/pengunjung`, {headers : {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    Authorization: `Bearer ${Cookies.get('token')}`,
  }})
  
.then(res=>{
    
    if(res.status === 200) {
      setDataPembayaran(res.data.pengunjung)
    }
  });
}
 
useEffect(() => {
  fetchData()
}, [])

const handleKonfirmasi = (e,idData) =>{
  const data = {
    idData : idData,
    idAdmin: user
  }

  swal({
  title: "Konfirmasi pembayaran pengunjung?",
  text: "Sekali Konfirmasi, anda tidak bisa mengubahnya lagi!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((update) => {
  if (update) {
    axios.put(`${process.env.REACT_APP_API_ENDPOINT}/api/status`,data, {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
        }}).then(res=>{
          if(res.data.status === 200) {
            swal("Berhasil!",res.data.message,"success")
            fetchPengunjung()
          }
        else if(res.data.status === 404) {
        }})
        } 
        else {
          swal("Membatalkan Aksi!");
        }
    })
  }

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6 ;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = dataPembayaran.slice(itemOffset, endOffset);
  var pageCount = 0;
  console.log(currentItems)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % dataPembayaran
    .filter(val=>{
      console.log(val);
      if(searchTerm === ""){
        
          return val
      }
      else if(
        val.kode_tiket.toLowerCase().includes(searchTerm.toLowerCase()) ||
        val.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (val.status && val.status.toLowerCase().includes(searchTerm.toLowerCase()) )||
        val.kategori.museum.nama_museum.toLowerCase().includes(searchTerm.toLowerCase()) ||
        val.kategori.nama_kategori.toLowerCase().includes(searchTerm.toLowerCase())
         ) {
          return val
      }
    })
    .length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      {searchTerm === "" ? currentItems.map((item,index)=>{
        pageCount = Math.ceil(dataPembayaran.length / itemsPerPage);

        return (
        <tr className='bg-white text-gray-900' key={index}>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.kode_tiket }</td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.nama }</td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.kategori.museum.nama_museum}</td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.kategori.nama_kategori}</td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.jumlah}</td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.total_harga}</td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.pembayaran}</td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.status === "Lunas" ? "Lunas" : "Belum Lunas"}</td>
        <td className='sticky right-0 bg-gray-50 px-2 '> <button id={`konfirmasi-${item.id}`} className='p-1.5 text-sm bg-green-400 rounded-lg' onClick={e=>handleKonfirmasi(e, item.id)}>Konfirmasi</button></td>
      </tr>
        )  
    })
:
  dataPembayaran.filter(val=>{
    if(
      val.kode_tiket.toLowerCase().includes(searchTerm.toLowerCase()) ||
        val.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        val.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        val.kategori.museum.nama_museum.toLowerCase().includes(searchTerm.toLowerCase()) ||
        val.kategori.nama_kategori.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return val
      }
  }).map((item,index)=>{
    
    pageCount = Math.ceil(currentItems.length / itemsPerPage);

    return(
      <tr className='bg-white text-gray-900' key={index}>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.kode_tiket }</td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.kategori.museum.nama_museum}</td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.kategori.nama_kategori}</td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.jumlah}</td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.total_harga}</td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.pembayaran}</td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.status === "Lunas" ? "Lunas" : "Belum Lunas"}</td>
        <td className='sticky right-0 bg-gray-50 px-2 '> <button id={`konfirmasi-${item.id}`} className='p-1.5 text-sm bg-green-400 rounded-lg' onClick={e=>handleKonfirmasi(e, item.id)}>Konfirmasi</button></td>
      </tr>
    )
  })
}
      <tr className='w-full py-2'>
        <th colSpan={9}>
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next ⇒"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="⇐ Previous"
            renderOnZeroPageCount={null}
            containerClassName='isolate inline-flex -space-x-px rounded-md shadow-sm my-2'
            pageLinkClassName='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-red-200 hover:bg-red-500 focus:z-20 focus:outline-offset-0 h-full'
            previousLinkClassName='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-900 ring-1 ring-inset ring-red-200 hover:bg-red-500 hover:text-white focus:z-20 focus:outline-offset-0 bg-red-100'
            nextLinkClassName='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-900 ring-1 ring-inset ring-red-200 hover:bg-red-500 hover:text-white focus:z-20 focus:outline-offset-0 bg-red-100'
            activeLinkClassName='relative z-10 inline-flex items-center bg-red-600 px-5 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 h-full'
          />
        </th>
      </tr>
    </>
  );
}

export default PaginationStatusPembayaran;
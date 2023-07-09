import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import Cookies from 'js-cookie';

function PaginationPemasukan(props) {

  const [dataTiket,setDataTiket] = useState(Object.entries(props));
  const searchTerm = props.searchTerm
  // console.log(props);

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

  useEffect(() =>
  setDataTiket(Object.entries(props))
  ,[props] )

  const rupiah = (number)=>{
    return new Intl.NumberFormat("id-ID", {
    //   style: "currency",
      currency: "IDR"
    }).format(number);
  }

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6 ;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = dataTiket[0][1].slice(itemOffset, endOffset);

  //jumlah halaman tanpa search
  var pageCount = 0;

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % dataTiket[0][1]
    .filter(val=>{
      if(searchTerm === ""){
          return val
      }
      else if(
        val.tanggal.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // val.id_admin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        val.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        val.harga_awal.toLowerCase().includes(searchTerm.toLowerCase()) ) 
        {
          return val
      }
    }).length;
    

    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
    {searchTerm === "" ? currentItems.map((item,index)=>{
        //jumlah halaman tanpa search
        pageCount = Math.ceil(dataTiket[0][1].length / itemsPerPage);
        
        return(
            <tr className="bg-white border-b text-center" key={index}>
              <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">{item.tanggal}</td>
              <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">{item.id_admin}</td>
              <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">{item.nama}</td>
              <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">{rupiah(item.harga_awal)}</td>
            </tr>
          )
        })
      :
      dataTiket[0][1].filter(val=>{
        if(
          val.tanggal.toLowerCase().includes(searchTerm.toLowerCase()) ||
          // val.id_admin.toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.harga_awal.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return val
        }
      }).map((item,index)=>{

          //jumlah halaman dengan search
          pageCount = Math.ceil(currentItems.length / itemsPerPage);

          return(
            <tr className="bg-white border-b text-center" key={index}>
              <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">{item.tanggal}</td>
              <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">{item.id_admin}</td>
              <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">{item.nama}</td>
              <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">{rupiah(item.harga_awal)}</td>
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

export default PaginationPemasukan
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import moment from 'moment';

function PaginationPemasukan({searchTerm,dataPengunjung,startDate, endDate}) {

  const [dataTiket,setDataTiket] = useState(dataPengunjung);
  const [itemOffset, setItemOffset] = useState(0);


  useEffect(() =>
  setDataTiket(dataPengunjung)
  ,[dataPengunjung] )

  function rupiah(amount) {
    const number = Number(amount)
    const formattedAmount = number.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    });
  
    return formattedAmount.replace(",00", "");
  }

  const filteredData = dataTiket.filter((val) => {
    if (startDate && endDate) {
      const tanggalVal = moment(val.tanggal, 'DD-MM-YYYY').toDate();
      const start = moment(startDate, 'YYYY-MM-DD').toDate();
      const end = moment(endDate, 'YYYY-MM-DD').toDate();
      return tanggalVal >= start && tanggalVal <= end;
    }

    if (val.nama.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    }

    return false;
  });

  const itemsPerPage = 6 ;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredData.slice(itemOffset, endOffset);

  //jumlah halaman tanpa search
  let pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredData
    .filter(val=>{
      if (startDate && endDate) {
        const tanggalVal = moment(val.tanggal, 'DD-MM-YYYY').toDate();
        const start = moment(startDate, 'YYYY-MM-DD').toDate();
        const end = moment(endDate, 'YYYY-MM-DD').toDate();
        return tanggalVal >= start && tanggalVal <= end;
      }

      if(searchTerm === ""){
          return val
      }
      else if(
        val.tanggal.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // val.id_admin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        val.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        val.total_harga.toLowerCase().includes(searchTerm.toLowerCase()) ) 
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
    {searchTerm === "" ? 
    currentItems.map((item,index)=>{
        //jumlah halaman tanpa search
        pageCount = Math.ceil(filteredData.length / itemsPerPage);
        
        return(
            <tr className="bg-white border-b text-center" key={index}>
              <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">{item.tanggal}</td>
              <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">{item.id_admin}</td>
              <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">{item.nama}</td>
              <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">{rupiah(item.total_harga)}</td>
            </tr>
          )
        })
      :
      dataTiket.filter(val=>{
        if (startDate && endDate) {
          const tanggalVal = moment(val.tanggal, 'DD-MM-YYYY').toDate();
          const start = moment(startDate, 'YYYY-MM-DD').toDate();
          const end = moment(endDate, 'YYYY-MM-DD').toDate();
          return tanggalVal >= start && tanggalVal <= end;
        }
  
        if(
          val.tanggal.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (val.id_admin && val.id_admin.toLowerCase().includes(searchTerm.toLowerCase())) ||
          val.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.total_harga.toLowerCase().includes(searchTerm.toLowerCase())
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
              <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">{rupiah(item.total_harga)}</td>
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
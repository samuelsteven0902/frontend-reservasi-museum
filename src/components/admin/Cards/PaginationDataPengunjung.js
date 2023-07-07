import React from 'react'
import { useState , useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router-dom';
import { GrFormView } from 'react-icons/gr';

function PaginationDataPengunjung(props) {
  const searchTerm = props.searchTerm
  const [dataPengunjung, setDataPengunjung] = useState(Object.entries(props));
  console.log(props);

  useEffect(() =>
  setDataPengunjung(Object.entries(props))
  ,[props] )

  const history = useHistory();

  //go page tiket
  const handleTiket = (e) =>{
    history.push("/tiket/" + e );
    return handleTiket;
    }

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6 ;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = dataPengunjung[0][1].slice(itemOffset, endOffset);
  var pageCount = 0;
  console.log(currentItems)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % dataPengunjung[0][1]
    .filter(val=>{
      if(searchTerm === ""){
          return val
      }
      else if(
        val.kode_tiket.toLowerCase().includes(searchTerm.toLowerCase()) ||
        val.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        val.kategori.toLowerCase().includes(searchTerm.toLowerCase()) ||
        val.kota.toLowerCase().includes(searchTerm.toLowerCase())) {
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
        //jumlah halaman tanpa search
        pageCount = Math.ceil(dataPengunjung[0][1].length / itemsPerPage);
   
        return(
            <tr className="bg-white text-gray-900" key={index}>
              <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.kode_tiket}</td>
              <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.nama}</td>
              <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.museum}</td>
              <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.status === "Lunas" ? "Lunas" : "Belum Lunas"}</td>
              <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.kehadiran != null ? "Hadir" : "Tidak Hadir"}</td>
              <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.kategori}</td>
              <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.phone}</td>
              <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.kota}</td>
              <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.jumlah}</td>
              <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.harga_awal}</td>
              <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.pembayaran}</td>
              <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.tanggal_pembayaran}</td>
              <td className="sticky right-0 bg-gray-50 px-2">
                <button className="bg-gray-500 hover:bg-gray-600 rounded shadow-inner drop-shadow-2xl py-0.5 px-1" onClick={e=>handleTiket(item.kode_tiket,e)}>
                <GrFormView className=""/>
              </button>
              </td>
            </tr>
          )
        })
:
        dataPengunjung[0][1].filter(val=>{
        if(
          val.kode_tiket.toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.kategori.toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.kota.toLowerCase().includes(searchTerm.toLowerCase()))  {
            return val
        }
      }).map((item,index)=>{

          //jumlah halaman dengan search
          pageCount = Math.ceil(currentItems.length / itemsPerPage);

          return(
              <tr className="bg-white text-gray-900" key={index}>
              <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.kode_tiket}</td>
              <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.nama}</td>
              <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.museum}</td>
              <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.kategori}</td>
              <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.phone}</td>
              <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.kota}</td>
              <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.jumlah}</td>
              <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.harga_awal}</td>
              <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.pembayaran}</td>
              <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.status === "Lunas" ? "Lunas" : "Belum Lunas"}</td>
              <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.kehadiran != null ? "Hadir" : "Tidak Hadir"}</td>
              <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.tanggal_pembayaran}</td>
              <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.tanggal_pembayaran}</td>
              
              <td className=" text-gray-900 px-6 py-4 whitespace-nowrap"><button className="bg-gray-500 hover:bg-gray-600 rounded shadow-inner drop-shadow-2xl py-0.5 px-1" onClick={e=>handleTiket(item.kode_tiket,e)}>
                <GrFormView className=""/>
                </button>
                </td>
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

export default PaginationDataPengunjung;
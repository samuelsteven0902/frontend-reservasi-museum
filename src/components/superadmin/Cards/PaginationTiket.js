import React from 'react'
import { useState } from 'react';
import ReactPaginate from 'react-paginate';



function Items(props) {


  
  const dataTiket = props.data

  console.log(props);
  
    function getFirstLetters(str) {
      const firstLetters = str
        .split(' ')
        .map(word => word[0])
        .join('');

      return firstLetters;
    }

    const rupiah = (number)=>{
      return new Intl.NumberFormat("id-ID", {
      //   style: "currency",
        currency: "IDR"
      }).format(number);
    }

  return (
    <>
    {dataTiket.map((item,index)=>{
      // console.log(item)
        return(
            <tr className="bg-white border-b text-center " key={index}>
                    <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">
                        {item.id}
                    </td>
                    <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        {getFirstLetters(item.nama_museum)}
                    </td>
                    <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        {item.nama_kategori}
                    </td>
                    <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        {item.nama_kategori_en}
                    </td>
                    <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        {rupiah(item.hari_biasa)}
                    </td>
                    <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        {rupiah(item.hari_libur)}
                    </td>
                    <td className=" text-gray-900 px-6 py-4 whitespace-nowrap ">
                     
                    
                    <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal" id={item.id_kategori} data-bs-target="#exampleModalCenteredScrollable" onClick={props.updateHarga}>
                        Edit
                    </button>


                    {/* <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={(e) => deleteStudent(e, item.id)}>Hapus</button> */}
                    
                    </td>
                    </tr>
        )
    })}
    </>
  );
}

function PagginationTiket(props) {

  const dataTiket  = Object.entries(props);
  const searchTerm = props.searchTerm
  console.log(props);

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6 ;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = dataTiket[0][1]
      .filter(val=>{
        if(searchTerm == "")
        {
            return val
        }
        else if(val.nama_museum.toLowerCase().includes(searchTerm.toLowerCase()) ||
                val.nama_kategori.toLowerCase().includes(searchTerm.toLowerCase()))
        {
            return val
        }
        })
      .slice(itemOffset, endOffset);
  const pageCount = Math.ceil(dataTiket[0][1]
    .filter(val=>{
      if(searchTerm === "")
      {
          return val
      }
      else if(val.nama_museum.toLowerCase().includes(searchTerm.toLowerCase()) ||
              val.nama_kategori.toLowerCase().includes(searchTerm.toLowerCase()))
      {
          return val
      }
      })
    .length / itemsPerPage);
  console.log(currentItems)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % dataTiket[0][1]
    .filter(val=>{
      if(searchTerm === "")
      {
          return val
      }
      else if(val.nama_museum.toLowerCase().includes(searchTerm.toLowerCase()) ||
              val.nama_kategori.toLowerCase().includes(searchTerm.toLowerCase()))
      {
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
      <Items data={currentItems} updateHarga={(data)=>props.updateHarga(data)} />
      
      <tr className='w-full  py-2' >
        <th colSpan={6}>
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next ⇒"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="⇐ Previous"
            renderOnZeroPageCount={null}
            containerClassName='isolate inline-flex -space-x-px rounded-md shadow-sm my-2'
            pageLinkClassName='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-indigo-200 hover:bg-indigo-500 focus:z-20 focus:outline-offset-0 h-full'
            previousLinkClassName='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-900 ring-1 ring-inset ring-indigo-200 hover:bg-indigo-500 hover:text-white focus:z-20 focus:outline-offset-0 bg-indigo-100'
            nextLinkClassName='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-900 ring-1 ring-inset ring-indigo-200 hover:bg-indigo-500 hover:text-white focus:z-20 focus:outline-offset-0 bg-indigo-100'
            activeLinkClassName='relative z-10 inline-flex items-center bg-indigo-600 px-5 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 h-full'
          />
        </th>
      </tr>
    </>
  );
}


export default PagginationTiket
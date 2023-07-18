import React from 'react'
import { useState , useRef} from 'react';
import ReactPaginate from 'react-paginate';
import axios from "axios";
import swal from "sweetalert";
import Cookies from 'js-cookie';
import { data } from 'jquery';
import { BiTrash, BiPencil } from 'react-icons/bi';
import { useEffect } from 'react';


function PaginationTiketNew(props) {

  const [dataTiket, setDataTiket] = useState(Object.entries(props));
  const searchTerm = props.searchTerm
  const [idHarga,setIdHarga] = useState()
  // console.log(props);

  useEffect(() =>
  setDataTiket(Object.entries(props))
  ,[props] )

const deleteKategori = (e, id) => {
  e.preventDefault();

  swal({
      title: "Anda Yakin menghapus Kategori ini?",
      text: "Sekali Hapus, anda tidak bisa mencadangkannya lagi!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
  })
  .then((willDelete) => {
      if (willDelete) {
          axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/api/delete_kategori/${id}`, {
              headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`,
              }}).then(res=>{
              if(res.data.status === 200)
              {
                  swal("Deleted!",res.data.message,"success")
                  props.fetchHarga()
              }
              else if(res.data.status === 404)
              {
                  swal("Error",res.data.message,"error");
              }})
      } else {
          swal("Data anda aman!");
      }
  })
}


//   function getFirstLetters(str) {
//     const firstLetters = str
//       .split(' ')
//       .map(word => word[0])
//       .join('');
//     return firstLetters;
//   }

  const CloseRef = useRef();
const rupiah =  (amount) => {
    const formattedAmount = Number(amount).toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    });
  
    return formattedAmount.replace(",00", "");
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
      else if(val.nama_museum.toLowerCase().includes(searchTerm.toLowerCase()) ||
              val.nama_kategori.toLowerCase().includes(searchTerm.toLowerCase()) ||
              val.nama_kategori_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
              val.hari_biasa.toLowerCase().includes(searchTerm.toLowerCase()) ||
              val.hari_libur.toLowerCase().includes(searchTerm.toLowerCase())) {
          
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
              <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">{item.id}</td>
              <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">{item.nama_museum}</td>
              <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">{item.nama_kategori}</td>
              <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">{item.nama_kategori_en}</td>
              <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">{rupiah(item.hari_biasa)}</td>
              <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">{rupiah(item.hari_libur)}</td>
              <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">{item.min}</td>
              <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">{item.max}</td>
              <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">
                <button type="button" className="text-white ml-4 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-6 py-1.5 flex text-center mr-2 mb-2 align-middle items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" data-te-toggle="modal" id={item.id} data-te-target="#exampleModalCenteredScrollable" onClick={(e)=>props.updateHarga(e,item)}> <BiPencil className="mr-1"/>Edit</button>
                <button type="button" className="text-white ml-4 bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded text-sm px-4 py-1.5 flex text-center mr-2 mb-2 items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"onClick={(e) => deleteKategori(e, item.id)}> <BiTrash className="mr-1"/>Hapus</button>
              </td>
            </tr>
          )
        })
      :
      dataTiket[0][1].filter(val=>{
        console.log(val);
        if(
              val.nama_museum.toLowerCase().includes(searchTerm.toLowerCase()) ||
              val.nama_kategori.toLowerCase().includes(searchTerm.toLowerCase()) ||
              val.nama_kategori_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
              val.hari_biasa.toLowerCase().includes(searchTerm.toLowerCase()) ||
              val.hari_libur.toLowerCase().includes(searchTerm.toLowerCase())) {
          return val
        }
      }).map((item,index)=>{

          //jumlah halaman dengan search
          pageCount = Math.ceil(currentItems.length / itemsPerPage);

          return(
              <tr className="bg-white border-b text-center" key={index}>
              <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">{item.id}</td>
              <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">{item.nama_museum}</td>
              <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">{item.nama_kategori}</td>
              <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">{item.nama_kategori_en}</td>
              <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">{rupiah(item.hari_biasa)}</td>
              <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">{rupiah(item.hari_libur)}</td>
              <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">{item.min}</td>
              <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">{item.max}</td>
                <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">
                  <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-te-toggle="modal" id={item.id} data-te-target="#4" onClick={(e)=>props.updateHarga(e,item)}>Edit</button>
                  <button type="button" className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-ou" onClick={(e) => deleteKategori(e, item.id)}>Hapus</button>
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

export default PaginationTiketNew
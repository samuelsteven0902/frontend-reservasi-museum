import React from 'react'
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router-dom';
import { GrFormView } from 'react-icons/gr';
import swal from 'sweetalert';
import axios from 'axios';
import Cookies from 'js-cookie';
import Loading from 'react-loading';


function Items(props) {
  const paginationAdmin = props.data
  console.log(props);

  const history = useHistory();

  //go page tiket
  const handleTiket = (e) =>{
    history.push("/tiket/" + e );
    return handleTiket;
    }

    const [admin,setAdmin] = useState()

    const [loading,setLoading] = useState(true)

    const fetchData = () => {
      axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/show_admin`).then(res=>{
      console.log(res.data.admin); 
      setAdmin(res.data.admin); 
      setLoading(false)
      })
  }

    const deleteFAQ = (e, id) => {
        e.preventDefault();
        
        swal({
            title: "Anda Yakin menghapus Id Admin "+ id+ " ?",
            text: "Sekali Hapus, anda tidak bisa mencadangkannya lagi!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/api/delete_admin/${id}`, {
                    headers : {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        Authorization: `Bearer ${Cookies.get('token')}`,
                    }}).then(res=>{
                    if(res.data.status === 200) {
                        swal("Deleted!",res.data.message,"success")
                        fetchData();
                    }
                    else if(res.data.status === 404) {
                        // swal("Error",res.data.message,"error");
                        // thisClicked.innerText = "Delete";
                    }})
            } 
            else {
            swal("Data anda aman!");
            }
        })
    }

  return (
    <>
    {paginationAdmin.map((item,index)=>{
      console.log(item)
        return(
          <tr class="border-b bg-white" key={index}>
            <td class=" text-gray-900 px-6 py-4 whitespace-nowrap text-center">{item.id}</td>
            <td class=" text-gray-900 px-6 py-4 whitespace-nowrap text-center">{item.name}</td>
            <td class=" text-gray-900 px-6 py-4 whitespace-nowrap text-center">{item.roles[0].name}</td>
            <td class=" text-gray-900 px-6 py-4 whitespace-nowrap text-center">{item.email}</td>
            <td class=" text-gray-900 px-6 py-4 whitespace-nowrap text-center" >Sensor</td>
            <td class=" text-gray-900 px-6 py-4 whitespace-nowrap ">
                <button type="button" className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1" onClick={e=>deleteFAQ(e,item.id)}>Hapus</button>
            </td>
          </tr>
        )
      })}
    </>
  );
}

function PaginationCardAdmin(props) {

  const paginationAdmin = Object.entries(props);
  const searchTerm = props.searchTerm
  console.log(props);

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = paginationAdmin[0][1].slice(itemOffset, endOffset);
  const pageCount = Math.ceil(paginationAdmin[0][1].length / itemsPerPage);
  console.log(currentItems)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % paginationAdmin[0][1]
    .filter(val=>{
      if(searchTerm === ""){
          return val
      }
      else if(val.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              val.email.toLowerCase().includes(searchTerm.toLowerCase())) {
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
      <Items data={currentItems}/>
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

export default PaginationCardAdmin;
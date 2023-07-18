import React, { useEffect } from 'react'
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router-dom';
import { GrFormView } from 'react-icons/gr';
import swal from 'sweetalert';
import axios from 'axios';
import Cookies from 'js-cookie';
import Loading from 'react-loading';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import ReactLoading from 'react-loading';


function Items({data,handleLoadingStatus,fetchData}) {
  const [paginationAdmin,setPaginationAdmin] = useState(data)
  const [loadingStatus,setLoadingStatus] = useState(false)

  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&:before, &:after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
      '&:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      '&:after': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
    },
  }));

  useEffect(() =>
  setPaginationAdmin(data)
  ,[data] )

  const history = useHistory();

  const handleSwitch = (e) =>{
    handleLoadingStatus(true)
    axios.put(`${process.env.REACT_APP_API_ENDPOINT}/api/status_admin/${e.target.id}`).then((res)=>{
      console.log(res);
      fetchData()

    })
  }

  //go page tiket
  const handleTiket = (e) =>{
    history.push("/tiket/" + e );
    return handleTiket;
    }

    const [admin,setAdmin] = useState()

    const [loading,setLoading] = useState(true)


    const deleteFAQ = (e, id) => {
        e.preventDefault();
        
        swal({
            title: "Anda Yakin menghapus Id User tersebut ?",
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
        return(
          <tr class="border-b bg-white " key={index}>
            <td class=" text-gray-900 px-6 py-4 whitespace-nowrap text-center">{index + 1}</td>
            <td class=" text-gray-900 px-6 py-4 whitespace-nowrap text-center">{item.name}</td>
            <td class=" text-gray-900 px-6 py-4 whitespace-nowrap text-center">{item.roles[0].name}</td>
            <td class=" text-gray-900 px-6 py-4 whitespace-nowrap text-center">{item.email}</td>
            <td class=" text-gray-900 px-6 py-4 whitespace-nowrap ">
                {/* <button type="button" className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1" onClick={e=>deleteFAQ(e,item.id)}>Hapus</button> */}
                <FormControlLabel
                            control={<Android12Switch checked={Number(item.status)}
                            id={item.id} />}
                            onChange={handleSwitch}
                        />
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
      <Items data={currentItems} handleLoadingStatus={props.handleLoadingStatus} fetchData={props.fetchData} />
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
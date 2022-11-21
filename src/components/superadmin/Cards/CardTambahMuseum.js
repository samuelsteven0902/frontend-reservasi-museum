import axios from "axios";
import React, { useEffect, useState } from "react";
import 'flowbite'
import swal from "sweetalert";
// import React from 'react'
// import TextField from '@material-ui/core/TextField';
// import Autocomplete,
// { createFilterOptions } from '@material-ui/lab/Autocomplete';
// const filter = createFilterOptions();
// import $ from 'jquery';


function CardTambahMuseum() {

const [loading,setLoading] = useState(true)
const [loadingHarga,setLoadingHarga] = useState(true)

const [semuaHarga,setSemuaHarga] = useState()
const [idHarga,setIdHarga] = useState()
const [hargaUpdate,sethargaUpdate] = useState([])

const [harga,setHarga] = useState()

// select and add new museum

const [museum, setMuseum] = useState("");
const [tambahMuseum, setTambahMuseum] = useState("");
const [museumId, setMuseumId] = useState("");

const [input,setInput] = useState({
    museum : museumId,
    
})

const [namaInput, setNamaInput] = useState({
    namaMuseum : 'Pilih Museum',
})


useEffect(() => {
    const fetchMuseum = async ()=>{
        const resMuseum = await axios.get('http://localhost:8000/api/show_museum').then((res)=>{
            setMuseum(res.data.museum);
            console.log(res.data.museum);
        }) 
    }
    fetchMuseum();
}, [])

// set tambah museum
const [tambahData,setTambahData] = useState({
    nama_museum : '',
    nama_kategori : '',
    hari_biasa : '',
    hari_libur : '',
})



const [searchTerm, setSearchTerm] = useState("")


const options = ['One', 'Two', 'Three', 'Four']



useEffect(() => {
  
    axios.get('http://localhost:8000/api/show_museum')
        .then(res=>{setSemuaHarga(res.data.harga);console.log(res); setLoading(false) })
    

    idHarga !== undefined &&  axios.get(`http://localhost:8000/api/edit-harga/${idHarga}`).then(res=>{
        setHarga(res.data.harga[0]);console.log(res.data.harga[0]);setLoadingHarga(false);
    })
    }, [idHarga])

const handleHarga = async(e) =>{
    setIdHarga(...e.target.id)
    console.log(idHarga);

}



const handleInput = (e) => {
    e.persist();
    setHarga({...harga, [e.target.name]: e.target.value });
    console.log(harga);
}

const updateHarga = (e) => {
    // console.log(e.currentTarget[5]);
    e.preventDefault();
    
    // const student_id = props.match.params.id;
    // const data = studentInput;

    const thisClicked = e.currentTarget[5];
    thisClicked.innerText = "Updating";
    const data = {
        biasa: harga.hari_biasa,
        libur: harga.hari_libur,
    }

    axios.put(`http://localhost:8000/api/update-harga/${idHarga}`, data).then(res=>{
        if(res.data.status === 200)
        {
            console.log('berhasil');
            swal("Success",res.data.message,"success").then(e=>
                window.location.reload(false));
            // history.push('/students');
            
        }
        else if(res.data.status === 422)
        {
            // swal("All fields are mandetory","","error");
        }
        else if(res.data.status === 404)
        {
            // swal("Error",res.data.message,"error");
            // history.push('/students');
        }
    });
}

// store museum data

// handle input museum
const handleInputTambahData= (e) =>{
    e.persist();
    setTambahData({...tambahData, [e.target.name]: e.target.value });

}

const handleNamaMuseum = (e) =>{
    console.log(e.currentTarget.value)
}


const storeMuseum = (e) =>{
    e.preventDefault();

    // const thisClicked = e.currentTarget[5];
    // thisClicked.innerText = "Tambah Museum";
    const data = {
        nama_museum : tambahMuseum
    }
    console.log(tambahMuseum)

    axios.post(`http://localhost:8000/api/add_museum`, data).then(res=>{
        if(res.data.status === 200)
        {
            swal("Success",res.data.message,"success").then(e=>
                window.location.reload(false));
            
        }
        else if(res.data.status === 205)
        {
            swal("Tidak bisa menambahkan Museum",res.data.message,"info");
        }
    });
}

//send to api
const storeData = (e) => {
    e.preventDefault();

    const thisClicked = e.currentTarget[5];
    thisClicked.innerText = "Storing";
    const data = {
        nama: tambahData.nama_museum,
        kategori: tambahData.nama_kategori,
        biasa: tambahData.hari_biasa,
        libur: tambahData.hari_libur,
    }
    console.log(data)

    axios.post(`http://localhost:8000/api/add-museum`, data).then(res=>{
        if(res.data.status === 200)
        {
            console.log('berhasil');
            swal("Success",res.data.message,"success").then(e=>
                window.location.reload(false));
            
        }
        else if(res.data.status === 422)
        {
            swal("All fields are mandetory","","error");
        }
        else if(res.data.status === 404)
        {
            swal("Error",res.data.message,"error");
        }
    });
}
//end

const deleteStudent = (e, id) => {
    e.preventDefault();
    
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";

    axios.delete(`http://localhost:8000/api/hapus-harga/${idHarga}`).then(res=>{
        if(res.data.status === 200)
        {
            swal("Deleted!",res.data.message,"success");
            thisClicked.closest("tr").remove();
        }
        else if(res.data.status === 404)
        {
            swal("Error",res.data.message,"error");
            thisClicked.innerText = "Delete";
        }
    });
}

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


if(loading)
{
    return <h4>Loading Student Data...</h4> 
}
else
{
    var harga_HTMLTABLE = ''

    harga_HTMLTABLE = museum.filter(val=>{
        if(searchTerm == "")
        {
            return val
        }
        else if(val.nama_museum.toLowerCase().includes(searchTerm.toLowerCase()))
        {
            return val
        }
    }).map((item,index)=>{
        return(
            <tr className="bg-white border-b" key={index}>
                    <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">
                        {item.id}
                    </td>
                    <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        {item.nama_museum}
                    </td>
                    
                    <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                    <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal" id={item.id_kategori} data-bs-target="#exampleModalCenteredScrollable" onClick={handleHarga}>
                        Edit
                    </button>


                    <button type="button" className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1" onClick={(e) => deleteStudent(e, item.id)}>Hapus</button>
                    
                    </td>
                    </tr>
        )
    })
}



  return (
  <div className='container relative flex flex-col min-w-0 break-words w-full mb-6  rounded '>
    
    <div className="flex justify-between ">
        <input type='text' className="w-1/3 border-none ring-2 ring-red-300 focus:border-none focus:ring-red-500 focus:ring-2 active:border-none  rounded-lg"  placeholder="Cari nama museum, kategori, harga, ..." onChange={e=>{setSearchTerm(e.target.value)}} /> 
        <button type="button" className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal" data-bs-target="#modalTambahMuseum">Tambah Museum</button>
      </div>

    <div className="flex flex-col " >
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-lg rounded-xl m-2">
                <table  id="table_id" >
                <thead className="border-b bg-white ">
                    <tr className=''>
                    <th scope="col" className="text-xl font-medium text-[#A70B0B] px-6 py-4 text-center ">
                        ID_musuem
                    </th>
                    <th scope="col" className="text-xl font-medium text-[#A70B0B] px-6 py-4 text-center">
                      Nama Museum
                    </th>
                    <th scope="col" className="text-xl font-medium text-[#A70B0B] px-6 py-4 text-center">
                        Aksi
                    </th>
                    </tr>
                </thead>
                <tbody className=''>
                    {harga_HTMLTABLE}
                    
                    <div className="modal fade fixed bg-gray-300 z-50 p-32 px-52 items-center m-auto w-screen bg-opacity-60 top-0 left-0 hidden h-screen outline-none overflow-x-hidden overflow-y-auto " id="exampleModalCenteredScrollable" tabIndex="-1" aria-labelledby="exampleModalCenteredScrollable" aria-modal="true" role="dialog">
                    <div className="modal-dialog w-full h-full my-auto modal-dialog-centered modal-dialog-scrollable relative items-center pointer-events-none px-40">
                        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto my-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                            <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalCenteredScrollableLabel">
                            Modal title
                            </h5>
                            <button type="button"
                            className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        
    
                        </div>
                    </div>
                    </div>
                </tbody>
                </table>
            </div>
            </div>
        </div>
    </div>



                    <div className="modal fade fixed bg-gray-300 z-50 p-32 px-52 items-center m-auto w-screen bg-opacity-60 top-0 left-0 hidden h-screen outline-none overflow-x-hidden overflow-y-auto " id="modalTambahMuseum" tabIndex="-1" aria-labelledby="modalTambahMuseum" aria-modal="true" role="dialog">
                    <div className="modal-dialog w-full h-full my-auto modal-dialog-centered modal-dialog-scrollable relative items-center pointer-events-none px-40">
                        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto my-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                            <h5 className="text-xl font-medium leading-normal text-gray-800" id="Tambahmuseumlabel">
                            Tambah 
                            </h5>
                            <button type="button"
                            className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        
                            <form onSubmit={storeMuseum} >
                                <div className="modal-body relative p-4">
                                    <div className='justify-around md:mt-0 mt-8'>    
                                        <div className="w-96 mb-4  mx-auto md:mt-0 mt-8">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nama_kategori">
                                                Nama Museum
                                            </label>
                                            <input name='nama_kategori'  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nama_kategori" type="text" onChange={e=>setTambahMuseum(e.target.value)}/>
                                            <span className="text-sm text-red-500"></span>
                                        </div>
                                    </div>
                                </div>
        
                                <div
                                    className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                    <button type="button"
                                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                    data-bs-dismiss="modal">
                                    Tutup
                                    </button>
                                    <button type="submit"
                                    className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                                    Tambah Museum
                                    </button>
                                </div>
                            
    
                        </form> 
                        </div>
                    </div>
                    </div>

                

  </div>
  )
}

export default CardTambahMuseum
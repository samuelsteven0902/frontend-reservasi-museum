import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import 'flowbite'
import swal from "sweetalert";
import { BiTrash, BiPencil } from 'react-icons/bi';
import ReactLoading from 'react-loading';
import { min } from "date-fns";
import Cookies from "js-cookie";
// import React from 'react'
// import TextField from '@material-ui/core/TextField';
// import Autocomplete,
// { createFilterOptions } from '@material-ui/lab/Autocomplete';
// const filter = createFilterOptions();
// import $ from 'jquery';


function CardTambahKategori() {

const [loading,setLoading] = useState(true)
const [loadingkategori,setLoadingkategori] = useState(true)

const [semuaHarga,setSemuaHarga] = useState()
const [idkategori,setIdkategori] = useState()
const [hargaUpdate,sethargaUpdate] = useState([])

const [harga,setHarga] = useState()
const [namakategori, setNamakategori] = useState("loading...")

// select and add new kategori

const [kategori, setkategori] = useState("");
const [tambahkategori, setTambahkategori] = useState({
    nama_kategori: '',
    min: '',
    max: '',
});
const [kategoriId, setkategoriId] = useState("");

const [input,setInput] = useState({
    kategori : kategoriId,
    
})

const [namaInput, setNamaInput] = useState({
    namakategori : 'Pilih kategori',
})


const fetchkategori = async ()=>{
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/show_kategori`).then((res)=>{
        setkategori(res.data.kategori);
        // console.log(res.data.kategori);
    }) 
}
useEffect(() => {
    fetchkategori();
}, [])


const [searchTerm, setSearchTerm] = useState("")

const CloseRef = useRef();

useEffect(() => {

    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/show_kategori`)
        .then(res=>{setSemuaHarga(res.data.harga);console.log(res); 
            setLoading(false)
        })
    }, [idkategori])

const handlekategori = async(e) =>{ 
    setNamakategori({
        nama_kategori: 'loading...',
        min: '',
        max: '',
    })
    console.log(e.target.id);
    // e.target.reset();
    setIdkategori(e.target.id)
    
     axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/edit_kategori/${e.target.id}`).then(res=>{
         setNamakategori(res.data.kategori)
         setLoadingkategori(false);
        })
    }
    console.log(namakategori);

const handleEdit = (e) => {
    e.persist();
    // setNamakategori(e.target.value)
    setHarga({...harga, [e.target.name]: e.target.value });
}

const handleInput = (e) => {
    e.persist();
    setNamakategori({...namakategori, [e.target.name]: e.target.value });
    console.log(namakategori.nama_kategori  );
}

const updatekategori = (e) => {
    // console.log(e.currentTarget[5]);
    e.preventDefault();
    
    // const idkategori = idkategori;
    // const data = studentInput;

    // const thisClicked = e.currentTarget[5];
    // thisClicked.innerText = "Updating";
    const data = {
        kategori: namakategori.nama_kategori,
        min:namakategori.min,
        max:namakategori.max,
    }
    console.log(data,idkategori);

    axios.put(`${process.env.REACT_APP_API_ENDPOINT}/api/update_kategori/${idkategori}`, data, {
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        }}).then(res=>{
        if(res.data.status === 200)
        {
            // console.log('berhasil');
            swal("Success",res.data.message,"success")
            fetchkategori();
            CloseRef.current.click();
            setTambahkategori({
                nama_kategori: '',
                min: '',
                max: '',
            })
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

// store kategori data
const handleNamakategori = (e) =>{
    console.log(e.currentTarget.value)
}


const storekategori = (e) =>{
    e.preventDefault();

    // const thisClicked = e.currentTarget[5];
    // thisClicked.innerText = "Tambah kategori";
    const data = {
        nama_kategori : tambahkategori.nama_kategori,
        min : tambahkategori.min,
        max : tambahkategori.max,
    }
    console.log(tambahkategori)

    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/add_kategori`, data, {
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        }}).then(res=>{
        if(res.data.status === 200)
        {
            setTambahkategori({
                nama_kategori: '',
                min: '',
                max: '',
            })
            fetchkategori();
            swal("Success",res.data.message,"success")
            CloseRef.current.click();
            
        }
        else if(res.data.status === 205)
        {
            swal("Tidak bisa menambahkan kategori",res.data.message,"info");
        }
    });
}

const deletekategori = (e, id) => {
    e.preventDefault();
    
    // const thisClicked = e.currentTarget;
    // thisClicked.innerText = "Deleting";
    
console.log(e,id);

    swal({
        title: "Anda Yakin menghapus kategori ?",
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
                    // console.log('berhasil delet');
                    swal("Deleted!",res.data.message,"success")
                        fetchkategori();
                    // thisClicked.closest("tr").remove();
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
    var harga_HTMLTABLE = 
        <tr className="bg-white border-b" >
            <td colspan={3} className="text-xl text-center justify-center font-semibold py-5">
                <ReactLoading type={"spin"} color={"red"} height={'5%'} width={'5%'} className="m-auto" />
            </td>
        </tr>
}
else
{
    var harga_HTMLTABLE = ''

    harga_HTMLTABLE = kategori.filter(val=>{
        if(searchTerm == "")
        {
            return val
        }
        else if(val.nama_kategori.toLowerCase().includes(searchTerm.toLowerCase()))
        {
            return val
        }
    }).map((item,index)=>{
        return(
            <tr className="bg-white border-b" key={index}>
                <td  className=" text-gray-900 px-6 py-4 whitespace-nowrap">
                    {item.id}
                </td>
                <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">
                    {item.nama_kategori}
                </td>
                <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">
                    {item.min}
                </td>
                <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">
                    {item.max}
                </td>
                <td className=" text-gray-900 flex px-6 py-4 whitespace-nowrap">
                    <button type="button" className=" text-white ml-4 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-4 py-1.5 flex text-center mr-2 mb-2 align-middle items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 " data-bs-toggle="modal" id={item.id} data-bs-target="#Editkategori" onClick={handlekategori}>
                    <BiPencil className="mr-1"/>Edit</button>
                    <button type="button" className="text-white ml-4 bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded text-sm px-4 py-1.5 flex text-center mr-2 mb-2 items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={e=>deletekategori(e,item.id)}>
                    <BiTrash  className="mr-1"/>Hapus</button>
                </td>
            </tr>
        )
    })
}

return (
    <div className='container relative flex flex-col min-w-0 break-words w-full mb-6  rounded '>
        <div className="flex justify-between ">
        <input type='text' className="w-1/3 border-none ring-2 font-nunito ring-red-300 focus:border-none focus:ring-red-500 focus:ring-2 active:border-none  rounded-lg"  placeholder="Cari nama kategori, kategori, harga, ..." onChange={e=>{setSearchTerm(e.target.value)}} /> 
        <button type="button" className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal" data-bs-target="#modalTambahkategori">Tambah kategori</button>
    </div>

    <div className="flex flex-col " >
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden  shadow-lg rounded-xl m-2">
                <table  id="table_id" className="rounded-xl shadow-xl w-full" >
                <thead className="border-b bg-white ">
                    <tr className=''>
                    <th scope="col" className="text-xl w-12 font-nunito font-semibold text-[#A70B0B] px-6 py-4 text-center ">
                        ID
                    </th>
                    <th scope="col" className="text-xl font-nunito font-semibold text-[#A70B0B]  px-6 py-4 text-left">
                        Nama kategori
                    </th>
                    <th scope="col" className="text-xl font-nunito font-semibold text-[#A70B0B]  px-6 py-4 text-left">
                        Min
                    </th>
                    <th scope="col" className="text-xl font-nunito font-semibold text-[#A70B0B]  px-6 py-4 text-left">
                        Max
                    </th>
                    <th scope="col" className="text-xl w-72 font-nunito font-semibold text-[#A70B0B] px-6 py-4 text-">
                        Aksi
                    </th>
                    </tr>
                </thead>
                <tbody className=''>
                    {harga_HTMLTABLE}
                    
                    <div className="modal fade fixed bg-gray-300    py-12   mx-auto items-center m-auto w-screen bg-opacity-60 top-0 left-0 hidden h-screen outline-none overflow-x-hidden overflow-y-auto" id="Editkategori" tabIndex="-1" aria-labelledby="Editkategori" aria-modal="true" role="dialog">
                    <div className="modal-dialog w-11/12 justify-center md:w-1/2  px-0 sm:px-12 mx-auto  h-full  my-auto modal-dialog-centered modal-dialog-scrollable relative items-center pointer-events-none lg:w-1/3" >
                        <div className="modal-content border-none shadow-lg relative flex flex-col sm:w-full sm:min-w-max pointer-events-auto my-auto bg-white  bg-clip-padding rounded-md outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                            <h5 className="text-xl font-nunito font-semibold leading-normal text-gray-800" id="EditkategoriLabel">
                            Edit kategori
                            </h5>
                            <button type="button"
                            className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {loadingkategori?
                        
                        <form id="formUpdate" onSubmit={updatekategori} >
                                <div className="modal-body relative p-4">
                                    <div className='justify-around md:mt-0 mt-8'>    
                                        <div className="w-96 mb-4 mx-auto md:mt-0 mt-8">
                                            <label className="block text-gray-700 text-sm font-nunito font-semibold mb-2" htmlFor="nama_kategori">
                                                Nama kategori
                                            </label>
                                            <input 
                                            value="loading data..."
                                            name='nama_kategori'  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nama_kategori" type="text" onChange={e=>setTambahkategori(e.target.value)}/>
                                            <span className="text-sm text-red-500"></span>
                                        </div>
                                        <div className="flex">
                                            <div className="w-20 mb-4  mx-auto md:mt-0 mt-8">
                                                <label className="block text-gray-700 text-sm font-nunito font-semibold mb-2" htmlFor="min">
                                                    Min
                                                </label>
                                                <input name='nama_kategori' value={namakategori.min} className="shadow appearance-none border rounded-full  w-20 sm:w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nama_kategori" type="number" onChange={e=>setTambahkategori({...tambahkategori, min:e.target.value})}/>
                                                <span className="text-sm text-red-500"></span>
                                            </div>
                                            <div className="w-20 mb-4  mx-auto md:mt-0 mt-8">
                                                <label className="block text-gray-700 text-sm font-nunito font-semibold mb-2" htmlFor="max">
                                                    Max
                                                </label>
                                                <input name='nama_kategori' value={namakategori.max} className="shadow appearance-none border rounded-full  w-20 sm:w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nama_kategori" type="number" onChange={e=>setTambahkategori({...tambahkategori, max:e.target.value})}/>
                                                <span className="text-sm text-red-500"></span>
                                            </div>
                                            </div>
                                    </div>
                                </div>
        
                                <div
                                    className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                    <button type="button"
                                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                    data-bs-dismiss="modal" >
                                    Tutup
                                    </button>
                                    <button type="submit"
                                    className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                                    Edit kategori
                                    </button>
                                </div>
                        </form> 
                        :
                        
                        <form  id="formUpdate" onSubmit={updatekategori}>
                                <div className="modal-body relative p-4">
                                    <div className='justify-around md:mt-0 mt-8'>    
                                        <div className="w-96 mb-4  mx-auto md:mt-0 mt-8">
                                            <label className="block text-gray-700 text-sm font-nunito font-semibold mb-2" htmlFor="nama_kategori">
                                                Nama kategori
                                            </label>
                                            <input  onChange={handleInput}
                                            name='nama_kategori'  className="shadow appearance-none border rounded-full w-72 sm:w-full mx-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nama_kategori" type="text" 
                                            value={namakategori.nama_kategori}/>
                                            <span className="text-sm text-red-500"></span>
                                            <div className="flex">
                                            <div className="w-20 mb-4  mx-auto md:mt-0 mt-8">
                                                <label className="block text-gray-700 text-sm font-nunito font-semibold mb-2" htmlFor="min">
                                                    Min
                                                </label>
                                                <input name='min' value={namakategori.min} className="shadow appearance-none border rounded-full  w-20 sm:w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="min" type="number" onChange={handleInput}/>
                                                <span className="text-sm text-red-500"></span>
                                            </div>
                                            <div className="w-20 mb-4  mx-auto md:mt-0 mt-8">
                                                <label className="block text-gray-700 text-sm font-nunito font-semibold mb-2" htmlFor="max">
                                                    Max
                                                </label>
                                                <input name='max' value={namakategori.max} className="shadow appearance-none border rounded-full  w-20 sm:w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="max" type="number" onChange={handleInput}/>
                                                <span className="text-sm text-red-500"></span>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
        
                                <div
                                    className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                    <button type="button"
                                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                    data-bs-dismiss="modal"
                                    ref={CloseRef} >
                                    Tutup
                                    </button>
                                    <button type="submit"
                                    className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                                    Edit kategori
                                    </button>
                                </div>
                        </form> }
                        </div>
                    </div>
                    </div>
                </tbody>
                </table>
            </div>
            </div>
        </div>
    </div>

                <div  className="modal fade fixed bg-gray-300    py-12   mx-auto items-center m-auto w-screen bg-opacity-60 top-0 left-0 hidden h-screen outline-none overflow-x-hidden overflow-y-auto" id="modalTambahkategori" tabIndex="-1" aria-labelledby="modalTambahkategori" aria-modal="true" role="dialog">
                    <div className="modal-dialog w-11/12 justify-center md:w-1/2  px-0 sm:px-12 mx-auto  h-full  my-auto modal-dialog-centered modal-dialog-scrollable relative items-center pointer-events-none lg:w-1/3" >
                        <div className="modal-content border-none shadow-lg relative flex flex-col sm:w-full sm:min-w-max pointer-events-auto my-auto bg-white  bg-clip-padding rounded-md outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                            <h5 className="text-xl font-nunito font-semibold leading-normal text-gray-800" id="Tambahkategorilabel">
                            Tambah kategori
                            </h5>
                            <button type="button"
                            className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        
                            <form onSubmit={storekategori} >
                                <div className="modal-body relative p-4">
                                    <div className='justify-around md:mt-0 mt-8'>    
                                        <div className="w-96 mb-4  mx-auto md:mt-0 mt-8">
                                            <label className="block text-gray-700 text-sm font-nunito font-semibold mb-2" htmlFor="nama_kategori">
                                                Nama kategori
                                            </label>
                                            <input name='nama_kategori' value={tambahkategori.nama_kategori} className="shadow appearance-none border rounded-full  w-72 sm:w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nama_kategori" type="text" onChange={e=>setTambahkategori({...tambahkategori, nama_kategori:e.target.value})}/>
                                            <span className="text-sm text-red-500"></span>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-20 mb-4  mx-auto md:mt-0 mt-8">
                                            <label className="block text-gray-700 text-sm font-nunito font-semibold mb-2" htmlFor="min">
                                                Min
                                            </label>
                                            <input name='nama_kategori' value={tambahkategori.min} className="shadow appearance-none border rounded-full  w-20 sm:w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nama_kategori" type="number" onChange={e=>setTambahkategori({...tambahkategori, min:e.target.value})}/>
                                            <span className="text-sm text-red-500"></span>
                                        </div>
                                        <div className="w-20 mb-4  mx-auto md:mt-0 mt-8">
                                            <label className="block text-gray-700 text-sm font-nunito font-semibold mb-2" htmlFor="max">
                                                Max
                                            </label>
                                            <input name='nama_kategori' value={tambahkategori.max} className="shadow appearance-none border rounded-full  w-20 sm:w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nama_kategori" type="number" onChange={e=>setTambahkategori({...tambahkategori, max:e.target.value})}/>
                                            <span className="text-sm text-red-500"></span>
                                        </div>
                                    </div>
                                </div>
        
                                <div
                                    className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                    <button type="button"
                                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                    data-bs-dismiss="modal"
                                    ref={CloseRef}
                                    >
                                    Tutup
                                    </button> 
                                    <button type="submit"
                                    className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                                    Tambah kategori
                                    </button>
                                </div>    
                        </form> 
                        </div>
                    </div>
                    </div>
        </div>
    )
}

export default CardTambahKategori
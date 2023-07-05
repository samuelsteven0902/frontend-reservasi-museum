import axios from "axios";
import React, { useEffect, useState } from "react";
import 'flowbite';
import swal from "sweetalert";
import PaginationTiketNew from "./PaginationTiketNew";
import { useRef } from "react"; 
import ReactLoading from 'react-loading'; 
import Cookies from "js-cookie"; 
import {Modal, Ripple, initTE,} from "tw-elements";

function CardMasterTiketcopy() {

// loading harga
const [loading,setLoading] = useState(true)

//modal
const [semuaHarga,setSemuaHarga] = useState([])

initTE({ Modal, Ripple });
// select and add new museum
const [museum, setMuseum] = useState("");
const [museumId, setMuseumId] = useState("");

// close
const CloseRef = useRef(null);
const CloseEdit = useRef(null);

const [input,setInput] = useState({
    museum : museumId,
    
})


const [namaInput, setNamaInput] = useState({
    namaMuseum : 'Pilih Museum',
})

useEffect(() => {
    const fetchMuseum = async ()=>{
        const resMuseum = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/show_museum`).then((res)=>{
            setMuseum(res.data.museum);
            console.log(res.data.museum);
        }) 
    }
    fetchMuseum();
}, [])

// set tambah museum
const [tambahMuseum,setTambahMuseum] = useState({
    id_museum : '',
    nama_kategori : '',
    nama_kategori_en : '',
    hari_biasa : '',
    hari_libur : '',
    min : '',
    max : '',
})

const [searchTerm, setSearchTerm] = useState("")

const fetchHarga = () =>{
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/show_kategori` , {
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
        }}).then(res=>{setSemuaHarga(res.data.kategori);
    console.log(res); 
    setLoading(false) 
})
}

useEffect(() => {
    fetchHarga();
    }, [])

const handleHarga = (e,item) =>{
    setTambahMuseum(item)
    console.log(item);
}

const handleInput = (e) => {
    e.persist();
    console.log(e.target.value);
    setTambahMuseum({...tambahMuseum, [e.target.name]: e.target.value });
}

const updateHarga = (e) => {
    e.preventDefault();
    const thisClicked = e.currentTarget[5];
    thisClicked.innerText = "Updating";
    const data = {
        nama_kategori:tambahMuseum.nama_kategori,
        nama_kategori_en:tambahMuseum.nama_kategori_en,
        hari_biasa: tambahMuseum.hari_biasa,
        hari_libur: tambahMuseum.hari_libur,
        min: tambahMuseum.min,
        max: tambahMuseum.max,
    }


    axios.put(`${process.env.REACT_APP_API_ENDPOINT}/api/update_kategori/${tambahMuseum.id}`, data, {
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
        }}).then(res=>{
            console.log(res);
        if(res.data.status === 200){
            fetchHarga();
            thisClicked.innerText = "Close"
            CloseEdit.current.click();
            setTambahMuseum({
                id_museum : '',
                nama_kategori : '',
                nama_kategori_en : '',
                hari_biasa : '',
                hari_libur : '',
                min : '',
                max : '',
            })
            swal("Success",res.data.message,"success")
        }
        else if(res.data.status === 422){
            swal("Error",res.data.message,"error")
        }
        else if(res.data.status === 404){
            swal("Error","Error","error");
        }
    });
}

// handle input museum
const handleInputTambahMuseum= (e) =>{
    e.persist();
    setTambahMuseum({...tambahMuseum, [e.target.name]: e.target.value });
}
console.log(tambahMuseum);

//send to api
const storeMuseum = (e) => {
    e.preventDefault();
    console.log(e.currentTarget);
    const thisClicked = e.currentTarget[5];
    thisClicked.innerText = "Storing";
    const data = {
        id_museum: tambahMuseum.id_museum,
        kategori: tambahMuseum.nama_kategori,
        kategori_en: tambahMuseum.nama_kategori_en,
        biasa: tambahMuseum.hari_biasa,
        libur: tambahMuseum.hari_libur,
        min: tambahMuseum.min,
        max: tambahMuseum.max,
    }
    console.log(data)

    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/add_kategori`, data, {
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
        }}).then(res=>{
        if(res.data.status === 200) {
            console.log('berhasil');
            swal("Success",res.data.message,"success")
            thisClicked.innerText = "Close";
            setTambahMuseum({
                id_museum : '',
                nama_kategori : '',
                nama_kategori_en : '',
                hari_biasa : '',
                hari_libur : '',
                min : '',
                max : '',
            })
            CloseRef.current.click();
            fetchHarga();
        }
        else if(res.data.status === 422) {
            swal("All fields are mandetory",res.data.message    ,"error");
        }
        else if(res.data.status === 404) {
            swal("Error",res.data.message,"error");
        }
    });
}
//end


var htmlKategori = ''
if(loading) {
    htmlKategori = <tr className="bg-white border-b" >
                        <td colspan={9} className="text-xl text-center justify-center font-semibold py-5">
                            <ReactLoading type={"spin"} color={"red"} height={'5%'} width={'5%'} className="m-auto" />
                        </td>
                    </tr>
}
else {
    htmlKategori = <PaginationTiketNew data={semuaHarga} searchTerm={searchTerm} fetchHarga={fetchHarga} updateHarga={(e,item)=>handleHarga(e,item)}  />
}

return (
    <div className='container relative flex flex-col min-w-0 break-words w-full mb-6 rounded'>
        {/* search bar */}
        <div className="my-2 w-72">
            <input type='text' className="w-full border-none ring-2 ring-red-300 focus:border-none focus:ring-red-500 focus:ring-2 active:border-none  rounded-lg"  placeholder="Cari nama museum, kategori, harga, ..." onChange={e=>{setSearchTerm(e.target.value)}} /> 
        </div>
        <div className="flex flex-col">
            <div className="overflow-x-auto  sm:-mx-6 lg:-mx-8">
                <div className=" `py-2 inline-block w-full sm:px-6 lg:px-8">
                <div className=" rounded-xl m-2">
                    <table className="w-full shadow-lg rounded-xl">
                    {/* table header */}
                    <thead className="border-b bg-white ">
                        <tr className=''>
                        <th scope="col" className="text-xl font-nunito text-[#A70B0B] px-6 py-4 text-center">No</th>
                        <th scope="col" className="text-xl font-nunito text-[#A70B0B] px-6 py-4 text-center">Museum</th>
                        <th scope="col" className="text-xl font-nunito text-[#A70B0B] px-6 py-4 text-center">Kategori</th>
                        <th scope="col" className="text-xl font-nunito text-[#A70B0B] px-6 py-4 text-center">Category (Inggris)</th>
                        <th scope="col" className="text-xl font-nunito text-[#A70B0B] px-6 py-4 text-center">Harga Hari Biasa</th>
                        <th scope="col" className="text-xl font-nunito text-[#A70B0B] px-6 py-4 text-center">Harga Hari Libur</th>
                        <th scope="col" className="text-xl font-nunito text-[#A70B0B] px-6 py-4 text-center">Min</th>
                        <th scope="col" className="text-xl font-nunito text-[#A70B0B] px-6 py-4 text-center">Max</th>
                        <th scope="col" className="text-xl font-nunito text-[#A70B0B] px-6 py-4 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                    {htmlKategori}
                    {/* modal update kategori */}
                    <div data-te-modal-init className="modal fade fixed bg-gray-300 z-[5000] p-32 px-52 items-center m-auto w-screen bg-opacity-60 top-0 left-0 hidden h-screen outline-none overflow-x-hidden overflow-y-auto " id="exampleModalCenteredScrollable" tabIndex="-1" aria-modal="true">
                        <div data-te-modal-dialog-ref className="modal-dialog w-full h-full my-auto modal-dialog-centered modal-dialog-scrollable relative items-center pointer-events-none px-40">
                            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto my-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                                <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                                    <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalCenteredScrollableLabel">Update Kategori</h5>
                                    <button type="button" className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline" data-te-modal-dismiss="modal" aria-label="Close" ref={CloseEdit}></button>
                                </div>
                                {/* loading modal update*/}
                                <div data-te-modal-body-ref>
                               

                                <form onSubmit={updateHarga}>
                                {/* modal update kategori */}
                                <div className="modal-body relative p-4">
                                    <div className='justify-around md:mt-z0 mt-8'>    
                                        <div className="w-96 mb-4 mx-auto">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" for="id_museum">Nama Museum</label>
                                            <input name='id_museum' className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-not-allowed bg-gray-200" id="id_museum" type="text" value={tambahMuseum.nama_museum} disabled={true}/>
                                            <span className="text-sm text-red-500"></span>
                                        </div>
                                        <div className="w-96 mb-4 mx-auto md:mt-0 mt-8 flex">
                                            <div className="w-1/2 pr-3">
                                                <label className="block text-gray-700 text-sm font-bold mb-2" for="nama_kategori">Nama Kategori</label>
                                                <input name='nama_kategori' onChange={handleInput} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nama_kategori" type="text" value={tambahMuseum.nama_kategori}/>
                                                <span className="text-sm text-red-500"></span>
                                            </div>
                                            <div className="w-1/2">
                                                <label className="block text-gray-700 text-sm font-bold mb-2" for="nama_kategori_en">Category Name (Inggris)</label>
                                                <input name='nama_kategori_en' onChange={handleInput} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nama_kategori_en" type="text" value={tambahMuseum.nama_kategori_en}/>
                                                <span className="text-sm text-red-500"></span>
                                            </div>
                                        </div>
                                        <div className="w-96 mb-4 mx-auto md:mt-0 mt-8">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" for="hari_biasa"> Hari Biasa</label>
                                            <input name='hari_biasa' onChange={handleInput} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="hari_biasa" type="number" value={tambahMuseum.hari_biasa} />
                                            <span className="text-sm text-red-500"></span>
                                        </div>
                                        <div className="w-96 mb-4  mx-auto md:mt-0 mt-8">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" for="hari_libur">Hari Libur</label>
                                            <input name='hari_libur' onChange={handleInput} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="hari_libur" type="number" value={tambahMuseum.hari_libur} />
                                            <span className="text-sm text-red-500"></span>
                                        </div>
                                        <div className="w-96 mb-4 flex justify-around mx-auto md:mt-0 mt-8">
                                            <div className="w-2/5">
                                            <label className="w-3/4 block text-gray-700 text-sm font-bold mb-2" for="min">Minimal</label>
                                                <input name='min' className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="min" type="number" onChange={handleInput} value={tambahMuseum.min}/>
                                                <span className="text-sm text-red-500"></span>
                                            </div>
                                            <div className="w-2/5">
                                                <label className="block text-gray-700 text-sm font-bold mb-2" for="max">Maksimal</label>
                                                <input name='max' className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="max" type="number" onChange={handleInput} value={tambahMuseum.max}/>
                                                <span className="text-sm text-red-500"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                    <button type="button" ref={CloseEdit} className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-te-modal-dismiss="modal" aria-label="Close"  >Close</button>
                                    <button type="submit" className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1">Save changes</button>
                                </div>
                                </form>
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

        {/* button tambah kategori */}
        <button type="button" class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"  data-te-toggle="modal" data-te-target="#modaltambahMuseum">Tambah Kategori</button>
        
            <div data-te-modal-init className="modal fade fixed bg-gray-300 sm:p-32 sm:px-52 items-center m-auto w-screen bg-opacity-60 top-0 left-0 hidden h-screen outline-none overflow-x-hidden overflow-y-auto z-[1055]" id="modaltambahMuseum" tabIndex="-1" aria-labelledby="Tambahmuseumlabel" aria-hidden="true" >
                <div data-te-modal-dialog-ref className="modal-dialog w-full h-full my-auto modal-dialog-centered modal-dialog-scrollable relative items-center pointer-events-none px-40">
                    <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto my-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md"
                        id="Tambahmuseumlabel">
                            <h5 className="text-xl font-medium leading-normal text-gray-800">Tambah Kategori</h5>
                            <button type="button" className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline" data-te-modal-dismiss="modal" ref={CloseRef} ></button>
                        </div>

                        {/* tabel master tiket */}
                        <div data-te-modal-body-ref>
                            <form onSubmit={storeMuseum} data-te-modal-body-ref>
                                <div className="modal-body relative p-4">
                                    <div className='justify-around md:mt-0 mt-8'>    
                                        <div className="w-96 mb-4 mx-auto ">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" for="nama_museum">Nama Museum</label>
                                            <select id='museum' value={input.namaMuseum} className="block appearance-none w-full p-2.5 bg-white text-center border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" 
                                                onChange={(e) => {
                                                    const index = e.target.selectedIndex;
                                                    const el = e.target.childNodes[index]
                                                    const option =  el.getAttribute('id'); 
                                                    const selectedMuseum = e.target.value;
                                                    setTambahMuseum({...tambahMuseum, id_museum: e.target.value });
                                                    setMuseumId(option)
                                                    setInput({...input,namaMuseum:option})
                                                    console.log({selectedMuseum,input,museumId});}}>
                                                <option>{namaInput.namaMuseum}</option>
                                                {museum && museum.map((item,index) =>{
                                                    return(<option className='py-6 my-6  h-32' key={index} id={item.id} value={item.id}>{item.nama_museum}</option>)})}
                                            </select>
                                            <span className="text-sm text-red-500"></span>
                                        </div>
                                        <div className="w-96 mb-4 mx-auto md:mt-0 mt-8 flex">
                                            <div className="w-1/2 pr-2">
                                                <label className="block text-gray-700 text-sm font-bold mb-2" for="nama_kategori"> Nama Kategori</label>
                                                <input name='nama_kategori'  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nama_kategori" type="text" onChange={handleInputTambahMuseum}/>
                                                <span className="text-sm text-red-500"></span>
                                            </div>
                                            <div className="w-1/2">
                                                <label className="block text-gray-700 text-sm font-bold mb-2" for="nama_kategori_en">Category Name (Inggris)</label>
                                                <input name='nama_kategori_en'  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nama_kategori_en" type="text" onChange={handleInputTambahMuseum}/>
                                                <span className="text-sm text-red-500"></span>
                                            </div>
                                        </div>
                                        <div className="w-96 mb-4 mx-auto md:mt-0 mt-8">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" for="hari_biasa">Harga Hari Biasa</label>
                                            <input name='hari_biasa' className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="hari_biasa" type="number" onChange={handleInputTambahMuseum}/>
                                            <span className="text-sm text-red-500"></span>
                                        </div>
                                        <div className="w-96 mb-4 mx-auto md:mt-0 mt-8">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" for="hari_libur">Hari Libur</label>
                                            <input name='hari_libur' className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="hari_libur" type="number" onChange={handleInputTambahMuseum}/>
                                            <span className="text-sm text-red-500"></span>
                                        </div>
                                        <div className="w-96 mb-4 flex justify-around mx-auto md:mt-0 mt-8">
                                            <div className="w-2/5">
                                                <label className="w-3/4 block text-gray-700 text-sm font-bold mb-2" for="min">Minimal</label>
                                                <input name='min' className=" shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="min" type="number" onChange={handleInputTambahMuseum}/>
                                                <span className="text-sm text-red-500"></span>
                                            </div>
                                            <div className="w-2/5">
                                                <label className="block text-gray-700 text-sm font-bold mb-2" for="max">Maksimal</label>
                                                <input name='max' className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="max" type="number" onChange={handleInputTambahMuseum}/>
                                                <span className="text-sm text-red-500"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                    <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                    data-te-modal-dismiss="modal" ref={CloseRef} >Close</button>
                                    <button type="submit"className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1">Save Changes</button>
                                </div>
                            </form> 
                        </div>
                    </div>
                </div>
            </div>
    </div>
    )
}

export default CardMasterTiketcopy
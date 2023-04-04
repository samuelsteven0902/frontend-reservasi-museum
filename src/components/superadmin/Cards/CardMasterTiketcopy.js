import axios from "axios";
import React, { useEffect, useState } from "react";
import 'flowbite'
import swal from "sweetalert";
// import $ from 'jquery';


function CardMasterTiketcopy() {

const [loading,setLoading] = useState(true)
const [loadingHarga,setLoadingHarga] = useState(true)

const [semuaHarga,setSemuaHarga] = useState()
const [idHarga,setIdHarga] = useState()
const [hargaUpdate,sethargaUpdate] = useState([])

const [harga,setHarga] = useState()

// select and add new museum
const [museum, setMuseum] = useState("");
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
const [tambahMuseum,setTambahMuseum] = useState({
    nama_museum : '',
    nama_kategori : '',
    hari_biasa : '',
    hari_libur : '',
})



const [searchTerm, setSearchTerm] = useState("")

// $(document).ready( function () {
//     $('#table_id').DataTable();
// } );



// console.log(semuaHarga);



useEffect(() => {
  
    axios.get('http://localhost:8000/api/show_harga')
        .then(res=>{setSemuaHarga(res.data.harga);console.log(res); setLoading(false) })
      
        console.log(idHarga);

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
const handleInputTambahMuseum= (e) =>{
    e.persist();
    setTambahMuseum({...tambahMuseum, [e.target.name]: e.target.value });

}

//send to api
const storeMuseum = (e) => {
    e.preventDefault();

    const thisClicked = e.currentTarget[5];
    thisClicked.innerText = "Storing";
    const data = {
        nama: tambahMuseum.nama_museum,
        kategori: tambahMuseum.nama_kategori,
        biasa: tambahMuseum.hari_biasa,
        libur: tambahMuseum.hari_libur,
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

    harga_HTMLTABLE = semuaHarga.filter(val=>{
        if(searchTerm == "")
        {
            return val
        }
        else if(val.nama_museum.toLowerCase().includes(searchTerm.toLowerCase()) ||
                val.nama_kategori.toLowerCase().includes(searchTerm.toLowerCase()))
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
                        {getFirstLetters(item.nama_museum)}
                    </td>
                    <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        {item.nama_kategori}
                    </td>
                    <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        {rupiah(item.hari_biasa)}
                    </td>
                    <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        {rupiah(item.hari_libur)}
                    </td>
                    <td className=" text-gray-900 px-6 py-4 whitespace-nowrap ">
                     
                    
                    <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal" id={item.id_kategori} data-bs-target="#exampleModalCenteredScrollable" onClick={handleHarga}>
                        Edit
                    </button>


                    {/* <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={(e) => deleteStudent(e, item.id)}>Hapus</button> */}
                    
                    </td>
                    </tr>
        )
    })
}




  return (
  <div className='container relative flex flex-col min-w-0 break-words w-full mb-6  rounded '>
    
    <div className="my-2  w-72">
        <input type='text' className="w-full border-none ring-2 ring-red-300 focus:border-none focus:ring-red-500 focus:ring-2 active:border-none  rounded-lg"  placeholder="Cari nama museum, kategori, harga, ..." onChange={e=>{setSearchTerm(e.target.value)}} /> 
      </div>

    <div className="flex flex-col " >
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-lg rounded-xl m-2">
                <table  id="table_id" >
                <thead className="border-b bg-white ">
                    <tr className=''>
                    <th scope="col" className="text-xl font-medium text-[#A70B0B] px-6 py-4 text-center ">
                        No
                    </th>
                    <th scope="col" className="text-xl font-medium text-[#A70B0B] px-6 py-4 text-center">
                        Museum
                    </th>
                    <th scope="col" className="text-xl font-medium text-[#A70B0B] px-6 py-4 text-center">
                        Kategori
                    </th>
                    <th scope="col" className="text-xl font-medium text-[#A70B0B] px-6 py-4 text-center">
                        Harga Hari Biasa
                    </th>
                    <th scope="col" className="text-xl font-medium text-[#A70B0B] px-6 py-4 text-center">
                        Harga Hari Libur
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
                        
                      {loadingHarga?
                             <form onSubmit={updateHarga} >
                             <div className="modal-body relative p-4">
                                 <div className='justify-around md:mt-0 mt-8'>    
                                     <div className="w-96 mb-4 mx-auto ">
                                         <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                                             Nama Museum
                                         </label>
                                         <input name='phone'  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 cursor-not-allowed" id="username" type="text" value="Loading Harga Data..." disabled={true} />
                                         <span className="text-sm text-red-500"></span>
                                     </div>
                                     <div className="w-96 mb-4  mx-auto md:mt-0 mt-8">
                                         <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                                             Harga Nama Kategori
                                         </label>
                                         <input name='jumlah'  className="shadow appearance-none bg-gray-200 cursor-not-allowed border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" value="Loading Harga Data..." disabled={true}/>
                                         <span className="text-sm text-red-500"></span>
                                     </div>
                                     <div className="w-96 mb-4  mx-auto md:mt-0 mt-8">
                                         <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                                             Harga Hari Biasa
                                         </label>
                                         <input name='hari_biasa' onChange={handleInput}  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value="Loading Harga Data..." />
                                         <span className="text-sm text-red-500"></span>
                                     </div>
                                     <div className="w-96 mb-4  mx-auto md:mt-0 mt-8">
                                         <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                                             Hari Libur
                                         </label>
                                         <input name='hari_libur' onChange={handleInput}  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value="Loading Harga Data..." />
                                         <span className="text-sm text-red-500"></span>
                                     </div>
                                 </div>
                             </div>
     
                             <div
                                 className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                 <button type="button"
                                 className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                                 data-bs-dismiss="modal">
                                 Close
                                 </button>
                                 <button type="submit"
                                 className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1" id="idSave">
                                 Save changes
                                 </button>
                             </div>
                             
                         </form>:
                            <form onSubmit={updateHarga} >
                            <div className="modal-body relative p-4">
                                <div className='justify-around md:mt-0 mt-8'>    
                                    <div className="w-96 mb-4 mx-auto ">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                                            Nama Museum
                                        </label>
                                        <input name='phone'  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 cursor-not-allowed" id="username" type="text" value={harga.nama_museum} disabled={true} />
                                        <span className="text-sm text-red-500"></span>
                                    </div>
                                    <div className="w-96 mb-4  mx-auto md:mt-0 mt-8">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                                            Harga Nama Kategori
                                        </label>
                                        <input name='jumlah'  className="shadow appearance-none bg-gray-200 cursor-not-allowed border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" value={harga.nama_kategori} disabled={true}/>
                                        <span className="text-sm text-red-500"></span>
                                    </div>
                                    <div className="w-96 mb-4  mx-auto md:mt-0 mt-8">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                                            Harga Hari Biasa
                                        </label>
                                        <input name='hari_biasa' onChange={handleInput}  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="number" value={harga.hari_biasa} />
                                        <span className="text-sm text-red-500"></span>
                                    </div>
                                    <div className="w-96 mb-4  mx-auto md:mt-0 mt-8">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                                            Hari Libur
                                        </label>
                                        <input name='hari_libur' onChange={handleInput}  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"   value={harga.hari_libur} />
                                        <span className="text-sm text-red-500"></span>
                                    </div>
                                </div>
                            </div>
    
                            <div
                                className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                <button type="button"
                                className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                                data-bs-dismiss="modal">
                                Close
                                </button>
                                <button type="submit"
                                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                                Save changes
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

    <button type="button" class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal" data-bs-target="#modalTambahMuseum"  >Tambahkan Museum</button>

                <div className="modal fade fixed bg-gray-300 z-50 p-32 px-52 items-center m-auto w-screen bg-opacity-60 top-0 left-0 hidden h-screen outline-none overflow-x-hidden overflow-y-auto " id="modalTambahMuseum" tabIndex="-1" aria-labelledby="modaltambahMuseum" aria-modal="true" role="dialog">
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
                                        <div className="w-96 mb-4 mx-auto ">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" for="nama_museum">
                                                Nama Museum
                                            </label>

                                            <select id='museum' value={input.namaMuseum} className="block appearance-none sm:w-1/3 w-full p-2.5 bg-white text-center border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" 
                                                onChange={(e) => {
                                                    const index = e.target.selectedIndex;
                                                    const el = e.target.childNodes[index]
                                                    const option =  el.getAttribute('id'); 
                                                    const selectedMuseum = e.target.value;
                                                    setMuseumId(option)
                                                    setInput({...input,namaMuseum:option})
                                                    console.log(selectedMuseum);
                                                }}>
                                                <option >{namaInput.namaMuseum}</option>
                                                {museum && museum.map((item,index) =>{
                                                    return(
                                                        <option className='py-6 my-6  h-32' key={index} id={item.id} value={item.id}>{item.nama_museum}</option>
                                                    )})}
                                            </select>
                                            <span className="text-sm text-red-500"></span>
                                        </div>
                                        <div className="w-96 mb-4  mx-auto md:mt-0 mt-8">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" for="nama_kategori">
                                                Nama Kategori
                                            </label>
                                            <input name='nama_kategori'  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nama_kategori" type="text" onChange={handleInputTambahMuseum}/>
                                            <span className="text-sm text-red-500"></span>
                                        </div>
                                        <div className="w-96 mb-4  mx-auto md:mt-0 mt-8">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" for="hari_biasa">
                                                Harga Hari Biasa
                                            </label>
                                            <input name='hari_biasa' className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="hari_biasa" type="number" onChange={handleInputTambahMuseum}/>
                                            <span className="text-sm text-red-500"></span>
                                        </div>
                                        <div className="w-96 mb-4  mx-auto md:mt-0 mt-8">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" for="hari_libur">
                                                Hari Libur
                                            </label>
                                            <input name='hari_libur' className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="hari_libur" type="number" onChange={handleInputTambahMuseum}/>
                                            <span className="text-sm text-red-500"></span>
                                        </div>
                                    </div>
                                </div>
        
                                <div
                                    className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                    <button type="button"
                                    className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                                    data-bs-dismiss="modal">
                                    Close
                                    </button>
                                    <button type="submit"
                                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                                    Save changess
                                    </button>
                                </div>
                            
    
                        </form> 
                        </div>
                    </div>
                    </div>

  </div>
  )
}

export default CardMasterTiketcopy
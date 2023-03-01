import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ReactLoading from 'react-loading';
import swal from "sweetalert";


function CardSlider() {
  //manage data
  const [loading, setLoading] = useState(true)
  const [loadingGambar,setLoadingGambar] = useState(true)
  const [idGambar, setIdGambar] = useState()
  const [namaGambar, setNamaGambar] = useState("loading ...")

  //add data gambar
  const [gambar, setGambar] = useState("")
  const [tambahGambar, setTambahGambar] = useState("")
  const [gambarId, seGambarId] = useState("")
  
  //show data
  const showData = async ()=>{
    const resGambar = await axios.get ('http://localhost:8000/api/show_gambar').then ((res)=>{
      setGambar(res.data.gambar)
      console.log(res.data.gambar)
    })
  }

  useEffect(() => {
    showData();
  }, [])

  const CloseRef = useRef();

  useEffect(() => {
    axios.get('http://localhost:8000/api/show_gambar')
        .then(res=>{setNamaGambar(res.data.gambar);console.log(res); 
            setLoading(false)
        })
    
    idGambar !== undefined && axios.get(`http://localhost:8000/api/edit-gambar/${idGambar}`).then(res=>{
        console.log(res.data);
        setNamaGambar(res.data.gambar.nama_gambar)
        setLoadingGambar(false);
    })
  }, [idGambar])

  const handleGambar = async(e) =>{
    setNamaGambar('loading data...');
    setIdGambar(...e.target.id)
    console.log(e.target);
  }

  const handleEdit = (e) => {
    e.persist();
    setNamaGambar(e.target.value)
}

  const updateGambar = (e) => {
    e.preventDefault();
    const data = {
      gambar: namaGambar
  }

  axios.put(`http://localhost:8000/api/update-gambar/${idGambar}`, data).then(res=>{
        if(res.data.status === 200)
        {
            // console.log('berhasil');
            swal("Success",res.data.message,"success")
            showData();
            CloseRef.current.click();
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

  const handleNamaGambar = (e) =>{
    console.log(e.currentTarget.value)
  }

  const storeGambar = (e) =>{
    e.preventDefault();

    // const thisClicked = e.currentTarget[5];
    // thisClicked.innerText = "Tambah gambar";
    const data = {
        nama_gambar : tambahGambar
    }
    console.log(tambahGambar)

    axios.post(`http://localhost:8000/api/add_gambar`, data).then(res=>{
        if(res.data.status === 200)
        {
            swal("Success",res.data.message,"success")
            showData();
            CloseRef.current.click();
            
        }
        else if(res.data.status === 205)
        {
            swal("Tidak bisa menambahkan Gambar",res.data.message,"info");
        }
    });
}

  const deleteGambar = (e, id) => {
    e.preventDefault();
    
    // const thisClicked = e.currentTarget;
    // thisClicked.innerText = "Deleting";
    
console.log(e,id);
    swal({
        title: "Anda Yakin menghapus Gambar?",
        text: "Sekali Hapus, anda tidak bisa mencadangkannya lagi!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            axios.delete(`http://localhost:8000/api/delete_gambar/${id}`).then(res=>{
                if(res.data.status === 200)
                {
                    // console.log('berhasil delet');
                    swal("Deleted!",res.data.message,"success")
                        showData();
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


return (
  <div className='container relative flex flex-col min-w-0 break-words w-full mb-6  rounded '>
    <div className="flex justify-between ">
      <button type="button" className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal" data-bs-target="#modalTambahGambar">Tambah Gambar</button>
    </div>

  <div className="flex flex-col">
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div className="overflow-hidden  shadow-lg rounded-xl m-2">
          <table id="table_id" className="rounded-xl shadow-xl w-full" >
          <thead className="border-b bg-white ">
            <tr className=''>
              <th scope="col" className="text-xl w-12 font-nunito font-semibold text-[#A70B0B] px-6 py-4 text-center ">ID</th>
              <th scope="col" className="text-xl font-nunito font-semibold text-[#A70B0B]  px-6 py-4 text-left">Nama Gambar</th>
              <th scope="col" className="text-xl w-72 font-nunito font-semibold text-[#A70B0B] px-6 py-4 text-">Aksi</th>
            </tr>
          </thead>
          <tbody className=''>
            {/* {harga_HTMLTABLE} */}
            <div className="modal fade fixed bg-gray-300 py-24 mx-auto items-center m-auto w-screen bg-opacity-60 top-0 left-0 hidden h-screen outline-none overflow-x-hidden overflow-y-auto" id="EditGambar" tabIndex="-1" aria-labelledby="EditGambar" aria-modal="true" role="dialog">
              <div className="modal-dialog w-11/12 justify-center md:w-1/2  px-0 sm:px-12 mx-auto  h-full  my-auto modal-dialog-centered modal-dialog-scrollable relative items-center pointer-events-none lg:w-1/3">
                <div className="modal-content border-none shadow-lg relative flex flex-col sm:w-full sm:min-w-max pointer-events-auto my-auto bg-white  bg-clip-padding rounded-md outline-none text-current">
                  <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                    <h5 className="text-xl font-nunito font-semibold leading-normal text-gray-800" id="EditGambarLabel">Edit Gambar</h5>
                    <button type="button" className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
            {loadingGambar?
            <form onSubmit={updateGambar} >
              <div className="modal-body relative p-4">
                <div className='justify-around md:mt-0 mt-8'>    
                  <div className="w-96 mb-4 mx-auto md:mt-0 mt-8">
                    <label className="block text-gray-700 text-sm font-nunito font-semibold mb-2" htmlFor="nama_kategori">Nama Gambar</label>
                    <input value="loading data..." name='nama_kategori' className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nama_kategori" type="text" onChange={e=>setTambahGambar(e.target.value)}/>
                    <span className="text-sm text-red-500"></span>
                  </div>
                </div>
              </div>
              <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal">Tutup</button>
                <button type="submit" className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1">Edit Gambar</button>
              </div>
            </form> 
              :
              <form onSubmit={updateGambar} >
                <div className="modal-body relative p-4">
                  <div className='justify-around md:mt-0 mt-8'>    
                    <div className="w-96 mb-4  mx-auto md:mt-0 mt-8">
                      <label className="block text-gray-700 text-sm font-nunito font-semibold mb-2" htmlFor="nama_kategori">Nama Gambar</label>
                      <input  onChange={handleEdit} name='nama_kategori'className="shadow appearance-none border rounded-full w-72 sm:w-full mx-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nama_kategori" type="text" value={namaGambar}/>
                      <span className="text-sm text-red-500"></span>
                    </div>
                  </div>
                </div>
                <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                  <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal" ref={CloseRef}>Tutup</button>
                  <button type="submit" className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1">Edit Gambar</button>
                </div>
              </form>}
                </div>
              </div>
            </div>
          </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
    <div className="modal fade fixed bg-gray-300    py-24   mx-auto items-center m-auto w-screen bg-opacity-60 top-0 left-0 hidden h-screen outline-none overflow-x-hidden overflow-y-auto" id="modalTambahGambar" tabIndex="-1" aria-labelledby="modalTambahGambar" aria-modal="true" role="dialog">
      <div className="modal-dialog w-11/12 justify-center md:w-1/2  px-0 sm:px-12 mx-auto  h-full  my-auto modal-dialog-centered modal-dialog-scrollable relative items-center pointer-events-none lg:w-1/3" >
        <div className="modal-content border-none shadow-lg relative flex flex-col sm:w-full sm:min-w-max pointer-events-auto my-auto bg-white  bg-clip-padding rounded-md outline-none text-current">
          <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5 className="text-xl font-nunito font-semibold leading-normal text-gray-800" id="TambahGambarlabel">Tambah Gambar</h5>
            <button type="button" className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form onSubmit={storeGambar}>
            <div className="modal-body relative p-4">
              <div className='justify-around md:mt-0 mt-8'>    
                <div className="w-96 mb-4  mx-auto md:mt-0 mt-8">
                  <label className="block text-gray-700 text-sm font-nunito font-semibold mb-2" htmlFor="nama_kategori">Nama Gambar</label>
                  <input name='nama_kategori' className="shadow appearance-none border rounded-full  w-72 sm:w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nama_kategori" type="text" onChange={e=>setTambahGambar(e.target.value)}/>
                  <span className="text-sm text-red-500"></span>
                </div>
              </div>
            </div>
            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
              <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal" ref={CloseRef}>Tutup</button> 
              <button type="submit" className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1">Tambah Gambar</button>
            </div>    
          </form> 
        </div>
      </div>
    </div>
  </div>
  )
}

export default CardSlider
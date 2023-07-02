import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ReactLoading from 'react-loading';
import swal from "sweetalert";
import Images from "./Info/Images";
import Cookies from "js-cookie";
import {Modal, Ripple, initTE,} from "tw-elements";



function CardSlider() {

  //manage data
  const [loading, setLoading] = useState(true)

  //add data gambar
  const [gambar, setGambar] = useState("")
  const [responseMsg,setResponseMsg] = useState({
      status: "",
      message: "",
      error: "",
  })
  const [jumlahGambar, setJumlahGambar] = useState("")
  const [gambarId, seGambarId] = useState("")

  initTE({ Modal, Ripple });
  const CloseRef = useRef();
  
  //show data
  const showData = ()=>{
    axios.get (`${process.env.REACT_APP_API_ENDPOINT}/api/show_slider`).then ((res)=>{
      if(res.status === 200){
        setGambar(res.data.data)
        setJumlahGambar(res.data.count)
        setLoading(false)
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  useEffect(() => {
    showData();
  }, [])


  const deleteGambar = (id,e) => {
    console.log(id);
    // e.preventDefault();
    swal({
        title: "Anda Yakin menghapus Gambar?",
        text: "Sekali Hapus, anda tidak bisa mencadangkannya lagi!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
          console.log(id);
            axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/api/delete-slider/${id}`, {
              headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`,
              }}).then(res=>{
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

const handleInput = (e) => {
  const image = e.target.files[e.target.files.length - 1];
  setGambar([image]);
};




const handleSubmit = (e) => {
  e.preventDefault();
  if (jumlahGambar <= 5) {
    const data = new FormData();
    data.append("image", gambar[0]);
    console.log(gambar);
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/api/upload_slider`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setResponseMsg({
            status: response.data.status,
            message: response.data.message,
          });
          if (response.data.status === "success") {
            swal("Success", response.data.message, "success");
          } else {
            swal("error", response.data.message, "error");
          }

          CloseRef.current.click();
          showData();
          setTimeout(() => {
            setGambar("");
            setResponseMsg("");
          }, 100000);
          document.querySelector("#imageForm").reset();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    swal("Maksimal ( 6 ) Gambar", "Hapus Gambar terlebih dahulu", "error");
    CloseRef.current.click();
    showData();
  }
};



if(loading)
{
  var SLIDER_HTMLTABLE =   
  <tr className="bg-white border-b" >
      <td colspan={5} className="text-xl text-center justify-center font-semibold py-5">
          <ReactLoading type={"spin"} color={"red"} height={'5%'} width={'5%'} className="m-auto" />
      </td>
  </tr>
}else{

  var SLIDER_HTMLTABLE =  "";
  SLIDER_HTMLTABLE = gambar && gambar.map((item,index)=>{
    return (
      <>
      <tr key={index}>
        <td className="text-center">{index + 1}</td>
        <td>
          <div className="w-full flex items-center justify-center mt-3" key={item.id}>
            <img src={ `${process.env.REACT_APP_API_ENDPOINT}/uploads/` + item.slider_name } className="img-fluid img-bordered" width="300px"/>
          </div>
        </td>
        <td className="w-1/3 text-center">
          <button className="bg-red-400 hover:bg-red-200 px-4 py-2 rounded " onClick={e=>deleteGambar(item.id,e)}>delete</button>
        </td>
      </tr>
      </>
    )
  })

}


return (
  <div className='container relative flex flex-col min-w-0 break-words w-full mb-6  rounded '>
    <div className="flex justify-between ">
      <button type="button" className="inline-block  px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out" data-te-toggle="modal" data-te-target="#modalTambahSlider">Tambah Slider</button>
      <p>Maksimal Gambar Slider &#40; 6 &#41;  Gambar</p>
    </div>

  <div className="flex flex-col">
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div className="overflow-hidden  shadow-lg rounded-xl m-2">
          <table id="table_id" className="rounded-xl shadow-xl w-full" >
          <thead className="border-b bg-white ">
            <tr className=''>
              <th scope="col" className="text-xl w-12 font-nunito font-semibold text-[#A70B0B] px-6 py-4 text-center ">No</th>
              <th scope="col" className="text-xl font-nunito font-semibold text-[#A70B0B]  px-6 py-4 text-center">Nama Gambar</th>
              <th scope="col" className="text-xl w-72 font-nunito font-semibold text-[#A70B0B] px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className=''>
            {SLIDER_HTMLTABLE}
            <div className="modal fade fixed bg-gray-300 py-24 mx-auto items-center m-auto w-screen bg-opacity-60 top-0 left-0 hidden h-screen outline-none overflow-x-hidden overflow-y-auto" id="EditGambar" tabIndex="-1" aria-labelledby="EditGambar" aria-modal="true" role="dialog">
              <div className="modal-dialog w-11/12 justify-center md:w-1/2  px-0 sm:px-12 mx-auto  h-full  my-auto modal-dialog-centered modal-dialog-scrollable relative items-center pointer-events-none lg:w-1/3">
                <div className="modal-content border-none shadow-lg relative flex flex-col sm:w-full sm:min-w-max pointer-events-auto my-auto bg-white  bg-clip-padding rounded-md outline-none text-current">
                  <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                    <h5 className="text-xl font-nunito font-semibold leading-normal text-gray-800" id="EditGambarLabel">Edit Gambar</h5>
                    <button type="button" className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"data-te-dismiss="modal" aria-label="Close"></button>
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
    
  <div  className="modal fade fixed bg-gray-300   z-[5000] py-12   mx-auto items-center m-auto w-screen bg-opacity-60 top-0 left-0 hidden h-screen outline-none overflow-x-hidden overflow-y-auto" id="modalTambahSlider" tabIndex="-1" aria-labelledby="modalTambahSlider" aria-modal="true" role="dialog">
    <div 
    data-te-modal-dialog-ref
    className="modal-dialog w-11/12 justify-center md:w-1/2  px-0 sm:px-12 mx-auto  h-full  my-auto modal-dialog-centered modal-dialog-scrollable relative items-center pointer-events-none lg:w-1/3" >
        <div className="modal-content  border-none shadow-lg relative flex flex-col sm:w-full sm:min-w-max pointer-events-auto my-auto bg-white  bg-clip-padding rounded-md outline-none text-current">
        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5 className="text-xl font-nunito font-semibold leading-normal text-gray-800" id="Tambahmuseumlabel">
            Tambah Slider
            </h5>
            {/* <button type="button"
            className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
            data-te-modal-dismiss="modal" aria-label="Close" ref={CloseRef}></button> */}
        </div>
        
          <form onSubmit={handleSubmit} encType="multipart/form-data" id="imageForm">
            <div className="bg-white p-10">
              <div className="card-body form-group py-2">
                  <input type="file" name="image" onChange={handleInput} className="rounded-xl bg-gray-200 w-full"/>
                  <div className="font-base font-bold font-nunito">Format Gambar : jpeg,png,jpg</div>
                  <div className="font-base font-bold font-nunito">Max. Upload 2MB</div>
              </div>
            </div>
            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200">
              <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              data-te-modal-dismiss="modal" aria-label="Close" ref={CloseRef}>Tutup</button>
              <button id='tambahGambar' type="submit" className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1">Tambah Gambar</button>
            </div>
          </form>
        </div>
    </div>
    </div>

  </div>
  )
}

export default CardSlider
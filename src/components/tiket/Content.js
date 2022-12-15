import axios, { Axios } from 'axios';
import React, { useEffect, useState } from 'react'
import qr from '../../assets/img/tiket/qr.png'
import 'flowbite';
import ReactLoading from 'react-loading';
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';


function Content({id}) {

  const [tiket,setTiket] = useState();
  const [loading,setLoading] = useState(true);


  const fetchTicket = () =>{
    axios.get(`http://localhost:8000/api/show-ticket/${id}`).then(res=>{
      console.log(res);
      if(res.data.status === 200)
          {
            setTiket(res.data.data)
            setLoading(false)
          }
          else if(res.data.status === 422)
          {
              console.log('ada yang salah di BE');
          }
    })
  }

  const handleCaptureClick = async () => {
    const canvas = await html2canvas(document.getElementById('tiket'));
    const dataURL = canvas.toDataURL('image/png');
    downloadjs(dataURL, tiket.kode_tiket + '.png', 'image/png');
  };

  useEffect(() => {
    fetchTicket();
  }, [])

  if(loading)
  {
    return <ReactLoading type={"spin"} color={"red"} height={'10%'} width={'10%'} className="m-auto h-screen " />
  }


  console.log(document.getElementById('tiket'));


    
  return (

      <div className='container mx-auto justify-center  pt-14  '>
        <div className='flex justify-center'>
          <button class=" mt-10 bg-[#A70B0B] hover:bg-[#A70B0B]  text-white font-bold py-4 px-8 rounded-full focus:outline-none focus:shadow-outline" onClick={handleCaptureClick}>
            Download
          </button>
        </div>

        <div className="    mt-6">
        <div className='bg-[#A70B0B] pt-10 pb-2 ' id='tiket'>
          
        <div className="w-auto px-10 ml-auto mr-auto text-center">
            <div className="text-gray-200">
              <p className='text-3xl font-bold'>
                UPT Museum
              </p>
            </div>
          </div>

          <div className="w-auto px-4 ml-auto mr-auto text-center">
            <div className="text-gray-200">
              <p className='my-3 text-lg'>
              {tiket.kode_tiket}
              </p>
            </div>
          </div>

          <div className="flex text-white">

            <div className='w-1/3 px-12'>

              <div className='my-3'>
                <p className=' text-lg'>Tujuan Wisata</p>
                <p className='text-xl font-bold'>{tiket.museum}</p>
              </div>

              <div className='my-3' >
                <p className=' text-lg'>Tanggal Pemesanan</p>
                <p  className='text-xl font-bold'>{tiket.tanggal}</p>
              </div>

              <div className='my-3'>
                <p className=' text-lg'>Atas Nama</p>
                <p  className='text-xl font-bold'>{tiket.nama}</p>
              </div>

            </div>

            <div className='w-1/3'>

              <div className='my-3'>
                <p className=' text-lg'>Jumlah Pengunjung</p>
                <p  className='text-xl font-bold'>{tiket.jumlah}</p>
              </div>

              <div  className='my-3'>
                <p className=' text-lg'>Status Pembayaran</p>
                <p  className='text-xl font-bold'>{tiket.status !== 'Lunas' ? "Belum Lunas":"Sudah Lunas"}</p>
              </div>

            </div>  

            <div className='w-1/3 items-center justify-center mx-auto'>
              <p className='text-center text-xl font-semibold my-1'>Scan QR code</p>
              <img src={qr} className="mx-auto w-[40%] "/>
              {/* <p className='text-center text-3xl font-semibold py-4'>{rupiah(tiket.harga_awal)} -</p> */}
            </div>
            
          </div>

          <div className="w-full mx-auto text-center text-white pt-12">
            <p className='text-gray-300'>Datang sesuai tanggal pada tiket!</p>
            <p>Harap simpan tiket ini untuk ditunjukkan di lokasi museum!</p>
          </div>

        </div>
        </div>

      </div>
    )
  
}

export default Content


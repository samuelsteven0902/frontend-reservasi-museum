import axios, { Axios } from 'axios';
import React, { useEffect, useState } from 'react'
import qr from '../../assets/img/tiket/qr.png'
import logo from '../../assets/img/tiket/logo.png'
import 'flowbite';
import ReactLoading from 'react-loading';
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';
import QRCode from "react-qr-code";
import kosong from "../../assets/img/admin/nothing.svg"
import { useTranslation } from 'react-i18next';


function Content({id}) {

  const { t } = useTranslation();

  const [tiket,setTiket] = useState();
  const [loading,setLoading] = useState(true);


  const fetchTicket = () =>{
    axios.get(`http://localhost:8000/api/show-ticket/${id}`).then(res=>{
      console.log(res);
      if(res.data.status === 200)
          {
            setTiket(res.data.data)
            console.log(tiket);
            if(tiket !== null){
            setLoading(false)
            return <p>Tiket Tidak ada</p>
            }
          }
          else if(res.data.status === 422)
          {
            console.log('ada yang salah di BE');
          }else if(res.data == null ){
            return <p>Tiket Tidak ada</p>
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
    return <ReactLoading type={"spin"} color={"red"} height={'10%'} width={'10%'} className="m-auto h-screen" />
  }

  console.log(document.getElementById('tiket'));

  return (
<>
  {tiket !== null ? 
    <div className='container mx-auto pt-32'>
      <div className='flex justify-center'>
        <button className="mb-10 bg-[#A70B0B] hover:bg-[#A70B0B] text-white font-bold py-4 px-8 rounded-full focus:outline-none focus:shadow-outline" onClick={handleCaptureClick}>Download</button>
      </div>
      <div id='tiket' className='absolute left-1/2 transform -translate-x-1/2'>
        <div className='bg-[#A70B0B] w-96 text-white rounded-3xl'>
          <div className='p-6'>
            <div className='bg-red-200 rounded-3xl flex justify-center'>
              <img src={logo} className=""/>
            </div>
              <p className='text-center text-3xl py-2 font-serif'> {t('tiket.judul')} </p>
          </div>
        </div>
      <div className='bg-[#A70B0B] w-96 mx-auto text-white rounded-3xl'>
        <div className='p-5 py-8 '>
          <p className='text-center text-3xl font-nunito'>{tiket.museum}</p>
          <p className='text-center text-xl font-nunito pb-6'>{tiket.kode_tiket}</p>
          <div className='grid grid-cols-2 gap-8 w-full mx-auto justify-center pl-5 text-lg'>
            <div>
              <p className='text-base'>{t('tiket.nama')}</p>
              <p className='font-semibold text-xl font-nunito'>{tiket.nama}</p>
            </div>
            <div style={{ height: "auto", maxWidth: 130, width: "100%" }} className=" row-span-2">
              <QRCode size={256} style={{ height: "auto", maxWidth: "100%", width: "100%" }} value={tiket.kode_tiket} viewBox={`0 0 256 256`}/>
            </div>
            <div>
              <p className='text-base'>{t('tiket.qty')}</p>
              <p className='font-semibold text-xl font-nunito'>{tiket.jumlah}</p>
            </div>
            <div>
              <p className='text-base'>{t('tiket.tgl')}</p>
              <p className='font-semibold text-xl font-nunito'>{tiket.tanggal}</p>
            </div>
            <div>
              <p className='text-base'>{t('tiket.kategori')}</p>
              <p className='font-semibold text-xl font-nunito'>{tiket.kategori}</p>
            </div>
            <div>
              <p className='text-base'>{t('tiket.total')}</p>
              <p className='font-semibold text-xl font-nunito'>{tiket.harga}</p>
            </div>
            <div>
              <p className='text-base'>{t('tiket.keterangan')}</p>
              <p className='font-semibold text-xl font-nunito'>{tiket.status}</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
      :
    <div className=' flex justify-center flex-col h-screen mx-auto'>
      <img src={kosong} className='w-1/4 mx-auto -mt-52 md:mt-32'/>
      <p className='text-3xl py-7 text-center font-nunito bg-red-200 lg:mx-40 mx-12 rounded-full mt-12 text-red-600'>Maaf, Tiket dengan kode<span className='px-2 font-bold'>"{id}"</span> Tidak dapat di temukan</p>
    </div>
  }
</>
  )
}

export default Content
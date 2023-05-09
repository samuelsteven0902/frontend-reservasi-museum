import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import total from '../../assets/img/pembayaran/total.png'
import { useHistory } from 'react-router-dom';
import ReactLoading from 'react-loading';
import swal from 'sweetalert';

function WorkingSection(data) {
  
  const { t } = useTranslation();

  const [channel,setChannel] = useState([])
  const [loading,setLoading] = useState(true)
  const [dataDiri,setDataDiri] = useState([])
  const [metode,setMetode] = useState()
  const history = useHistory();

  const rupiah = (number)=>{
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(number);
}

const fetchChannel = () =>{
  axios.get(`https://backend.museumsolo.com/api/metode`).then(res=>{
    console.log(res.data);
    setLoading(false)
    setChannel(res.data.data)
  })
}


const handleCheckout = () =>{

  if(metode){
    const data = {
      "nama":dataDiri.nama,
      "email":"samuelstev0902@Gmail.com",
      "museum":dataDiri.museum,
      "kategori":dataDiri.kategori,
      "phone":dataDiri.phone,
      "kota":dataDiri.kota,
      "harga_awal":dataDiri.harga_awal,
      "metode":metode
    }
  
    axios.post(`https://backend.museumsolo.com/api/transaksi_proses`,data).then(res=>{
      console.log(res.data.data.checkout_url);
      window.location.replace(res.data.data.checkout_url)
    })
  }else{
    swal("Warning","Silahkan pilih Metode pembayaran terlebih dahulu","error")
  }

  
}

useEffect(() => {
    
  fetchChannel();
  setDataDiri(data.data.data)
}, [])

console.log(dataDiri);


if(loading){
  <ReactLoading type={"spin"} color={"red"} height={'10%'} width={'10%'} className="m-auto" />
  
}else{

  var CHANNEL_HTML = ''

  CHANNEL_HTML = channel.map((item,index)=>{
    return (
      <>
        <div  key={index} className='my-5 rounded shadow mx-10 bg-white'>
          <div className='flex items-center py-5'>
            <input type='radio' id={item.code} name='channel' value={item.code} className='mx-5' onClick={e=>{setMetode(e.target.value);}} />
            <label for={item.code} className='mr-2 flex items-center text-gray-600'> 
              <img src={item.icon_url} alt='icon' className='h-12' /> 
              <span>Bayar dengan</span>  
              <span className='ml-2'>{item.name}</span> </label>
          </div>
        </div>
      </>
    )
  }
  
  )

}



  return (
    <div>
      <div className=' xl:px-32 lg:px-10 px-4  lg:flex   justify-center bg-gray-100'>
        <div className='lg:w-2/3 w-full my-2 mt-6 mx-4'>
          {CHANNEL_HTML}
        </div>
        <div className='lg:w-1/3 w-full my-2 mx-4 mt-6 h-1/2'>
                    <div className='container  mx-auto flex bg-white rounded-2xl py-6'>
                        <div className='w-1/6 min-w-max flex mx-auto justify-center '>
                            {/* <img src={detail}  className='w-16 h-16'/> */}
                        </div>
                        <div className='lg:block  bg-white w-5/6 mx-4'>
                            <p className='font-merriweather font-bold text-3xl py-3'>{t('pembayaran.detail.judul')}</p>
                            <div className='flex flex-wrap'>
                                <div className='lg:w-full w-1/2'>
                                    <p className='font-nunito font-bold'>{t('pembayaran.detail.museum')}</p>
                                    <p  >{dataDiri.museum}</p>
                                </div>
                                <div className='w-1/2 lg:w-full lg:pt-4'>
                                    <div>
                                        <p className='font-bold font-nunito'>{t('pembayaran.detail.tgl')}</p>
                                        <p>{dataDiri.tanggal}</p>
                                    </div>
                                </div>
                                <div className='w-1/2 mt-4 lg:w-full ' >
                                    <div>
                                        <p className='font-bold font-nunito'>{t('pembayaran.detail.kategori')}</p>
                                        <p>{dataDiri.kategori}</p>
                                    </div>
                                </div>
                                <div className='w-1/2 mt-4 lg:w-full '>
                                    <div>
                                        <p className='font-bold font-nunito'>{t('pembayaran.detail.jumlah')}</p>
                                        <p>{dataDiri.jumlah}</p>
                                    </div>
                                </div>
                            </div>
                            {/* <div className='flex'>
                                <img />
                                <div>
                                    <p>Harga satuan</p>
                                    <p>{input.data.tanggal}</p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className='container mx-auto flex bg-white my-6 rounded-2xl py-4'>
                        <div className='w-1/6 min-w-max flex mx-auto justify-center '>
                            <img src={total}  className='w-16 h-16'/>            
                        </div>
                        <div className='w-5/6'>
                            <p className='mx-4 text-2xl font-merriweather font-bold py-3'>{t('pembayaran.total.judul')}</p>
                            <div className='w-full text-right pr-12'>
                                <p className='my-5 font-nunito font-bold text-2xl'>{rupiah(dataDiri.harga_awal)} -</p>
                            </div>

                        </div>
                    </div>
                    <button className='w-full bg-green-500 rounded-full my-5 py-2' onClick={handleCheckout}> Checkout </button>
                </div>  
      </div>
    </div>
  )
}

export default WorkingSection
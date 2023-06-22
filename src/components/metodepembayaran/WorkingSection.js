import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import total from '../../assets/img/pembayaran/total.png'
import { useHistory } from 'react-router-dom';
import ReactLoading from 'react-loading';
import swal from 'sweetalert';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// Initialization for ES Users

function WorkingSection(data) {
  

  const { t } = useTranslation();

  const [channel,setChannel] = useState([])
  const [loading,setLoading] = useState(true)
  const [dataDiri,setDataDiri] = useState([])
  const [metode,setMetode] = useState({
    name:'',
    fee:''
  })
  const [expanded, setExpanded] = React.useState(false);
  const history = useHistory();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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

console.log(dataDiri);

const handleCheckout = () =>{

  if(metode.name){
    const data = {
      "nama":dataDiri.nama,
      "email":dataDiri.email,
      "museum":dataDiri.museum,
      "kategori":dataDiri.kategori,
      "phone":dataDiri.phone,
      "kota":dataDiri.kota,
      "harga":dataDiri.harga_awal,
      "jumlah":dataDiri.jumlah,
      "tanggal":dataDiri.tanggal,
      "harga_awal":dataDiri.harga_awal + metode.fee ,
      "metode":metode.name
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

  var CHANNEL_HTML_VA = ''

  CHANNEL_HTML_VA = channel.filter(val=>{return val.group === 'Virtual Account'})
                .map((item,index)=>{
                return (
                  <>
                    <label  key={index} className='my-5 rounded shadow mx-10 bg-gray-50 block cursor-pointer' >
                      <div className='flex items-center py-5'>
                        <input type='radio' id={item.code} name='channel' value={item.code} className='mx-5' onClick={e=>{setMetode({...metode,name:e.target.value,fee:item.fee_merchant.flat});}}  />
                        <label for={item.code} className='mr-2 flex items-center text-gray-600'> 
                          <img src={item.icon_url} alt='icon' className='h-12' /> 
                          <span className='px-1'>Bayar dengan</span>  
                          <span className='ml-1'>{item.name}</span> </label>
                      </div>
                    </label>
                  </>
                )
              })

    var CHANNEL_HTML_CS = channel.filter(val=>{return val.group === 'Convenience Store'})
    .map((item,index)=>{
    return (
      <>
        <label  key={index} className='my-5 rounded shadow mx-10 bg-gray-50  block cursor-pointer'>
          <div className='flex items-center py-5'>
            <input type='radio' id={item.code} name='channel' value={item.code} className='mx-5' onClick={e=>{setMetode({...metode,name:e.target.value,fee:item.fee_merchant.flat});}} />
            <label for={item.code} className='mr-2 flex items-center text-gray-600'> 
              <img src={item.icon_url} alt='icon' className='h-12' /> 
              <span>Bayar dengan</span>  
              <span className='ml-2'>{item.name}</span> </label>
          </div>
        </label>
      </>
    )
  })

    var CHANNEL_HTML_EW = channel.filter(val=>{return val.group === 'E-Wallet'})
    .map((item,index)=>{
    return (
      <>
        <label  key={index} className='my-5 rounded shadow mx-10 bg-gray-50 block cursor-pointer'>
          <div className='flex items-center py-5'>
            <input type='radio' id={item.code} name='channel' value={item.code} className='mx-5' onClick={e=>{setMetode({...metode,name:e.target.value,fee:item.fee_merchant.flat});}} />
            <label for={item.code} className='mr-2 flex items-center text-gray-600'> 
              <img src={item.icon_url} alt='icon' className='h-12' /> 
              <span>Bayar dengan</span>  
              <span className='ml-2'>{item.name}</span> </label>
          </div>
        </label>
      </>
    )
  })

}



  return (
    <div>
      <div className=' xl:px-32 lg:px-10 px-4  lg:flex   justify-center bg-gray-100'>
        <div className='lg:w-2/3 w-full my-2 mt-6 mx-4'>

        <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          className='hover:bg-red-50 transition-all ease-in-out duration-300 bg-white'
        >
          <Typography  sx={{ width: '33%', flexShrink: 0 }}>
            <p className='p-3 text-2xl font-poppins pl-5 '>E - Wallet</p>
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            <div className='py-4 flex'>Tersedia : {channel.filter(val=>{return val.group === 'E-Wallet'})
                        .map((item,index)=>{
                          return (
                            <p className='px-1.5'> {item.name}</p>
                          )
                        })
                        }</div>
          </Typography>
          {/* <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography> */}
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {CHANNEL_HTML_EW}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
          className='hover:bg-red-50 transition-all ease-in-out duration-300 bg-white'
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}><p className='p-3 text-2xl font-poppins pl-5 '>Transfer Bank</p></Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            <div className='py-4 '><span className='-mt-5'>Tersedia :</span><div className='flex flex-wrap truncate '> {channel.filter(val=>{return val.group === 'Virtual Account'})
                        .map((item,index)=>{
                          return (
                            <p className='px-1.5'> {item.name}  </p> 
                          )
                        })
                        }</div></div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {CHANNEL_HTML_VA}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
          className='hover:bg-red-50 transition-all ease-in-out duration-300 bg-white'
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
          <p className='p-3 text-2xl font-poppins pl-5 '>Toko Terdekat</p>
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            <div className='py-4 flex'>Tersedia : {channel.filter(val=>{return val.group === 'Convenience Store'})
                        .map((item,index)=>{
                          return (
                            <p className='px-1.5'> {item.name}</p>
                          )
                        })
                        }</div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {CHANNEL_HTML_CS}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>

       
          {/* {CHANNEL_HTML} */}
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
                    <div className='container mx-auto bg-white my-6 rounded-2xl py-4'>
                            <div className='flex '>
                              <img src={total}  className='w-12 h-12 mx-6 ' alt='totol'/>            
                              <p className='mx-4 text-2xl font-merriweather font-bold py-3'>{t('pembayaran.total.judul')}</p>
                            </div>
                            <div className=' flex items-center justify-between px-5 '>
                                <p className='text-gray-600 '>Harga Tiket : </p>
                                <p className=' font-nunito font-semibold text-xl'>{rupiah(dataDiri.harga_awal)} -</p>
                            </div>
                            <div className=' flex items-center justify-between px-5 '>
                                <p className='text-gray-600 '>Fee : </p>
                                <p className=' font-nunito font-semibold text-xl'>{rupiah(metode.fee)} -</p>
                            </div>
                            <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                            <div className=' flex items-center justify-between px-5 pb-4 '>
                                <p className='text-gray-600 '>Total : </p>
                                <p className=' font-nunito font-bold text-xl'>{rupiah(metode.fee + dataDiri.harga_awal)} -</p>
                            </div>


                    </div>
                    <button className='w-full bg-green-500 rounded-full my-5 py-2' onClick={handleCheckout}> Checkout </button>
                </div>  
      </div>
    </div>
  )
}

export default WorkingSection
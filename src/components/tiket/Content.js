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
import Tiket from 'pages/Tiket';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { GrFormView } from 'react-icons/gr';


function Content({id}) {

  const { t } = useTranslation();

  const [tiket,setTiket] = useState();
  const [loading,setLoading] = useState(true);


  const history = useHistory();

  const fetchTicket = (kode) =>{

    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/show-ticket/${kode}`, {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      }}).then(res=>{
      console.log(res);
      if(res.data.status === 200)
          {
            setTiket(res.data.data)
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

  const handleTiket = (e) =>{
    setLoading(true)
    fetchTicket(e);
    history.push("/tiket/" + e );
    return handleTiket;
    }

  useEffect(() => {
    fetchTicket(id);
  }, [])

  console.log(tiket);


  if(loading)
  {
    return <div className='h-screen m-auto flex justify-center items-center'>
              <ReactLoading type={"spin"} color={"red"} height={'10%'} width={'10%'} className="m-auto " />
          </div>
  }

  return (
<>
  {tiket === null || Object.keys(tiket).length === 0 ? 
    <div className=' flex justify-center flex-col h-screen mx-auto'>
      <img src={kosong} className='w-1/4 mx-auto -mt-52 md:mt-32' alt=''/>
      <p className='text-3xl py-7 text-center font-nunito bg-red-200 lg:mx-40 mx-12 rounded-full mt-12 text-red-600'>Maaf, Tiket dengan kode<span className='px-2 font-bold'>"{id}"</span>Tidak dapat di temukan</p>
    </div>
      :
    
    (Object.keys(tiket).length > 1 ?
      <div className='w-3/4 flex justify-center items-center mx-auto h-screen '>

        
        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            No
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Kode Tiket
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Nama
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Tanggal
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Jumlah Orang
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Detail
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                      tiket.map((item,index)=>{
                        return(
                          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {index}
                            </th>
                            <td class="px-6 py-4">
                                {item.kode_tiket}
                            </td>
                            <td class="px-6 py-4">
                                {item.nama}
                            </td>
                            <td class="px-6 py-4">
                                {item.tanggal}
                            </td>
                            <td class="px-6 py-4">
                                {item.jumlah}
                            </td>
                            <td class="px-6 py-4">
                                {item.status}
                            </td>
                            <td class="px-6 py-4">
                            <button className="bg-gray-500 hover:bg-gray-600 rounded shadow-inner drop-shadow-2xl py-0.5 px-1" onClick={e=>handleTiket(item.kode_tiket,e)}>
                              <GrFormView className=""/>
                            </button>
                            </td>
                        </tr>
                        )
                      })
                    }
                </tbody>
            </table>
        </div>


      </div>
      :
      <div className='container mx-auto pt-32'>
                      <div className="flex flex-wrap justify-center mt-10 p-4 mb-4 mx-16 text-base text-center text-red-700 bg-red-100 rounded-lg dark:bg-gray-800 dark:text-red-400 font-nunito" role="alert">
                    <span className="font-bold">{t('tiket.perhatian')}</span> {t('tiket.alert')}
                </div>
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
          <p className='text-center text-3xl font-nunito'>{tiket[0].museum}</p>
          <p className='text-center text-xl font-nunito pb-6'>{tiket[0].kode_tiket}</p>
          <div className='grid grid-cols-2 gap-8 w-full mx-auto justify-center pl-5 text-lg'>
            <div>
              <p className='text-base'>{t('tiket.nama')}</p>
              <p className='font-semibold text-xl font-nunito'>{tiket[0].nama}</p>
            </div>
            <div style={{ height: "auto", maxWidth: 130, width: "100%" }} className=" row-span-2">
              <QRCode size={256} style={{ height: "auto", maxWidth: "100%", width: "100%" }} value={tiket[0].kode_tiket} viewBox={`0 0 256 256`}/>
            </div>
            <div>
              <p className='text-base'>{t('tiket.qty')}</p>
              <p className='font-semibold text-xl font-nunito'>{tiket[0].jumlah}</p>
            </div>
            <div>
              <p className='text-base'>{t('tiket.tgl')}</p>
              <p className='font-semibold text-xl font-nunito'>{tiket[0].tanggal}</p>
            </div>
            <div>
              <p className='text-base'>{t('tiket.kategori')}</p>
              <p className='font-semibold text-xl font-nunito'>{tiket[0].kategori}</p>
            </div>
            <div>
              <p className='text-base'>{t('tiket.total')}</p>
              <p className='font-semibold text-xl font-nunito'>{tiket[0].harga_awal * tiket[0].jumlah}</p>
            </div>
            <div>
              <p className='text-base'>{t('tiket.keterangan')}</p>
              <p className='font-semibold text-xl font-nunito'>{tiket[0].status}</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
      )
  }
</>
  )
}

export default Content
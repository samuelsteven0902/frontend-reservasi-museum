import axios, { Axios } from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import qr from '../../assets/img/tiket/qr.png'
import 'flowbite';
import { useLocation } from 'react-router-dom'
import FormInput from 'components/inputdata/FormInput';

function Content({input,id}) {

  // const data = data;
  console.log(id);
  const [pembayaran,setPembayaran] = useState('')
  const [danger,setDanger] = useState('')
  const history = useHistory();

  // dari input data
  const stateParamVal = useLocation().state
  console.log(stateParamVal,"ini di tiket");
  const id_category = stateParamVal.category
  const id_museum = stateParamVal.museum
  // const id_nama = stateParamVal.nama
  // const id_kota = stateParamVal.kota
  // const id_phone = stateParamVal.phone
  // const id_jumlah = stateParamVal.jumlah
  // const id_tanggal = stateParamVal.tanggal
  // const id_foto = stateParamVal.foto
  // const id_harga_awal = stateParamVal.input
 

  const [data,setData] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])


      const dataId= {
        id_category:id_category,
        id_museum:id_museum,
      }

  const handleCash = () =>{
    // console.log(input.data);
    if(pembayaran !== '' || input.input == 0){
        setPembayaran('Tunai')
    console.log(pembayaran);



  

axios.post(`http://localhost:8000/api/add-pengunjung`, data).then(res => {
          console.log(res.data);
          if(res.data.status === 200)
          {
              console.log('MANTAB BERHASIL');
              history.push('/tiket');
          }
          else if(res.data.status === 422)
          {
              console.log('ada yang salah di BE');
          }
      });
      }else{
      setDanger("Silahkan pilih pembayaran terlebih dahulu")
      }

    }

    useEffect(() => {


    }, [pembayaran])

        const rupiah = (number)=>{
          return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR"
          }).format(number);
        }

        const onValueChange = (e) => {
          // setPembayaran(e)
          setPembayaran(e.target.value)
        }

    
  return (

      <div className='container mx-auto justify-center'>
        <div className='flex justify-center'>
          <button class=" mt-10 bg-[#A70B0B] hover:bg-[#A70B0B]  text-white font-bold py-4 px-8 rounded-full focus:outline-none focus:shadow-outline">
            Download
          </button>
        </div>

        <div className="  bg-[#A70B0B] mt-14 pt-12 pb-1 mx-3 lg:mx-32">

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
              ET 0987689
              </p>
            </div>
          </div>

          <div className="flex text-white">

            <div className='w-1/3 px-12'>

              <div className='my-3'>
                <p className=' text-lg'>Tujuan Wisata</p>
                <p className='text-xl font-bold'>{stateParamVal.museum}</p>
              </div>

              <div className='my-3' >
                <p className=' text-lg'>Tanggal Pemesanan</p>
                <p  className='text-xl font-bold'>{stateParamVal.tanggal}</p>
              </div>

              <div className='my-3'>
                <p className=' text-lg'>Atas Nama</p>
                <p  className='text-xl font-bold'>{stateParamVal.nama}</p>
              </div>

            </div>

            <div className='w-1/3'>

              <div className='my-3'>
                <p className=' text-lg'>Jumlah Pengunjung</p>
                <p  className='text-xl font-bold'>{stateParamVal.jumlah}</p>
              </div>

              <div  className='my-3'>
                <p className=' text-lg'>Status Pembayaran</p>
                <p  className='text-xl font-bold'>{stateParamVal.pembayaran == 'cash' ? "a":"a"}</p>
              </div>

              <div  className='my-3'>
                <p className=' text-lg'>Metode Pembayran</p>
                <p  className='text-xl font-bold'>{stateParamVal.pembayaran}</p>
              </div>

            </div>  

            <div className='w-1/3 items-center justify-center mx-auto'>
              <p className='text-center text-xl font-semibold my-1'>Scan QR code</p>
              <img src={qr} className="mx-auto w-[40%] "/>
              <p className='text-center text-3xl font-semibold py-4'>{rupiah(stateParamVal.harga_awal)} -</p>
            </div>
            
          </div>

          <div className="w-full mx-auto text-center text-white my-12">
            <p className='text-gray-300'>Datang sesuai tanggal pada tiket!</p>
            <p>Harap simpan tiket ini untuk ditunjukkan di lokasi museum!</p>
          </div>

        </div>

      </div>
    )
  
}

export default Content

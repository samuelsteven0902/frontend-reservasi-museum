import React from 'react'
import { useHistory } from 'react-router-dom';
import axios, { Axios } from 'axios';
import qr from '../../assets/img/tiket/qr.png'

function Content(input) {

  // const data = data;
  const [pembayaran,setPembayaran] = useState('')
  const [danger,setDanger] = useState('')
  const history = useHistory();

  console.log(input);
  const handleCash = () =>{
      // console.log(input.data);
      if(pembayaran !== '' || input.input == 0){
          setPembayaran('Tunai')
      console.log(pembayaran);


  const data = {
    nama:input.data.nama,
    kota:input.data.kota,
    phone:input.data.phone,
    jumlah:input.data.jumlah,
    museum:input.data.museum,
    kategori:input.data.kategori,
    tanggal:input.data.tanggal,
    foto:input.data.foto,
    harga_awal:input.input,  
    pembayaran: 'cash',
    status: 'belum lunas',
}

console.log(data);

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
  
    // className="items-center flex flex-wrap bg-[#A70B0B]">

      <div classNamec='container mx-auto justify-center'>
        <div className='flex justify-center'>
          <button class=" mt-10 bg-[#A70B0B] hover:bg-[#A70B0B]  text-white font-bold py-4 px-8 rounded-full focus:outline-none focus:shadow-outline">
            Download
          </button>
        </div>

        <div className="  bg-[#A70B0B] mt-14 pt-12 pb-1 mx-32">

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
                XXXX.XXXXX-XXXXXX.XXXXXXXX-XXXXXXX
              </p>
            </div>
          </div>

          <div className="flex text-white">

            <div className='w-1/3 px-12'>

              <div className='my-3'>
                <p className=' text-lg'>Tujuan Wisata</p>
                <p className='text-xl font-bold'>{input.data.kategori}</p>
              </div>

              <div className='my-3' >
                <p className=' text-lg'>Tanggal Pemesanan</p>
                <p  className='text-xl font-bold'>{input.data.tanggal}</p>
              </div>

              <div className='my-3'>
                <p className=' text-lg'>Atas Nama</p>
                <p  className='text-xl font-bold'>{input.data.nama}</p>
              </div>

            </div>

            <div className='w-1/3'>

              <div className='my-3'>
                <p className=' text-lg'>Jumlah Pengunjung</p>
                <p  className='text-xl font-bold'>{input.data.jumlah}</p>
              </div>

              <div  className='my-3'>
                <p className=' text-lg'>Status Pembayaran</p>
                <p  className='text-xl font-bold'>SUDAH / BELUM</p>
              </div>

            </div>  

            <div className='w-1/3 items-center justify-center mx-auto'>
              <p className='text-center text-xl font-semibold my-1'>Scan QR code</p>
              <img src={qr} className="mx-auto w-[40%] "/>
              <p className='text-center text-3xl font-semibold py-4'>{rupiah(input.input)} -</p>
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


{/* <div>
<div className=" pt-24 pb-16 flex content-center items-center justify-center w-full  h-1/3">
    <div className="bg-gray-100 bg-center absolute top-6 w-[80%] h-1/6  bg-inputdata-backgroung  " />       
    <div className=" mx-auto z-20 w-[80%] -mt-5">
        <div className="items-center flex flex-wrap bg-[#A70B0B] mt-2 rounded-b-xl pb-1">
            <div className="w-full  px-3 ml-auto mr-auto text-center">
                <div className="text-gray-100">
                    <p className='text-sm mt-5' color="gray-200">
                    Solo merupakan salah satu kota yang sering dikunjungi oleh para wisatawan. Tempat wisata yang ada di Solo juga sangat beragam. Salah satu tempat wisata yang ada di Solo yaitu Museum. Banyak museum yang terdapat di Solo karena Solo juga merupakan daerah yang memiliki sejarah yang melimpah.
                    </p> */}
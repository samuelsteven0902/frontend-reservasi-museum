import axios, { Axios } from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import qris from '../../assets/img/pembayaran/Qris.png'
import tunai from '../../assets/img/pembayaran/Tunai.png'
import detail from '../../assets/img/pembayaran/detail.png'
import identitas from '../../assets/img/pembayaran/identitas.png'
import pilih from '../../assets/img/pembayaran/pilih.png'
import total from '../../assets/img/pembayaran/total.png'
import 'flowbite';

function WorkingSection(input) {
    
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
        }

        // swal({
        //     title: "Anda yakin Pembayaran cash ?",
        //     text: "Pembayaran akan dilakukan secara Cash!",
        //     icon: "warning",
        //     buttons: true,
        //     dangerMode: true,
        //   })
        //   .then((e) => {
        //     if (e) {
        //         console.log(data);
        //         axios.post(`http://localhost:8000/api/add-pengunjung`, data).then(res => {

        //             console.log(res.data);
        //             if(res.data.status === 200)
        //             {
        //                 console.log('MANTAB BERHASIL');
        //                 history.push('/tiket');
        //             }
        //             else if(res.data.status === 422)
        //             {
        //                 console.log('ada yang salah di BE');
        //             }
        //         });


        //       swal("Poof! Pembayaran anda Berhasil !", {
        //         icon: "success",
        //       });






        //     } else {
        //       swal("Your imaginary file is safe!");
        //     }
        //   });

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
    <div>

        <div className=' xl:px-32 lg:px-10 px-4  lg:flex   justify-center bg-gray-100'>

            <div className='lg:w-2/3 w-full my-2 mt-6 mx-4'>
                <div className='container mx-auto flex bg-white   rounded-2xl py-4'>
                    <div className='w-1/6 flex mx-auto justify-center'>
                    <img src={identitas}  className='w-16 h-16'/>
                    </div>
                    <div className='w-5/6 justify-around '>
                        <p className='my-5 font-bold text-3xl'>Identitas diri</p>
                        <div className='flex'>
                            <div className='font-bold'>
                                <p className='my-3'>Nama: </p>
                                <p className='mb-3'>Nomor Hp: </p>
                            </div>
                            <div className='pl-2'>
                                <p className='my-3'>{input.data.nama}</p>
                                <p className='mb-3'>{input.data.phone}</p>
                            </div>
                            <div className='md:pl-24 font-bold'>
                                {/* <p>NIK</p> */}
                                <p className='my-3 '>Asal Kota : </p>
                            </div>
                            <div className='pl-3 '>
                                {/* <p>NIK</p> */}
                                <p className='my-3 '>{input.data.kota}</p>
                            </div>
                        </div>
                    </div>

                </div>

               

                {input.input == 0 ? "":<div className='container mx-auto flex bg-white my-6   rounded-2xl py-4'>
                    <div className='w-1/6 flex mx-auto justify-center '>
                    <img src={pilih}  className='w-16 h-16'/>
                        
                    </div>
                    <div className='w-5/6 ' >
                        <p className='font-bold text-3xl py-4'>Pilih Metode Pembayaran</p>
                        <div className='w-full mx-auto justify-center'>
                            <label className='flex max-w-full items-center hover:bg-gray-100 p-5 mx-5 rounded-3xl my-5 transition-all duration-500 ease-in-out'>
                                <div className='flex w-2/3 justify-around items-center'>
                                    <img src={tunai}  className='w-1/5 '/>
                                    <p className='text-center text-2xl'>  Tunai </p>
                                </div>
                                <input  type="radio" value="tunai" checked={pembayaran === "Male"}  onChange={onValueChange}
                                className ='ml-24 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                />
                            </label>
                            <label  className='cursor-not-allowed flex max-w-full items-center hover:bg-gray-100 p-5 mx-5 rounded-3xl my-5 transition-all duration-500 ease-in-out'>
                                <div className='flex w-2/3 justify-around items-center'>
                                    <img src={qris}  className='w-1/5'/>
                                    <p className='text-center text-2xl'>  Qris </p>
                                </div>
                                <input disabled={true} type="radio" value="qris" checked={pembayaran === "Female"} onChange={onValueChange}
                                className ='ml-24 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                />
                            </label>
                        </div>
                        <div className='flex flex-col justify-end content-end items-end '>
                            <div className='lg:w- pr-6 flex'>
                                <p className='p-3  font-bold text-xl'>Pembayaran : </p>
                                <p className='p-3  font-bold text-xl'>{pembayaran}</p>
                            </div>    
                            <p className='pr-6 text-red-500 text-sm'>{"* " + danger}</p>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>}
                
            
            </div>
                <div className='lg:w-1/3 w-full my-2 mx-4 mt-6 h-1/2'>
                    <div className='container  mx-auto flex bg-white   rounded-2xl py-6'>
                        <div className='w-1/6 min-w-max flex mx-auto justify-center '>
                            <img src={detail}  className='w-16 h-16'/>
                        </div>
                        <div className='lg:block  bg-white w-5/6 mx-4'>
                            <p className='my-5 font-bold text-3xl w-full'>Detail Pesanan</p>
                            <div className='flex flex-wrap'>
                                <div className='lg:w-full w-1/2'>
                                    <p className='font-bold'>Pesanan Tiket pada</p>
                                    <p  >{input.data.museum}</p>
                                </div>
                                <div className='w-1/2 lg:w-full lg:pt-4'>
                                    <div>
                                        <p className='font-bold'>Tanggal Pemesanan</p>
                                        <p>{input.data.tanggal}</p>
                                    </div>
                                </div>
                                <div className='w-1/2 mt-4 lg:w-full ' >
                                    <div>
                                        <p className='font-bold'>Kategori</p>
                                        <p>{input.data.kategori}</p>
                                    </div>
                                </div>
                                <div className='w-1/2 mt-4 lg:w-full '>
                                    <div>
                                        <p className='font-bold'>Jumlah Tiket</p>
                                        <p>{input.data.jumlah}</p>
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
                    <div className='container mx-auto flex bg-white my-6   rounded-2xl py-4'>
                        <div className='w-1/6 min-w-max flex mx-auto justify-center '>
                            <img src={total}  className='w-16 h-16'/>            
                        </div>
                        <div className='w-5/6'>
                            <p className='my-5 font-bold mx-4 text-2xl'>Total Pembayaran</p>
                            <div className='w-full text-right pr-12'>
                                <p className='my-5 font-semibold text-2xl'>{rupiah(input.input)} -</p>
                            </div>
                        </div>
                    </div>
                </div>
            


        </div>
                <div className='bg-gray-100 flex justify-center items-end '>
                    
                    <button className='bg-[#A70B0B] rounded-full w-full py-4 lg:mx-72 mx-24 text-white tracking-wider font-semibold' onClick={handleCash}>Selanjutnya</button>
                </div>
    </div>
  )
}

export default WorkingSection
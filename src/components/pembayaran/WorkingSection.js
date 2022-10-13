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
    const history = useHistory();

    console.log(input);
    const handleCash = () =>{
        // console.log(input.data);
        setPembayaran('cash')
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

        <div className='container p-8 flex mx-auto justify-center bg-gray-100'>

            <div className='w-2/3 my-12 mx-4'>
                <div className='container flex bg-white shadow-xl rounded-2xl py-4'>
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
                            <div className='pl-24 font-bold'>
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

                <div className='container flex bg-white my-6 shadow-xl rounded-2xl py-4'>
                    <div className='w-1/6 flex mx-auto justify-center '>
                    <img src={total}  className='w-16 h-16'/>
                        
                    </div>
                    <div className='w-5/6'>
                        <p className='my-5 font-bold text-3xl'>Total Pemmbayaran</p>
                        <div className='w-full text-right pr-12'>
                            <p className='my-5 font-bold text-3xl'>{rupiah(input.input)} -</p>
                        </div>
                    </div>
                </div>

                <div className='container flex bg-white my-6 shadow-xl rounded-2xl py-4'>
                    <div className='w-1/6 flex mx-auto justify-center '>
                    <img src={pilih}  className='w-16 h-16'/>
                        
                    </div>
                    <div className='w-5/6 ' >
                        <p className='font-bold text-3xl py-4'>Pilih Metode Pembayaran</p>
                        <div className='w-full mx-auto justify-center'>
                            <label className='flex max-w-full items-center hover:bg-gray-100 p-5 mx-5 rounded-3xl my-5 transition-all duration-500 ease-in-out'>
                                <div className='flex w-2/3 justify-around items-center p-4'>
                                    <img src={tunai}  className='w-1/4 '/>
                                    <p className='text-center text-2xl'>  Tunai </p>
                                </div>
                                <input  type="radio" value="tunai" checked={pembayaran === "Male"}  onChange={onValueChange}
                                className ='ml-24 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                />
                            </label>
                            <label  className='cursor-not-allowed flex max-w-full items-center hover:bg-gray-100 p-5 mx-5 rounded-3xl my-5 transition-all duration-500 ease-in-out'>
                                <div className='flex w-2/3 justify-around items-center p-4'>
                                    <img src={qris}  className='w-1/4'/>
                                    <p className='text-center text-2xl'>  Qris </p>
                                </div>
                                <input disabled={true} type="radio" value="qris" checked={pembayaran === "Female"} onChange={onValueChange}
                                className ='ml-24 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                />
                            </label>
                        </div>
                        <div className='flex justify-end'>
                            <div className='w-1/2 flex'>
                                <p className='p-6 pr-12 font-bold text-xl'>Pembayaran : </p>
                                <p className='p-6 pr-12 font-bold text-xl'>{pembayaran}</p>
                            </div>    
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
                
                {/* <div className=' container bg-white mt-12 '>
                    <p className='font-bold text-xl'>Total :</p>
                    <p className='text-6xl font-bold'>Rp. {input.input}</p>
                </div>
                <div class="flex flex-col px-8 bg-white py-12">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8 ">
                    <div class="overflow-hidden">
                        <table class="min-w-full text-center bg-white ">
                        <thead class="border-b">
                            <tr>
                            <th scope="col" colSpan={2} class=" text-sm font-medium border-8 border-red-600 bg-red-700 text-gray-900 px-6 py-4">
                               <p className='font-bold text-lg text-white text-left'> Pilih Metode Pembayaran</p>
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-gray-500 border-4">
                                <td class="felx text-sm  text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                    <div className='flex justify-around items-center p-4'>
                                        <img src={tunai}  className='w-1/6 '/>
                                        <p className='text-center text-2xl'>  Tunai </p>
                                        <img src={panah} className='h-12 align-middle'/>
                                    </div>
                                </td>
                            </tr>
                            <tr class="border-gray-500 border-4">
                                <td class="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                <div className='flex justify-around items-center p-4'>
                                        <img src={qris}  className='w-1/6'/>
                                        <p className='text-center text-2xl'>  Qris </p>
                                        <img src={panah} className='h-12  align-middle'/>
                                    </div>
                                </td>
                            </tr>
                            
                        </tbody>
                        </table>
                        </div>
                    </div>
                </div>
                   
                </div> */}
            
            </div>
            
            <div className='w-1/3 my-12 mx-4'>
                <div className='container flex bg-white shadow-xl rounded-2xl py-6'>
                    <div className='w-1/6 flex mx-auto justify-center '>
                    <img src={pilih}  className='w-16 h-16'/>
                    </div>
                    <div className='bg-white w-2/3 mx-4'>
                        <p className='my-5 font-bold text-3xl'>Detail Pesanan</p>
                        <p>Pesanan Tiket masuk pada</p>
                        <p>{input.data.museum}</p>
                        <div className='flex'>
                            <img />
                            <div>
                                <p>Tanggal Pemesanan</p>
                                <p>{input.data.tanggal}</p>
                            </div>
                        </div>
                        <div className='flex'>
                            <img />
                            <div>
                                <p>Kategori</p>
                                <p>{input.data.kategori}</p>
                            </div>
                        </div>
                        <div className='flex'>
                            <img />
                            <div>
                                <p>Jumlah Tiket</p>
                                <p>{input.data.jumlah}</p>
                            </div>
                        </div>
                        <div className='flex'>
                            <img />
                            <div>
                                <p>Harga satuan</p>
                                {/* <p>{input.data.tanggal}</p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div className='bg-gray-100 flex justify-center'>
            
            <button className='bg-[#A70B0B] rounded-full py-4 px-8 text-white tracking-wider font-semibold' onClick={handleCash}>Selanjutnya</button>

        </div>
    </div>
  )
}

export default WorkingSection
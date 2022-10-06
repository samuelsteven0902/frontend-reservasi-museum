import axios, { Axios } from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import qris from '../../assets/img/pembayaran/Qris.png'
import tunai from '../../assets/img/pembayaran/Tunai.png'
import panah from '../../assets/img/pembayaran/panah.png'

function WorkingSection(input) {
    
    // const data = data;
    const [pembayaran,setPembayaran] = useState('')
    const history = useHistory();

    console.log(input.data);
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
    

  return (
    <div>

        <div className='container p-8 flex mx-auto justify-center bg-gray-100'>

            <div className='w-2/3 '>
                <div className='py-12 px-8 container bg-white '>
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
                   
                </div>
            </div>
            <div className='w-1/3 '>
                <div className='bg-white mx-8'>
                    <p>Detail Pesanan</p>
                </div>
            </div>

        </div>
                 <button className='bg-blue-300 rounded-md py-2 px-4' onClick={handleCash}>Cash</button>

    </div>
  )
}

export default WorkingSection
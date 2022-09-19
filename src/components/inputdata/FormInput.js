import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

function FormInput(data) {
    const [pengunjung,setPengunjung] = useState(null);
    // console.log(pengunjung); 
    const [dataPengunjung,setDataPengunjung] = useState({
        nama :'',
        kota :'',
        phone:'',
        jumlah:'',
        ktp: null, 

    });

    const [totalOrang,setTotalOrang] = useState(0)
    const [harga,setHarga] = useState(1)
    const [orang,setOrang] = useState(null)
    const min = null;
     const max = 50;

    const handleInput = (e) => {
        e.persist();
        setDataPengunjung({...dataPengunjung, [e.target.name]: e.target.value })
    }

    const handleJummlah = (e) =>{
        const value = Math.max(min, Math.min(max, Number(e.target.value)));
        console.log(value);
        setOrang(value)   
        console.log(orang);
        
    }

    const saveDataPengunjung = (e) => {
        e.preventDefault();
        
        const data = {
            nama:dataPengunjung.nama,
            kota:dataPengunjung.kota,
            phone:dataPengunjung.phone,
            jumlah:dataPengunjung.jumlah,
            ktp:dataPengunjung.ktp,
        }

        axios.post(`/api/add-pengunjung`, data).then(res => {

            if(res.data.status === 200)
            {
                swal("Success!",res.data.message,"success");
                setDataPengunjung({
                    name: '',
                    course: '',
                    email: '',
                    phone: '',
                    error_list: [],
                });
                useHistory.push('/pembayaran');
            }
            else if(res.data.status === 422)
            {
                setDataPengunjung({...dataPengunjung, error_list: res.data.validate_err });
            }
        });
    }


    const cekData = () => {
        let museum = data.data.museum;
        let umum = document.getElementById('umum');
        let kia = document.getElementById('pelajar');
        let category = data.data.category; 
        console.log(data.data.category);
        if(museum === 'museum_radya_pustaka'){
            const harga = document.getElementById('harga');
            console.log(harga);
            harga.classList.add('hidden');
        }
    
        if(category === 'umum')
        {
            umum.classList.remove('hidden');
            setHarga(7500);
        }
        else if(category === 'mahasiswa')
        {
            let ktm = document.getElementById('ktm');
            ktm.classList.remove('hidden');
            console.log('masuk sini');
            setPengunjung('Mahasiswa')
            setHarga(5000);
    
        }else if(category === 'pelajar')
        {
            kia.classList.remove('hidden');
            setPengunjung('Pelajar')
            setHarga(4000);
            
        }else if(category === 'rombongan_umum')
        {
            umum.classList.remove('hidden');
            let rombonganUmum = document.getElementById('rombonganUmum');
            rombonganUmum.classList.remove('hidden');
            setPengunjung('Rombongan Umum')
            setHarga(5000);
            
        }else if(category === 'rombongan_pelajar')
        {
            kia.classList.remove('hidden');
            let rombonganPelajar = document.getElementById('rombonganPelajar');
            rombonganPelajar.classList.remove('hidden');
            setPengunjung('Rombongan Pelajar')
            setHarga(4000);
    
        }else if(category === 'wna')
        {
    
        }
    }

        
    

    useEffect(() => {
    // console.log(museum);
    cekData();
    setTotalOrang(orang * harga) 
      
    }, [orang])
    console.log();


    return (
    <div className='container py-12 mx-auto'>
        <div className='justify-center text-center'>
            <h1 className='text-4xl font-bold'>Form Input Pengunjung <span>{pengunjung}</span>  </h1>
        </div>
        <div className="w-full px-6 md:px-24 py-12 mx-auto">
            <form onSubmit={saveDataPengunjung} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className='flex justify-around'>    
                    <div className="w-96 mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Nama
                        </label>
                        <input name='nama' onChange={handleInput} value={dataPengunjung.nama} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                    </div>
                    <div className="w-96 mb-4 mx-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Kota Asal
                        </label>
                        <input name='kota' onChange={handleInput} value={dataPengunjung.kota} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="ex: surakarta" />
                    </div>
                    {/* <div className="w-96 mb-6 mx-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Password
                        </label>
                        <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                        <p className="text-red-500 text-xs italic">Please choose a password.</p>
                    </div> */}

                </div>
                <div className='flex justify-around'>    
                    <div className="w-96 mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                            No Hp
                        </label>
                        <input name='phone' onChange={handleInput} value={dataPengunjung.phone} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="ex: 08xx - xxxx - xxxx" />
                    </div>
                    <div className="w-96 mb-4 mx-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Jumlah Orang
                        </label>
                        <input name='jumlah' onChange={(e)=>{handleInput(e); handleJummlah(e) }} value={orang} maxLength={orang} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="number" placeholder="ex : 5 orang" />
                    </div>
                </div>

                    {/* INPUTAN FILE */}
                <div id='ktp' className='flex justify-around'>
                    <div id='umum' className="max-w-96 mb-4 mx-12 hidden">
                    <div className="flex justify-center">
                        <div className="mb-3 w-96">
                            <label for="formFile" className="form-label inline-block mb-2 text-gray-700">foto KTP</label>
                            <input name='ktp' onChange={handleInput} value={dataPengunjung.ktp} className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" id="formFile" />
                        </div>
                    </div>
   
                    </div>
                    

                    <div id='rombonganUmum' className="max-w-96 mb-4 mx-12 hidden">
                    <div className="flex justify-center">
                        <div className="mb-3 w-96">
                            <label for="formFile" className="form-label inline-block mb-2 text-gray-700">Attachment</label>
                            <input className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" id="formFile" />
                        </div>
                    </div>   
                    </div>
                </div>

                <div id='ktm' className='hidden'>
                    <div className="max-w-96 mb-4 mx-12">
                    <div className="flex justify-center">
                        <div className="mb-3 w-96">
                            <label for="formFile" className="form-label inline-block mb-2 text-gray-700">Foto KTM</label>
                            <input className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" id="formFile" />
                        </div>
                    </div>   
                    </div>
                </div>
                
                <div id='kia' className='flex justify-around'>
                        <div className="flex justify-center">
                            <div id='pelajar' className="mb-3 w-96 hidden">
                                <label for="formFile" className="form-label inline-block mb-2 text-gray-700">Foto KIA</label>
                                <input className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" id="formFile" />
                            </div>
                        </div>   
                            <div id='rombonganPelajar' className="mb-3 w-96 hidden">
                                <label for="formFile" className="form-label inline-block mb-2 text-gray-700">Attachment</label>
                                <input className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" id="formFile" />
                            </div>
                </div>

                <div id='passport' className='hidden'>
                    <div className="max-w-96 mb-4 mx-12">
                    <div className="flex justify-center">
                        <div className="mb-3 w-96">
                            <label for="formFile" className="form-label inline-block mb-2 text-gray-700">Foto passport</label>
                            <input className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" id="formFile" />
                        </div>
                    </div>   
                    </div>
                </div>

                <div className="flex items-start mb-4">
                    <input id="checkbox-2" aria-describedby="checkbox-2" type="checkbox" className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded" />
                    <label for="checkbox-2" className="text-sm ml-3 font-medium text-gray-900">I want to get promotional offers</label>
                </div>

                <div className="flex flex-wrap justify-end">
                    <div className='w-1/3  text-center'>
                        <div  id='harga'  className='py-3'>
                            <p className='text-2xl font-bold '>Rp {totalOrang.toLocaleString()}</p>
                        </div>
                        <button className=" bg-[#A70B0B] hover:bg-[#A70B0B]  text-white font-bold py-2 px-24 rounded-full focus:outline-none focus:shadow-outline " type="button">
                            Next    
                        </button>
                    </div>
                </div>

                <div>
                    <p>Syarat dan Ketentuan Pengunjung</p>
                    <p>1. Dilarang membawa makan dan minuman selama didalam Museum Keris</p>
                    <p>2. Dilarang memegang  Properti didalam Museum Keris</p>
                    <p>3. Dilarang membuang sampah sembarangan</p>
                </div>

            </form>
            <p className="text-center text-gray-500 text-xs">
                &copy;2020 Acme Corp. All rights reserved.
            </p>
        </div>
    </div>
  )
}

export default FormInput
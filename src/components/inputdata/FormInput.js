// import { data } from 'autoprefixer';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import {  useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import $ from 'jquery';

function FormInput({dataAwal,dataa}) {
    const { t } = useTranslation()
 
    const [checked, setChecked] = useState(false);
    const [text, setText] = useState("");
    const [dataPengunjung,setDataPengunjung] = useState({
        nama :'',
        kota :'',
        phone:'',
        email:'',
        jumlah:'',
        foto: null,
        attachment: null,
        error_list: [],
    });

    var dayOfWeek = new Date (dataAwal.calendar).getDay();
    var isWeekend = (dayOfWeek === 6) || (dayOfWeek  === 0);
    

    const [kartu,setKartu] = useState('')

    const history = useHistory();
    const [totalOrang,setTotalOrang] = useState(0)
    const [harga,setHarga] = useState()
    const [orang,setOrang] = useState(null)

    const handleInput = (e) => {
        e.persist();
        setDataPengunjung({...dataPengunjung, [e.target.name]: e.target.value })
    }

    const handleJummlah = (e) =>{
        
    const min = dataa.min;
    const max = dataa.max;
    const value = Math.max(null , Math.min(max, Number(e.target.value)));
        setOrang(value)   
        setDataPengunjung({...dataPengunjung, [e.target.name]: e.target.value })
        e.persist();
    }
    // console.log({isWeekend,dataa,dataPengunjung,harga});


    const validasiDataPengunjung = (e) => {
        e.preventDefault();

        if(checked === false)
        {
            swal("Gagal!","Silahkan Baca Syarat dan Ketentuan terlebih dahulu","warning");
        }
        else if(checked === true)
        {
            if(+dataPengunjung.jumlah <= +dataa.min - 1)
            {
                swal("Gagal!","Jumlah Pengunjung tidak sesuai batas minimum","warning");
            }
            else if(+dataPengunjung.jumlah >= +dataa.max)
            {
                const dataInput = {
                    nama:dataPengunjung.nama,
                    kota:dataPengunjung.kota,
                    phone:dataPengunjung.phone,
                    jumlah:dataa.max,
                    email:dataPengunjung.email,
                    foto:dataPengunjung.foto,
                    museum:dataa.nama_museum,
                    kategori:dataa.nama_kategori,
                    tanggal:dataAwal.calendar,  
                }
                axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/validasi-pengunjung`, dataInput,{
                    headers:{
                        "Content-Type":"multipart/form-data",
                    }
                }).then(res => {
                    console.log(res.data.foto);
                    if(res.data.status === 200)
                    {
                        console.log('MANTAB BERHASIL');
                        history.push({ pathname:"/Pembayaran",
                                        state : {dataInput,totalOrang}
                                            });
                    }
                    else if(res.data.status === 422)
                    {
                        setDataPengunjung({...dataPengunjung, error_list: res.data.validate_err });
                    }
                });
            }
            else
            {
                const dataInput = {
                    nama:dataPengunjung.nama,
                    kota:dataPengunjung.kota,
                    phone:dataPengunjung.phone,
                    jumlah:dataPengunjung.jumlah,
                    foto:dataPengunjung.foto,
                    email:dataPengunjung.email,
                    museum:dataa.nama_museum,
                    kategori:dataa.nama_kategori,
                    tanggal:dataAwal.calendar,  
                }

                axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/validasi-pengunjung`, dataInput,{
                    headers:{
                        "Content-Type":"multipart/form-data",
                    }
                }).then(res => {
                    console.log(res.data.foto);
                    if(res.data.status === 200)
                    {
                        console.log('MANTAB BERHASIL');
                        history.push({ pathname:"/Pembayaran",
                                        state : {dataInput,totalOrang}
                                            });
                    }
                    else if(res.data.status === 422)
                    {
                        setDataPengunjung({...dataPengunjung, error_list: res.data.validate_err });
                    }
                });
            }
        }
    }

    const handleFoto = (e) =>{
        let fotoKartu = new FormData();
        fotoKartu.append("fotoKartu", kartu)
        setKartu(e.target.files[0])
        setDataPengunjung({...dataPengunjung, foto: fotoKartu })
    }

    useEffect(() => {
    setHarga(dataa && dataa.hari_libur)

    if(dataa)
    {
        if(isWeekend === false )
        {
            setHarga(dataa.hari_biasa)
        }
        else
        { 
            setHarga(dataa.hari_libur)
        }
    }

    setTotalOrang(orang * harga);
    }, [orang,dataPengunjung,kartu,dataa,harga])

    $('input[type=number]').on('mousewheel', function(e) {
        $(e.target).blur();
      });

     
    
    return (
    <div className='pt-36 py- mx-auto'>
        <div className="w-full px-6 md:px-16 py-12 mx-auto">
            <form onSubmit={validasiDataPengunjung} className="bg-white shadow-md rounded-lg px-8 lg:pt-56 md:pt-64 pt-[20rem] pb-8 mb-4">
        <div className='justify-center text-center py-10'>
            <h1 className='sm:text-4xl text-3xl font-merriweather font-bold'>{t('formInput.input.judul')} <span>{dataa && dataa.nama_kategori}</span></h1>
        </div>
            <div className='md:flex justify-around'>    
                <div className="w-96 mb-4 mx-auto md:mx-0">
                    <label className="block text-gray-700 text-sm font-bold mb-2 font-nunito" for="username">{t('formInput.input.nama')}</label>
                    <input name='nama' onChange={handleInput} value={dataPengunjung.nama} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder={t('formInput.input.contohnama')} />
                    <span className="text-sm text-red-500">{dataPengunjung.error_list.nama}</span>
                </div>
                <div className="w-96 mb-4 mx-auto md:mx-6 md:mt-0 mt-8">
                    <label className="block text-gray-700 text-sm font-bold mb-2 font-nunito" for="kota">{t('formInput.input.kota')}</label>
                    <input name='kota' onChange={handleInput} value={dataPengunjung.kota} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder={t('formInput.input.contohkota')} />
                    <span className="text-sm text-red-500">{dataPengunjung.error_list.kota}</span>
                </div>
            </div>
                <div className='md:flex justify-around md:mt-0 mt-8'>    
                    <div className="w-96 mb-4 mx-auto md:mx-0">
                        <label className="block text-gray-700 text-sm font-bold mb-2 font-nunito" for="hp">{t('formInput.input.no')}</label>
                        <input name='phone' onChange={handleInput} value={dataPengunjung.phone} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder={t('formInput.input.contohno')} />
                        <span className="text-sm text-red-500">{dataPengunjung.error_list.phone}</span>
                    </div>
                    <div className="w-96 mb-4 md:mx-6 mx-auto md:mt-0 mt-8">
                        <label className="block text-gray-700 text-sm font-bold mb-2 font-nunito" for="jumlah">{t('formInput.input.jumlah')}</label>
                        <input type="number" inputmode="numeric" pattern="[0-9]*" name='jumlah' onChange={(e)=>{ handleJummlah(e);  }} value={orang} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder={dataa && "Contoh : " + dataa.min + " orang"}></input>
                        <div className='flex justify-end pr-2'>
                            <span className="text-sm pr-6">min : {dataa && dataa.min}</span>
                            <span className="text-sm ">max : {dataa && dataa.max}</span>
                        </div>
                        <span className="text-sm text-red-500">{dataPengunjung.error_list.jumlah}</span>
                    </div>
                </div>
                <div className='md:flex justify-around md:mt-0 mt-8'>    
                    <div className="w-96 mb-4 mx-auto md:mx-0">
                        <label className="block text-gray-700 text-sm font-bold mb-2 font-nunito" for="email">Email</label>
                        <input name='email' onChange={handleInput} value={dataPengunjung.email} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Contoh : pengunjung@Gmail.com" />
                        <span className="text-sm text-red-500">{dataPengunjung.error_list.email}</span>
                    </div>
                </div>
                <div className='mt-16 w-11/12 mx-auto font-nunito'>
                    <p>{t('formInput.syarat.judul')}</p>
                    <p>{t('formInput.syarat.part1')}</p>
                    <p>{t('formInput.syarat.part2')}</p>
                    <p>{t('formInput.syarat.part3')}</p>
                    <p>{t('formInput.syarat.part4')}</p>
                    <p>{t('formInput.syarat.part5')}</p>
                </div>
                <div className="flex items-start my-4   w-11/12 mx-auto">
                    <input name="checkbox" type="checkbox" checked={checked} onChange={() => {
                        if(checked){
                    // setText('Silahkan baca ketentuan terlebih dahulu')
                    }
                        console.log(checked);
                        setChecked(!checked)
                    }
                    } id="checkbox-2" aria-describedby="checkbox-2" className="bg-gray-50 border-gray-800 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded" />
                    <label for="checkbox-2" className="text-sm ml-3 font-medium text-black font-nunito">{t('formInput.syarat.checkbox')}</label>
                </div>
                <div className="flex flex-wrap justify-end">
                    <div className='md:w-1/3 text-center'>
                        <div id='harga' className='py-3'>
                            <p className='text-2xl font-bold'>Rp {totalOrang.toLocaleString()}</p>
                        </div>
                        <button className=" bg-[#A70B0B] text-white font-bold py-4 w-52 rounded-full focus:outline-none focus:shadow-outline hover:bg-red-900 focus:bg-red-700 font-nunito" type="submit">{t('formInput.tombol')}
                        </button>
                        <p className='text-sm text-red-400'>{text}</p>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center mt-10 p-4 mb-4 mx-16 text-base text-center text-red-700 bg-red-100 rounded-lg dark:bg-gray-800 dark:text-red-400 font-nunito" role="alert">
                    <span className="font-bold">{t('formInput.perhatian.judul')}</span>{t('formInput.perhatian.desc')}
                </div>
            </form>
        </div>
    </div>
    )
}

export default FormInput
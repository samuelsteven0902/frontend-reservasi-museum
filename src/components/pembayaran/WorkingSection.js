import axios, { Axios } from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { data } from 'autoprefixer';
import swal from 'sweetalert';
import qris from '../../assets/img/pembayaran/Qris.png'
import tunai from '../../assets/img/pembayaran/Tunai.png'
import detail from '../../assets/img/pembayaran/detail.png'
import identitas from '../../assets/img/pembayaran/identitas.png'
import pilih from '../../assets/img/pembayaran/pilih.png'
import total from '../../assets/img/pembayaran/total.png'
import 'flowbite';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

function WorkingSection(input) {
    const { t } = useTranslation();
    // const data = data;
    const [pembayaran,setPembayaran] = useState('')
    const [danger,setDanger] = useState('')
    const history = useHistory();

    const redirect = useHistory();



    console.log(input);
    const handleCash = () =>{
        // console.log(input.data);
        // console.log(pembayaran);

        if(pembayaran === 'tunai' || input.input == 0){
                 (t('pembayaran.metode.cash'))
            // console.log(pembayaran);

            const data = {
                nama:input.data.nama,
                kota:input.data.kota,
                phone:input.data.phone,
                jumlah:input.data.jumlah,
                museum:input.data.museum,
                kategori:input.data.kategori,
                tanggal:input.data.email,
                email:input.data.tanggal,
                foto:input.data.foto,
                harga_awal:input.input,  
                pembayaran: pembayaran,
                // tiket: input.data.kode_tiket,
                status: input.input === 0?'Lunas':'Belum Lunas' ,
            }
            // console.log(data);
            
            axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/add-pengunjung`, data, {
                headers : {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  Authorization: `Bearer ${Cookies.get('token')}`,
                }}).then(res => {
                    // console.log(res);
                    if(res.data.status === 200)
                    {
                        
                        history.push({ pathname:"/tiket/" + res.data.kode_tiket });
                        swal("Success",res.data.message,"success")
                        
                    }
                    else if(res.data.status === 422)
                    {
                        swal("Error","Maaf terjadi kesalahan","error")
                        // console.log('ada yang salah di BE');
                    }
                });
            }else if(pembayaran === 'non-tunai'){
                const data = {
                    nama:input.data.nama,
                    kota:input.data.kota,
                    phone:input.data.phone,
                    jumlah:input.data.jumlah,
                    museum:input.data.museum,
                    email:input.data.email,
                    kategori:input.data.kategori,
                    tanggal:input.data.tanggal,
                    foto:input.data.foto,
                    harga_awal:input.input,  
                    pembayaran: pembayaran,
                    // tiket: input.data.kode_tiket,
                    status: 'belum lunas',
                }
                history.push({ pathname:"/checkout",state: {data} });
            }else{
                
                swal("Fail","","warning")
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
        setPembayaran(e.target.value)
    }

    var lang = localStorage.getItem("i18nextLng");
    
return (
    <div>
        <div className=' xl:px-32 lg:px-10 px-4  lg:flex   justify-center bg-gray-100'>
            <div className='lg:w-2/3 w-full my-2 mt-6 mx-4'>
                <div className='container mx-auto flex bg-white rounded-2xl py-4'>
                    <div className='w-1/6 flex mx-auto justify-center'>
                    <img src={identitas} className='w-16 h-16'/>
                    </div>
                    <div className='w-5/6 justify-around '>
                        <p className='font-merriweather font-bold text-3xl py-3'>{t('pembayaran.judul')}</p>
                        <div className='flex'>
                            <div className='font-bold font-nunito'>
                                <p className='my-3'>{t('pembayaran.identitas.nama')}: </p>
                                <p className='mb-3'>{t('pembayaran.identitas.no')}: </p>
                            </div>
                            <div className='pl-2'>
                                <p className='my-3'>{input.data.nama}</p>
                                <p className='mb-3'>{input.data.phone}</p>
                            </div>
                            <div className='md:pl-24 font-bold'>
                                {/* <p>NIK</p> */}
                                <p className='my-3 font-nunito'>{t('pembayaran.identitas.kota')} : </p>
                            </div>
                            <div className='pl-3 '>
                                {/* <p>NIK</p> */}
                                <p className='my-3 '>{input.data.kota}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {input.input == 0 ? "":<div className='container mx-auto flex bg-white my-6 rounded-2xl py-4'>
                    <div className='w-1/6 flex mx-auto justify-center '>
                    <img src={pilih}  className='w-16 h-16' alt=''/>
                        
                    </div>
                    <div className='w-5/6' >
                        <p className='font-merriweather font-bold text-3xl py-3'>{t('pembayaran.metode.judul')}</p>
                        <div className='w-full mx-auto justify-center'>
                            <label className={`${pembayaran === 'tunai'?'bg-gray-200':''} flex max-w-full items-center checked:bg-gray-100 hover:bg-gray-100 mx-5 rounded-3xl my-5 py-5 border-2 transition-all duration-500 ease-in-out  `}>
                                <div className='flex w-2/3 justify-start items-center pl-5'>
                                    {/* <img src={tunai}  className='w-1/5'/> */}
                                    <p className='font-nunito font-bold text-center text-2xl'> {t('pembayaran.metode.cash')} </p>
                                </div>
                                <input  type="radio" value='tunai' checked={pembayaran === "tunai"}  onChange={onValueChange}
                                className ='peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:before:bg-pink-500 hover:before:opacity-10 '
                                />
                            </label>
                            <label  className={`${pembayaran === 'non-tunai'?'bg-gray-200':''} flex max-w-full items-center checked:bg-gray-100 hover:bg-gray-100 mx-5 rounded-3xl my-5 py-5 border-2 transition-all duration-500 ease-in-out  `}>
                                <div className='flex w-2/3 justify-start items-start pl-5'>
                                    {/* <img src={qris}  className='w-1/5'/> */}
                                    <p className='font-nunito font-bold text-center text-2xl'>{t('pembayaran.metode.cashless')}</p>
                                </div>
                                <input type="radio" value='non-tunai' checked={pembayaran === "non-tunai"} onChange={onValueChange}
                                className ='peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:before:bg-pink-500 hover:before:opacity-10'
                                />
                            </label>
                        </div>
                        <div className='flex flex-col justify-end content-end items-end '>
                            <div className='lg:w- pr-6 flex'>
                                <p className='p-3 font-nunito font-bold text-xl'>{t('pembayaran.metode.pilih')} : </p>
                                <p className='p-3 font-nunito font-bold text-xl'>{lang === 'id' ? pembayaran=== 'tunai' ? 'Tunai': 'Non-Tunai'  :pembayaran=== 'tunai' ? 'Cash': 'Cashless'}</p>
                            </div>    
                            {/* <p className='pr-6 text-red-500 text-sm'>{"* " + danger}</p> */}
                        </div>
                    </div>
                    <div>
                    </div>
                </div>}
                
            
            </div>
                <div className='lg:w-1/3 w-full my-2 mx-4 mt-6 h-1/2'>
                    <div className='container  mx-auto flex bg-white rounded-2xl py-6'>
                        <div className='w-1/6 min-w-max flex mx-auto justify-center '>
                            <img src={detail}  className='ml-6 w-16 h-16' alt=''/>
                        </div>
                        <div className='lg:block  bg-white w-5/6 mx-4'>
                            <p className='font-merriweather font-bold text-3xl py-3'>{t('pembayaran.detail.judul')}</p>
                            <div className='flex flex-wrap'>
                                <div className='lg:w-full w-1/2'>
                                    <p className='font-nunito font-bold'>{t('pembayaran.detail.museum')}</p>
                                    <p  >{input.data.museum}</p>
                                </div>
                                <div className='w-1/2 lg:w-full lg:pt-4'>
                                    <div>
                                        <p className='font-bold font-nunito'>{t('pembayaran.detail.tgl')}</p>
                                        <p>{input.data.tanggal}</p>
                                    </div>
                                </div>
                                <div className='w-1/2 mt-4 lg:w-full ' >
                                    <div>
                                        <p className='font-bold font-nunito'>{t('pembayaran.detail.kategori')}</p>
                                        <p>{input.data.kategori}</p>
                                    </div>
                                </div>
                                <div className='w-1/2 mt-4 lg:w-full '>
                                    <div>
                                        <p className='font-bold font-nunito'>{t('pembayaran.detail.jumlah')}</p>
                                        <p>{input.data.jumlah}</p>
                                    </div>
                                </div>
                                <div className='w-1/2 mt-4 lg:w-full '>
                                    <div>
                                        <p className='font-bold font-nunito'>Email</p>
                                        <p>{input.data.email}</p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className='container mx-auto flex bg-white my-6 rounded-2xl py-4'>
                        <div className='w-1/6 min-w-max flex mx-auto justify-center '>
                            <img src={total}  className='ml-6 w-16 h-16' alt=''/>            
                        </div>
                        <div className='w-5/6'>
                            <p className='mx-4 text-2xl font-merriweather font-bold py-3'>{t('pembayaran.total.judul')}</p>
                            <div className='w-full text-right pr-12'>
                                <p className='my-5 font-nunito font-bold text-2xl'>{rupiah(input.input)} -</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <div className='bg-gray-100 flex justify-center items-end '>
                    
                    <button className='bg-[#A70B0B] rounded-full w-full py-4 lg:mx-72 mx-24 text-white tracking-wider font-semibold' onClick={handleCash}>{t('pembayaran.tombol')}</button>
                </div>
            </div>
    )
}

export default WorkingSection
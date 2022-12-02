import React from 'react'
import { Link } from 'react-router-dom'
import faq from '../assets/img/Landing/informasi/faq.png';
import ht from '../assets/img/Landing/informasi/harga tiket.png';
import pt from '../assets/img/Landing/informasi/panduan.png';

function Informasi() {
  return (
    <div className='  '>
        <div className='relative container mx-auto py-5 pb-20'>
            <div className='text-center w-auto mx-auto'>
                <p className='tracking-wide text-4xl font-bold font-merriweather pt-auto text-[#A70B0B]'>INFORMASI RESERVASI</p>
                <p className='tracking-[0.3rem] font-bold font-nunito pt-auto text-[#A70B0B]'>UPT Museum Surakarta</p>

            </div>
            <div className='flex justify-around pt-16 w-full'>
                {/* <Link to='/panduan'><button className='bg-[#A70B0B] w-56 h-28 py-7 px-4 text-xl text-white border-white border-4 shadow-2xl font-semibold hover:bg-red-700 transition-all duration-500 '>PANDUAN<br></br> PEMESANAN TIKET</button> </Link>  */}
                {/* <Link to='/Faq'><button className='bg-[#A70B0B] w-56 h-28 py-7 px-4 text-xl text-white border-white border-4 shadow-2xl rounded-lg font-semibold hover:bg-red-700 transition-all duration-500 '>FAQ</button></Link> */}
                <Link to='/panduan' className='text-center w-72 border-0 transition-all duration-200 ease-in-out  rounded-2xl hover:bg-[#ECE3DE] p-7'> 
                <img src={pt} className="w-24 h-24 mx-auto mb-3"/>
                  <p className='tracking-wide text-lg font-extrabold font-nunito pt-auto text-[#A70B0B]'>Panduan Reservasi Tiket</p>
                  <p className='tracking-wide text-sm font-medium font-nunito pt-auto text-black '>Petunjuk reservasi tiket dapat dilihat disini</p>
                </Link>
                <Link to='/faq' className='text-center w-72 border-0 transition-all duration-200 ease-in-out  rounded-2xl hover:bg-[#ECE3DE] p-7'> 
                <img src={faq} className="w-24 h-24 mx-auto mb-3"/>
                  <p className='tracking-wide text-lg font-extrabold font-nunito pt-auto text-[#A70B0B]'>Panduan FAQ</p>
                  <p className='tracking-wide text-sm font-medium font-nunito pt-auto text-black'>Kumpulan Pertanyaan yang sering dipertanyakan</p>
                </Link>
                <Link to='/harga-tiket' className='text-center w-72 border-0 transition-all duration-200 ease-in-out  rounded-2xl hover:bg-[#ECE3DE] p-7'> 
                <img src={ht} className="w-24 h-24 mx-auto mb-3"/>
                  <p className='tracking-wide text-lg font-extrabold font-nunito pt-auto text-[#A70B0B]'>Panduan Harga Tiket</p>
                  <p className='tracking-wide text-sm font-medium font-nunito pt-auto text-black'>Kumpulan Info harga reservasi tiket museum dapat dibaca disini</p>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Informasi
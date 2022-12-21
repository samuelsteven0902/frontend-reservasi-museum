import React from 'react'
import { useTranslation, withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'
import faq from '../assets/img/Landing/informasi/faq.png';
import ht from '../assets/img/Landing/informasi/harga tiket.png';
import pt from '../assets/img/Landing/informasi/panduan.png';
import ct from '../assets/img/Landing/informasi/cari tiket.png';

function Informasi() {
	const { t } = useTranslation();


  return (
    <div className='  '>
        <div className='relative container mx-auto py-5 pb-20'>
            <div className='text-center w-auto mx-auto' data-aos="fade-up">
                <p className='tracking-wide text-4xl font-bold font-merriweather pt-auto text-[#A70B0B]'>{t('landing.judul')}</p>
                <p className='tracking-[0.3rem] font-bold font-nunito pt-auto text-[#A70B0B] border-t-4 w-72 mx-auto border-[#A70B0B] right-1/2'>UPT Museum Surakarta</p>

            </div>
            <div className='sm:flex block justify-center pt-16 w-full'>
                <Link to='/panduan' className='text-center w-72 border-0 transition-all duration-200 ease-in-out rounded-2xl hover:bg-none sm:hover:bg-[#ECE3DE] p-7' data-aos="fade-up"data-aos-delay="150" aos-duration="1000"> 
                <img src={pt} className="w-24 h-24 mx-auto mb-3"/>
                  <p className='tracking-wide text-lg font-extrabold font-nunito pt-auto text-[#A70B0B]'>{t('landing.panduan.judul')}</p>
                  <p className='tracking-wide text-sm font-medium font-nunito pt-auto text-black '>{t('landing.panduan.desc')}</p>
                </Link>
                <Link to='/faq' className='text-center w-72 border-0 transition-all duration-200 ease-in-out mx-12 rounded-2xl hover:bg-none sm:hover:bg-[#ECE3DE] p-7' data-aos="fade-up"data-aos-delay="300" aos-duration="1000"> 
                <img src={faq} className="w-24 h-24 mx-auto mb-3 "/>
                  <p className='tracking-wide text-lg font-extrabold font-nunito pt-auto text-[#A70B0B]'>FAQ</p>
                  <p className='tracking-wide text-sm font-medium font-nunito pt-auto text-black'>{t('landing.faq')}</p>
                </Link>
                <Link to='/harga-tiket' className='text-center w-72 border-0 transition-all duration-200 ease-in-out  rounded-2xl hover:bg-none sm:hover:bg-[#ECE3DE] p-7' data-aos="fade-up" data-aos-delay="450" aos-duration="1000"> 
                <img src={ht} className="w-24 h-24 mx-auto mb-3"/>
                  <p className='tracking-wide text-lg font-extrabold font-nunito pt-auto text-[#A70B0B]'>{t('landing.harga.judul')}</p>
                  <p className='tracking-wide text-sm font-medium font-nunito pt-auto text-black'>{t('landing.harga.desc')}</p>
                </Link>
                <Link to='/' className='text-center w-72 border-0 transition-all duration-200 ease-in-out rounded-2xl hover:bg-none sm:hover:bg-[#ECE3DE] p-7' data-aos="fade-up" data-aos-delay="450" aos-duration="1000"> 
                <img src={ct} className="w-24 h-24 mx-auto mb-3"/>
                  <p className='tracking-wide text-lg font-extrabold font-nunito pt-auto text-[#A70B0B]'>{t('landing.cari.judul')}</p>
                  <p className='tracking-wide text-sm font-medium font-nunito pt-auto text-black'>{t('landing.cari.desc')}</p>
                </Link>
            </div>
      </div>
    </div>
  )
}

export default withTranslation()(Informasi)
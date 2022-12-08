import React from 'react'
import { GrInstagram } from 'react-icons/gr';
import { TbWorld } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import header_bawah from '../assets/img/Landing/header_bawah.png'
import {AiFillInstagram, AiFillYoutube} from 'react-icons/ai'
import {BsGlobe} from 'react-icons/bs'
import Map from 'pages/Map';
import WaveFooter from './WaveFooter';
import { useTranslation } from 'react-i18next';

function FooterPengunjung() {
    
	const { t } = useTranslation();

    var sectionStyle = {
        width: "100%",
        height: "400px",
        backgroundImage: "url(" + { header_bawah } + ")"
      };

return (
    <>
    
    <footer className="relative text-center lg:text-left bg-[#ECE3DE] text-black">
    <WaveFooter />
        
        <div className="mx-6 py-12 text-center md:text-left">
            <div className="grid grid-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="w-5/6 h-56 z-20  col-span-2 mx-auto">
                    {/* <Map /> */}
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.0545587044476!2d110.80861911425045!3d-7.569031194541577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a167e29505d91%3A0x9129ae0450226c4f!2sMuseum%20Keris%20Nusantara!5e0!3m2!1sen!2sid!4v1670306257940!5m2!1sen!2sid"  className='border-0 w-full h-full ' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div className="">
                    <h6 className="uppercase font-merriweather font-bold text-[#A70B0B] mb-4 flex justify-center md:justify-start">RESERVASI TIKET</h6>
                    <p className="font-nunito text-black mb-4 text-sm">
                    {t('landing.footer')}
                    </p>
                    <div className="flex flex-col">
                <a href="https://uptmuseum.surakarta.go.id/" className="flex mr-6 text-black text-xl">
                    <BsGlobe/>
                    <p className='text-sm ml-2 text-blue-600 underline'>uptmuseum.surakarta.go.id</p>
                </a>
                <a href="https://www.youtube.com/@uptmuseumkotasurakarta1625 " className="my-3 flex mr-6 text-black text-xl">
                    <AiFillYoutube/>
                    <p className='text-sm ml-2 text-blue-600 underline'>uptmuseumkotasurakarta1625</p>
                </a>
                <a href="https://www.instagram.com/uptmuseum_surakarta/ " className="flex mr-6 text-black text-xl">
                    <AiFillInstagram />
                    <p className='text-sm ml-2 text-blue-600 underline'>@uptmuseum_surakarta</p>
                </a>
            </div>
                </div>
                <div className="text-sm">
                    <h6 className="uppercase font-merriweather font-bold text-[#A70B0B] mb-4 flex justify-center md:justify-start">Contact</h6>
                    <div className="flex items-center justify-center font-nunito text-black md:justify-start mb-4">
                        <div className="fas fa-solid fa-home mr-4 text-black"></div>Jl. Bhayangkara No.2, Sriwedari, Kec. Laweyan, Kota Surakarta, Jawa Tengah 57141
                    </div>
                    <div className="flex items-center justify-center font-nunito text-black md:justify-start my-8  ">
                        <div className="fas fa-solid fa-envelope mr-4 text-base text-black"></div>info@example.com
                    </div>
                    <div className="flex items-center justify-center font-nunito text-black md:justify-start mb-4">
                        <div className="fas fa-solid fa-phone mr-4 text-base text-black"></div>+ 01 234 567 88
                    </div>
                </div>
            </div>
        </div>
        <hr className='w-full h-0.5 bg-gray-500'/>
        <div className="text-center font-merriweather text-black p-4 text-xs bg-[#ECE3DE]">
            <span>© {new Date().getFullYear()} Copyright </span><a className="font-merriweather text-black font-bold" href="https://uptmuseum.surakarta.go.id/">UPT Museum Surakarta </a><span> by KMI Team 22 </span>
        </div>
    </footer>
    </>
)
}

export default FooterPengunjung

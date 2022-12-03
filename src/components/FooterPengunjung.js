import React from 'react'
import { GrInstagram } from 'react-icons/gr';
import { TbWorld } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import header_bawah from '../assets/img/Landing/header_bawah.png'
import {AiFillInstagram, AiFillYoutube} from 'react-icons/ai'
import {BsGlobe} from 'react-icons/bs'

function FooterPengunjung() {

    var sectionStyle = {
        width: "100%",
        height: "400px",
        backgroundImage: "url(" + { header_bawah } + ")"
      };

return (
    <>
    
    <footer class="text-center lg:text-left bg-[#ECE3DE] text-black">
        <div class="flex justify-center items-center lg:justify-between p-4 pb-4 border-[#A70B0B]">
            <div class="font-nunito text-black mr-12 hidden lg:block">
                <span>Terhubung dengan kami di jejaring sosial :</span>
            </div>
            <div class="flex justify-center">
                <a href="https://uptmuseum.surakarta.go.id/" class="mr-6 text-black text-xl">
                    <BsGlobe/>
                </a>
                <a href="https://www.youtube.com/@uptmuseumkotasurakarta1625" class="mr-6 text-black text-2xl">
                    <AiFillYoutube/>
                </a>
                <a href="https://www.instagram.com/uptmuseum_surakarta/" class="mr-6 text-black text-2xl">
                    <AiFillInstagram />
                </a>
            </div>
        </div>
        
        <div class="mx-6 py-10 text-center md:text-left">
            <div class="grid grid-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div class="">
                    <h6 class="uppercase font-semibold mb-4 flex items-center justify-center md:justify-start ">
                    Tailwind ELEMENTS
                    </h6>
                </div>
                <div class="">
                    <h6 class="uppercase font-semibold mb-4 flex justify-center md:justify-start">Products </h6>
                </div>
                <div class="">
                    <h6 class="uppercase font-merriweather font-bold text-[#A70B0B] mb-4 flex justify-center md:justify-start">RESERVASI TIKET</h6>
                    <p className="font-nunito text-black mb-4">
                        Reservasi Tiket Museum bertujuan untuk memudahkan para pengunjung dalam memesan tiket secara online
                    </p>
                </div>
                <div class="">
                    <h6 class="uppercase font-merriweather font-bold text-[#A70B0B] mb-4 flex justify-center md:justify-start">Contact</h6>
                    <p classname="flex items-center justify-center font-nunito text-black md:justify-start mb-4">
                        <div className="fas fa-solid fa-home mr-4 text-black"></div>Jl. Bhayangkara No.2, Sriwedari, Kec. Laweyan, Kota Surakarta, Jawa Tengah 57141
                    </p>
                    <p classname="flex items-center justify-center font-nunito text-black md:justify-start mb-4">
                        <div className="fas fa-solid fa-envelope mr-4 text-base text-black"></div>info@example.com
                    </p>
                    <p classname="flex items-center justify-center font-nunito text-black md:justify-start mb-4">
                        <div className="fas fa-solid fa-phone mr-4 text-base text-black"></div>+ 01 234 567 88
                    </p>
                </div>
            </div>
        </div>
        <div class="text-center font-merriweather text-black p-4 bg-[#ECE3DE]">
            <span>© {new Date().getFullYear()} Copyright </span><a class="font-merriweather text-black font-bold" href="https://uptmuseum.surakarta.go.id/">UPT Museum Surakarta </a><span> by KMI Team 22 </span>
        </div>
    </footer>
    </>
)
}

export default FooterPengunjung

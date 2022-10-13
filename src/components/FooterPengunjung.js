import React from 'react'
import { GrInstagram } from 'react-icons/gr';
import { TbWorld } from 'react-icons/tb';
import header_bawah from '../assets/img/Landing/header_bawah.png'

function FooterPengunjung() {

    var sectionStyle = {
        width: "100%",
        height: "400px",
        backgroundImage: "url(" + { header_bawah } + ")"
      };

  return (
    <>
        <footer className="relative bg-gray-100 pt-8 h-[25rem]">
            <div className="container max-w-7xl m-auto w-full h-full bg-cover bg-center absolute bottom-0 bg-no-repeat  bg-clip-content bg bg-landing-bawah">
                <div className=" flex flex-wrap text-center lg:text-left pt-6 bg-gray- h-full"  style={sectionStyle}>
                    <div className='w-1/2 m-auto'>
                        <ul className='text-center text-black'>
                            <li className='py-2 text-2xl font-bold'>Museum Keris Nusantara</li>
                            <li className='py-3 font-semibold'>Alamat: Jl. Bhayangkara No.2, Sriwedari,<br></br> Kec. Laweyan, Kota Surakarta,<br></br> Jawa Tengah 57141</li>
                            <li className='flex justify-center items-center font-semibold'><GrInstagram /> <p className='pl-3'>museumkerisnusantara</p></li>
                            <li className='flex justify-center items-center'><TbWorld /><p className='pl-3 font-semibold'>uptmuseum.surakarta.go.id</p></li>
                        </ul>
                    </div>
                    <div className='w-1/2 m-auto'>
                        <ul className='text-center text-black'>
                            <li className='py-2 text-2xl font-bold'>Museum Keris Nusantara</li>
                            <li className='py-3 font-semibold'>Alamat: Jl. Bhayangkara No.2, Sriwedari,<br></br> Kec. Laweyan, Kota Surakarta,<br></br> Jawa Tengah 57141</li>
                            <li className='flex justify-center items-center font-semibold'><GrInstagram /> <p className='pl-3'>museumkerisnusantara</p></li>
                            <li className='flex justify-center items-center'><TbWorld /><p className='pl-3 font-semibold'>uptmuseum.surakarta.go.id</p></li>
                        </ul>
                    </div>
                    
                </div>
            </div>
        </footer>  
    </>
  )
}

export default FooterPengunjung
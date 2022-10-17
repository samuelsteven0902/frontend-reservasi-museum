import { LeadText } from '@material-tailwind/react'
import H2 from '@material-tailwind/react/Heading2';
import React, { useEffect, useState } from 'react'

function Header({state,harga}) {
    
  return (
    <div>
        <div className=" pt-24 pb-16 flex content-center items-center justify-center w-full  h-1/3">
            <div className="bg-gray-100 bg-center absolute top-6 w-[80%] h-1/6  bg-inputdata-backgroung  " />       
            <div className=" mx-auto z-20 w-[80%] -mt-5">
            <p className="text-center w-full text-white font-bold text-xl -mt-5">UPT MUSEUM SURAKARTA</p>
                <div className="items-center flex flex-wrap bg-[#A70B0B] mt-2 rounded-b-xl pb-1">
                    <div className="w-full  px-3 ml-auto mr-auto text-center">
                        <div className="text-gray-100">
                            <p className='text-sm mt-5' color="gray-200">
                            Solo merupakan salah satu kota yang sering dikunjungi oleh para wisatawan. Tempat wisata yang ada di Solo juga sangat beragam. Salah satu tempat wisata yang ada di Solo yaitu Museum. Banyak museum yang terdapat di Solo karena Solo juga merupakan daerah yang memiliki sejarah yang melimpah.
                            </p>
                            <p className='text-sm mb-5' color="gray-200">
                            Museum Keris Nusantara dan Radya Pustaka merupakan museum yang dikelola oleh pemerintah Solo. Keduanya memiliki daya tarik sendiri.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Header
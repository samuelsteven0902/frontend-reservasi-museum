import { LeadText } from '@material-tailwind/react'
import H2 from '@material-tailwind/react/Heading2';
import React, { useEffect, useState } from 'react'

function Header({state,harga}) {
    const id_museum = state.museum
    const id_category = state.category
    console.log(state);

    console.log(harga);

    
    const rupiah = (number)=>{
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR"
        }).format(number);
      }
    
  return (
    <div>
        <div className=" pt-24 pb-16 flex content-center items-center justify-center w-full  h-1/3">
            <div className="bg-gray-100 bg-center absolute top-0 w-[80%] h-1/3  bg-inputdata-backgroung  " />
            
            <div className=" mx-auto z-20 w-[80%]">
                
            <p className="text-center w-full text-white font-bold text-4xl ">{state.museum == 1 ? "Museum Keris Nuasantara": "Museum Radya Pustaka"}</p>
                <div className="items-center flex flex-wrap bg-[#A70B0B] mt-9 rounded-b-xl pb-7">
                    <div className="w-full  px-4 ml-auto mr-auto text-center">
                        <div className="text-gray-200">
                            <LeadText color="gray-200">
                            Museum Keris Nusantara menyuguhkan daya tarik wisata pada koleksi keris yang asalnya dari berbagai tempat. Pesona dari keindahan keris-keris yang disuguhkan di Museum Keris Nusantara memiliki keindahan tersendiri karena masing-masing dari keris itu memiliki latar belakangnya masing-masing. Keris-keris yang ditampilkan diberikan penjelasan untuk edukasi pengunjung yang hadir.
                            </LeadText>
                        </div>
                        <div className='flex'>
                            <div className='w-1/3 text-center text-white'>
                                <p className='font-serif text-lg font-semibold'>Tanggal Kunjugan</p>
                                <p>{state.calendar}</p>
                            </div>
                            <div className='w-1/3 text-center text-white'>
                                <p className='font-serif text-lg font-semibold'>Tiket Hari Biasa</p>
                                <p>{harga && rupiah(harga.hari_biasa) }</p>
                                
                            </div>
                            <div className='w-1/3 text-center text-white'>
                                <p className='font-serif text-lg font-semibold'>Tiket Hari Libur</p>
                                <p>{harga && rupiah(harga.hari_libur) }</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Header
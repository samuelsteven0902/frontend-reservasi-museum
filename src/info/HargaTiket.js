import React from 'react'
import TabelHarga from './TabelHarga'
import TabelHargaUl from './TabelHargaUl'
import TabelPerHarga from './TabelPerHarga'

function HargaTiket() {
  return (
    <div className='mx-auto bg-gray-100 sm:p-10'>
        <div className='bg-white rounded-md shadow py-6 pb-12'>
            <div className=' justify-center items-center rounded '>
            {/* <div className='w-full text-center py-3'>
                <p className='text-3xl font-bold'>INFORMASI</p>
            </div> */}
            <div className=' flex justify-center text-center py-3'>
                <p className=' bg-[#A70B0B] text-2xl rounded-md text-white py-1 px-6 font-bold' >HARGA TIKET</p>
            </div> 
            <div className=' flex justify-center text-center'>
                <p className=' bg-[#A70B0B] text-xl rounded-md text-white py-1 px-5 font-bold' >MUSEUM KERIS NUSANTARA</p>
            </div>  
            <div className=' flex justify-center text-center py-5'>
              <p className='text-gray-600 tracking-wider text-xl font-poppins'>Perda No.5 Tahun 2016 Tentang RETRIBUSI DAERAH TIKET <br></br> MASUK MUSEUM KERIS NUSANTARA KOTA SURAKARTA</p>
            </div>  
            {/* <TabelHargaUl /> */}
            <TabelHarga />
            {/* <TabelPerHarga /> */}
        </div>
        </div>
    </div>
  )
}

export default HargaTiket
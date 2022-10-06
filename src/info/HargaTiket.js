import React from 'react'
import TabelHarga from './TabelHarga'
import TabelHargaUl from './TabelHargaUl'
import TabelPerHarga from './TabelPerHarga'

function HargaTiket() {
  return (
    <div className='container bg-gray-100 p-10'>
        <div className='bg-white rounded-md shadow py-6 pb-12'>
            <div className=' justify-center items-center rounded '>
            {/* <div className='w-full text-center py-3'>
                <p className='text-3xl font-bold'>INFORMASI</p>
            </div> */}
            <div className=' flex justify-center text-center py-5'>
                <p className=' bg-[#A70B0B] text-2xl rounded-md text-white py-1 px-6 font-bold' >HARGA TIKET</p>
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
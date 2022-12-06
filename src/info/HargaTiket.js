import React from 'react'
import TabelHarga from './TabelHarga'
import TabelHargaUl from './TabelHargaUl'
import TabelPerHarga from './TabelPerHarga'

function HargaTiket() {
  return (
    <div className='mx-auto bg-gray-100 sm:p-10'>
      <div className='bg-white rounded-md shadow py-6 pb-12'>
        <div className=' justify-center items-center rounded '>
          <div className=' flex justify-center text-center'>
            <p className='text-2xl text-gray-600 font-bold'>HARGA TIKET</p>
          </div> 
          <div className=' flex justify-center text-center'>
            <p className='text-2xl text-gray-600 font-bold'>MUSEUM KERIS NUSANTARA</p>
          </div>  
          <div className=' flex justify-center text-center py-5'>
            <p className='text-black text-xl font-poppins'>Perda No.5 Tahun 2016 Tentang RETRIBUSI DAERAH TIKET <br></br> MASUK MUSEUM KERIS NUSANTARA KOTA SURAKARTA</p>
          </div>  
          <TabelHarga />
        </div>
      </div>
    </div>
  )
}

export default HargaTiket
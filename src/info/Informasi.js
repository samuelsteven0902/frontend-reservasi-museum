import React from 'react'

function Informasi() {
  return (
    <div className='bg-gray-100'>
        <div className='relative container mx-auto py-12'>
            <div className='text-center'>
                <p className='text-black text-4xl font-bold'>INFORMASI</p>
            </div>
            <div className='flex justify-around pt-16 '>
                <button className='bg-[#A70B0B] py-7 px-4 text-xl text-white border-white border-4 shadow-2xl rounded-lg font-semibold hover:bg-red-700 transition-all duration-500 '>PANDUAN<br></br> PEMESANAN TIKET</button>
                <button className='bg-[#A70B0B] py-7 px-4 text-xl text-white border-white border-4 shadow-2xl rounded-lg font-semibold hover:bg-red-700 transition-all duration-500 '>Panduan <br></br> Pemesanan Tiket</button>
            </div>
        </div>
    </div>
  )
}

export default Informasi
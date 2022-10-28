import React from 'react'
import { Link } from 'react-router-dom'

function Informasi() {
  return (
    <div className='bg-gray-100'>
        <div className='relative container mx-auto py-12'>
            <div className='text-center w-1/5 mx-auto'>
                <p className='bg-[#A70B0B] py-2 text-4xl text-white border-4 shadow-2xl rounded-lg font-bold'>INFORMASI</p>
            </div>
            <div className='flex justify-around pt-16 '>
                <Link to='/panduan'><button className='bg-[#A70B0B] w-56 h-28 py-7 px-4 text-xl text-white border-white border-4 shadow-2xl rounded-lg font-semibold hover:bg-red-700 transition-all duration-500 '>PANDUAN<br></br> PEMESANAN TIKET</button> </Link> 
                <Link to='/Faq'><button className='bg-[#A70B0B] w-56 h-28 py-7 px-4 text-xl text-white border-white border-4 shadow-2xl rounded-lg font-semibold hover:bg-red-700 transition-all duration-500 '>FAQ</button></Link>
            </div>
        </div>
    </div>
  )
}

export default Informasi
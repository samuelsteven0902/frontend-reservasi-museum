import React from 'react'

function TabelHargaUl() {
  return (
    <div>
        <div className='flex w-full justify-center'>
            <div className=' bg-[#F6F6F6] m-3 rounded-lg w-52 '>
                <ul className='list-none text-center '>
                    <li className='font-bold text-xl shadow-lg rounded-lg p-2'>Kategori</li>
                    <li className='py-1'>Umum</li>
                    <li className='py-1'>Mahsiswa</li>
                    <li className='py-1'>Pelajar</li>
                    <li className='py-1'>Rombongan Umum <br></br> min.50 orang</li>
                    <li className='py-1'>Rombongan pelajar <br></br> min.50 orang</li>
                    <li className='py-1'>Wisatawan Asing</li>
                </ul>   
            </div>
            <div className=' bg-[#F6F6F6] m-3 rounded-lg w-52 '>
                <ul className='list-none text-center'>
                    <li className='font-bold text-xl shadow-lg rounded-lg p-2'>Harga Biasa</li>
                    <li className='py-1'>Rp. 7.500,-</li>
                    <li className='py-1'>Rp. 5.000,-</li>
                    <li className='py-1'>Rp. 4.000,-</li>
                    <li className='py-1'></li>
                    <li className='py-1'>Rp. 5.000,-</li>
                    <li className='py-1'></li>
                    <li className='py-1'></li>
                    <li className='py-1'>Rp. 4.000,-</li>
                    <li className='py-1'></li>
                    <li className='py-1'></li>
                    <li className='py-1'>Rp. 15.000,-</li>
                </ul>   
            </div>
            <div className=' bg-[#F6F6F6] m-3 rounded-lg w-52 '>
                <ul className='list-none text-center'>
                    <li className='font-bold text-xl shadow-lg rounded-lg p-2'>Harga Libur</li>
                    <li className='py-1'>Rp. 10.000,-</li>
                    <li className='py-1'>Rp. 7.500,-</li>
                    <li className='py-1'>Rp. 5.000,-</li>
                    <li className='py-1'>Rp. 7.500,-</li>
                    <li className='py-1'>Rp. 5.000,-</li>
                    <li className='py-1'>Rp. 20.000,-</li>
                </ul>   
            </div>
        </div>
    </div>
  )
}

export default TabelHargaUl
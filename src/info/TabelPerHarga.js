import React from 'react'

function TabelPerHarga() {
return (
    <div>
        <div className='flex w-full justify-center'>
            <div className=' bg-[#F6F6F6] m-3 rounded-lg w-52'>
                <ul className='list-none text-center'>
                    <li className='font-bold text-xl shadow-lg bg-[#A70B0B] p-2 text-white rounded-t-lg'>Umum</li>
                    <li className='py-1'>Rp. 7.500,-</li>
                    <li className='py-1'>Rp. 10.000,-</li>
                </ul>   
            </div>
            <div className=' bg-[#F6F6F6] m-3 rounded-lg w-52'>
                <ul className='list-none text-center'>
                    <li className='font-bold text-xl shadow-lg bg-[#A70B0B] p-2 text-white rounded-t-lg'>Mahasiswa</li>
                    <li className='py-1'>Rp. 5.000,-</li>
                    <li className='py-1'>Rp. 7.500,-</li>
                </ul>   
            </div>
            <div className=' bg-[#F6F6F6] m-3 rounded-lg w-52'>
                <ul className='list-none text-center'>
                    <li className='font-bold text-xl shadow-lg bg-[#A70B0B] p-2 text-white rounded-t-lg'>Pelajar</li>
                    <li className='py-1'>Rp. 4.000,-</li>
                    <li className='py-1'>Rp. 5.000,-</li>
                </ul>   
            </div>
            <div className=' bg-[#F6F6F6] m-3 rounded-lg w-52'>
                <ul className='list-none text-center'>
                    <li className='font-bold text-xl shadow-lg bg-[#A70B0B] p-2 text-white rounded-t-lg'>Rombongan Umum min. 50 orang</li>
                    <li className='py-1'>Rp. 5.000,-</li>
                    <li className='py-1'>Rp. 7.500,-</li>
                </ul>   
            </div>
            <div className=' bg-[#F6F6F6] m-3 rounded-lg w-52'>
                <ul className='list-none text-center'>
                    <li className='font-bold text-xl shadow-lg bg-[#A70B0B] p-2 text-white rounded-t-lg'>Rombongan Pelajar min. 50 orang</li>
                    <li className='py-1'>Rp. 4.000,-</li>
                    <li className='py-1'>Rp. 5.000,-</li>
                </ul>   
            </div>
            <div className=' bg-[#F6F6F6] m-3 rounded-lg w-52'>
                <ul className='list-none text-center'>
                    <li className='font-bold text-xl shadow-lg bg-[#A70B0B] p-2 text-white rounded-t-lg'>Wisatawan Asing</li>
                    <li className='py-1'>Rp. 15.000,-</li>
                    <li className='py-1'>Rp. 20.000,-</li>
                </ul>  
            </div>
        </div>
    </div>
)
}

export default TabelPerHarga
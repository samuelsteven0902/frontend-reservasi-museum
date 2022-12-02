import React from 'react'
import { Link } from 'react-router-dom'


export default function About() {
    return (
            <div className='  '>
                <div className='relative container mx-auto py-10'>
                    <div className='w-full lg:w-6/12 px-0 ml-24 mr-auto pb-5 text-left'>
                        <p className='tracking-wide text-4xl font-bold font-merriweather pt-auto text-[#A70B0B] pb-2'>ABOUT US</p>
                        <p className='tracking-[0.3rem] font-bold font-nunito pt-auto text-[#A70B0B] border-t-4 absolute border-[#A70B0B] pt-2'>UPT Museum Surakarta</p>
                    </div>
                    <div className='w-full px-24 text-left mt-14 pb-20'>
                        <p className='text-base font-medium font-nunito pt-auto text-black'>Solo merupakan salah satu kota yang sering dikunjungi oleh para wisatawan. Tempat wisata yang ada di Solo juga sangat beragam. Salah satu tempat wisata yang ada di Solo yaitu Museum. Banyak museum yang terdapat di Solo karena Solo juga merupakan daerah yang memiliki sejarah yang melimpah 
                        </p>
                        <p className='text-base font-medium font-nunito pt-auto text-black'>Solo merupakan salah satu kota yang sering dikunjungi oleh para wisatawan. Tempat wisata yang ada di Solo juga sangat beragam. Salah satu tempat wisata yang ada di Solo yaitu Museum. Banyak museum yang terdapat di Solo karena Solo juga merupakan daerah yang memiliki sejarah yang melimpah  
                        
                        <Link to='/About' className='text-base font-medium font-nunito pt-auto text-blue-600'>   Baca Selengkapnya...</Link></p>
                    </div>
                </div>
            </div>

    )
}
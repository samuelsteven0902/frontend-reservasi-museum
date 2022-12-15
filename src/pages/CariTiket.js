import DefaultFooter from 'components/DefaultFooter'
import DefaultNavbar from 'components/DefaultNavbar'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import FooterPengunjung from 'components/FooterPengunjung'

function CariTiket() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [kode,setKode] = useState()
  const history = useHistory();

  const handleCari = () =>{
    history.push("/tiket/" + kode );
  }

  return (
    <div className='bg-gray-50'>
    <div className="absolute w-full z-20">
        <DefaultNavbar />
      </div>
    <div className='container mx-auto  p-10 h- relative min-h-screen'>
      <div className='flex justify-center flex-wrap flex-col mt-44 '>
                <p className='text-5xl font-merriweather  font-bold p-4 pb- w-full text-center'>Cari Tiket</p>
                <hr className='h-1 bg-red-300 w-1/3 flex mx-auto' />
                <p className='font-nunito tracking-wider w-3/5 mx-auto pt-6 pb-3 text-center'>
                    {/* {t('faq.desc')} */}
                </p>
                <div className='flex justify-center'>
                  
                <input type='text' className="  w-1/3   border-none ring-2 ring-red-300 focus:border-none focus:ring-red-500 focus:ring-2 active:border-none  rounded-lg"  placeholder="Cari ID Tiket disini..." onChange={e=>setKode(e.target.value)} /> 
                <button className='bg-gray-300 rounded-lg ml-2 px-3 flex items-center'> <FaSearch /> <p className='pl-1' onClick={handleCari}>Cari Tiket</p> </button>
                </div>
            </div>
    </div>
      <FooterPengunjung />
    </div>
  )
}

export default CariTiket
import { LeadText } from '@material-tailwind/react'
import H2 from '@material-tailwind/react/Heading2';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

function Header({state,data}) {
    const { t } = useTranslation()
    const id_museum = state.museum
    const id_category = state.category
    console.log(state);

    console.log(data);

    
    const rupiah = (number)=>{
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR"
        }).format(number);
      }
    
  return (
    <div className='absolute'>
        <div className=" pt-24 pb-8 flex content-center items-center justify-center w-full  h-1/3">
            <div className="bg-gray-100 bg-center absolute h-1/2 top-0 w-[80%]   bg-inputdata-backgroung  " />
            
            <div className=" mx-auto z-10 w-[80%]">
                
            <p className="text-center w-full text-white font-bold text-4xl ">{data && data.nama_museum}</p>
                <div className="items-center flex flex-wrap bg-[#A70B0B] mt-9 rounded-b-xl pb-7">
                    <div className="w-full  px-4 ml-auto mr-auto text-center">
                        <div className="text-gray-200">
                            <p className='sm:text-lg font-light leading-relaxed mt-6 mb-4 text-sm '>
                            {t('formInput.desc.isi')}
                           </p>
                        </div>
                        <div className='flex'>
                            <div className='w-1/3 text-center text-white'>
                                <p className='font-serif text-lg font-semibold'>{t('formInput.desc.tggl')}</p>
                                <p>{state.calendar}</p>
                            </div>
                            <div className='w-1/3 text-center text-white'>
                                <p className='font-serif text-lg font-semibold'>{t('formInput.desc.biasa')}</p>
                                <p>{data && rupiah(data.hari_biasa) }</p>
                                
                            </div>
                            <div className='w-1/3 text-center text-white'>
                                <p className='font-serif text-lg font-semibold'>{t('formInput.desc.libur')}</p>
                                <p>{data && rupiah(data.hari_libur) }</p>
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
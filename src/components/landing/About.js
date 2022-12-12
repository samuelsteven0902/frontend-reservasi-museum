import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'
import about1 from '../../assets/img/about1.jpeg'
import about2 from '../../assets/img/about2.jpg'


export default function About() {
	const { t } = useTranslation();
    return (
            <div className='' >
                <div className='relative container mx-auto py-10'>
                    <div className='w-full lg:w-6/12 px-0 lg:ml-24 md:ml-12 ml-3 mr-auto pb-5 text-left'>
                        <p className='tracking-wide text-4xl font-bold font-merriweather pt-auto text-[#A70B0B] pb-2'  data-aos="fade-down"  data-aos-duration="750">ABOUT US</p>
                        <p className='tracking-[0.3rem] font-bold font-nunito pt-auto text-[#A70B0B] border-t-4 absolute border-[#A70B0B] pt-2'>UPT Museum Surakarta</p>
                    </div>
                    <div className='w-full px-3 md:px-12 lg:px-24  text-left mt-14 pb-20'>
                        <div className='pb-5'  >
                        <img className="float-right w-36  mx-5 my-2 rounded-xl " src={about1} data-aos="fade-down" data-aos-delay="600" data-aos-duration="1000" />
                        <p className='text-base font-medium font-nunito pt-auto text-black ' data-aos="fade-up" data-aos-delay="300" data-aos-duration="750">{t('landing.about.part1')}
                        </p>
                        </div>
                        <div  data-aos="fade-up" data-aos-delay="450" data-aos-duration="750">
                        <p className='text-base font-medium font-nunito pt-auto text-black'>{t('landing.about.part2')}
                        
                        <Link to='/About' className='text-base font-medium font-nunito pt-auto text-blue-600'>   Baca Selengkapnya...</Link></p>
                        </div>
                    </div>
                </div>
            </div>

    )
}
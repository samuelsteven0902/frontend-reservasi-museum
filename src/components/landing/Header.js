import H2 from '@material-tailwind/react/Heading2';
import LeadText from '@material-tailwind/react/LeadText';
import foto1 from '../../assets/img/Landing/MuseumKeris1.jpg'
import foto2 from '../../assets/img/Landing/MuseumKeris2.jpg'
import foto3 from '../../assets/img/MuseumKeris.png'

import 'flowbite';
import { useTranslation } from 'react-i18next';

export default function Header() {
    const { t } = useTranslation()
    return (
    <> 
        <div className="relative pt-24 pb-32 flex content-center items-center m justify-center h-screen">
            <div className="bg-landing-background bg-cover bg-[#ECE3DE] bg-center absolute w-11/12 h-96 rounded-[2rem] m-20 " />
            <div className="container max-w-8xl relative mx-auto">
                <div className="items-start flex flex-wrap">
                    <div className="w-full lg:w-6/12 px-0 ml-24 mr-auto text-left">
                        <p className='tracking-wide text-4xl font-bold font-merriweather pt-auto text-[#A70B0B]'>{t('landing.judul')}</p>
                        <p className='tracking-[0.3rem] font-bold font-nunito pt-auto text-[#A70B0B]'>- UPT Museum Surakarta</p>
                        <div className="text-gray-200">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

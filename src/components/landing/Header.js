import H2 from '@material-tailwind/react/Heading2';
import LeadText from '@material-tailwind/react/LeadText';
import foto1 from '../../assets/img/Landing/MuseumKeris1.jpg'
import foto2 from '../../assets/img/Landing/MuseumKeris2.jpg'
import foto3 from '../../assets/img/MuseumKeris.png'

import 'flowbite';

export default function Header() {
    return (
    <> 
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center h-screen">
            <div className="bg-landing-background bg-cover bg-center absolute top-0 w-full h-full" />
            <div className="container max-w-8xl relative mx-auto">
                <div className="items-center flex flex-wrap">
                    <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                        <p className='text-5xl font-sans font-bold pt-52 text-[#A70B0B]'>RESERVASI TIKET</p>
                        <div className="text-gray-200">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

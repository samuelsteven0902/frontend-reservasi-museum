import H2 from '@material-tailwind/react/Heading2';
import LeadText from '@material-tailwind/react/LeadText';
import foto1 from '../../assets/img/Landing/Museumlandingpage.png'

import 'flowbite';
import { useTranslation } from 'react-i18next';
import { useWindupString } from 'windups';

export default function Header() {
    const { t } = useTranslation()
    const [ textEffect ] = useWindupString(t('landing.judul'), {
        pace: (char) => (char === " " ? 200 : 100),
      })
    return (
    <> 
        {/* <div className="relative pt-24 pb-32 flex content-center items-center m justify-center h-screen">
            <div className="bg-landing-background bg-cover sm:bg-cover bg-[#ECE3DE] bg-center absolute w-11/12 h-64 sm:h-96 mb-36 rounded-[2rem]  m-20 " />
            <div className="container max-w-8xl relative mx-auto">
                <div className="items-start flex flex-wrap">
                    <div className="w-full lg:w-6/12 px-0 sm:ml-24 ml-10 mr-auto text-left mb-12 sm:mb-0">
                        <p className='tracking-wide text-4xl font-bold font-merriweather pt-auto text-[#A70B0B]'>{textEffect}</p>
                        <p className='tracking-[0.3rem] font-bold font-nunito pt-auto text-[#A70B0B]' data-aos="fade-right">- UPT Museum Surakarta</p>
                        <div className="text-gray-200">
                        </div>
                    </div>
                </div>
            </div>
        </div> */}
        
        <div id="carouselExampleCaptions" class="carousel slide relative pt-24" data-bs-ride="carousel">
            <div class="carousel-indicators absolute justify-center right-0 bottom-0 left-0 flex mb-4">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>

            <div class="carousel-inner relative bg-center bg-cover overflow-hidden justify-center items-center mx-auto w-11/12 h-[26rem] mb-40 rounded-[2rem]">
                <div class="carousel-item active relative+ float-left w-full">
                    <div class="absolute bg-landing-background bg-cover sm:bg-cover bg-[#ECE3DE] bg-center w-full h-64 sm:h-[30rem] rounded-[2rem]" alt="..."/>
                    <div class="md:block absolute w-full lg:w-6/12 px-0 sm:ml-24 ml-10 mr-auto text-left mb-12 mt-36 sm:mb-0">
                        <p className='tracking-wide text-4xl font-bold font-merriweather pt-auto text-[#A70B0B]'>{textEffect}</p>
                        <p className='tracking-[0.3rem] font-bold font-nunito pt-auto text-[#A70B0B]'>- UPT Museum Surakarta</p>
                    </div>
                </div>

                <div class="carousel-item relative float-left w-full">
                    <div class="absolute ebg-landing-background2 bg-cover sm:bg-cover bg-[#ECE3DE] bg-center w-full h-64 sm:h-[30rem] rounded-[2rem]" alt="..."/>
                </div>
                
                <div class="carousel-item relative float-left w-full">
                    <div class="absolute bg-landing-background3 bg-cover sm:bg-cover bg-[#ECE3DE] bg-center w-full h-64 sm:h-[30rem] rounded-[2rem]" alt="..."/>
                    <div class="carousel-caption hidden md:block absolute text-center">
                        <h5 class="text-xl">Third slide label</h5>
                        <p>Some representative placeholder content for the third slide.</p>
                    </div>
                </div>
            </div>

            <button class="carousel-control-prev absolute top-0 bottom-0 flex items-center  pt-24 justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev" >
                <span class="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next absolute top-0 bottom-0 flex items-center pt-24 justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next" >
                <span class="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>

        </div>
    </>
    );
}

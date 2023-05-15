// import H2 from '@material-tailwind/react/Heading2';
// import LeadText from '@material-tailwind/react/LeadText';
// import foto1 from '../../assets/img/Landing/Museumlandingpage.png'
import ReactLoading from 'react-loading';

import 'flowbite';
import { useTranslation } from 'react-i18next';
import { useWindupString } from 'windups';
import { useState } from 'react';
import { useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
// import { RxDotFilled } from 'react-icons/rx';
import axios from 'axios';

export default function Header() {
    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
    const { t } = useTranslation()
    const [ textEffect ] = useWindupString(t('landing.judul'), {
        pace: (char) => (char === " " ? 200 : 100),
      })
    const [loading, setLoading] = useState(true)
    const [gambar, setGambar] = useState("")

    //show data
  const showData = ()=>{
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/show_slider`).then ((res)=>{
      if(res.status === 200){
        setGambar(res.data.data)
        // console.log(res.data)
        setLoading(false)
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  useEffect(() => {
    showData();
  }, [])

  // slider
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? gambar.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    console.log(currentIndex);
    console.log(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === gambar.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    console.log(currentIndex);
    console.log(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  
  if(loading)
  {

  }
  else
  {

    var SLIDER_HTMLTABLE = ""
    SLIDER_HTMLTABLE = gambar.map((item,index)=>{
        var link = `${process.env.REACT_APP_API_ENDPOINT}/uploads/` +gambar[currentIndex].slider_name ;
        console.log(link)
        return(
            
            <div class="carousel-item relative float-left w-full">
                <div style={{
                     backgroundImage: `url(${link} )` }}
                    //  backgroundImage: `url(${process.env.REACT_APP_API_ENDPOINT}/uploads/uF452AzUDmP1l0NhmqcinCvFbFRsnxxn.png)` }} 
                      class="absolute bg-cover sm:bg-cover bg-[#ECE3DE] bg-center w-full h-64 sm:h-[30rem] rounded-[2rem]" alt="..." />
            </div>
        )
    })  }

    return (
    <> 
        <div class="carousel-inner relative bg-center bg-cover overflow-hidden justify-center items-center mx-auto w-11/12 h-[26rem] mb-40 rounded-[2rem]">

            <div className='max-w-[1400px] h-[780px] w-full m-auto py-20 px-4 relative group'>

                { gambar.length === 0 ?
                <div class="carousel-item active relative float-left w-full">
                <div class="absolute bg-cover sm:bg-cover bg-landing-background bg-[#ECE3DE] bg-center w-full h-72 sm:h-[20rem] rounded-[2rem]" alt="..."   />
                <div class="md:block absolute w-full lg:w-6/12 px-0 sm:ml-24 ml-10 mr-auto text-left mb-12 mt-36 sm:mb-0">
                    <p className='tracking-wide text-4xl font-bold font-merriweather pt-auto text-[#A70B0B]'>{textEffect}</p>
                    <p className='tracking-[0.3rem] font-bold font-nunito pt-auto text-[#A70B0B]'>- UPT Museum Surakarta</p>
                </div>
            </div>
                : <div
                    style={{ backgroundImage: `url(${`${process.env.REACT_APP_API_ENDPOINT}/uploads/` +gambar[currentIndex].slider_name})` }}
                    className='w-full rounded-2xl bg-center bg-cover duration-500 sm:bg-cover bg-[#ECE3DE] h-72 sm:h-[20rem] rounded-[2rem]" alt="..."'>
                    <div class="md:block absolute w-full lg:w-6/12 px-0 sm:ml-24 ml-10 mr-auto text-left mb-12 mt-36 sm:mb-0">
                        <p className='tracking-wide text-4xl font-bold font-merriweather pt-auto text-[#A70B0B]'>{textEffect}</p>
                        <p className='tracking-[0.3rem] font-bold font-nunito pt-auto text-[#A70B0B]'>- UPT Museum Surakarta</p>
                    </div>
                </div>}
                {/* Left Arrow */}
                <div className='hidden group-hover:block absolute top-[30%] -translate-x-0 translate-y-[-30%] left-5 text-2xl rounded-full p-2 text-gray cursor-pointer'>
                    <BsChevronCompactLeft onClick={prevSlide} size={30} />
                </div>

                {/* Right Arrow */}
                <div className='hidden group-hover:block absolute top-[30%] -translate-x-0 translate-y-[-30%] right-5 text-2xl rounded-full p-2 text-gray cursor-pointer'>
                    <BsChevronCompactRight onClick={nextSlide} size={30} />
                </div>
            </div>
        </div>
    </>
    );
}

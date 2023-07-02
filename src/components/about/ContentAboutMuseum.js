import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading';
import ReactHtmlParser from 'react-html-parser';
import { useTranslation } from 'react-i18next';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

function ContentAboutMuseum(input) {

    const [about,setAbout] = useState('');
    const [loading,setLoading] = useState(true);
    const { t } = useTranslation();
    const [images, setImages] = useState([]);

    var lang = localStorage.getItem("i18nextLng");

      // slider
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    console.log(currentIndex);
    console.log(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    console.log(currentIndex);
    console.log(newIndex);
  };

    const fetchAbout = () =>{
      axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/show_about/${input.id}`).then(res=>{
      // console.log(res.data.dataAbout);
      setAbout(res.data.dataAbout)
      setLoading(false)
      })
    }

    const getImages = () => {
      axios
        .post(`${process.env.REACT_APP_API_ENDPOINT}/api/show_gambar_museum/${input.id}`)
        .then((response) => {
          if (response.status === 200) {
            setImages(response.data.data);
            console.log(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    useEffect(() => {
      fetchAbout()
      getImages();
    }, [])

    console.log({about,lang});

    var html_about = ''
    if(loading) {
      html_about = 
      <div className='h-screen flex justify-center items-center'>
        <ReactLoading type={"spin"} color={"red"} height={'10%'} width={'10%'} className="m-auto h-screen"/>
      </div>
    }
    else {
      html_about = 
      <>
        <p>{lang === 'id' ? ReactHtmlParser(about.about):ReactHtmlParser(about.about_en)}</p>
      </>
    }

  return (
    <div className='container mx-auto  p-10 h- relative min-h-screen'>
      <div className='flex justify-center flex-wrap flex-col mt-44'>
        <p className='text-5xl font-merriweather  font-bold p-4 pb- w-full text-center'>About { input.code }</p>
          <hr className='h-1 bg-red-300 w-1/3 flex mx-auto'/>
            <div className=' justify-center' data-aos="fade-up" data-aos-duration="750">
              {html_about}
              {images && images.length > 0 ? (
                images.map((image) => (
                <div className="w-1/3 flex items-start mt-3" key={image.id}>
                  <img src={`${process.env.REACT_APP_API_ENDPOINT}/uploads/` + image.nama_gambar} className="img-fluid img-bordered"  width="200px" alt=''/>
                </div>
                ))
              ) 
              : 
              (<h6 className="text-danger text-center">No Image Found</h6>)}
              <> 
              <div class="carousel-inner relative bg-center bg-cover overflow-hidden justify-center items-center mx-auto w-11/12 h-[26rem] mb-40 rounded-[2rem]">
                <div className='max-w-[1400px] h-[780px] w-full m-auto py-20 px-4 relative group'>
                  { images.length === 0 ?
                    <div class="carousel-item active relative float-left w-full">
                      <div class="absolute bg-cover sm:bg-cover bg-landing-background bg-[#ECE3DE] bg-center w-full h-72 sm:h-[20rem] rounded-[2rem]" alt="..."/>
                        <div class="md:block absolute w-full lg:w-6/12 px-0 sm:ml-24 ml-10 mr-auto text-left mb-12 mt-36 sm:mb-0">
                          <p className='tracking-[0.3rem] font-bold font-nunito pt-auto text-[#A70B0B]'>- UPT Museum Surakarta</p>
                        </div>
                    </div>
                    : 
                    <div style={{ backgroundImage: `url(${`${process.env.REACT_APP_API_ENDPOINT}/uploads/` +images[currentIndex].nama_gambar})` }} className='w-full rounded-2xl bg-center bg-cover duration-500 sm:bg-cover bg-[#ECE3DE] h-72 sm:h-[20rem] rounded-[2rem]" alt="..."'>
                      <div class="md:block absolute w-full lg:w-6/12 px-0 sm:ml-24 ml-10 mr-auto text-left mb-12 mt-36 sm:mb-0">
                        <p className='tracking-[0.3rem] font-bold font-nunito pt-auto text-[#A70B0B]'>- UPT Museum Surakarta</p>
                      </div>
                    </div>
                  }
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
            </div>
      </div>
    </div>
  )
}

export default ContentAboutMuseum
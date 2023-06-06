import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading';
import ReactHtmlParser from 'react-html-parser';

function AboutSetiapMuseum() {

    const [about,setAbout] = useState('');
    const [loading,setLoading] = useState(true);

    var lang = localStorage.getItem("i18nextLng");

    const fetchAbout = () =>{
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/show_about/1`).then(res=>{
        // console.log(res.data.dataAbout);
        setAbout(res.data.dataAbout)
        setLoading(false)
        })
    }

    useEffect(() => {
      fetchAbout()
    }, [])

    var html_about = ''
    if(loading)
    {
      html_about = <div className='h-screen flex justify-center items-center'>
          <ReactLoading type={"spin"} color={"red"} height={'10%'} width={'10%'} className="m-auto h-screen " />
        </div>
    }
    else
    {

        html_about = <>
                        <p>{lang === 'id' ? ReactHtmlParser(about.about):ReactHtmlParser(about.about_en)}</p>
                    </>
    }
    




  return (
    <div className='container mx-auto  p-10 h- relative min-h-screen'>
      <div className='flex justify-center flex-wrap flex-col mt-44' >
                <p className='text-5xl font-merriweather  font-bold p-4 pb- w-full text-center'>About </p>
                <hr className='h-1 bg-red-300 w-1/3 flex mx-auto' />
                <p className='font-nunito tracking-wider w-3/5 mx-auto pt-6 pb-3 text-center'>
                    {/* {t('faq.desc')} */}
                </p>
                <div className='flex justify-center' data-aos="fade-up" data-aos-duration="750">
                  {html_about}
                  {/* {lang === 'id' ? ReactHtmlParser(about.about):ReactHtmlParser(about.about_en)} */}
                {/* <input type='text' className="  w-1/3   border-none ring-2 ring-red-300 focus:border-none focus:ring-red-500 focus:ring-2 active:border-none  rounded-lg"  placeholder="Cari ID Tiket disini..." onChange={e=>setKode(e.target.value)} />  */}
                {/* <button className='bg-gray-300 rounded-lg ml-2 px-3 flex items-center'> <FaSearch /> <p className='pl-1' onClick={handleCari}>Cari Tiket</p> </button> */}
                </div>
            </div>
    </div>
  )
}

export default AboutSetiapMuseum
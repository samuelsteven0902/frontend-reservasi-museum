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
    if(loading) {
      html_about = 
      <div className='h-screen flex justify-center items-justify'>
        <ReactLoading type={"spin"} color={"red"} height={'10%'} width={'10%'} className="m-auto h-screen"/>
      </div>
    }
    else {
      html_about = <>
        <p>{lang === 'id' ? ReactHtmlParser(about.about):ReactHtmlParser(about.about_en)}</p>
      </>
    }

  return (
    <div className='container mx-auto p-10 relative min-h-screen'>
      <div className='flex justify-center flex-wrap flex-col mt-44'>
        <p className='text-5xl font-merriweather font-bold p-4 w-full text-center'>About</p>
          <hr className='h-1 bg-red-300 w-1/3 flex mx-auto'/>
            <div className='flex justify-center' data-aos="fade-up" data-aos-duration="750">
              {html_about}
            </div>
      </div>
    </div>
  )
}

export default AboutSetiapMuseum
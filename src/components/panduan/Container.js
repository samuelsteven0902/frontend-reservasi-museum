import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ReactLoading from 'react-loading';
import ReactHtmlParser from 'react-html-parser';

export default function Container({  }) {
const {t}=useTranslation()

const [panduan,setPanduan] = useState();
const [panduanText,setPanduanText] = useState();
const [loading,setLoading] = useState(true);
const [loadingGambar,setLoadingGambar] = useState(true);

var lang = localStorage.getItem("i18nextLng");

const fetchPanduan = () => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/show_files`).then(res=>{
        setPanduan(res.data.data);
        setLoadingGambar(false)
        console.log('Jalan');
    })
}

const fetchPanduanText = () => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/show_panduan/${1}`).then(res=>{
            if(res.status == 200)
            {
                setPanduanText(res.data.data)
                setLoading(false)
                console.log(panduanText);
            }
        })
}

useEffect(() => {
    fetchPanduan();
    fetchPanduanText();
}, [])

var htmlLoad = ''

if(!loading && !loadingGambar)
{
    htmlLoad =  <>
                    <p className='font-nunito tracking-wider w-3/5 mx-auto py-6 text-center'>
                                        {lang === 'id'?ReactHtmlParser(panduanText.panduan_name):ReactHtmlParser(panduanText.panduan_name_en)}

                                    </p>
                                <div className="w-5/6 mx-auto bg-gray-100 mt-12 flex justify-center flex-wrap" data-aos="fade-up" data-aos-duration="750">
                                    {panduan.map((image) => (
                                        <div className="w-full flex items-start m-5" key={image.id} >
                                            <img src={ `${process.env.REACT_APP_API_ENDPOINT}/uploads/` + image.panduan_name } className="img-fluid img-bordered w-screen" alt="panduan"/>
                                            {/* <button className="bg-red-500 w-7 h-7 rounded-full text-white hover:bg-red-300" onClick={e=>this.deleteFile(image.id,e)}>X</button> */}
                                        </div>
                                        ))}
                                </div>
                    </>


}else{

    htmlLoad =  <div className='h-screen m-auto flex justify-center items-center'>
    {/* <ReactLoading type={"spin"} color={"red"} height={'10%'} width={'10%'} className="m-auto " /> */}
                    <div role="status" class="space-y-8 animate-pulse md:space-y-0 w-full h-full justify-center md:space-x-8 md:flex md:items-center">
                        <div class="flex items-center justify-center w-5/6 h-3/4  bg-gray-500 rounded  dark:bg-gray-700">
                            <svg class="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/></svg>
                        </div>
                    </div>
                </div>

}



    return (
        <div className='container mx-auto py-24' >
            <div className='flex justify-center flex-wrap flex-col mt-12 '>
                    <p className='text-5xl font-merriweather  font-bold p-4 pb- w-full text-center'>{t('panduan.judul')}</p>
                    <hr className='h-1 bg-red-300 w-1/3 flex mx-auto' />
                 </div>
                 {htmlLoad}
                   
        </div>
        
    );
}


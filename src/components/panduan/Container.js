import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ReactLoading from 'react-loading';
import ReactHtmlParser from 'react-html-parser';

export default function Container({  }) {
const {t}=useTranslation()

const [panduan,setPanduan] = useState();
const [loading,setLoading] = useState(true);
const [dataAbout,setDataAbout] = useState([])

const fetchPanduan = () => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/show_files`).then(res=>{
        setPanduan(res.data.data);
        setLoading(false)
    })
}

const fetchPanduanText = () => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/show_about`).then(res=>{
            if(res.status == 200)
            {
                setDataAbout(res.data.dataAbout[1])
                setLoading(false)
            }
        })
}

useEffect(() => {
    fetchPanduan();
    fetchPanduanText();

}, [])



    return (
        <div className='container mx-auto py-24' >
            <div className='flex justify-center flex-wrap flex-col my-12 '>
                    <p className='text-5xl font-merriweather  font-bold p-4 pb- w-full text-center'>{t('panduan.judul')}</p>
                    <hr className='h-1 bg-red-300 w-1/3 flex mx-auto' />
                    <p className='font-nunito tracking-wider w-3/5 mx-auto py-6 text-center'>{t('panduan.desc')}</p>
        </div>
                <div className="w-5/6 mx-auto bg-gray-100 mt-12 flex justify-center flex-wrap" data-aos="fade-up" data-aos-duration="750">
                    {loading?<ReactLoading type={"spin"} color={"red"} height={'5%'} width={'5%'} className="m-auto" />:panduan.map((image) => (
                        <div className="w-full flex items-start m-5" key={image.id} >
                            <img src={ `${process.env.REACT_APP_API_ENDPOINT}/uploads/` + image.panduan_name } className="img-fluid img-bordered w-screen" alt="panduan"/>
                            {/* <button className="bg-red-500 w-7 h-7 rounded-full text-white hover:bg-red-300" onClick={e=>this.deleteFile(image.id,e)}>X</button> */}
                        </div>
                        ))}
                        {ReactHtmlParser(dataAbout.about)}
                    
                    <div className="h-32 shadow-lg">
                    </div>
            </div>
        </div>
        
    );
}


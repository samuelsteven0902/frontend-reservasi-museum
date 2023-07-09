import 'flowbite'
import { useEffect } from 'react';
import 'tw-elements'
import * as React from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

export default function Container() {

    const { t } = useTranslation()
    const [loading,setLoading] = React.useState(true)
    const [dataAbout,setDataAbout] = React.useState([])
    const [searchTerm, setSearchTerm] = React.useState("")
    const [museum,setMuseum] = React.useState("")
    const [idMuseum,setIdMuseum] = React.useState("")
    const history = useHistory();

    const fetchMuseum = async ()=>{
        const resMuseum = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/show_museum`).then((res)=>{
            setMuseum(res.data.museum);
                setLoading(false)
            console.log(res.data.museum);
        }) 
    }
    
    var x= localStorage.getItem("i18nextLng")
    console.log(x);
    
    useEffect(() => {
        fetchMuseum();
        
    }, [])
    // console.log(dataAbout);
    
    const handleMuseum = (e) =>{
        history.push({ pathname:"/about-museum/" + e.target.value,state : e.target.id});
    }

    if(loading) {
        about_data = (
            <div className='w-full flex '>
                <div role="status" class="animate-pulse flex w-full mr-4 relative">
                    <div class="h-24 bg-gray-500 bg-opacity-80 rounded-md dark:bg-gray-700 w-60 mb-4 "></div>
                </div>
                <div role="status" class="animate-pulse flex w-full mr-4 relative">
                    <div class="h-24 bg-gray-500 bg-opacity-80 rounded-md dark:bg-gray-700 w-60 mb-4 "></div>
                </div>
                <div role="status" class="animate-pulse flex w-full mr-4 relative">
                    <div class="h-24 bg-gray-500 bg-opacity-80 rounded-md dark:bg-gray-700 w-60 mb-4 "></div>
                </div>
                <div role="status" class="animate-pulse flex w-full relative">
                    <div class="h-24 bg-gray-500 bg-opacity-80 rounded-md dark:bg-gray-700 w-60 mb-4 "></div>
                </div>
            </div>
        )
    }
    else {
        var about_data = museum.map((item,index)=> {
            return (
                <button  data-aos="fade-down" data-aos-duration="750" data-aos-delay={index*200} className='border-4 rounded-md hover:bg-red-200 transition-all duration-500 ease-in-out hover:text-lg flex justify-center items-center border-red-200 h-24 ' value={item.nama_museum} onClick={handleMuseum} key={index} id={item.id}>{item.nama_museum}</button>
            )
        })
    }

    return (
        <div className>
            <div className='flex justify-center flex-wrap flex-col my-24'>
                <p className='text-5xl font-merriweather  font-bold p-4 pb- w-full text-center'>About</p>
                    <hr className='h-1 bg-red-300 w-1/3 flex mx-auto'/>
                <p className='tracking-wider w-full mx-auto pt-6 text-base font-medium font-nunito pt-auto text-black text-justify'>
                    {t('about.desc1')} {t('about.desc2')}
                </p>
            </div>
            <div className='py-6 pb-12 mt-12'>
                <div className='w-11/12 mx-auto'>
                    <div className='grid grid-cols-1 sm:grid-cols-4 gap-4'>
                        {about_data}
                    </div>
                </div>             
            </div>
        </div>
    );
}
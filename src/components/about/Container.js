import 'flowbite'
import { useEffect } from 'react';
import 'tw-elements'
import * as React from 'react';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { useTranslation } from 'react-i18next';
// import ReactHtmlParser from 'react-html-parser';
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
        history.push({ pathname:"/about-museum/" + e.target.value,
                                        state : e.target.id
                                            });
    }

    if(loading)
    {
        about_data = (
            <div className='w-full flex '>
            {/* <ReactLoading type={"spin"} color={"red"} height={'10%'} width={'10%'} className="m-auto" /> */}
                <div role="status" class="animate-pulse flex w-full mr-4 relative">
                {/* <ReactLoading type={"spin"} color={"red"} height={'10%'} width={'10%'} className="absolute top-1/3 left-[47%]" /> */}
                     <div class="h-24 bg-gray-500 bg-opacity-80 rounded-md dark:bg-gray-700 w-60 mb-4 "></div>
                </div>
                <div role="status" class="animate-pulse flex w-full mr-4 relative">
                {/* <ReactLoading type={"spin"} color={"red"} height={'10%'} width={'10%'} className="absolute top-1/3 left-[47%]" /> */}
                     <div class="h-24 bg-gray-500 bg-opacity-80 rounded-md dark:bg-gray-700 w-60 mb-4 "></div>
                </div>
                <div role="status" class="animate-pulse flex w-full mr-4 relative">
                {/* <ReactLoading type={"spin"} color={"red"} height={'10%'} width={'10%'} className="absolute top-1/3 left-[47%]" /> */}
                     <div class="h-24 bg-gray-500 bg-opacity-80 rounded-md dark:bg-gray-700 w-60 mb-4 "></div>
                </div>
                <div role="status" class="animate-pulse flex w-full relative">
                {/* <ReactLoading type={"spin"} color={"red"} height={'10%'} width={'10%'} className="absolute top-1/3 left-[47%]" /> */}
                     <div class="h-24 bg-gray-500 bg-opacity-80 rounded-md dark:bg-gray-700 w-60 mb-4 "></div>
                </div>
            </div>
        )
    }
    else
    {
        var about_data = museum.map((item,index)=>{
            return (
                <button  data-aos="fade-down" data-aos-duration="750" data-aos-delay={index*200} className='border-4 rounded-md hover:bg-red-200 transition-all duration-500 ease-in-out hover:text-lg flex justify-center items-center border-red-200 h-24 ' value={item.nama_museum} onClick={handleMuseum} key={index} id={item.id}>{item.nama_museum}</button>
            )
        })
       
    }

    

    return (
        <div className>
            <div className='flex justify-center flex-wrap flex-col my-24 '>
                <p className='text-5xl font-merriweather  font-bold p-4 pb- w-full text-center'>About</p>
                <hr className='h-1 bg-red-300 w-1/3 flex mx-auto' />
                <p className='tracking-wider w-full mx-auto pt-6 text-base font-medium font-nunito pt-auto text-black text-center'>
                    {t('about.desc1')} {t('about.desc2')}
                </p>
            </div>
            {/* <div className="w-11/12 mx-auto min-h-full">
                <div className="flex text-black">
                    <div className='sm:mx-8 mx-2 pt-5 mb-12'>
                        <p className='font-nunito text-lg text-justify indent-20'>
                        {t('about.isi.part1')}</p>
                        <p className='font-nunito text-lg text-justify'>
                        {t('about.isi.part2')}.</p>
                            <img class="sm:float-right py-6 sm:py-0 w-60 mt-5  mx-auto sm:mx-5  ... " src={about1}/>
                        <p className='font-nunito pt-3  text-lg pr-5 w- text-justify  indent-20'>
                        {t('about.isi.part3')} {t('about.isi.part4')}</p>
                            <img class="sm:float-left py-6 sm:py-0 w-60 mx-auto sm:mx-5 pt-3 mt-4 pb-5 ..." src={about2}/>
                        <p className='font-nunito text-lg pt-3 text-justify  indent-20'>
                        {t('about.isi.part5')}{t('about.isi.part6')}</p>
                        <p className='font-nunito text-lg pt-3 text-justify  indent-20'>
                        {t('about.isi.part7')}</p>
                    </div>
                </div> */}
            <div className='py-6 pb-12 mt-12'>
                <div className='w-11/12 mx-auto '>
                <div className='grid grid-cols-1 sm:grid-cols-4 gap-4 ' >
                    {about_data}
                </div>

                </div>             
            </div>
        </div>
    );
}
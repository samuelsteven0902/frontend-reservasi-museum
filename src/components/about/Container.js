import 'flowbite'
import { useEffect } from 'react';
import 'tw-elements'
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { useTranslation } from 'react-i18next';

export default function Container({  }) {

    const { t } = useTranslation()

    const [loading,setLoading] = React.useState(true)
    const [dataAbout,setDataAbout] = React.useState([])
    const [searchTerm, setSearchTerm] = React.useState("")


    useEffect(() => {
        axios.get('http://localhost:8000/api/show_about').then(res=>{
            if(res.status == 200)
            {
                setDataAbout(res.data.dataAbout)
                setLoading(false)
            }
        })
        
    }, [])

    if(loading)
    {
        about_data = (
            <ReactLoading type={"spin"} color={"red"} height={'10%'} width={'10%'} className="m-auto" />
        )
    }
    else
    {
        var about_data = "";
        about_data = dataAbout.map((item,index)=>{
            return(
                
                <div>
                    <p className=''>{item.about}</p>
                </div>
            )
        })
    }
    

    return (
        <div className=''>
            <div className='flex justify-center flex-wrap flex-col my-24 '>
                <p className='text-5xl font-merriweather  font-bold p-4 pb- w-full text-center'>About</p>
                <hr className='h-1 bg-red-300 w-1/3 flex mx-auto' />
                <p className='font-nunito tracking-wider w-3/5 mx-auto pt-6 pb-3 text-center'>
                    {t('about.desc')}
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
            <div className=' py-6 pb-12 mt-12'>
                <div className='w-11/12 mx-auto'>
                {about_data}
                </div>             
            </div>
        </div>
    );
}
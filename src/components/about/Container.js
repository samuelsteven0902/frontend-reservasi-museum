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
            <div className=' py-6 pb-12 mt-12'>
                <div className='w-11/12 mx-auto'>
                {about_data}
                </div>             
            </div>
        </div>
    );
}
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

export default function Container({  }) {

    const [loading,setLoading] = React.useState(true)
    const [dataFaq,setDataFaq] = React.useState([])


    useEffect(() => {
        axios.get('http://localhost:8000/api/show_faq').then(res=>{
            if(res.status == 200)
            {
                setDataFaq(res.data.dataFAQ)
                setLoading(false)
            }
        })
        
    }, [])

    if(loading)
    {
        return (
            <ReactLoading type={"bubbles"} color={"red"} height={'20%'} width={'20%'} className="m-auto" />
        )
    }
    else
    {
        var faq_data = "";
        faq_data = dataFaq.map((item,index)=>{
            return(
                <Accordion TransitionProps={{ unmountOnExit: true }} key={index} className="bg-red-300 text-xs" sx={{ color: '#ff8a80'}}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Typography>{item.question}<span className='text-blue-500'></span> </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                    {item.answer}
                    </Typography>
                    </AccordionDetails>
                </Accordion>
            )
        })
    }
    

    return (
        <div className=''>
            <div className='bg-white rounded-md shadow py-6 pb-12 mt-12'>
                <div className='flex justify-center pt-3 pb-5'>
                    <button className="w-32 text-white bg-[#A70B0B] font-poppins text-lg rounded-xl">FAQ</button>
                </div>  
                <div className='w-11/12 mx-auto'>
                {faq_data}
                </div>             
            </div>
        </div>
    );
}
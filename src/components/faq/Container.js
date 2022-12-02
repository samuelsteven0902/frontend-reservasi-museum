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
    const [searchTerm, setSearchTerm] = React.useState("")


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
        faq_data = (
            <ReactLoading type={"spin"} color={"red"} height={'10%'} width={'10%'} className="m-auto" />
        )
    }
    else
    {
        var faq_data = "";
        faq_data = dataFaq.filter(val=>{
            if(searchTerm == "")
            {
              return val
            }
            else if(val.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            val.question    .toLowerCase().includes(searchTerm.toLowerCase()) )
            {
              return val
            }
          }).map((item,index)=>{
            return(
                <Accordion TransitionProps={{ unmountOnExit: true }} key={index} className="bg-red-300 text-xs" sx={{ color: '#ff8a80'}}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Typography>
                        <p className='text-2xl p-3 text-black'>
                        {item.question}
                        </p>
                         </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                   <p className='text-red-600'> {item.answer}</p>
                    </Typography>
                    </AccordionDetails>
                </Accordion>
            )
        })
    }
    

    return (
        <div className=''>
            <div className='flex justify-center flex-wrap flex-col my-24 '>
                <p className='text-5xl font-merriweather  font-bold p-4 pb- w-full text-center'>Frequently Asked Questions</p>
                <hr className='h-1 bg-red-300 w-1/3 flex mx-auto' />
                <p className='font-nunito tracking-wider w-3/5 mx-auto pt-6 pb-3 text-center'>Cari pertanyaan Anda 
                </p>
                <input type='text' className="w-1/2  mx-auto border-none ring-2 ring-red-300 focus:border-none focus:ring-red-500 focus:ring-2 active:border-none  rounded-lg"  placeholder="Cari pertanyaan atau jawaban disini..." onChange={e=>{setSearchTerm(e.target.value)}} /> 
            </div>
            <div className=' py-6 pb-12 mt-12'>
                <div className='w-11/12 mx-auto'>
                {faq_data}
                </div>             
            </div>
        </div>
    );
}
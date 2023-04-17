import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';

function InfoAbout() {
  
    const [loading,setLoading] = useState(true)
    const [museum,setMuseum] = useState([])
    
    
    const fetchMuseum = async ()=>{
        const resMuseum = await axios.get('http://localhost:8000/api/show_museum').then((res)=>{
            setMuseum(res.data.museum);
                    setLoading(false)
            console.log(res.data.museum);
        }) 
    }
    const myData = {
        name: 'Some thing',
        price: 123
      }

    
    useEffect(() => {
        fetchMuseum();
        
    }, [])
    if(loading)
    {
        about_data = (
            <ReactLoading type={"spin"} color={"red"} height={'10%'} width={'10%'} className="m-auto" />
        )
    }
    else
    {
        var about_data = museum.map((item,index)=>{
            return (
                <Link className=' border-4 rounded-md hover:bg-red-200 transition-all duration-300 hover:text-lg flex justify-center items-center border-red-300 h-24 text-center' key={index} to={{pathname:`edit-about/${item.id}`,state:item.nama_museum}} >{item.nama_museum}</Link>
            )
        })
    }



    return (
    <div className='shadow bg-white rounded-xl p-10 mb-5'>
    <p className='text-2xl font-merriweather  font-semibold p-4 pb- w-full text-center'>Edit About Museum</p>
        <hr className='h-1 bg-red-300 w-1/3 flex mx-auto' />
        <div className=' py-6 pb-12 mt-12'>
                <div className='grid grid-cols-4 gap-4 '>
                    {about_data}
                </div>           
            </div>
    </div>
  )
}

export default InfoAbout
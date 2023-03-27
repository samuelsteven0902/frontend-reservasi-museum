import axios from 'axios';
import DefaultFooter from 'components/DefaultFooter'
import DefaultNavbar from 'components/DefaultNavbar'
import React from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function NonCash() {
  const stateParamVal = useLocation().state;
  console.log(stateParamVal);


  useEffect(() => {
    axios.get('http://localhost:8000/api/metode').then((res)=>
    {
      console.log(res);
    })

  
  }, [])
  

  return (
    <div>
      <div className="absolute w-full z-20">
        <DefaultNavbar />
      </div>
      <main>
        <div className='p-72 flex justify-center  m-auto '>
            <a href='https://docs.midtrans.com/en/payments/overview' target='../' className='px-4 py-2 bg-blue-500 text-white rounded-lg'>Midtrans</a>
        </div>
      </main>
        {/* <DefaultFooter /> */}
    </div>
  )
}

export default NonCash
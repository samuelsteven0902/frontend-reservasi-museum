import axios from 'axios';
import DefaultFooter from 'components/DefaultFooter';
import DefaultNavbar from 'components/DefaultNavbar';
import FormInput from 'components/inputdata/FormInput';
import Header from 'components/inputdata/Header';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function InputData() {
  const stateParamVal = useLocation().state.input;
  console.log(stateParamVal);
  const id_category = stateParamVal.category
  const id_museum = stateParamVal.museum
  const [data,setData] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    const fetchData = async () =>
    {
    const dataId= {
      id_category:id_category,
      id_museum:id_museum
    }
    // const resHarga = await fetch(`http://localhost:8000/api/show_harga/${id_category}`, dataId);
    // const res = await resHarga.json()
    const resData = await axios.post(`http://localhost:8000/api/show_data/${id_category}`, dataId)
                              .then(res=>{ console.log(res); setData(res.data.data[0]); })
    // console.log(await harga)
    }
    fetchData();
  }, [])

// useEffect(() => {
//   const resHarga = await axios.post
// }, [])

return (
  <>
  <div className="absolute w-full z-20">
    <DefaultNavbar />
  </div >
  <main className='bg-gray-100 relative'>
    <Header state={stateParamVal} data={data} />
    <FormInput dataAwal={stateParamVal} dataa={data}/>
  </main>
    <DefaultFooter />
  </>
  )
}

export default InputData
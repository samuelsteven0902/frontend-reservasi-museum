import axios from 'axios';
import DefaultFooter from 'components/DefaultFooter';
import DefaultNavbar from 'components/DefaultNavbar';
import FormInput from 'components/inputdata/FormInput';
import Header from 'components/inputdata/Header';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ReactLoading from 'react-loading';

function InputData() {
  const stateParamVal = useLocation().state.input;
  console.log(stateParamVal);
  const id_category = stateParamVal.category
  const id_museum = stateParamVal.museum
  const [data,setData] = useState();
  const [loading, setLoading] = useState(true)

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
    // const resHarga = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/show_harga/${id_category}`, dataId);
    // const res = await resHarga.json()
    const resData = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/show_data/${id_category}`, dataId)
                              .then(res=>{ console.log(res); setData(res.data.data[0]); setLoading(false) })
    // console.log(await harga)
    }
    fetchData();
  }, [])

// useEffect(() => {
//   const resHarga = await axios.post
// }, [])

if(loading)
{
  return <div className="modal fade fixed bg-gray-300 z-50  px-52 items-center align-middle flex m-auto w-screen bg-opacity-80 top-0 left-0 h-screen outline-none overflow-x-hidden overflow-y-auto item " id="exampleModalCenteredScrollable" tabIndex="-1" aria-labelledby="exampleModalCenteredScrollable" aria-modal="true" role="dialog">
      <ReactLoading type={"spin"} color={"red"} height={'20%'} width={'20%'} className="m-auto" />
      </div>

}
else
{

}

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
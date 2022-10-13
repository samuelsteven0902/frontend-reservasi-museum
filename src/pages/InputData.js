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

  const [harga,setHarga] = useState();

  useEffect(() => {
    const fetchHarga = async () =>
    {
      const resHarga = await fetch(`http://localhost:8000/api/show_harga/${id_category}`);
      const res = await resHarga.json()
      setHarga(res.harga[0])
      console.log(await harga)
    }

    fetchHarga();
  }, [])
  return (
    <>
        <div className="absolute w-full z-20">
              <DefaultNavbar />
        </div>
        <main>
          <Header state={stateParamVal} harga={harga}/>
          <FormInput dataAwal={stateParamVal} hargaa={harga}/>
        </main>
        <DefaultFooter />
    </>
  )
}

export default InputData
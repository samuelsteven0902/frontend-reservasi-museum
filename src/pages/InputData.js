import DefaultFooter from 'components/DefaultFooter';
import DefaultNavbar from 'components/DefaultNavbar';
import FormInput from 'components/inputdata/FormInput';
import Header from 'components/inputdata/Header';
import React from 'react'
import { useLocation } from 'react-router-dom'

function InputData() {
  const stateParamVal = useLocation().state.input;
  // console.log(stateParamVal);
  return (
    <>
        <div className="absolute w-full z-20">
              <DefaultNavbar />
        </div>
        <main>
          <Header />
          <FormInput dataAwal={stateParamVal}/>
        </main>
        <DefaultFooter />
    </>
  )
}

export default InputData
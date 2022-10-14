import DefaultFooter from 'components/DefaultFooter';
import DefaultNavbar from 'components/DefaultNavbar';
import Header from 'components/pembayaran/Header';
import WorkingSection from 'components/pembayaran/WorkingSection';
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

function Pembayaran() {
  const stateParamVal = useLocation().state.dataInput;
  const input = useLocation().state.totalOrang;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  

  console.log(stateParamVal,input);
  return (
    <div>
        <div className="absolute w-full z-20">
                <DefaultNavbar />
            </div>
            <main>
                <Header />
                <WorkingSection data={stateParamVal} input={input}  />
            </main>
            <DefaultFooter />
    </div>
  )
}

export default Pembayaran
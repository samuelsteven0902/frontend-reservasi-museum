import DefaultFooter from 'components/DefaultFooter';
import DefaultNavbar from 'components/DefaultNavbar';
import Header from 'components/metodepembayaran/Header';
import WorkingSection from 'components/metodepembayaran/WorkingSection';
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

function MetodePembayaran() {
  const stateParamVal = useLocation().state;
  console.log(stateParamVal);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  // console.log(stateParamVal);
  return (
    <div>
      <div className="absolute w-full z-20">
        <DefaultNavbar />
      </div>
      <main>
        <Header />
        <WorkingSection data={stateParamVal} />
      </main>
        <DefaultFooter />
    </div>
  )
}

export default MetodePembayaran
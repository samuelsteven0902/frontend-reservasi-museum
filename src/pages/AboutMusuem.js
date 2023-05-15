import AboutSetiapMuseum from 'components/about/AboutSetiapMuseum'
import ContentAboutMuseum from 'components/about/ContentAboutMuseum'
import DefaultFooter from 'components/DefaultFooter'
import DefaultNavbar from 'components/DefaultNavbar'
import FooterPengunjung from 'components/FooterPengunjung'
import Content from 'components/tiket/Content'
import React from 'react'
import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'

function AboutMusuem() {
  const { code }  = useParams();
  const stateParamVal = useLocation().state;

  
  var x= localStorage.getItem("i18nextLng")
  console.log(x);

  useEffect(() => {
    
  }, [stateParamVal])
  

  // console.log(stateParamVal);
  return (
    <>
    <div className="absolute w-full z-20">
        <DefaultNavbar />
      </div>
    <div>
      <main className='mb-32'>
        <ContentAboutMuseum code={code} id={stateParamVal} />
        {/* <AboutSetiapMuseum /> */}
      </main>
      <FooterPengunjung />
    </div>
    </>
  )
}

export default AboutMusuem
import ContentAboutMuseum from 'components/about/ContentAboutMuseum'
import DefaultFooter from 'components/DefaultFooter'
import DefaultNavbar from 'components/DefaultNavbar'
import FooterPengunjung from 'components/FooterPengunjung'
import Content from 'components/tiket/Content'
import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

function AboutMusuem() {
  const { code }  = useParams();
  const stateParamVal = useLocation().state;
  // console.log(stateParamVal);
  return (
    <>
    <div className="absolute w-full z-20">
        <DefaultNavbar />
      </div>
    <div>
      <main>
        <ContentAboutMuseum code={code} id={stateParamVal} />
      </main>
      {/* <FooterPengunju ng /> */}
    </div>
    </>
  )
}

export default AboutMusuem
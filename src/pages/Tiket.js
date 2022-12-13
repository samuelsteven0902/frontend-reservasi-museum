import DefaultFooter from 'components/DefaultFooter'
import DefaultNavbar from 'components/DefaultNavbar'
import Content from 'components/tiket/Content'
import React from 'react'
import { useParams } from 'react-router-dom'

function Tiket() {
  const { id }  = useParams();
  console.log(JSON.stringify(id));
  return (
    <>
    <div className="absolute w-full z-20">
        <DefaultNavbar />
      </div>
    <div>
      <main>
        <Content id={id}/>
      </main>
    </div>
    </>
  )
}

export default Tiket
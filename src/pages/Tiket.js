import DefaultFooter from 'components/DefaultFooter'
import DefaultNavbar from 'components/DefaultNavbar'
import Content from 'components/tiket/Content'
import React from 'react'

function Tiket() {
  return (
    <>
            <div className="absolute w-full z-20">
                <DefaultNavbar />
            </div>
            <main>
                <Content />
            </main>
            <DefaultFooter />
        </>
  )
}

export default Tiket
import DefaultFooter from 'components/DefaultFooter'
import DefaultNavbar from 'components/DefaultNavbar'
import React from 'react'

function NonCash() {
  return (
    <div>
      <div className="absolute w-full z-20">
        <DefaultNavbar />
      </div>
      <main>
        <div className='p-72 flex justify-center  m-auto '>
            <a href='https://docs.midtrans.com/en/payments/overview' target='../' className='px-4 py-2 bg-blue-500 text-white rounded-lg'>Midtrans</a>
        </div>
      </main>
        {/* <DefaultFooter /> */}
    </div>
  )
}

export default NonCash
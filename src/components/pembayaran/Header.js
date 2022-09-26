import { Heading2, LeadText } from '@material-tailwind/react'
import React from 'react'

function Header() {
  return (
    <div><div className="relative pt-20 pb-16 flex content-center items-center justify-center h-1/3">
    <div className="bg-[#A70B0B] bg-center absolute top-0 w-full h-full" />
    <div className="container max-w-8xl relative mx-auto">
        <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <Heading2 color="white">Pembayaran</Heading2>
                <div className="text-gray-200">
                </div>
            </div>
        </div>
    </div>
</div>

</div>

  )
}

export default Header
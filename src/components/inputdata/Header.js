import { LeadText } from '@material-tailwind/react'
import H2 from '@material-tailwind/react/Heading2';
import React from 'react'

function Header() {
  return (
    <div>
        <div className="relative pt-24 pb-16 flex content-center items-center justify-center h-1/3">
            <div className="bg-[#A70B0B] bg-center absolute top-0 w-full h-full" />
            <div className="container max-w-8xl relative mx-auto">
                <div className="items-center flex flex-wrap">
                    <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                        <H2 color="white">Museum Keris</H2>
                        <div className="text-gray-200">
                            <LeadText color="gray-200">
                                This is a simple example of a Landing Page you
                                can build using Material Tailwind. It features
                                multiple components based on the Tailwind CSS
                                and Material Design by Google.
                            </LeadText>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Header
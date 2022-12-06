import React from 'react'
import '../assets/styles/wave.css'

function WaveFooter() {
  return (
    <div className='w-full absolute z-10   -mt-20 top-0  rounded-b-full hidden lg:block bg-gray-100'>
        
        
<div class="header-wave bg-gray-100">



{/* <!--Waves Container-->   */}
<div className='bg-gray-50'>
<svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
<defs>
<path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
</defs>
<g class="parallax bg-gray-100">
<use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(236, 227, 222,0.7" />
<use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(236, 227, 222,0.5)" />
<use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(236, 227, 222,0.3)" />
<use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(236, 227, 222, 1)" />
</g>
</svg>
</div>
{/* <!--Waves end-->     */}

</div>

    </div>
  )
}

export default WaveFooter
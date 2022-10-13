import axios from 'axios'
import CardJadwal from './Cards/CardJadwal'
import React, { useEffect, useState } from 'react'

function Jadwal() {

  
  


  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardJadwal />
        </div>
      </div>
    </>
  )
}

export default Jadwal
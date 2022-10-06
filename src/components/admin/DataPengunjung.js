import axios from 'axios'
import CardTable from './Cards/CardTable'
import React, { useEffect, useState } from 'react'

function DataPengunjung() {

  
  


  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable />
        </div>
      </div>
    </>
  )
}

export default DataPengunjung
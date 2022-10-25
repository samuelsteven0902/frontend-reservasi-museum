import axios from 'axios'
import CardPemasukan from './Cards/CardPemasukan'
import React, { useEffect, useState } from 'react'

function Pemasukan() {


  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardPemasukan />
        </div>
      </div>
    </>
  )
}

export default Pemasukan
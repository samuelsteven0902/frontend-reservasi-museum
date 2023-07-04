import axios from 'axios'
import CardPemasukan from './Cards/CardPemasukan'
import React, { useEffect, useState } from 'react'
import DefaultFooterAdmin from "components/DefaultFooterAdmin.js";

function Pemasukan() {

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <CardPemasukan/>
        </div>
      </div>
        <DefaultFooterAdmin/>
    </>
  )
}

export default Pemasukan
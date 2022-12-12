import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading';

function CardAdmin() {

    const [loading,setLoading] = useState(true)
  const [pemasukan,setPemasukan] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:8000/api/pemasukan`).then(res=>{
    // console.log(res);  
    if(res.status === 200)
      {
          setPemasukan(res.data.pemasukan)
          setLoading(false);
      }
  });
  }, [])

  console.log(pemasukan);

  const rupiah = (number)=>{
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }


  if(loading)
  {
    var pemasukan_HTMLTABLE =   
      <tr className="bg-white border-b" >
        <td colspan={6} className="text-xl text-center justify-center font-semibold py-5">
          <ReactLoading type={"spin"} color={"red"} height={'5%'} width={'5%'} className="m-auto" />
        </td>
      </tr>
  }
  else
  {
    var pemasukan_HTMLTABLE = "";
    pemasukan_HTMLTABLE = pemasukan.map((item,index)=>{
      return(
<tr class="border-b bg-white ">
                <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                  {item.tanggal}
                </td>
                <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                  {item.name}
                </td>
                <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                  {rupiah(item.harga_awal)}
                </td>
                
              </tr>
      )
    })
  }
  return (
  <div className='container  relative flex flex-col min-w-0 break-words w-full mb-6'>
    <div class="flex flex-col " >
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden shadow-lg rounded-xl m-2">
                <table class="min-w-full ">
                <thead class="border-b bg-white ">
                    <tr className=''>
                    <th scope="col" class="text-xl font-nunito font-semibold text-[#A70B0B] px-6 py-4 text-center ">
                        Tanggal
                    </th>
                    <th scope="col" class="text-xl font-nunito font-semibold text-[#A70B0B] px-6 py-4 text-center">
                        Nama Admin
                    </th>
                    <th scope="col" class="text-xl font-nunito font-semibold text-[#A70B0B] px-6 py-4 text-center">
                        Total Pemasukan Cash
                    </th>
                    </tr>
                </thead>
                <tbody className='text-center '>
                    {/* <td class=" text-gray-900 px-6 py-4 whitespace-nowrap">
                        10-09-2022
                    </td>
                    <td class=" text-gray-900 px-6 py-4 whitespace-nowrap">
                        Sabila Wibu
                    </td>
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        22.000
                    </td> */}
                    {pemasukan_HTMLTABLE}
                    
                    
                </tbody>
                </table>
            </div>
            </div>
        </div>
    </div>
  </div>
  )
}

export default CardAdmin
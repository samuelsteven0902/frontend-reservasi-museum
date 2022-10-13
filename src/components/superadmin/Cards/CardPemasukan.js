import React from 'react'

function CardAdmin() {
  return (
  <div className='container px-24 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded'>
    
    <div class="flex flex-col " >
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden shadow-lg rounded-xl m-2">
                <table class="min-w-full ">
                <thead class="border-b bg-white ">
                    <tr className=''>
                    <th scope="col" class="text-xl font-medium text-[#A70B0B] px-6 py-4 text-center ">
                        Tanggal
                    </th>
                    <th scope="col" class="text-xl font-medium text-[#A70B0B] px-6 py-4 text-center">
                        Nama Admin
                    </th>
                    <th scope="col" class="text-xl font-medium text-[#A70B0B] px-6 py-4 text-center">
                        Total Pemasukan Cash
                    </th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    <tr class="border-b bg-white">
                    <td class=" text-gray-900 px-6 py-4 whitespace-nowrap">
                        10-09-2022
                    </td>
                    <td class=" text-gray-900 px-6 py-4 whitespace-nowrap">
                        Sabila Wibu
                    </td>
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        22.000
                    </td>
                    
                    
                    </tr>
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
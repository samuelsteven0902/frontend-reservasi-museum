import React from 'react'

function TabelHarga() {
  return (
  <div className='container px-24'>
    
    <div class="flex flex-col " >
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden shadow-lg rounded-xl m-2">
                <table class="min-w-full ">
                <thead class="border-b bg-[#A70B0B] ">
                    <tr className=''>
                    <th scope="col" class="text-xl font-medium text-white px-6 py-4 text-center ">
                        Kategori
                    </th>
                    <th scope="col" class="text-xl font-medium text-white px-6 py-4 text-center">
                        Harga Biasa
                    </th>
                    <th scope="col" class="text-xl font-medium text-white px-6 py-4 text-center">
                        Hari Libur
                    </th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    <tr class="border-b ">
                    <td class=" text-gray-900 px-6 py-4 whitespace-nowrap">
                        Umum
                    </td>
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        Rp. 7.500,-
                    </td>
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                    Rp. 10.000,-
                    </td>
                    </tr>
                    <tr class="bg-white border-b">
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        Mahasiswa
                    </td>
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        Rp. 5.000,-
                    </td>
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        Rp. 7.500,-
                    </td>
                    </tr>
                    <tr class="bg-white border-b">
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                    Pelajar
                    </td>
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        Rp. 4.000,-
                    </td>
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        Rp. 5.000,-
                    </td>
                    </tr>
                    <tr class="bg-white border-b">
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                    Rombongan Umum min.50 orang
                    </td>
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        Rp. 5.000,-
                    </td>
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        Rp. 7.500,-
                    </td>
                    </tr>
                    <tr class="bg-white border-b">
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                    Rombongan Pelajar min.50 orang
                    </td>
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        Rp. 4.000,-
                    </td>
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        Rp. 5.000,-
                    </td>
                    </tr>
                    <tr class="bg-white border-b">
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        Wisatawan Asing
                    </td>
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        Rp. 15.000,-
                    </td>
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        Rp. 20.000,-
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

export default TabelHarga
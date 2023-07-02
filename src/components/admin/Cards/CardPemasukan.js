import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading';
import Cookies from 'js-cookie';
import PaginationPemasukan from './PaginationPemasukan';
import Pemasukan from '../Pemasukan';


function CardPemasukan() {

  const [searchTerm, setSearchTerm] = useState("")
  const [loading,setLoading] = useState(true)
  const [pemasukan,setPemasukan] = useState([])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/pemasukan` , {
      headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
      }})
    
    
    .then(res=>{

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
      <tr className="bg-white border-b">
        <td colspan={6} className="text-xl text-center justify-center font-semibold py-5">
          <ReactLoading type={"spin"} color={"red"} height={'5%'} width={'5%'} className="m-auto" />
        </td>
      </tr>
  }
  else
  {     pemasukan_HTMLTABLE = <PaginationPemasukan data={pemasukan} searchTerm={searchTerm} />
  }
  return (
  <div className='container  relative flex flex-col min-w-0 break-words w-full mb-6'>
    <div className="my-2  w-72">
        <input type='text' className="w-full font-nunito border-none ring-2 ring-red-300 focus:border-none focus:ring-red-500 focus:ring-2 active:border-none rounded-lg"  placeholder="Cari berdasarkan tanggal, nama admin, pengunjung, dan pemasukan..." onChange={e=>{setSearchTerm(e.target.value)}} /> 
      </div>
    <div class="flex flex-col " >
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden shadow-lg rounded-xl m-2">
            <th scope="col" class="text-xl font-nunito font-semibold text-[#A70B0B] px-6 py-4 text-center flex">
              Total = {
                loading?<p> Loading...</p>:
                pemasukan.map((item,index)=>Math.floor(item.harga_awal)).reduce((accumulator, value) => {
                  return accumulator + value;
                }, 0)
              }
                    </th>
                <table id="pemasukann" class="min-w-full ">
                <thead class="border-b bg-white ">
                    <tr className=''>
                    <th scope="col" class="text-xl font-nunito font-semibold text-[#A70B0B] px-6 py-4 text-center ">
                        Tanggal
                    </th>
                    <th scope="col" class="text-xl font-nunito font-semibold text-[#A70B0B] px-6 py-4 text-center">
                        Nama Admin
                    </th>
                    <th scope="col" class="text-xl font-nunito font-semibold text-[#A70B0B] px-6 py-4 text-center">
                        Nama Pengunjung
                    </th>
                    <th scope="col" class="text-xl font-nunito font-semibold text-[#A70B0B] px-6 py-4 text-center">
                        Pemasukan
                    </th>
                    </tr>
                </thead>
                <tbody className='text-center'>
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

export default CardPemasukan
import React from 'react'
import axios from 'axios'
import DefaultNavbar from 'components/DefaultNavbar'
import { useState } from 'react'
import { useEffect } from 'react'
import ReactLoading from 'react-loading';
import FooterPengunjung from 'components/FooterPengunjung'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Harga() {
    const {t} = useTranslation()

    const {pathname } = useLocation();

    useEffect(()=>{
        window.scrollTo(0,0)
    },[pathname])

    const [dataHarga,setDataHarga] = useState()
    const [loading,setLoading] = useState(true);
    const [loading2,setLoading2] = useState(true);
    const [museum, setMuseum] = useState("");

    const fetchData = () =>
    {
    axios.get('http://localhost:8000/api/show_harga').then(res=>{
        setDataHarga(res.data.harga)
    })
    }

const fetchMuseum = async ()=>{
    const resMuseum = await axios.get('http://localhost:8000/api/show_museum').then((res)=>{
        setMuseum(res.data.museum);
        setLoading(false)
        console.log(res.data.museum);
    }) 
}
    useEffect(() => {
        fetchData();
        fetchMuseum();
}, [])

const rupiah = (number)=>{
    return new Intl.NumberFormat("id-ID", {
    //   style: "currency",
    currency: "IDR"
    }).format(number);
}

if(loading)
{
    var harga_HTMLTABLE =   <tr className="bg-white border-b" >
                                <td colspan={6} className="text-xl text-center justify-center font-semibold py-5">
                                <ReactLoading type={"spin"} color={"red"} height={'5%'} width={'5%'} className="m-auto" />
                                </td>
                            </tr>
}
else
{
    if(loading2)
    {
        var harga_HTMLTABLE =   <tr className="bg-white border-b" >
                                        <td colspan={6} className="text-xl text-center justify-center font-semibold py-5">
                                        <ReactLoading type={"spin"} color={"red"} height={'5%'} width={'5%'} className="m-auto" />
                                        </td>
                                    </tr>
    }
    else
    {
        var harga_HTMLTABLE = ''

    harga_HTMLTABLE = dataHarga
    // .filter(val=>{
    //     if(searchTerm == "")
    //     {
    //         return val
    //     }
    //     else if(val.nama_museum.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //             val.nama_kategori.toLowerCase().includes(searchTerm.toLowerCase()))
    //     {
    //         return val
    //     }
    // })
    .map((item,index)=>{
        return(
            <tr className="bg-white border-b" key={index}>
                    <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">
                        {item.id}
                    </td>
                    <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        {/* {getFirstLetters(item.nama_museum)} */}
                    </td>
                    <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        {item.nama_kategori}
                    </td>
                    <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        {rupiah(item.hari_biasa)}
                    </td>
                    <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        {rupiah(item.hari_libur)}
                    </td>
                    <td className=" text-gray-900 px-6 py-4 whitespace-nowrap ">
                
                    {/* <button type="button" className=" text-white ml-4 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-4 py-1.5 flex text-center mr-2 w-3/4 mb-2 align-middle items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" data-bs-toggle="modal" id={item.id_kategori} data-bs-target="#exampleModalCenteredScrollable" onClick={handleHarga} >
                    <BiPencil className="mr-1" />Edit</button>

                    <button type="button" className="text-white ml-4 bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded text-sm px-3 py-1.5 flex text-center mr-2 mb-2 w-3/4 items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={(e) => deleteData(e, item.id)}>
                    <BiTrash  className="mr-1" />Hapus</button> */}

                    </td>
                    </tr>
        )
    })
    }
}

  
    return (
    
    <div className='bg-gray-50 w-screen  mx-auto min-h-screen max'>
    <div className="absolute w-full z-20">
        <DefaultNavbar />
    </div>
    <div className='container  mx-auto py-24'>
        <div className='flex justify-center flex-wrap flex-col my-12 '>
            <p className='text-5xl font-merriweather  font-bold p-4 pb- w-full text-center'>{t('harga.judul')}</p>
            <hr className='h-1 bg-red-300 w-1/3 flex mx-auto' />
            <p className='font-nunito tracking-wider w-3/5 mx-auto py-6 text-center'>{t('harga.desc1')}</p>
            <p className='font-nunito font-bold tracking-wider mx-auto text-center'>{t('harga.desc2')}</p>


        </div>
        <div className='w-full flex mx-auto justify-center flex-wrap'>
            {loading?
                                <ReactLoading type={"spin"} color={"red"} height={'5%'} width={'5%'} className=" my-12 m-auto " />
                            :
                             museum.map((item,index)=>{
                return(
                    <div className='w-full xl:w-5/12'>
                            <p className=' bg-white text-center mx-auto mt-12 font-nunito p-5 px-8 w-max rounded-tr-full hover:rounded-tr-none rounded-bl-full  hover:rounded-tl-full  hover:rounded-br-full hover:rounded-bl-none transition-all duration-300 shadow-md font-bold text-2xl bg-gradient-to-br from-red-500 to-red-400 text-[#ECE3DE] select-none'>{item.nama_museum}</p>
                            <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow-lg rounded-xl m-2 mx-6">
                            <table  id="table_id" className="shadow-lg rounded-xl w-full" >
                            <thead className="border-b bg-white ">
                                <tr className=''>
                                <th scope="col" className="text-xl font-medium text-[#A70B0B] px-6 py-4 text-center ">
                                    No
                                </th>
                                <th scope="col" className="text-xl font-medium text-[#A70B0B] px-6 py-4 text-center">
                                    Kategori    
                                </th>
                                <th scope="col" className="text-xl font-medium text-[#A70B0B] w-72 mx-6 py-4 text-center">
                                {t('harga.biasa')}
                                </th>
                                <th scope="col" className="text-xl font-medium text-[#A70B0B] mx-6 py-4 text-center">
                                {t('harga.libur')}
                                </th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                {dataHarga && dataHarga
    .filter(val=>{
        // console.log(val)
        if(val.nama_museum == item.nama_museum)
        {
            if(val.length !== 0 )
            {
                return val
            }
            else
            {
                return  <tr>
                            <td>Tidak ada</td>
                        </tr>
            }
        }
    })
    .map((itemm,indexx)=>{
        return(
            <tr className="bg-white border-b" key={indexx}>
                    <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">
                        {indexx + 1}
                    </td>
                    <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        {itemm.nama_kategori}
                    </td>
                    <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        {itemm.hari_biasa == 0 ?<p className='text-green-600'>Gratis</p>:rupiah(itemm.hari_biasa)}
                    </td>
                    <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        {itemm.hari_libur == 0 ?<p className='text-green-600'>Gratis</p>:rupiah(itemm.hari_libur)}
                    </td>
                    <td className=" text-gray-900 px-6 py-4 whitespace-nowrap ">

                    </td>
                    </tr>
        )
    })}
                            </tbody>
                            </table>
                        </div>
                            </div>
                        </div>
                    </div>
                )
            })}

        </div>

    </div>  
    <FooterPengunjung />
    </div> 

  )
}

export default Harga
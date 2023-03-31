import { Card } from '@material-tailwind/react'
import PropTypes from "prop-types";
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import kosong from "../../assets/img/admin/nothing.svg"
import DefaultFooterAdmin from "components/DefaultFooterAdmin.js";
import ReactLoading from 'react-loading';


function StatusPembayaran({ color }) {
  

    const [loading,setLoading] = useState(true)
    const [pengunjung,setPengunjung] = useState([])
    
  const [searchTerm, setSearchTerm] = useState("")

    const [token, setToken] = useState(Cookies.get('token'));
    const [user,setUser] = useState('loading');
    // const [loading, setLoading] = useState(false);

    
    const fetchData = async () => {
      const data = await fetch(`http://localhost:8000/api/me`, {
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${token}`,
        }
      });
      const json = await data.json();
      console.log(json);
      var result =''
      if(json.message !== 'Unauthenticated.')
      {
        result = json.user.name;
      }

      setUser(result);
    }
    console.log();

    const fetchPengunjung = () => 
    {
      
    axios.get(`http://localhost:8000/api/status-pembayaran`).then(res=>{
      if(res.status === 200)
        {
            setPengunjung(res.data.pengunjung)
            setLoading(false);
        }
    });
    }
  
    useEffect(() => {
            fetchData ();
            fetchPengunjung();
            
          }, []);
          console.log(pengunjung);
  
    const handleKonfirmasi = (e,idData) =>{
      // e.preventDefault();
      const data = {
          idData : idData,
          idAdmin: user
      }
      console.log(data);

      swal({
        title: "Konfirmasi Pembayaran Pengunjung?",
        text: "Sekali Konfirmasi, anda tidak bisa mengubahnya lagi!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((update) => {
        if (update) {
          axios.put(`http://localhost:8000/api/status`,data).then(res=>{
                if(res.data.status === 200)
                {
                    // console.log('berhasil delet');
                    swal("Berhasil!",res.data.message,"success")
                    fetchPengunjung();
                }
                else if(res.data.status === 404)
                {
                    // swal("Error",res.data.message,"error");
                    // thisClicked.innerText = "Delete";
                }})
        } else {
          swal("Membatalkan Aksi!");
        }

    
  
    })

      

  }





    if(loading)
    {
      var pengunjung_HTMLTABLE =   
      <tr className="bg-white border-b" >
        <td colspan={8} className="text-xl text-center justify-center font-semibold py-5">
          <ReactLoading type={"spin"} color={"red"} height={'5%'} width={'5%'} className="m-auto" />
        </td>
      </tr>
    }
    else
    {
      var pengunjung_HTMLTABLE = "";
      pengunjung_HTMLTABLE = pengunjung.filter(val=>{
        if(searchTerm == "")
        {
          return val
        }
        else if(val.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        val.kode_tiket.toLowerCase().includes(searchTerm.toLowerCase()) ||
        val.museum.toLowerCase().includes(searchTerm.toLowerCase()) ||
        val.kategori.toLowerCase().includes(searchTerm.toLowerCase()) ||
        val.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        val.kota.toLowerCase().includes(searchTerm.toLowerCase()) )
        {
          return val
        }
      }).map((item,index)=>{
        console.log(typeof item.harga_awal  );
        return(
          <tr className='bg-white'>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.kode_tiket }</td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.nama }</td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.museum}</td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.kategori}</td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.jumlah}</td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.harga_awal}</td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.pembayaran}</td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.status == 1 ? "Lunas" : "Belum Lunas"}</td>
            <td className='sticky right-0 bg-gray-50 px-2 '> <button id={`konfirmasi-${item.id}`} className='p-1.5 text-sm bg-green-400 rounded-lg' onClick={e=>handleKonfirmasi(e, item.id)}>Konfirmasi</button></td>
          </tr>
        )
      })
    }
  
    return (
      <>
      
      <div className='w-full flex flex-wrap'>
        <div className="w-full flex flex-wrap flex-col justify-center mb-6">
          <p className='text-center text-2xl font-merriweather mb-'>Data Pembayaran Pengunjung</p>
          <hr className='h-1 w-1/3 bg-red-300 mx-auto mb-5'/>
            <input type='text' className="w-72 mx-auto font-nunito order-none ring-2 ring-red-300 focus:border-none focus:ring-red-500 focus:ring-2 active:border-none rounded-lg"  placeholder="Cari nama, kategori, kota, ..." onChange={e=>{setSearchTerm(e.target.value)}} /> 
        </div>
        <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded" +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
          }>
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3
                  className="font-semibold text-lg font-merriweather text-red-600" >Status Pembayaran Pengunjung
                </h3>
              </div>
            </div>
          </div>
  
          <div className="block w-full overflow-x-auto">
            {/* Projects table */}
            <table  className="display items-center w-full bg-transparent border-collapse">
              <thead>
                <tr className='bg-red-600 text-red-200'>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left ">
                      Kode Tiket
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left ">
                      Nama
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left ">
                    Museum
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left ">
                    Kategori
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left ">
                    Jumlah Pengunjung
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left ">
                    Total Pembelian Tiket
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left ">
                    Pembayaran
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunitofont-semibold text-left " >
                    Status
                  </th>
                  <th className='sticky right-0 bg-gray-50 text-red-600'>
                  Konfirmasi Pembayaran
                  </th>
  
                </tr>
              </thead>
              <tbody>
                {pengunjung_HTMLTABLE}
              </tbody>
            </table>
          </div>
        </div>
      </div>
        <DefaultFooterAdmin/>
      </>
    )
  }

export default StatusPembayaran


StatusPembayaran.defaultProps = {
    color: "light",
  };
  
StatusPembayaran.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
  };
  
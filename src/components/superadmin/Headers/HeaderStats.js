import axios from "axios";
import React from "react";
import { useState , useEffect } from "react";

// components

import CardStats from "../Cards/CardStats.js";
import Cookies from "js-cookie";

export default function HeaderStats() {

  const [data,setData] = useState()
  const [loading,setLoading] = useState(true)

  const fetchData = () =>{
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/pengunjung`, {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      }}).then(res=>{
    console.log(res);  
    if(res.status === 200)
      {
          setData(res.data.pengunjung)
          setLoading(false);
      }
  });
  }
  
  
  useEffect(() => {
    fetchData()
  }, [])
  console.log(data);

  const rupiah = (number)=>{
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }

  if(loading) 
  {
    var dataPengunjungFeb = <h1>Loading</h1>
  }
  else
  { 

    
  let bulanLalu = new Date().getMonth() 
  let bulanIni = new Date().getMonth() + 1
  let hariIni = new Date().getDate()
  let kemarin = new Date().getDate() - 1



    var dataPengunjungHariIni = data.filter(val=>{
      return val.tanggal.slice(0,2) == hariIni
    }).map((item,index)=>Math.floor(item.harga_awal)).reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);

    var dataPengunjungkemarin = data.filter(val=>{
      return val.tanggal.slice(0,2) == kemarin
    }).map((item,index)=>Math.floor(item.harga_awal)).reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);

    var dataPengunjungBulanLalu = data.filter(val=>{
      return val.tanggal.slice(val.tanggal.indexOf('-') + 1,val.tanggal.lastIndexOf('-')) == bulanLalu
    }).map((item,index)=>Math.floor(item.harga_awal)).reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);

    var dataPengunjungBulanIni = ''
    dataPengunjungBulanIni = data.filter(val=>{
      return val.tanggal.slice(val.tanggal.indexOf('-') + 1,val.tanggal.lastIndexOf('-')) == bulanIni
    }).map((item,index)=>Math.floor(item.harga_awal)).reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);

    
  }
  console.log(dataPengunjungBulanLalu);
  return (
    <>
      {/* Header */}
      <div className="relative md:pt-10 pb-20 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-2 font-merriweather">
                <CardStats
                  statSubtitle="Total Pemasukan Bulan Lalu"
                  statTitle={dataPengunjungBulanIni !== undefined ?  rupiah(dataPengunjungBulanLalu) : "Loading..." }
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-[#A70B0B]"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-2 font-merriweather">
                <CardStats
                  statSubtitle="Total Pemasukan Bulan Ini"
                  statTitle={dataPengunjungBulanIni !== undefined ? rupiah(dataPengunjungBulanIni) : "Loading..."}
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-[#A70B0B]"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-2 font-merriweather">
                <CardStats
                  statSubtitle="Total Pemasukan Kemarin"
                  statTitle={dataPengunjungBulanIni !== undefined ?  rupiah(dataPengunjungkemarin): "Loading..."}
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-[#A70B0B]"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-2 -ml font-merriweather">
                <CardStats
                  statSubtitle="Total Pemasukan Hari Ini"
                  statTitle={dataPengunjungBulanIni !== undefined ? rupiah(dataPengunjungHariIni):"Loading...  "}
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-[#A70B0B]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

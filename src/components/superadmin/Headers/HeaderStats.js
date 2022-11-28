import axios from "axios";
import React from "react";
import { useState , useEffect } from "react";

// components

import CardStats from "../Cards/CardStats.js";

export default function HeaderStats() {

  const [data,setData] = useState()
  const [loading,setLoading] = useState(true)

  const fetchData = () =>{
    axios.get(`http://localhost:8000/api/pengunjung`).then(res=>{
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


    var dataPengunjungBulanIni = data.filter(val=>{
      return val.tanggal.slice(val.tanggal.indexOf('-') + 1,val.tanggal.lastIndexOf('-')) == bulanIni
    }).map((item,index)=>Math.floor(item.harga_awal)).reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);

    console.log(hariIni);
  
}

  return (
    <>
      {/* Header */}
      <div className="relative md:pt-10 pb-10 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-2">
                <CardStats
                  statSubtitle="Total Pemasukan Bulan Lalu"
                  statTitle={rupiah(dataPengunjungBulanLalu)}
                  statArrow="up"
                  statPercent="2.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Bulan Lusa"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-[#A70B0B]"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-2">
                <CardStats
                  statSubtitle="Total Pemasukan Bulan Ini"
                  // statTitle={dataPengunjungNov || dataPengunjungJan ||dataPengunjungFeb ||dataPengunjungMar ||dataPengunjungApril ||dataPengunjungMei ||dataPengunjungJuni ||dataPengunjungJuli ||dataPengunjungAgus ||dataPengunjungSept ||dataPengunjungOkt ||dataPengunjungDes}
                  statTitle={rupiah(dataPengunjungBulanIni)}
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Bulan Kemarin"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-[#A70B0B]"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-2">
                <CardStats
                  statSubtitle="Total Pemasukan Kemarin"
                  statTitle={rupiah(dataPengunjungkemarin)}
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-red-500"
                  statDescripiron="Kemarin Lusa"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-[#A70B0B]"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-2 -ml">
                <CardStats
                  statSubtitle="Total Pemasukan Hari Ini"
                  statTitle={rupiah(dataPengunjungHariIni)}
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Kemarin"
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

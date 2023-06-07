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

  if(loading)
  {
    <h1>Loading</h1>
  }
  else
  {
    
  let bulanLalu = new Date().getMonth() 
  let bulanIni = new Date().getMonth() + 1
  let hariIni = new Date().getDate()
  let kemarin = new Date().getDate() - 1

    // var dataPengunjungBulanIni = data.filter(val=>{
    //   return val.updated_at.slice(val.updated_at.indexOf('-') + 1,val.updated_at.lastIndexOf('-')) == '01';
    // }).map((item,index)=>Math.floor(item.jumlah)).reduce((accumulator, value) => {
    //   return accumulator + value;
    // }, 0);

    var dataPengunjungHariIni = data.filter(val=>{
      return val.updated_at.slice(val.updated_at.lastIndexOf('-') + 1,val.updated_at.lastIndexOf('-') + 3) == hariIni
    }).map((item,index)=>Math.floor(item.jumlah)).reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);

    var dataPengunjungkemarin = data.filter(val=>{
      return val.updated_at.slice(val.updated_at.lastIndexOf('-') + 1,val.updated_at.lastIndexOf('-') + 3) == kemarin
    }).map((item,index)=>Math.floor(item.jumlah)).reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);

    var dataPengunjungBulanLalu = data.filter(val=>{
      return val.updated_at.slice(val.updated_at.indexOf('-') + 1,val.updated_at.lastIndexOf('-')) == bulanLalu
    }).map((item,index)=>Math.floor(item.jumlah)).reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);


    var dataPengunjungBulanIni = data.filter(val=>{
      return val.updated_at.slice(val.updated_at.indexOf('-') + 1,val.updated_at.lastIndexOf('-')) == bulanIni
    }).map((item,index)=>Math.floor(item.jumlah)).reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);

  }


  return (
    <>
      {/* Header */}
      <div className="relative md:pt-10 pb-12 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-2 font-merriweather">
                <CardStats
                  statSubtitle="Total Pengunjung Bulan Lalu"
                  statTitle={dataPengunjungBulanIni !== undefined ? dataPengunjungBulanLalu : "Loading..."}
                  statIconName="fas fa-solid fa-user"
                  statIconColor="bg-[#A70B0B]"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-2 font-merriweather">
                <CardStats
                  statSubtitle="Total Pengunjung Bulan Ini"
                  statTitle={dataPengunjungBulanIni !== undefined ? dataPengunjungBulanIni:"Loading..."}
                  statDescripiron="Bulan Kemarin"
                  statIconName="fas fa-solid fa-user"
                  statIconColor="bg-[#A70B0B]"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-2 font-merriweather">
                <CardStats
                  statSubtitle="Total Pengunjung Kemarin"
                  statTitle={dataPengunjungBulanIni !== undefined ? dataPengunjungkemarin : "Loading..."}
                  statIconName="fas fa-solid fa-user"
                  statIconColor="bg-[#A70B0B]"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-2 font-merriweather">
                <CardStats
                  statSubtitle="Total Pengunjung Hari Ini"
                  statTitle={dataPengunjungBulanIni !== undefined ? dataPengunjungHariIni:"Loading..."}
                  statIconName="fas fa-solid fa-user"
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

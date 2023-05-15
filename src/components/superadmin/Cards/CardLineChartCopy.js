import React from "react";
import Chart from "chart.js";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ReactLoading from 'react-loading';

export default function CardLineChart() {
 
  const [data,setData] = useState()
  const [loading,setLoading] = useState(true)

  const [unit, setUnit] = useState()
  const [result, setResult] = useState()

  const timeFrame = (period) => {
    console.log(period.target.value);
    if(period.target.value == 'month') {
      setUnit(period.target.value)
      setResult(month)

    }
    if(period.target.value == 'year') {
      setUnit(period.target.value)
      setResult(year)
    }
    window.myLine.update()
  }

const month = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: new Date().getFullYear(),
        backgroundColor: "#4c51bf",
        borderColor: "#4c51bf",
        data: [2, dataPengunjungFeb, dataPengunjungMar , dataPengunjungApril, dataPengunjungMei, dataPengunjungJuni, dataPengunjungJuli, dataPengunjungAgus, dataPengunjungSept, dataPengunjungOkt, dataPengunjungNov,dataPengunjungDes],
        fill: false,
      },
    ],
  };

const year = {
    labels: [
        new Date().getFullYear() - 4,
        new Date().getFullYear() - 3,
        new Date().getFullYear() - 2,
        new Date().getFullYear() - 1,
        new Date().getFullYear(),
    ],
    datasets: [
      {
        label: new Date().getFullYear(),
        backgroundColor: "#4c51bf",
        borderColor: "#4c51bf",
        data: [dataYear4, dataYear3, dataYear2, dataYear1, dataCurrYear],
        fill: false,
      },
    ],
  };

  const fetchData = () =>{
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/pengunjung`).then(res=>{
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
  // console.log(data);



  if(loading) 
  {
    var loadingpengunjung = <h1 className="absolute">Loading</h1>
  }
  else
  { 
    //annually
    var dataCurrYear = data.filter(val=>{
      return val.tanggal.slice(val.tanggal.lastIndexOf('-') + 1) == new Date().getFullYear();
    }).map((item,index)=>Math.floor(item.harga_awal)).reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    var dataYear1 = data.filter(val=>{
      return val.tanggal.slice(val.tanggal.lastIndexOf('-') + 1) == new Date().getFullYear() - 1;
    }).map((item,index)=>Math.floor(item.harga_awal)).reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    var dataYear2 = data.filter(val=>{
      return val.tanggal.slice(val.tanggal.lastIndexOf('-') + 1) == new Date().getFullYear() - 2;
    }).map((item,index)=>Math.floor(item.harga_awal)).reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    var dataYear3 = data.filter(val=>{
      return val.tanggal.slice(val.tanggal.lastIndexOf('-') + 1) == new Date().getFullYear() - 3;
    }).map((item,index)=>Math.floor(item.harga_awal)).reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    var dataYear4 = data.filter(val=>{
      return val.tanggal.slice(val.tanggal.lastIndexOf('-') + 1) == new Date().getFullYear() - 4;
    }).map((item,index)=>Math.floor(item.harga_awal)).reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);

    
    //monthly
    var dataPengunjungJan = data.filter(val=>{
        return val.tanggal.slice(val.tanggal.indexOf('-') + 1,val.tanggal.lastIndexOf('-')) === '01';
      }).map((item,index)=>Math.floor(item.harga_awal)).reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);

      var dataPengunjungFeb = data.filter(val=>{
        return val.tanggal.slice(val.tanggal.indexOf('-') + 1,val.tanggal.lastIndexOf('-')) === '02'
       }).map((item,index)=>Math.floor(item.harga_awal)).reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);

       var dataPengunjungMar =  data.filter(val=>{
        return val.tanggal.slice(val.tanggal.indexOf('-') + 1,val.tanggal.lastIndexOf('-')) === '03'
       }).map((item,index)=>Math.floor(item.harga_awal)).reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);

       var dataPengunjungApril = data.filter(val=>{
        return val.tanggal.slice(val.tanggal.indexOf('-') + 1,val.tanggal.lastIndexOf('-')) === '04'
       }).map((item,index)=>Math.floor(item.harga_awal)).reduce((accumulator, value) => {
  return accumulator + value;
}, 0);

       var dataPengunjungMei = data.filter(val=>{
        return val.tanggal.slice(val.tanggal.indexOf('-') + 1,val.tanggal.lastIndexOf('-')) === '05'
       }).map((item,index)=>Math.floor(item.harga_awal)).reduce((accumulator, value) => {
  return accumulator + value;
}, 0);

       var dataPengunjungJuni = data.filter(val=>{
        return val.tanggal.slice(val.tanggal.indexOf('-') + 1,val.tanggal.lastIndexOf('-')) === '06'
       }).map((item,index)=>Math.floor(item.harga_awal)).reduce((accumulator, value) => {
  return accumulator + value;
}, 0);

       var dataPengunjungJuli = data.filter(val=>{
        return val.tanggal.slice(val.tanggal.indexOf('-') + 1,val.tanggal.lastIndexOf('-')) === '07'
       }).map((item,index)=>Math.floor(item.harga_awal)).reduce((accumulator, value) => {
  return accumulator + value;
}, 0);

       var dataPengunjungAgus = data.filter(val=>{
        return val.tanggal.slice(val.tanggal.indexOf('-') + 1,val.tanggal.lastIndexOf('-')) === '08'
       }).map((item,index)=>Math.floor(item.harga_awal)).reduce((accumulator, value) => {
  return accumulator + value;
}, 0);

       var dataPengunjungSept = data.filter(val=>{
        return val.tanggal.slice(val.tanggal.indexOf('-') + 1,val.tanggal.lastIndexOf('-')) === '09'
       }).map((item,index)=>Math.floor(item.harga_awal)).reduce((accumulator, value) => {
  return accumulator + value;
}, 0);

       var dataPengunjungOkt = data.filter(val=>{
        return val.tanggal.slice(val.tanggal.indexOf('-') + 1,val.tanggal.lastIndexOf('-')) === '10'
       }).map((item,index)=>Math.floor(item.harga_awal)).reduce((accumulator, value) => {
  return accumulator + value;
}, 0);

       var dataPengunjungNov = data.filter(val=>{
        return val.tanggal.slice(val.tanggal.indexOf('-') + 1,val.tanggal.lastIndexOf('-')) === '11'
       }).map((item,index)=>Math.floor(item.harga_awal)).reduce((accumulator, value) => {
  return accumulator + value;
}, 0);

       var dataPengunjungDes = data.filter(val=>{
        return val.tanggal.slice(val.tanggal.indexOf('-') + 1,val.tanggal.lastIndexOf('-')) === '12'
       }).map((item,index)=>Math.floor(item.harga_awal)).reduce((accumulator, value) => {
  return accumulator + value;
}, 0);
  }

  React.useEffect(() => {

    const timeoutID = window.setTimeout(() => {
      console.log(unit);
      console.log(result);
    let configPemasukan = {
      type: "line",
      data: year,
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "white",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          x : {
            type: 'time',
            time: {
              unit:'year'
            }
          },
          y: {
            beginAtZero: true
          },
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    

      if(loading)
      {
{/* <h1>Loading..</h1> */}
      }
      else
      {
        var ctxPemasukan = document.getElementById("line-chart").getContext("2d");
      // console.log(dataPengunjungJan);
      window.myLine = new Chart(ctxPemasukan, configPemasukan);
      }
      
  }, 1);
  return () => window.clearTimeout(timeoutID );
  }, [dataPengunjungDes]);

// console.log(dataPengunjungNov);
  return (
    <>
{loading?<div className="z-50 absolute -mt-12    ">   
  {/* <ReactLoading type={"spin"} color={"red"} height={'5%'} width={'5%'} className=""/> */}
<p>Loading Data...</p>
</div> 

:
<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
    <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
      <div className="flex flex-wrap items-center">
        <div className="relative w-full max-w-full flex-grow flex-1">
          <button onClick={timeFrame} value="month">Monthly</button>
          <button onClick={timeFrame} value="year">Yearly</button>
          <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
            Overview
          </h6>
          <h2 className="text-white text-xl font-semibold">Grafik Pemasukan</h2>
        </div>
      </div>
    </div>
    <div className="p-4 flex-auto">
      {/* Chart */}
      <div className="relative h-350-px"> 
      <canvas id="line-chart" width="500" height="500"></canvas>
      </div>
    </div>
    
  </div> }
  
  {/* <div className="text-3xl z-40">
    asd
      </div> */}
    


    </>
  );
}
import React from "react";
import Chart from "chart.js";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ReactLoading from 'react-loading';
import Cookies from "js-cookie";

export default function CardLineChartCopy() {

  const [data,setData] = useState()
  const [loading,setLoading] = useState(true)

  const [unit, setUnit] = useState()

  // bulanan
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
        data: [2, dataPemasukanFeb, dataPemasukanMar , dataPemasukanApril, dataPemasukanMei, dataPemasukanJuni, dataPemasukanJuli, dataPemasukanAgus, dataPemasukanSept, dataPemasukanOkt, dataPemasukanNov,dataPemasukanDes],
        fill: false,
      },
    ],
  };
  const [result, setResult] = useState('month')

  const fetchData = () =>{
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/pemasukan`, {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      }}).then(res=>{
    console.log(res);  
    if(res.status === 200)
      {
          setData(res.data.pemasukan)
          setLoading(false);
      }
  });
  }
  console.log(result);
  
  useEffect(() => {
    fetchData()
  }, [])
  // console.log(data);


  if(loading) 
  {
    var loadingPemasukan  = <h1 className="absolute">Loading</h1>
  }
  else
  { 
    //annually
    var dataCurrYear = data.filter(val=>{
      return val.updated_at.slice(0, val.updated_at.indexOf('-')) == new Date().getFullYear();
    }).map((item,index)=>Math.floor(item.total_harga)).reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    var dataYear1 = data.filter(val=>{
      return val.updated_at.slice(0, val.updated_at.indexOf('-')) == new Date().getFullYear() - 1;
    }).map((item,index)=>Math.floor(item.total_harga)).reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    var dataYear2 = data.filter(val=>{
      return val.updated_at.slice(0, val.updated_at.indexOf('-')) == new Date().getFullYear() - 2;
    }).map((item,index)=>Math.floor(item.total_harga)).reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    var dataYear3 = data.filter(val=>{
      return val.updated_at.slice(0, val.updated_at.indexOf('-')) == new Date().getFullYear() - 3;
    }).map((item,index)=>Math.floor(item.total_harga)).reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    var dataYear4 = data.filter(val=>{
      return val.updated_at.slice(0, val.updated_at.indexOf('-')) == new Date().getFullYear() - 4;
    }).map((item,index)=>Math.floor(item.total_harga)).reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);

    
    //monthly
    var dataPemasukanJan = data.filter(val=>{
        return val.updated_at.slice(0, val.updated_at.lastIndexOf('-')) === new Date().getFullYear() + '-01'
      }).map((item,index)=>Math.floor(item.total_harga)).reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);

      var dataPemasukanFeb = data.filter(val=>{
        return val.updated_at.slice(0, val.updated_at.lastIndexOf('-')) === new Date().getFullYear() + '-02'
        }).map((item,index)=>Math.floor(item.total_harga)).reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);

      var dataPemasukanMar =  data.filter(val=>{
        return val.updated_at.slice(0, val.updated_at.lastIndexOf('-')) === new Date().getFullYear() + '-03'
        }).map((item,index)=>Math.floor(item.total_harga)).reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);

      var dataPemasukanApril = data.filter(val=>{
        return val.updated_at.slice(0, val.updated_at.lastIndexOf('-')) === new Date().getFullYear() + '-04'
        }).map((item,index)=>Math.floor(item.total_harga)).reduce((accumulator, value) => {
  return accumulator + value;
}, 0);

      var dataPemasukanMei = data.filter(val=>{
        return val.updated_at.slice(0, val.updated_at.lastIndexOf('-')) === new Date().getFullYear() + '-05'
        }).map((item,index)=>Math.floor(item.total_harga)).reduce((accumulator, value) => {
  return accumulator + value;
}, 0);

      var dataPemasukanJuni = data.filter(val=>{
        return val.updated_at.slice(0, val.updated_at.lastIndexOf('-')) === new Date().getFullYear() + '-06'
        }).map((item,index)=>Math.floor(item.total_harga)).reduce((accumulator, value) => {
  return accumulator + value;
}, 0);

      var dataPemasukanJuli = data.filter(val=>{
        return val.updated_at.slice(0, val.updated_at.lastIndexOf('-')) === new Date().getFullYear() + '-07'
      }).map((item,index)=>Math.floor(item.total_harga)).reduce((accumulator, value) => {
  return accumulator + value;
}, 0);

      var dataPemasukanAgus = data.filter(val=>{
        return val.updated_at.slice(0, val.updated_at.lastIndexOf('-')) === new Date().getFullYear() + '-08'
      }).map((item,index)=>Math.floor(item.total_harga)).reduce((accumulator, value) => {
  return accumulator + value;
}, 0);

      var dataPemasukanSept = data.filter(val=>{
        return val.updated_at.slice(0, val.updated_at.lastIndexOf('-')) === new Date().getFullYear() + '-09'
      }).map((item,index)=>Math.floor(item.total_harga)).reduce((accumulator, value) => {
  return accumulator + value;
}, 0);

      var dataPemasukanOkt = data.filter(val=>{
        return val.updated_at.slice(0, val.updated_at.lastIndexOf('-')) === new Date().getFullYear() + '-10'
      }).map((item,index)=>Math.floor(item.total_harga)).reduce((accumulator, value) => {
  return accumulator + value;
}, 0);

      var dataPemasukanNov = data.filter(val=>{
        return val.updated_at.slice(0, val.updated_at.lastIndexOf('-')) === new Date().getFullYear() + '-11'
      }).map((item,index)=>Math.floor(item.total_harga)).reduce((accumulator, value) => {
  return accumulator + value;
}, 0);

      var dataPemasukanDes = data.filter(val=>{
        return val.updated_at.slice(0, val.updated_at.lastIndexOf('-')) === new Date().getFullYear() + '-12'
      }).map((item,index)=>Math.floor(item.total_harga)).reduce((accumulator, value) => {
  return accumulator + value;
}, 0);

  //daily
    const hari = new Date();

    var thisDay = data.filter(val=>{
      return val.updated_at.slice(val.updated_at.lastIndexOf('-') + 1, val.updated_at.lastIndexOf('-') + 3) === hari.setDate(hari.getDate())
    }).map((item,index)=>Math.floor(item.total_harga)).reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    var thisDay2 = data.filter(val=>{
      return val.updated_at.slice(val.updated_at.lastIndexOf('-') + 1, val.updated_at.lastIndexOf('-') + 3) === hari.setDate(hari.getDate() - 1)
    }).map((item,index)=>Math.floor(item.total_harga)).reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    var thisDay3 = data.filter(val=>{
      return val.updated_at.slice(val.updated_at.lastIndexOf('-') + 1, val.updated_at.lastIndexOf('-') + 3) === hari.setDate(hari.getDate() - 2)
    }).map((item,index)=>Math.floor(item.total_harga)).reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    var thisDay4 = data.filter(val=>{
      return val.updated_at.slice(val.updated_at.lastIndexOf('-') + 1, val.updated_at.lastIndexOf('-') + 3) === hari.setDate(hari.getDate() - 3)
    }).map((item,index)=>Math.floor(item.total_harga)).reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    var thisDay5 = data.filter(val=>{
      return val.updated_at.slice(val.updated_at.lastIndexOf('-') + 1, val.updated_at.lastIndexOf('-') + 3) === hari.setDate(hari.getDate() - 4)
    }).map((item,index)=>Math.floor(item.total_harga)).reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    var thisDay6 = data.filter(val=>{
      return val.updated_at.slice(val.updated_at.lastIndexOf('-') + 1, val.updated_at.lastIndexOf('-') + 3) === hari.setDate(hari.getDate() - 5)
    }).map((item,index)=>Math.floor(item.total_harga)).reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    var thisDay7 = data.filter(val=>{
      return val.updated_at.slice(val.updated_at.lastIndexOf('-') + 1, val.updated_at.lastIndexOf('-') + 3) === hari.setDate(hari.getDate() - 6)
    }).map((item,index)=>Math.floor(item.total_harga)).reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);


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

  const timeFrame = (period) => {
    if(result === 'month')
    {
      setResult('year')
    }else if(result === 'year')
    {
      setResult('bulan')
    }
    else if(result === 'day')
    {
      setResult('day')
    }
  
  }

  React.useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      let configPemasukanBulanan = {
      type: "line",
      data: {
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
            data: [2, dataPemasukanFeb, dataPemasukanMar , dataPemasukanApril, dataPemasukanMei, dataPemasukanJuni, dataPemasukanJuli, dataPemasukanAgus, dataPemasukanSept, dataPemasukanOkt, dataPemasukanNov,dataPemasukanDes],
            fill: false,
          },
        ],
      },
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

      let configPemasukanTahunan = {
      type: "line",
      data: {
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
      },
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
      let configPemasukanHarian = {
      type: "line",
      data: {
        labels: [
          hari.setDate(hari.getDate() - 6),
          hari.setDate(hari.getDate() - 5),
          hari.setDate(hari.getDate() - 4),
          hari.setDate(hari.getDate() - 3),
          hari.setDate(hari.getDate() - 2),
          hari.setDate(hari.getDate() - 1),
          hari.setDate(hari.getDate())
        ],
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: [thisDay, thisDay2, thisDay3, thisDay4, thisDay5, thisDay6, thisDay7],
            fill: false,
          },
        ],
      },
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
        var ctxPemasukanBulanan = document.getElementById("line-chart-bulanan").getContext("2d");
        window.myLine = new Chart(ctxPemasukanBulanan,configPemasukanBulanan);
        var ctxPemasukanTahunan = document.getElementById("line-chart-tahunan").getContext("2d");
        window.myLine = new Chart(ctxPemasukanTahunan,configPemasukanTahunan);
        var ctxPemasukanHarian = document.getElementById("line-chart-harian").getContext("2d");
        window.myLine = new Chart(ctxPemasukanHarian,configPemasukanHarian);
    }
      
  }, 1);
  return () => window.clearTimeout(timeoutID );
  }, [dataPemasukanDes]);

  
  return (
    <>
    {loading?
    <div className="" >
      <div colspan={3} className="text-xl text-center justify-center font-semibold py-5">
        <ReactLoading type={"spin"} color={"red"} height={'5%'} width={'5%'} className="m-auto" />
      </div>
    </div>

:
<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-red-400">
    <div className="rounded-t mb-0 px-4 py-3">
      <div className="flex flex-wrap items-center">
        <div className="relative w-full max-w-full flex-grow flex-1">
          <div className="container relative flex min-w-0 break-words w-full">
            <h6 className="uppercase text-gray-800 text-xs font-semibold py-2 lg:mt-0">Overview</h6>
            <div className="w-full lg:order-3 flex lg:justify-end lg:mt-0">
              <button onClick={e=>setResult('day')} value="day" className="bg-[#A70B0B] hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-300 px-4 mr-2 rounded-sm font-nunito font-bold text-white">Daily</button>
              <button onClick={e=>setResult('year')} value="month" className="bg-[#A70B0B] hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-300 px-4 mr-2 rounded-sm font-nunito font-bold text-white">Monthly</button>
              <button onClick={e=>setResult('month')} value="year" className=" bg-[#A70B0B] hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-300 px-4 mr-2 rounded-sm font-nunito font-bold text-white">Yearly</button>
            </div>
          </div>
          <h2 className="text-gray-800 text-xl font-semibold">Grafik Pemasukan</h2>
        </div>
      </div>
    </div>
    <div className="p-4 flex-auto">
      {/* Chart */}
      <div className={`${result === 'month'?'':'hidden'} relative h-350-px`}> 
        <canvas id="line-chart-tahunan" width="500" height="500" color="black"></canvas>
      </div>
      <div className={`${result === 'month'?'hidden':''} relative h-350-px`}> 
        <canvas id="line-chart-bulanan" width="500" height="500"></canvas>
      </div>
      <div className={`${result === 'day'?'hidden':''} relative h-350-px`}> 
        <canvas id="line-chart-harian" width="500" height="500"></canvas>
      </div>
    </div>
  </div> }

    </>
  );
}
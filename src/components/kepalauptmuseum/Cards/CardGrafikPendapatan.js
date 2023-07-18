import React from "react";
import Chart from "chart.js";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ReactLoading from 'react-loading';
import Cookies from "js-cookie";

export default function CardLineChart() {

  const [data,setData] = useState()
  const [loading,setLoading] = useState(true)
  const [result, setResult] = useState('month');

  const [unit, setUnit] = useState()

  const hari = new Date();



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/pemasukan`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
          }
        });
        if (response.status === 200) {
          setData(response.data.pemasukan);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  console.log(data);

 

  useEffect(() => {
    const generateChart = () => {
      if (!loading) {
        // Bulanan
        const monthData = {
          labels: [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ],
          datasets: [
            {
              label: new Date().getFullYear(),
              backgroundColor: "#4c51bf",
              borderColor: "#4c51bf",
              data: [
                dataPemasukanJan, dataPemasukanFeb, dataPemasukanMar, dataPemasukanApril, dataPemasukanMei, dataPemasukanJuni,
                dataPemasukanJuli, dataPemasukanAgus, dataPemasukanSept, dataPemasukanOkt, dataPemasukanNov, dataPemasukanDes
              ],
              fill: false
            }
          ]
        };

        // Tahunan
        const yearData = {
          labels: [
            new Date().getFullYear() - 4, new Date().getFullYear() - 3, new Date().getFullYear() - 2,
            new Date().getFullYear() - 1, new Date().getFullYear()
          ],
          datasets: [
            {
              label: new Date().getFullYear(),
              backgroundColor: "#4c51bf",
              borderColor: "#4c51bf",
              data: [dataYear4, dataYear3, dataYear2, dataYear1, dataCurrYear],
              fill: false
            }
          ]
        };

        // Harian
        const today = new Date().toISOString().slice(0, 10);
        const labelsHarian = [
          labelHari1, labelHari2, labelHari3, labelHari4, labelHari5, labelHari6, labelHari7
        ];
        const dataHarian = [
           thisDay7, thisDay6, thisDay5, thisDay4, thisDay3, thisDay2,thisDay
        ];
        const dailyData = {
          labels: labelsHarian,
          datasets: [
            {
              label: new Date().getFullYear(),
              backgroundColor: "#4c51bf",
              borderColor: "#4c51bf",
              data: dataHarian,
              fill: false
            }
          ]
        };

        // Menentukan konfigurasi grafik berdasarkan result
        let chartData;
        if (result === 'year') {
          chartData = yearData;
        } else if (result === 'month') {
          chartData = monthData;
        } else {
          chartData = dailyData;
        }

        // Mengambil elemen canvas dan menginisialisasi grafik
        const chartCanvas = document.getElementById("line-chart");
        new Chart(chartCanvas, {
          type: "line",
          data: chartData,
          options: {
            maintainAspectRatio: false,
            responsive: true,
            title: {
              display: false,
              text: "Sales Charts",
              fontColor: "white"
            },
            legend: {
              labels: {
                fontColor: "white"
              },
              align: "end",
              position: "bottom"
            },
            tooltips: {
              mode: "index",
              intersect: false
            },
            hover: {
              mode: "nearest",
              intersect: true
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    fontColor: "rgba(255,255,255,.7)"
                  },
                  display: true,
                  scaleLabel: {
                    display: false,
                    labelString: "Month",
                    fontColor: "white"
                  },
                  gridLines: {
                    display: false,
                    borderDash: [2],
                    borderDashOffset: [2],
                    color: "rgba(33, 37, 41, 0.3)",
                    zeroLineColor: "rgba(0, 0, 0, 0)",
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2]
                  }
                }
              ],
              yAxes: [
                {
                  ticks: {
                    fontColor: "rgba(255,255,255,.7)"
                  },
                  display: true,
                  scaleLabel: {
                    display: false,
                    labelString: "Value",
                    fontColor: "white"
                  },
                  gridLines: {
                    borderDash: [3],
                    borderDashOffset: [3],
                    drawBorder: false,
                    color: "rgba(255, 255, 255, 0.15)",
                    zeroLineColor: "rgba(33, 37, 41, 0)",
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2]
                  }
                }
              ]
            }
          }
        });
      }
    };

    generateChart();
  }, [loading, result]);

  if(loading) {
    return (
      <div className="text-xl text-center justify-center font-semibold py-5">
        <ReactLoading type={"spin"} color={"red"} height={'5%'} width={'5%'} className="m-auto" />
      </div>
    );
  } 
    // Filter berdasarkan tahun
    const currentYear = new Date().getFullYear();
    const yearData = Array(5)
      .fill()
      .map((_, index) => {
        const year = currentYear - index;
        return data
          .filter((val) => val.updated_at.startsWith(year.toString()))
          .map((item) => Math.floor(item.total_harga))
          .reduce((accumulator, value) => accumulator + value, 0);
      });
    
    const currentMonth =  1;
    const monthData = Array(12)
      .fill()
      .map((_, index) => {
        const month = (currentMonth + index).toString().padStart(2, "0");
        return data
          .filter((val) => val.updated_at.slice(0, 4) === currentYear.toString() )
          .filter((val) => val.updated_at.slice(5, 7) === month)
          .map((item) => Math.floor(item.total_harga))
          .reduce((accumulator, value) => accumulator + value, 0);
      });
    
    const today = new Date().toISOString().slice(0, 10);
    const dayData = Array(7)
      .fill()
      .map((_, index) => {
        const day = new Date();
        day.setDate(day.getDate() - index);
        const labelDay = day.toISOString().slice(0, 10);
        return data
          .filter((val) => val.updated_at.startsWith(labelDay))
          .map((item) => Math.floor(item.total_harga))
          .reduce((accumulator, value) => accumulator + value, 0);
      });

    const [dataCurrYear, dataYear1, dataYear2, dataYear3, dataYear4] = yearData;
    const [
      dataPemasukanJan,
      dataPemasukanFeb,
      dataPemasukanMar,
      dataPemasukanApril,
      dataPemasukanMei,
      dataPemasukanJuni,
      dataPemasukanJuli,
      dataPemasukanAgus,
      dataPemasukanSept,
      dataPemasukanOkt,
      dataPemasukanNov,
      dataPemasukanDes,
    ] = monthData;
    const [thisDay, thisDay2, thisDay3, thisDay4, thisDay5, thisDay6, thisDay7] = dayData;
    

    

    //get data hari ini dan 7 hari kebelakang
    hari.setDate(hari.getDate());
    var labelHari7 = hari.toISOString().slice(0, 10);
    hari.setDate(hari.getDate() - 1);
    var labelHari6 = hari.toISOString().slice(0, 10);
    hari.setDate(hari.getDate() - 1);
    var labelHari5 = hari.toISOString().slice(0, 10);
    hari.setDate(hari.getDate() - 1);
    var labelHari4 = hari.toISOString().slice(0, 10);
    hari.setDate(hari.getDate() - 1);
    var labelHari3 = hari.toISOString().slice(0, 10);
    hari.setDate(hari.getDate() - 1);
    var labelHari2 = hari.toISOString().slice(0, 10);
    hari.setDate(hari.getDate() - 1 );
    var labelHari1 = hari.toISOString().slice(0, 10);

  

  if (loading) {
    return (
      <div className="text-xl text-center justify-center font-semibold py-5">
        <ReactLoading type={"spin"} color={"red"} height={'5%'} width={'5%'} className="m-auto" />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-red-900">
      <div className="rounded-t mb-0 px-4 py-3">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <div className="container relative flex min-w-0 break-words w-full">
              <h6 className="uppercase text-white text-xs font-semibold lg:mt-0">UPT Museum Surakarta</h6>
              <div className="w-full lg:order-3 flex lg:justify-end">
                <button onClick={() => setResult('day')} value="day" className="bg-[#A70B0B] hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-300 px-4 mr-2 rounded-sm font-nunito font-bold text-white">Daily</button>
                <button onClick={() => setResult('month')} value="month" className="bg-[#A70B0B] hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-300 px-4 mr-2 rounded-sm font-nunito font-bold text-white">Monthly</button>
                <button onClick={() => setResult('year')} value="year" className="bg-[#A70B0B] hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-300 px-4 mr-2 rounded-sm font-nunito font-bold text-white">Yearly</button>
              </div>
            </div>
            <h2 className="text-white text-xl font-semibold">Grafik Pemasukan</h2>
          </div>
        </div>
      </div>
      <div className="p-4 flex-auto">
        <div className="relative h-350-px">
          <canvas id="line-chart" width="500" height="500" color="black"></canvas>
        </div>
      </div>
    </div>
  );
}
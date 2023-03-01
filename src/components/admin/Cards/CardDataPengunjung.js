import React, {Component, useState} from 'react';
import { GrFormView } from 'react-icons/gr';
import { useHistory } from 'react-router-dom';
//jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

//For API Requests
import axios from 'axios';

class CardDataPengunjung extends Component {

// State array variable to save and show data
  constructor(props) {
    super(props)
      this.state = {
        data: [],
        
      }}
      
  componentDidMount() {

//Get all users details in bootstrap table
  axios.get(`http://localhost:8000/api/pengunjung`).then(res=>{
    console.log(res);  
      if(res.status === 200)
        {
          this.setState({data: res.data.pengunjung});
        }
      }); 

//initialize datatable
  $(document).ready(function () {
    setTimeout(function(){
      $('#example').DataTable();
    } ,1000);
  });
}

render(){
//Datatable HTML
  return (
    <div className= "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-lg font-merriweather text-red-600">Data Pengunjung</h3>
          </div>
        </div>
      </div>

    <div className="block w-full overflow-x-auto">
      <table id="example" class="table table-hover table-bordered">
        <thead>
          <tr className='bg-red-600 text-red-200'>
            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left">Nama</th>
            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left">Museum</th>
            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left">Kategori</th>
            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left">Nomor Hp</th>
            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left">Asal Kota</th>
            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left">Asal Negara</th>
            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left">Jumlah Pengunjung</th>
            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left">Total Pembelian Tiket</th>
            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left">Pembayaran</th>
            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left">Status</th>
            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left">Kehadiran</th>
            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left ">
                  Tanggal Pembayaran
                </th>
                <th
                  className="sticky right-0 bg-white text-red-700 px-2">
                  Tiket
                </th>
              </tr>
          </thead>
          <tbody>
          {this.state.data.map((result) => {
            return (
              
                <tr key={result} className="text-black">
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{result.nama }</td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{result.museum}</td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{result.kategori}</td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{result.phone}</td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{result.kota}</td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{result.negara == null?"Indonesia":result.negara}</td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{result.jumlah}</td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{result.harga_awal}</td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{result.pembayaran}</td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{result.status == "Lunas" ? "Lunas" : "Belum Lunas"}</td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{result.tanggal_pembayaran}</td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{result.kehadiran == "Hadir" ? "Hadir" : "Tidak Hadir"}</td>
                    <td className="sticky right-0 bg-white  w-full m-auto border-b flex py-3 justify-center">
                    <button href={'http://localhost:3000/tiket/' + result.kode_tiket} className="bg-gray-500 hover:bg-gray-600 rounded shadow-inner drop-shadow-2xl  py-0.5 px-1">
                        
                    <GrFormView className=""/>
                    </button>
                    </td>
                </tr>
              
            )
          })}
            
             
          </tbody>
        </table>
           
        </div>
      </div>
  );
 }
}

// }

export default CardDataPengunjung;

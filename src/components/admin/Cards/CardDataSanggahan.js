import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// components

import TableDropdown from "../Dropdowns/TableDropdown.js";
import axios from "axios";

import excel from "../../../assets/img/admin/excel.png"
import $ from 'jquery'; 
import DataTable from 'datatables.net';

export default function CardTable({ color }) {
  
  const [loading,setLoading] = useState(true)
  const [pengunjung,setPengunjung] = useState([])
  const [searchTerm, setSearchTerm] = useState("")


  const handleDownload = () => {

    axios({
      url: 'http://localhost:8000/api/pengunjungExport',
      method: 'GET',
      responseType: 'blob', // important`
    }).then((response) => {
      console.log(response);
   const url = window.URL.createObjectURL(new Blob([response.data]));
   const link = document.createElement('a');
   link.href = url;
   link.setAttribute('download', 'file.xlsx'); //or any other extension
   document.body.appendChild(link);
   link.click();
});
  }

  useEffect(() => {
    axios.get(`http://localhost:8000/api/pengunjung`).then(res=>{
    console.log(res);  
    if(res.status === 200)
      {
          setPengunjung(res.data.pengunjung)
          setLoading(false);
      }
  });
  }, [])

  if(loading)
  {
    return <h4>Loading Pengunjung Data ....</h4>
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
      val.museum.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.kategori.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.kota.toLowerCase().includes(searchTerm.toLowerCase()) )
      {
        return val
      }
    }).map((item,index)=>{
      return(
              <tr>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {item.nama}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {item.museum}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {item.kategori}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {item.phone}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {item.kota}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {item.negara == null?"Indonesia":item.negara}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {item.jumlah}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {item.harga_awal}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {item.potongan_harga}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {item.harga_akhir}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {item.attachment == null?"none":item.attachment}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {item.pembayaran}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {item.status}
                </td>
              </tr>
      )
    })
  }
  
  // var table = $(document).ready(function () {
  //   $('#dataTable').DataTable();

  // });

  // var filteredData = table
  //   .column( 0 )
  //   .data()
  //   .filter( function ( value, index ) {
  //       return value > 20 ? true : false;
  //   } );

//   $(document).ready(function () {
//     // Setup - add a text input to each footer cell
//     $('#dataTable thead tr')
//         .clone(true)
//         .addClass('filters')
//         .appendTo('#dataTable thead');
 
//     var table = $('#dataTable').DataTable({
//         orderCellsTop: true,
//         fixedHeader: true,
//         "bDestroy": true,
//         initComplete: function () {
//             var api = this.api();
 
//             // For each column
//             api
//                 .columns()
//                 .eq(0)
//                 .each(function (colIdx) {
//                     // Set the header cell to contain the input element
//                     var cell = $('.filters th').eq(
//                         $(api.column(colIdx).header()).index()
//                     );
//                     var title = $(cell).text();
//                     $(cell).html('<input type="text" placeholder="' + title + '" />');
 
//                     // On every keypress in this input
//                     $(
//                         'input',
//                         $('.filters th').eq($(api.column(colIdx).header()).index())
//                     )
//                         .off('keyup change')
//                         .on('change', function (e) {
//                             // Get the search value
//                             $(this).attr('title', $(this).val());
//                             var regexr = '({search})'; //$(this).parents('th').find('select').val();
 
//                             var cursorPosition = this.selectionStart;
//                             // Search the column for that value
//                             api
//                                 .column(colIdx)
//                                 .search(
//                                     this.value != ''
//                                         ? regexr.replace('{search}', '(((' + this.value + ')))')
//                                         : '',
//                                     this.value != '',
//                                     this.value == ''
//                                 )
//                                 .draw();
//                         })
//                         .on('keyup', function (e) {
//                             e.stopPropagation();
 
//                             $(this).trigger('change');
//                             // $(this)
//                             //     .focus()[0]
//                             //     .setSelectionRange(cursorPosition, cursorPosition);
//                         });
//                 });
//         },
//     });
// });

  return (
    <>
    <div className="flex">
      
    <div className="my-2  w-72">
        <input type='text' className="w-full border-none ring-2 ring-red-300 focus:border-none focus:ring-red-500 focus:ring-2 active:border-none  rounded-lg"  placeholder="Cari nama, kategori, kota, ..." onChange={e=>{setSearchTerm(e.target.value)}} /> 
      </div>
      <div className=" flex justify-end items-center w-full">
        <button className="bg-green-400 rounded-xl h-7 px-5 mx- text-sm text-green-800" onClick={handleDownload}><p className="flex">Unduh Laporan <img src={excel} className='w-4 ml-2'/></p></button>
      </div>
    </div>
    <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Data Pengunjung
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table id="dataTable" className="display items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Nama
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Museum
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Kategori
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Nomor Hp
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Asal Kota
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Asal Negara
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Jumlah Pengunjung
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Total Pembelian Tiket (Harga Awal)
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Potongan Harga
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Total Pembelian Tiket (Harga Akhir)
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Attachment
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Pembayaran
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {pengunjung_HTMLTABLE}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// CardDataSanggahan.defaultProps = {
//   color: "light",
// };

// CardDataSanggahan.propTypes = {
//   color: PropTypes.oneOf(["light", "dark"]),
// };
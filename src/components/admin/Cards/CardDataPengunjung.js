import React, { useEffect, useState, Fragment} from "react";
import ReactLoading from 'react-loading';
import { GrFormView } from 'react-icons/gr';

// components
import axios from "axios";
import excel from "../../../assets/img/admin/excel.png"
import { useHistory } from 'react-router-dom';
import Datatable from 'react-data-table-component';
import styled from 'styled-components'
import FontAwesome from 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';

export default function CardTable({ color }) {

  const columns = [
    {
      name: 'Nama',
      selector: row => row.nama
    },
    {
      name: 'Museum',
      selector: row => row.museum
    },
    {
      name: 'Kategori',
      selector: row => row.kategori
    },
    {
      name: 'Phone',
      selector: row => row.phone
    },
    {
      name: 'Kota',
      selector: row => row.kota
    },
    {
      name: 'Jumlah',
      selector: row => row.jumlah
    },
    {
      name: 'Harga_awal',
      selector: row => row.harga_awal
    },
    {
      name: 'Pembayaran',
      selector: row => row.pembayaran
    },
    {
      name: 'Status',
      selector: row => row.status
    },
    {
      name: 'Tanggal Pembayaran',
      selector: row => row.tanggal_pembayaran
    },
    {
      name: 'Kehadiran',
      selector: row => row.kehadiran
    },
    {
      id: 'kode_tiket',
      name: 'Kode Tiket',
      style: {
        background: "orange",
        right: 0,
        position: 'sticky',
        // content: 'fa-solid fa-eye',
        fontWeight: 900,
      },
      selector: row => row.kode_tiket,
    },
  ];

  const [loading,setLoading] = useState(true)
  const [pengunjung,setPengunjung] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  
  const [token, setToken] = useState(Cookies.get('token'));
  
  const history = useHistory()
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/pengunjung`, {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: 'Bearer'+token,
      }
    }).then(res=>{
    if(res.status === 200)
      {
        setPengunjung(res.data.pengunjung)
      }
    });
  }, []);
  
  const handleDownload = () => {
    axios({
      url: `${process.env.REACT_APP_API_ENDPOINT}/api/pengunjungExport`,
      method: 'GET',
      responseType: 'blob', // important`
    }).then((response) => {
      console.log(response);
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  
  const tanggal = new Date(Date.now()).toLocaleString().split(',')[0];

  let filename = 'file-' + tanggal + '.xlsx';
  link.setAttribute('download', filename); //or any other extension
  document.body.appendChild(link);
  link.click();
});
}

const handleTiket = (e) =>{
  history.push("/tiket/" + e );
}

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
});

return (
    <>
    <div className="flex">
      <div className="my-2  w-72">
        <input type='text' className="w-full font-nunito border-none ring-2 ring-red-300 focus:border-none focus:ring-red-500 focus:ring-2 active:border-none rounded-lg"  placeholder="Cari nama, kategori, kota,..." onChange={e=>{setSearchTerm(e.target.value)}} /> 
      </div>
      <div className=" flex justify-end items-center w-full">
        <button className="bg-green-400 rounded-xl h-7 px-5 text-sm font-nunito text-green-800" onClick={handleDownload}><p className="flex">Unduh Laporan <img src={excel} className='w-4 ml-2'/></p></button>
      </div>
    </div>
      <div className="container mt-5">
        <Datatable title="Data Pengunjung" columns={columns} data={pengunjung_HTMLTABLE} pagination highlightOnHover >
        <Fragment>
                  <button
                      className="btn btn-primary btn-sm"
                      onClick={() => this.handleDownload()}
                      style={{marginRight: '5px'}}>
                      <i className="glyphicon glyphicon-edit fa-solid fa-eye"></i>
                  </button>                  
              </Fragment>
        </Datatable>

      </div>
    </>
  );
}
//  title="Data Pengunjung" columns={columns} data={pengunjung_HTMLTABLE} pagination highlightOnHover >
// CardDataSanggahan.defaultProps = {
//   color: "light",
// };

// CardDataSanggahan.propTypes = {
//   color: PropTypes.oneOf(["light", "dark"]),
// };

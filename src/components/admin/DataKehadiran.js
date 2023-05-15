import { Card } from '@material-tailwind/react'
import PropTypes from "prop-types"
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import kosong from "../../assets/img/admin/nothing.svg"
import DefaultFooterAdmin from "components/DefaultFooterAdmin.js"
import ReactLoading from 'react-loading'
import CardDataKehadiran from './Cards/CardDataKehadiran'

function DataKehadiran ({ color }) {

      const [loading,setLoading] = useState(true)
      const [pengunjung,setPengunjung] = useState([])
      
    const [searchTerm, setSearchTerm] = useState("")

      const [token, setToken] = useState(Cookies.get('token'));
      const [user,setUser] = useState('loading');
      // const [loading, setLoading] = useState(false);

      
      const fetchData = async () => {
        const data = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/me`, {
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
        
      axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/konfirmasi-pengunjung`).then(res=>{
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
            console.log(user);
    
      const handleKonfirmasi = (e,idData) =>{
        // e.preventDefault();
        const data = {
            idData : idData,
            idAdmin: user
        }
        console.log(data);

        swal({
          title: "Konfirmasi kedatangan Pengunjung?",
          text: "Sekali Konfirmasi, anda tidak bisa mengubahnya lagi!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((update) => {
          if (update) {
            axios.put(`${process.env.REACT_APP_API_ENDPOINT}/api/kehadiran`,data).then(res=>{
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

    return (
      <>
        <div className="flex flex-wrap">
          <div className="w-full px-4">
            <CardDataKehadiran/>
          </div>
        </div>
        <DefaultFooterAdmin/>
      </>
    )
  
}

export default DataKehadiran


DataKehadiran.defaultProps = {
  color: "light",
};

DataKehadiran.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

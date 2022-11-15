import { Card } from '@material-tailwind/react'
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'

function DataKehadiran() {

    const [loading,setLoading] = useState(true)
    const [pengunjung,setPengunjung] = useState([])
  
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
            axios.put(`http://localhost:8000/api/kehadiran`,data).then(res=>{
                  if(res.data.status === 200)
                  {
                      // console.log('berhasil delet');
                      swal("Berhasil!",res.data.message,"success")
                      // .then(e=>window.location.reload(false));;
                      // thisClicked.closest("tr").remove();
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

    const [token, setToken] = useState(Cookies.get('token'));
    const [user,setUser] = useState('loading');
    // const [loading, setLoading] = useState(false);
  
    useEffect(() => {
          const fetchData = async () => {
              const data = await fetch(`http://localhost:8000/api/me`, {
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
                 result = json.user.id;
              }
              
              setUser(result);
              // return json;
              // console.log(result);
              
            }
            fetchData ();
            
          }, [pengunjung]);
          console.log(pengunjung);

    useEffect(() => {
      axios.get(`http://localhost:8000/api/konfirmasi-pengunjung`).then(res=>{
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
      

      if(pengunjung == [])
      {
        return <h4>Tidak ada</h4>
      }
      else
      {
        var pengunjung_HTMLTABLE = "";
  
      pengunjung_HTMLTABLE = pengunjung.map((item,index)=>{
        // console.log(item);
        return(
            <div className='w-1/2 px-10 my-4' key={index}>
                <Card className="p-5">
                    <p>nama: {item.nama}</p>
                    <p>museum: {item.museum}</p>
                    <p>kategori: {item.kategori}</p>
                    <p>harga: {item.harga_awal}</p>
                    <div className='flex justify-center'>
                        <button id={`konfirmasi-${item.id}`} className='p-2 bg-green-400 rounded-xl' onClick={e=>handleKonfirmasi(e, item.id)}>Konfirmasi</button>
                    </div>
                </Card>
            </div>
        )
      })
      }
    }

  return (
    <>
    
    <div className='w-full flex flex-wrap'>
        {pengunjung_HTMLTABLE}

    </div>

    </>
  )
}

export default DataKehadiran
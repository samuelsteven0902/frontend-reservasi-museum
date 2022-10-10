import { data } from 'autoprefixer';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

function FormInput({dataAwal,hargaa}) {
    const [pengunjung,setPengunjung] = useState(null);
    
    const [checked, setChecked] = useState(false);
    const [text, setText] = useState("");
    // console.log(pengunjung); 
    
  const [imageUrl, setImageUrl] = useState(null);
    const [dataPengunjung,setDataPengunjung] = useState({
        nama :'',
        kota :'',
        phone:'',
        jumlah:'',
        foto: null,
        attachment: null,
        error_list: [],


    });

    var dayOfWeek = new Date (dataAwal.calendar).getDay();
    var isWeekend = (dayOfWeek === 6) || (dayOfWeek  === 0);
    console.log(isWeekend);

    
    console.log(typeof(dataAwal.calendar));

    const [errorInput, setError] = useState([]);

    const [kartu,setKartu] = useState('')
    let fotoKartu = new FormData();
    fotoKartu.append("fotoKartu", kartu)


    const history = useHistory();
    const [namaFoto,setNamaFoto] = useState('')
    const [totalOrang,setTotalOrang] = useState(0)
    const [harga,setHarga] = useState()
    const [orang,setOrang] = useState(null)
    const min = null;
    const max = 50;

    const handleInput = (e) => {
        e.persist();
        setDataPengunjung({...dataPengunjung, [e.target.name]: e.target.value })
    }

    const handleJummlah = (e) =>{
        const value = Math.max(min, Math.min(max, Number(e.target.value)));
        setOrang(value)   
        setDataPengunjung({...dataPengunjung, [e.target.name]: value })
        console.log(orang);
        e.persist();
        
    } 



    // const cekData = () => {
    //     let museum = dataAwal.dataAwal.museum;
    //     // let umum = document.getElementById('umum');
    //     // let kia = document.getElementById('pelajar');
    //     let category = dataAwal.dataAwal.category; 
    //     // console.log(data.data.category);
    //     if(museum === 'museum_radya_pustaka'){
    //         const harga = document.getElementById('harga');
    //         console.log(harga);
    //         harga.classList.add('hidden');
    //     }
    
    //     if(category === 'umum')
    //     {
    //         // umum.classList.remove('hidden');
    //         setHarga(7500);
    //     }
    //     else if(category === 'mahasiswa')
    //     {
    //         // let ktm = document.getElementById('ktm');
    //         // ktm.classList.remove('hidden');
    //         setPengunjung('Mahasiswa')
    //         setNamaFoto('KTM')
    //         setHarga(5000);
    
    //     }else if(category === 'pelajar')
    //     {
    //         // kia.classList.remove('hidden');
    //         setPengunjung('Pelajar')
    //         setHarga(4000);
            
    //     }else if(category === 'rombongan_umum')
    //     {
    //         // umum.classList.remove('hidden');
    //         // let rombonganUmum = document.getElementById('rombonganUmum');
    //         // rombonganUmum.classList.remove('hidden');
    //         setPengunjung('Rombongan Umum')
    //         setHarga(5000);
            
    //     }else if(category === 'rombongan_pelajar')
    //     {
    //         // kia.classList.remove('hidden');
    //         // let rombonganPelajar = document.getElementById('rombonganPelajar');
    //         // rombonganPelajar.classList.remove('hidden');
    //         setPengunjung('Rombongan Pelajar')
    //         setHarga(4000);
    
    //     }else if(category === 'wna')
    //     {
    
    //     }
    // }

    
    const validasiDataPengunjung = (e) => {
        e.preventDefault();
        const dataInput = {
            nama:dataPengunjung.nama,
            kota:dataPengunjung.kota,
            phone:dataPengunjung.phone,
            jumlah:dataPengunjung.jumlah,
            foto:dataPengunjung.foto,
            museum:dataAwal.museum,
            kategori:dataAwal.category,
            tanggal:dataAwal.calendar,
        }
        console.log(dataInput);

        axios.post(`http://localhost:8000/api/validasi-pengunjung`, dataInput).then(res => {

            console.log(res.data);
            if(res.data.status === 200)
            {
                // console.log('MANTAB BERHASIL');
                history.push({ pathname:"/Pembayaran",
                                state : {dataInput,totalOrang}
                                     });
            }
            else if(res.data.status === 422)
            {
                setDataPengunjung({...dataPengunjung, error_list: res.data.validate_err });
            }
        });
    }
    console.log(dataPengunjung,totalOrang);

    useEffect(() => {
    // console.log(museum);
    // cekData();
    setHarga(hargaa && hargaa.hari_libur)

    if(hargaa)
    {
        if(isWeekend == false )
        {
            setHarga(hargaa.hari_biasa)
        }
        else
        { 
            setHarga(hargaa.hari_libur)
        }

    }


    console.log(harga);
    setTotalOrang(orang * harga);
    // if (dataPengunjung.foto) {
    //     setImageUrl(URL.createObjectURL(dataPengunjung.foto));
    //   }
    }, [orang,dataPengunjung,kartu,hargaa,harga])


    return (
    <div className='container py-12 mx-auto'>
        <div className='justify-center text-center'>
            <h1 className='text-4xl font-bold'>Form Input Pengunjung <span>{pengunjung}</span>  
        </h1>
        </div>
        <div className="w-full px-6 md:px-24 py-12 mx-auto">
            <form onSubmit={validasiDataPengunjung} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className='flex justify-around'>    
                    <div className="w-96 mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Nama
                        </label>
                        <input name='nama' onChange={handleInput} value={dataPengunjung.nama} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="contoh : Kirana" />
                        <span className="text-sm text-red-500">{dataPengunjung.error_list.nama}</span>
                    </div>
                    <div className="w-96 mb-4 mx-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Kota Asal
                        </label>
                        <input name='kota' onChange={handleInput} value={dataPengunjung.kota} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Contoh :  Surakarta" />
                        <span className="text-sm text-red-500">{dataPengunjung.error_list.kota}</span>
                    </div>

                </div>
                <div className='flex justify-around'>    
                    <div className="w-96 mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                            No Hp
                        </label>
                        <input name='phone' onChange={handleInput} value={dataPengunjung.phone} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Contoh : 081234567890" />
                        <span className="text-sm text-red-500">{dataPengunjung.error_list.phone}</span>
                    </div>
                    <div className="w-96 mb-4 mx-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Jumlah Orang
                        </label>
                        <input name='jumlah' onChange={(e)=>{ handleJummlah(e);  }} value={orang} maxLength={orang} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="number" placeholder="Contoh : 5 orang" />
                        <span className="text-sm text-red-500">{dataPengunjung.error_list.jumlah}</span>
                    </div>
                </div>


                    {/* INPUTAN FILE */}
                {/* <div id='foto' className='flex justify-around'>
                    <div id='umum' className="max-w-96 mb-4 mx-12 ">
                    <div className="flex justify-center">
                        <div className="mb-3 w-96">
                            <label for="formFile" className="form-label inline-block mb-2 text-gray-700">foto {namaFoto}</label>
                            <input name='foto' onChange={
                                (e)=> {
                                // setDataPengunjung({...dataPengunjung, [e.target.name]: e.target.files[0] });
                                setKartu(e.target.files[0])
                                setDataPengunjung({...dataPengunjung, foto: fotoKartu })
                                }} className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" id="formFile" />
                        <span className="text-sm text-red-500">{dataPengunjung.error_list.foto}</span>
                        </div>
                    </div>
   
                    </div>
                </div> */}




                <div>
                    <p>Syarat dan Ketentuan Pengunjung</p>
                    <p>1. Dilarang membawa makan dan minuman selama didalam Museum Keris</p>
                    <p>2. Dilarang memegang  Properti didalam Museum Keris</p>
                    <p>3. Dilarang membuang sampah sembarangan</p>
                </div>
                
                <div className="flex items-start my-4">
                    <input name="checkbox"
          type="checkbox"
          checked={checked}
          onChange={() => {
                if(checked){
                  setText('')
                }
            setChecked(!checked)
              }
           } id="checkbox-2" aria-describedby="checkbox-2"  className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded" />
                    <label for="checkbox-2" className="text-sm ml-3 font-medium text-gray-900">I want to get promotional offers</label>
                </div>
                
                <div className="flex flex-wrap justify-end">
                    <div className='w-1/3  text-center'>
                        <div  id='harga'  className='py-3'>
                            <p className='text-2xl font-bold '>Rp {totalOrang.toLocaleString()}</p>
                        </div>
                        <button disabled={!checked} className=" bg-[#A70B0B] hover:bg-[#A70B0B]  text-white font-bold py-2 px-24 rounded-full focus:outline-none focus:shadow-outline " type="submit">Lanjut Pembayaran
                           {/* <Link to={{ pathname:"/Pembayaran",
                                        state : {dataPengunjung,harga}
                                     }}>Lanjut Pmebayaran</Link>  */}
                        </button>
                    </div>
                </div>

            </form>
            <p className="text-center text-gray-500 text-xs">
                &copy;2020 Acme Corp. All rights reserved.
            </p>
        </div>
    </div>
  )
}

export default FormInput
import { data } from 'autoprefixer';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

function FormInput({dataAwal,dataa}) {
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

console.log(dataa);
    const history = useHistory();
    const [namaFoto,setNamaFoto] = useState('')
    const [totalOrang,setTotalOrang] = useState(0)
    const [harga,setHarga] = useState()
    const [orang,setOrang] = useState(null)

    const handleInput = (e) => {
        e.persist();
        setDataPengunjung({...dataPengunjung, [e.target.name]: e.target.value })
    }

    const handleJummlah = (e) =>{
        
    const min = dataa.min;
    const max = dataa.max;
        const value = Math.max(min, Math.min(max, Number(e.target.value)));
        setOrang(value)   
        setDataPengunjung({...dataPengunjung, [e.target.name]: value })
        console.log(orang);
        e.persist();
        
    } 

    const validasiDataPengunjung = (e) => {
        e.preventDefault();
        const dataInput = {
            nama:dataPengunjung.nama,
            kota:dataPengunjung.kota,
            phone:dataPengunjung.phone,
            jumlah:dataPengunjung.jumlah,
            foto:dataPengunjung.foto,
            museum:dataa.nama_museum,
            kategori:dataa.nama_kategori,
            tanggal:dataAwal.calendar,
        }

        axios.post(`http://localhost:8000/api/validasi-pengunjung`, dataInput,{
            headers:{
                "Content-Type":"multipart/form-data",
            }
        }).then(res => {

            console.log(res.data.foto);
            if(res.data.status === 200)
            {
                console.log('MANTAB BERHASIL');
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

    const handleFoto = (e) =>{
        let fotoKartu = new FormData();
        fotoKartu.append("fotoKartu", kartu)
        setKartu(e.target.files[0])
        setDataPengunjung({...dataPengunjung, foto: fotoKartu })

    }

    console.log(dataPengunjung,totalOrang);

    useEffect(() => {
    setHarga(dataa && dataa.hari_libur)

    if(dataa)
    {
        if(isWeekend == false )
        {
            setHarga(dataa.hari_biasa)
        }
        else
        { 
            setHarga(dataa.hari_libur)
        }

    }

    

    console.log(harga);
    setTotalOrang(orang * harga);
    // if (dataPengunjung.foto) {
    //     setImageUrl(URL.createObjectURL(dataPengunjung.foto));
    //   }
    }, [orang,dataPengunjung,kartu,dataa,harga])


    return (
    <div className='pt-36 py- mx-auto'>
        <div className="w-full px-6 md:px-16 py-12 mx-auto">
            <form onSubmit={validasiDataPengunjung} className="bg-white shadow-md rounded-lg px-8 lg:pt-56 md:pt-64 pt-[20rem] pb-8 mb-4">
        <div className='justify-center text-center py-10'>
            <h1 className='sm:text-4xl text-3xl font-bold'>Form Input Pengunjung <span>{dataa && dataa.nama_kategori}</span>  </h1>
        </div>
                <div className='md:flex justify-around'>    
                    <div className="w-96 mb-4 mx-auto md:mx-0">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Nama
                        </label>
                        <input name='nama' onChange={handleInput} value={dataPengunjung.nama} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="contoh : Kirana" />
                        <span className="text-sm text-red-500">{dataPengunjung.error_list.nama}</span>
                    </div>
                    <div className="w-96 mb-4 mx-auto md:mx-6 md:mt-0 mt-8">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="kota">
                            Kota Asal
                        </label>
                        <input name='kota' onChange={handleInput} value={dataPengunjung.kota} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Contoh :  Surakarta" />
                        <span className="text-sm text-red-500">{dataPengunjung.error_list.kota}</span>
                    </div>

                </div>
                <div className='md:flex justify-around md:mt-0 mt-8'>    
                    <div className="w-96 mb-4 mx-auto md:mx-0">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="hp">
                            No Hp
                        </label>
                        <input name='phone' onChange={handleInput} value={dataPengunjung.phone} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Contoh : 081234567890" />
                        <span className="text-sm text-red-500">{dataPengunjung.error_list.phone}</span>
                    </div>
                    <div className="w-96 mb-4 md:mx-6 mx-auto md:mt-0 mt-8">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="jumlah">
                            Jumlah Orang
                        </label>
                        <input name='jumlah' onChange={(e)=>{ handleJummlah(e);  }} value={orang} maxLength={orang} className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="number" placeholder={dataa && "contoh : " + dataa.min + " orang"} />
                        <span className="text-sm text-red-500">{dataPengunjung.error_list.jumlah}</span>
                    </div>
                </div>


                    {/* INPUTAN FILE */}
                {dataa && dataa.min >= 50 ?
                     <div id='attach' className='flex justify-around'>
                    <div id='umum' className="max-w-96 mb-4 mx-12 ">
                    <div className="flex justify-center">
                        <div className="mb-3 w-96">
                            <label for="formFile" className="form-label inline-block mb-2 text-gray-700">Attachment </label>
                            <input name='foto' onChange={handleFoto
                                // (e)=> {
                                // // setDataPengunjung({...dataPengunjung, [e.target.name]: e.target.files[0] });
                                // setKartu(e.target.files[0])
                                // setDataPengunjung({...dataPengunjung, foto: fotoKartu })}

                                } className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" id="formFile" />
                        <span className="text-sm text-red-500">{dataPengunjung.error_list.foto}</span>
                        </div>
                    </div>
   
                    </div>
                </div>
                :""}




                <div className='mt-24 w-11/12 mx-auto'>
                    <p>Syarat dan Ketentuan Pengunjung</p>
                    <p>1. Dilarang membawa makan dan minuman selama didalam Museum Keris</p>
                    <p>2. Dilarang memegang  Properti didalam Museum Keris</p>
                    <p>3. Dilarang membuang sampah sembarangan</p>
                </div>
                
                <div className="flex items-start my-4   w-11/12 mx-auto">
                    <input name="checkbox"
          type="checkbox"
          checked={checked}
          onChange={() => {
                if(checked){
                    // setText('Silahkan baca ketentuan terlebih dahulu')
                }
                // console.log('masuk');
            setChecked(!checked)
              }
           } id="checkbox-2" aria-describedby="checkbox-2"  className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded" />
                    <label for="checkbox-2" className="text-sm ml-3 font-medium text-black-700 hover:text-blue-300 underline">Saya setuju dengan Syarat dan Ketentuan</label>
                </div>
                
                <div className="flex flex-wrap justify-end">
                    <div className='md:w-1/3  text-center'>
                        <div  id='harga'  className='py-3'>
                            <p className='text-2xl font-bold '>Rp {totalOrang.toLocaleString()}</p>
                        </div>
                        <button disabled={!checked} className=" bg-[#A70B0B] text-white font-bold py-4  w-52 rounded-full focus:outline-none focus:shadow-outline hover:bg-red-900 focus:bg-red-700" type="submit">Lanjut Pembayaran
                           {/* <Link to={{ pathname:"/Pembayaran",
                                        state : {dataPengunjung,harga}
                                     }}>Lanjut Pmebayaran</Link>  */}
                        </button>
                        <p className='text-sm text-red-400'>{text}</p>
                    </div>
                </div>

            </form>
        </div>
    </div>
  )
}

export default FormInput
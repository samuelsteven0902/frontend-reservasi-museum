import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import ReactLoading from 'react-loading';

export default function Container({  }) {


const [panduan,setPanduan] = useState();
const [loading,setLoading] = useState(true);

const fetchPanduan = () => {
    axios.get("http://localhost:8000/api/show_files").then(res=>{
        setPanduan(res.data.data);
        setLoading(false)
    })
}

useEffect(() => {
    fetchPanduan();

}, [])



    return (
        <div className='container mx-auto py-24 '>
            <div className='flex justify-center flex-wrap flex-col my-12 '>
                    <p className='text-5xl font-merriweather  font-bold p-4 pb- w-full text-center'>Panduan Reservasi Museum</p>
                    <hr className='h-1 bg-red-300 w-1/3 flex mx-auto' />
                    <p className='font-nunito tracking-wider w-3/5 mx-auto py-6 text-center'>Tata cara untuk memesa tiket online di UPT Museum  .</p>
        </div>
                <div className="w-5/6 mx-auto bg-gray-100 mt-12 flex justify-center flex-wrap">
                    {loading?<ReactLoading type={"spin"} color={"red"} height={'5%'} width={'5%'} className="m-auto" />:panduan.map((image) => (
                        <div className="w-2/5 flex items-start m-5" key={image.id}>
                            <img src={ "http://localhost:8000/uploads/" + image.panduan_name } className="img-fluid img-bordered" width="500px"/>
                            {/* <button className="bg-red-500 w-7 h-7 rounded-full text-white hover:bg-red-300" onClick={e=>this.deleteFile(image.id,e)}>X</button> */}
                        </div>
                        ))}
                    
                    <div className="h-32 shadow-lg">
                    </div>
            </div>
        </div>
        
    );
}
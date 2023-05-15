import { CKEditor } from '@ckeditor/ckeditor5-react'
import axios from 'axios'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import CKEditorComponent from './CKEditorComponent'
import en from '../../../../assets/img/lng/en.png'
import id from '../../../../assets/img/lng/id.png'
import Cookies from 'js-cookie';

function TextPanduan() {

const [textPanduan, setTextPanduan] = useState()
const [loading,setLoading] = useState(true)
const [dataAbout,setDataAbout] = useState()
const [isiAbout,setIsiAbout] = useState({
  panduan_name:'',
  panduan_name_en:'',

})



const fetchPanduan = () =>{
  axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/show_panduan/${1}`).then(res=>{setDataAbout(res.data.data);console.log(res);setLoading(false)})
}

const updatePanduan = (e) =>{
  e.preventDefault();
  const data = {
    panduan_name:dataAbout.panduan_name,
    panduan_name_en:dataAbout.panduan_name_en,
  }
  console.log(data);

axios.put(`${process.env.REACT_APP_API_ENDPOINT}/api/update_panduan_text`, data, {
  headers : {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    Authorization: `Bearer ${Cookies.get('token')}`,
  }}).then(res=>{
  if(res.data.status === 200)
  {
      console.log('berhasil');
      swal("Success",res.data.message,"success")
      fetchPanduan();
      // CloseRef.current.click();

      }
      else if(res.data.status === 422)
      {
      }
      else if(res.data.status === 404)
      {
      }
  });
}

useEffect(() => {
  
    fetchPanduan()

}, [])

if(loading)
{
  return "loading..."
} 

console.log(dataAbout);


  return (
    <div className='shadow bg-white rounded-xl  mb-5 p-5'>
      <div className='flex justify-center flex-wrap flex-col p-5 '>
          <p className='text-3xl sm:text-4xl font-merriweather font-bold pb- w-full  text-red-400'>Panduan Teks</p>
          <hr className='h-1 bg-red-300 flex'/>
        </div>
       <div className='flex justify-around'>
        <div className='w-1/2 pr-2'>
          <div className='flex items-center justify-center'>
          <img src={id} alt='' className='w-10 h-10' />
          <p>Panduan Indonesia</p>
          </div>
            <CKEditor
                    
                    editor={ ClassicEditor }
                    
                    data={dataAbout && dataAbout.panduan_name}

                    onChange={ ( e, editor ) => {
                      setDataAbout({...dataAbout, panduan_name: editor.getData() });
                      // setIsiAbout({nama_panduan: editor.getData()})
                    } }

                    config={{         
                      toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'link','|', 'undo', 'redo']
                    }}  

                />
        </div>
        <div className='w-1/2'>
            <div className='flex items-center justify-center'>
            <img src={en} alt='' className='w-10 h-10' />
            <p>Panduan Inggris</p>
          </div>
            <CKEditor
                    
                    editor={ ClassicEditor }
                    data={dataAbout && dataAbout.panduan_name_en}

                    onChange={ ( e, editor ) => {
                      setDataAbout({...dataAbout, panduan_name_en: editor.getData() });
                      // setIsiAbout({nama_panduan_en: editor.getData()})
                    } }

                    config={{         
                      toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'link','|', 'undo', 'redo']
                    }}  

                />
        </div>
       </div>
               <div className='flex justify-center'>
               <button className='bg-green-600 rounded-xl px-4 py-2 text-xl text-white hover:bg-green-500 focus:bg-green-400 active:bg-green-400 focus:outline-none mt-5 transition-all' onClick={updatePanduan}>Simpan Perubahan</button>
               </div>
    </div>
  )
}

export default TextPanduan
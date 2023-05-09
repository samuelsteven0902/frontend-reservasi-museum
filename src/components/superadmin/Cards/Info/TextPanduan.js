import { CKEditor } from '@ckeditor/ckeditor5-react'
import axios from 'axios'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import CKEditorComponent from './CKEditorComponent'

function TextPanduan() {

const [textPanduan, setTextPanduan] = useState()
const [loading,setLoading] = useState(true)
const [dataAbout,setDataAbout] = useState()
const [isiAbout,setIsiAbout] = useState('')



const fetchPanduan = () =>{
  axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/show_panduan/${1}`).then(res=>{setDataAbout(res.data.data.panduan_name);console.log(res);setLoading(false)})
}

const updatePanduan = (e) =>{
  e.preventDefault();
  // console.log(e.target[3]);
  // const thisClicked = e.target[3];
  // thisClicked.innerText = "Updating";
  const data = {
      about: isiAbout,
  }
  console.log(data);

axios.put(`${process.env.REACT_APP_API_ENDPOINT}/api/update_about/${1}`, data).then(res=>{
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

}
else
{

}
const handleChange = (e,editor) => {
  setIsiAbout(editor.getData())
}

console.log(dataAbout);


  return (
    <div className='shadow bg-white rounded-xl p-10 mb-5'>
       <CKEditor
                   
                   editor={ ClassicEditor }

                   data={dataAbout && dataAbout}

                   onChange={ ( e, editor ) => {
                       handleChange(e,editor)
                   } }
               />
               <button className='py-2 px-4 bg-green-600 my-5' onClick={updatePanduan}>Simpan Perubahan</button>
    </div>
  )
}

export default TextPanduan
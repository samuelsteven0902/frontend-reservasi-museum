import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React from 'react'

function CKEditorComponent() {

    const API_URL = "https://noteyard-backend.herokuapp.com"
    const UPLOAD_ENDPOINT = "api/blogs/uploadImg"

    const MyUploadAdapter =(loader)=>{
        return{
            upload:()=>{
                return new Promise((resolve, reject)=>{
                    const body = new FormData();
                    loader.file.then((file)=> {
                        body.append("uploadImg", file);
                        fetch(`${API_URL}/${UPLOAD_ENDPOINT}`,{
                            method: "post",
                            body:body
                        }).then((res=>res.json())
                           .then((res)=>{
                            resolve({ default: `${API_URL}/${res.url}` })
                           })
                           .catch((err)=>{
                                reject(err)
                           })     
                           )
                    })
                })
            }
        }
    }

    const uploadPlugin = (editor)=>
    {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return MyUploadAdapter(loader)
        }
    }

  return (
    <div>
        <CKEditor
                    // config={{
                    //     extraPlugins:[uploadPlugin]
                    // }}
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
    </div>
  )
}

export default CKEditorComponent
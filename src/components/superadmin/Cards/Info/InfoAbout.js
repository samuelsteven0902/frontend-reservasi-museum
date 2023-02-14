import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiPencil, BiTrash } from 'react-icons/bi';
import swal from 'sweetalert'
import 'tw-elements';
import ReactLoading from 'react-loading';
import { useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'react-html-parser';
// import Editor from 'ckeditor5-custom-build/build/ckeditor'


function InfoAbout() {

const [dataAbout,setDataAbout] = useState()
const [About,setAbout] = useState()
const [idAbout,setIdAbout] = useState()
const [isiAbout,setIsiAbout] = useState('')
const [tambahAbout,setTambahAbout] = useState()

const [loading,setLoading] = useState(true)
const [loadingAbout,setLoadingAbout] = useState(true)

const CloseRef = useRef();


    const fetchAbout = () =>{
        axios.get('http://localhost:8000/api/show_about').then(res=>{setDataAbout(res.data.dataAbout[0]);console.log(res);setLoading(false)})
    }

useEffect(() => {
    fetchAbout();
    idAbout !== undefined &&  axios.get(`http://localhost:8000/api/edit_about/${idAbout}`).then(res=>{
        setAbout(res.data.about);console.log(res);setLoadingAbout(false);
    })
}, [idAbout])

const handleIdAbout = (e) =>{
    setIdAbout(...e.target.id)
    console.log(idAbout);
}

const handleInput = (e) => {
    e.persist();
    setAbout({...About, [e.target.name]: e.target.value });

}

const handleInputTambahAbout = (e) =>{
    e.persist();
    setTambahAbout({...tambahAbout, [e.target.name]: e.target.value });
}

if(loading){
    var about_HTMLTABLE =   
        <tr className="bg-white border-b" >
            <td colspan={6} className="text-xl text-center justify-center font-semibold py-5">
                <ReactLoading type={"spin"} color={"red"} height={'5%'} width={'5%'} className="m-auto" />
            </td>
        </tr>
}
else
{
    var about_HTMLTABLE = ''
    about_HTMLTABLE = 
            <tr className='' >
                <th scope="col" class="text-base font-medium text-[#A70B0B] px-6 py-4 text-left">
                    {ReactHtmlParser(dataAbout.about)}<br></br>
                    </th>   
                    <td class=" text-gray-900 px-6 py-4 text-center w-7 whitespace-nowrap ">
                        {/* <button type="button" className="text-white ml-4 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-4 py-1.5 flex text-center mr-2 w-3/4 mb-2 align-middle items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" data-bs-toggle="modal" id={item.id} data-bs-target="#exampleModalCenteredScrollable" onClick={handleIdAbout}><BiPencil className="mr-1" /> Edit</button> */}
                        
                    </td>
            </tr>
}

const updateAbout = (e) =>{
    e.preventDefault();
    // console.log(e.target[3]);
    // const thisClicked = e.target[3];
    // thisClicked.innerText = "Updating";
    const data = {
        about: isiAbout,
    }

axios.put(`http://localhost:8000/api/update_about/${1}`, data).then(res=>{
    if(res.data.status === 200)
    {
        console.log('berhasil');
        swal("Success",res.data.message,"success")
        fetchAbout();
        CloseRef.current.click();

        }
        else if(res.data.status === 422)
        {
        }
        else if(res.data.status === 404)
        {
        }
    });
}

const addAbout = (e) =>{
    e.preventDefault();

    // const thisClicked = e.target[3];
    // thisClicked.innerText = "Menambahkan...";
    const data = {
        about:tambahAbout,
    }
    // console.log(data);
    axios.post(`http://localhost:8000/api/add_about`, data).then(res => {
        if(res.data.status === 200)
        {
            swal("Success!",res.data.message,"success")
            fetchAbout();
            CloseRef.current.click();
        }
        else if(res.data.status === 422)
        {
        }
    });
}

const deleteAbout = (e, id) => {
    e.preventDefault();
    swal({
        title: "Anda Yakin menghapus About?",
        text: "Sekali Hapus, anda tidak bisa mencadangkannya lagi!",
        icon: "Warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            axios.delete(`http://localhost:8000/api/delete_about/${id}`).then(res=>{
                if(res.data.status === 200)
                {
                    swal("Deleted!",res.data.message,"success")
                    fetchAbout();
                    CloseRef.current.click();
                }
                else if(res.data.status === 404)
                {
                }})
        } 
        else {
        swal("Data anda aman!");
        }
    }
)}

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

    const handleChange = (e,editor) => {
        setIsiAbout(editor.getData())
    }

    console.log(dataAbout);


return (
    <div className='container  relative flex flex-col min-w-0 break-words w-full'>
    <div className='justify-between'>
        <div class="flex space-x-2 justify-between">
            <h3 class="font-merriweather font-bold text-2xl text-gray-600">About</h3>
            
        </div>
    </div>
    <CKEditor
                   
                    editor={ ClassicEditor }
                    data={dataAbout && dataAbout.about}
                    // config={{
                    //     extraPlugins : [uploadPlugin]
                    // }}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( e, editor ) => {
                        handleChange(e,editor)
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
                <button className='py-2 px-4 bg-green-600 my-5' onClick={updateAbout}>Simpan Perubahan</button>
    <div class="flex flex-col" >
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden shadow-lg rounded-xl m-2">
                    <div class="">
                    <table class="min-w-full ">
                    <tbody class="border-b bg-white ">
                    {about_HTMLTABLE}
                        <div className="modal fade fixed bg-gray-300    py-24   mx-auto items-center m-auto w-screen bg-opacity-60 top-0 left-0 hidden h-screen outline-none overflow-x-hidden overflow-y-auto" id="exampleModalCenteredScrollable" tabIndex="-1" aria-labelledby="exampleModalCenteredScrollable" aria-modal="true" role="dialog">
                            <div className="modal-dialog w-full md:w-1/2  mx-auto  h-full  my-auto modal-dialog-centered modal-dialog-scrollable relative items-center pointer-events-none lg:w-1/3" >
                                <div className="modal-content border-none -ml-24 shadow-lg relative flex flex-col w-full pointer-events-auto my-auto bg-white min-w-max bg-clip-padding rounded-md outline-none text-current">
                                    <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                                        <h5 className="text-xl font-nunito font-semibold leading-normal text-gray-800" id="exampleModalCenteredScrollableLabel">Mengubah About</h5>
                                        <button type="button" className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    {loadingAbout?
                                    <form onSubmit={updateAbout} >
                                        <div className="modal-body relative p-4">
                                            <div className='justify-around md:mt-0 mt-8'>    
                                                
                                                <div className="w-96 mb-4  mx-auto md:mt-0 mt-8">
                                                    <label className="block text-gray-700 text-sm font-nunito font-semibold mb-2" for="username">About</label>
                                                    <textarea name='about' onChange={handleInput} className="shadow appearance-none bg-gray-100 border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value="Loading Data ..." />
                                                    <span className="text-sm text-red-500"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                            <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal"  ref={CloseRef} >Tutup</button>
                                            <button type="submit" className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1" id="idSave">Simpan Perubahan</button>
                                        </div>
                                    </form>:
                                    <form onSubmit={updateAbout} >
                                        <div className="modal-body relative p-4">
                                            <div className='justify-around md:mt-0 mt-8'>    
                                                
                                                <div className="w-96 mb-4  mx-auto md:mt-0 mt-8">
                                                    <label className="block text-gray-700 text-sm font-nunito font-semibold mb-2" for="username">About</label>
                                                    <textarea name='about' onChange={handleInput} className="shadow appearance-none bg-gray-100 border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={About.about} />
                                                    <span className="text-sm text-red-500"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                            <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal" ref={CloseRef} >Tutup</button>
                                            <button type="submit" className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1" id="idSave">Simpan Perubahan</button>
                                        </div>
                                    </form> }
                                </div>
                            </div>
                        </div>
                    </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="flex space-x-2 justify-left">
    <div>
        <div className="modal fade fixed bg-gray-300    py-24   mx-auto items-center m-auto w-screen bg-opacity-60 top-0 left-0 hidden h-screen outline-none overflow-x-hidden overflow-y-auto" id="tambahAbout" tabIndex="-1" aria-labelledby="tambahAbout" aria-modal="true" role="dialog">
        <div className="modal-dialog w-full md:w-1/2  mx-auto  h-full  my-auto modal-dialog-centered modal-dialog-scrollable relative items-center pointer-events-none lg:w-1/3" >
        <div className="modal-content border-none -ml-24 shadow-lg relative flex flex-col w-full pointer-events-auto my-auto bg-white min-w-max bg-clip-padding rounded-md outline-none text-current">
        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5 className="text-xl font-medium leading-normal text-gray-800" id="TambahAboutlabel">
            Tambah About
            </h5>
            <button type="button" className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
            <form onSubmit={addAbout} >
                <div className="modal-body relative p-4">
                    <div className='justify-around md:mt-0 mt-8'>
                        
                            <div className="w-96 mb-4  mx-auto md:mt-0 mt-8">
                            <label className="block text-gray-700 text-sm font-nunito font-semibold mb-2" for="username">About</label>
                            <textarea name='about'className="shadow appearance-none bg-gray-200 border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" onChange={e=>setTambahAbout(e.target.value)} />
                            <span className="text-sm text-red-500" ></span>
                        </div>        
                    </div>
                </div>
                <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                    <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="moda" ref={CloseRef} > Tutup</button>
                    <button type="submit" className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1">Tambah About</button>
                </div>
            </form>
        </div>
        </div>
        </div>
    </div>
    </div>
    </div>
)
}

export default InfoAbout
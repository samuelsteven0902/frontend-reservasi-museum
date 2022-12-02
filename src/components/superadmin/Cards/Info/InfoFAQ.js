import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiPencil, BiTrash } from 'react-icons/bi';
import swal from 'sweetalert'
import 'tw-elements';
import ReactLoading from 'react-loading';
import { useRef } from 'react';

function InfoFAQ() {

const [dataFAQ,setDataFAQ] = useState()
const [faq,setFAQ] = useState()
const [idFAQ,setIdFAQ] = useState()
const [tambahFAQ,setTambahFAQ] = useState({
    question : '',
    answer : '',
})

const [loading,setLoading] = useState(true)
const [loadingFAQ,setLoadingFAQ] = useState(true)

const CloseRef = useRef();


    const fetchFaq = () =>{
        axios.get('http://localhost:8000/api/show_faq').then(res=>{setDataFAQ(res.data.dataFAQ);console.log(res);setLoading(false)})
    }

useEffect(() => {
    fetchFaq();
    idFAQ !== undefined &&  axios.get(`http://localhost:8000/api/edit_faq/${idFAQ}`).then(res=>{
        setFAQ(res.data.faq);console.log(res);setLoadingFAQ(false);
    })
}, [idFAQ])

const handleIdFAQ = (e) =>{
    setIdFAQ(...e.target.id)
    console.log(idFAQ);
}

const handleInput = (e) => {
    e.persist();
    setFAQ({...faq, [e.target.name]: e.target.value });
}

const handleInputTambahFAQ = (e) =>{
    e.persist();
    setTambahFAQ({...tambahFAQ, [e.target.name]: e.target.value });
}

if(loading){
    var faq_HTMLTABLE =   <tr className="bg-white border-b" >
                                <td colspan={6} className="text-xl text-center justify-center font-semibold py-5">
                                <ReactLoading type={"spin"} color={"red"} height={'5%'} width={'5%'} className="m-auto" />
                                </td>
                            </tr>
}

else
{
    var faq_HTMLTABLE = ''
    faq_HTMLTABLE = dataFAQ.map((item,index)=>{
        return(
            <tr className='' key={index}>
                <th scope="col" class="text-base font-medium text-[#A70B0B] px-6 py-4 text-left ">{index + 1}</th>
                <th scope="col" class="text-base font-medium text-[#A70B0B] px-6 py-4 text-left">
                    Q : {item.question}<br></br>
                    A : {item.answer}</th>   
                    <td class=" text-gray-900 px-6 py-4 text-center w-7 whitespace-nowrap ">
                        <button type="button" className="text-white ml-4 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-4 py-1.5 flex text-center mr-2 w-3/4 mb-2 align-middle items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" data-bs-toggle="modal" id={item.id} data-bs-target="#exampleModalCenteredScrollable" onClick={handleIdFAQ}><BiPencil className="mr-1" /> Edit</button>
                        <button type="button" className="text-white ml-4 bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded text-sm px-3 py-1.5 flex text-center mr-2 mb-2 w-3/4 items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={e=>deleteFAQ(e,item.id)}><BiTrash classname="mr-1" />Hapus</button>
                    </td>
            </tr>
        )
    })
}

const updateFAQ = (e) =>{
    e.preventDefault();
    console.log(e.target[3]);

    const thisClicked = e.target[3];
    thisClicked.innerText = "Updating";
    const data = {
        question: faq.question,
        answer: faq.answer,
    }

axios.put(`http://localhost:8000/api/update_faq/${idFAQ}`, data).then(res=>{
    if(res.data.status === 200)
    {
        console.log('berhasil');
        swal("Success",res.data.message,"success")
        fetchFaq();
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

const addFAQ = (e) =>{
    e.preventDefault();

    const thisClicked = e.target[3];
    thisClicked.innerText = "Menambahkan...";
    const data = {
        question:tambahFAQ.question,
        answer:tambahFAQ.answer,
    }
    // console.log(data);
    axios.post(`http://localhost:8000/api/add_faq`, data).then(res => {
        if(res.data.status === 200)
        {
            swal("Success!",res.data.message,"success")
            fetchFaq();
            CloseRef.current.click();
        }
        else if(res.data.status === 422)
        {
        }
    });
}

const deleteFAQ = (e, id) => {
    e.preventDefault();
    swal({
        title: "Anda Yakin menghapus FAQ?",
        text: "Sekali Hapus, anda tidak bisa mencadangkannya lagi!",
        icon: "Warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            axios.delete(`http://localhost:8000/api/delete_faq/${id}`).then(res=>{
                if(res.data.status === 200)
                {
                    swal("Deleted!",res.data.message,"success")
                    fetchFaq();
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

return (
    <div className='container  relative flex flex-col min-w-0 break-words w-full'>
    <div className='justify-between'>
        <div class="flex space-x-2 justify-between">
            <h3 class="font-bold text-2xl  text-gray-600">Frequently Asked Questions</h3>
            <button type="button" class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal" data-bs-target="#tambahFAQ">Tambahkan FAQ
            </button>
        </div>
    </div>
    <div class="flex flex-col" >
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden shadow-lg rounded-xl m-2">
                    <div class="">
                    <table class="min-w-full ">
                    <tbody class="border-b bg-white ">
                    {faq_HTMLTABLE}
                        <div className="modal fade fixed bg-gray-300 z-50  py-24   mx-auto items-center m-auto w-screen bg-opacity-60 top-0 left-0 hidden h-screen outline-none overflow-x-hidden overflow-y-auto" id="exampleModalCenteredScrollable" tabIndex="-1" aria-labelledby="exampleModalCenteredScrollable" aria-modal="true" role="dialog">
                            <div className="modal-dialog w-full md:w-1/2  mx-auto  h-full  my-auto modal-dialog-centered modal-dialog-scrollable relative items-center pointer-events-none lg:w-1/3" >
                                <div className="modal-content border-none -ml-24 shadow-lg relative flex flex-col w-full pointer-events-auto my-auto bg-white min-w-max bg-clip-padding rounded-md outline-none text-current">
                                    <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                                        <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalCenteredScrollableLabel">Mengubah FAQ</h5>
                                        <button type="button" className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    {loadingFAQ?
                                    <form onSubmit={updateFAQ} >
                                        <div className="modal-body relative p-4">
                                            <div className='justify-around md:mt-0 mt-8'>    
                                                <div className="w-96 mb-4 mx-auto ">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" for="username">Questions</label>
                                                    <textarea name='question' onChange={handleInput}   className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100 "  type="text" value="Loading Data..."   />
                                                    <span className="text-sm text-red-500"></span>
                                                </div>
                                                <div className="w-96 mb-4  mx-auto md:mt-0 mt-8">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" for="username">Answer</label>
                                                    <textarea name='answer' onChange={handleInput}   className="shadow appearance-none bg-gray-100 border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value="Loading Data ..." />
                                                    <span className="text-sm text-red-500"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                            <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"data-bs-dismiss="modal" 
                                    ref={CloseRef} >Tutup</button>
                                            <button type="submit" className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1" id="idSave">Simpan Perubahan</button>
                                        </div>
                                    </form>:
                                    <form onSubmit={updateFAQ} >
                                        <div className="modal-body relative p-4">
                                            <div className='justify-around md:mt-0 mt-8'>    
                                                <div className="w-96 mb-4 mx-auto ">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" for="username">Questions</label>
                                                    <textarea name='question' onChange={handleInput}   className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100 "  type="text" value={faq.question}  />
                                                    <span className="text-sm text-red-500"></span>
                                                </div>
                                                <div className="w-96 mb-4  mx-auto md:mt-0 mt-8">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" for="username">Answer</label>
                                                    <textarea name='answer' onChange={handleInput} className="shadow appearance-none bg-gray-100 border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={faq.answer} />
                                                    <span className="text-sm text-red-500"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                            <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"data-bs-dismiss="modal"
                                    ref={CloseRef} >Tutup</button>
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
        <div className="modal fade fixed bg-gray-300 z-50  py-24   mx-auto items-center m-auto w-screen bg-opacity-60 top-0 left-0 hidden h-screen outline-none overflow-x-hidden overflow-y-auto" id="tambahFAQ" tabIndex="-1" aria-labelledby="tambahFAQ" aria-modal="true" role="dialog">
        <div className="modal-dialog w-full md:w-1/2  mx-auto  h-full  my-auto modal-dialog-centered modal-dialog-scrollable relative items-center pointer-events-none lg:w-1/3" >
        <div className="modal-content border-none -ml-24 shadow-lg relative flex flex-col w-full pointer-events-auto my-auto bg-white min-w-max bg-clip-padding rounded-md outline-none text-current">
        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5 className="text-xl font-medium leading-normal text-gray-800" id="TambahFAQlabel">
            Tambah FAQ
            </h5>
            <button type="button" className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
            <form onSubmit={addFAQ} >
                <div className="modal-body relative p-4">
                    <div className='justify-around md:mt-0 mt-8'>
                        <div className="w-96 mb-4 mx-auto ">
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="username">Question</label>
                            <textarea name='question'  className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200" type="text"  onChange={handleInputTambahFAQ}/>
                            <span className="text-sm text-red-500"></span>
                        </div>
                            <div className="w-96 mb-4  mx-auto md:mt-0 mt-8">
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="username">Answer</label>
                            <textarea name='answer'  className="shadow appearance-none bg-gray-200 border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" onChange={handleInputTambahFAQ} />
                            <span className="text-sm text-red-500" ></span>
                        </div>        
                    </div>
                </div>
                <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                    <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="moda"
                                    ref={CloseRef} > Tutup</button>
                    <button type="submit" className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1">Tambah FAQ</button>
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

export default InfoFAQ
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import swal from 'sweetalert'
import $ from 'jquery';
import ReactLoading from 'react-loading';
import { AiOutlineEyeInvisible,AiOutlineEye } from 'react-icons/ai';

function CardAdmin() {

    const [admin,setAdmin] = useState()
    const [loading,setLoading] = useState(true)
    const [input,setInput] = useState({
        nama: '',
        email: '',
        password: '',
        err_msg:[]
    })
    const [passwordType, setPasswordType] = useState("password");
    const togglePassword =(e)=>{
        e.preventDefault();
      if(passwordType==="password")
      {
       setPasswordType("text")
       return;
      }
      setPasswordType("password")
    }

    const CloseRef = useRef();

    const handleInput = (e) => {
        e.persist();
        setInput({...input, [e.target.name]: e.target.value })
    }
    console.log(input);

    const fetchData = () =>
    {
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/show_admin`).then(res=>{
        console.log(res.data.admin); 
        setAdmin(res.data.admin); 
        setLoading(false)
    })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const thisClicked = document.getElementById('tambahAdmin')
        thisClicked.innerText = "Menambahkan..."

        const data = {
            nama:input.nama,
            email:input.email,
            password:input.password,
        }
        
        axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/add_admin`, data).then(res=>{
            console.log(res);
            if(res.data.status === 200)
            {
                swal("Success!",res.data.message,"success");
                fetchData();
                CloseRef.current.click();
                
            }else if(res.data.status === 422)
            {
                setInput({...input, err_msg: res.data.validate_err.password })
            }
        }) 
    }

    const deleteFAQ = (e, id) => {
        e.preventDefault();
        
        // const thisClicked = e.currentTarget;
        // thisClicked.innerText = "Deleting";
    
        swal({
            title: "Anda Yakin menghapus Id Admin "+ id+ " ?",
            text: "Sekali Hapus, anda tidak bisa mencadangkannya lagi!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/api/delete_admin/${id}`).then(res=>{
                    if(res.data.status === 200)
                    {
                        // console.log('berhasil delet');
                        swal("Deleted!",res.data.message,"success")
                        fetchData();
                        // thisClicked.closest("tr").remove();
                    }
                    else if(res.data.status === 404)
                    {
                        // swal("Error",res.data.message,"error");
                        // thisClicked.innerText = "Delete";
                    }})
            } else {
            swal("Data anda aman!");
            }
        })}

    useEffect(() => {
        fetchData()
    }, [])
    
    if(loading)
    {
        var ADMIN_HTMLTABLE =   
            <tr className="bg-white border-b" >
                <td colspan={5} className="text-xl text-center justify-center font-semibold py-5">
                    <ReactLoading type={"spin"} color={"red"} height={'5%'} width={'5%'} className="m-auto" />
                </td>
            </tr>
    }
    else
    {
    
    var ADMIN_HTMLTABLE = '';
        ADMIN_HTMLTABLE = admin.map((item,index)=>{
            return (
            <>
                <tr class="border-b bg-white" key={index}>
                    <td class=" text-gray-900 px-6 py-4 whitespace-nowrap text-center">{item.id}</td>
                    <td class=" text-gray-900 px-6 py-4 whitespace-nowrap text-center">{item.name}</td>
                    <td class=" text-gray-900 px-6 py-4 whitespace-nowrap text-center">{item.roles[0].name}</td>
                    <td class=" text-gray-900 px-6 py-4 whitespace-nowrap text-center">{item.email}</td>
                    <td class=" text-gray-900 px-6 py-4 whitespace-nowrap text-center" >Sensor</td>
                    <td class=" text-gray-900 px-6 py-4 whitespace-nowrap ">
                        <button type="button" className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1" onClick={e=>deleteFAQ(e,item.id)}>Hapus</button>
                    </td>
                </tr>
            </>
            )
        })
    }

return (
    <div className='container px-12 relative flex flex-col min-w-0 break-words w-full mb-6  rounded '>
        <button type="button" class="w-36 inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal" data-bs-target="#tambahFAQ">Tambah Admin</button>
            <div class="flex flex-col " >
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden shadow-lg rounded-xl m-2">
                            <table class="min-w-full ">
                                <thead class="border-b bg-white ">
                                    <tr className=''>
                                        <th scope="col" class="text-xl font-nunito font-semibold text-[#A70B0B] px-6 py-4 text-center ">Admin ID</th>
                                        <th scope="col" class="text-xl font-nunito font-semibold text-[#A70B0B] px-6 py-4 text-center">Nama User</th>
                                        <th scope="col" class="text-xl font-nunito font-semibold text-[#A70B0B] px-6 py-4 text-center">Role User</th>
                                        <th scope="col" class="text-xl font-nunito font-semibold text-[#A70B0B] px-6 py-4 text-center">Email</th>
                                        <th scope="col" class="text-xl font-nunito font-semibold text-[#A70B0B] px-6 py-4 text-center">Password</th>
                                        <th scope="col" class="text-xl font-nunito font-semibold text-[#A70B0B] px-6 py-4 text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    {ADMIN_HTMLTABLE}
                                </tbody>
                            </table>
                        </div>
                    </div>
            <div>
                <div className="modal fade fixed bg-gray-300    py-12   mx-auto items-center m-auto w-screen bg-opacity-60 top-0 left-0 hidden h-screen outline-none overflow-x-hidden overflow-y-auto" id="tambahFAQ" tabIndex="-1" aria-labelledby="tambahFAQ" aria-modal="true" role="dialog">
                <div className="modal-dialog w-11/12 justify-center md:w-1/2  px-0 sm:px-12 mx-auto  h-full  my-auto modal-dialog-centered modal-dialog-scrollable relative items-center pointer-events-none lg:w-1/3" >
                        <div className="modal-content border-none shadow-lg relative flex flex-col sm:w-full sm:min-w-max pointer-events-auto my-auto bg-white  bg-clip-padding rounded-md outline-none text-current">
                            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                                <h5 className="text-xl font-nunito font-semibold leading-normal text-gray-800" id="TambahFAQlabel"> Tambah Admin Baru</h5>
                                <button type="button" className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form  onSubmit={handleSubmit} className='overflow-auto'>
                            <div className="modal-body relative py-4">
                                <div className='justify-around md:mt-0 mt-8'>    
                                    <div className="w-96 mb-4 mx-auto ">
                                        <label className="block text-gray-700 text-sm font-nunito font-semibold mb-2" for="username">Nama</label>
                                        <input name='nama'  className="shadow appearance-none border rounded-full w-72 sm:w-full mx-auto text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200" type="text" 
                                        onChange={handleInput}/>
                                        <span className="text-sm text-red-500"></span>
                                    </div>
                                    <div className="w-96 mb-4 mx-auto ">
                                        <label className="block text-gray-700 text-sm font-nunito font-semibold mb-2" for="username">Email</label>
                                        <input name='email'  className="shadow appearance-none border rounded-full w-72 sm:w-full mx-auto text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200" type="text" 
                                        onChange={handleInput}/>
                                        <span className="text-sm text-red-500"></span>
                                    </div>
                                    <div className="w-96 mb-4 mx-auto ">
                                        <label className="block text-gray-700 text-sm font-nunito font-semibold mb-2" for="username">Password</label>
                                        <div className='relative'>
                                        <input name='password'  className="shadow appearance-none border rounded-full z-10 w-72 sm:w-full mx-auto text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200" type={passwordType}
                                        onChange={handleInput}/>
                                        <button className=" py-2.5 absolute -ml-14 -mt-1 z-40 focus:border-none active:border-none focus:outline-none focus:ring-0"  onClick={togglePassword}>
                                            { passwordType==="password"? <AiOutlineEyeInvisible size={24} /> :<AiOutlineEye size={24} /> }
                                            </button>
                                        </div>
                                        <span className="text-xs text-red-500"><ul>{input.err_msg.map((item,index)=>{
                                            return (<li>{index+1 }. {item} </li>)
                                        }
                                        )}</ul></span>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                data-bs-dismiss="modal" ref={CloseRef}>Tutup</button>
                                <button id='tambahAdmin' type="submit" className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1">Tambah Admin</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
                </div>
            </div>
    </div>
)
}

export default CardAdmin
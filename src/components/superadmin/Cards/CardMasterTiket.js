// import axios from "axios";
// import React, { Component, Fragment } from "react";
// import 'flowbite'
// import swal from "sweetalert";
// import { Link, useHistory} from "react-router-dom";
// import ReactLoading from 'react-loading';
// import ReactDatatable from '@ashvin27/react-datatable'
// import { BiTrash, BiPencil } from 'react-icons/bi';
// // import React from 'react'
// // import TextField from '@material-ui/core/TextField';
// // import Autocomplete,
// // { createFilterOptions } from '@material-ui/lab/Autocomplete';
// // const filter = createFilterOptions();
// // import $ from 'jquery';

// class CardMasterTiket extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             loading: true,
//             users: []
//         };

// const [loading,setLoading] = useState(true)
// const [loadingHarga,setLoadingHarga] = useState(true)

// const [semuaHarga,setSemuaHarga] = useState()
// const [idHarga,setIdHarga] = useState()
// const [hargaUpdate,sethargaUpdate] = useState([])

// const [harga,setHarga] = useState()

// // select and add new museum

// const [museum, setMuseum] = useState("");
// const [kategori, setKategori] = useState("");
// const [tambahMuseum, setTambahMuseum] = useState("");
// const [museumId, setMuseumId] = useState("");

// const [input,setInput] = useState({
//     museum : museumId,
    
// })
// const CloseRef = useRef();

// const [namaInput, setNamaInput] = useState({
//     namaMuseum : 'Pilih Museum',
//     namaKategori : 'Pilih Kategori'
// })


// const fetchMuseum = async ()=>{
//     const resMuseum = await axios.get('${process.env.REACT_APP_API_ENDPOINT}/api/show_museum').then((res)=>{
//         setMuseum(res.data.museum);
//         // console.log(res.data.museum);
//     }) 
//     const resKategori = await axios.get('${process.env.REACT_APP_API_ENDPOINT}/api/show_kategori').then((res)=>{
//         setKategori(res.data.kategori);
//         console.log(res.data.kategori);
//     }) 
// }
// useEffect(() => {
//     fetchMuseum();
// }, [])

// // set tambah museum
// const [tambahData,setTambahData] = useState({
//     nama_museum : '',
//     nama_kategori : '',
//     hari_biasa : '',
//     hari_libur : '',
// })

// const [searchTerm, setSearchTerm] = useState("")

// const options = ['One', 'Two', 'Three', 'Four']

// const redirect = useHistory();

// const fetchData = () =>{
//     axios.get('${process.env.REACT_APP_API_ENDPOINT}/api/show_harga')
//         .then(res=>{setSemuaHarga(res.data.harga);console.log(res);  
//             setLoading(false)
//         })
// }

// useEffect(() => {
//     fetchData();
    
//     }, [])

// const handleHarga = async(e) =>{
//     setIdHarga(e.target.id)
//     setHarga({
//         nama_museum : 'loading...',
//         nama_kategori : 'loading...',
//         hari_biasa : 'loading...',
//         hari_libur : 'loading...',
//     })
    
//     e.target.id ? axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/edit-harga/${e.target.id}`).then(res=>{
//         setHarga(res.data.harga[0]);
//         // console.log(res.data.harga[0]);
//         setLoadingHarga(false);})
//         : swal("Mohon maaf untuk diulang kembali","Terdapat Kesalahan didalam sistem","error");

//     }

// const handleInput = (e) => {
//     e.persist();
//     setHarga({...harga, [e.target.name]: e.target.value });
//     console.log(harga);
// }

// const updateHarga = (e) => {
//     // console.log(e.currentTarget[5]);
//     e.preventDefault();
    
//     // const student_id = props.match.params.id;
//     // const data = studentInput;

//     const thisClicked = e.currentTarget[5];
//     thisClicked.innerText = "Updating";
//     const data = {
//         biasa: harga.hari_biasa,
//         libur: harga.hari_libur,
//     }

//     axios.put(`${process.env.REACT_APP_API_ENDPOINT}/api/update-harga/${idHarga}`, data).then(res=>{
//         if(res.data.status === 200)
//         {
//             console.log('berhasil');
//             swal("Success",res.data.message,"success")
//             CloseRef.current.click();
//             thisClicked.innerText = "Simpan";
//         }
//         else if(res.data.status === 422)
//         {
//             // swal("All fields are mandetory","","error");
//         }
//         else if(res.data.status === 404)
//         {
//             // swal("Error",res.data.message,"error");
//             // history.push('/students');
//         }
//     });
// }

// // store museum data

// // handle input museum
// const handleInputTambahData= (e) =>{
//     e.persist();
//     setTambahData({...tambahData, [e.target.name]: e.target.value });

// }

// const handleNamaMuseum = (e) =>{
//     console.log(e.currentTarget.value)
// }

// const storeMuseum = (e) =>{
//     e.preventDefault();

//     const thisClicked = e.currentTarget[5];
//     thisClicked.innerText = "Tambah Museum";
//     console.log(tambahMuseum)

//     axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/add_museum`, tambahMuseum).then(res=>{
//         if(res.data.status === 200)
//         {
//             console.log('berhasil');
//             swal("Success",res.data.message,"success")
//             CloseRef.current.click();
//         }
//         else if(res.data.status === 422)
//         {
//             swal("All fields are mandetory","","error");
//         }
//         else if(res.data.status === 404)
//         {
//             swal("Error",res.data.message,"error");
//         }
//     });
// }

// //send to api
// const storeData = (e) => {
//     e.preventDefault();

//     const thisClicked = e.currentTarget[5];
//     thisClicked.innerText = "Menambahkan";
//     const data = {
//         nama: tambahData.nama_museum,
//         kategori: tambahData.nama_kategori,
//         biasa: tambahData.hari_biasa,
//         libur: tambahData.hari_libur,
//     }
//     console.log(data)

//     axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/add_data`, data).then(res=>{
//         console.log(res);
//         if(res.data.status === 200)
//         {
//             // console.log('berhasil');
//             swal("Success",res.data.message,"success");
//             fetchData();
//             CloseRef.current.click();
//             thisClicked.innerText = "Tambah Data";
            
//         }
//         else if(res.data.status === 220)
//         {
//             swal("Gagal Menambahkan",res.data.message,"error");
//             thisClicked.innerText = "Tambah Data";
//         }
//         else if(res.data.status === 422)
//         {
//             swal("All fields are mandetory","","error")
//             thisClicked.innerText = "Tambah Data";;
//         }
//         else if(res.data.status === 404)
//         {
//             swal("Error",res.data.message,"error");
//             thisClicked.innerText = "Tambah Data";
//         }
//     });
// }
// //end

// const deleteData = (e, id) => {
//     e.preventDefault();
    
//     // const thisClicked = e.currentTarget;
//     // thisClicked.innerText = "Deleting";
    
//     console.log(e,id);

//     swal({
//         title: "Anda Yakin menghapus Museum?",
//         text: "Sekali Hapus, anda tidak bisa mencadangkannya lagi!",
//         icon: "warning",
//         buttons: true,
//         dangerMode: true,
//     })
//         .then((willDelete) => {
//         if (willDelete) {

//             axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/api/delete-data/${id}`).then(res=>{
//                 if(res.data.status === 200)
//                 {
//                     // console.log('berhasil delet');
//                     swal("Deleted!",res.data.message,"success")
//                     fetchData();
//                     // thisClicked.closest("tr").remove();
//                 }
//                 else if(res.data.status === 404)
//                 {
//                     swal("Error",res.data.message,"error");
//                 }})
//         } else {
//             swal("Data anda aman!");
//         }
//     })
// }

// function getFirstLetters(str) {
//     const firstLetters = str
//         .split(' ')
//         .map(word => word[0])
//         .join('');

//     return firstLetters;
//     }

// const rupiah = (number)=>{
//     return new Intl.NumberFormat("id-ID", {
//     //   style: "currency",
//     currency: "IDR"
//     }).format(number);
// }

// if(loading)
// {
//     var harga_HTMLTABLE =   
//         <tr className="bg-white border-b" >
//             <td colspan={6} className="text-xl text-center justify-center font-semibold py-5">
//                 <ReactLoading type={"spin"} color={"red"} height={'5%'} width={'5%'} className="m-auto" />
//             </td>
//         </tr>
// }
// else
// {
//     var harga_HTMLTABLE = ''
//     harga_HTMLTABLE = semuaHarga.filter(val=>{
//         if(searchTerm == "")
//         {
//             return val
//         }
//         else if(val.nama_museum.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 val.nama_kategori.toLowerCase().includes(searchTerm.toLowerCase()))
//         {
//             return val
//         }
//     }).map((item,index)=>{
//         return(
//             <tr className="bg-white border-b" key={index}>
//                     <td className=" text-gray-900 px-6 py-4 whitespace-nowrap">
//                         {item.id}
//                     </td>
//                     <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
//                         {getFirstLetters(item.nama_museum)}
//                     </td>
//                     <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
//                         {item.nama_kategori}
//                     </td>
//                     <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
//                         {rupiah(item.hari_biasa)}
//                     </td>
//                     <td className=" text-gray-900  px-6 py-4 whitespace-nowrap">
//                         {rupiah(item.hari_libur)}
//                     </td>
//                     <td className=" text-gray-900 px-6 py-4 whitespace-nowrap ">
//                         <button type="button" className=" text-white ml-4 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-4 py-1.5 flex text-center mr-2 w-3/4 mb-2 align-middle items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" data-bs-toggle="modal" id={item.id_kategori} data-bs-target="#exampleModalCenteredScrollable" onClick={handleHarga} >
//                         <BiPencil className="mr-1" />Edit</button>
//                         <button type="button" className="text-white ml-4 bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded text-sm px-3 py-1.5 flex text-center mr-2 mb-2 w-3/4 items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={(e) => deleteData(e, item.id)}>
//                         <BiTrash  className="mr-1" />Hapus</button>
//                     </td>
//                     </tr>
//         )
//     })
// }

// this.deleteUser = this.deleteUser.bind(this);
//         this.columns = [ 
//             {
//                 key: "id",
//                 text: "No",
//                 sortable: true,
//                 className: "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs text-white-600 whitespace-nowrap p-4",
//                 TrOnlyClassName:"border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-black-200",
//                 align: "left",
//             },
//             {
//                 key: "museum",
//                 text: "Museum",
//                 className: "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4",
//                 TrOnlyClassName:"border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-red-200",
//                 align: "left",
//                 sortable: true
//             },
//             {
//                 key: "kategori",
//                 text: "Kategori",
//                 className: "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4i",
//                 TrOnlyClassName:"border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-red-200",
//                 align: "left",
//                 sortable: true
//             },
//             {
//                 key: "hari_biasa",
//                 text: "Harga Hari Biasa",
//                 className: "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4",
//                 TrOnlyClassName:"border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-red-200",
//                 align: "left",
//                 sortable: true
//             },
//             {
//                 key: "hari_libur",
//                 text: "Harga Hari Libur",
//                 className: "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4",
//                 TrOnlyClassName:"border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-red-200",
//                 align: "left",
//                 sortable: true
//             },
//             {
//                 key: "jumlah",
//                 text: "Jumlah",
//                 className: "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4",
//                 TrOnlyClassName:"border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-red-200",
//                 align: "left",
//                 sortable: true
//             },
//             {
//                 key: "harga_awal",
//                 text: "Harga",
//                 className: "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4",
//                 TrOnlyClassName:"border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-red-200",
//                 align: "left",
//                 sortable: true
//             },
//             {
//                 text: "Aksi",
//                 className: "sticky right-0 bg-white w-full m-auto border-b flex py-3 justify-center",
//                 TrOnlyClassName: "sticky right-0 bg-white text-red-700 px-2",
//                 width: 100,
//                 sortable: false,
//                 align: "left",
//                 cell: record => {
                    
//                     return (
//                         <Fragment>
//                             <button id={`konfirmasi-${record.id}`} 
//                                 className="p-1.5 text-sm bg-green-400 rounded-lg" onClick={e=>handleKonfirmasi(e, record.id)}>
//                                 Aksi</button>
//                         </Fragment>
//                     );
//                 }
//             }
        
//         ];
//         this.config = {
//             key_column: '_id', 
//             filename: "Users",
//             no_data_text: 'No data available!',
//             language: {
//                 length_menu: "Show _MENU_ result per page",
//                 filter: "Cari museum, kategori, harga,...",
//                 info: "Showing _START_ to _END_ of _TOTAL_ records",
//                 // className:"flex my-2 w-72 w-full font-nunito border-none ring-2 ring-red-300 focus:border-none focus:ring-red-500 focus:ring-2 active:border-none rounded-lg",
//                 pagination: {
//                     first: "First",
//                     previous: <span>&#8676;</span>,
//                     next: <span>&#8677;</span>,
//                     last: "Last"
//                 }
//             },
//             pagination: "basic", //advance
//             show_length_menu: true,
//             show_filter: true,
//             show_pagination: true,
//             show_info: true,
//             show_className: true,

//         };

//     }

//     componentDidMount () {
//         axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/pengunjung`).then(res=>{
//             if(res.status === 200) {
//                 this.setState ({
//                     users: res.data.pengunjung
//                 })
//             }
//         });
//         setTimeout(() => {
//             this.setState({
//                 loading: false,
//             })
//         }, 3000);
//     }

//     editUser(user) {
//         console.log("Edit User", user);
//     }

//     deleteUser(user) {
//         console.log("Delete User", user);
//     }

//     pageChange(pageData) {
//         console.log("OnPageChange", pageData);
//     }


//     render() {
//         return (
//             <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white text-black">
//                 <div className="rounded-t mb-0 px-4 py-3 border-0">
//                     <div className="flex flex-wrap items-center">
//                         <div className="relative w-full px-4 max-w-full flex-grow flex-1">
//                             <h3 className="font-semibold text-lg font-merriweather text-red-600" >Master Tiket
//                             </h3>
//                         </div>
//                     </div>
//                 </div>
//                 <div className='block w-full overflow-x-auto'>
//                 <ReactDatatable
//                     className="display items-center w-full bg-transparent border-collapse"
//                     tHeadClassName="bg-red-600 text-white-600 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left"
//                     config={this.config}
//                     records={this.state.users}
//                     columns={this.columns}
//                     onPageChange={this.pageChange.bind(this)}
//                     extraButtons={this.extraButtons}
//                     loading={this.state.loading}
//                 />
//                 </div>
//             </div>
//         )
// }
// }

// export default CardMasterTiket
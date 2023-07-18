import React, { Component, Fragment } from 'react';
import Cookies from 'js-cookie';
import ReactDatatable from '@ashvin27/react-datatable';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios'

class CardDataaaa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            users: []
        };

        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

        this.deleteUser = this.deleteUser.bind(this);
        this.columns = [ 
            {
                key: "nama",
                text: "Nama",
                sortable: true,
                className: "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs text-white-600 whitespace-nowrap p-4",
                TrOnlyClassName:"border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-black-200",
                align: "left",
            },
            {
                key: "museum",
                text: "Museum",
                className: "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4",
                TrOnlyClassName:"border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-red-200",
                align: "left",
                sortable: true
            },
            {
                key: "kategori",
                text: "Kategori",
                className: "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4i",
                TrOnlyClassName:"border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-red-200",
                align: "left",
                sortable: true
            },
            {
                key: "phone",
                text: "Phone",
                className: "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4",
                TrOnlyClassName:"border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-red-200",
                align: "left",
                sortable: true
            },
            {
                key: "kota",
                text: "Kota",
                className: "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4",
                TrOnlyClassName:"border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-red-200",
                align: "left",
                sortable: true
            },
            {
                key: "jumlah",
                text: "Jumlah",
                className: "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4",
                TrOnlyClassName:"border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-red-200",
                align: "left",
                sortable: true
            },
            {
                key: "total_harga",
                text: "Harga",
                className: "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4",
                TrOnlyClassName:"border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-red-200",
                align: "left",
                sortable: true
            },
            {
                key: "pembayaran",
                text: "Pembayaran",
                className: "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4",
                TrOnlyClassName:"border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-red-200",
                align: "left",
                sortable: true
            },
            {
                key: "status",
                text: "Status",
                className: "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4",
                TrOnlyClassName:"border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-red-200",
                align: "left",
                sortable: true
            },
            {
                key: "tanggal",
                text: "Tanggal Pembayaran",
                className: "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4",
                TrOnlyClassName:"border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-red-200",
                align: "left",
                sortable: false,
            },
            {
                key: "kehadiran",
                text: "Kehadiran",
                className: "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4",
                TrOnlyClassName:"border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-red-200",
                align: "left",
                sortable: true
            },
            {
                key: "kode_tiket",
                text: "Kode Tiket",
                className: "sticky right-0 bg-white w-full m-auto border-b flex py-3 justify-center",
                TrOnlyClassName: "sticky right-0 bg-white text-red-700 px-2",
                width: 100,
                sortable: false,
                align: "left",
                cell: record => {
                    
                    return (
                        <Fragment>
                            <a href={"http://localhost:3000/tiket/" + record.kode_tiket}>
                            <button
                                className="bg-gray-500 hover:bg-gray-600 rounded shadow-inner drop-shadow-2xl  py-0.5 px-1">
                                <i className="glyphicon glyphicon-edit fa fa-eye"></i>
                            </button>
                            </a>
                        </Fragment>
                    );
                }
            }
        ];
        this.config = {
            key_column: '_id', 
            filename: date,
            no_data_text: 'No data available!',
            button: {
                excel: true,
                print: false,
                csv: false,
                extra: false,
            },
            language: {
                length_menu: "Show _MENU_ result per page",
                filter: "Cari nama, kategori, kota,...",
                info: "Showing _START_ to _END_ of _TOTAL_ records",
                // className:"flex my-2 w-72 w-full font-nunito border-none ring-2 ring-red-300 focus:border-none focus:ring-red-500 focus:ring-2 active:border-none rounded-lg",
                pagination: {
                    first: "First",
                    previous: <span>&#8676;</span>,
                    next: <span>&#8677;</span>,
                    last: "Last"
                }
            },
            pagination: "basic", //advance
            show_length_menu: true,
            show_filter: true,
            show_pagination: true,
            show_info: true,
            show_className: true,

        };
    }

    componentDidMount () {
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/pengunjung`, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`,
            }
        }).then(res=>{
            if(res.status === 200) {
                this.setState ({
                    users: res.data.pengunjung
                })
            }
        });
        setTimeout(() => {
            this.setState({
                loading: false,
            })
        }, 3000);
    }

    editUser(user) {
        console.log("Edit User", user);
    }

    deleteUser(user) {
        console.log("Delete User", user);
    }

    pageChange(pageData) {
        console.log("OnPageChange", pageData);
    }


    render() {
        return (
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white text-black">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-lg font-merriweather text-red-600" >Data Pengunjung
                            </h3>
                        </div>
                    </div>
                </div>
                <div className='block w-full overflow-x-auto'>
                <ReactDatatable
                    className="display items-center w-full bg-transparent border-collapse"
                    tHeadClassName="bg-red-600 text-white-600 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-nunito font-semibold text-left"
                    config={this.config}
                    records={this.state.users}
                    columns={this.columns}
                    onPageChange={this.pageChange.bind(this)}
                    loading={this.state.loading}
                />
                </div>
            </div>
        )
    }
}
export default CardDataaaa;
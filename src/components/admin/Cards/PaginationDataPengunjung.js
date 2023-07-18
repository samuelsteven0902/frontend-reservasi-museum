  import React from 'react'
  import { useState , useEffect } from 'react';
  import ReactPaginate from 'react-paginate';
  import { useHistory } from 'react-router-dom';
  import { GrFormView } from 'react-icons/gr';
  import moment from 'moment';

  function PaginationDataPengunjung({searchTerm,pengunjung,startDate,endDate}) {
    // const searchTerm = props.searchTerm
    const [dataPengunjung, setDataPengunjung] = useState(pengunjung);

    useEffect(() =>{
    setItemOffset(0)
    setDataPengunjung(pengunjung)
  }
    ,[pengunjung] )

    const history = useHistory();

    //go page tiket
    const handleTiket = (e) =>{
      history.push("/tiket/" + e );
      }

    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 6 ;


    const filteredData = dataPengunjung.filter((val) => {
      if (startDate && endDate) {
        const tanggalVal = moment(val.tanggal, 'DD-MM-YYYY').toDate();
        const start = moment(startDate, 'YYYY-MM-DD').toDate();
        const end = moment(endDate, 'YYYY-MM-DD').toDate();
        return tanggalVal >= start && tanggalVal <= end;
      }

      if (val.nama.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }

      return false;
    });
    let pageCount = Math.ceil(filteredData.length / itemsPerPage);




    const endOffset = itemOffset + itemsPerPage;
    const currentItems = filteredData.slice(itemOffset, itemOffset + itemsPerPage);
    // const currentItems = dataPengunjung
    // .filter(val => {
    //   const tanggalVal = moment(val.tanggal, 'DD-MM-YY').format('YYYY-MM-DD');
    //   const start = moment(startDate, 'YYYY-MM-DD');
    //   const end = moment(endDate, 'YYYY-MM-DD');
    //   if (
    //     startDate &&
    //     endDate &&
    //     moment(tanggalVal).isBetween(start, end, null, '[]')
    //   ) {
    //     return true;
    //   }
    //   console.log(val);
    //   if (searchTerm === null || searchTerm === "") {
    //     return val;
    //   } else if (
    //     // val.kode_tiket.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     val.nama.toLowerCase().includes(searchTerm.toLowerCase()) 
    //     // val.kota.toLowerCase().includes(searchTerm.toLowerCase())
    //   ) {
    //     return val;
    //   }
    // })
    // .slice(itemOffset, endOffset);

    const handlePageClick = (event) => {
      const filteredData = dataPengunjung.filter((val) => {
        if (startDate && endDate) {
          const tanggalVal = moment(val.tanggal, 'DD-MM-YYYY').toDate();
          const start = moment(startDate, 'YYYY-MM-DD').toDate();
          const end = moment(endDate, 'YYYY-MM-DD').toDate();
          return tanggalVal >= start && tanggalVal <= end;
        }
    
        if (
          searchTerm === null ||
          searchTerm === ""
        ) {
          return true;
        } else if (
          val.nama.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return true;
        }
    
        return false;
      });
    
      const newOffset = (event.selected * itemsPerPage) % filteredData.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
    
    function formatCurrency(amount) {
      const formattedAmount = Number(amount).toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
      });
    
      return formattedAmount.replace(",00", "");
    }


    return (
      <>
      {searchTerm === null || searchTerm === "" ? 
      currentItems.map((item,index)=>{
          //jumlah halaman tanpa search
            console.log(item.kategori);
            pageCount = Math.ceil(filteredData.length / itemsPerPage);
    
          return(
              <tr className="bg-white text-gray-900" key={index}>
                <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.kode_tiket}</td>
                <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.nama}</td>
                <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.kategori.museum.nama_museum}</td>
                <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.status === "Lunas" ? "Lunas" : "Belum Lunas"}</td>
                <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.kehadiran != null ? "Hadir" : "Tidak Hadir"}</td>
                <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.kategori.nama_kategori}</td>
                <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.phone}</td>
                <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.kota}</td>
                <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.jumlah}</td>
                <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{formatCurrency(item.total_harga)}</td>
                <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.pembayaran}</td>
                <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.tanggal_pembayaran}</td>
                <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.tanggal_kehadiran}</td>
                <td className="sticky right-0 bg-gray-50 px-2">
                  <button className="bg-gray-500 hover:bg-gray-600 rounded shadow-inner drop-shadow-2xl py-0.5 px-1" onClick={e=>handleTiket(item.kode_tiket,e)}>
                  <GrFormView className=""/>
                </button>
                </td>
              </tr>
            )
          })
      :
    dataPengunjung
    .filter((val) => {
      if (
        startDate &&
        endDate &&
        val.tanggal >= startDate &&
        val.tanggal <= endDate
      ) {
        return true;
      }

      if (
        val.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        val.kota.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return true;
      }
    }).map((item,index)=>{

            //jumlah halaman dengan search
            pageCount = Math.ceil(filteredData.length / itemsPerPage);
            console.log(item);

            return(
                <tr className="bg-white text-gray-900" key={index}>
                <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.kode_tiket}</td>
                <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.nama}</td>
                <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.kategori.museum.nama_museum}</td>
                <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.kategori.nama_kategori}</td>
                <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.phone}</td>
                <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.kota}</td>
                <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.jumlah}</td>
                <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{formatCurrency(item.total_harga)}</td>
                <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.pembayaran}</td>
                <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.status === "Lunas" ? "Lunas" : "Belum Lunas"}</td>
                <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.kehadiran != null ? "Hadir" : "Tidak Hadir"}</td>
                <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.tanggal_pembayaran}</td>
                <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{item.tanggal_kehadiran}</td>
                
                <td className=" text-gray-900 px-6 py-4 whitespace-nowrap"><button className="bg-gray-500 hover:bg-gray-600 rounded shadow-inner drop-shadow-2xl py-0.5 px-1" onClick={e=>handleTiket(item.kode_tiket,e)}>
                  <GrFormView className=""/>
                  </button>
                  </td>
                </tr>
              )
            })
      }
        <tr className='w-full py-2'>
          <th colSpan={9}>
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next ⇒"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="⇐ Previous"
              renderOnZeroPageCount={null}
              containerClassName='isolate inline-flex -space-x-px rounded-md shadow-sm my-2'
              pageLinkClassName='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-red-200 hover:bg-red-500 focus:z-20 focus:outline-offset-0 h-full'
              previousLinkClassName='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-900 ring-1 ring-inset ring-red-200 hover:bg-red-500 hover:text-white focus:z-20 focus:outline-offset-0 bg-red-100'
              nextLinkClassName='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-900 ring-1 ring-inset ring-red-200 hover:bg-red-500 hover:text-white focus:z-20 focus:outline-offset-0 bg-red-100'
              activeLinkClassName='relative z-10 inline-flex items-center bg-red-600 px-5 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 h-full'
            />
          </th>
        </tr>
      </>
    );
  }

  export default PaginationDataPengunjung;
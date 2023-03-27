import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
 
export default class Images extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      images: [],
    };
  }
 
  componentDidMount() {
    this.getImages();
  }
 
  deleteFile = (id,e) =>{

    swal({
      title: "Anda Yakin menghapus Gambar ini ?",
      text: "Sekali Hapus, anda tidak bisa mencadangkannya lagi!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
  })
      .then((willDelete) => {
      if (willDelete) {

          axios.delete(`http://localhost:8000/api/delete-image/${id}`).then(res=>{
              if(res.data.status === 200)
              {
                  // console.log('berhasil delet');
                  swal("Deleted!",res.data.message,"success")
                  this.getImages();
                  // thisClicked.closest("tr").remove();
              }
              else if(res.data.status === 404)
              {
                  swal("Error",res.data.message,"error");
              }})
      } else {
          swal("Data anda aman!");
      }

  

  })
  }

  getImages = () => {
    axios
      .get("http://localhost:8000/api/show_files")
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            images: response.data.data,
          });
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
 
  render() {
    return (
      <div className="container">
          <div className="col-lg-12 mt-10">
            <div className="card shadow bg-white rounded-xl p-10">
              <div className="card-header">
                <h4 className="text-4xl font-merriweather  font-bold pb- w-full  text-red-400"> Images List </h4>
              </div>
              <div className="card-body">
                <div className="flex">
 
                  {
                    this.state.images && this.state.images.length > 0 ? (
                        this.state.images.map((image) => (
                        <div className="w-1/3 flex items-start mt-3" key={image.id}>
                            <img src={ "http://localhost:8000/uploads/" + image.panduan_name } className="img-fluid img-bordered" width="200px"/>
                            <button className="bg-red-500 w-7 h-7 rounded-full text-white hover:bg-red-300" onClick={e=>this.deleteFile(image.id,e)}>X</button>
                        </div>
                        ))
                    ) : (
                        <h6 className="text-danger text-center">No Image Found </h6>
                    )
                  }
 
                </div>
              </div>
            </div>
          </div>
      
      </div>
    );
  }
}
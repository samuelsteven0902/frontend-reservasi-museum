import React, { Component } from "react";
import axios from "axios";
import Images from "./Images";
// import Images from "./Image";
 
export default class ImageUpload extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      image: "",
      responseMsg: {
        status: "",
        message: "",
        error: "",
      },
    };
  }
 
  // image onchange hander
  handleChange = (e) => {
    const imagesArray = [];
    let isValid = "";
 
    for (let i = 0; i < e.target.files.length; i++) {
      isValid = this.fileValidate(e.target.files[i]);
      imagesArray.push(e.target.files[i]);
    }
    this.setState({
      image: imagesArray,
    });
  };
 
  // submit handler
  submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let i = 0; i < this.state.image.length; i++) {
      data.append("images[]", this.state.image[i]);
    }
 
    axios.post("http://localhost:8000/api/files", data)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            responseMsg: {
              status: response.data.status,
              message: response.data.message,
            },
          });
          setTimeout(() => {
            this.setState({
              image: "",
              responseMsg: "",
            });
          }, 100000);
 
          document.querySelector("#imageForm").reset();
          // getting uploaded images
          this.refs.child.getImages();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
 
  // file validation
  fileValidate = (file) => {
    if (
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg"||
      file.type === "image/pdf"
    ) {
      this.setState({
        responseMsg: {
          error: "",
        },
      });
      return true;
    } else {
      this.setState({
        responseMsg: {
          error: "File type allowed only jpg, png, jpeg",
        },
      });
      return false;
    }
  };
 
  render() {
    return (
      <div className="container py-5">
        <div className="row">
          <div className="">
            <form onSubmit={this.submitHandler} encType="multipart/form-data" id="imageForm">
              <div className="shadow bg-white rounded-xl p-10">
                {this.state.responseMsg.status === "successs" ? (
                  <div className="alert alert-success">
                    {this.state.responseMsg.message}
                  </div>
                ) : this.state.responseMsg.status === "failed" ? (
                  <div className="alert alert-danger">
                    {this.state.responseMsg.message}
                  </div>
                ) : (
                  ""
                )}
 
                <div className="card-body">
                  <div className="form-group py-2 "> 
                  <div className='flex justify-center flex-wrap flex-col  '>
            <p className='text-5xl font-merriweather  font-bold pb- w-full  text-red-300'>Panduan Tiket</p>
            <hr className='h-1 bg-red-300  flex ' />
        </div>
                    <input
                      type="file"
                      name="image"
                      multiple
                      onChange={this.handleChange}
                      className="rounded-xl bg-gray-200 mt-10"
                    />
                    <span className="text-danger">
                      {this.state.responseMsg.error}
                    </span>
                  </div>
                </div>
 
                <div className="card-footer">
                  <button type="submit" className="bg-green-500 rounded-xl px-4 py-2 text-xl text-white">
                    Upload File
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
 
        <Images ref="child" />
      </div>
    );
  }
}
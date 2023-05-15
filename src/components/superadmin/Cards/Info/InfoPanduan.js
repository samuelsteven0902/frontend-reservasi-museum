import React, { Component } from "react";
import axios from "axios";
import Images from "./Images";
import Cookies from "js-cookie";
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
    
    console.log(this.state);
  };
  
  // submit handler
  submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let i = 0; i < this.state.image.length; i++) {
      data.append("images[]", this.state.image[i]);
      console.log(this.state.image);
    }
    console.log(data);
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/files`, data, {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      }})
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
            console.log(this.image)
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
    return (<>    
    <div className="container py-">
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
                ) : 
                (
                  ""
                )}

                <div className="card-body">
                  <div className="form-group py-2 "> 
                    <div className='flex justify-center flex-wrap flex-col'>
                      <p className='text-3xl sm:text-4xl font-merriweather font-bold pb- w-full  text-red-400'>Panduan Gambar</p>
                      <hr className='h-1 bg-red-300 flex'/>
                    </div>
                    <input type="file" name="image" multiple onChange={this.handleChange} className="rounded-xl bg-gray-200 mt-10 w-full"/>
                    <span className="text-danger">
                      {this.state.responseMsg.error}
                    </span>
                    <div className="font-base font-bold font-nunito">Max. Upload 2MB</div>
                  </div>
                </div>

                {/* <TextEditor /> */}
                <div className="card-footer">
                  <button type="submit" className="bg-green-600 rounded-xl px-4 py-2 text-xl text-white hover:bg-green-500 focus:bg-green-400 active:bg-green-400 focus:outline-none transition-all">Upload File</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Images ref="child"/>
      </div>
    </>
    );
  }
}
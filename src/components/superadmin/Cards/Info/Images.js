//src/image.js
import React, { Component } from "react";
import axios from "axios";
// import { Document, Page } from 'react-pdf';
// Import the main component
// import { Viewer } from '@react-pdf-viewer/core';

// Import the styles
// import '@react-pdf-viewer/core/lib/styles/index.css';

// Your render function

// Import the main component
// import { Viewer } from '@react-pdf-viewer/core'; // install this library
// // Plugins
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// // Import the styles
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// // Worker
// import { Worker } from '@react-pdf-viewer/core'; // install this library

 
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
      <div className="container pt-4">
        <div className="row">
          <div className="col-lg-12">
            <div className="card shadow">
              <div className="card-header">
                <h4 className="card-title fw-bold"> Images List </h4>
              </div>
              <div className="card-body">
                <div className="row">
 
                  {
                    this.state.images.length > 0 ? (
                        this.state.images.map((image) =>
                        (
                        <div className="col-xl-6 col-lg-8 col-sm-12 col-12 mt-3" key={image.id}>
                            {/* <img src={ "http://localhost:8000/uploads/" + image.panduan_name } className="img-fluid img-bordered " width="200px"
                            /> */}
                            <object data={ "http://localhost:8000/uploads/" + image.panduan_name } type="application/pdf" width="100%" height="100%" className="img-fluid img-bordered "
                            >
                              <p>Alternative text - include a link <a href={ "http://localhost:8000/uploads/" + image.panduan_name }>to the PDF!</a></p>
                            </object>
                            
                            {/* <Document file={"http://localhost:8000/uploads/" + image.panduan_name}>
                              <Page pageNumber={1} />
                            </Document> */}
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
      </div>
    );
  }
}
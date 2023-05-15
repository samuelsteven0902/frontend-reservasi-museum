import React, { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import axios from 'axios'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactLoading from 'react-loading';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { TbArrowBackUp } from 'react-icons/tb'
import en from '../../../../assets/img/lng/en.png'
import id from '../../../../assets/img/lng/id.png'
import Cookies from 'js-cookie';

function EditAbout(props) {
    const [about,setAbout] = useState('')
    const [namaMuseum,setNamaMuseum] = useState('')
    const [lang,setLang] = useState('id')
    const [loading,setLoading] = useState(true)
    const history = useHistory();
    const location = useLocation();
    const params = useParams()

    const museumId = props.match.params.id
    
    const [image, setImage] = useState("");
    const [responseMsg, setResponseMsg] = useState({
      status: "",
      message: "",
      error: "",
    });
  
    const handleChange = (e) => {
      const imagesArray = [];
      let isValid = "";
  
      for (let i = 0; i < e.target.files.length; i++) {
        isValid = fileValidate(e.target.files[i]);
        imagesArray.push(e.target.files[i]);
      }
      setImage(imagesArray);
      console.log(image);
    };
  
    const submitHandler = (e) => {
      e.preventDefault();
      const data = new FormData();
      for (let i = 0; i < image.length; i++) {
        data.append("images[]", image[i]);
        console.log(image);
      }
      console.log(data);
      axios
        .post(`${process.env.REACT_APP_API_ENDPOINT}/api/upload_gambar_museum/${museumId}`, data, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setResponseMsg({
              status: response.data.status,
              message: response.data.message,
            });
          getImages();
            setTimeout(() => {
              setImage("");
              setResponseMsg("");
              console.log(image);
            }, 100000);
            document.querySelector("#imageForm").reset();
            // getting uploaded images
            // childRef.getImages();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
    const fileValidate = (file) => {
      if (
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg" ||
        file.type === "image/pdf"
      ) {
        setResponseMsg({
          error: "",
        });
        return true;
      } else {
        setResponseMsg({
          error: "File type allowed only jpg, png, jpeg",
        });
        return false;
      }
    };

        const [images, setImages] = useState([]);
      
        useEffect(() => {
          getImages();
        }, []);
      
        const deleteFile = (id, e) => {
          swal({
            title: "Anda Yakin menghapus Gambar ini ?",
            text: "Sekali Hapus, anda tidak bisa mencadangkannya lagi!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
              axios
                .delete(`${process.env.REACT_APP_API_ENDPOINT}/api/delete-image/${id}`)
                .then((res) => {
                  if (res.data.status === 200) {
                    swal("Deleted!", res.data.message, "success");
                    getImages();
                  } else if (res.data.status === 404) {
                    swal("Error", res.data.message, "error");
                  }
                });
            } else {
              swal("Data anda aman!");
            }
          });
        };
      
        const getImages = () => {
          axios
            .post(`${process.env.REACT_APP_API_ENDPOINT}/api/show_gambar_museum/${museumId}`)
            .then((response) => {
              if (response.status === 200) {
                setImages(response.data.data);
                console.log(response.data);
              }
            })
            .catch((error) => {
              console.error(error);
            });
        };
      
  
    


    const fetchAbout = () => {
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/edit_about/${museumId}`).then( res => {
            console.log(res.data);
            if(res.data.status === 200)
            {
                setAbout(res.data.about);
                setLoading(false);
            }
            else if(res.data.status === 404)
            {
                // swal("Error",res.data.message,"error");
                // history.push('/students');
            }
        });

        
    }
    
    const updateAbout = (e) => {
        e.preventDefault();

        const data = {
            about : about.about,
            about_en : about.about_en,
        }
        console.log(data);

        axios.put(`${process.env.REACT_APP_API_ENDPOINT}/api/update_about/${museumId}`, data, {
            headers : {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              Authorization: `Bearer ${Cookies.get('token')}`,
            }}).then(res=>{
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                // setError([]);
                history.push('/superadmin/about');
            }
            else if(res.data.status === 422)
            {
                swal("All fields are mandetory","","error");
                // setError(res.data.validationErrors);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.push('/superadmin/about');
            }
        });


    }

    const handleLang = (e) =>{
        e.preventDefault();
        setLang(lang === 'id'?'en':'id')
    }

    useEffect(()=>{
        setNamaMuseum(location.state)
        fetchAbout();
    }, [])





    if(loading)
    {
        return <ReactLoading type={"spin"} color={"red"} height={'10%'} width={'10%'} className="m-auto" />
    }
    else
    {
        return (
            <div className='shadow bg-white rounded-xl p-10 mb-5'>

                <div className='flex'>
                    <Link to={'/superadmin/about'} className="bg-red-400 p-1 rounded-full text-white w-10 h-10"><TbArrowBackUp className='' size={30} /></Link>
                    <p className='flex items-center mx-auto text-xl'>{lang === 'id'?'Tentang Museum (Indonesia)':'About Museum (Inggris)'} - {namaMuseum}</p>
                    <button onClick={(e)=>handleLang(e)} className="justify-center items-center shadow focus:ring-0 focus:border-0 focus:outline-none hover:bg-red-300 border-b-2 py-1 m-1  flex rounded"><img src={lang === 'id'?en:id} className="w-8 mx-2" alt='en' name={lang === 'id'?'en':'id'} /></button>
                </div>

                <div className='p-10 mb-5'>
                   <div className={`${lang === 'id' ? '': 'hidden'  }`}>
                        <CKEditor

                        config={{         
                            toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'link','|', 'undo', 'redo']
                        }}  
                        editor={ ClassicEditor }

                        data={about.about}

                        onChange={ ( e, editor ) => {
                            // handleChange(e,editor)
                            setAbout({...about,about:editor.getData()})
                        } } 

                        />

                   </div>
                   <div className={`${lang === 'en' ? '': 'hidden'  }`}>
                        <CKEditor
                        
                        editor={ ClassicEditor }

                        data={about.about_en}

                        onChange={ ( e, editor ) => {
                            // handleChange(e,editor)
                            setAbout({...about,about_en:editor.getData()})
                        } }

                        config={{         
                            toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'link','|', 'undo', 'redo']
                          }}  
                        />

                   </div>


                    <button className='py-2 px-4 bg-green-600 my-5 text-white flex justify-end mx-auto rounded ' onClick={updateAbout}>Simpan Perubahan</button>
                </div>
                
                
      <>
        <div className="container py-">
          <div className="row">
            <div className="">
              <form onSubmit={submitHandler} encType="multipart/form-data" id="imageForm">
                <div className="shadow bg-white rounded-xl p-10">
                  {responseMsg.status === "successs" ? (
                    <div className="alert alert-success">{responseMsg.message}</div>
                  ) : responseMsg.status === "failed" ? (
                    <div className="alert alert-danger">{responseMsg.message}</div>
                  ) : (
                    ""
                  )}
  
                  <div className="card-body">
                    <div className="form-group py-2 ">
                      <div className="flex justify-center flex-wrap flex-col">
                        <p className="text-3xl sm:text-4xl font-merriweather font-bold pb- w-full  text-red-400">
                            Gambar Museum
                        </p>
                        <hr className="h-1 bg-red-300 flex" />
                      </div>
                      <input
                        type="file"
                        name="image"
                        multiple
                        onChange={handleChange}
                        className="rounded-xl bg-gray-200 mt-10 w-full"
                      />
                      <span className="text-danger">{responseMsg.error}</span>
                        <div className="font-base font-bold font-nunito">Max. Upload 2MB</div>
                        </div>
                        </div>

                           {/* <TextEditor /> */}
                        <div className="card-footer">
                        <button
                        type="submit"
                        className="bg-green-600 rounded-xl px-4 py-2 text-xl text-white hover:bg-green-500 focus:bg-green-400 active:bg-green-400 focus:outline-none transition-all"
                        >
                        Upload File
                        </button>
                    </div>
                    </div>
                </form>
                </div>
            </div>
            {/* <Images ref={(ref) => (childRef = ref)} /> */}
            </div>
        </>

        <>
        <div className="container">
            <div className="col-lg-12 mt-10">
                <div className="card shadow bg-white rounded-xl p-10">
                <div className="card-header">
                    <h4 className="text-4xl font-merriweather  font-bold pb- w-full  text-red-400">
                    {" "}
                    Images List{" "}
                    </h4>
                </div>
                <div className="card-body">
                    <div className="flex">
                    {images && images.length > 0 ? (
                        images.map((image) => (
                        <div className="w-1/3 flex items-start mt-3" key={image.id}>
                            <img
                            src={`${process.env.REACT_APP_API_ENDPOINT}/uploads/` + image.nama_gambar}
                            className="img-fluid img-bordered"
                            width="200px" alt=''
                            />
                            <button
                            className="bg-red-500 w-7 h-7 rounded-full text-white hover:bg-red-300"
                            onClick={(e) => deleteFile(image.id, e)}
                            >
                            X
                            </button>
                        </div>
                        ))
                    ) : (
                        <h6 className="text-danger text-center">No Image Found </h6>
                    )}
                    </div>
                </div>
                </div>
            </div>
        </div>
        </>





            </div>
        )
    }

}

export default EditAbout
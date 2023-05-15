import React, { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import axios from 'axios'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactLoading from 'react-loading';
import { Link, useHistory, useLocation } from 'react-router-dom';
import swal from 'sweetalert';
import { TbArrowBackUp } from 'react-icons/tb'
import id from '../../../../assets/img/lng/id.png'

function EditAbout(props) {
    const [about,setAbout] = useState('')
    const [loading,setLoading] = useState(true)
    const history = useHistory();
    const location = useLocation();
    const nama_museum = location.state;

    const museumId = props.match.params.id

    const fetchAbout = () => {
        axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/edit_about/${museumId}`).then( res => {
            console.log(res.data);
            if(res.data.status === 200)
            {
                setAbout(res.data.about.about_en);
                setLoading(false);
            }
            else if(res.data.status === 404)
            {
                swal("Error","Terdapat Error","error");
                // history.push('/students');
            }
        });

        console.log(location.state);
        
    }

    const handleChange = (e,editor) => {
        setAbout(editor.getData())
        // console.log(about);
      }
    
    const updateAbout = (e) => {
        e.preventDefault();

        const data = {
            about : about
        }

        axios.put(`${process.env.REACT_APP_API_ENDPOINT}/api/update_about/${museumId}`, data).then(res=>{
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

    useEffect(() => {
        fetchAbout();
          
        }, [])
  

    console.log(about);

    if(loading)
    {
        return <ReactLoading type={"spin"} color={"red"} height={'10%'} width={'10%'} className="m-auto" />
    }
    else
    {
        return (
            <div className='shadow bg-white rounded-xl p-10 mb-5'>

                <div className='flex'>
                    <Link to={'/superadmin/about'} className="bg-red-400 p-1 rounded-full text-white"><TbArrowBackUp className='' size={30} /></Link>
                    <p className='flex items-center mx-auto text-xl'>ABOUT - {nama_museum}</p>
                    <Link to={'/superadmin/edit-about/'+museumId}  className=" justify-center items-center hover:bg-red-300  flex m-1 rounded"><img src={id} className="w-8 mx-2" alt='in'/></Link>
                </div>

                <div className='p-10 mb-5'>
                    <CKEditor
                   
                        editor={ ClassicEditor }

                        data={about}

                        onChange={ ( e, editor ) => {
                            handleChange(e,editor)
                        } }
                    />
                    <button className='py-2 px-4 bg-green-600 my-5 text-white flex justify-end mx-auto rounded ' onClick={updateAbout}>Simpan Perubahan</button>
                </div>
            </div>
        )
    }

}

export default EditAbout
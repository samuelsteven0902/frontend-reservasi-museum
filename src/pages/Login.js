import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import CardFooter from '@material-tailwind/react/CardFooter';
import H5 from '@material-tailwind/react/Heading5';
import InputIcon from '@material-tailwind/react/InputIcon';
import Button from '@material-tailwind/react/Button';
import Header from 'components/login/Header';
import Page from 'components/login/Page';
import Container from 'components/login/Container';
import login from "../assets/img/admin/login.svg"
import Wave from 'components/Wave';
import DefaultNavbar from 'components/DefaultNavbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import SetCookie from 'hooks/setCookie';


export default function Login() {

    
    const history = useHistory();
    
    const [email,setEmail] = useState('')
    const [pwd,setPwd] = useState('')
    const [error, setEror] = useState(null);
    const [message,setMessage] = useState('')



    function isValidEmail(email) {
      return /\S+@\S+\.\S+/.test(email);
    }
   
    const handleEmail = (e) => {
        if (!isValidEmail(e.target.value)) {
            setEror('Email is invalid');
          } else {
            setEror(null);
          }
      
        setEmail(e.target.value);
        };
    

    const handleSubmit = (e) =>{
        e.preventDefault();

        const data = {
            email:email,
            password:pwd
        }
        console.log(data);
    
        axios.post(`http://localhost:8000/api/login`, data).then(res=>{
            console.log(res);
            console.log(res.data.user.access_token);
            SetCookie("token",res.data.user.access_token )
            if(res.data.status === 200){
                history.push('/');
            }
        })


    }

    useEffect(() => {
      
    }, [])
    

    return (
    <>
        <DefaultNavbar />
        <Page>
            <Container>
                <Card >
                <div className='bg-gray-100 bg-center h-16  rounded-t-xl  bg-inputdata-backgroung flex justify-center items-center absolute w-full -ml-4 -mt-4'>
                            
                            <p className="text-center w-full text-white font-extrabold  text-xl">UPT MUSEUM SURAKARTA</p>
                                        </div>
                    <div className="flex flex-row-reverse pt-10">
                        
                    <div className='w-3/4 mx-auto '>
                        <div className='w-full  mx-auto h-full my-auto p-6 flex justify-center items-center'>
                        <form className='w-full  ' onSubmit={handleSubmit}>
                            <div className=' mb-6 flex items-center py-4'>
                                <hr className='w-1/3 mx-3 bg-red-400'/>
                                <p className='text-center text-xl font-extrabold'>Log in </p>
                                <hr className='w-1/3 mx-3 bg-red-400'/>
                            </div>

                            {/* <!-- Email input --> */}
                            <div class="my-6 mt-24">
                                <input
                                name='email'
                                type="email"
                                class="w-3/4 mx-auto form-control block px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none  focus:ring-0"
                                id="exampleFormControlInput2"
                                placeholder="Email address"
                                onChange={handleEmail}
                               />
                            </div>

                            {/* <!-- Password input --> */}
                            <div class="mb-6">
                                <input
                                name='Pwd'
                                type="password"
                                class="w-3/4 mx-auto form-control block px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none focus:ring-0"
                                id="exampleFormControlInput2"
                                placeholder="Password"
                                onChange={e=>setPwd(e.currentTarget.value)}
                                />
                            </div>

                            <div class="text-center">
                                <button
                                type="submit"
                                class="inline-block w-3/4 px-7 py-3 mt-4 bg-red-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                                >
                                Login
                                </button>
                               
                            </div>
                            </form>
                        </div>
                    </div>
                    <div className='w-1/2 mx-auto h-full align-bottom'>
                        
                        <div className="w-full  px-3 ml-auto mr-auto text-center">
                        <div className="text-gray-800">
                            <p className=' mt-5 font-light text-base text-justify mb-5 text' >
                            Solo merupakan salah satu kota yang sering dikunjungi oleh para wisatawan. Tempat wisata yang ada di Solo juga sangat beragam. Salah satu tempat wisata yang ada di Solo yaitu Museum. Banyak museum yang terdapat di Solo karena Solo juga merupakan daerah yang memiliki sejarah yang melimpah.
                            </p>
                            <p className='mt-5 font-light text-base text-justify' >
                            Museum Keris Nusantara dan Radya Pustaka merupakan museum yang dikelola oleh pemerintah Solo. Keduanya memiliki daya tarik sendiri.
                            </p>
                        </div>
                    </div>
                        {/* <img src={login} className='w-3/4 mx-auto' /> */}
                    </div>
                    </div>
                    
                </Card>

            </Container>
                    {/* <Wave className="absolute Pbottom-0 z-0"/> */}
        </Page>
    </>
    );
}

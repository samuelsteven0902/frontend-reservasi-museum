import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@material-tailwind/react/Navbar';
import NavbarContainer from '@material-tailwind/react/NavbarContainer';
import NavbarWrapper from '@material-tailwind/react/NavbarWrapper';
import NavbarBrand from '@material-tailwind/react/NavbarBrand';
import NavbarToggler from '@material-tailwind/react/NavbarToggler';
import NavbarCollapse from '@material-tailwind/react/NavbarCollapse';
import Nav from '@material-tailwind/react/Nav';
import 'flowbite';
import 'tw-elements';
import Cookies from 'js-cookie';

export default function DefaultNavbar() {
    const [openNavbar, setOpenNavbar] = useState(false);

    const [token, setToken] = useState(Cookies.get('token'));

    const [user,setUser] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
          const fetchData = async () => {
              const data = await fetch(`http://localhost:8000/api/me`, {
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
              });
              const json = await data.json();
              console.log(json);
              var result =''
              if(json.message !== 'Unauthenticated.')
              {
                 result = json.user.roles[0].name;
              }
              
              setUser(result);
              // return json;
              // console.log(result);
              
            }
            fetchData ();
            
          }, []);
          if (user == 'default') {
            setLoading(true)
          }
          console.log(user);

    return (
        <Navbar className='bg-white fixed w-full bg-opacity-75 z-50' color='none'  navbar>
            <NavbarContainer>
                <NavbarWrapper>
                    <a href='/#' target="_blank" rel="noreferrer" >
                        <NavbarBrand>Reservasi Museum</NavbarBrand>
                    </a>
                    <NavbarToggler  onClick={() => setOpenNavbar(!openNavbar)}  color="white" />
                </NavbarWrapper>

                <NavbarCollapse open={openNavbar}>
                    <Nav>
                        <div className="flex flex-col z-50 py-2 pr-10 lg:flex-row lg:items-center">
                            
                            <Link to="/" className='px-5 mx-3 text-black font-bold  rounded-sm'>
                                Home
                            </Link>
                            {/* <Link to="/" className='px-5 mx-3 text-black font-bold  rounded-sm'> */}
                                {/* Informasi Tiket */}
                            {/* </Link> */}
                            <Link to="/about" className='px-5 mx-3 text-black font-bold  rounded-sm'>
                                About
                            </Link>
                            <button id="dropdownDefault" data-dropdown-toggle="dropdown" className="text-black focus:ring-4 focus:outline-none font-bold rounded-lg text-sm px-5 mx-3 text-center inline-flex items-center" type="button">Informasi Tiket<svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></button>

                            <div id="dropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom">
                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                                <li>
                                    <Link to='/panduan' className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Panduan Pemesanan Tiket</Link>
                                </li>
                                <li>
                                    <Link to='/faq' className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">FAQ</Link>
                                </li>
                                </ul>
                            </div>
                            

                            {user == ""? <Link to="/login" className='px-5 mx-3 text-black font-bold  rounded-sm'>
                                Login as Admin
                            </Link>:<Link to={'/'+user} className='px-5 mx-3 text-red-500 font-bold  rounded-sm'>
                                Dashboard {user}
                            </Link>}
                            {/* <Link to="/register" className='px-5 mx-3 text-black font-bold  rounded-sm'>
                                Register
                            </Link> */}
                                               
                        </div>
                    </Nav>
                </NavbarCollapse>
            </NavbarContainer>
        </Navbar>
    );
}

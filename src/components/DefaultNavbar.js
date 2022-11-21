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
import NavbarDropdown from './NavbarDropdown';

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
            
          }, [user]);
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
                    <NavbarToggler  onClick={() => setOpenNavbar(!openNavbar)}  color="red" />
                </NavbarWrapper>

                <NavbarCollapse open={openNavbar}>
                    <Nav>
                        <div className="flex flex-col z-50 py-2 pr-10 lg:flex-row lg:items-center">
                            
                            <Link to="/" className='px-5 mx-3 text-black font-bold  rounded-sm'>
                                Home
                            </Link>
                            <Link to="/about" className='px-5 mx-3 text-black font-bold  rounded-sm'>
                                About
                            </Link>

                            <NavbarDropdown />
                            

                            <div className='w-60 flex justify-end'>
                            {user == ""? <Link to="/login" className='px-5 mx-3 py-2 text-white font-bold  rounded-md bg-red-500 hover:bg-red-400 '>
                                Login as Admin
                            </Link>:<Link to={'/'+user} className='px-5 mx-3 py-2 text-red-500 font-bold  rounded-md bg-gray-300 hover:bg-gray-400 '>
                                Dashboard {user}
                            </Link>}
                            </div>

                                               
                        </div>
                    </Nav>
                </NavbarCollapse>
            </NavbarContainer>
        </Navbar>
    );
}

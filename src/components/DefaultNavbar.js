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
    }
        fetchData ();
        }, [user]);
        if (user == 'default') {
            setLoading(true)
        }
        console.log(user);

    return (
        <Navbar className='fixed bg-white w-full bg-opacity-75 z-50' color='none'  navbar>
            <NavbarContainer>
                <NavbarCollapse open={openNavbar}>
                    <Nav>
                        <div className="flex flex-col z-50 py-4 pr-2 lg:flex-row lg:items-center">
                            <Link to="/" className='px-2 mx-2 text-black font-nunito font-bold'>Home</Link>
                            <Link to="/about" className='px-2 mx-2 text-black font-nunito font-bold '>About</Link>
                            <NavbarDropdown />
                            <div className='w-60'>
                                {user == ""? <Link to="/login" className='bg-[#A70B0B] hover:bg-red-700 px-2 mx-2 py-2 text-white font-nunito font-bold rounded-md'>Login as Admin
                                </Link>:<Link to={'/'+user} className='bg-[#A70B0B] hover:bg-red-700 px-2 mx-2 py-2 text-white font-nunito font-bold rounded-md'>Dashboard {user}</Link>}
                            </div>
                        </div>
                    </Nav>
                </NavbarCollapse>
            </NavbarContainer>
        </Navbar>
    );
}

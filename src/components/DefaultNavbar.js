import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@material-tailwind/react/Navbar';
import NavbarContainer from '@material-tailwind/react/NavbarContainer';
import NavbarWrapper from '@material-tailwind/react/NavbarWrapper';
import NavbarBrand from '@material-tailwind/react/NavbarBrand';
import NavbarToggler from '@material-tailwind/react/NavbarToggler';
import NavbarCollapse from '@material-tailwind/react/NavbarCollapse';
import Nav from '@material-tailwind/react/Nav';

export default function DefaultNavbar() {
    const [openNavbar, setOpenNavbar] = useState(false);
    return (
        <Navbar className='bg-white' color='none'  navbar>
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
                            <Link to="/" className='px-5 mx-3 text-black font-bold  rounded-sm'>
                                About
                            </Link>
                            <Link to="/profile" className='px-5 mx-3 text-black font-bold  rounded-sm'>
                                Profile
                            </Link>
                            <Link to="/login" className='px-5 mx-3 text-black font-bold  rounded-sm'>
                                Login as Admin
                            </Link>
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

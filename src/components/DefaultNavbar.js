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
        <Navbar className='opacity-50' navbar>
            <NavbarContainer>
                <NavbarWrapper>
                    <a href='/#' target="_blank" rel="noreferrer" >
                        <NavbarBrand>Reservasi Museum</NavbarBrand>
                    </a>
                    <NavbarToggler  onClick={() => setOpenNavbar(!openNavbar)}  color="white" />
                </NavbarWrapper>

                <NavbarCollapse open={openNavbar}>
                    <Nav>
                        <div className="flex flex-col z-50 lg:flex-row lg:items-center">
                            
                            <Link to="/" className='px-5 mx-3 text-white font-bold border rounded-sm'>
                                Landing
                            </Link>
                            <Link to="/profile" className='px-5 mx-3 text-white font-bold border rounded-sm'>
                                Profile
                            </Link>
                            <Link to="/login" className='px-5 mx-3 text-white font-bold border rounded-sm'>
                                Login
                            </Link>
                            <Link to="/register" className='px-5 mx-3 text-white font-bold border rounded-sm'>
                                Register
                            </Link>
                           
                        </div>
                    </Nav>
                </NavbarCollapse>
            </NavbarContainer>
        </Navbar>
    );
}

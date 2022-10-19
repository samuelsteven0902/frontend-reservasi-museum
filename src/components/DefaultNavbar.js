import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@material-tailwind/react/Navbar';
import NavbarContainer from '@material-tailwind/react/NavbarContainer';
import NavbarWrapper from '@material-tailwind/react/NavbarWrapper';
import NavbarBrand from '@material-tailwind/react/NavbarBrand';
import NavbarToggler from '@material-tailwind/react/NavbarToggler';
import NavbarCollapse from '@material-tailwind/react/NavbarCollapse';
import Nav from '@material-tailwind/react/Nav';
import 'flowbite';

export default function DefaultNavbar() {
    const [openNavbar, setOpenNavbar] = useState(false);
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
                            <button id="dropdownDefault" data-dropdown-toggle="dropdown" class="text-black focus:ring-4 focus:outline-none font-bold rounded-lg text-sm px-5 mx-3 text-center inline-flex items-center" type="button">Informasi Tiket<svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                            <div id="dropdown" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom">
                                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                                <li>
                                    <Link to='/panduan' class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Panduan Pemesanan Tiket</Link>
                                </li>
                                <li>
                                    <Link to='/faq' class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">FAQ</Link>
                                </li>
                                </ul>
                            </div>
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

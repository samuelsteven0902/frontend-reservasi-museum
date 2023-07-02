import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarContainer from '@material-tailwind/react/NavbarContainer';
import NavbarWrapper from '@material-tailwind/react/NavbarWrapper';
import NavbarToggler from '@material-tailwind/react/NavbarToggler';
import NavbarCollapse from '@material-tailwind/react/NavbarCollapse';
import { Navbar } from '@material-tailwind/react';
import Nav from '@material-tailwind/react/Nav';
import 'flowbite';
import 'tw-elements';
import Cookies from 'js-cookie';
import NavbarDropdown from './NavbarDropdown';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import LanguageDropdownn from './LanguageDropdown';

export default function DefaultNavbar() {
    const [openNavbar, setOpenNavbar] = useState(false);
    const [token, setToken] = useState(Cookies.get('token'));
    const [user,setUser] = useState('');
    const [loading, setLoading] = useState(false);
    const [navbarBg, setNavbarBg] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/me`, {
                headers : {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        Authorization: `Bearer ${token}`,
                }
            });
        const json = await data.json();
            console.log(json);
            var result =''
            if(json.message !== 'Unauthenticated.') {
                result = json.user.roles[0].name;
            }
            setUser(result);
    }
        fetchData ();
        }, [user]);

        if (user === 'default') {
            setLoading(true)
        }
    
        useEffect(() => {
            changeBackground()
            window.addEventListener("scroll", changeBackground)
        })
    
        const changeBackground = () => {
            if (window.scrollY >= 50) {
            setNavbarBg(true)
        } else {
                setNavbarBg(false)
            }
        }

        const { i18n, t } = useTranslation()

        useEffect(() => {
        if(localStorage.getItem("i18nextLng")?.length > 2)
        {
            i18next.changeLanguage("id")
        }
        }, [])

    return (
        <>
        <Navbar className={navbarBg?'fixed bg-white w-full  shadow opacity-100 transition-all duration-500 ease-in-out z-30 top-0 ':'-top-16 fixed opacity-0 w-full  transition-all duration-1000 z-30'} color='none' navbar>
            <NavbarContainer>
            <NavbarWrapper>
                <NavbarToggler onClick={() => setOpenNavbar(!openNavbar)} color="red" className=""/>
                    <div className="collapse navbar-collapse my-5" id="navbarNav"></div>
            </NavbarWrapper>
                <NavbarCollapse open={openNavbar}>
                    <div className='px-4 py-2  text-black font-nunito font-bold hover:bg-red-200 rounded-xl transition-all duration-300 ease-in-out active:bg-red-400'>{t('navbar_header')}</div>
                    <Nav>
                        <div className="flex flex-col z-50 py-2 pr-2 lg:flex-row lg:items-center">
                            
                            <Link to="/" className='px-4 py-2  text-black font-nunito font-bold hover:bg-red-200 rounded-xl transition-all duration-300 ease-in-out active:bg-red-400'>{t('home')}</Link>
                            <Link to="/about" className='px-4 py-2 text-black font-nunito font-bold hover:bg-red-200 rounded-xl transition-all duration-300 ease-in-out active:bg-red-400 focus:bg-red-400'>{t('aboutt')}</Link>
                            <NavbarDropdown />
                            <LanguageDropdownn />
                        </div>
                    </Nav>
                </NavbarCollapse>
            </NavbarContainer>
        </Navbar>
        
        <Navbar className={navbarBg?'hidden':'absolute bg-gray-50 w-full bg-opacity- transition-all duration-500 z-50 '   } color='none'  navbar>
            <NavbarContainer>
            <NavbarWrapper>
                <NavbarToggler onClick={() => setOpenNavbar(!openNavbar)} color="red" className=""/>
                <div className='px-4 py-2  text-black font-nunito font-bold hover:bg-red-200 rounded-xl transition-all duration-300 ease-in-out active:bg-red-400'>{t('navbar_header')}</div>
            </NavbarWrapper>
                <NavbarCollapse open={openNavbar}>
                    <Nav>
                        <div className="flex flex-col z-50 py-2 pr-2 lg:flex-row lg:items-center">
                            <Link to="/" className='px-4 py-2  text-black font-nunito font-bold hover:bg-red-200 rounded-xl transition-all duration-300 ease-in-out active:bg-red-400 '>{t('home')}</Link>
                            <Link to="/about" className='px-4 py-2 text-black font-nunito font-bold hover:bg-red-200 rounded-xl transition-all duration-300 ease-in-out active:bg-red-400 focus:bg-red-400'>{t('aboutt')}</Link>
                            <NavbarDropdown/>
                            <LanguageDropdownn />
                        </div>
                    </Nav>
                </NavbarCollapse>
            </NavbarContainer>
        </Navbar>
        
        </>
    );
}

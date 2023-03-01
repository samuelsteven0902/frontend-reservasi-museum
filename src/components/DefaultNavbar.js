import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import LanguageDropdownn from './LanguageDropdown';
import { Navbar } from '@material-tailwind/react';

export default function DefaultNavbar() {
    const [openNavbar, setOpenNavbar] = useState(false);
    const [token, setToken] = useState(Cookies.get('token'));
    const [user,setUser] = useState('');
    const [loading, setLoading] = useState(false);
    const [navbar, setNavbar] = useState(false)
    const [navbarRes, setNavbarRes] = useState(false)
    const [navbarBg, setNavbarBg] = useState(false)

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
    
        useEffect(() => {
            changeBackground()
            window.addEventListener("scroll", changeBackground)
        })
    
        const changeBackground = () => {
            // console.log(window.scrollY);
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


        const handleLanguageChange = (e) => {
            i18n.changeLanguage(e.target.value);
        };

    return (
        <>
        
        <Navbar className={navbarBg?'fixed bg-white w-full  shadow opacity-100 transition-all duration-500 ease-in-out z-30 top-0 ':'-top-16 fixed opacity-0 w-full  transition-all duration-1000 z-30'} color='none'  navbar>
            <NavbarContainer>
            <NavbarWrapper>
                    <NavbarToggler onClick={() => setOpenNavbar(!openNavbar)} color="red" className=""/>
                    <div className="collapse navbar-collapse" id="navbarNav">
				{/* <ul className="navbar-nav ml-auto">
					<li className="nav-item">
						<select
							className=" border-2 ml-1 mr-2 w-28"
							value={localStorage.getItem("i18nextLng")}
							onChange={handleLanguageChange}
						>
							<option value="en">English</option>
							<option value="id">Indonesia</option>
						</select>
					</li>
				</ul> */}
                {/* <LanguageDropdownn /> */}
			</div>
                </NavbarWrapper>
                <NavbarCollapse open={openNavbar}>
                 <LanguageDropdownn />
                    <Nav>
                        <div className="flex flex-col z-50 py-2 pr-2 lg:flex-row lg:items-center">
                            <Link to="/" className='px-4 py-2  text-black font-nunito font-bold hover:bg-red-200 rounded-xl transition-all duration-300 ease-in-out active:bg-red-400 '>Beranda</Link>
                            {/* <Link
                                className={
                                    "text-xs uppercase py-3 font-bold block " +
                                    (window.location.href.indexOf("/about") !== -1
                                    ? "text-blue-500 hover:text-blue-600"
                                    : "text-red-700 hover:text-red-500 hover:bg-red-100 bg-red rounded-xl pl-4 duration-300 transition-all hover:pt-6")
                                }
                                to="/about"
                                >about</Link> */}
                            <Link to="/about" className='px-4 py-2 text-black font-nunito font-bold hover:bg-red-200 rounded-xl transition-all duration-300 ease-in-out active:bg-red-400 focus:bg-red-400'>Tentang</Link>
                            <NavbarDropdown />
                            {/* <div className='w-60'>
                                {user == ""? <Link to="/login" className='bg-[#A70B0B] hover:bg-red-700 px-2 mx-2 py-2 text-white font-nunito font-bold rounded-md'>Login as Admin
                                </Link>:<Link to={'/'+user} className='bg-[#A70B0B] hover:bg-red-700 px-2 mx-2 py-2 text-white font-nunito font-bold rounded-md'>Dashboard {user}</Link>}
                            </div> */}
                        </div>
                    </Nav>
                </NavbarCollapse>
            </NavbarContainer>
        </Navbar>
        
        <Navbar className={navbarBg?'hidden':'absolute bg-gray-50 w-full bg-opacity- transition-all duration-500 z-50 '   } color='none'  navbar>
            <NavbarContainer>
            <NavbarWrapper>
                    <NavbarToggler onClick={() => setOpenNavbar(!openNavbar)} color="red" className=""/>
                <LanguageDropdownn />
                </NavbarWrapper>
                <NavbarCollapse open={openNavbar}>
                    <Nav>
                        <div className="flex flex-col z-50 py-2 pr-2 lg:flex-row lg:items-center">
                            <Link to="/" className='px-4 py-2  text-black font-nunito font-bold hover:bg-red-200 rounded-xl transition-all duration-300 ease-in-out active:bg-red-400 '>{t('home')}</Link>
                            {/* <Link
                                className={
                                    "text-xs uppercase py-3 font-bold block " +
                                    (window.location.href.indexOf("/about") !== -1
                                    ? "text-blue-500 hover:text-blue-600"
                                    : "text-red-700 hover:text-red-500 hover:bg-red-100 bg-red rounded-xl pl-4 duration-300 transition-all hover:pt-6")
                                }
                                to="/about"
                                >about</Link> */}
                            <Link to="/about" className='px-4 py-2 text-black font-nunito font-bold hover:bg-red-200 rounded-xl transition-all duration-300 ease-in-out active:bg-red-400 focus:bg-red-400'>{t('aboutt')}</Link>
                            <NavbarDropdown />
                            {/* <div className='w-60'>
                                {user == ""? <Link to="/login" className='bg-[#A70B0B] hover:bg-red-700 px-2 mx-2 py-2 text-white font-nunito font-bold rounded-md'>Login as Admin
                                </Link>:<Link to={'/'+user} className='bg-[#A70B0B] hover:bg-red-700 px-2 mx-2 py-2 text-white font-nunito font-bold rounded-md'>Dashboard {user}</Link>}
                            </div> */}
                        </div>
                    </Nav>
                </NavbarCollapse>
            </NavbarContainer>
        </Navbar>
        
        </>
    );
}

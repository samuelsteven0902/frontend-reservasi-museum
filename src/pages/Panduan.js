import DefaultNavbar from 'components/DefaultNavbar';
import FooterPengunjung from 'components/FooterPengunjung';
import Container from 'components/panduan/Container';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Panduan() {
    const {pathname } = useLocation
    useEffect(()=>{
        window.scrollTo(0,0)
    },[pathname])
    return (
        <>
            <div className="absolute w-full z-20 ">
                <DefaultNavbar />
            </div>  
            <main className='bg-gray-50 min-h-screen'>
                <Container/>
            </main>
            <FooterPengunjung />
        </>
    );
}

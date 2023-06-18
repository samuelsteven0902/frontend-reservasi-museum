import DefaultNavbar from 'components/DefaultNavbar';
import Container from 'components/faq/Container';
import FooterPengunjung from 'components/FooterPengunjung';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Faq() {
    const {pathname } = useLocation();

    useEffect(()=>{
        window.scrollTo(0,0)
    },[pathname])
    
    return (
        <div className='bg-gray-50'>
            <div className="absolute w-full z-20">
                <DefaultNavbar />
            </div>  
            <main className='container mx-auto  p-10 h- relative min-h-screen'>
                <Container/>
            </main>
            <FooterPengunjung />
        </div>
    );
}

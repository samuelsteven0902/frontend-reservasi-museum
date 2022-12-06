    import Container from 'components/about/Container';
import DefaultNavbar from 'components/DefaultNavbar';
import FooterPengunjung from 'components/FooterPengunjung';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


export default function About() {
    const {pathname } = useLocation();
    useEffect(()=>{
        window.scrollTo(0,0)
    },[pathname])
    return (
        <>
        <div className="absolute w-full z-20">
            <DefaultNavbar/>
        </div>  
        <div> 
        <main 
            className="w-full px-4 ml-auto mr-auto text-center bg-gray-50">
            <Container/>
        </main>
        </div>
        <div>
            <FooterPengunjung/>
        </div>
        </>
    );
}